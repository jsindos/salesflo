import { DB } from "./db";

export default async (db: DB) => {
  console.log("seeding database");

  const { models } = db;
  const { Users } = models;

  let users;
  users = await Users.findAll();

  if (users.length > 0) {
    console.log("already seeded");
    return;
  }

  users = await Users.bulkCreate([{ emailAddress: "j@g.co" }]);
};
