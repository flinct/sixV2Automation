import userDataSpam from "../data/spamLogin.js";
import elementAuth from "../commands/auth.js";
import elementToast from "../commands/notification.js";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../selectorBase.js";
// import { log, timeout } from "async";
import { env_config } from "../01_url_page.js";
import { platform } from "process";
// import { platform } from "process";
const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");
const randomNumber = Math.floor(Math.random() * 10000000);
const randomNumber2 = Math.floor(Math.random() * 1000) + 1000;
const nib = Math.floor(Math.random() * 1000000000000); //13 digits
const npwp = Math.floor(Math.random() * 100000000000000); //15 digits
const idNumber = Math.floor(Math.random() * 1000000000000000); //16 digits
const config = env_config(baseUrl);
const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);

function logout() {
  cy.userLoginNameLabel().click();
  cy.softAssert(cy.contains("Log Out").click(), "button logout found");
  cy.wait(2000);
  cy.softAssert(cy.url().should("include", "/login"), "directed to login page");
}

function checkResponseGetChannel(getResponse) {
  const { status, body } = getResponse;
  if (status === 200) {
    const totalChannel = getResponse.body.pagination.total;
    cy.task("log", "✅ Success");
    if (totalChannel === 0) {
      const stop = "total channel 0, create first";
      return stop;
    }
    if (totalChannel === 1) {
      cy.task("log", `total channel is 1`);
      const data = getResponse.body.items.map((item) => ({
        channelId: item.id,
        platformName: item.platform.name,
        platformCode: item.platform.code,
        platformId: item.platform.id,
        channelStatus: item.status,
      }));
      // return data
      const firstData = data[0].channelId;
      const firstDataPlatform = data[0].platformName;
      const firstDataPlatCode = data[0].platformCode;
      const firstDataPlatformId = data[0].platformId;
      const firstDataChannelStatus = data[0].channelStatus;
      return {
        firstData,
        firstDataPlatform,
        firstDataPlatCode,
        firstDataPlatformId,
        firstDataChannelStatus,
        data,
      };
    }
    if (totalChannel >= 1) {
      cy.task("log", `total channel more than 1`);
      cy.task("log", totalChannel);
      const data = getResponse.body.items.map((item) => ({
        channelId: item.id,
        platformName: item.platform.name,
        platformCode: item.platform.code,
        platformId: item.platform.id,
        channelStatus: item.status,
      }));
      // return data
      const firstData = data[0].channelId;
      const firstDataPlatform = data[0].platformName;
      const firstDataPlatCode = data[0].platformCode;
      const firstDataPlatformId = data[0].platformId;
      const firstDataChannelStatus = data[0].channelStatus;
      const secondData = data[1].channelId;
      const secondDataPlatformId = data[1].platformId;
      return {
        firstData,
        firstDataPlatform,
        firstDataPlatCode,
        firstDataPlatformId,
        firstDataChannelStatus,
        secondData,
        secondDataPlatformId,
        data,
      };
    }
  }
  if (status >= 400 && status < 500) {
    cy.task("log", `⚠️ Client error: ${status}`);
    cy.task("log", JSON.stringify(body, null, 2));
  }
  if (status >= 500) {
    cy.task("log", `🚨 Server error: ${status}`);
  }
  if (status !== 200 && (status < 400 || status >= 600)) {
    cy.task("log", `ℹ️ Unexpected status: ${status}`);
  }
  return null;
}

function checkResponseFrom(getResponse) {
  const { status, body } = getResponse;
  if (status >= 400 && status < 500) {
    cy.task("log", `⚠️ Client error: ${status}`);
    cy.task("log", JSON.stringify(body, null, 2));
  }
  if (status >= 500) {
    cy.task("log", `🚨 Server error: ${status}`);
  }
  if (status !== 200 && (status < 400 || status >= 600)) {
    cy.task("log", `ℹ️ Unexpected status: ${status}`);
  }
  return null;
}

