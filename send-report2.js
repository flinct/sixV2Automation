require("dotenv").config(); // ← tambahkan ini paling atas

const fs = require("fs");
const nodemailer = require("nodemailer");

const logFilename = process.env.LOG_FILENAME || "monitoringSAP_log_latest.json";
const logPath = `./cypress/reports/final-report/${logFilename}`; //path lokal
// const logPath = `./cypress/logs/${logFilename}`; //path github

let listAkun;

try {
  const logContent = fs.readFileSync(logPath, "utf8");
  const logData = JSON.parse(logContent);

  if (Array.isArray(logData) && logData.length > 0) {
    listAkun = logData[0];

    const akunNonAktif = listAkun.listNonAktifAkun.map((str) => str);
    const akunAktif = listAkun.listAkunAktif.map((str) => str);

    console.log("Total Akun Non Aktif : ", listAkun.totalAkunNonAktif);
    console.log("List Non Aktif :");
    akunNonAktif.forEach((akun, index) => {
      console.log(
        `${index + 1}. Divisi : ${akun.logNameDivision}, Nomor: ${
          akun.logAccountNumberWhatsapp
        }, Status: ${akun.logStatusAccount}`
      );
    });
    console.log("Total Akun Aktif : ", listAkun.totalAkunAktif);
    akunAktif.forEach((akun_, index_) => {
      console.log(
        `${index_ + 1}. Divisi : ${akun_.logNameDivision}, Nomor: ${
          akun_.logAccountNumberWhatsapp
        }, Status: ${akun_.logStatusAccount}`
      );
    });

    // console.log(listAkunNonAktif);
  }
} catch (error) {
  console.error("❌ Gagal membaca log:", error);
}

if (listAkun.totalAkunNonAktif > 0) {
  console.log("kirim email");
  // ENV
  const senderEmail = process.env.EMAIL_FROM;
  const senderPassword = process.env.EMAIL_PASS;
  const recipientEmail = process.env.EMAIL_TO;
  const recipientEmail2 = "mico.febrian@orderfaz.com";
  const recipientEmail3 = "dany.christian@orderfaz.com";
  const recipientEmail4 = "kamil.hidayatuloh@orderfaz.com";
  const recipientEmail5 = "rizal.syalman@orderfaz.com";
  const recipientEmail6 = "aldi.ansyah@orderfaz.com";
  const recipientEmail7 = "";

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
    to: [
      recipientEmail,
      recipientEmail2,
      recipientEmail3,
      recipientEmail4,
      recipientEmail6,
      recipientEmail5,
    ],
    // to: "flinctchristian@gmail.com",
    subject: `📋 Cypress Report | Monitoring Report JABODETABEK`,
    html: `<b>Terlampir laporan hasil testing.</b>
    `,
    attachments: [
      {
        filename: logFilename,
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
  console.log("kirim email sukses");
}
if ((listAkun.totalAkunNonAktif = 0)) {
  console.log("Tidak perlu kirim email");
}
