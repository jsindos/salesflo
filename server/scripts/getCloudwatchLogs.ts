#!/usr/bin/env node

import { CloudWatchEvent } from "~/services/cloudwatch.service";
import db from "../db";

// can be run like `./scripts/db/getCloudwatchLogs.js --staging` to get staging logs
const main = async () => {
  let allEvents: CloudWatchEvent[] = [];

  let repeats = Number(process.argv[2]);

  if (isNaN(repeats)) repeats = 0;

  for (let repeat = 0; repeat <= repeats; repeat++) {
    // we removed repeats functionality working, look in pop-b if you need this again
    const response = await db.services.CloudWatchService.getLogEvents();

    allEvents = [...response.events, ...allEvents];
  }

  console.log(
    allEvents
      .map((e) => {
        const timestamp = `\x1b[40m\x1b[1;37m${e.prettyTimestamp}\x1b[0m`;
        const padding = " ".repeat(e.prettyTimestamp.length);
        return e.message
          .trim()
          .split("\n")
          .map((line, i) => (i === 0 ? `${timestamp} ${line}` : `${padding} ${line}`))
          .join("\n");
      })
      .join("\n")
  );

  console.log(
    `\n${allEvents.length} entries, spanning from ${allEvents[0].prettyTimestamp} to ${allEvents[allEvents.length - 1].prettyTimestamp}`
  );

  process.exit();
};

main();
