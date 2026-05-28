import { method } from "bluebird";
import { env_config } from "../../support/01_url_page.js";
import { numberAWB } from "../../support/awbGenerator.js";
import { generateBatchId, generatePOD } from "../../support/nameAndPhone.js";
import { generateRandomName } from "../../support/nameAndPhone.js";
import { generateRandomDivision } from "../../support/nameAndPhone.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import {
  generateRandomQuote,
  randomAnswer,
  randomAsk,
  randomAsk2,
  randomAsk3,
  randomAsk4,
  randomAsk5,
  randomAsk6,
} from "../../support/quoteGenerator.js";
import { times } from "lodash";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";

describe("Open API broadcast", () => {
  const authAction = new authPage();
  const broadcastAction = new broadcastPage();

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
        //   numberWhatsappCustomer: "6280000000000",
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
          numberWhatsappCustomer: "6280000000000",
          message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
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
      ],
    };
  }

  function checkAllList() {
    // numberAirWayBill.forEach((AWBnumber) => {
    cy.request({
      method: "GET",
      url: config.getAllNomorWhatsapp,
      headers: selectedHeader,
    }).then((response) => {
      const allResp = response.body;
      // cy.task("log", `all response value ${JSON.stringify(allResp)}`);

      // allResp.results.forEach((resp) => {
      //   cy.task("log", `-----------------------`);
      //   cy.task("log", `account name : ${resp.accountName}`);
      //   cy.task("log", `number whatsapp : ${resp.accountNumberWhatsapp}`);
      //   cy.task("log", `isOpen : ${resp.isOpen}`);
      //   cy.task("log", `phoneConnected : ${resp.phoneConnected}`);
      //   cy.task("log", `-----------------------`);
      // });

      // const accountName = allResp.accountName;
      // const accountNumberWhatsapp = allResp.accountNumberWhatsapp;
      // const isOpen = allResp.isOpen;
      // const phoneConnected = allResp.phoneConnected;
      // // const accountName = allResp.
      // cy.task("log", `all response value ${JSON.stringify(accountName)}`);
      // cy.task(
      //   "log",
      //   `all response value ${JSON.stringify(accountNumberWhatsapp)}`
      // );
      // cy.task("log", `all response value ${JSON.stringify(isOpen)}`);
      // cy.task("log", `all response value ${JSON.stringify(phoneConnected)}`);

      const accountNumbers = allResp.results.map(
        (value) => value.accountNumberWhatsapp
      );

      // const divisionName = response.body.result.map(
      //   (value) => value.division?.divisionName || "unknown"
      // );
      // cy.task("log", `Response Body:  ${JSON.stringify(accountNumbers)}`);
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

  function checkConnection() {
    // numberAirWayBill.forEach((AWBnumber) => {
    return cy
      .request({
        method: "GET",
        url: config.getAllNomorWhatsapp,
        headers: selectedHeader,
      })
      .then((response) => {
        const allResp = response.body.results;

        // const accountNumbers = allResp.results.map(
        //   (value) => value.accountNumberWhatsapp
        // );
        const listActive = allResp.filter((itemActive) => {
          return itemActive.isOpen && itemActive.phoneConnected === true;
        });

        cy.task(
          "log",
          `check total active connection : ${JSON.stringify(listActive.length)}`
        );

        // const dummyAccount = [
        //   "6280000000000",
        //   "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        //   // "6280000000000",
        // ];
        // cy.task("log", `check dummy : ${JSON.stringify(dummyAccount.length)}`);
        return cy.wrap(listActive.length);
      });
    // })
  }

  function getAllList() {
    // numberAirWayBill.forEach((AWBnumber) => {
    cy.request({
      method: "GET",
      url: config.getAllNomorWhatsapp,
      headers: selectedHeader,
    }).then((response) => {
      const allResp = response.body;
      const allResp2 = response.body.results;
      const allResp3 = response.body.results.accountNumberWhatsapp;

      const listActive = allResp2.filter((itemActive) => {
        return itemActive.isOpen && itemActive.phoneConnected === true;
      });
      const listNumberActive = allResp2.filter(
        (itemActive) => itemActive.isOpen && itemActive.phoneConnected === true
      );
      const listNumberActiveValue = listNumberActive.map((mapItemActive) => {
        return {
          accountNumberWhatsapp: mapItemActive.accountNumberWhatsapp,
        };
      });
      // cy.task("log", `list active : ${JSON.stringify(listNumberActive)}`);

      const lisActiveAccountNumbers = listActive.map(
        (value) => value.accountNumberWhatsapp
      );
      const listNonActive = allResp2.filter((itemNonActive) => {
        return (
          itemNonActive.isOpen === false &&
          itemNonActive.itemNonActive === false
        );
      });

      // // cy.task(
      //   "log",
      //   `total Non-active : ${JSON.stringify(listNonActive.length)}`
      // );
      // cy.task("log", `${JSON.stringify(listActive)}`);

      const listNonactiveIsOpenFalse = allResp2.filter(
        (itemNonactiveIsOpenFalse) => {
          return itemNonactiveIsOpenFalse.isOpen === false;
        }
      );
      const listNonactiveConnectedFalse = allResp2.filter(
        (itemNonactiveConnectedFalse) => {
          return itemNonactiveConnectedFalse.phoneConnected === false;
        }
      );
      const accountNumbers = allResp.results.map(
        (value) => value.accountNumberWhatsapp
      );

      cy.task("log", `list active : ${JSON.stringify(listNumberActiveValue)}`);
      cy.task(
        "log",
        `total isOpen False : ${JSON.stringify(
          listNonactiveIsOpenFalse.length
        )}`
      );
      cy.task(
        "log",
        `total Connected False : ${JSON.stringify(
          listNonactiveConnectedFalse.length
        )}`
      );
      cy.task("log", `total active : ${JSON.stringify(listActive.length)}`);
      cy.task(
        "log",
        `Total account whatsapp :  ${JSON.stringify(accountNumbers.length)}`
      );
      // cy.wrap(accountNumbers).as("accountNumbers");
      // cy.wrap(lisActiveAccountNumbers).as("accountNumbers");
      const dummyAccount = [
        // "6280000000000",
        // "6280000000000",
        "6280000000000",
        "6280000000000", //suspended number
        "6280000000000",
        "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
        // "6280000000000",
      ];
      cy.wrap(dummyAccount).as("accountNumbers");
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
    // const staticNumber = 6280000000000; //staging
    // const staticNumber = 6280000000000; //dev

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

  const receiverDummy = [
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000,
    6280000000000, //contoh invalid number,
  ];
  function getRandomReceivers(receiverDummy) {
    const randomCount = Math.floor(Math.random() * receiverDummy.length) + 1;
    const shuffled = [...receiverDummy].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  }

  function getRandomMessage(
    randomChat,
    randomChat2,
    randomChat3,
    randomChat4,
    randomChat5,
    randomChat6,
    randomQuotes,
    timestamp
  ) {
    const messageBody = [
      `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuotes}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
      `${randomChat}\n\n${randomQuotes}\n\n${timestamp}`,
      `${randomChat2}\n\n${randomQuotes}\n\n${timestamp}`,

      //with greetings rotator
      `{[${randomChat3}|${randomChat4}|${randomChat5}|${randomChat6}]}\n\n${randomAnswer()}\n\n${timestamp}`,
    ];
    const randomMessageBody = Math.floor(Math.random() * messageBody.length);
    return messageBody[randomMessageBody];
  }

  function randomizeDelay() {
    const ranges = [
      // { weight: 0.1, mean: 7000, stdDev: 2900, min: 3000, max: 15000 }, // 3s–15s
      // { weight: 0.13, mean: 15000, stdDev: 5000, min: 15100, max: 30000 }, // 15s–30s
      // { weight: 0.5, mean: 70000, stdDev: 29000, min: 30100, max: 120000 }, // 30s–2m
      // { weight: 0.27, mean: 180000, stdDev: 60000, min: 120100, max: 300000 }, // 2m–5m

      // { weight: 0.1, mean: 9000, stdDev: 3000, min: 3000, max: 15000 }, // 3s–15s
      // { weight: 0.13, mean: 30000, stdDev: 8000, min: 16000, max: 45000 }, // 16s–45s
      // { weight: 0.5, mean: 63000, stdDev: 10000, min: 46000, max: 80000 }, // 46s–1m20s
      // { weight: 0.27, mean: 120000, stdDev: 30000, min: 81000, max: 180000 }, // 1m21s–3m

      { weight: 0.21, mean: 9000, stdDev: 3000, min: 3000, max: 15000 }, // 3s–15s
      { weight: 0.4, mean: 25000, stdDev: 6000, min: 16000, max: 35000 }, // 16s–35s
      { weight: 0.15, mean: 43000, stdDev: 4000, min: 36000, max: 50000 }, // 36s–50s
      { weight: 0.12, mean: 58000, stdDev: 4000, min: 51000, max: 65000 }, // 51s–65s
      { weight: 0.12, mean: 90000, stdDev: 15000, min: 66000, max: 120000 }, // 66s–120s

      // { min: 3000,    max: 15000,    weight: 0.25 },  // Fast reply (3s–15s)
      // { min: 16000,   max: 60000,    weight: 0.26 },  // Quick reply (16s–60s)
      // { min: 61000,   max: 300000,   weight: 0.30 },  // Semi-delayed (61s–5m)
      // { min: 301000,  max: 1800000,  weight: 0.08 },  // Moderate (5m1s–30m)
      // { min: 1801000, max: 7200000,  weight: 0.09 },  // Long (30m1s–2h)
      // { min: 7201000, max: 18000000, weight: 0.02 }   // Very long (2h–5h)

      // { weight: 0.03, mean: 700, stdDev: 290, min: 300, max: 1500 }, // 0.3s–1.5s
      // { weight: 0.07, mean: 1500, stdDev: 500, min: 1510, max: 3000 }, // 1.5s–3s
      // { weight: 0.5, mean: 7000, stdDev: 2900, min: 3010, max: 12000 }, // 3s–12s
      // { weight: 0.3, mean: 18000, stdDev: 6000, min: 12010, max: 30000 }, // 12s–30s
    ];

    // pilih range berdasarkan bobot
    const rnd = Math.random();
    let acc = 0;
    let selected = ranges[0];
    for (const r of ranges) {
      acc += r.weight;
      if (rnd <= acc) {
        selected = r;
        break;
      }
    }

    // generate angka gaussian sesuai range terpilih
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    let delay = Math.floor(num * selected.stdDev + selected.mean);

    // clamp agar tetap dalam range
    delay = Math.max(selected.min, Math.min(selected.max, delay));

    // const selectedDelay = delays[Math.floor(Math.random() * delays.length)];
    return delay;
  }

  function sendBroadcastBetweenAccounts(accountList, delay) {
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
    // const dummyNumbers = [
    //   6280000000000, 6280000000000, 6280000000000,
    //   // , 4, 5, 6, 7, 8
    // ];

    cy.get("@accountNumbers").then((accountNumbers) => {
      accountNumbers.forEach((sender) => {
        const selectedUser = getRandomReceivers(receiverDummy);

        cy.task(
          "log",
          `Total receiver terpilih untuk sender ${sender}: ${selectedUser.length}`
        );
        cy.task("log", `List nomor receiver: ${JSON.stringify(selectedUser)}`);

        let skipSender = false; // flag untuk skip sender

        selectedUser.forEach((receiver) => {
          if (skipSender) {
            cy.task(
              "log",
              `⏭️ Skip sender ${sender} karena sebelumnya kena 401`
            );
            return; // skip receiver loop
          }

          const selectedDelay = randomizeDelay();
          checkConnection().then((beforeSend_) => {
            cy.wrap(beforeSend_).as("beforeSend");
          });

          cy.wait(selectedDelay).then(() => {
            const randomChat = randomAsk();
            const randomChat2 = randomAsk2();
            const randomChat3 = randomAsk3();
            const randomChat4 = randomAsk4();
            const randomChat5 = randomAsk5();
            const randomChat6 = randomAsk6();
            const randomQuotes = generateRandomQuote();
            const randomMessage = getRandomMessage(
              randomChat,
              randomChat2,
              randomChat3,
              randomChat4,
              randomChat5,
              randomChat6,
              randomQuotes,
              timestamp
            );

            const startTime2 = Date.now();
            cy.request({
              method: "POST",
              url: config.openAPI_broadcast + sender,
              headers: selectedHeader,
              body: {
                broadcastMessage: [
                  {
                    numberWhatsappCustomer: receiver.toString(),
                    message: randomMessage,
                    properties: {
                      contactName: `${generateRandomName()}`,
                      division: `${generateRandomDivision()}`,
                      senderName: "System-Testing",
                      category: "food and baverage",
                      orderId: `AWB- ${numberAWB()}`,
                      batchId: `${generateBatchId()}`,
                      proofOfdeliveryNumber: `${generatePOD()}`,
                    },
                  },
                ],
              },
              failOnStatusCode: false,
            }).then((response) => {
              if (response.status === 401) {
                cy.task(
                  "log",
                  `🚫 Sender ${sender} kena 401, skip ke sender berikutnya`
                );
                skipSender = true; // aktifkan flag untuk skip sisa receiver
                return;
              }

              if (response.status === 403) {
                failedRequest.push(response);
              }

              const endTime2 = Date.now();
              const responseTime2 = endTime2 - startTime2;
              cy.task("log", `response time = ${responseTime2}`);
            });

            cy.task("log", `send chat from ${sender} to ${receiver}`);
            cy.task("log", randomChat);
            cy.task("log", selectedHeader);
            cy.task("log", "selected delay : " + selectedDelay);
          });

          cy.get("@beforeSend").then((beforeSend) => {
            checkConnection().then((afterSend_) => {
              if (beforeSend > afterSend_) {
                cy.task(
                  "log",
                  `⚠️ Active connections changed! (${beforeSend} → ${afterSend_})`
                );
              } else {
                cy.task(
                  "log",
                  `✅ Active connections unchanged (${beforeSend})`
                );
              }
            });
          });

          cy.wait(2000).reload();
        }); // receiver list
      });

      // accountNumbers.forEach((sender) => {
      //   const selectedUser = getRandomReceivers(receiverDummy);

      //   cy.task(
      //     "log",
      //     `Total receiver terpilih untuk sender ${sender}: ${selectedUser.length}`
      //   );
      //   cy.task("log", `List nomor receiver: ${JSON.stringify(selectedUser)}`);

      //   // dummyNumbers.forEach((sender) => {
      //   // const otherReceivers = dummyNumbers.filter((r) => r !== sender);
      //   // const receivers = accountNumbers.filter((r) => r !== sender);

      //   // receivers.forEach((receiver) => {

      //   selectedUser.forEach((receiver) => {
      //     const selectedDelay = randomizeDelay();
      //     checkConnection().then((beforeSend_) => {
      //       const beforeSend = beforeSend_;
      //       cy.wrap(beforeSend).as("beforeSend");
      //     });
      //     cy.wait(selectedDelay).then(() => {
      //       const randomChat = randomAsk();
      //       const randomChat2 = randomAsk2();
      //       const randomChat3 = randomAsk3();
      //       const randomChat4 = randomAsk4();
      //       const randomChat5 = randomAsk5();
      //       const randomChat6 = randomAsk6();
      //       const randomQuotes = generateRandomQuote();
      //       const randomMessage = getRandomMessage(
      //         randomChat,
      //         randomChat2,
      //         randomChat3,
      //         randomChat4,
      //         randomChat5,
      //         randomChat6,
      //         randomQuotes,
      //         timestamp
      //       );

      //       // cy.get("@accessToken").then((accessToken) => {
      //       const startTime2 = Date.now();
      //       cy.request({
      //         method: "POST",
      //         // url: config.sendMessageUrl + sender,
      //         url: config.openAPI_broadcast + sender,
      //         headers: selectedHeader,
      //         // headers: { Authorization: `Bearer ${accessToken}` },
      //         body: {
      //           broadcastMessage: [
      //             {
      //               // numberWhatsappCustomer: receiver.toString(),
      //               numberWhatsappCustomer: receiver.toString(),
      //               // numberWhatsappCustomer: "6280000000000",
      //               // message: `${randomChat}\n\n${randomQuotes}\n\n${timestamp}`,
      //               message: randomMessage,
      //               properties: {
      //                 contactName: `${generateRandomName()}`,
      //                 // division: `${generateRandomDivision()}`,
      //                 division: `${generateRandomDivision()}`,
      //                 senderName: "System-Testing",
      //                 category: "food and baverage",
      //                 orderId: `AWB- ${numberAWB()}`,
      //                 batchId: `${generateBatchId()}`,
      //                 proofOfdeliveryNumber: `${generatePOD()}`,
      //               },
      //             },
      //           ],
      //         },
      //         failOnStatusCode: false,
      //       }).then((response) => {
      //         if (response.status === 403) {
      //           failedRequest.push(response);
      //         }
      //         const endTime2 = Date.now();
      //         const responseTime2 = endTime2 - startTime2;
      //         cy.task("log", `response time 1 = ${responseTime2}`);
      //       });
      //       // });
      //       cy.task("log", `send chat from ${sender} to ${receiver}`);
      //       cy.task("log", randomChat);
      //       cy.task("log", selectedHeader);
      //       cy.task("log", "selected delay : " + selectedDelay);
      //     });

      //     cy.get("@beforeSend").then((beforeSend) => {
      //       checkConnection().then((afterSend_) => {
      //         const afterSend = afterSend_;

      //         if (beforeSend > afterSend) {
      //           cy.task(
      //             "log",
      //             `⚠️ Active connections changed! (${beforeSend} → ${afterSend})`
      //           );
      //         } else {
      //           cy.task(
      //             "log",
      //             `✅ Active connections unchanged (${beforeSend})`
      //           );
      //         }
      //       });
      //     });
      //     cy.wait(2000).reload();
      //   }); //receiver list
      // });
      cy.task("log", "end");
    });
  }

  // otherReceivers.forEach((receiver) => {
  //   // const delay2 = Math.floor(Math.random() * 300000) + 500;//delay 5 minutes
  //   const delay2 = Math.floor(Math.random() * 120000) + 500;//delay 2 minutes
  //   cy.wait(delay2);
  //   // const delay = Math.floor(Math.random() * 35) + 10;
  //   // cy.wait(delay).then(() => {
  //   //   const randomChat = randomAsk();

  //   //   cy.get("@accessToken").then((accessToken) => {
  //   //     const startTime2 = Date.now();
  //   //     cy.request({
  //   //       method: "POST",
  //   //       url: config.sendMessageUrl + sender,
  //   //       headers: { Authorization: `Bearer ${accessToken}` },
  //   //       body: {
  //   //         id: receiver.toString(),
  //   //         message: randomChat,
  //   //       },
  //   //       failOnStatusCode: false,
  //   //     }).then((response) => {
  //   //       if ((response.status = 403)) {
  //   //         failedRequest.push(response);
  //   //       }
  //   //       const endTime2 = Date.now();
  //   //       const responseTime2 = endTime2 - startTime2;
  //   //       cy.task("log", `response time 1 = ${responseTime2}`);
  //   //     });
  //   //   });
  //   //   cy.task("log", `send chat from ${sender} to ${receiver}`);
  //   //   cy.task("log", randomChat);
  //   //   cy.wait(delay);
  //   cy.get("@accessToken").then((accessToken) => {
  //     const startTime3 = Date.now();
  //     cy.request({
  //       method: "POST",
  //       // url: config.sendMessageUrl + receiver.toString(),
  //       url: config.openAPI_broadcast + sender,
  //       headers: selectedHeader,
  //       // headers: { Authorization: `Bearer ${accessToken}` },
  //       body: {
  //         id: sender,
  //         message: randomAnswer(),
  //       },
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       if ((response.status = 403)) {
  //         failedRequest.push(response);
  //       }
  //       const endTime3 = Date.now();
  //       const responseTime3 = endTime3 - startTime3;
  //       cy.task("log", `response time 2 = ${responseTime3}`);
  //     });
  //   });
  //   cy.task("log", `${receiver} reply to ${sender}`);
  //   cy.task("log", randomAnswer);
  //   // cy.log(`reply from receiver ${receiver}`);
  //   // cy.log(randomAnswer());
  //   // });
  //   // getAllList();
  // });

  function sendingChatBetweenAccountViaApps() {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: selectedBody,
    }).then((response) => {
      const accessToken = response.body.tokens.access.token;
      cy.wrap(accessToken).as("accessToken");
      return cy
        .request({
          method: "GET",
          url: config.getAll_Inbox,
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((inboxList) => {
          const result = inboxList.body.results;

          const numberList = result.map(
            (number) => number.numberWhatsappCustomer
          );
          cy.wrap(numberList).as("numberList");
        });
    });

    cy.get("@numberList").then((numberList) => {
      numberList.forEach((number) => {
        cy.get("body").then(($body) => {
          if ($body.find('[data-cy="inbox-tab-unassigned"]').length > 0) {
            cy.get('[data-cy="inbox-tab-unassigned"]')
              .invoke("attr", "data-state")
              .then((state) => {
                if (state === "inactive") {
                  cy.get('[data-cy="inbox-tab-unassigned"]').click();
                }
                if (state === "active") {
                  cy.softAssert(
                    cy.get('[data-cy="inbox-tab-unassigned"]'),
                    "unassigned tab is active"
                  );
                }
              });
          }
        });

        cy.softAssert(cy.searchbar(), "filtering by search customer number");
        cy.softAssert(
          cy.searchbar().clear().type(number),
          "typing number customer"
        );
        cy.wait(2000);
        cy.get("body", { timeout: 2000 }).then(($body) => {
          if ($body.text().includes("Belum Ada Pesan")) {
            cy.log("no customer found in unassigned tab");
            cy.softAssert(cy.inboxOngoingTab().click());
            cy.wait(2000);
          }
          if (
            $body.find('[data-cy^="chat-list-"]').length &&
            $body.text().includes(formatCustomerNumber(number))
          ) {
            // cy.log("customer found at unassigned tab");
            cy.softAssert(
              cy.listChatInbox().contains(number).click(),
              "customer number found at unassigned tab"
            );
            cy.softAssert(cy.customer_number().should("be.visible"));
            cy.wait(2000);
            cy.softAssert(cy.inboxOngoingTab().click());
            cy.wait(2000);
          } else {
            // cy.log(
            //   "this customer :" + number + ", NOT FOUND at unassigned tab"
            // );
            cy.softAssert(
              cy.inboxOngoingTab().click(),
              "this customer :" + number + ", NOT FOUND at unassigned tab"
            );
            cy.wait(2000);
          }

          cy.get("body", { timeout: 2000 }).then(($body) => {
            if (
              $body.find('[data-cy^="chat-list-"]').length &&
              $body.text().includes(formatCustomerNumber(number))
            ) {
              // cy.log("customer number found at ongoing tab");
              cy.softAssert(
                cy.listChatInbox().contains(number).click(),
                "customer number found at ongoing tab"
              );
              cy.custumer_number().should("be.visible");
              cy.wait(2000);
              cy.inboxResolvedTab().click();
              cy.wait(2000);
            } else {
              cy.softAssert(
                cy.inboxResolvedTab().click(),
                "this customer :" + number + ", NOT FOUND at ongoing tab"
              );
              cy.wait(2000);
            }
          });

          cy.get("body", { timeout: 2000 }).then(($body) => {
            if (
              $body.find('[data-cy^="chat-list-"]').length &&
              $body.text().includes(number)
            ) {
              cy.log("customer number found at resolved tab");
              cy.softAssert(
                cy.listChatInbox().contains(number),
                "customer number found at resolved tab"
              );
            } else {
              cy.log(
                "this customer :" + number + ", NOT FOUND at resolved tab"
              );
            }
          });
        });
      });
    });
  }

  function sendChatBetweenAccounts() {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: selectedBody,
    }).then((response) => {
      const accessToken = response.body.tokens.access.token;
      cy.wrap(accessToken).as("accessToken");
      return cy
        .request({
          method: "GET",
          url: config.getAll_Inbox,
          headers: { authorization: `Bearer ${accessToken}` },
        })
        .then((inboxList) => {
          const result = inboxList.body.results;

          const numberList = result.map(
            (number) => number.numberWhatsappCustomer
          );
          cy.wrap(numberList).as("numberList");
        });
    });
    cy.task("log", "start");
    getAllList();
    cy.get("@accountNumbers").then((accountNumbers) => {
      const usedSenders = new Set();

      while (usedSenders.size < accountNumbers.length) {
        const availableSenders = accountNumbers.filter(
          (num) => !usedSenders.has(num)
        );
        const sender =
          availableSenders[Math.floor(Math.random() * availableSenders.length)];
        usedSenders.add(sender);
        const receivers = accountNumbers.filter((num) => num !== sender);

        receivers.forEach((receiver) => {
          const msg = randomAsk();
          const reply = randomAnswer();

          //send between accounts
          // cy.get("@accessToken").then((accessToken) => {
          //   const delay1 = Math.floor(Math.random() * 6000) + 1500;
          //   cy.wait(delay1);
          //   cy.request({
          //     method: "POST",
          //     url: config.sendMessageUrl + sender,
          //     headers: { Authorization: `Bearer ${accessToken}` },
          //     body: {
          //       id: receiver.toString(),
          //       message: msg,
          //     },
          //     failOnStatusCode: false,
          //   }).then((res) => {
          //     cy.task(
          //       "log",
          //       `Sender ${sender} → Receiver ${receiver} : ${msg}`
          //     );
          //     cy.task("log", `Status: ${res.status}`);
          //   });
          // });

          // cy.get("@accessToken").then((accessToken) => {
          //   const delay2 = Math.floor(Math.random() * 2700) + 500;
          //   cy.wait(delay2);
          //   cy.request({
          //     method: "POST",
          //     url: config.sendMessageUrl + receiver,
          //     headers: { Authorization: `Bearer ${accessToken}` },
          //     body: {
          //       id: sender.toString(),
          //       message: reply,
          //     },
          //     failOnStatusCode: false,
          //   }).then((res) => {
          //     cy.task(
          //       "log",
          //       `Receiver ${receiver} → Sender ${sender} : ${reply}`
          //     );
          //     cy.task("log", `Status: ${res.status}`);
          //   });
          // });
          //send between accounts

          //send broadcast between accounts
          // cy.get("@accessToken").then((accessToken) => {
          //   const randomQuote = generateRandomQuote();
          //   const delay1 = Math.floor(Math.random() * 6000) + 1500;
          //   const bodyMessage = {
          //     broadcastMessage: [
          //       {
          //         //test delay wpm
          //         // numberWhatsappCustomer: "6280000000000",
          //         numberWhatsappCustomer: receiver,
          //         message: `{[Hello|Hi|Hey there|How’s it going?|Nice to hear from you|What’s up?]} ${generateRandomName()}\nyour number AWB ${numberAWB()}\n${randomQuote}\n{[Pelanggan yang terhorma\nKurir kami *Gundala* - *6280000000000* telah mengantarkan paket Anda dengan No.AWB *${numberAWB()}*, namun tidak sukses terkirim karena *ALAMAT TIDAK LENGKAP* dan saat ini paket dalam proses pengembalian ke cabang.\nUntuk detailnya dapat diakses ke Website SAP Express\n#Sahabatpengiriman\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah berusaha mengantarkan paket Anda dengan No.AWB ${numberAWB()},\n namun pengiriman tidak berhasil karena NOMOR TELEPON PENERIMA TIDAK VALID.\nSaat ini paket dalam proses pengembalian ke cabang.\nUntuk informasi lebih lanjut dapat diakses melalui Website SAP Express\n#Pengiriman cepat\n#PenyelamatCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mencoba mengantarkan paket Anda dengan No.AWB ${numberAWB()}, namun tidak berhasil karena PENERIMA TIDAK ADA DI TEMPAT. Paket sedang dalam proses pengembalian ke cabang.\nUntuk informasi lebih lengkap silakan cek di Website SAP Express\n#Kirim paket cepat dong!\n#Jagonyacod|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah mengantarkan paket Anda No.AWB ${numberAWB()}, tetapi pengiriman gagal karena ALAMAT SALAH. Paket akan dikembalikan ke cabang.\nDetail lengkap bisa dicek di Website SAP Express\n#Cepat sampai\n#rajanyaCOD|Pelanggan yang terhormat\nKurir kami Gundala - 6280000000000 telah melakukan pengantaran paket No.AWB ${numberAWB()}, namun gagal karena PAKET TIDAK DITERIMA PENERIMA. Saat ini paket sedang dikembalikan ke cabang.\nInformasi lebih lanjut dapat diakses di Website SAP Express\n#Halu kalo pake ga sampai sampai\n#JagonyaPengiriman]}\n{[Wishing you a pleasant day. | I hope you have a wonderful day ahead. | All the best for today. | Have a productive day]}\n\n${timestamp}`,
          //         properties: {
          //           contactName: `asd nama`,
          //           division: `${generateRandomDivision()}`,
          //           senderName: "System-SAP",
          //           category: "food and baverage",
          //           orderId: `AWB- ${numberAWB()}`,
          //           batchId: `${generateBatchId()}`,
          //           proofOfdeliveryNumber: `${generatePOD()}`,
          //         },
          //       },
          //     ],
          //   };
          //   cy.wait(delay1);
          //   cy.request({
          //     method: "POST",
          //     url: config.openAPI_broadcast + sender,
          //     headers: selectedHeader,
          //     body: bodyMessage,
          //     // failOnStatusCode: false,
          //   }).then((res) => {
          //     cy.task(
          //       "log",
          //       `Sender ${sender} → Receiver ${receiver} : ${JSON.stringify(
          //         bodyMessage
          //       )}`
          //     );
          //     cy.task("log", `Status: ${res.status}`);
          //   });
          // });
          //send broadcast between accounts
        });
      }
    });
  }

  let failedRequest = [];
  afterEach(() => {
    if (failedRequest.length > 0) {
      cy.task("log", `failed requset : ${JSON.stringify(failedRequest)}`);
    }
  });

  it.skip("send broadcast from active and used number whatsapp", () => {
    // cy.get(staticNumber).then((accountNumbers) => {
    const repeatCount = 21;

    // const repeatCount = 1;

    let delay;
    let prefix = "";
    let staticNumber = "";

    if (baseUrl === "https://dev.example.test") {
      delay = config.randomGlobalDelayStaging;
      delay = 0;
      prefix = "";
      // staticNumber = 6280000000000; //dev
      // staticNumber = 6280000000000; //dev messagelogsatu
      if (loginType === "chickentester") {
        staticNumber = 6280000000000; //dev chickentester 851 4721 0593
      }
      if (loginType === "messagelogdua") {
        staticNumber = 6280000000000; //dev chickentester 851 4721 0593
      }
      if (loginType === "goddummy") {
        staticNumber = 6280000000000; //dev chickentester 851 4721 0593
      }
      // staticNumber = 6280000000000; //dev chickentester 851 4721 0557
    } else if (baseUrl === "https://staging.example.test") {
      delay = config.randomGlobalDelayStaging;
      prefix = "STAGING :";
      if (loginType === "chickentester") {
        staticNumber = 6280000000000; //staging chickentester
      }
    } else if (baseUrl === "https://staging-aws.example.test") {
      delay = config.randomGlobalDelayStaging;
      prefix = "STAGING :";
      if (loginType === "chickentester") {
        staticNumber = 6280000000000; //staging chickentester
      }
    } else {
      // delay = config.randomGlobalDelay;
      delay = config.randomGlobalDelayStaging;
      // prefix = "PROD :";
      prefix = "";
      // staticNumber = 6280000000000; //testing270520252
      // staticNumber = 6280000000000; //testing270520252
      // staticNumber = 6280000000000; //testing270520252 -tiana-
      // staticNumber = 6280000000000; //prodtestingjuli
      // staticNumber = 6280000000000; //prodtestingjuli
      staticNumber = 6280000000000; //prodtestingjuli
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

  it.only("send and reply chat antar active number", () => {
    authAction.loginValidUsername();
    broadcastAction.navigateToBroadcast_history();
    // checkAllList();
    // checkConnection();
    // sendChatBetweenAccounts();
    getAllList();
    sendBroadcastBetweenAccounts();
  });
});
//requestPOST 401 /api/v1/open/broadcast?accountNumberWhatsapp=6280000000000
