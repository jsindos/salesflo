import { Strategy as LocalStrategy } from "passport-local";
import { users } from "./models/types";
import db from "./db";

export const localStrategy = ({ Users }) =>
  new LocalStrategy({ usernameField: "emailAddress" }, async (emailAddress, password, done) => {
    const user = await Users.findOne({
      where: { emailAddress: emailAddress.toLowerCase() },
    });
    if (user && user.correctPassword(password)) {
      return done(null, user);
    }
    return done(null, false);
  });

export const serializeUser = (user, done) => {
  done(null, user.id);
};

// this is run on every request, if an id is present on the session
export const deserializeUser =
  ({ Users }) =>
  async (id, done) => {
    const user = await Users.findOne({
      where: { id },
    });
    done(null, user);
  };

export const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.sendStatus(401);
  }
};
