class ApiEndpoints {
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

  get loginUrl() { return `${this.apiBase}api/auth/login`; }
  get currentProfile() { return `${this.apiBase}api/auth/me`; }
  get logoutUrl() { return `${this.apiBase}api/auth/logout`; }
  get refreshToken() { return `${this.apiBase}api/auth/refresh-token`; }
  get registerUrl() { return `${this.apiBase}api/auth/register`; }
  get changePassword() { return `${this.apiBase}api/auth/change-password`; }
  get generateApiKey() { return `${this.apiBase}api/auth/generate-api-key`; }
  get getApiKey() { return `${this.apiBase}api/auth/get-api-key`; }
  get sendEmailVerification() { return `${this.apiBase}api/auth/send-email-verification`; }
  get validateEmail() { return `${this.apiBase}api/auth/validate-email`; }
  get sendLinkResetPassword() { return `${this.apiBase}api/auth/send-link-reset-password`; }
  get resetPassword() { return `${this.apiBase}api/auth/reset-password`; }
  get validateResetToken() { return `${this.apiBase}api/auth/validate-reset-token`; }
  get validateMember() { return `${this.apiBase}api/auth/validate-member`; }
  get userInfo() { return `${this.apiBase}api/auth/user-info`; }

  approveOnboarding(companyId) { return `${this.apiBase}api/company/${companyId}/approve`; }
  rejectOnboarding(companyId) { return `${this.apiBase}api/company/${companyId}/reject`; }
  generateMemberPassword(memberId) { return `${this.apiBase}api/auth/member/${memberId}/generate-member-password`; }

  get openApi_broadcast() { return `${this.apiBase}open-api/broadcast`; }
  get openApi_createTicketing() { return `${this.apiBase}open/ticketing`; }
  get openApi_createBulkTicketing() { return `${this.apiBase}open/ticketing/bulk`; }
  get getAllNomorWhatsapp() { return `${this.apiBase}open-api/broadcast/team-inboxes?limit=200`; }
  get getAllNomorWhatsappActive() { return `${this.apiBase}open/account-whatsapp?statusNumberWhatsapp=active&limit=300`; }
  get clientContact() { return `${this.apiBase}open-api/client-contact`; }
  get submitTopic() { return `${this.apiBase}open-api/conversation/submit/topic`; }
  get getLicenseKey() { return `${this.apiBase}open/license-key`; }
  get instanceInfo() { return `${this.apiBase}open/instance/info?key=`; }
  get initInstance() { return `${this.apiBase}open/whatsapp/init?force=true&whatsappNumber=`; }

  get whatsappUrl() { return `${this.apiBase}api/account-whatsapp?limit=9000`; }
  get getAllDivision() { return `${this.apiBase}api/division?sortBy=name_division:asc&limit=999&populate=agents`; }
  get privacyPolicy() { return `${this.apiBase}api/privacy-policy`; }
  get termOfUse() { return `${this.apiBase}api/term-of-use`; }
  get platform() { return `${this.apiBase}api/platform`; }
  get channel() { return `${this.apiBase}api/channel`; }
  channelById(id) { return `${this.apiBase}api/channel/${id}`; }

  get accountChannel() { return `${this.apiBase}api/account-channel`; }
  get accountChannelMaxLimit() { return `${this.apiBase}api/account-channel?limit=200&platform=whatsapp_web`; }
  get accountChannelFilterActive() { return `${this.apiBase}api/account-channel?limit=200&connectionStatus=active`; }
  get accountChannelSummary() { return `${this.apiBase}api/account-channel/summary`; }
  accountChannelById(id) { return `${this.apiBase}api/account-channel/${id}`; }
  get postAccountChannelBulk() { return `${this.apiBase}api/account-channel/bulk`; }
  get deleteAccountChannelBulkSoftDelete() { return `${this.apiBase}api/account-channel/bulk-soft-delete`; }

  get initInstanceV2() { return `${this.apiBase}api/account-channel/instance`; }
  getQrInstanceV2(id) { return `${this.apiBase}api/account-channel/instance/qr/${id}`; }
  instanceInfoV2(id) { return `${this.apiBase}api/account-channel/instance/${id}`; }
  instanceLogout(id) { return `${this.apiBase}api/account-channel/instance/logout/${id}`; }
  instanceStop(id) { return `${this.apiBase}api/account-channel/instance/stop/${id}`; }

