import fs from "fs";
import path from "path";
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

import seed from "./seed";
import { getConfig } from "./utility";
import { users, usersAttributes } from "./models/types/users";
import { xeroApps, xeroAppsAttributes } from "./models/types/xeroApps";
import XeroService from "./xero/xero.service";
import UsersService from "./services/users.service";
import CloudWatchService from "./services/cloudwatch.service";

const basename = path.basename(__filename);
let config = getConfig();

config = Object.entries(config)
  .map(([k, v]) => (String(v).includes("process") ? { [k]: eval(String(v)) } : { [k]: v })) // eslint-disable-line no-eval
  .reduce((a, c) => ({ ...a, ...c }), {});

// const { populateDatabase, seedMakerEarnings, seedOrders, USER_ID } = require('../db/seed/seed.js')
// const createMaterializedViews = require('../db/seed/createMaterializedViews')

let sequelize;
if (process.env.USE_CONNECTION_STRING) {
  sequelize = new Sequelize("ebdb", "root", "Pelicanoh.123", {
    host: "awseb-e-bw8rkz9nuc-stack-awsebrdsdatabase-m8srrbrnoqiw.cheas4ao8j1h.ap-southeast-2.rds.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else if (config.use_env_variable) {
  const connectionString = process.env[config.use_env_variable];
  if (!connectionString) {
    throw new Error(`Environment variable ${config.use_env_variable} is not set`);
  }
  sequelize = new Sequelize(connectionString, config);
} else {
  let count = 0;
  sequelize = new Sequelize(config.database, config.username, config.password, {
    logging: (msg) => {
      // https://sequelize.org/docs/v6/getting-started/#logging
      // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
      console.log(msg.replace("Executing (default)", `\x1b[40m\x1b[37mExecuting ${count}\x1b[0m`));
      count++;
    },
    ...config,
  });
}

// Define the virtual fields interface
interface UsersVirtuals {
  fullName?: string; // virtual getter that combines firstName + lastName
}

interface Models {
  // see https://sequelize.org/docs/v6/other-topics/typescript/#usage
  // Users: ModelStatic<Model<usersAttributes & UserVirtuals, Partial<usersAttributes>> & usersAttributes & UserVirtuals>;
  // Users: ModelStatic<Model<users, Partial<users>> & users & UserVirtuals>;
  Users: ModelStatic<users & UsersVirtuals>;
  XeroApps: ModelStatic<xeroApps>;
}

interface Services {
  XeroService: XeroService;
  UsersService: UsersService;
  CloudWatchService: CloudWatchService;
}

export type DB = {
  models: Models;
  services: Services;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  initialize: () => Promise<void>;
};

const db: DB = {
  models: {} as Models, // Type assertion here tells TypeScript to trust us
  services: {} as Services,
  sequelize,
  Sequelize,
  initialize,
};

process.env.NODE_ENV === "production" &&
  db.sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

const extension = basename.slice(-2); // Will be 'js' or 'ts'

// models
fs.readdirSync(path.join(__dirname, "models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-2) === extension)
  .forEach((file) => {
    const models = require(path.join(__dirname, "models", file)).default(db, DataTypes);
    models.forEach((model) => (db.models[model.modelName] = model));
  });

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

// services
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") === -1 && file !== "db" && file !== "models")
  .forEach((directory) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file) => file.slice(-10) === `service.${extension}`)
      .forEach((file) => {
        const Class = require(path.join(__dirname, directory, file)).default;
        db.services[Class.name] = new Class(db);
      });
  });

async function initialize() {
  if (process.env.NODE_ENV === "test") return;

  await db.sequelize.sync({
    // force: true,
  });
  await seed(db);
}

initialize();

export default db;
