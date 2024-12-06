import { filterFalsyValues, OutputWriter, parseCSV, writeOutput } from "./../utility";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import axios from "axios";
import moment from "moment";
// import runXero from "./xeroScript.cjs";
import { getConfig } from "~/utility";
import { DB } from "~/db";
import { users } from "~/models/types";
import fs from "fs";

const config = getConfig();

export default class XeroService {
  private db: DB;
  private XERO_OAUTH_TOKEN_URL: string;

  constructor(db) {
    this.db = db;
    this.XERO_OAUTH_TOKEN_URL = "https://identity.xero.com/connect/token";
  }

  async exchangeToken(code, clientId, clientSecret) {
    // https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await axios.post(
      this.XERO_OAUTH_TOKEN_URL,
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: config.XERO_OAUTH_REDIRECT_URI,
        client_id: clientId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error("error response:", response.data);
      throw new Error(`request failed with status code ${response.status}`);
    }

    /**
     * if successful, get a response like below
     * the access_token is valid for 30 minutes, the refresh token is valid for several months, and can be used to get a new access_token
     * {
     *   id_token: '',
     *   access_token: '',
     *   expires_in: 1800,
     *   token_type: 'Bearer',
     *   refresh_token: 'vq_Gymis0SVmsXkNzRpKGdGXyA4p_HfijZJY2-bLVcc',
     *   scope: 'openid profile email accounting.transactions accounting.contacts accounting.settings offline_access'
     * }
     */
    return response.data;
  }

  private async getXeroAccessToken(user) {
    // if (response.Detail?.includes("TokenExpired"))

    const xeroApp = await user.getXeroApp();

    if (!xeroApp) return;

    const now = moment();

    const diff = now.diff(xeroApp.accessTokenExpiresAt, "minutes");

    if (diff <= 0) return xeroApp.accessToken;

    const accessToken = await this.generateNewAccessToken(xeroApp);

    return accessToken;
  }

  private async getXeroRefreshToken(user) {
    const xeroApp = await user.getXeroApp();
    return xeroApp?.refreshToken;
  }

  private async generateNewAccessToken(xeroApp) {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", xeroApp.refreshToken);
    params.append("client_id", xeroApp.clientId);
    params.append("client_secret", xeroApp.clientSecret);

    const config = {
      method: "post",
      url: "https://identity.xero.com/connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params,
    };

    console.log("refreshToken", xeroApp.refreshToken);
    console.log("generating xero access token...");

    let accessToken;

    try {
      const res = await axios(config);
      accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;
      const accessTokenExpiresAt = moment().add(30, "minutes").toDate();
      await xeroApp.update({ accessToken, refreshToken, accessTokenExpiresAt });
    } catch (e) {
      console.error(e.response?.data || e.response || e);
    }

    return accessToken;
  }

  // public methods

  public async getConnections(user) {
    try {
      const accessToken = await this.getXeroAccessToken(user);

      if (!accessToken) throw new AuthenticationError("");

      const config = {
        method: "get",
        url: "https://api.xero.com/connections",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios(config);

      return response.data;
    } catch (e) {
      console.error(e.response?.data || e.message);
    }
  }

  public async getXeroHeaders(user) {
    const accessToken = await this.getXeroAccessToken(user);
    const Authorization = `Bearer ${accessToken}`;
    const xeroApp = await user.getXeroApp();

    if (!accessToken) throw new AuthenticationError("");
    if (!xeroApp.tenantId) throw new UserInputError("");

    return { Authorization, "Xero-Tenant-Id": xeroApp.tenantId };
  }

  // https://developer.xero.com/documentation/api/accounting/contacts#post-contacts
  public async createTestContact(user) {
    const headers = await this.getXeroHeaders(user);
    const { data } = await axios.post(
      "https://api.xero.com/api.xro/2.0/Contacts",
      { Name: "ABC Limited" },
      {
        headers,
      }
    );
    return data;
  }

  /**
   * Creates a dummy item in Xero with hardcoded values
   * @param user The authenticated user
   */
  public async createTestItem(user) {
    const headers = await this.getXeroHeaders(user);

    const body = {
      Code: "TEST123",
      Name: "Test Product",
      PurchaseDescription: "A test product for purchase orders",
      IsSold: true,
      IsPurchased: true,
      PurchaseDetails: {
        UnitPrice: 99.99,
      },
    };

    const { data } = await axios.post("https://api.xero.com/api.xro/2.0/Items", body, { headers });
    return data;
  }

  /**
   *
   * response like
   *
   * {
   *   "Contacts": [
   *     {
   *       "ContactID": "bd2270c3-8706-4c11-9cfb-000b551c3f51",
   *       "ContactStatus": "ACTIVE",
   *       "Name": "ABC Limited"
   *       ...
   *     }
   *   ]
   * }
   */
  public async getContacts(user) {
    const headers = await this.getXeroHeaders(user);
    const { data } = await axios.get("https://api.xero.com/api.xro/2.0/Contacts", {
      headers,
    });
    return data.Contacts;
  }

  /**
   * Gets branding themes from Xero
   * @returns Array of branding themes
   *
   * Response format:
   * {
   *   "BrandingThemes": [
   *     {
   *       "BrandingThemeID": "59c57787-4321-443d-b41a-c75a3f667eef",
   *       ...
   *     }
   *   ]
   * }
   */
  public async getBrandingThemes(user) {
    const headers = await this.getXeroHeaders(user);
    const { data } = await axios.get("https://api.xero.com/api.xro/2.0/BrandingThemes", {
      headers,
    });
    return data.BrandingThemes;
  }

  /**
   * Gets all items from Xero
   * @param user The authenticated user
   * @returns Array of items
   *
   * Response format:
   * {
   *   Items: [{
   *     ItemID: string,
   *     Code: string,
   *     Name: string,
   *     PurchaseDescription: string,
   *     PurchaseDetails: {
   *       UnitPrice: number,
   *       AccountCode: string,
   *       TaxType: string
   *     },
   *     ...
   *   }]
   * }
   */
  public async getItems(user) {
    const headers = await this.getXeroHeaders(user);
    try {
      const { data } = await axios.get("https://api.xero.com/api.xro/2.0/Items", { headers });
      return data.Items;
    } catch (e) {
      console.error("Failed to get Items");
      console.error(e.response?.data || e);
      throw e;
    }
  }

  /**
   * Creates a test purchase order in Xero
   */
  public async createPurchaseOrdersTest(
    user,
    reference: string,
    isCreatingPurchaseOrders: boolean,
    brandingThemeId: string,
    res: any
  ) {
    const headers = await this.getXeroHeaders(user);
    const RUN_LEVEL = isCreatingPurchaseOrders ? "LOG" : "DEBUG";

    // Get necessary data
    const [Items, Contacts] = await Promise.all([this.getItems(user), this.getContacts(user)]);

    res.write(`Log level: ${RUN_LEVEL}\n`);
    res.write(`Reference: ${reference}\n`);

    // Structure for purchase order
    const purchaseOrder = {
      Contact: { ContactID: Contacts[0].ContactID },
      Status: "AUTHORISED",
      Reference: reference,
      BrandingThemeID: brandingThemeId,
      LineItems: [],
    };

    if (RUN_LEVEL === "LOG") {
      const { data } = await axios.post("https://api.xero.com/api.xro/2.0/PurchaseOrders", purchaseOrder, { headers });
      res.write("Purchase order created successfully\n");
      res.write(JSON.stringify(data, null, 2) + "\n");
    } else {
      res.write("Debug mode - would create purchase order:\n");
      res.write(JSON.stringify(purchaseOrder, null, 2) + "\n");
    }

    res.end();
  }

  /**
   * Creates purchase orders in Xero based on CSV data
   */
  public async createPurchaseOrders(
    user,
    reference: string,
    isCreatingPurchaseOrders: boolean,
    brandingThemeId: string,
    res?: any
  ) {
    const writer = new OutputWriter(res);
    const RUN_LEVEL = isCreatingPurchaseOrders ? "RUN" : "DEBUG";

    writer.write(`Run level: ${RUN_LEVEL}`);
    writer.write(`Reference: ${reference}`);
    writer.write(`Branding Theme ID: ${brandingThemeId}\n`);

    const [thisWeekJSON, contactsJSON] = await this.readPurchaseOrderFiles(res);

    // https://stackoverflow.com/questions/41669039/dumping-whole-array-console-log-and-console-dir-output-num-more-items
    // console.dir(thisWeekCSV, { maxArrayLength: null })

    let sorted;

    sorted = thisWeekJSON.reduce((a, c) => {
      const name = c["Vendor Name"];
      const vendor = a.find(({ name: n }) => n === name) || { name, items: [] };
      const filtered = a.filter(({ name: n }) => n !== name);
      return [{ ...vendor, items: [...vendor.items, c] }, ...filtered];
    }, []);

    writer.write("Expecting " + sorted.length + " purchase orders to be created");
    writer.write("First entry from thisweeksquare.csv");
    writer.write(thisWeekJSON[0]);

    // stopped working from 'Hoo Haa Cup' onwards
    // const index = sorted.findIndex((s) => s.name === "Hoo Haa Cup");
    // sorted = sorted.slice(index);
    // console.log(sorted.map((s) => s.name));

    // Get necessary data
    const [Items, Contacts] = await Promise.all([this.getItems(user), this.getContacts(user)]);

    // sorted = sorted.filter((s) => s.name !== "Zealous & Co");

    for (let i = 0; i < sorted.length; i++) {
      const squareVendor = sorted[i];
      const name = squareVendor.name;
      const Contact = Contacts.find((c) => c.Name === name);
      const contactSettings = contactsJSON.find((c) => c["*ContactName"] === name);
      const LineItems = await this.getLineItemsForContact(
        squareVendor,
        Contact,
        contactSettings,
        Items,
        res,
        isCreatingPurchaseOrders
      );
      if (!LineItems) continue;

      // We have to specify LineAmountTypes for Purchase Orders that aren't 'Exclusive'
      // The only other option is 'Inclusive', we read these values from the second CSV
      // https://developer.xero.com/documentation/api/accounting/types#lineamount-types
      // https://developer.xero.com/documentation/guides/how-to-guides/tax-in-xero/

      if (isCreatingPurchaseOrders) {
        const purchaseOrder = await this.createPurchaseOrder(
          {
            Contact: { ContactID: Contact.ContactID },
            Status: "AUTHORISED",
            Reference: reference,
            BrandingThemeID: brandingThemeId,
            // LineAmountTypes: 'Inclusive', // this isn't working, emailing Xero
            LineItems,
          },
          user,
          res
        );

        if (!purchaseOrder) {
          writer.write("Purchase order api call failed");
        } else {
          writer.write("Success");
        }
      }
    }

    res.end();
  }

  /**
   * https://developer.xero.com/documentation/api/accounting/purchaseorders
   */
  async createPurchaseOrder(body, user, res) {
    const headers = await this.getXeroHeaders(user);
    try {
      const { data } = await axios.post("https://api.xero.com/api.xro/2.0/PurchaseOrders", body, {
        headers,
      });
      return data;
    } catch (e) {
      writeOutput("Failed create PurchaseOrders", res);
      writeOutput(e.response.data, res);
      if (Array.isArray(e.response.data.Elements)) {
        writeOutput(e.response.data.Elements[0]?.ValidationErrors, res);
      }
    }
  }

  private async getLineItemsForContact(squareVendor, Contact, contactSettings, Items, res, isCreatingPurchaseOrders) {
    const writer = new OutputWriter(res);
    const name = squareVendor.name;
    if (!contactSettings) {
      writer.write(`Could not find contact settings for ${name}, this means defaults will be used`);
    }

    if (!Contact) {
      writer.write(
        `Could not find square contact: "${name}" inside of Xero, skipping Purchase Order for whole contact`
      );
      return;
    }

    if (isCreatingPurchaseOrders) writer.write(`Creating purchase order for ${name}`);

    let TaxType;

    TaxType = contactSettings?.AccountsPayableTaxCodeName;

    const TaxTypes = {
      "GST Free Expenses": "",
      "GST on Expenses": "INPUT",
    };

    if (!TaxType && contactSettings) {
      writeOutput(`No TaxType found for ${name}, contactSettings entry:`);
      writeOutput(contactSettings);
    }

    TaxType = TaxTypes[TaxType] || "";

    const LineItems = squareVendor.items
      .map((entry) => {
        const unitsSold = entry["Units Sold\r"] || entry["Units Sold"];
        if (isCreatingPurchaseOrders) writer.write(`Entering SKU: ${entry.SKU}, units sold: ${unitsSold}`);
        const Item = Items.find((i) => i.Code === entry.SKU);
        if (!Item) {
          writer.write("Square item couldn't match SKU in xero");
          writer.write(`\
${name}
  Name: ${entry["Item Name"]}
  Variation: ${entry["Item Variation"]}
  SKU: ${entry.SKU}
  Units sold: ${unitsSold}\n`);
          return null;
        }

        // a comma is added when an item doesn't have a PurchaseDescription

        // We have to specify TaxType for LineItems that aren't 'GST Free Expenses'
        // The only other option we use is 'GST on Expenses', we read these values from the second CSV
        // https://developer.xero.com/documentation/api/accounting/types#tax-types
        // https://developer.xero.com/documentation/guides/how-to-guides/tax-in-xero/

        return filterFalsyValues({
          UnitAmount: Item.PurchaseDetails.UnitPrice,
          Quantity: unitsSold,
          ItemCode: entry.SKU,
          Description: Item.PurchaseDescription || ",",
          TaxType,
        });
      })
      .filter((e) => e);

    return LineItems;
  }

  private async readPurchaseOrderFiles(res): Promise<[Record<string, string>[], Record<string, string>[]]> {
    const isScript = !res;
    let f1, f2;
    try {
      f1 = fs.readFileSync(
        isScript
          ? `/Users/josephtsindos/Downloads/thisweeksquare-5.csv`
          : `${process.cwd()}/assets/xero/thisweeksquare.csv`,
        "utf8"
      );

      f2 = fs.readFileSync(
        isScript ? `/Users/josephtsindos/Downloads/contacts-5.csv` : `${process.cwd()}/assets/xero/contacts.csv`,
        "utf8"
      );
      f1 = f1.split("\n");
      f2 = f2.split("\n");

      const headers = f1.shift().split(",");
      const headers2 = f2.shift().split(",");

      const thisWeekJSON = parseCSV(f1, headers);
      const contactsJSON = parseCSV(f2, headers2);

      return [thisWeekJSON, contactsJSON];
    } catch (e) {
      writeOutput(e, res);
      res?.end();
      throw e;
    }
  }
}