  get getTeam() { return `${this.apiBase}api/team/`; }
  get team() { return `${this.apiBase}api/team`; }
  teamById(id) { return `${this.apiBase}api/team/${id}`; }
  syncTeamConversations(id) { return `${this.apiBase}api/team/${id}/sync-conversations`; }
  archiveTeam(id) { return `${this.apiBase}api/team/archive/${id}`; }

  get conversation() { return `${this.apiBase}api/conversation`; }
  conversationById(id) { return `${this.apiBase}api/conversation/${id}`; }
  get conversationCount() { return `${this.apiBase}api/conversation/count`; }
  get conversationFilterCount() { return `${this.apiBase}api/conversation/filter-count`; }
  get conversationActiveCount() { return `${this.apiBase}api/conversation/active-conversation-count`; }
  get conversationAvailableSlot() { return `${this.apiBase}api/conversation/available-slot`; }
  get conversationGroup() { return `${this.apiBase}api/conversation/group`; }
  get conversationHistory() { return `${this.apiBase}api/conversation/history`; }
  get conversationParticipants() { return `${this.apiBase}api/conversation/participants`; }
  get conversationPull() { return `${this.apiBase}api/conversation/pull`; }
  get sendConversation() { return `${this.apiBase}api/conversation/send`; }
  get conversationTags() { return `${this.apiBase}api/conversation/tags`; }
  get conversationScreenshot() { return `${this.apiBase}api/conversation/screenshot`; }
  get conversationScreenshotSetting() { return `${this.apiBase}api/conversation/screenshot/setting`; }
  get conversationScreenshotSendWebhook() { return `${this.apiBase}api/conversation/screenshot/send-webhook`; }
  get conversationScreenshotVariable() { return `${this.apiBase}api/conversation/screenshot/variable`; }
  get patchConversationBulkAssign() { return `${this.apiBase}api/conversation/bulk/assign`; }
  get patchConversationBulkClose() { return `${this.apiBase}api/conversation/bulk/close`; }
  get patchConversationBulkJunked() { return `${this.apiBase}api/conversation/bulk/junked`; }
  get patchConversationBulkPin() { return `${this.apiBase}api/conversation/bulk/pin`; }
  get patchConversationBulkRead() { return `${this.apiBase}api/conversation/bulk/read`; }
  get patchConversationBulkReopen() { return `${this.apiBase}api/conversation/bulk/reopen`; }
  get patchConversationBulkSpam() { return `${this.apiBase}api/conversation/bulk/spam`; }
  get patchConversationBulkStar() { return `${this.apiBase}api/conversation/bulk/star`; }

  assignConversation(id) { return `${this.apiBase}api/conversation/${id}/assign`; }
  closeConversation(id) { return `${this.apiBase}api/conversation/${id}/close`; }
  junkedConversation(id) { return `${this.apiBase}api/conversation/${id}/junked`; }
  pinConversation(id) { return `${this.apiBase}api/conversation/${id}/pin`; }
  readConversation(id) { return `${this.apiBase}api/conversation/${id}/read`; }
  reopenConversation(id) { return `${this.apiBase}api/conversation/${id}/reopen`; }
  spamConversation(id) { return `${this.apiBase}api/conversation/${id}/spam`; }
  starConversation(id) { return `${this.apiBase}api/conversation/${id}/star`; }
  unassignConversation(id) { return `${this.apiBase}api/conversation/${id}/unassign`; }
  getConversationMessages(id) { return `${this.apiBase}api/conversation/${id}/messages`; }
  getConversationSlaMetrics(conversationId) { return `${this.apiBase}api/conversation-sla-metrics/${conversationId}`; }

