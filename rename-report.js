const fs = require("fs");
const path = require("path");

function renameLatestLogToFinalReport() {
  const logsDir = path.join(__dirname, "cypress", "logs");
  const finalReportDir = path.join(
    __dirname,
    "cypress",
    "reports",
    "final-report"
  );

  if (!fs.existsSync(logsDir)) {
    console.error("❌ Folder logs tidak ditemukan:", logsDir);
    return;
  }

  const files = fs
    .readdirSync(logsDir)
    .filter((f) => f.startsWith("session_log_") && f.endsWith(".json"))
    .sort((a, b) => {
      const aTime = fs.statSync(path.join(logsDir, a)).mtime;
      const bTime = fs.statSync(path.join(logsDir, b)).mtime;
      return bTime - aTime;
    });

  if (files.length === 0) {
    console.error("❌ Tidak ada file log ditemukan.");
    return;
  }

  const latestFile = files[0];
  const sourcePath = path.join(logsDir, latestFile);
  const destinationPath = path.join(finalReportDir, "session_log_latest.json");

  if (!fs.existsSync(finalReportDir)) {
    fs.mkdirSync(finalReportDir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, destinationPath);
  console.log(
    `✅ ${latestFile} berhasil disalin ke final-report sebagai session_log_latest.json`
  );
}

renameLatestLogToFinalReport();
