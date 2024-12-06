import { gql } from "@apollo/client";

export const queries = {
  Session: gql`
    query Session {
      session {
        sid
        constants {
          XERO_OAUTH_REDIRECT_URI
          GOOGLE_OAUTH_REDIRECT_URI
        }
        authenticatedUser {
          id
          emailAddress
          createdAt
          isAdmin
          accountType
          xeroApp {
            id
            clientId
            clientSecret
            redirectUri
            createdAt
            tenantId
            tenantName
          }
        }
      }
    }
  `,
};

export const mutations = {
  createXeroApp: gql`
    mutation CreateXeroApp($xeroApp: XeroAppInput!) {
      createXeroApp(xeroApp: $xeroApp) {
        id
        emailAddress
        createdAt
        isAdmin
        accountType
        xeroApp {
          id
          createdAt
          tenantId
          tenantName
        }
      }
    }
  `,
  createUser: gql`
    mutation CreateUser($user: UserInput!) {
      createUser(user: $user) {
        sid
        authenticatedUser {
          id
        }
      }
    }
  `,
  updateXeroApp: gql`
    mutation UpdateXeroApp($xeroApp: XeroAppInput!) {
      updateXeroApp(xeroApp: $xeroApp) {
        id
        emailAddress
        createdAt
        isAdmin
        accountType
        xeroApp {
          id
          createdAt
          tenantId
          tenantName
        }
      }
    }
  `,
};
