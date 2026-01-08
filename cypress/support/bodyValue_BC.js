export function bodyValue_Broadcast() {
  const valueRandomMessage = [
    // "a",
    // "b",
    // "c",
    // "d",
    "Announcement: 'This is a dummy broadcast. Please disregard this message, do not block, it is for testing purposes only.'",
  ];
  const getRandomMessage = () => {
    return valueRandomMessage[
      Math.floor(Math.random() * valueRandomMessage.length)
    ];
  };

  const generateRandomId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a number between 10000 and 99999
  };

  const randomAWB = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const customer_number = [
    6289655057778, //danny
    6285135431270, //dummy
    // 6282344571978, //mantan hadi
    // 6285888339026, //govin
    // 6281395195668, //hadi
    // 6289538411006,
    // 6285736422728, //fikri
    // 6287726947394, //kevin
    // 6289618319350, //mico
    // 6281380745594, //risyandi
    // 6283849306083, //tomi
    // 6285155412232,
    // 6285158722427, //rezky
    // 6285798182929, //adit
  ];
  const sendBroadcast_to_customer_number = () => {
    return customer_number[
      Math.floor(Math.random() * customer_number.length)
    ].toString();
  };

  const value = {
    broadcastMessage: customer_number.map((number) => ({
      number_whatsapp_customer: number.toString(),
      message: getRandomMessage(),
      id_template: generateRandomId(),
      properties: {
        contactName: "AEGAgent022",
        division: "Jawa Barat",
        senderName: "System-SAP",
        category: "food and beverage",
        orderId: `AWB-${randomAWB()}`, // awb number
        batchId: `BATCH001-${randomAWB()}`, // batch number
      },
    })),
  };

  return value;
}
