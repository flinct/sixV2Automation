const { defineConfig } = require("cypress");
const { execSync } = require("child_process");
const fs = require("fs-extra");
const { merge } = require("mochawesome-merge");
const generate = require("mochawesome-report-generator");
const chalk = require("chalk");
// const fs = require("fs");

const baseUrl = process.env.CYPRESS_baseUrl || "//localhost:3000";

module.exports = defineConfig({
  defaultCommandTimeout: 10000, //timeout untuk menunggu command dieksekusi
  pageLoadTimeout: 60000, //timeout untuk menunggu halaman selesai dimuat
  requestTimeout: 5000, //timeout untuk menunggu request selesai
  responseTimeout: 300000, //timeout untuk menunggu respons dari server

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/final-report",
    quiet: true,
    overwrite: false,
    html: false,
    attachments: true,
    embeddedScreenshot: true,
    inlineAssets: true,
    json: true,
  },

  e2e: {
    baseUrl: baseUrl,
    TAGS: "@UI",
    experimentalStudio: true,

    screenshotsFolder: "cypress/screenshots", // pastikan foldernya bernama benar
    videosFolder: "cypress/videos", // jika pakai video
    downloadsFolder: "cypress/downloads",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        error(message) {
          console.log(chalk.red(`${message}`));
          return null;
        },

        success(message) {
          console.log(chalk.green(`✅ ${message}`));
          return null;
        },
        readJsonFile(fileName) {
          if (fs.existsSync(fileName)) {
            try {
              const content = fs.readFileSync(fileName, "utf8");
              return JSON.parse(content);
            } catch (err) {
              console.error("❌ Failed to read JSON file:", err);
              return [];
            }
          }
          return [];
        },
        ensureLogsDir() {
          const dir = "cypress/logs";
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          return null;
        },
      });

      // run rename report then run send report
      // active when run locally
      on("after:run", () => {
        try {
          const taskType = config.env.taskType;

          if (taskType === "messageLog") {
            console.log("📦 Menyalin log terbaru...");
            execSync("node rename-report.js", { stdio: "inherit" });

            console.log("📨 Mengirim email report...");
            execSync("node send-report.js", { stdio: "inherit" });
          }
          if (taskType === "monitoring") {
            console.log("📦 Menyalin log terbaru...");
            execSync("node rename-report2.js", { stdio: "inherit" });

            console.log("📨 Mengirim email report...");
            execSync("node send-report2.js", { stdio: "inherit" });
          }
          if (taskType === "") {
            console.error("❌ taskType belum di input:", error);
          }
        } catch (error) {
          console.error(
            "❌ Gagal menjalankan script setelah tes selesai:",
            error
          );
        }
      });

      return config;
    },
  },
});
