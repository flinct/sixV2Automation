import { method } from "bluebird";
import { env_config } from "../../support/01_url_page.js";
import { numberAWB } from "../../support/awbGenerator.js";
import { generateBatchId, generatePOD } from "../../support/nameAndPhone.js";
import { generateRandomName } from "../../support/nameAndPhone.js";
import { generateRandomDivision } from "../../support/nameAndPhone.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import {
  generateRandomQuote,
  randomAnswer,
  randomAsk,
} from "../../support/quoteGenerator.js";
import { times } from "lodash";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";

describe("Open API broadcast", () => {
  const authAction = new authPage();

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);

  const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
  const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);
  // const timestamp = new Date().toISOString();//UTC
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  }); //GMT+7
  //   function getLocalReadable() {
  //   return new Date().toLocaleString('id-ID', {
  //     timeZone: 'Asia/Jakarta', // force GMT+7 if needed
  //     hour12: false
  //   });
  // }

  // console.log(getLocalReadable());
  // "21/08/2025 11.42.28"

  function body_message(randomQuote) {
    return {
      broadcastMessage: [
        // {
        //   numberWhatsappCustomer: "6289655057778",
        //   // message: `{[Haloo|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]} ${timestamp}`,
        //   message: [
        //     `{[Haloo|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]} ${timestamp}`,
        //     `{[Haloo 2|Hi 2|Hey there 2|How’s it going? 2|Nice to hear from you 2|What’s up? 2]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n\n{[Wishing you a pleasant day. 2| I hope you have a wonderful day ahead. 2| All the best for today. 2| Have a productive day 2]} ${timestamp}`,
        //   ],
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: `asd nama`,
        //     // division: `${generateRandomDivision()}`,
        //     division: `${generateRandomDivision()}`,
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`,
        //     batchId: `${generateBatchId()}`,
        //     proofOfdeliveryNumber: `${generatePOD()}`,
        //   },
        // },
        {
          //test delay wpm
          numberWhatsappCustomer: "6289655057778",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`,
            batchId: `${generateBatchId()}`,
            proofOfdeliveryNumber: `${generatePOD()}`,
          },
        },
        {
          numberWhatsappCustomer: "6282120813181",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6283849306083",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "628817761425",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285121929365",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285722569341",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285795294098",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6287728940621",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6289618319350",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "62811224084",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6285966254483* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6285966254483 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `asd nama`,
            // division: `${generateRandomDivision()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
            proofOfdeliveryNumber: `${generatePOD()}`, // batch number
          },
        },

        // {
        //   numberWhatsappCustomer: "6285135430934",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285147210599",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285147211100",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285135425746",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285147211129",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285147211061",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285198965975",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285198966005",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
        // {
        //   numberWhatsappCustomer: "6285135421718",
        //   message: `${generateRandomName()}/n
        //   your number AWB ${numberAWB()}/n
        //   ${randomQuote}`,
        //   // templateId: "86667", // id template broadcast (optional)
        //   properties: {
        //     contactName: { generateRandomName },
        //     division: { generateRandomDivision },
        //     senderName: "System-SAP",
        //     category: "food and baverage",
        //     orderId: `AWB- ${numberAWB()}`, // awb number
        //     batchId: { generateBatchId }, // batch number
        //   },
        // },
      ],
    };
  }

  function getAllList() {
    // numberAirWayBill.forEach((AWBnumber) => {
    cy.request({
      method: "GET",
      url: config.getAllNomorWhatsapp,
      // headers: config.headers_ms1,
      // headers: config.headers_CT,
      headers: selectedHeader,
      // headers: config.headers_testing270520252,
    }).then((response) => {
      // const accountNumbers = response.body.result.account_number_whatsapp;
      const accountNumbers = response.body.results.map(
        (value) => value.accountNumberWhatsapp
      );

      // const divisionName = response.body.result.map(
      //   (value) => value.division?.divisionName || "unknown"
      // );
      cy.task("log", `Response Body:  ${JSON.stringify(accountNumbers)}`);
      cy.task(
        "log",
        `Total account whatsapp active :  ${JSON.stringify(
          accountNumbers.length
        )}`
      );
      cy.wrap(accountNumbers).as("accountNumbers");
    });
    // })
  }

  function sendBroadcastMessage(
    staticNumber,
    // delay,
    delayBetween,
    messagePrefix = ""
  ) {
    const responseTimes = [];
    // const staticNumber = 6285135425714; //staging
    // const staticNumber = 6285158876037; //dev

    // accountList.forEach((accountNumbers) => {
    cy.wait(delayBetween).then(() => {
      // cy.wait(delay).then(() => {
      const randomQuote = generateRandomQuote();
      const startTime = Date.now();
      cy.log(JSON.stringify(selectedHeader, null, 2));
      cy.log(JSON.stringify(selectedBody, null, 2));
      const bodyMessageVal = body_message(randomQuote);
      cy.request({
        method: "POST",
        // url: config.openAPI_broadcast2 + staticNumber.toString(),
        url: config.openAPI_broadcast + staticNumber.toString(),
        // headers: config.headers_testing270520252,
        // headers: config.headers_ms1,
        // headers: config.headers_CT,
        headers: selectedHeader,
        // body: body_message(randomQuote),
        body: bodyMessageVal,
      }).then((response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        responseTimes.push(responseTime);
        cy.task(
          "log",
          `response time for ${staticNumber} : ${responseTime} ms`
        );
        const tierList = response.body.accountTier;
        cy.task("log", tierList);
      });
      cy.task("log", JSON.stringify(bodyMessageVal));
      // cy.softAssert(
      //   cy.dashboardNav(),
      //   `${messagePrefix} send message from ${accountNumbers}`
      // ); //command at CI
    });
    // });

    cy.then(() => {
      const total = responseTimes.reduce((sum, val) => sum + val, 0);
      const average =
        responseTimes.length > 0 ? total / responseTimes.length : 0;

      cy.task("log", `responose times recorded : ${responseTimes}`);
      cy.task("log", `total broadcast : ${responseTimes.length}`);
      cy.task("log", `average : ${average.toFixed(2)} ms`);
    });
  }

  function sendChatBetweenAccounts(accountList, delay) {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: selectedBody,
    }).then((response) => {
      const accessToken = response.body.tokens.access.token;
      cy.wrap(accessToken).as("accessToken");
      // Cypress.env("accessToken", accessToken);
    });
    cy.task("log", "start");
    getAllList();
    const dummyNumbers = [
      6285135425714, 6285147211084, 6285135431231,
      // , 4, 5, 6, 7, 8
    ];

    cy.get("@accountNumbers").then((accountNumbers) => {
      accountNumbers.forEach((sender) => {
        // dummyNumbers.forEach((sender) => {
        // const otherReceivers = dummyNumbers.filter((r) => r !== sender);
        const otherReceivers = accountNumbers.filter((r) => r !== sender);

        otherReceivers.forEach((receiver) => {
          const delay = Math.floor(Math.random() * 3500) + 1000;
          // const delay = Math.floor(Math.random() * 35) + 10;
          cy.wait(delay).then(() => {
            const randomChat = randomAsk();

            cy.get("@accessToken").then((accessToken) => {
              const startTime2 = Date.now();
              cy.request({
                method: "POST",
                url: config.sendMessageUrl + sender,
                headers: { Authorization: `Bearer ${accessToken}` },
                body: {
                  id: receiver.toString(),
                  message: randomChat,
                  // tempId: "1744903184888",
                },
              }).then((response) => {
                const endTime2 = Date.now();
                const responseTime2 = endTime2 - startTime2;
                cy.task("log", `response time 1 = ${responseTime2}`);
              });
            });
            cy.task("log", `send chat from ${sender} to ${receiver}`);
            cy.task("log", randomChat);
            cy.wait(delay);
            cy.get("@accessToken").then((accessToken) => {
              const startTime3 = Date.now();
              cy.request({
                method: "POST",
                url: config.sendMessageUrl + receiver.toString(),
                headers: { Authorization: `Bearer ${accessToken}` },
                body: {
                  id: sender,
                  message: randomAnswer(),
                  // tempId: "1744903184888",
                },
              }).then((response) => {
                const endTime3 = Date.now();
                const responseTime3 = endTime3 - startTime3;
                cy.task("log", `response time 2 = ${responseTime3}`);
              });
            });
            cy.task("log", `${receiver} reply to ${sender}`);
            cy.task("log", randomChat);
            // cy.log(`reply from receiver ${receiver}`);
            // cy.log(randomAnswer());
          });
          getAllList();
        });
      });
      cy.task("log", "end");
    });
  }

  it("send broadcast from active and used number whatsapp", () => {
    // cy.get(staticNumber).then((accountNumbers) => {
    const repeatCount = 21;

    // const repeatCount = 1;

    let delay;
    let prefix = "";
    let staticNumber = "";

    if (baseUrl === "https://dev.satuinbox.com") {
      delay = config.randomGlobalDelayStaging;
      delay = 0;
      prefix = "";
      // staticNumber = 6285158876037; //dev
      // staticNumber = 6285198965689; //dev messagelogsatu
      if (loginType === "chickentester") {
        staticNumber = 6285147210593; //dev chickentester 851 4721 0593
      }
      if (loginType === "messagelogdua") {
        staticNumber = 6285147211094; //dev chickentester 851 4721 0593
      }
      if (loginType === "goddummy") {
        staticNumber = 6285147210544; //dev chickentester 851 4721 0593
      }
      // staticNumber = 6285147210557; //dev chickentester 851 4721 0557
    } else if (baseUrl === "https://staging.satuinbox.com") {
      delay = config.randomGlobalDelayStaging;
      prefix = "STAGING :";
      if (loginType === "chickentester") {
        staticNumber = 6285147211084; //staging chickentester
      }
    } else if (baseUrl === "https://stagaws.satuinbox.com") {
      delay = config.randomGlobalDelayStaging;
      prefix = "STAGING :";
      if (loginType === "chickentester") {
        staticNumber = 6285147211084; //staging chickentester
      }
    } else {
      // delay = config.randomGlobalDelay;
      delay = config.randomGlobalDelayStaging;
      // prefix = "PROD :";
      prefix = "";
      // staticNumber = 6285135431722; //testing270520252
      // staticNumber = 6285135431746; //testing270520252
      // staticNumber = 6285158876037; //testing270520252 -tiana-
      // staticNumber = 6285147210595; //prodtestingjuli
      // staticNumber = 6285147211097; //prodtestingjuli
      staticNumber = 6285135424828; //prodtestingjuli
    }

    // sendBroadcastMessage(accountNumbers, delay, prefix);
    // cy.log("account number sender:", JSON.stringify(accountNumbers));
    for (let i = 0; i < repeatCount; i++) {
      // const delayBetween = Math.floor(Math.random() * 500) + 500;
      const delayBetween = Math.floor(Math.random() * 500);
      cy.wait(delayBetween).then(() => {
        // cy.wait(i * delayBetween).then(() => {
        sendBroadcastMessage(
          staticNumber,
          // delay,
          delayBetween,
          prefix
        );
        cy.task("log", i);
        cy.task("log", delayBetween);
      });
    }
    // });
    cy.task("log", "end");
    // cy.wait(1200);
    // sendChatBetweenAccounts();
  });

  // it.skip("send and reply chat antar active number", () => {
  //   sendChatBetweenAccounts();
  // });
});
