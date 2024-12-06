// const path = require("path");

import db from "~/db";

// const env = process.env.NODE_ENV || "development";
// let config = require(path.join(__dirname, "../settings.json"))[env];

// const db = require("../server/db.cjs");

// NODE_ENV=production USE_CONNECTION_STRING=true
const main = async () => {
  const user = await db.models.Users.findOne({ where: { emailAddress: "jtsindos@gmail.com" } });
  await db.services.XeroService.createTestContact(user);
  await db.services.XeroService.createTestItem(user);
  process.exit();
};

main();
