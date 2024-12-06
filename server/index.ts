import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import moment from "moment-timezone";
import { v4 as uuid } from "uuid";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import connectSessionSequelize from "connect-session-sequelize";
const SequelizeStore = connectSessionSequelize(session.Store);

// import xero from "./xero.cjs";

import { serializeUser, deserializeUser, localStrategy } from "./passportConfig";
import router from "./router";
import db from "./db";
import schema from "./schema";
import path from "path";

passport.use(localStrategy(db.models));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser(db.models));

moment.tz.setDefault("Australia/Sydney");

console.log("Current NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.RDS_USERNAME", process.env.RDS_USERNAME);
console.log("process.env.RDS_PASSWORD", process.env.RDS_PASSWORD);
console.log("process.env.RDS_DB_NAME", process.env.RDS_DB_NAME);
console.log("process.env.RDS_HOSTNAME", process.env.RDS_HOSTNAME);
console.log("process.env.RDS_PORT", process.env.RDS_PORT);

const sequelizeSessionStore = new SequelizeStore({
  db: db.sequelize,
  // make tableName explicit, it randomly changed from "Session" to "Sessions" in December, 2023 for an unknown reason
  tableName: "Session",
  // https://www.linkedin.com/pulse/why-your-app-needs-short-session-timeout-google-facebook-geoff-wilson/
  // gmail never times out
  expiration: 1000 * 60 * 60 * 24 * 365, // 365 day expiration
});

morgan.token("body", (req) => {
  if (req.originalUrl === "/graphql") {
    if (req.body?.operationName) return req.body?.operationName;
    // weird logic to get printing of mutations working
    if (!req.body.query) return JSON.stringify(req.body);
    const query = req.body.query.split(" ");
    return JSON.stringify({ ...req.body, query: query[0] + " " + query[3] });
  }
  // truncate each value in body, if more than 50 characters
  return JSON.stringify(
    Object.entries(req.body).reduce(
      (a, [k, v]) => ({ ...a, [k]: typeof v === "string" && v.length > 50 ? v.replace(/(.{50})..+/, "$1…") : v }),
      {}
    )
  );
});

const morganHandler = morgan(":method :url :status :body :response-time ms - :req[content-length]");

const app = express();

app.use(morganHandler);
app.use(express.json());

const origin = function (origin, callback) {
  return callback(null, true);
};

app.use(cors({ credentials: true, origin }));

const sessionHandler = session({
  genid: () => uuid(),
  store: sequelizeSessionStore,
  secret: process.env.SECRET ? process.env.SECRET : "keyboard cat",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
  },
});

// app.get("/", (req, res) => {
//   res.status(200).send("OK");
// });

app.use(function (req, res, next) {
  // disable sessions
  // if (req.url !== "/") {
  return sessionHandler(req, res, next);
  // } else {
  // next();
  // }
});

sequelizeSessionStore.sync();

// router middleware must be after passport middleware
// https://stackoverflow.com/questions/16781294/passport-js-passport-initialize-middleware-not-in-use
app.use(passport.initialize());
app.use(passport.session());

const clientPath =
  process.env.NODE_ENV === "production" ? path.join(__dirname, "client") : path.join(__dirname, "dist/client");

// Ensure proper MIME types
app.use(
  express.static(clientPath, {
    maxAge: "1y",
    // Ensure .js files are served with the correct MIME type
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".mjs")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
app.use(router);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(clientPath, "index.html"));
});

// xero(app);

const hostname = "0.0.0.0";
const port = (process.env.PORT || 8080) as number;

async function serve() {
  const server = new ApolloServer({
    schema,
    // always create a new Loader per request, otherwise the cache will build up over the lifetime of the deployed server
    context: ({ req, res }) => ({
      services: db.services,
      models: db.models,
      req,
      sequelize: db.sequelize,
      res,
    }),
    plugins: [
      // https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/#graphql-playground
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { "schema.polling.enable": false },
      }),
    ],
    formatError: (e) => {
      console.error(JSON.stringify(e, null, 2));
      return e;
    },
  });
  await server.start();

  // https://stackoverflow.com/questions/54485239/apollo-server-express-cors-issue
  server.applyMiddleware({
    app,
    cors: { credentials: true, origin },
    path: "/graphql",
  });

  await new Promise<void>((resolve) => app.listen(port, hostname, () => resolve()));
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`graphql running at http://${hostname}:${port}${server.graphqlPath}`);
}

serve();
