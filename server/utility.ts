import settings from "~/settings.json";

const env = process.env.NODE_ENV || "development";

export const getConfig = () => {
  return settings[env];
};

// only filters 'undefined' and 'null'
export function filterNonNullishValues(object) {
  return Object.fromEntries(Object.entries(object).filter(([_, v]) => v !== undefined && v !== null));
}

// only filters 'undefined' and 'null' and ''
export function filterFalsyValues(object: Record<string, any>) {
  return Object.fromEntries(Object.entries(object).filter(([_, v]) => v || v === 0 || v === false));
}

export class OutputWriter {
  private res?: any;

  constructor(res?: any) {
    this.res = res;
  }

  write(output: any) {
    writeOutput(output, this.res);
  }
}

export const writeOutput = (output, res?) => {
  if (typeof output === "object") {
    output = JSON.stringify(output);
  }
  res ? res.write(output + "\n") : console.log(output);
};

export function CustomError(message: string, statusCode?: number) {
  this.name = "CustomError";
  this.message = message || "";
  this.statusCode = statusCode || 500;
  // https://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript#comment27917666_871646
  this.stack = new Error().stack;
}

CustomError.prototype = Error.prototype;

// https://stackoverflow.com/questions/31054910/get-functions-methods-of-a-class/31055217
export const enhanceClass = (Class) => {
  const props: string[] = [];
  let obj = Class;
  do {
    props.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)) && obj !== Object.prototype);

  const fns = props
    .sort()
    .filter((e, i, arr) => e !== arr[i + 1] && typeof Class[e] === "function" && e !== "constructor");

  for (const fn of fns) {
    // https://stackoverflow.com/questions/10970579/how-can-i-automatically-wrap-all-the-methods-of-a-class
    const fnRef = Class[fn];
    Class[fn] = async (req, res) => {
      try {
        // https://stackoverflow.com/questions/59716534/try-catch-issues-with-nested-functons-in-javascript
        await fnRef.apply(Class, [req, res]);
      } catch (e) {
        console.error(e);
        return res
          .status(e.statusCode || 500)
          .send(
            process.env.NODE_ENV === "production" && e.name !== "CustomError"
              ? "Oops, something went wrong."
              : e.message
          );
      }
    };
  }
};

export const parseCSV = (f: string[], headers: string[]) => {
  const json: Record<string, string>[] = [];
  f.forEach(function (d) {
    const tmp: Record<string, string> = {};
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
