function generateRandomName() {
  const firstNames = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah",
    "Ivy", "Jack", "Kara", "Liam", "Mia", "Noah", "Olivia", "Paul",
    "Quinn", "Riley", "Sophia", "Tyler", "Uma", "Vera", "Will", "Xander",
    "Yara", "Zane", "Amelia", "Ben", "Clara", "Dylan", "Ella", "Finn",
    "Gina", "Henry", "Isla", "James", "Kate", "Leo", "Mason", "Nina",
    "Oscar", "Piper", "Quincy", "Ruby", "Sam", "Tara", "Ulysses", "Violet",
    "Wyatt", "Xena",
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
    "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
    "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
    "Carter", "Roberts",
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
}

function generateRandomDivision() {
  const namaDivisi = [
    "HO 3", "HO 5", "Jakarta", "Semarang", "Jakarta Barat",
  ];
  const randomNamaDivisi = namaDivisi[Math.floor(Math.random() * namaDivisi.length)];
  return randomNamaDivisi;
}

function generateBatchId() {
  const batchId = Math.floor(Math.random() * 90000) + 100000;
  return batchId;
}

function generateRandomNamesArray(count) {
  const names = [];
  for (let i = 0; i < count; i++) {
    names.push(generateRandomName());
  }
  return names;
}

function generateRandomPhoneNumber() {
  const prefix = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `+62${prefix}${number}`;
}

function generatePOD() {
  const POD = Math.floor(Math.random() * 999999999999) + 62000000000000;
  return POD;
}

function getRandomText(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getPriority() {
  const priorities = ["low", "medium", "high", "urgent"];
  const randomPriorities = priorities[Math.floor(Math.random() * priorities.length)];
  return randomPriorities;
}

function getProblems() {
  const problems = [
    "alamat tidak ditemukan",
    "paket rusak",
    "kurir tidak datang",
    "pengiriman tertunda",
    "penerima tidak ada",
    "barang hilang",
    "nomor resi tidak valid",
    "penerima menolak paket",
  ];
  const randomProblems = problems[Math.floor(Math.random() * problems.length)];
  return randomProblems;
}

function getInstruction() {
  const Instruction = [
    "return", "reschedule", "update-data", "claim", "cancel", "none",
  ];
  const randomInstruction = Instruction[Math.floor(Math.random() * Instruction.length)];
  return randomInstruction;
}

function sellerId() {
  const Id_seller = "slID-" + Math.floor(Math.random() * 10000);
  return Id_seller;
}

function sellerName() {
  const sellerNames = [
    "Andi", "Budi", "Citra", "Dewi", "Eka",
    "Alice", "Bob", "Charlie", "David", "Eve",
    "Frank", "Grace", "Hannah", "Ivy", "Jack",
    "Kara", "Liam", "Mia", "Noah", "Olivia",
    "Paul", "Quinn", "Riley", "Sophia", "Tyler",
    "Uma", "Vera", "Will", "Xander", "Yara",
    "Zane", "Amelia", "Ben", "Clara", "Dylan",
    "Ella", "Finn", "Gina", "Henry", "Isla",
    "James", "Kate", "Leo", "Mason", "Nina",
    "Oscar", "Piper", "Quincy", "Ruby", "Sam",
    "Tara", "Ulysses", "Violet", "Wyatt", "Xena",
  ];
  const lastName = ["Seller"];
  const firstName = sellerNames[Math.floor(Math.random() * sellerNames.length)];
  return `${firstName} ${lastName}`;
}

function tenantName() {
  const tenantRandomNames = [
    "tenantMerdeka", "satuNusa", "bintangCahaya", "nusantaraTech",
    "elangDigital", "garudaCloud", "lintasData", "sinarSolusi",
    "mandiriNet", "cahayaInovasi", "alphaTenant", "blueHorizon",
    "stellarCorp", "quantumZone", "novaEnterprise", "skylineTech",
    "zetaGroup", "auroraNet", "orbitWorks", "nimbusCloud",
  ];
  return tenantRandomNames[Math.floor(Math.random() * tenantRandomNames.length)];
}

function tenantId() {
  return "teID-" + Math.floor(Math.random() * 10000);
}

module.exports = {
  generateRandomName,
  generateRandomNamesArray,
  generateRandomPhoneNumber,
  generateRandomDivision,
  generateBatchId,
  generatePOD,
  getRandomText,
  getPriority,
  getProblems,
  getInstruction,
  sellerId,
  sellerName,
  tenantName,
  tenantId,
};
