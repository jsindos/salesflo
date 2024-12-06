import fs from "fs";
import path from "path";
import { Router } from "express";

const router = Router();

const basename = path.basename(__filename);
const extension = basename.slice(-2); // Will be 'js' or 'ts'

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") === -1 && file !== "db" && file !== "models";
  })
  .forEach((directory) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file) => {
        return file.slice(-9) === `routes.${extension}`;
      })
      .forEach(async (file) => {
        const routes = require(path.join(__dirname, directory, file)).default;
        router.use(`/${file.slice(0, -10)}`, routes);
      });
  });

export default router;
