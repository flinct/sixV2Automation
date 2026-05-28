import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page.js";
import { timestamp } from "rxjs";
import { times } from "lodash";
import elementNavigation from "../commands/navigation.js";
import elementAuth from "../commands/auth.js";
import elementTicket from "../commands/ticketing.js";
import elementConversation from "../commands/inbox_.js";
import elementBroadcast from "../commands/broadcast.js";
import elementSettings from "../commands/settings.js";
import { id } from "common-tags";

const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");

const config = env_config(baseUrl);

const customer_number = 6280000000000;

const customerNumber = "6280000000000";

function getHeaderByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "https://app.example.test") {
    if (loginType === "goddummyprod") return config.headers;
    if (loginType === "testing270520252")
      return config.headers_testing270520252;
  }

  if (baseUrl === "https://dev.example.test") {
    if (loginType === "chickentester") return config.headers_CT;
    if (loginType === "goddevsa1") return config.headers_GD;
    if (loginType === "messagelogsatu") return config.headers_ms1;
  }

  if (baseUrl === "https://staging.example.test") {
    if (loginType === "chickentester") return config.headers_CT_staging;
    if (loginType === "goddevsa1") return config.headers_GD;
    if (loginType === "messagelogsatu") return config.headers_ms1;
  }
}
function getLoginBodyByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "https://app.example.test") {
    if (loginType === "goddummyprod") return config.loginBody;
    if (loginType === "testing270520252")
      return config.loginBody_testing270520252;
  }

  if (baseUrl === "https://dev.example.test") {
    if (loginType === "chickentester") return config.loginBody_CT;
    if (loginType === "goddevsa1") return config.loginBody_SAP;
    if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
    if (loginType === "spongebobkotak") return config.loginBody_bikini;
  }

  if (baseUrl === "https://dev.example.test") {
    if (loginType === "chickentester") return config.loginBody_CT;
    if (loginType === "goddevsa1") return config.loginBody_SAP;
    if (loginType === "helloworld") return config.loginBody_helloWorld;
    if (loginType === "spongebobkotak") return config.loginBody_bikini;
  }

  if (baseUrl === "https://staging.example.test") {
    if (loginType === "chickentester") return config.loginBody_CT;
    if (loginType === "goddevsa1") return config.loginBody_SAP;
    if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
    if (loginType === "spongebobkotak") return config.loginBody_bikini;
  }
}

const loginBody = getLoginBodyByLoginType(config, baseUrl, loginType);
const headers = getHeaderByLoginType(config, baseUrl, loginType);

