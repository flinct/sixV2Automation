// const { MongoClient, ObjectId } = require("mongodb");
// const XLSX = require("xlsx");
// const dayjs = require("dayjs");

// // === CONFIGURATION ===
// const uri =
//   "mongodb+srv://satuinbox:9AIkVyRaWjF2PzyQ@satuinbox.imcdkzl.mongodb.net/chat-wa-broadcast?authSource=admin";
// const dbName = "live-chat-inboxes";

// // Set your filters here
// const companyId = "6889b71ded520395ba12028b"; // <-- Replace with target companyId
// const startDate = "2025-11-02"; // inclusive
// const endDate = "2025-11-07"; // inclusive
// // ======================

// const client = new MongoClient(uri);

// async function main() {
//   await client.connect();
//   const db = client.db(dbName);
//   const inboxCollection = db.collection("live-chat-inbox");
//   const messageCollection = db.collection("live-chat-messages");

//   // Build filter
//   const filter = {
//     companyId: new ObjectId(companyId),
//     createdAt: {
//       $gte: new Date(startDate),
//       $lte: new Date(dayjs(endDate).endOf("day").toISOString()),
//     },
//     isDeleted: false,
//   };

//   console.log("📊 Fetching inbox data...");
//   const inboxes = await inboxCollection.find(filter).toArray();

//   if (inboxes.length === 0) {
//     console.log("⚠️ No conversations found for given filter.");
//     await client.close();
//     return;
//   }

//   const dailyStats = {};

//   for (const inbox of inboxes) {
//     const createdDate = dayjs(inbox.createdAt).format("YYYY-MM-DD");

//     if (!dailyStats[createdDate]) {
//       dailyStats[createdDate] = {
//         totalConversations: 0,
//         totalResponseTimeMs: 0,
//         respondedCount: 0,
//       };
//     }
//     dailyStats[createdDate].totalConversations++;

//     // Fetch messages related to this conversation
//     const messages = await messageCollection
//       .find({ liveChatInboxId: inbox._id })
//       .sort({ createdAt: 1 })
//       .toArray();

//     if (messages.length >= 2) {
//       const firstClientMsg = messages.find((m) => m.isFromMe === false);
//       const firstAgentMsg = messages.find((m) => m.isFromMe === true);

//       if (firstClientMsg && firstAgentMsg) {
//         const diffMs = dayjs(firstAgentMsg.createdAt).diff(
//           dayjs(firstClientMsg.createdAt)
//         );
//         if (diffMs >= 0) {
//           dailyStats[createdDate].totalResponseTimeMs += diffMs;
//           dailyStats[createdDate].respondedCount++;
//         }
//       }
//     }
//   }

//   // Convert to Excel-friendly format
//   const reportData = Object.entries(dailyStats)
//     .sort((a, b) => new Date(a[0]) - new Date(b[0]))
//     .map(([date, stats]) => ({
//       Date: date,
//       "Total Conversations": stats.totalConversations,
//       "Average First Response Time (minutes)": stats.respondedCount
//         ? (stats.totalResponseTimeMs / stats.respondedCount / 60000).toFixed(2)
//         : "0.00",
//     }));

//   // Export to Excel
//   const worksheet = XLSX.utils.json_to_sheet(reportData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Chat Report");
//   XLSX.writeFile(
//     workbook,
//     `chat_report_${companyId}_${startDate}_to_${endDate}.xlsx`
//   );

//   console.log("✅ Export complete!");
//   console.log(
//     `📁 File: chat_report_${companyId}_${startDate}_to_${endDate}.xlsx`
//   );
//   await client.close();
// }

// main().catch((err) => {
//   console.error("❌ Error:", err);
//   client.close();
// });

const { MongoClient, ObjectId } = require("mongodb");
const ExcelJS = require("exceljs");

// const uri =
//   "mongodb+srv://satuinbox:9AIkVyRaWjF2PzyQ@satuinbox.imcdkzl.mongodb.net/chat-wa-broadcast?authSource=admin";

// async function exportFilteredData() {
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const db = client.db("chat-wa-broadcast");
//     const collection = db.collection("live-chat-inboxes");

