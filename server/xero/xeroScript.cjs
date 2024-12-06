const axios = require("axios");

const isScript = require.main === module;

let Authorization = "";
let TenantId = isScript ? "ced19958-ccdc-4eca-8c33-8567867e6e26" : "";
let Reference = "";

// https://stackoverflow.com/questions/16831250/how-to-convert-csv-to-json-in-node-js
const fs = require("fs");

// const Reference = process.argv[3] || '26 May to 8 June'

const BrandingThemeID = "59c57787-4321-443d-b41a-c75a3f667eef";

// only filters 'undefined' and 'null' and ''
function filterFalsyValues(object) {
  return Object.entries(object)
    .filter(([_, v]) => v || v === 0 || v === false)
    .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
}

// const SUPPLIER_NAME = 'Aanchal Chopra Designs'

// these are shortened strings of vendors which could not be found
// they should be fixed by next week, at which point all associated code with this should be deleted
const shortened = ["Aleseva", "Fiona", "Isabella", "Jono", "KOKO", "Mischief", "Oh", "Your Mighty", "Zoe'"];

const LOG_LEVELS = {
  DEBUG: "DEBUG",
  LOG: "LOG",
  NONE: "NONE",
};

let LOG_LEVEL = process.argv[2] || LOG_LEVELS.DEBUG;

let res;

const writeOutput = (output) => {
  if (typeof output === "object") {
    output = JSON.stringify(output);
  }
  res ? res.write(output + "\n") : console.log(output);
};

const log = {
  log: (m) => LOG_LEVEL === LOG_LEVELS.LOG && writeOutput(m),
  debug: (m) => LOG_LEVEL === LOG_LEVELS.DEBUG && writeOutput(m),
};

/**
 * How to use this script
 * ----------------------
 *
 * First, run it with `LOG_LEVEL = LOG_LEVELS.DEBUG`
 *
 * This will log:
 *   Vendors present in Square CSV Export, but not present in Xero
 *   Vendors whose names have discrepancies with those present in Xero (found through fuzzy matching)
 *   Items present in Square CSV Export, but not present in Xero
 *     Items are matched from the SKU column of the Square CSV export, which means these items do not have an entry in Xero with the same SKU
 *
 * If you are happy with what is being reported, you can then run it to enter Purchase Orders in Xero
 *
 * 1. Make sure your Access Token has at least 10 minutes of validity left. Access Tokens are valid for 30 minutes. Create a new Access Token with the Refresh Token if necessary.
 * 2. Make the following change: `LOG_LEVEL = LOG_LEVELS.LOG`
 * 3. Uncomment `createPurchaseOrder`
 *
 * This will create Xero Purchase Orders in an authorised state
 */