  get ticketing() { return `${this.apiBase}api/ticket`; }
  get createTicketing() { return `${this.apiBase}api/ticket`; }
  get ticketType() { return `${this.apiBase}api/ticket-type`; }
  get ticketBulkReply() { return `${this.apiBase}api/ticket/bulk-reply`; }
  get ticketBulkReplyIdentifierFields() { return `${this.apiBase}api/ticket/bulk-reply/identifier-fields`; }
  get ticketBulkReplyTemplate() { return `${this.apiBase}api/ticket/bulk-reply/template`; }
  get ticketBulkReplyTicketTypes() { return `${this.apiBase}api/ticket/bulk-reply/ticket-types`; }
  get ticketBulkTags() { return `${this.apiBase}api/ticket/bulk/tags`; }
  get ticketExport() { return `${this.apiBase}api/ticket/export`; }
  get ticketKpi() { return `${this.apiBase}api/ticket/kpi`; }
  get ticketViewSettings() { return `${this.apiBase}api/ticket/view-settings`; }
  get sendTicketMessage() { return `${this.apiBase}api/ticket/message/send`; }
  get editTicketMessage() { return `${this.apiBase}api/ticket/message/edit`; }
  ticketById(id) { return `${this.apiBase}api/ticket/${id}`; }
  ticketBulkReplyById(id) { return `${this.apiBase}api/ticket/bulk-reply/${id}`; }
  ticketBulkReplyReport(id) { return `${this.apiBase}api/ticket/bulk-reply/${id}/report`; }
  ticketViewSettingsById(id) { return `${this.apiBase}api/ticket/view-settings/${id}`; }

  get broadcast() { return `${this.apiBase}api/broadcast`; }
  get sendBroadcast() { return `${this.apiBase}api/broadcast/send`; }
  get broadcastSummary() { return `${this.apiBase}api/broadcast/summary`; }
  get broadcastDraft() { return `${this.apiBase}api/broadcast/draft`; }
  get broadcastTemplate() { return `${this.apiBase}api/broadcast/template`; }

  get member() { return `${this.apiBase}api/member`; }
  get memberInvite() { return `${this.apiBase}api/member/invite`; }
  get memberInvited() { return `${this.apiBase}api/member/invited`; }
  get memberStatus() { return `${this.apiBase}api/member/status`; }
  get memberUser() { return `${this.apiBase}api/member/user`; }
  get patchMemberShift() { return `${this.apiBase}api/member/shift`; }
  get patchMemberAcceptChatOutsideWorkHours() { return `${this.apiBase}api/member/accept-chat-outside-work-hours`; }
  get patchMemberSetBulkMaxConversation() { return `${this.apiBase}api/member/set-bulk-max-conversation`; }
  memberById(id) { return `${this.apiBase}api/member/${id}`; }
  memberRoles(id) { return `${this.apiBase}api/member/${id}/roles`; }
  resendMemberInvitation(id) { return `${this.apiBase}api/member/${id}/resend-invitation`; }
  setMemberMaxConversation(id) { return `${this.apiBase}api/member/${id}/set-max-conversation`; }

  get role() { return `${this.apiBase}api/role`; }
  get shifts() { return `${this.apiBase}api/shifts`; }
  get shiftsDefault() { return `${this.apiBase}api/shifts/default`; }
  shiftsById(id) { return `${this.apiBase}api/shifts/${id}`; }

  get macros() { return `${this.apiBase}api/macros`; }
  get checkMacrosShortcutCode() { return `${this.apiBase}api/macros/check-shortcut-code`; }
  macrosById(id) { return `${this.apiBase}api/macros/${id}`; }

  get tag() { return `${this.apiBase}api/tag`; }
  archiveTag(tagId) { return `${this.apiBase}api/tag/${tagId}/archive`; }
  restoreTag(tagId) { return `${this.apiBase}api/tag/${tagId}/restore`; }
  renameTag(tagId) { return `${this.apiBase}api/tag/${tagId}/name`; }

  get contact() { return `${this.apiBase}api/client-contact`; }
  contactById(id) { return `${this.apiBase}api/client-contact/${id}`; }
  contactConversationHistory(id) { return `${this.apiBase}api/client-contact/${id}/conversation-history`; }

  get media() { return `${this.apiBase}api/media`; }
  resolveSharedMediaToken(token) { return `${this.apiBase}api/media/shared-media/${token}/resolve`; }
  getMedia(resourceName, mediaName) { return `${this.apiBase}api/media/${resourceName}/${mediaName}`; }

  get widgetSettings() { return `${this.apiBase}api/widget/settings`; }
  get widgetTopic() { return `${this.apiBase}api/widget/topic`; }
  widgetSettingsById(id) { return `${this.apiBase}api/widget/settings/${id}`; }

  get health() { return `${this.apiBase}health`; }

