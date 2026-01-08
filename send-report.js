require("dotenv").config(); // ← tambahkan ini paling atas

const fs = require("fs");
const nodemailer = require("nodemailer");

const logFilename = process.env.LOG_FILENAME || "session_log_latest.json";
const logPath = `./cypress/reports/final-report/${logFilename}`; //path lokal
// const logPath = `./cypress/logs/${logFilename}`; //path github

// Baca isi log
let messageStatusCode;
let messageResponseText;

try {
  const logContent = fs.readFileSync(logPath, "utf8");
  const logData = JSON.parse(logContent);

  if (Array.isArray(logData) && logData.length > 0) {
    const firstLog = logData[0];
    const firstMessageLog = firstLog.messageLogs && firstLog.messageLogs[0];
    const firstInboxLogs = firstLog.inboxLogs && firstLog.inboxLogs[0];

    if (firstMessageLog) {
      messageStatusCode = firstMessageLog.messageStatusCode;
      messageResponseText = JSON.stringify(
        firstMessageLog.messageResponse,
        null,
        2
      );
      messageWhatsappNumber =
        firstMessageLog.instanceInfo.instance_data.instance_key;
      companyName = firstInboxLogs.responseBodyInboxCompany.companyName;
    }
  }

  // 🔍 Log ke console
  console.log("✅ messageStatusCode:", messageStatusCode);
  console.log("✅ messageResponseText:", messageResponseText);
  console.log("✅ messageWhatsappNumber:", messageWhatsappNumber);
  console.log("✅ companyName:", companyName);
} catch (error) {
  console.error("❌ Gagal membaca log:", error);
}

// ENV
const senderEmail = process.env.EMAIL_FROM;
const senderPassword = process.env.EMAIL_PASS;
const recipientEmail = process.env.EMAIL_TO;
const recipientEmail2 = "mico.febrian@orderfaz.com";
const recipientEmail3 = "dany.christian@orderfaz.com";
const recipientEmail4 = "";

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    // user: "syncmchristian@gmail.com",
    pass: senderPassword,
    // pass: "ndilqrzfyzbgcqhy",
  },
});

// Compose email
const mailOptions = {
  from: senderEmail,
  // from: "syncmchristian@gmail.com",
  to: [recipientEmail, recipientEmail2, recipientEmail3],
  // to: "flinctchristian@gmail.com",
  subject: `📋 Cypress Report | ${messageWhatsappNumber} | ${messageStatusCode}`,
  html: `<b>Terlampir laporan hasil testing.</b><br/>
  company name : <code>${companyName}</code><br/> 
  status code : <code>${messageStatusCode}</code><br/>
  message response : <code>${messageResponseText}</code><br/>
  `,
  attachments: [
    // {
    //   filename: "mochawesome.html",
    //   path: "./mochawesome-report/mochawesome.html",
    // },
    {
      // filename: "session_log.json",
      filename: logFilename,
      // path: "./cypress/logs/session_log_latest.json", // atau gunakan file yang baru ditulis
      path: logPath,
    },
  ],
};

// Send
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email gagal:", error);
  } else {
    console.log("✅ Email terkirim:", info.response);
  }
});
