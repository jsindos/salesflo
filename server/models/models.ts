// @ts-nocheck

import Sequelize, { Model } from "sequelize";
import crypto from "crypto";
import moment from "moment";

export default ({ sequelize }, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.PasswordResets);
      Users.hasOne(models.XeroApps);
    }
  }

  Users.modelName = "Users";

  Users.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      emailAddress: {
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Please enter a valid email address.",
          },
        },
        type: DataTypes.STRING,
        unique: {
          name: "unique_emailAddress",
          msg: "That email address is taken. Try another.",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("createdAt"));
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      accountType: {
        type: DataTypes.ENUM(["google", "email"]),
        defaultValue: "email",
      },
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        },
        // https://stackoverflow.com/questions/45044386/sequelize-password-validation-using-len-and-setter-fails
        set(p) {
          const noSpaces = (p) => /^\S*$/.test(p);
          const oneSymbolOrNumber = (p) => /[\d-#!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(p);
          const atLeast8Characters = (p) => p.length >= 8;
          if (!(noSpaces(p) && oneSymbolOrNumber(p) && atLeast8Characters(p))) {
            throw new Error("Please enter a valid password.");
          }
          this.setDataValue("salt", Users.generateSalt());
          this.setDataValue("password", Users.encryptPassword(p, this.salt()));
        },
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("salt");
        },
      },
      stripeId: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: {
        type: DataTypes.VIRTUAL(DataTypes.STRING),
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set() {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      ephemeralState: DataTypes.JSON,
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "users",
      indexes: [
        {
          unique: true,
          name: "unique_emailAddress",
          fields: [sequelize.fn("lower", sequelize.col("emailAddress"))],
        },
      ],
    }
  );

  // https://medium.com/@benjaminpwagner/using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9
  Users.generateSalt = function () {
    return crypto.randomBytes(16).toString("base64");
  };
  Users.encryptPassword = function (plainText, salt) {
    return crypto.createHash("RSA-SHA256").update(plainText).update(salt).digest("hex");
  };

  Users.prototype.correctPassword = function (enteredPassword) {
    const password = this.password();
    if (!password) return false;
    return Users.encryptPassword(enteredPassword, this.salt()) === password;
  };

  class PasswordResets extends Model {
    static associate(models) {
      PasswordResets.belongsTo(models.Users);
    }
  }

  PasswordResets.modelName = "PasswordResets";

  PasswordResets.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("createdAt"));
        },
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "passwordResets",
    }
  );

  class XeroApps extends Model {
    static associate(models) {
      XeroApps.belongsTo(models.Users);
    }
  }

  XeroApps.modelName = "XeroApps";

  XeroApps.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectUri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.TEXT,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      tenantId: {
        type: DataTypes.STRING,
      },
      tenantName: {
        type: DataTypes.STRING,
      },
      accessTokenExpiresAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("createdAt"));
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("createdAt"));
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("updatedAt"));
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "xeroApps",
    }
  );

  return [Users, PasswordResets, XeroApps];
};
