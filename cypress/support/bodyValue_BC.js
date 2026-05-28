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
    6280000000000, //danny
    6280000000000, //dummy
    // 6280000000000, //mantan hadi
    // 6280000000000, //govin
    // 6280000000000, //hadi
    // 6280000000000,
    // 6280000000000, //fikri
    // 6280000000000, //kevin
    // 6280000000000, //mico
    // 6280000000000, //risyandi
    // 6280000000000, //tomi
    // 6280000000000,
    // 6280000000000, //rezky
    // 6280000000000, //adit
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