class allPageAccess {
  accessConversation() {
    elementNavigation.inboxNav().click();
    cy.url().should("include", "/id/conversation/your-inbox");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation
      .chatListTitle()
      .contains(/your inbox|kotak pesan anda/i);
  }
  accessConversationUnassigned() {
    cy.url().then((url) => {
      if (url.includes("/conversation/unassigned")) {
        cy.log("Halaman your inbox");
      } else {
        cy.log("Buka halaman your inbox");
        elementConversation.inboxUnassignedNav().click();
      }
    });
    cy.url().should("include", "/id/conversation/unassigned");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation
      .chatListTitle()
      .contains(/unassigned|belum ditugaskan/i);
  }
  accessConversationAll() {
    cy.url().then((url) => {
      if (url.includes("/conversation/all")) {
        cy.log("Halaman all inbox");
      } else {
        cy.log("Buka halaman all inbox");
        elementConversation.inboxAllNav().click();
      }
    });
    cy.url().should("include", "/id/conversation/all");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation.chatListTitle().contains(/all|semua/i);
  }
  accessConversationSpam() {
    cy.url().then((url) => {
      if (url.includes("/conversation/spam")) {
        cy.log("Halaman spam");
      } else {
        cy.log("Buka halaman spam");
        elementConversation.inboxSpamNav().click();
      }
    });
    cy.url().should("include", "/id/conversation/spam");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation.chatListTitle().contains(/spam/i);
  }
  accessConversationStarred() {
    cy.url().then((url) => {
      if (url.includes("/conversation/starred")) {
        cy.log("Halaman starred");
      } else {
        cy.log("Buka halaman starred");
        elementConversation.inboxStarredNav().click();
      }
    });
    cy.url().should("include", "/id/conversation/starred");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation.chatListTitle().contains(/starred|berbintang/i);
  }
  accessGroupConversation() {
    cy.url().then((url) => {
      if (url.includes("/conversation/channel?channel=whatsapp_web_group")) {
        cy.log("Halaman group");
      } else {
        cy.log("Buka group");
        elementConversation.groupChatNav().click();
      }
    });
    cy.url().should(
      "include",
      "/id/conversation/channel?channel=whatsapp_web_group"
    );
    cy.document().should("have.property", "readyState", "complete");
    elementConversation.chatListTitle().contains(/whatsapp web group/i);
  }
  accessChannelWhatsappWeb() {
    cy.url().then((url) => {
      const expected = "/conversation/channel?channel=whatsapp_web";
      if (url.endsWith(expected)) {
        cy.log("Halaman channel whatsapp");
      } else {
        cy.log("Buka channel whatsapp");
        elementConversation.navFilterChannelWhatsappUnoff().click();
      }
    });
    cy.url().should("include", "/id/conversation/channel?channel=whatsapp_web");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation.chatListTitle().contains(/whatsapp web/i);
  }
  accessConversationTeam() {
    cy.url().then((url) => {
      const expected = "/conversation/team?team=";
      if (url.endsWith(expected)) {
        cy.log("Halaman team inbox");
      } else {
        cy.log("Buka team inbox");
        elementConversation.navFilterTeamLabel().click();
      }
    });
    cy.url().should("include", "/id/conversation/team?team=");
    cy.document().should("have.property", "readyState", "complete");
    elementConversation
      .navFilterTeamLabel()
      .find("p")
      .eq(0)
      .invoke("text")
      .then((text) => {
        cy.log("Text:", text.trim());
        elementConversation.chatListTitle().contains(text);
      });
  }
  accessTicket() {
    elementNavigation.ticketNav().click();
    cy.url({
      timeout: 15000,
    }).should("include", "/id/ticketing");
    cy.document().should("have.property", "readyState", "complete");
    cy.contains('button[role="tab"][data-state="active"]', "Terbuka");
  }
  accessTicketClosed() {
    cy.url().then((url) => {
      if (url.includes("/ticketing")) {
        cy.log("Halaman Ticketing");
      } else {
        cy.log("Bukan halaman Ticketing");
        elementNavigation.ticketNav().click();
      }
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/ticketing");
    cy.document().should("have.property", "readyState", "complete");
    cy.contains('button[role="tab"][data-state="inactive"]', "Ditutup").click();
    cy.contains('button[role="tab"][data-state="active"]', "Ditutup");
  }
  accessCreateTicket() {
    cy.url().then((url) => {
      if (url.includes("/ticketing")) {
        // do A
        cy.log("Halaman Ticketing");
        // A action
      } else {
        cy.log("Buka halaman Ticketing");
        elementNavigation.ticketNav().click();
      }
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/ticketing");
    cy.document().should("have.property", "readyState", "complete");
    elementTicket.buttonCreateTicket().click();
    elementTicket.createTicketDrawerModal().should("be.visible");
  }
  accessBroadcast() {
    cy.url().then((url) => {
      if (url.includes("/broadcast/messages")) {
        // do A
        cy.log("Halaman broadcast hist");
        // A action
      } else {
        cy.log("Buka halaman broadcast hist");
        elementNavigation.broadcastNav().click();
      }
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/broadcast/messages");
    cy.document().should("have.property", "readyState", "complete");
    elementBroadcast.broadcastNavTitle();
    elementBroadcast
      .broadcastMessageTableLength()
      .should("have.length.greaterThan", 0);
    elementBroadcast.broadcastMessageBulk().click();
    elementBroadcast.broadcastMessageBulkInputModal().should("be.visible");
    // elementBroadcast.broadcastNavTitle().click();
    elementBroadcast.broadcastMessageBulkInputModalCancel().click();
    cy.wait(2000);
    elementBroadcast.broadcastNavDraft().should("be.visible");
    elementBroadcast.broadcastNavTemplateWaOfficials().should("be.visible");
    elementBroadcast.broadcastNavTemplateWaUnoff().should("be.visible");
  }
  accessStatistic() {
    elementNavigation.statisticNav().click();
  }
  accessContact() {
    elementNavigation.contactNav().click();
  }
  accessSetting() {
    cy.url().then((url) => {
      if (url.includes("/settings/organization/general")) {
        // do A
        cy.log("Halaman settings");
        // A action
      } else {
        cy.log("Buka halaman settings");
        elementNavigation.settingsNav().click();
      }
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/settings/organization/general");
    cy.document().should("have.property", "readyState", "complete");
    elementSettings.titleSetting();
    elementSettings.organizationSetting().click();
    cy.wait(1000);
    elementSettings.organizationSetting().click();
    elementSettings.organizationSettingGeneral();
  }
  accessSettingRole() {
    cy.url().then((url) => {
      if (url.includes("/settings/organization/roles")) {
        // do A
        cy.log("Halaman settings");
        // A action
      } else {
        cy.log("Buka halaman settings");
        elementNavigation.settingsNav().click();
      }
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/settings/organization/roles");
    cy.document().should("have.property", "readyState", "complete");
    elementSettings.titleSetting();
    elementSettings.organizationSetting().click();
    cy.wait(1000);
    elementSettings.organizationSetting().click();
    elementSettings.organizationSettingGeneral();
  }
  accessProfile() {
    elementNavigation.profileNav().click();
  }
  accessRegister() {
    elementAuth.hyperlinkRegister().click();
  }
}

function randomQuotes() {
  const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great.",
    "I find that the harder I work, the more luck I seem to have.",
    "Success is not in what you have, but who you are.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "The best way to predict the future is to create it.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "Opportunities don't happen. You create them.",
    "Success is how high you bounce when you hit bottom.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    "Do what you can, with what you have, where you are.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Dream big and dare to fail.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Don't watch the clock; do what it does. Keep going.",
    "The journey of a thousand miles begins with one step.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Difficulties in life are intended to make us better, not bitter.",
    "The only person you are destined to become is the person you decide to be.",
    "Don’t count the days, make the days count.",
    "Every strike brings me closer to the next home run.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "You define your own life. Don’t let other people write your script.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "The best revenge is massive success.",
    "Do not let what you cannot do interfere with what you can do.",
    "It is never too late to be what you might have been.",
    "Turn your wounds into wisdom.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "We may encounter many defeats but we must not be defeated.",
    "Your life only gets better when you get better.",
    "Failure is another stepping stone to greatness.",
    "The man who has confidence in himself gains the confidence of others.",
    "Happiness is not something ready made. It comes from your own actions.",
    "If you want to lift yourself up, lift up someone else.",
    "No one can make you feel inferior without your consent.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "You miss 100% of the shots you don’t take.",
    "Don’t wait. The time will never be just right.",
    "Whether you think you can or you think you can’t, you’re right.",
    "To be a champion, you have to believe in yourself when no one else will.",
    "Always do your best. What you plant now, you will harvest later.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is stumbling from failure to failure with no loss of enthusiasm",
    "The difference between ordinary and extraordinary is that little extra",
    "If you’re going through hell, keep going",
    "Perseverance is not a long race; it is many short races one after another",
    "It’s not about how hard you can hit; it’s about how hard you can get hit and keep moving forward",
    "Start where you are. Use what you have. Do what you can",
    "Don’t wait for opportunity. Create it",
    "Do not be embarrassed by your failures; learn from them and start again",
    "You are never too old to set another goal or to dream a new dream",
    "If you want something you've never had, you must be willing to do something you've never done",
    "Success is getting what you want. Happiness is wanting what you get",
    "Don’t let yesterday take up too much of today",
    "Push yourself, because no one else is going to do it for you",
    "Success doesn’t just find you. You have to go out and get it",
    "Dream it. Wish it. Do it",
    "Your limitation—it’s only your imagination",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "It always seems impossible until it’s done",
    "Dreams don’t work unless you do",
    "Go the extra mile. It’s never crowded",
    "Don’t stop when you’re tired. Stop when you’re done",
    "You don’t have to be great to start, but you have to start to be great",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for an opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Be a warrior, not a worrier",
    "It’s never too late to be what you might have been",
    "If you’re not willing to risk the usual, you’ll have to settle for the ordinary",
    "I have not failed. I’ve just found 10,000 ways that won’t work",
    "Failure will never overtake me if my determination to succeed is strong enough",
    "The only place where success comes before work is in the dictionary",
    "The way to get started is to quit talking and begin doing",
    "Don't be afraid to give up the good to go for the great",
    "I find that the harder I work, the more luck I seem to have",
    "Opportunities don't happen. You create them",
    "Don't be distracted by criticism. Remember—the only taste of success some people get is to take a bite out of you",
    "I have learned over the years that when one’s mind is made up, this diminishes fear",
    "You may have to fight a battle more than once to win it",
    "Keep going. Everything you need will come to you at the perfect time",
    "A river cuts through rock not because of its power but because of its persistence",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle",
    "The ones who are crazy enough to think they can change the world are the ones who do",
    "No matter how hard the past, you can always begin again",
    "Your life only gets better when you get better",
    "Turn your wounds into wisdom",
    "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well",
    "To succeed in life, you need two things: ignorance and confidence",
    "It is our choices that show what we truly are, far more than our abilities",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit",
    "If you cannot do great things, do small things in a great way",
    "Be not afraid of going slowly, be afraid only of standing still",
    "A winner is a dreamer who never gives up",
    "You miss 100% of the shots you don’t take",
    "Do something today that your future self will thank you for",
    "Success is not just about making money; it’s about making a difference in people’s lives",
    "Believe in your dreams, no matter how impossible they may seem",
    "Focus on the step in front of you, not the whole staircase",
    "Success is best when it’s shared",
    "Effort only fully releases its reward after a person refuses to quit",
    "Discipline is the bridge between goals and accomplishment",
    "Be brave. Take risks. Nothing can substitute experience",
    "The future belongs to those who believe in the beauty of their dreams",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "The power of imagination makes us infinite",
    "A goal without a plan is just a wish",
    "It always seems impossible until it’s done",
    "Dream as if you’ll live forever. Live as if you’ll die today",
    "Life is short. Live it. Fear is natural. Face it. Memory is powerful. Use it",
    "It’s not whether you get knocked down; it’s whether you get up",
    "Good things come to people who wait, but better things come to those who go out and get them",
    "Success is walking from failure to failure with no loss of enthusiasm",
    "The harder you work, the luckier you get",
    "Success is the sum of small efforts, repeated day in and day out",
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t",
    "Work hard in silence; let your success be your noise",
    "If you want to achieve greatness stop asking for permission",
    "Sometimes you win, sometimes you learn",
    "You can’t have a million-dollar dream with a minimum-wage work ethic",
    "The distance between dreams and reality is called action",
    "A little progress each day adds up to big results",
    "Strive not to be a success, but rather to be of value",
    "The pain you feel today will be the strength you feel tomorrow",
    "Don’t decrease the goal. Increase the effort",
    "Everything you’ve ever wanted is on the other side of fear",
    "Success is not just a goal; it’s a byproduct of the journey",
    "To succeed in life, you need three things: a wishbone, a backbone, and a funny bone",
    "Whatever you are, be a good one",
    "Challenges are what make life interesting, and overcoming them is what makes life meaningful",
    "There are no limits to what you can accomplish, except the limits you place on your own thinking",
    "Success isn’t about being the best; it’s about always getting better",
    "It is not in the stars to hold our destiny but in ourselves",
    "You are not defined by your past; you are prepared by your past",
    "Do one thing every day that scares you",
    "Act as if what you do makes a difference. It does",
    "A smooth sea never made a skilled sailor",
    "You don’t have to be great to start, but you have to start to be great",
    "The only way to do great work is to love what you do",
    "Be yourself; everyone else is already taken",
    "The road to success is dotted with many tempting parking spaces",
    "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change",
    "Don’t watch the clock; do what it does. Keep going",
    "Life isn’t about waiting for the storm to pass; it’s about learning to dance in the rain",
    "Success is liking yourself, liking what you do, and liking how you do it",
    "Focus on where you want to go, not on what you fear",
    "Start where you are. Use what you have. Do what you can",
    "Success isn’t about how much money you make; it’s about the difference you make in people’s lives",
    "The only person you should try to be better than is the person you were yesterday",
    "Believe you can and you’re halfway there",
    "The secret of getting ahead is getting started",
    "The best way to predict the future is to invent it",
    "Success is not in what you have, but who you are",
    "Don’t let small minds convince you that your dreams are too big",
    "Your life does not get better by chance, it gets better by change",
    "Keep your eyes on the stars, and your feet on the ground",
    "Success usually comes to those who are too busy to be looking for it",
    "Do what you can, with what you have, where you are",
    "It’s not about being the best. It’s about being better than you were yesterday",
    "The journey of a thousand miles begins with one step",
    "The way to get started is to quit talking and begin doing",
    "If you want to make your dreams come true, the first thing you have to do is wake up",
    "It takes courage to grow up and become who you really are",
    "What you get by achieving your goals is not as important as what you become by achieving your goals",
    "The only place where success comes before work is in the dictionary",
    "Opportunities are usually disguised as hard work, so most people don’t recognize them",
    "The only limit to our realization of tomorrow is our doubts of today",
    "Do not let what you cannot do interfere with what you can do",
    "Small deeds done are better than great deeds planned",
    "Success is not just about earning money; it’s about making an impact",
    "One day or day one. You decide",
    "Do not wait; the time will never be ‘just right’",
    "You define your own life. Don’t let other people write your script",
    "Hustle beats talent when talent doesn’t hustle",
    "Don’t be afraid to start over. It’s a chance to build something better this time",
    "The best revenge is massive success",
    "Success is not final, failure is not fatal: it is the courage to continue that counts",
    "Don't let anyone ever dull your sparkle",
    "What you do today can improve all your tomorrows",
    "It’s not the years in your life that count; it’s the life in your years",
    "Don't limit your challenges. Challenge your limits",
    "Success is what happens after you have survived all of your mistakes",
    "The only difference between ordinary and extraordinary is that little extra",
    "Strength doesn’t come from what you can do; it comes from overcoming the things you once thought you couldn’t",
    "The greater the obstacle, the more glory in overcoming it",
    "You miss 100% of the shots you don’t take",
    "Let your dreams be bigger than your fears and your actions louder than your words",
    "Success is the best revenge",
    "Success is not how high you have climbed, but how you make a positive difference to the world",
    "Dream big and dare to fail",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "The best way to predict your future is to create it. – Peter Drucker",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
    "Life is not measured by the number of breaths we take, but by the moments that take our breath away. – Maya Angelou",
    "Every moment is a fresh beginning. – T.S. Eliot",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "Doubt kills more dreams than failure ever will. – Suzy Kassem",
    "Dream big and dare to fail. – Norman Vaughan",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "You can, you should, and if you’re brave enough to start, you will. – Stephen King",
    "If you can dream it, you can achieve it. – Zig Ziglar",
    "Life isn’t about waiting for the storm to pass but learning to dance in the rain. – Vivian Greene",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "If you want to lift yourself up, lift up someone else. – Booker T. Washington",
    "I can’t change the direction of the wind, but I can adjust my sails to always reach my destination. – Jimmy Dean",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "Life is either a daring adventure or nothing at all. – Helen Keller",
    "Act as if what you do makes a difference. It does. – William James",
    "Perfection is not attainable, but if we chase perfection we can catch excellence. – Vince Lombardi",
    "Turn your wounds into wisdom. – Oprah Winfrey",
    "It is never too late to be what you might have been. – George Eliot",
    "Great things are done by a series of small things brought together. – Vincent Van Gogh",
    "You are the sum of the choices you make. – Wayne Dyer",
    "Your life does not get better by chance, it gets better by change. – Jim Rohn",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "In three words I can sum up everything I’ve learned about life: it goes on. – Robert Frost",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
    "When you have a dream, you've got to grab it and never let go",
    "Opportunities don't happen, you create them",
    "The only limit to our realization of tomorrow is our doubts of today",
    "Keep your face always toward the sunshine, and shadows will fall behind you",
    "Challenges are what make life interesting, and overcoming them is what makes life meaningful",
    "Happiness is not by chance, but by choice",
    "If you’re going through hell, keep going",
    "We may encounter many defeats, but we must not be defeated",
    "Success is not in what you have, but who you are",
    "Life shrinks or expands in proportion to one’s courage",
    "In the end, we only regret the chances we didn’t take",
    "Start where you are, use what you have, do what you can",
    "Sometimes the bravest and most important thing you can do is just show up",
    "Your big opportunity may be right where you are now",
    "Courage doesn’t always roar; sometimes courage is the quiet voice at the end of the day saying 'I will try again tomorrow'",
    "The purpose of life is a life of purpose",
    "To live is the rarest thing in the world; most people just exist",
    "It’s not what happens to you, but how you react to it that matters",
    "We must embrace pain and burn it as fuel for our journey",
    "Nothing is impossible, the word itself says 'I’m possible'",
    "Don't count the days, make the days count",
    "Success is not how high you have climbed, but how you make a positive difference to the world",
    "A goal without a plan is just a wish",
    "The mind is everything; what you think, you become",
    "Don’t wait for the perfect moment; take the moment and make it perfect",
    "Live each day as if your life had just begun",
    "The harder you work for something, the greater you’ll feel when you achieve it",
    "Be so good they can’t ignore you",
    "Strive not to be a success, but rather to be of value",
    "Believe in yourself and all that you are; know that there is something inside you that is greater than any obstacle",
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
const value_randomQuotes = randomQuotes();
export default allPageAccess;
