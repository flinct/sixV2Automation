const { AuthPage } = require('./auth.page');
const { InboxPage } = require('./inbox.page');
const { DashboardPage } = require('./dashboard.page');
const { TicketingPage } = require('./ticketing.page');
const { BroadcastPage } = require('./broadcast.page');
const { ContactPage } = require('./contact.page');
const { GroupPage } = require('./group.page');
const { TeamPage } = require('./team.page');
const { UserRbacPage } = require('./user-rbac.page');
const { AccountWhatsappPage } = require('./account-whatsapp.page');
const { CheckAllPage } = require('./check-all.page');
const { ConversationSocketPage } = require('./conversation-socket.page');
const { EndpointDetectPage } = require('./endpoint-detect.page');
const { LiveChatPage } = require('./live-chat.page');
const { ConversationDetailPage } = require('./conversation-detail.page');
const { ConversationHistoryPage } = require('./conversation-history.page');

module.exports = {
  CHANNELS: [
    { key: 'widget', title: /Widget/i },
    { key: 'whatsapp_api', title: /Whatsapp Api/i },
    { key: 'whatsapp_web', title: /Whatsapp Web/i },
    { key: 'instagram', title: /Instagram/i },
    { key: 'facebook_messenger', title: /Facebook Messenger/i },
    { key: 'email', title: /Email/i },
    { key: 'telegram', title: /Telegram/i },
  ],
  AuthPage,
  InboxPage,
  DashboardPage,
  TicketingPage,
  BroadcastPage,
  ContactPage,
  GroupPage,
  TeamPage,
  UserRbacPage,
  AccountWhatsappPage,
  CheckAllPage,
  ConversationSocketPage,
  EndpointDetectPage,
  LiveChatPage,
  ConversationDetailPage,
  ConversationHistoryPage,
};