//     const filter = {
//       companyId: new ObjectId("6889b71ded520395ba12028b"),
//       createdAt: {
//         $gte: new Date("2025-11-02T00:00:00.000Z"),
//         $lte: new Date("2025-11-07T23:59:59.999Z"),
//       },
//     };

//     console.log("📊 Fetching inbox data...");
//     const data = await collection.find(filter).toArray();
//     console.log(`✅ Found ${data.length} conversations`);

//     if (data.length === 0) {
//       console.warn("⚠️ No conversations found for given filter.");
//       return;
//     }

//     // Create Excel
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Filtered Conversations");

//     worksheet.columns = [
//       { header: "ID", key: "_id", width: 25 },
//       { header: "Company ID", key: "companyId", width: 25 },
//       { header: "Created At", key: "createdAt", width: 25 },
//       { header: "Status", key: "status", width: 20 },
//       { header: "Customer Name", key: "customerName", width: 25 },
//     ];

//     data.forEach((item) => {
//       worksheet.addRow({
//         _id: item._id.toString(),
//         companyId: item.companyId?.toString(),
//         createdAt: item.createdAt?.toISOString(),
//         status: item.status,
//         customerName: item.customer?.name || "",
//       });
//     });

//     await workbook.xlsx.writeFile("Filtered_LiveChat_Report.xlsx");
//     console.log("📁 Export complete: Filtered_LiveChat_Report.xlsx");
//   } catch (err) {
//     console.error("❌ Error exporting data:", err);
//   } finally {
//     await client.close();
//   }
// }

// exportFilteredData();

const uri =
  "mongodb+srv://satuinbox:9AIkVyRaWjF2PzyQ@satuinbox.imcdkzl.mongodb.net/chat-wa-broadcast?authSource=admin";
const dbName = "chat-wa-broadcast";

const companyId = "6889b71ded520395ba12028b";
const startDate = new Date("2025-11-02T00:00:00.000Z");
const endDate = new Date("2025-11-07T23:59:59.999Z");

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const inboxCol = db.collection("live-chat-inboxes");
  const msgCol = db.collection("live-chat-messages");

  console.log("📊 Fetching inbox data...");

  const inboxes = await inboxCol
    .find({
      companyId: new ObjectId(companyId),
      createdAt: { $gte: startDate, $lte: endDate },
      isDeleted: false,
    })
    .toArray();

  if (!inboxes.length) {
    console.log("⚠️ No conversations found for given filter.");
    await client.close();
    return;
  }

  console.log(`✅ Found ${inboxes.length} conversations`);

  const reportData = {};

  for (const inbox of inboxes) {
    const createdAt = new Date(inbox.createdAt);
    const dateKey = createdAt.toISOString().split("T")[0];

    // Initialize if not exists
    if (!reportData[dateKey]) {
      reportData[dateKey] = { totalConversations: 0, totalFRT: 0, frtCount: 0 };
    }

    reportData[dateKey].totalConversations += 1;

    const messageIds = (inbox.liveChatMessageIds || [])
      .slice(0, 2)
      .map((id) => new ObjectId(id.$oid || id));
    if (messageIds.length < 2) continue;

    const messages = await msgCol
      .find({ _id: { $in: messageIds } })
      .sort({ createdAt: 1 })
      .toArray();

    if (messages.length < 2) continue;

    const first = new Date(messages[0].createdAt);
    const second = new Date(messages[1].createdAt);
    const diffMinutes = (second - first) / (1000 * 60);

    reportData[dateKey].totalFRT += diffMinutes;
    reportData[dateKey].frtCount += 1;
  }

  // Prepare Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Live Chat Report");

  sheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Total Conversations", key: "total", width: 20 },
    { header: "Avg First Response Time (min)", key: "avgFRT", width: 30 },
  ];

  Object.keys(reportData)
    .sort()
    .forEach((date) => {
      const d = reportData[date];
      const avgFRT = d.frtCount > 0 ? d.totalFRT / d.frtCount : 0;
      sheet.addRow({
        date,
        total: d.totalConversations,
        avgFRT: avgFRT.toFixed(2),
      });
    });

  const filename = `LiveChat_Report_${companyId}_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFile(filename);

  console.log(`📁 Export complete: ${filename}`);
  await client.close();
}

run().catch(console.error);