  get analyticsConversationByPlatform() { return `${this.apiBase}api/analytics/conversation/by-platform`; }
  get analyticsConversationDaily() { return `${this.apiBase}api/analytics/conversation/daily`; }
  get analyticsConversationRepliesByTime() { return `${this.apiBase}api/analytics/conversation/replies-by-time`; }
  get analyticsConversationReplyMetrics() { return `${this.apiBase}api/analytics/conversation/reply-metrics`; }
  get analyticsConversationScreenshotMetrics() { return `${this.apiBase}api/analytics/conversation/screenshot-metrics`; }
  get analyticsConversationTagsFrequency() { return `${this.apiBase}api/analytics/conversation/tags-frequency`; }
  get analyticsConversationTotalMetrics() { return `${this.apiBase}api/analytics/conversation/total-metrics`; }
  get analyticsMemberCsatResponses() { return `${this.apiBase}api/analytics/member/csat/responses`; }
  get analyticsMemberCsatStatistic() { return `${this.apiBase}api/analytics/member/csat/statistic`; }
  get analyticsMemberPerformance() { return `${this.apiBase}api/analytics/member/performance`; }
  get analyticsResponsivenessChart() { return `${this.apiBase}api/analytics/responsiveness/chart`; }
  get analyticsResponsivenessSlaBreakdown() { return `${this.apiBase}api/analytics/responsiveness/sla-breakdown`; }
  get analyticsResponsivenessSummary() { return `${this.apiBase}api/analytics/responsiveness/summary`; }
  get analyticsTicketAverageReply() { return `${this.apiBase}api/analytics/ticket/average-reply`; }
  get analyticsTicketCounts() { return `${this.apiBase}api/analytics/ticket/counts`; }
  get analyticsTicketFrtDistribution() { return `${this.apiBase}api/analytics/ticket/frt-distribution`; }
  get analyticsTicketPerHour() { return `${this.apiBase}api/analytics/ticket/per-hour`; }
  get analyticsTicketPerWeek() { return `${this.apiBase}api/analytics/ticket/per-week`; }
  get analyticsTicketPerformance() { return `${this.apiBase}api/analytics/ticket/performance`; }
  get analyticsTicketWaitTimeDistribution() { return `${this.apiBase}api/analytics/ticket/wait-time-distribution`; }

  get csat() { return `${this.apiBase}api/csat`; }
  get csatSettings() { return `${this.apiBase}api/csat/settings`; }
  get csatSubmit() { return `${this.apiBase}api/csat/submit`; }
  csatByConversationId(conversationId) { return `${this.apiBase}api/csat/conversation/${conversationId}`; }
  csatByTicketId(ticketId) { return `${this.apiBase}api/csat/ticket/${ticketId}`; }

  get awayReasons() { return `${this.apiBase}api/away-reasons`; }
  awayReasonsById(id) { return `${this.apiBase}api/away-reasons/${id}`; }

  get leads() { return `${this.apiBase}api/leads`; }
  get leadsCompanyNames() { return `${this.apiBase}api/leads/company-names`; }
  leadsById(id) { return `${this.apiBase}api/leads/${id}`; }
  leadsComments(leadId) { return `${this.apiBase}api/leads/${leadId}/comments`; }

  get accountGroup() { return `${this.apiBase}api/account-group`; }
  get patchAccountGroupMoveAccount() { return `${this.apiBase}api/account-group/move-account`; }
  get patchAccountGroupRemoveAccount() { return `${this.apiBase}api/account-group/remove-account`; }
  get patchAccountGroupRename() { return `${this.apiBase}api/account-group/rename`; }
  get patchAccountGroupSetMainAccount() { return `${this.apiBase}api/account-group/set-main-account`; }
  accountGroupById(id) { return `${this.apiBase}api/account-group/${id}`; }

  get notifications() { return `${this.apiBase}api/notifications`; }
  get notificationsUnreadCount() { return `${this.apiBase}api/notifications/unread-count`; }
  markNotificationRead(id) { return `${this.apiBase}api/notifications/${id}/read`; }

  get webhookWhatsappApi() { return `${this.apiBase}api/webhook/whatsapp-api`; }
  get companyWebhookTicketStatus() { return `${this.apiBase}api/company/webhook/ticket/status`; }
  get companyWebhookTicketValidateUrl() { return `${this.apiBase}api/company/webhook/ticket/validate-url`; }