class channelAPIPage {
  loginWithAPI() {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody_CT2,
    }).then((response) => {
      const accessToken = response.body.accessToken;
      cy.wrap(accessToken).as("accessToken");
    });
  }

  getAllPlatform(accessToken) {
    cy.request({
      method: "GET",
      url: config.platform,
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((platformResp) => {
      const platforms = platformResp.body.items.map((item) => ({
        platformId: item.id,
        platformName: item.name,
      }));
      cy.wrap(platforms).as("platforms");
    });
  }

  getChannel() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const data = getResponse.body.items.map((item) => ({
          channelId: item.id,
          platformName: item.platform.name,
          platformCode: item.platform.code,
        }));
        cy.log(JSON.stringify(data));
      });
    });
  }
  getChannelOmitToken() {
    this.loginWithAPI();
    cy.request({
      method: "GET",
      url: config.channel,
      headers: { Authorization: `Bearer 1928312839128390128adsadadasdasd` },
      failOnStatusCode: false,
    }).then((getResponse) => {
      const data = getResponse.body.message;
      const dataStatus = getResponse.body.statusCode;
      if (data === "Authentication required") {
        cy.task("log", `error message : ${JSON.stringify(data)}`);
        cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
      } else {
        cy.task("log", "failed get error status");
        throw error;
      }
    });
  }
  getChannelInvalidToken() {
    this.loginWithAPI();
    cy.request({
      method: "GET",
      url: config.channel,
      headers: { Authorization: `Bearer 1928312839128390128adsadadasdasd` },
      failOnStatusCode: false,
    }).then((getResponse) => {
      const data = getResponse.body.message;
      const dataStatus = getResponse.body.statusCode;
      if (data === "Authentication required") {
        cy.task("log", `error message : ${JSON.stringify(data)}`);
        cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
      } else {
        cy.task("log", "failed get error status");
        throw error;
      }
    });
  }
  getChannelExpiredToken() {
    this.loginWithAPI();
    cy.request({
      method: "GET",
      url: config.channel,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2OGVmMTUyNGQwMDI2OWJiZWZjOTZmM2MiLCJlbWFpbCI6Imhhc2F0bzQ0NDRAZ3RhNWh4LmNvbSIsIm9yZ2FuaXphdGlvbklkIjoiNjhlZjE1MjRkMDAyNjliYmVmYzk2ZjNlIiwic2Vzc2lvbklkIjoiMzk1NTE2NTEtODE4MS00Mjk4LTg0ZGYtYTQ4YTg3NDI4Zjg2Iiwic3ViIjoiNjhlZjBiYTA0NGZlZmRkYWFhZDRkNTJlIiwidXNlcm5hbWUiOiJjaGlja2VudGVzdGVyMDEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYxMDUxNjk0LCJleHAiOjE3NjEwNTI1OTQsImF1ZCI6InNhdHVpbmJveC11c2VycyIsImlzcyI6InNhdHVpbmJveC1hcHAifQ.E3L23yQ_5MqHKxHjGngxZjAHht2JqJWwLyoZ0B85-YI`,
      },
      failOnStatusCode: false,
    }).then((getResponse) => {
      const data = getResponse.body.message;
      const dataStatus = getResponse.body.statusCode;
      if (data === "Authentication required") {
        cy.task("log", `error message : ${JSON.stringify(data)}`);
        cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
      } else {
        cy.task("log", "failed get error status");
        throw error;
      }
    });
  }
  getChannelErrorServerSimulation() {
    this.loginWithAPI();
    cy.intercept("GET", config.channel, {
      statusCode: 500,
      body: {
        success: false,
        message: "Simulated database error",
      },
    }).as("simulateDbError");

    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "x-simulate-db-error": "true",
        },
        failOnStatusCode: false,
      }).then((getResponse) => {
        const data = getResponse.body.message;
        const dataStatus = getResponse.body.statusCode;
        if (dataStatus === "500") {
          cy.task("log", `error message : ${JSON.stringify(data)}`);
          cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
        } else {
          cy.task("log", "failed simulate server error");
        }
      });
    });
  }
  getChannelInvalidValueParam() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channelInvalidValueParam,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false,
      }).then((getResponse) => {
        const data = getResponse.body.message;
        const dataStatus = getResponse.body.statusCode;
        if (dataStatus === 500) {
          cy.task("log", `error message : ${JSON.stringify(data)}`);
          cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
        }
        if (dataStatus === 400) {
          cy.task("log", `error message : ${JSON.stringify(data)}`);
          cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
          // cy.task("log", "failed get error status");
          // failOnStatusCode: true;
          // throw new Error(`Failed get error status 500 from response`);
        }
      });
    });
  }
  getChannelInvalidParamInput() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channelInvalidInputParam,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false,
      }).then((getResponse) => {
        const data = getResponse.body.message;
        const dataStatus = getResponse.body.statusCode;
        if (dataStatus === 500) {
          cy.task("log", `error message : ${JSON.stringify(data)}`);
          cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
        }
        if (dataStatus === 400) {
          cy.task("log", `error message : ${JSON.stringify(data)}`);
          cy.task("log", `status code : ${JSON.stringify(dataStatus)}`);
          // cy.task("log", "failed get error status");
          // failOnStatusCode: true;
          // throw new Error(`Failed get error status 500 from response`);
        }
      });
    });
  }

  createChannel() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId));
        // cy.log(JSON.stringify(pickPlatformId));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: pickPlatformId.platformId,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          if (statusResponse === 409) {
            const messaggeResponse = getResponse.body.message;
            cy.task("log", `status : ${statusResponse} data already exist`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
          if (statusResponse === 200 || statusResponse === 201) {
            const channelId = getResponse.body.id;
            const platformId = getResponse.body.platform.id;
            const platformname = getResponse.body.platform.name;
            cy.task("log", `response channel id : ${channelId}`);
            cy.task("log", `response platform id : ${platformId}`);
            cy.task("log", `response platform name : ${platformname}`);
          }
        });
      });
    });
  }
  createChannelMissingPlatform() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            // platform: pickPlatformId.id,
            // status: randomStatus,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelMissingStatus() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: pickPlatformId.id,
            // status: randomStatus,
            // status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelInvalidPlatformId() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: "129319239129319",
            // status: randomStatus,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelInvalidStatusType() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: pickPlatformId.id,
            // status: randomStatus,
            status: 123,
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelUnexpectedStatusValue() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: pickPlatformId.id,
            // status: randomStatus,
            status: `123${accessToken}`,
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelInvalidJSONBodyValue() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            id: 101,
            tags: "support",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelOmitToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          // headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: pickPlatformId.id,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelInvalidToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer blabla123` },
          body: {
            platform: pickPlatformId.id,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChannelExpiredToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer expiredblabla123` },
          body: {
            platform: pickPlatformId.id,
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChanneTrySQLInjection() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: "' OR '1'='1' -- ",
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChanneTryNoSQLInjection() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: {
            platform: { $ne: null },
            status: "active",
          },
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }
  createChanneTryInvalidMediaType() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.get("@platforms").then((platforms) => {
        const pickPlatformId =
          platforms[Math.floor(Math.random() * platforms.length)];
        cy.log(JSON.stringify(pickPlatformId.name));
        cy.log(JSON.stringify(pickPlatformId.id));

        const statuses = ["active", "non-active"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        cy.request({
          method: "POST",
          url: config.channel,
          headers: { Authorization: `Bearer ${accessToken}` },
          body: "ayam",
          failOnStatusCode: false,
        }).then((getResponse) => {
          const statusResponse = getResponse.body.statusCode;
          const messaggeResponse = getResponse.body.message;

          if (statusResponse === 200) {
            cy.task(
              "log",
              `response channel id :` + JSON.stringify(getResponse.body.id)
            );
            cy.task(
              "log",
              `response platform id :` +
                JSON.stringify(getResponse.body.platform.id)
            );
            cy.task(
              "log",
              `response platform name :` +
                JSON.stringify(getResponse.body.platform.name)
            );
          }
          if (statusResponse === 400 || statusResponse === 401) {
            // throw new Error(`error message : ${messaggeResponse}`);
            cy.task("log", `status : ${statusResponse} bad request`);
            cy.task("log", `error message : ${messaggeResponse}`);
          }
        });
      });
    });
  }

  getChannelbyID() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
          // cy.task("log", "total channel 0, create first");
        }
        // if (result === "total channel 0, create first")
        else {
          cy.log(`all response data channel : ` + JSON.stringify(result));
          const firstData = result.firstData;
          cy.log(`get first data channel : ` + JSON.stringify(firstData));

          cy.request({
            method: "GET",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
          }).then((getByIdResponse) => {
            const getByIdResponseChannelId = getByIdResponse.body.id;

            if (getByIdResponseChannelId === firstData) {
              cy.task(
                "log",
                `response from API get by id is : ${getByIdResponseChannelId}, is equal with response from API get all : ${firstData}`
              );
            }
            if (getByIdResponseChannelId !== firstData) {
              // cy.task(
              //   "log",
              //   `response Id did not matched, actual from get by id is : ${getByIdResponseChannelId}`
              // );
              throw new Error(
                `response Id did not matched, actual from get by id is : ${getByIdResponseChannelId}`
              );
            }
          });
        }
      });
    });
  }
  getChannelbyNonExistID() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.request({
        method: "GET",
        url: config.channelById + 234,
        headers: { Authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((getResponse) => {
        const messaggeResponse = getResponse.body.message;
        const codeResponse = getResponse.body.statusCode;
        cy.log(messaggeResponse);
        if (codeResponse === 400) {
          cy.task(
            "log",
            `response from API is : ${codeResponse}, with error message : ${messaggeResponse}`
          );
        }
        if (codeResponse !== 400) {
          throw new Error(`another error response : ${messaggeResponse}`);
        }
      });
    });
  }
  getChannelbyInvalidID() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.request({
        method: "GET",
        url: config.channelById + "2341&*^%^&*%",
        headers: { Authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((getResponse) => {
        //complex if logic html error exist method get
        const { status, statusText, body } = getResponse;
        let messageResponse = "";
        let codeResponse = status;

        if (body && typeof body === "object") {
          if (Array.isArray(body.message)) {
            messageResponse.body.message.join(", ");
          }
          if (!messageResponse && typeof body.message === "string") {
            messageResponse.body.message;
          }
          if (
            !messageResponse &&
            body.details &&
            Array.isArray(body.details.message)
          ) {
            messageResponse = body.detail.message.join(", ");
          }
          if (!messageResponse) {
            messageResponse = JSON.stringify(body);
          }
          if (body.statusCode) {
            codeResponse = body.statusCode;
          }
        }

        if (typeof body === "string" && body.includes("<html")) {
          messageResponse = `HTML response (likely Cloudflare or porxy error)`;
        }
        if (!messageResponse) {
          messageResponse = JSON.stringify(body);
        }

        cy.task("log", `status : ${status} ${statusText}`);
        cy.task("log", `message : ${messageResponse}`);

        if (status === 400) {
          cy.task("log", `bad request 400 : ${messageResponse}`);
        }
        if (status === 500) {
          cy.task("log", `server error ${status} : ${messageResponse}`);
        }
      });
    });
  }
  getChannelbyIdOmitToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      this.getAllPlatform(accessToken);
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          // const secondData = data[1].channelId;
          cy.log(`get first data channel : ` + JSON.stringify(firstData));

          cy.request({
            method: "GET",
            url: config.channelById + firstData,
            // headers: { Authorization: `Bearer ${accessToken}` },
            failOnStatusCode: false,
          }).then((getByIdResponse) => {
            const messaggeResponse = getByIdResponse.body.message;
            const codeResponse = getByIdResponse.body.statusCode;
            cy.log(messaggeResponse);
            if (codeResponse === 400 || codeResponse === 401) {
              cy.task(
                "log",
                `response from API is : ${codeResponse}, with error message : ${messaggeResponse}`
              );
            }
            if (codeResponse !== 400) {
              cy.task("log", `another error response : ${messaggeResponse}`);
              // throw new Error(`another error response : ${messaggeResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannel() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          cy.log(`get first data channel : ` + JSON.stringify(firstData));
          cy.log(
            `get first data channel platform id : ` +
              JSON.stringify(firstDataPlatform)
          );
          cy.log(
            `get first data channel platform code: ` +
              JSON.stringify(firstDataPlatCode)
          );
          cy.log(
            `get first data channel platform code: ` +
              JSON.stringify(firstDataPlatformId)
          );

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              platform: firstDataPlatformId,
              status: usedStatus,
            },
            // failOnStatusCode: false,
          }).then((responsePatch) => {
            const responsePatchChannelId = responsePatch.body.id;
            const responsePatchPlatform = responsePatch.body.platform.name;
            const responsePatchPlatCode = responsePatch.body.platform.code;
            const responsePatchPlatformId = responsePatch.body.platform.id;
            const responsePatchChannelStatus = responsePatch.body.status;

            if (responsePatchChannelStatus !== firstDataChannelStatus) {
              cy.task("log", `full patch success`);
            }
            if (responsePatchChannelStatus === firstDataChannelStatus) {
              cy.task("log", `full patch failed`);
            }
          });
        }
      });
    });
  }
  patchChannelPartial() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          // const secondData = data[1].channelId;
          cy.log(`get first data channel : ` + JSON.stringify(firstData));
          cy.log(
            `get first data channel platform id : ` +
              JSON.stringify(firstDataPlatform)
          );
          cy.log(
            `get first data channel platform code: ` +
              JSON.stringify(firstDataPlatCode)
          );
          cy.log(
            `get first data channel platform code: ` +
              JSON.stringify(firstDataPlatformId)
          );

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              // platform: firstDataPlatformId,
              status: usedStatus,
            },
            // failOnStatusCode: false,
          }).then((responsePatch) => {
            const responsePatchChannelId = responsePatch.body.id;
            const responsePatchPlatform = responsePatch.body.platform.name;
            const responsePatchPlatCode = responsePatch.body.platform.code;
            const responsePatchPlatformId = responsePatch.body.platform.id;
            const responsePatchChannelStatus = responsePatch.body.status;

            if (responsePatchChannelStatus !== firstDataChannelStatus) {
              cy.task(
                "log",
                `partial patch success change status to ${usedStatus}`
              );
            }
            if (responsePatchChannelStatus === firstDataChannelStatus) {
              cy.task("log", `full patch failed`);
            }
          });
        }
      });
    });
  }
  patchChannelWithNonexistPlatform() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          // const secondData = data[1].channelId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              platform: "ayam",
              status: usedStatus,
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                messageResponse.body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelWithNonexistChannelId() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          // const secondData = data[1].channelId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + 29292929,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              platform: firstDataPlatformId,
              status: usedStatus,
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                messageResponse.body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelWithEmptyBody() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          // const secondData = data[1].channelId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {},
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                messageResponse.body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelWithChangeIdPlatform() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              platform: secondDataPlatformId,
              status: usedStatus,
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                messageResponse.body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelOmitToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            // headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              platform: secondDataPlatformId,
              status: usedStatus,
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400 || status === 401) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelInvalidToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer 12312931293129` },
            body: {
              platform: secondDataPlatformId,
              status: usedStatus,
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400 || status === 401) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelInjectionSQL() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              status: "' OR '1'='1' -- ",
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400 || status === 401) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  patchChannelInjectionNoSQL() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "PATCH",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            body: {
              // status: "' OR '1'='1' -- ",
              platform: { $ne: null },
            },
            failOnStatusCode: false,
          }).then((responsePatch) => {
            //complex if logic for post/patch
            const { status, statusText, body } = responsePatch;
            let messageResponse = "";
            let codeResponse = status;

            if (body && typeof body === "object") {
              // if (Array.isArray(body.message)) {
              //   messageResponse.body.message.join(", ");
              // }
              if (!messageResponse && typeof body.message === "string") {
                body.message;
              }
              // if (
              //   !messageResponse &&
              //   body.details &&
              //   Array.isArray(body.details.message)
              // ) {
              //   messageResponse = body.detail.message.join(", ");
              // }
              if (!messageResponse) {
                messageResponse = JSON.stringify(body);
              }
              if (body.statusCode) {
                codeResponse = body.statusCode;
              }
            }

            if (typeof body === "string" && body.includes("<html")) {
              messageResponse = `HTML response (likely Cloudflare or porxy error)`;
            }
            if (!messageResponse) {
              messageResponse = JSON.stringify(body);
            }

            if (status === 400 || status === 401) {
              cy.task("log", `bad request 400 : ${messageResponse}`);
            }
            if (status === 500) {
              cy.task("log", `server error ${status} : ${messageResponse}`);
            }
          });
        }
      });
    });
  }
  deleteChannel() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "DELETE",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            failOnStatusCode: false,
          }).then((responseDel) => {
            const responseDelete = responseDel.body.success;
            const responseDeleteMessage = responseDel.body.message;
            if (responseDelete === true) {
              cy.task("log", `delete success, ${responseDelete}`);
            } else {
              cy.task("log", `delete failed`);
            }
          });
        }
      });
    });
  }
  deleteChannelIdempotency() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "GET",
        url: config.channel,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((getResponse) => {
        const result = checkResponseGetChannel(getResponse);

        if (result === "total channel 0, create first") {
          throw new Error("total channel 0, create first");
        }
        if (result !== "total channel 0, create first") {
          const firstData = result.firstData;
          const firstDataPlatform = result.firstDataPlatform;
          const firstDataPlatCode = result.firstDataPlatCode;
          const firstDataPlatformId = result.firstDataPlatformId;
          const firstDataChannelStatus = result.firstDataChannelStatus;
          const secondData = result.secondData;
          const secondDataPlatformId = result.secondDataPlatformId;

          // const result = checkResponseGetChannel(getResponse);

          // const firstDataChannelStatus = result;
          const usedStatus =
            firstDataChannelStatus === "active" ? "inactive" : "active";

          cy.request({
            method: "DELETE",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            failOnStatusCode: false,
          }).then((responseDel) => {
            const responseDelete = responseDel.body.success;
            const responseDeleteMessage = responseDel.body.message;
            cy.task("log", ` first delete response : ${responseDelete}`);
          });

          cy.request({
            method: "DELETE",
            url: config.channelById + firstData,
            headers: { Authorization: `Bearer ${accessToken}` },
            failOnStatusCode: false,
          }).then((responseDel) => {
            const responseDelete = responseDel.body.success;
            const responseDeleteMessage = responseDel.body.message;
            if (responseDelete === true) {
              cy.task("log", `delete success, ${responseDelete}`);
            } else {
              cy.task("log", `delete failed`);
            }
          });
        }
      });
    });
  }
  deleteChannelNonExistId() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "DELETE",
        url: config.channelById + 123,
        headers: { Authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((responsePatch) => {
        //complex if logic for post/patch
        const { status, statusText, body } = responsePatch;
        let messageResponse = "";
        let codeResponse = status;

        if (body && typeof body === "object") {
          // if (Array.isArray(body.message)) {
          //   messageResponse.body.message.join(", ");
          // }
          if (!messageResponse && typeof body.message === "string") {
            body.message;
          }
          // if (
          //   !messageResponse &&
          //   body.details &&
          //   Array.isArray(body.details.message)
          // ) {
          //   messageResponse = body.detail.message.join(", ");
          // }
          if (!messageResponse) {
            messageResponse = JSON.stringify(body);
          }
          if (body.statusCode) {
            codeResponse = body.statusCode;
          }
        }

        if (typeof body === "string" && body.includes("<html")) {
          messageResponse = `HTML response (likely Cloudflare or porxy error)`;
        }
        if (!messageResponse) {
          messageResponse = JSON.stringify(body);
        }

        if (status === 400 || status === 401) {
          cy.task("log", `bad request 400 : ${messageResponse}`);
        }
        if (status === 500) {
          cy.task("log", `server error ${status} : ${messageResponse}`);
        }
      });
    });
  }
  deleteChannelOmitToken() {
    this.loginWithAPI();
    cy.get("@accessToken").then((accessToken) => {
      cy.request({
        method: "DELETE",
        url: config.channelById + 123,
        failOnStatusCode: false,
      }).then((responsePatch) => {
        //complex if logic for post/patch
        const { status, statusText, body } = responsePatch;
        let messageResponse = "";
        let codeResponse = status;

        if (body && typeof body === "object") {
          // if (Array.isArray(body.message)) {
          //   messageResponse.body.message.join(", ");
          // }
          if (!messageResponse && typeof body.message === "string") {
            body.message;
          }
          // if (
          //   !messageResponse &&
          //   body.details &&
          //   Array.isArray(body.details.message)
          // ) {
          //   messageResponse = body.detail.message.join(", ");
          // }
          if (!messageResponse) {
            messageResponse = JSON.stringify(body);
          }
          if (body.statusCode) {
            codeResponse = body.statusCode;
          }
        }

        if (typeof body === "string" && body.includes("<html")) {
          messageResponse = `HTML response (likely Cloudflare or porxy error)`;
        }
        if (!messageResponse) {
          messageResponse = JSON.stringify(body);
        }

        if (status === 400 || status === 401) {
          cy.task("log", `bad request 400 : ${messageResponse}`);
        }
        if (status === 500) {
          cy.task("log", `server error ${status} : ${messageResponse}`);
        }
      });
    });
  }
}
export default channelAPIPage;
// Body: {
// "message": "Channel with Platform '68f0c28e541c71d841a78b9e' already exists",
// "statusCode": 409,
// "success": false,
// "timestamp": "2025-10-22T02:17:56.370Z"
// }
