// https://docs.aws.amazon.com/opensearch-service/latest/developerguide/request-signing.html#request-signing-node
import {
  CloudWatchLogsClient,
  GetLogEventsCommand,
  DescribeLogStreamsCommand,
  GetLogEventsCommandInput,
} from "@aws-sdk/client-cloudwatch-logs";
import moment from "moment";
import { DB } from "~/db";

let accessKeyId, secretAccessKey, logGroupName, prefixLength;

// cat ~/.aws/credentials
// instead, pass accessKeyId and secretAccessKey in with command line args
if (process.argv[2] === "--staging") {
  logGroupName = "/aws/elasticbeanstalk/staging/var/log/web.stdout.log";
  prefixLength = 35;
} else {
  logGroupName = "/aws/elasticbeanstalk/Salesflo-env/var/log/web.stdout.log";
  prefixLength = 36;
}

const client = new CloudWatchLogsClient({ region: "ap-southeast-2", credentials: { accessKeyId, secretAccessKey } });

const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

function niceBytes(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1000 && ++l) {
    n = n / 1000;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

export interface CloudWatchEvent {
  message: string;
  timestamp: number;
  prettyTimestamp: string;
}

export default class CloudWatchService {
  private db: DB;

  constructor(db) {
    this.db = db;
  }

  async getLogEvents({ nextToken }: { nextToken?: string } = {}) {
    let response: { events: CloudWatchEvent[] } = { events: [] };
    let calls = 0;

    let logStreamName;

    const command = new DescribeLogStreamsCommand({
      logGroupName,
    });

    let { logStreams } = await client.send(command);

    logStreams = logStreams?.sort((a, b) => (b?.lastEventTimestamp ?? 0) - (a?.lastEventTimestamp ?? 0)) || [];

    if (!logStreams || !logStreams.length) console.log("Could not find log streams");

    logStreamName = logStreams[0].logStreamName;

    while (calls < 10) {
      const args: GetLogEventsCommandInput = {
        logGroupName,
        logStreamName,
        ...(nextToken ? { nextToken } : {}),
      };
      const command = new GetLogEventsCommand(args);
      const nextResponse = await client.send(command);
      nextToken = nextResponse.nextBackwardToken;
      response = {
        ...nextResponse,
        events: [...(nextResponse.events ?? []), ...response.events] as CloudWatchEvent[],
      };
      calls++;
    }

    const events = response.events
      .map(({ message, ...rest }) => {
        const firstColonIndex = message.indexOf(":");
        const secondColonIndex = message.indexOf(":", firstColonIndex + 1);
        const thirdColonIndex = message.indexOf(":", secondColonIndex + 1);
        let parsedMessage = message.substring(thirdColonIndex + 1);
        // attempt to convert content-length to human readable format
        const splitMessage = message.split(" ");
        const contentLength = Number(splitMessage[splitMessage.length - 1]);
        if (!isNaN(contentLength)) {
          splitMessage.pop();
          splitMessage.push(niceBytes(contentLength));
          parsedMessage = splitMessage.join(" ");
        }
        return {
          message: parsedMessage,
          lines: 1,
          ...rest,
          prettyTimestamp: moment(rest.timestamp).format("MMM DD HH:mm:ss"),
          //   prettyTimestamp: moment.utc(message.substring(0, 15)).tz("Australia/Sydney").format("MMM DD HH:mm:ss"),
        };
      })
      // concatenate all messages together that have the same timestamp
      .reduce((a: { message: string; timestamp: number; lines: number; prettyTimestamp: string }[], c) => {
        const matchingIndex = a.findIndex(({ timestamp }) => timestamp === c.timestamp);
        // const matchingIndex = a.findIndex(({ prettyTimestamp }) => prettyTimestamp === c.prettyTimestamp);
        if (matchingIndex !== -1) {
          const match = a[matchingIndex];
          if (
            (match.message.substring(0, 4) !== "POST" && match.message.substring(0, 3) !== "GET") ||
            (c.message.substring(0, 4) !== "POST" && c.message.substring(0, 3) !== "GET")
          ) {
            return [
              ...a.slice(0, matchingIndex),
              { ...match, message: match.message + "\n" + c.message, lines: match.lines + 1 },
              ...a.slice(matchingIndex + 1, a.length),
            ];
          }
        }
        return [...a, c];
      }, [])
      .map(({ message, ...rest }) => {
        let json;
        try {
          json = JSON.parse(message);
        } catch (e) {}
        if (message.substring(0, 4) === "POST") {
          return {
            message: message.substring(4),
            type: "POST",
            ...rest,
          };
        } else if (message.substring(0, 3) === "GET") {
          return {
            message: message.substring(3),
            type: "GET",
            ...rest,
          };
        }
        return {
          message: json ? JSON.stringify(json, null, 4) : message,
          ...rest,
        };
      });
    return {
      ...response,
      events,
    };
  }
}
