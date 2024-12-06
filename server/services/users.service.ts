import { UserInputError } from "apollo-server-express";
import axios from "axios";
import { CustomError, filterNonNullishValues, getConfig } from "~/utility";
import { DB } from "~/db";

const config = getConfig();

export default class UsersService {
  private db: DB;
  private GOOGLE_OAUTH_TOKEN_URL: string;
  private GOOGLE_OAUTH_CLIENT_ID: string;
  private GOOGLE_OAUTH_CLIENT_SECRET: string;

  constructor(db: DB) {
    this.db = db;
    this.GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
    this.GOOGLE_OAUTH_CLIENT_ID = "783282927655-71ejbrp17gss8lppdnef3pljta6cs0tf.apps.googleusercontent.com";
    // needs to be re-added
    this.GOOGLE_OAUTH_CLIENT_SECRET = "";
  }

  async createUser({ emailAddress, password, accountType }) {
    const { Users } = this.db.models;

    let user;
    try {
      if (accountType !== "email") password = null;
      user = await Users.create(
        filterNonNullishValues({
          emailAddress,
          password,
          accountType,
        })
      );
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        if (e.errors[0].message === "lower(emailAddress::text) must be unique") {
          throw new UserInputError("That email address is taken. Try another.");
        }
        if (e.errors[0].message === "lower(username::text) must be unique") {
          throw new UserInputError("That username is taken. Try another.");
        }
        throw new UserInputError(e.errors[0].message);
      } else if (e.name === "SequelizeValidationError") {
        throw new UserInputError(e.errors[0].message);
      } else {
        throw e;
      }
    }

    return user;
  }

  async login(req, user) {
    await new Promise<void>((resolve, reject) =>
      req.login(user, (e) => {
        e ? reject(e) : resolve();
      })
    );
  }

  async exchangeGoogleOAuthToken(code) {
    let accessToken;
    try {
      const response = await axios.post(this.GOOGLE_OAUTH_TOKEN_URL, null, {
        params: {
          code,
          client_id: this.GOOGLE_OAUTH_CLIENT_ID,
          client_secret: this.GOOGLE_OAUTH_CLIENT_SECRET,
          redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status !== 200) {
        console.error(`token exchange failed: ${response.status} ${response.statusText}`);
        throw new CustomError(`token exchange failed: ${response.status} ${response.statusText}`);
      }

      accessToken = response.data.access_token;

      return accessToken;
    } catch (e) {
      console.error("token exchange error:", e.message);
      throw new CustomError("token exchange failed");
    }
  }

  async getGoogleOAuthUserInfo(accessToken) {
    try {
      const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (e) {
      console.error("failed to fetch user info:", e.message);
      throw new CustomError("failed to fetch user info");
    }
  }
}
