function numberAWB() {
  const numberAirWayBill = [
    "OEX1141740",
  ];
  const randomIndexAWB = Math.floor(Math.random() * numberAirWayBill.length);
  return numberAirWayBill[randomIndexAWB];
}

function numberAWB2() {
  const numberAirWayBill2 = [
    "1257042400000485", "0267862400000635", "0179102400042841",
    "0267842400150697", "OEX1142056", "OEX1141768", "OEX1142546",
    "OEX1142576", "OEX1141912", "OEX1142594", "OEX1142595",
    "OEX1142613", "OEX1143241", "OEX1143298", "OEX1143297",
    "OEX1143309", "OEX1143316", "OEX1143338", "OEX1143349",
    "OEX1143374", "OEX1143375", "OEX1143380", "OEX1143379",
    "OEX1143523", "OEX1143534", "OEX1143535", "OEX1143546",
    "OEX1143570", "OEX1143652", "OEX1143708", "OEX1143763",
    "OEX1143760", "OEX1143762", "OEX1143765", "OEX1143766",
    "OEX1143767", "OEX1143768", "OEX1143769", "OEX1143770",
    "OEX1143774", "OEX1143775", "OEX1143778", "OEX1143779",
    "OEX1143929", "OEX1143931", "OEX1143932", "OEX1143936",
    "OEX1143938", "OEX1143939", "OEX1143941", "OEX1143943",
    "OEX1143944", "OEX1143945", "OEX1143946", "OEX1143949",
    "OEX1143952", "OEX1143959", "OEX1143963", "OEX1143966",
    "OEX1141740",
  ];
  return numberAirWayBill2;
}

function awbLincah() {
  const awb = [
    "LNCH2507BFVNAD4Y", "C1FAUXNY", "LNID2507BFJBAEHC",
    "LNCH250706BXIBAI", "JO0314105992", "LNCH2507BJMMAEDQ",
  ];
  return awb[Math.floor(Math.random() * awb.length)];
}

function getRandomAWB() {
  const allAWB = [...numberAWB2(), ...awbLincah()];
  return allAWB[Math.floor(Math.random() * allAWB.length)];
}

module.exports = {
  numberAWB,
  numberAWB2,
  awbLincah,
  getRandomAWB,
};