  get paymentBillingCycles() { return `${this.apiBase}api/payment/billing-cycles`; }
  get paymentInfo() { return `${this.apiBase}api/payment/info`; }
  get paymentSubscriptions() { return `${this.apiBase}api/payment/subscriptions`; }
  get paymentUpcomingBill() { return `${this.apiBase}api/payment/upcoming-bill`; }
  get paymentAddonsPrices() { return `${this.apiBase}api/payment/addons/prices`; }

  get privacyPolicyContent() { return `${this.apiBase}api/privacy/policy`; }

  get shippingCredentials() { return `${this.apiBase}api/shipping-credentials`; }
  get shippingVendors() { return `${this.apiBase}api/shipping-vendors`; }
  shippingCredentialsByVendor(vendorCode) { return `${this.apiBase}api/shipping-credentials/vendor/${vendorCode}`; }
  shippingCredentialsById(id) { return `${this.apiBase}api/shipping-credentials/${id}`; }
  shippingVendorsByCode(code) { return `${this.apiBase}api/shipping-vendors/${code}`; }

  get slaSetting() { return `${this.apiBase}api/sla-setting`; }
  get stageDefaultStage() { return `${this.apiBase}api/stage/default-stage`; }

  get tracking() { return `${this.apiBase}api/tracking`; }

  get visits() { return `${this.apiBase}api/visits`; }
  visitsById(id) { return `${this.apiBase}api/visits/${id}`; }

  get wallet() { return `${this.apiBase}api/wallet`; }
  get walletQuota() { return `${this.apiBase}api/wallet/quota`; }
  get walletQuotaUsage() { return `${this.apiBase}api/wallet/quota-usage`; }
  get walletTopup() { return `${this.apiBase}api/wallet/topup`; }
  get walletTopupHistory() { return `${this.apiBase}api/wallet/topup-history`; }
  get walletTransactions() { return `${this.apiBase}api/wallet/transactions`; }

  get instagramAuthUrl() { return `${this.apiBase}api/instagram/auth-url`; }
  get instagramExchangeCode() { return `${this.apiBase}api/instagram/exchange-code`; }
  get instagramWebhook() { return `${this.apiBase}api/instagram/webhook`; }

  get messengerAuthUrl() { return `${this.apiBase}api/messenger/auth-url`; }
  get messengerExchangeCode() { return `${this.apiBase}api/messenger/exchange-code`; }
  get messengerWebhook() { return `${this.apiBase}api/messenger/webhook`; }

  get organization() { return `${this.apiBase}api/organization`; }
  organizationById(id) { return `${this.apiBase}api/organization/${id}`; }
}

const pagePaths = {
  visitConversation: '/conversation',
  visitYourInbox: '/conversation/your-inbox',
  visitUnassigned: '/conversation/unassigned',
  visitAll: '/conversation/all',
  visitStarred: '/conversation/starred',
  visitSpam: '/conversation/spam',
  visitJunk: '/conversation/junk',

  visitTicketing: '/ticketing',
  visitBroadcast: '/broadcast/messages',
  visitBroadcastTemplate: '/broadcast/template',

  visitGeneralSetting: '/settings/organization/general',
  visitRole: '/settings/organization/roles',
  visitMembers: '/settings/organization/members',
  visitShift: '/settings/organization/shift-hours',
  visitTags: '/settings/organization/tags',
  visitChangePass: '/settings/organization/change-password',

  visitTeaminbox: '/settings/inbox/team-inbox',
  visitAssignment: '/settings/inbox/assignments',
  visitMacros: '/settings/inbox/macros',
  visitTicketTypes: '/settings/inbox/tickets',
  visitSLA: '/settings/inbox/sla',

  visitWidgetSetting: '/settings/channels/widget',
  visitWhatsappwebSetting: '/settings/channels/whatsapp-web',
  visitAddons: '/settings/channels/addon',

  visitSubscription: '/settings/subscriptions/billing',
  visitWebhookSetting: '/settings/developer/webhook',
  visitTrackingSetting: '/settings/developer/shipping-credentials',

  visitStatistic: '/statistic',
  visitRegister: '/register',
  visitLogin: '/login',
};

module.exports = {
  ApiEndpoints,
  pagePaths,
};