const main = async (mode, accessToken, tenantId, reference, expressRes, shouldStop) => {
  if (!accessToken) {
    console.log("no access token");
    return;
  }
  res = expressRes;
  Authorization = `Bearer ${accessToken}`;
  if (tenantId) {
    TenantId = tenantId;
  }
  Reference = reference;
  LOG_LEVEL = mode;

  writeOutput(`log level: ${LOG_LEVEL}`);

  let f, f2;

  try {
    f = fs.readFileSync(
      isScript
        ? `/Users/josephtsindos/Downloads/thisweeksquare-5.csv`
        : `${process.cwd()}/assets/xero/thisweeksquare.csv`,
      "utf8"
    );

    f2 = fs.readFileSync(
      isScript ? `/Users/josephtsindos/Downloads/contacts-5.csv` : `${process.cwd()}/assets/xero/contacts.csv`,
      "utf8"
    );
  } catch (e) {
    writeOutput(e);
    res?.end();
    return;
  }

  // console.log(f)

  f = f.split("\n");
  f2 = f2.split("\n");

  const headers = f.shift().split(",");
  const headers2 = f2.shift().split(",");

  const parseCSV = (f, headers) => {
    const json = [];
    f.forEach(function (d) {
      const tmp = {};
      // replace `,` with `|` inside of double quotes
      // this is necessary so we can split on commas correctly, so `headers` matches correctly
      // https://stackoverflow.com/questions/19709888/replace-all-commas-within-a-quoted-string
      d = d
        .replace(/"[^"]+"/g, function (match) {
          return match.replace(/,/g, "|");
        })
        .replace(/[\r\n]/gm, "");

      // use this if you want to test on a one liner
      // `"Your Mighty, Magnificent Mind","Your Mighty, Magnificent Mind - Children's Book",Regular,23558,2`.replace(/"[^"]+"/g, m => m.replace(/,/g, '|')).split(',').map(m => m.replace(/\|/g, ',').replace(/"/g, ''))

      const row = d
        .split(",")
        // these convert back out of the "|" format and replace " (which were auto-placed when ' appeared in the string)
        .map((m) => m.replace(/\|/g, ",").replace(/"/g, ""));
      for (let i = 0; i < headers.length; i++) {
        tmp[headers[i]] = row[i];
      }
      json.push(tmp);
    });
    return json;
  };

  const json = parse(f, headers);
  const contactsCSV = parse(f2, headers2);

  // https://stackoverflow.com/questions/41669039/dumping-whole-array-console-log-and-console-dir-output-num-more-items
  // console.dir(json, { maxArrayLength: null })

  writeOutput("Entering reference: " + Reference);

  let sorted;

  // eslint-disable-next-line prefer-const
  sorted = json.reduce((a, c) => {
    const name = c["Vendor Name"];
    const vendor = a.find(({ name: n }) => n === name) || { name, items: [] };
    const filtered = a.filter(({ name: n }) => n !== name);
    return [{ ...vendor, items: [...vendor.items, c] }, ...filtered];
  }, []);

  writeOutput("expecting " + sorted.length + " purchase orders to be created");

  // stopped working from 'Hoo Haa Cup' onwards
  // const index = sorted.findIndex((s) => s.name === "Hoo Haa Cup");
  // sorted = sorted.slice(index);
  // console.log(sorted.map((s) => s.name));

  const [
    // PurchaseOrders,
    // BrandingThemes,
    Items,
    Contacts,
  ] = await Promise.all([
    // getPurchaseOrders(),

    // this was only used to access the `BrandingThemeID` (see above)
    // should never need to be used again
    // getBrandingThemes(),

    getItems(),
    getContacts(),
  ]);

  if (!Items || !Contacts) {
    return;
  }

  // console.log(PurchaseOrders.filter(p => p.Status === 'AUTHORISED'))
  // process.exit()

  if (shouldStop?.value) {
    writeOutput("stopping");
    res?.end();
    return;
  }

  writeOutput("first entry from thisweeksquare.csv");
  writeOutput(json[0]);

  // this can be used to show vendors that weren't an exact match with Xero, using `shortened` as defined above
  // console.log(
  //   shortened.map((s, i) => {
  //     const Contact = Contacts.find(c => c.Name.toLowerCase().includes(s.toLowerCase()))
  //     return UNABLE_TO_FIND[i] + ' -> ' + (Contact?.Name || 'couldn\'t find in Xero')
  //   })
  // )

  for (let i = 0; i < sorted.length; i++) {
    const vendor = sorted[i];
    const name = vendor.name;

    // if (name !== 'The Canberra Distillery') continue

    let Contact;

    Contact = Contacts.find((c) => c.Name === name);
    const contactSettings = contactsCSV.find((c) => c["*ContactName"] === name);

    if (!contactSettings) {
      writeOutput(`could not find contact settings for ${name}, this means defaults will be used`);
    }

    if (!Contact) {
      // attempt to find the name from `shortened`
      let short;
      short = shortened.find((s) => name.split(" ")[0].includes(s));

      // some of the names include inverted commas, in which case we want to split further (currently only relevant for Zoe's Button Emporium -> Zoe’s Button Emporium)
      const invertedComma = ["'", "’"].find((s) => short?.includes(s));
      if (invertedComma) {
        short = short.split(invertedComma)[0];
      }
      Contact = Contacts.find((c) => c.Name.toLowerCase().includes(short?.toLowerCase()));
      if (!Contact) {
        log.debug(`could not find contact: "${name}" inside of xero, skipping Purchase Order for whole contact`);
        // log discrepancies in vendor names
        log.debug(`\
Square: ${name}
Xero: ${Contact.Name}\n`);
        continue;
      }
    }

    log.log(`creating purchase order for ${name}`);

    let TaxType;

    TaxType = contactSettings?.AccountsPayableTaxCodeName;

    const TaxTypes = {
      "GST Free Expenses": "",
      "GST on Expenses": "INPUT",
    };

    if (!TaxType && contactSettings) {
      writeOutput(`no TaxType found for ${name}, contactSettings entry:`);
      writeOutput(contactSettings);
    }

    TaxType = TaxTypes[TaxType] || "";

    const LineItems = vendor.items
      .map((entry) => {
        const unitsSold = entry["Units Sold\r"] || entry["Units Sold"];
        log.log(`entering SKU: ${entry.SKU}, units sold: ${unitsSold}`);
        const Item = Items.find((i) => i.Code === entry.SKU);
        if (!Item) {
          // log Square item which couldn't match SKU in Xero
          log.debug("Square item which couldn't match SKU in Xero");
          log.debug(`\
${name}
  Name: ${entry["Item Name"]}
  Variation: ${entry["Item Variation"]}
  SKU: ${entry.SKU}
  Units sold: ${unitsSold}
`);
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

    // We have to specify LineAmountTypes for Purchase Orders that aren't 'Exclusive'
    // The only other option is 'Inclusive', we read these values from the second CSV
    // https://developer.xero.com/documentation/api/accounting/types#lineamount-types
    // https://developer.xero.com/documentation/guides/how-to-guides/tax-in-xero/

    // uncomment this line when you actually want to create the purchase orders

    if (LOG_LEVEL === LOG_LEVELS.LOG) {
      if (shouldStop?.value) {
        writeOutput("stopping");
        res?.end();
        return;
      }
      const purchaseOrder = await createPurchaseOrder({
        Contact: { ContactID: Contact.ContactID },
        Status: "AUTHORISED",
        Reference,
        BrandingThemeID,
        // LineAmountTypes: 'Inclusive', // this isn't working, emailing Xero
        LineItems,
      });

      if (!purchaseOrder) {
        log.log("purchase order api call failed");
      } else {
        log.log("success");
      }
    }
  }

  res?.end();
};

/**
 * It seems this doesn't return purchase orders which were created with status already set to `AUTHORISED`
 *
 * Can use this code to verify this:
 *   console.log(PurchaseOrders.filter(p => p.Status === 'AUTHORISED'))
 *   console.log(PurchaseOrders.filter(p => p.Status === 'AUTHORISED').length)
 *
 * This is an example of a purchase order created with `Status: 'AUTHORISED'`, it is not returned by the PurchaseOrders API for some reason
 *   console.log(PurchaseOrders.filter(p => p.Contact.Name === 'Trevor Dickinson Art'))
 *
 * Apparently, Xero will throw an error when attempting to create a PurchaseOrder for a Contact who already has a PurchaseOrder for that period anyway, so we shouldn't need to use this endpoint for verification in any case
 *
 * https://developer.xero.com/documentation/api/accounting/purchaseorders
 */
// eslint-disable-next-line no-unused-vars
const getPurchaseOrders = async () => {
  const {
    data: { PurchaseOrders },
  } = await axios.get("https://api.xero.com/api.xro/2.0/PurchaseOrders", {
    headers: {
      "xero-tenant-id": TenantId,
      Authorization,
    },
  });
  return PurchaseOrders;
};

/**
 * https://developer.xero.com/documentation/api/accounting/purchaseorders
 */
const createPurchaseOrder = async (body) => {
  try {
    const { data } = await axios.post("https://api.xero.com/api.xro/2.0/PurchaseOrders", body, {
      headers: {
        "xero-tenant-id": TenantId,
        Authorization,
      },
    });
    return data;
  } catch (e) {
    writeOutput("Failed create PurchaseOrders");
    writeOutput(e.response.data);
    if (Array.isArray(e.response.data.Elements)) {
      writeOutput(e.response.data.Elements[0]?.ValidationErrors);
    }
    res?.end();
  }
};

/**
 * {
 *   ItemID: '3ec2c102-f84b-49c6-bef7-4673bd4b0c05',
 *   Code: '17830',
 *   PurchaseDescription: 'Creme Brulee',
 *   UpdatedDateUTC: '/Date(1680256932443+0000)/',
 *   PurchaseDetails: { UnitPrice: 9, AccountCode: '310', TaxType: '' },
 *   SalesDetails: {},
 *   Name: 'Chocolate Tablette',
 *   IsTrackedAsInventory: false,
 *   IsSold: false,
 *   IsPurchased: true
 * }
 * https://developer.xero.com/documentation/api/accounting/items
 *
 * Fill `Code` into `ItemCode` when inputting a Line Item for creation of a Purchase Order
 *
 * `Code` will match `SKU` from Square CSV dump
 */
const getItems = async () => {
  try {
    const {
      data: { Items },
    } = await axios.get("https://api.xero.com/api.xro/2.0/Items", {
      headers: {
        "Xero-Tenant-Id": TenantId,
        Authorization,
      },
    });
    return Items;
  } catch (e) {
    writeOutput("Failed to get Items");
    writeOutput(e.response.data);
    if (Array.isArray(e.response.data.Elements)) {
      writeOutput(e.response.data.Elements[0]?.ValidationErrors);
    }
    res?.end();
  }
};

/**
 * {
 *   ContactID: '196434b7-1bb8-4028-a724-49a8148053a6',
 *   ContactStatus: 'ACTIVE',
 *   Name: 'Ready to be Deady',
 *   FirstName: 'Britt',
 *   LastName: 'McNicol',
 *   EmailAddress: 'brittmcnicol@yahoo.com',
 *   BankAccountDetails: '112908450400773',
 *   AccountsPayableTaxType: 'EXEMPTEXPENSES',
 *   Addresses: [Array],
 *   Phones: [Array],
 *   UpdatedDateUTC: '/Date(1679637158677+0000)/',
 *   ContactGroups: [],
 *   IsSupplier: false,
 *   IsCustomer: false,
 *   BatchPayments: [Object],
 *   ContactPersons: [],
 *   HasAttachments: false,
 *   HasValidationErrors: false
 * }
 * https://developer.xero.com/documentation/api/accounting/contacts
 *
 * Fill `ContactID` into `Contact` when creating a Purchase Order
 *
 * `Name` will match `Vendor Name` from Square CSV dump
 */
const getContacts = async () => {
  try {
    const {
      data: { Contacts },
    } = await axios.get("https://api.xero.com/api.xro/2.0/Contacts", {
      headers: {
        "Xero-Tenant-Id": TenantId,
        Authorization,
      },
    });
    return Contacts;
  } catch (e) {
    writeOutput("Failed to get Contacts");
    writeOutput(e.response.data);
    if (Array.isArray(e.response.data.Elements)) {
      writeOutput(e.response.data.Elements[0]?.ValidationErrors);
    }
    res?.end();
  }
};

/**
 * https://developer.xero.com/documentation/api/accounting/brandingthemes
 *
 * There is only one branding theme, whose ID must be supplied when creating a Purchase Order
 *
 * The one branding them has an id of '59c57787-4321-443d-b41a-c75a3f667eef'
 */
// eslint-disable-next-line no-unused-vars
const getBrandingThemes = async () => {
  const {
    data: { BrandingThemes },
  } = await axios.get("https://api.xero.com/api.xro/2.0/BrandingThemes", {
    headers: {
      "xero-tenant-id": TenantId,
      Authorization,
    },
  });
  return BrandingThemes;
};

module.exports = main;

// const RUN_LEVEL = isCreatingPurchaseOrders ? "LOG" : "DEBUG";
// const main = async (mode, accessToken, reference, expressRes, shouldStop) => {
const accessToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFDQUY4RTY2NzcyRDZEQzAyOEQ2NzI2RkQwMjYxNTgxNTcwRUZDMTkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJISy1PWm5jdGJjQW8xbkp2MENZVmdWY09fQmsifQ.eyJuYmYiOjE3MzAwOTYwNDYsImV4cCI6MTczMDA5Nzg0NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS54ZXJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHkueGVyby5jb20vcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiNzRGMTE4RUI4RDM2NDc4Q0E0OUM2OTkzQzY0NUVGQjkiLCJzdWIiOiIxNjY2OWJmMjM0ZWE1ZTBiYTE5MDNhMjA0ZWI3OWViOSIsImF1dGhfdGltZSI6MTczMDA4MjU2MiwieGVyb191c2VyaWQiOiJmNjFmM2ZmNy03NzVlLTQ0OTMtOWM1OS1kZWFiYTA3NmMxMjEiLCJnbG9iYWxfc2Vzc2lvbl9pZCI6Ijg0YmQ2NTU4MDQxMzQ0YjNhOTA4YTEwMTZjNzU1ZDYzIiwic2lkIjoiODRiZDY1NTgwNDEzNDRiM2E5MDhhMTAxNmM3NTVkNjMiLCJqdGkiOiI5NzBENUQ4QjIyMDJCOENCQUFDRDkzNzBDOTVCQ0UwNiIsImF1dGhlbnRpY2F0aW9uX2V2ZW50X2lkIjoiMTE0MTUwNmQtZjEzNS00ZjhlLTkwZTctZTEyZjJiMzZiNDIxIiwic2NvcGUiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIiwiYWNjb3VudGluZy5zZXR0aW5ncyIsImFjY291bnRpbmcudHJhbnNhY3Rpb25zIiwiYWNjb3VudGluZy5jb250YWN0cyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiLCJtZmEiLCJzd2siXX0.Pm1Ma866v3YdPe71osWFMCgji7OtwFL2cdhe-j73HbCD8pre2Ft0PbecTUInKfGB1DPhVdiMDHBdD1RvaNXlPhjwmZcM-9P69V0L1CAfxXPa_iDcOv8BWzLEnz3qGo3hrB6vqtUASXACIpzdlKOXmslXz6bwSnaKGUhJedkjNDPswQ1M5CboTGjSKKtZBbYpCAyVj4HSVSIaGAQsIB9SfzqQsQ9Pu4leiI5qhtw_vM6os8rgXhRnHs2do7mYGo6apy9JOTQzXQrQjSljjR_24NU0xTkf1EF7YxwOaFYNLwy_XK0OmWETy1Ku4q-Us_m1QXK6OcEoG9WK6p44SEp19Q`;
if (isScript) {
  main("LOG", accessToken, "", "October 11 to 24");
}
