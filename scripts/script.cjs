// const path = require("path");

// const env = process.env.NODE_ENV || "development";
// let config = require(path.join(__dirname, "../settings.json"))[env];

const db = require("../server/db.cjs");

const main = async () => {
  const user = await db.models.Users.findOne({ where: { emailAddress: "jtsindos@gmail.com" } });
  await db.services.XeroService.createContact(user);
  process.exit();
};

main();
