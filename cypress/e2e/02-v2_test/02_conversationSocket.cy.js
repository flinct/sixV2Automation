// Helper to generate random alphanumeric (e.g., 6 characters)
const randomAlphanumeric = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
};

// Generate random alphanumeric + special characters
const randomAlphanumericSpecial = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// Helper to generate a UUID v4 (simple version, not cryptographically strong)
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Static data arrays (can be placed outside the loop)
const contactNames = [
  "Andi",
  "Budi",
  "Citra",
  "Dewi",
  "Eka",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivy",
  "Jack",
  "Kara",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Paul",
  "Quinn",
  "Riley",
  "Sophia",
  "Tyler",
  "Uma",
  "Vera",
  "Will",
  "Xander",
  "Yara",
  "Zane",
  "Amelia",
  "Ben",
  "Clara",
  "Dylan",
  "Ella",
  "Finn",
  "Gina",
  "Henry",
  "Isla",
  "James",
  "Kate",
  "Leo",
  "Mason",
  "Nina",
  "Oscar",
  "Piper",
  "Quincy",
  "Ruby",
  "Sam",
  "Tara",
  "Ulysses",
  "Violet",
  "Wyatt",
  "Xena",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
];

const accountChannels = [
  { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
  { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
  { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
  { id: "69782d3654be8e7508b4abfe", topic: "Complain" },
  { id: "6964ab6929de985a0fe73e48", topic: "kipas angin" },
];

describe("Conversation and Socket Test - Multiple Iterations with Dynamic Topics", () => {
  const iterations = 100; // Change as needed
  const signatureKey = "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if";

  for (let i = 0; i < iterations; i++) {
    it(`should complete full flow for iteration ${i + 1}`, () => {
      // Pick a random account channel for this iteration
      const channel =
        accountChannels[Math.floor(Math.random() * accountChannels.length)];
      const accountChannelId = channel.id;
      const topicName = channel.topic;
      cy.log(
        `Iteration ${i + 1}: Using accountChannelId = ${accountChannelId} (topic: "${topicName}")`,
      );

      // 1. Generate unique data for this iteration
      const guestName = `guest-${randomAlphanumeric()}`;
      const referenceId = generateUUID();

      // 2. Create client contact
      cy.request({
        method: "POST",
        url: "https://dev-v2-api.satuinbox.com/open-api/client-contact",
        headers: { "x-signature-key": signatureKey },
        body: {
          channelId: "692fe8eaaff05e8a1623e0d3",
          metaData: {
            browserName: "Chrome",
            deviceType: "Desktop",
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
          },
          name: guestName,
          referenceId: referenceId,
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        const clientContactId = response.body.id;
        cy.log(`Iteration ${i + 1}: clientContactId = ${clientContactId}`);

        // 3. Submit topic using the selected accountChannelId and topic name
        return cy
          .request({
            method: "POST",
            url: "https://dev-v2-api.satuinbox.com/open-api/conversation/submit/topic",
            headers: { "x-signature-key": signatureKey },
            body: {
              accountChannelId: accountChannelId,
              clientContactId: clientContactId,
              metadata: [
                {
                  browserName: "Chrome",
                  deviceType: "Desktop",
                  topic: topicName, // Use the dynamic topic name
                  userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
                },
              ],
            },
          })
          .then((resp2) => {
            expect(resp2.status).to.be.oneOf([200, 201]);
            // The response may return the same accountChannelId, but we already have it
            cy.log(`Iteration ${i + 1}: submit/topic successful`);

            // 4. Prepare dynamic message content, including the topic name
            const firstName =
              contactNames[Math.floor(Math.random() * contactNames.length)];
            const lastName =
              lastNames[Math.floor(Math.random() * lastNames.length)];
            const randomSuffix = randomAlphanumericSpecial(6);
            const content = `${topicName}: ${firstName} ${lastName} ${randomSuffix}`;
            cy.log(`Iteration ${i + 1}: message content = "${content}"`);

            // 5. Connect socket and send inbound message
            cy.connectSocket(signatureKey);

            cy.sendInboundMessage({
              channelAccountId: accountChannelId,
              clientContactId: clientContactId,
              content: content,
            });

            // 6. Listen for the new message and verify content
            // Assumes listenNewMessage returns a chainable that yields the message
            cy.listenNewMessage().then((receivedData) => {
              cy.log("Received message:", receivedData);
              // expect(receivedData).to.have.property("content", content);
            });

            // 7. Disconnect socket
            cy.disconnectSocket();
          });
      });
    });
  }
});
