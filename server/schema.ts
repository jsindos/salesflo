// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

import fs from "fs";
import path from "path";
import { graphqls2s } from "graphql-s2s";
const { transpileSchema } = graphqls2s;
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import { AuthenticationError } from "apollo-server-core";
import moment from "moment";
import { getConfig, filterNonNullishValues } from "./utility";

const config = getConfig();

const schemaParts = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") === -1 && file !== "db" && file !== "models";
  })
  .forEach((directory) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file) => {
        return file.slice(-10) === "graphql.js";
      })
      .forEach((file) => {
        const { typeDef, resolvers } = require(path.join(__dirname, directory, file));
        schemaParts[file.slice(0, -11)] = { typeDef, resolvers };
      });
  });

const Query = `
  type Query {
    _empty: String
    session: Session
  }

  type Session {
    sid: String
    authenticatedUser: User
    constants: Constants
  }

  type Constants {
    XERO_OAUTH_REDIRECT_URI: String
    GOOGLE_OAUTH_REDIRECT_URI: String
  }

  type User {
    id: String
    emailAddress: String
    createdAt: String
    isAdmin: Boolean
    accountType: String
    xeroApp: XeroApp
    passwordResets: [PasswordReset]
  }

  type XeroApp {
    id: String
    clientId: String
    clientSecret: String
    redirectUri: String
    createdAt: String
    tenantId: String
    tenantName: String
  }

  type PasswordReset {
    id: String
    createdAt: String
    userId: String
  }
`;

const resolvers = {
  // Upload: GraphQLUpload,
  Query: {
    async session(root, args, context) {
      const { req } = context;

      /**
       * There may be some confusion here as `session` has been overloaded
       * This resolver (resolvers.Query.session) is the resolver for the `session` graphql field
       * This lives in the client's graphql cache and stores top-level information pertinent to the user's session - bag and other relevant information
       * req.session is the object used to track the user's session on the server
       * Normally express-session saves the session at the end of every http response, but we have disabled this behaviour (see saveUninitialized: false)
       * This is so sessions are disabled by default, which we utilise for top-level routes
       * Instead, we manually modify the session to trigger this behaviour
       */
      req.session.isActive = true;

      const session = { sid: req.session.id };

      return session;
    },
  },
  Session: {
    async authenticatedUser(root, args, { req }) {
      return req.user;
    },
    constants() {
      return {
        XERO_OAUTH_REDIRECT_URI: config.XERO_OAUTH_REDIRECT_URI,
        GOOGLE_OAUTH_REDIRECT_URI: config.GOOGLE_OAUTH_REDIRECT_URI,
      };
    },
  },
  User: {
    async xeroApp(user) {
      return user.getXeroApp();
    },
  },
};

const Mutation = `
  type Mutation {
    _empty: String
    createXeroApp(xeroApp: XeroAppInput!): User
    updateXeroApp(xeroApp: XeroAppInput!): User
    createUser(user: UserInput!): Session
  }

  input XeroAppInput {
    code: String
    clientId: String
    clientSecret: String
    tenantId: String
    tenantName: String
  }

  input UserInput {
    emailAddress: String
    password: String
    code: String
    accountType: String!
  }
`;

const mutations = {
  Mutation: {
    createXeroApp: async (root, args, { req, models, services }) => {
      const user = req.user;
      if (!user) throw new AuthenticationError("");

      const {
        xeroApp: { code, clientId, clientSecret },
      } = args;

      const xeroApp = await models.XeroApps.create({
        clientId,
        clientSecret,
        redirectUri: config.XERO_OAUTH_REDIRECT_URI,
      });
      await xeroApp.setUser(req.user);

      const res = await services.XeroService.exchangeToken(code, clientId, clientSecret);

      const accessTokenExpiresAt = moment().add(30, "minutes").toDate();

      await xeroApp.update({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
        accessTokenExpiresAt,
      });

      return user;
    },
    updateXeroApp: async (root, args, context) => {
      const user = context.req.user;
      if (!user) throw new AuthenticationError("");

      const {
        xeroApp: { tenantId, tenantName },
      } = args;

      const xeroApp = await user.getXeroApp();
      const params = filterNonNullishValues({ tenantId, tenantName });
      await xeroApp.update(params);

      return user;
    },
    createUser: async (root, args, context) => {
      const {
        user: { code, accountType },
      } = args;
      const { UsersService } = context.services;
      const { Users } = context.models;
      let emailAddress;
      if (accountType === "google") {
        const accessToken = await UsersService.exchangeGoogleOAuthToken(code);
        const { email } = await UsersService.getGoogleOAuthUserInfo(accessToken);
        emailAddress = email.toLowerCase();
      }
      let user;
      user = await Users.findOne({
        where: { emailAddress },
      });

      if (!user) {
        user = await UsersService.createUser({
          emailAddress,
          accountType,
        });
      }
      await UsersService.login(context.req, user);
      return {};
    },
  },
};

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, ...Object.values(schemaParts).map(({ typeDef }) => transpileSchema(typeDef))],
  resolvers: merge(resolvers, mutations, ...Object.values(schemaParts).map(({ resolvers }) => resolvers)),
});
