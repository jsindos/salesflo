const path = require("path");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// const runXero = require("./scripts/xero");
// const uploadXeroToken = require("../scripts/aws/uploadXeroToken");

const shouldStop = { value: false };

const XERO_REFRESH_TOKEN = "XERO_REFRESH_TOKEN";
const XERO_ACCESS_TOKEN = "XERO_ACCESS_TOKEN";

module.exports = (app) => {
  const clearDirectoryMiddleware = (req, res, next) => {
    let isError = false;
    const directory = `${process.cwd()}/assets/xero`;
    fs.readdir(directory, (e, files) => {
      if (e) {
        console.log(e);
        isError = true;
      }

      for (const file of files) {
        if (file !== "index.js") {
          fs.unlink(path.join(directory, file), (e) => {
            if (e) {
              console.log(e);
              isError = true;
            }
          });
        }
      }
    });
    if (isError) res.sendStatus(500);
    else next();
  };

  const getXeroRefreshToken = async () => {
    const { data } = await axios.get(
      `https://s3.ap-southeast-2.amazonaws.com/pop.shop.apps/xero/${XERO_REFRESH_TOKEN}`
    );

    // const refreshToken = JSON.parse(data);

    return data;
  };

  const getXeroAccessToken = async () => {
    const { data } = await axios.get(`https://s3.ap-southeast-2.amazonaws.com/pop.shop.apps/xero/${XERO_ACCESS_TOKEN}`);

    return data;
  };

  app.get("/refresh-token-created-at", async (req, res) => {
    const refreshToken = await getXeroRefreshToken();
    res.send(String(refreshToken?.createdAt));
  });

  app.get("/generate-token", async (req, res) => {
    const refreshToken = await getXeroRefreshToken();

    const data = new FormData();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refreshToken.value);
    data.append("client_id", "F4DF997C96BA4FBCB171B3AB9AFD2F37");
    data.append("client_secret", "tIBTEkXU8EFRiRU39VnLALxVlDnks1RCIyCx4CfIBLWWB0AJ");

    const config = {
      method: "post",
      url: "https://identity.xero.com/connect/token?=",
      headers: {
        grant_type: "refresh_token",
        "Content-Type": "application/json",
        ...data.getHeaders(),
      },
      data,
    };

    console.log("refreshToken", refreshToken);
    console.log("generating xero access token...");

    axios(config)
      .then(async function (response) {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        console.log(accessToken);
        console.log(refreshToken);
        uploadXeroToken(XERO_REFRESH_TOKEN, JSON.stringify({ value: refreshToken, createdAt: Date.now() }, null, 2));
        uploadXeroToken(XERO_ACCESS_TOKEN, accessToken);
        res.sendStatus(201);
      })
      .catch(function (e) {
        console.log(e.response?.data || e.response || e);
        res.sendStatus(500);
      });
  });

  app.post("/stream", async (req, res) => {
    shouldStop.value = false;

    // Set appropriate headers for text streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const { isCreatingPurchaseOrders, reference } = req.body;
    const RUN_LEVEL = isCreatingPurchaseOrders ? "LOG" : "DEBUG";

    const accessToken = await getXeroAccessToken();

    await runXero(RUN_LEVEL, accessToken.value, reference, res, shouldStop);
  });

  app.get("/stream-test", async (req, res) => {
    shouldStop.value = false;

    // Set appropriate headers for text streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    let counter = 0;

    const sendChunk = () => {
      if (shouldStop.value) {
        res.end();
        return;
      }

      counter++;
      res.write(`Data chunk ${counter}\n`); // Send a chunk of data

      if (counter < 20) {
        setTimeout(sendChunk, 1000); // Wait 1 second, then send the next chunk
      } else {
        res.end(); // Close the connection after sending 5 chunks
      }
    };

    sendChunk(); // Start the simulated streaming
  });

  app.get("/stop-stream", (req, res) => {
    shouldStop.value = true;
    res.send("Streaming will be stopped.");
  });

  app.get("/test-xero-request", async (req, res) => {
    try {
      const accessToken = await getXeroAccessToken(req);

      console.log("accessToken", accessToken);

      const config = {
        method: "get",
        url: "https://api.xero.com/connections",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios(config);
      res.json(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).send("Error fetching data from Xero");
    }
  });
};
