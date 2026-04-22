// import { cli } from "cypress";

export function env_config(baseUrl) {
  // cy.log(baseUrl);
  let base;
  if (baseUrl === "https://app.satuinbox.com") {
    base = "https://app.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://dev.satuinbox.com") {
    base = "https://dev.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://staging.satuinbox.com") {
    base = "https://staging.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://dev-v2.satuinbox.com") {
    base = "https://dev-v2-api.satuinbox.com/";
    // return base;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    base = "https://v2-api.satuinbox.com/";
    // return base;
  }
  if (
    baseUrl !== "https://app.satuinbox.com" &&
    baseUrl !== "https://dev.satuinbox.com" &&
    baseUrl !== "https://staging.satuinbox.com" &&
    baseUrl !== "https://dev-v2.satuinbox.com" &&
    baseUrl !== "https://v2.satuinbox.com"
  ) {
    throw new Error(`Unknown baseUrl: ${baseUrl}`);
  }
  return {
    //--------------OPEN API-----------------
    // getAllNomorWhatsapp: `${base}/open/account-whatsapp?limit=300`, //OPEN API
    getAllNomorWhatsapp: `${base}open-api/broadcast/team-inboxes?limit=200`, //get account channel from team inboxes for broadcast
    getAllNomorWhatsapp_active: `${base}open/account-whatsapp?statusNumberWhatsapp=active&limit=300`, //OPEN API //with active filter
    openAPI_broadcast: `${base}/open/broadcast?accountNumberWhatsapp=`,
    sendBroadcastUrl: `${base}open-api/broadcast`,
    openAPI_createTicketing: `${base}/open/ticketing`,
    openAPI_createBULKTicketing: `${base}/open/ticketing/bulk`,
    instanceInfo: `${base}/open/instance/info?key=`,
    initInstance: `${base}/open/whatsapp/init?force=true&whatsappNumber=`,
    clientContact: `${base}open-api/client-contact`,
    submitTopic: `${base}open-api/conversation/submit/topic`,
    getLicensekey: `${base}/open/license-key`, //OPEN API

    //--------------OPEN API-----------------

    //--------------API-----------------
    loginUrl: `${base}api/auth/login`,
    currentProfile: `${base}api/auth/me`,
    whatsappUrl: `${base}api/account-whatsapp?limit=9000`,
    whatsappUrl_filterJabodetabek: `${base}api/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&statusNumberWhatsapp=active&division=`, // for search active account without filtering
    whatsappUrl_filterJabodetabek2: `${base}api/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active
    whatsappUrl_filterJabodetabek3: `${base}api/account-whatsapp?page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active accountStatus=used
    sendMessageUrl: `${base}api/message/text?key=`,
    getAll_Inbox: `${base}api/inbox/`,
    createTicketing: `${base}api/ticketing`,
    instanceInfoLocal: `${base}/instance/info?key=`,
    initInstanceLocal: `${base}/whatsapp/init?force=true&whatsappNumber=`,
    getAllDivision: `${base}api/division?sortBy=name_division:asc&limit=999&populate=agents  `,
    privacyPolicy: `${base}api/privacy-policy`,
    termOfUse: `${base}api/term-of-use`,
    platform: `${base}api/platform`,
    channel: `${base}api/channel`,
    channelById: `${base}api/channel/`,
    channelInvalidValueParam: `${base}api/channel?limit=abc`,
    channelInvalidInputParam: `${base}api/channel?asdqw12abc`,
    // approveOnboarding: `${base}api/company/${companyId}/approve`,
    approveOnboarding: (companyId) => `${base}api/company/${companyId}/approve`,
    getAccountChannel: `${base}api/account-channel`,
    getAccountChannelMaxLimit: `${base}api/account-channel?limit=200&platform=whatsapp_web`,
    getAccountChannelFilterActive: `${base}api/account-channel?limit=200&connectionStatus=active`,
    getWhatsappWeb: `${base}api/account-channel`,

    // WhatsApp Web instance endpoints (Baileys) via omnichannel service
    // Note: these are newer endpoints; keep the legacy open/* endpoints above for backward compatibility.
    initInstanceV2: `${base}api/account-channel/instance`,
    getQrInstanceV2: `${base}api/account-channel/instance/qr/:id`,
    instanceInfoV2: `${base}api/account-channel/instance/:id`,
    terminateQrInstanceV2: `${base}api/account-channel/instance/terminate-qr/{id}`,

    instance: `${base}api/account-channel/instance/`,
    getTeam: `${base}api/team/`,
    conversationSocket: `${base}conversations`,
    post_api_account_channel_bulk: `${base}api/account-channel/bulk`, // POST /api/account-channel/bulk
    delete_api_account_channel_bulk_soft_delete: `${base}api/account-channel/bulk-soft-delete`, // DELETE /api/account-channel/bulk-soft-delete
    post_api_account_channel_email_instance: `${base}api/account-channel/email/instance`, // POST /api/account-channel/email/instance
    get_api_account_channel_email_instance_disconnect_id: `${base}api/account-channel/email/instance/disconnect/{id}`, // GET /api/account-channel/email/instance/disconnect/{id}
    get_api_account_channel_email_instance_stop_id: `${base}api/account-channel/email/instance/stop/{id}`, // GET /api/account-channel/email/instance/stop/{id}
    get_api_account_channel_email_instance_id: `${base}api/account-channel/email/instance/{id}`, // GET /api/account-channel/email/instance/{id}
    post_api_account_channel_email_test_connection: `${base}api/account-channel/email/test-connection`, // POST /api/account-channel/email/test-connection
    get_api_account_channel_instance_logout_id: `${base}api/account-channel/instance/logout/{id}`, // GET /api/account-channel/instance/logout/{id}
    get_api_account_channel_instance_qr_id: `${base}api/account-channel/instance/qr/{id}`, // GET /api/account-channel/instance/qr/{id}
    get_api_account_channel_instance_stop_id: `${base}api/account-channel/instance/stop/{id}`, // GET /api/account-channel/instance/stop/{id}
    get_api_account_channel_instance_id: `${base}api/account-channel/instance/{id}`, // GET /api/account-channel/instance/{id}
    patch_api_account_channel_rename_id: `${base}api/account-channel/rename/{id}`, // PATCH /api/account-channel/rename/{id}
    post_api_account_channel_restore_id: `${base}api/account-channel/restore/{id}`, // POST /api/account-channel/restore/{id}
    delete_api_account_channel_soft_delete_id: `${base}api/account-channel/soft-delete/{id}`, // DELETE /api/account-channel/soft-delete/{id}
    get_api_account_channel_summary: `${base}api/account-channel/summary`, // GET /api/account-channel/summary
    post_api_account_channel_whatsapp_api_complete_oauth: `${base}api/account-channel/whatsapp-api/complete-oauth`, // POST /api/account-channel/whatsapp-api/complete-oauth
    post_api_account_channel_whatsapp_api_handle_callback: `${base}api/account-channel/whatsapp-api/handle-callback`, // POST /api/account-channel/whatsapp-api/handle-callback
    get_api_account_channel_whatsapp_api_oauth_url: `${base}api/account-channel/whatsapp-api/oauth-url`, // GET /api/account-channel/whatsapp-api/oauth-url
    post_api_account_channel_whatsapp_api_register_oauth: `${base}api/account-channel/whatsapp-api/register-oauth`, // POST /api/account-channel/whatsapp-api/register-oauth
    post_api_account_channel_whatsapp_api_unregister_oauth: `${base}api/account-channel/whatsapp-api/unregister-oauth`, // POST /api/account-channel/whatsapp-api/unregister-oauth
    delete_api_account_channel_id: `${base}api/account-channel/{id}`, // DELETE /api/account-channel/{id}
    get_api_account_channel_id: `${base}api/account-channel/{id}`, // GET /api/account-channel/{id}
    patch_api_account_channel_id: `${base}api/account-channel/{id}`, // PATCH /api/account-channel/{id}
    get_api_account_group: `${base}api/account-group`, // GET /api/account-group
    post_api_account_group: `${base}api/account-group`, // POST /api/account-group
    patch_api_account_group_move_account: `${base}api/account-group/move-account`, // PATCH /api/account-group/move-account
    patch_api_account_group_remove_account: `${base}api/account-group/remove-account`, // PATCH /api/account-group/remove-account
    patch_api_account_group_rename: `${base}api/account-group/rename`, // PATCH /api/account-group/rename
    patch_api_account_group_set_main_account: `${base}api/account-group/set-main-account`, // PATCH /api/account-group/set-main-account
    delete_api_account_group_id: `${base}api/account-group/{id}`, // DELETE /api/account-group/{id}
    get_api_analytics_conversation_by_platform: `${base}api/analytics/conversation/by-platform`, // GET /api/analytics/conversation/by-platform
    get_api_analytics_conversation_daily: `${base}api/analytics/conversation/daily`, // GET /api/analytics/conversation/daily
    get_api_analytics_conversation_replies_by_time: `${base}api/analytics/conversation/replies-by-time`, // GET /api/analytics/conversation/replies-by-time
    get_api_analytics_conversation_reply_metrics: `${base}api/analytics/conversation/reply-metrics`, // GET /api/analytics/conversation/reply-metrics
    get_api_analytics_conversation_screenshot_metrics: `${base}api/analytics/conversation/screenshot-metrics`, // GET /api/analytics/conversation/screenshot-metrics
    get_api_analytics_conversation_tags_frequency: `${base}api/analytics/conversation/tags-frequency`, // GET /api/analytics/conversation/tags-frequency
    get_api_analytics_conversation_total_metrics: `${base}api/analytics/conversation/total-metrics`, // GET /api/analytics/conversation/total-metrics
    get_api_analytics_member_csat_responses: `${base}api/analytics/member/csat/responses`, // GET /api/analytics/member/csat/responses
    get_api_analytics_member_csat_statistic: `${base}api/analytics/member/csat/statistic`, // GET /api/analytics/member/csat/statistic
    get_api_analytics_member_performance: `${base}api/analytics/member/performance`, // GET /api/analytics/member/performance
    get_api_analytics_responsiveness_chart: `${base}api/analytics/responsiveness/chart`, // GET /api/analytics/responsiveness/chart
    get_api_analytics_responsiveness_sla_breakdown: `${base}api/analytics/responsiveness/sla-breakdown`, // GET /api/analytics/responsiveness/sla-breakdown
    get_api_analytics_responsiveness_summary: `${base}api/analytics/responsiveness/summary`, // GET /api/analytics/responsiveness/summary
    get_api_analytics_ticket_average_reply: `${base}api/analytics/ticket/average-reply`, // GET /api/analytics/ticket/average-reply
    get_api_analytics_ticket_counts: `${base}api/analytics/ticket/counts`, // GET /api/analytics/ticket/counts
    get_api_analytics_ticket_frt_distribution: `${base}api/analytics/ticket/frt-distribution`, // GET /api/analytics/ticket/frt-distribution
    get_api_analytics_ticket_per_hour: `${base}api/analytics/ticket/per-hour`, // GET /api/analytics/ticket/per-hour
    get_api_analytics_ticket_per_week: `${base}api/analytics/ticket/per-week`, // GET /api/analytics/ticket/per-week
    get_api_analytics_ticket_performance: `${base}api/analytics/ticket/performance`, // GET /api/analytics/ticket/performance
    get_api_analytics_ticket_wait_time_distribution: `${base}api/analytics/ticket/wait-time-distribution`, // GET /api/analytics/ticket/wait-time-distribution
    post_api_auth_change_password: `${base}api/auth/change-password`, // POST /api/auth/change-password
    post_api_auth_generate_api_key: `${base}api/auth/generate-api-key`, // POST /api/auth/generate-api-key
    get_api_auth_get_api_key: `${base}api/auth/get-api-key`, // GET /api/auth/get-api-key
    post_api_auth_logout: `${base}api/auth/logout`, // POST /api/auth/logout
    post_api_auth_member_id_generate_member_password: `${base}api/auth/member/{id}/generate-member-password`, // POST /api/auth/member/{id}/generate-member-password
    post_api_auth_refresh_token: `${base}api/auth/refresh-token`, // POST /api/auth/refresh-token
    post_api_auth_register: `${base}api/auth/register`, // POST /api/auth/register
    post_api_auth_reset_password: `${base}api/auth/reset-password`, // POST /api/auth/reset-password
    post_api_auth_send_email_verification: `${base}api/auth/send-email-verification`, // POST /api/auth/send-email-verification
    post_api_auth_send_link_reset_password: `${base}api/auth/send-link-reset-password`, // POST /api/auth/send-link-reset-password
    get_api_auth_user_info: `${base}api/auth/user-info`, // GET /api/auth/user-info
    post_api_auth_validate_email: `${base}api/auth/validate-email`, // POST /api/auth/validate-email
    post_api_auth_validate_member: `${base}api/auth/validate-member`, // POST /api/auth/validate-member
    post_api_auth_validate_reset_token: `${base}api/auth/validate-reset-token`, // POST /api/auth/validate-reset-token
    get_api_away_reasons: `${base}api/away-reasons`, // GET /api/away-reasons
    post_api_away_reasons: `${base}api/away-reasons`, // POST /api/away-reasons
    delete_api_away_reasons_id: `${base}api/away-reasons/{id}`, // DELETE /api/away-reasons/{id}
    get_api_away_reasons_id: `${base}api/away-reasons/{id}`, // GET /api/away-reasons/{id}
    put_api_away_reasons_id: `${base}api/away-reasons/{id}`, // PUT /api/away-reasons/{id}
    get_api_broadcast: `${base}api/broadcast`, // GET /api/broadcast
    post_api_broadcast: `${base}api/broadcast`, // POST /api/broadcast
    get_api_broadcast_draft: `${base}api/broadcast/draft`, // GET /api/broadcast/draft
    post_api_broadcast_draft: `${base}api/broadcast/draft`, // POST /api/broadcast/draft
    delete_api_broadcast_draft_id: `${base}api/broadcast/draft/{id}`, // DELETE /api/broadcast/draft/{id}
    get_api_broadcast_draft_id: `${base}api/broadcast/draft/{id}`, // GET /api/broadcast/draft/{id}
    patch_api_broadcast_draft_id: `${base}api/broadcast/draft/{id}`, // PATCH /api/broadcast/draft/{id}
    post_api_broadcast_draft_id_convert: `${base}api/broadcast/draft/{id}/convert`, // POST /api/broadcast/draft/{id}/convert
    post_api_broadcast_send: `${base}api/broadcast/send`, // POST /api/broadcast/send
    get_api_broadcast_summary: `${base}api/broadcast/summary`, // GET /api/broadcast/summary
    get_api_broadcast_template: `${base}api/broadcast/template`, // GET /api/broadcast/template
    post_api_broadcast_template: `${base}api/broadcast/template`, // POST /api/broadcast/template
    delete_api_broadcast_template_id: `${base}api/broadcast/template/{id}`, // DELETE /api/broadcast/template/{id}
    get_api_broadcast_template_id: `${base}api/broadcast/template/{id}`, // GET /api/broadcast/template/{id}
    patch_api_broadcast_template_id: `${base}api/broadcast/template/{id}`, // PATCH /api/broadcast/template/{id}
    get_api_broadcast_template_id_approval_status: `${base}api/broadcast/template/{id}/approval/{status}`, // GET /api/broadcast/template/{id}/approval/{status}
    get_api_channel_code_platform: `${base}api/channel/code/{platform}`, // GET /api/channel/code/{platform}
    post_api_channel_restore_id: `${base}api/channel/restore/{id}`, // POST /api/channel/restore/{id}
    delete_api_channel_soft_delete_id: `${base}api/channel/soft-delete/{id}`, // DELETE /api/channel/soft-delete/{id}
    delete_api_channel_id: `${base}api/channel/{id}`, // DELETE /api/channel/{id}
    get_api_channel_id: `${base}api/channel/{id}`, // GET /api/channel/{id}
    patch_api_channel_id: `${base}api/channel/{id}`, // PATCH /api/channel/{id}
    get_api_client_contact: `${base}api/client-contact`, // GET /api/client-contact
    post_api_client_contact: `${base}api/client-contact`, // POST /api/client-contact
    get_api_client_contact_id: `${base}api/client-contact/{id}`, // GET /api/client-contact/{id}
    patch_api_client_contact_id: `${base}api/client-contact/{id}`, // PATCH /api/client-contact/{id}
    get_api_client_contact_id_conversation_history: `${base}api/client-contact/{id}/conversation-history`, // GET /api/client-contact/{id}/conversation-history
    get_api_company_csat_config: `${base}api/company/csat/config`, // GET /api/company/csat/config
    post_api_company_csat_config: `${base}api/company/csat/config`, // POST /api/company/csat/config
    post_api_company_register: `${base}api/company/register`, // POST /api/company/register
    patch_api_company_webhook_ticket_status: `${base}api/company/webhook/ticket/status`, // PATCH /api/company/webhook/ticket/status
    post_api_company_webhook_ticket_validate_url: `${base}api/company/webhook/ticket/validate-url`, // POST /api/company/webhook/ticket/validate-url
    post_api_company_id_approve: `${base}api/company/{id}/approve`, // POST /api/company/{id}/approve
    post_api_company_id_reject: `${base}api/company/{id}/reject`, // POST /api/company/{id}/reject
    get_api_conversation: `${base}api/conversation`, // GET /api/conversation
    post_api_conversation: `${base}api/conversation`, // POST /api/conversation
    get_api_conversation_note: `${base}api/conversation-note`, // GET /api/conversation-note
    post_api_conversation_note: `${base}api/conversation-note`, // POST /api/conversation-note
    post_api_conversation_note_pin_id: `${base}api/conversation-note/pin/{id}`, // POST /api/conversation-note/pin/{id}
    delete_api_conversation_note_soft_delete_id: `${base}api/conversation-note/soft-delete/{id}`, // DELETE /api/conversation-note/soft-delete/{id}
    delete_api_conversation_note_id: `${base}api/conversation-note/{id}`, // DELETE /api/conversation-note/{id}
    get_api_conversation_note_id: `${base}api/conversation-note/{id}`, // GET /api/conversation-note/{id}
    patch_api_conversation_note_id: `${base}api/conversation-note/{id}`, // PATCH /api/conversation-note/{id}
    get_api_conversation_sla_metrics_conversationId: `${base}api/conversation-sla-metrics/{conversationId}`, // GET /api/conversation-sla-metrics/{conversationId}
    get_api_conversation_active_conversation_count: `${base}api/conversation/active-conversation-count`, // GET /api/conversation/active-conversation-count
    get_api_conversation_available_slot: `${base}api/conversation/available-slot`, // GET /api/conversation/available-slot
    patch_api_conversation_bulk_assign: `${base}api/conversation/bulk/assign`, // PATCH /api/conversation/bulk/assign
    patch_api_conversation_bulk_close: `${base}api/conversation/bulk/close`, // PATCH /api/conversation/bulk/close
    patch_api_conversation_bulk_junked: `${base}api/conversation/bulk/junked`, // PATCH /api/conversation/bulk/junked
    patch_api_conversation_bulk_pin: `${base}api/conversation/bulk/pin`, // PATCH /api/conversation/bulk/pin
    patch_api_conversation_bulk_read: `${base}api/conversation/bulk/read`, // PATCH /api/conversation/bulk/read
    patch_api_conversation_bulk_reopen: `${base}api/conversation/bulk/reopen`, // PATCH /api/conversation/bulk/reopen
    patch_api_conversation_bulk_spam: `${base}api/conversation/bulk/spam`, // PATCH /api/conversation/bulk/spam
    patch_api_conversation_bulk_star: `${base}api/conversation/bulk/star`, // PATCH /api/conversation/bulk/star
    get_api_conversation_count: `${base}api/conversation/count`, // GET /api/conversation/count
    get_api_conversation_filter_count: `${base}api/conversation/filter-count`, // GET /api/conversation/filter-count
    get_api_conversation_group: `${base}api/conversation/group`, // GET /api/conversation/group
    get_api_conversation_history: `${base}api/conversation/history`, // GET /api/conversation/history
    get_api_conversation_history_id_messages: `${base}api/conversation/history/{id}/messages`, // GET /api/conversation/history/{id}/messages
    post_api_conversation_message_retry: `${base}api/conversation/message/retry`, // POST /api/conversation/message/retry
    delete_api_conversation_messages_bulk: `${base}api/conversation/messages/bulk`, // DELETE /api/conversation/messages/bulk
    get_api_conversation_participants: `${base}api/conversation/participants`, // GET /api/conversation/participants
    get_api_conversation_pull: `${base}api/conversation/pull`, // GET /api/conversation/pull
    get_api_conversation_screenshot: `${base}api/conversation/screenshot`, // GET /api/conversation/screenshot
    post_api_conversation_screenshot: `${base}api/conversation/screenshot`, // POST /api/conversation/screenshot
    get_api_conversation_screenshot_send_webhook: `${base}api/conversation/screenshot/send-webhook`, // GET /api/conversation/screenshot/send-webhook
    post_api_conversation_screenshot_send_webhook: `${base}api/conversation/screenshot/send-webhook`, // POST /api/conversation/screenshot/send-webhook
    get_api_conversation_screenshot_setting: `${base}api/conversation/screenshot/setting`, // GET /api/conversation/screenshot/setting
    patch_api_conversation_screenshot_setting: `${base}api/conversation/screenshot/setting`, // PATCH /api/conversation/screenshot/setting
    delete_api_conversation_screenshot_soft_delete_id: `${base}api/conversation/screenshot/soft-delete/{id}`, // DELETE /api/conversation/screenshot/soft-delete/{id}
    get_api_conversation_screenshot_variable: `${base}api/conversation/screenshot/variable`, // GET /api/conversation/screenshot/variable
    post_api_conversation_screenshot_variable: `${base}api/conversation/screenshot/variable`, // POST /api/conversation/screenshot/variable
    delete_api_conversation_screenshot_variable_id: `${base}api/conversation/screenshot/variable/{id}`, // DELETE /api/conversation/screenshot/variable/{id}
    get_api_conversation_screenshot_variable_id: `${base}api/conversation/screenshot/variable/{id}`, // GET /api/conversation/screenshot/variable/{id}
    patch_api_conversation_screenshot_variable_id: `${base}api/conversation/screenshot/variable/{id}`, // PATCH /api/conversation/screenshot/variable/{id}
    delete_api_conversation_screenshot_id: `${base}api/conversation/screenshot/{id}`, // DELETE /api/conversation/screenshot/{id}
    post_api_conversation_send: `${base}api/conversation/send`, // POST /api/conversation/send
    get_api_conversation_session_detail_field_history: `${base}api/conversation/session-detail/field-history`, // GET /api/conversation/session-detail/field-history
    get_api_conversation_tags: `${base}api/conversation/tags`, // GET /api/conversation/tags
    delete_api_conversation_id: `${base}api/conversation/{id}`, // DELETE /api/conversation/{id}
    get_api_conversation_id: `${base}api/conversation/{id}`, // GET /api/conversation/{id}
    patch_api_conversation_id: `${base}api/conversation/{id}`, // PATCH /api/conversation/{id}
    patch_api_conversation_id_assign: `${base}api/conversation/{id}/assign`, // PATCH /api/conversation/{id}/assign
    patch_api_conversation_id_close: `${base}api/conversation/{id}/close`, // PATCH /api/conversation/{id}/close
    patch_api_conversation_id_junked: `${base}api/conversation/{id}/junked`, // PATCH /api/conversation/{id}/junked
    patch_api_conversation_id_message_pin: `${base}api/conversation/{id}/message/pin`, // PATCH /api/conversation/{id}/message/pin
    delete_api_conversation_id_message_messageId: `${base}api/conversation/{id}/message/{messageId}`, // DELETE /api/conversation/{id}/message/{messageId}
    patch_api_conversation_id_message_messageId_edit: `${base}api/conversation/{id}/message/{messageId}/edit`, // PATCH /api/conversation/{id}/message/{messageId}/edit
    get_api_conversation_id_messages: `${base}api/conversation/{id}/messages`, // GET /api/conversation/{id}/messages
    patch_api_conversation_id_pin: `${base}api/conversation/{id}/pin`, // PATCH /api/conversation/{id}/pin
    patch_api_conversation_id_read: `${base}api/conversation/{id}/read`, // PATCH /api/conversation/{id}/read
    patch_api_conversation_id_remove_tags: `${base}api/conversation/{id}/remove-tags`, // PATCH /api/conversation/{id}/remove-tags
    patch_api_conversation_id_reopen: `${base}api/conversation/{id}/reopen`, // PATCH /api/conversation/{id}/reopen
    post_api_conversation_id_session_detail_collections: `${base}api/conversation/{id}/session-detail/collections`, // POST /api/conversation/{id}/session-detail/collections
    delete_api_conversation_id_session_detail_collections_collectionId: `${base}api/conversation/{id}/session-detail/collections/{collectionId}`, // DELETE /api/conversation/{id}/session-detail/collections/{collectionId}
    patch_api_conversation_id_session_detail_collections_collectionId: `${base}api/conversation/{id}/session-detail/collections/{collectionId}`, // PATCH /api/conversation/{id}/session-detail/collections/{collectionId}
    delete_api_conversation_id_session_detail_collections_collectionId_fields: `${base}api/conversation/{id}/session-detail/collections/{collectionId}/fields`, // DELETE /api/conversation/{id}/session-detail/collections/{collectionId}/fields
    patch_api_conversation_id_session_detail_collections_collectionId_fields: `${base}api/conversation/{id}/session-detail/collections/{collectionId}/fields`, // PATCH /api/conversation/{id}/session-detail/collections/{collectionId}/fields
    post_api_conversation_id_session_detail_collections_collectionId_fields: `${base}api/conversation/{id}/session-detail/collections/{collectionId}/fields`, // POST /api/conversation/{id}/session-detail/collections/{collectionId}/fields
    patch_api_conversation_id_spam: `${base}api/conversation/{id}/spam`, // PATCH /api/conversation/{id}/spam
    patch_api_conversation_id_star: `${base}api/conversation/{id}/star`, // PATCH /api/conversation/{id}/star
    patch_api_conversation_id_tags: `${base}api/conversation/{id}/tags`, // PATCH /api/conversation/{id}/tags
    patch_api_conversation_id_unassign: `${base}api/conversation/{id}/unassign`, // PATCH /api/conversation/{id}/unassign
    delete_api_conversations_message_utilities_id: `${base}api/conversations/message-utilities/{id}`, // DELETE /api/conversations/message-utilities/{id}
    get_api_conversations_id_message_utilities: `${base}api/conversations/{id}/message-utilities`, // GET /api/conversations/{id}/message-utilities
    post_api_conversations_id_message_utilities: `${base}api/conversations/{id}/message-utilities`, // POST /api/conversations/{id}/message-utilities
    get_api_conversations_id_message_utilities_timestamp_range: `${base}api/conversations/{id}/message-utilities/timestamp-range`, // GET /api/conversations/{id}/message-utilities/timestamp-range
    post_api_csat: `${base}api/csat`, // POST /api/csat
    get_api_csat_conversation_conversationId: `${base}api/csat/conversation/{conversationId}`, // GET /api/csat/conversation/{conversationId}
    get_api_csat_settings: `${base}api/csat/settings`, // GET /api/csat/settings
    post_api_csat_submit: `${base}api/csat/submit`, // POST /api/csat/submit
    get_api_csat_ticket_ticketId: `${base}api/csat/ticket/{ticketId}`, // GET /api/csat/ticket/{ticketId}
    get_api_instagram_auth_url: `${base}api/instagram/auth-url`, // GET /api/instagram/auth-url
    post_api_instagram_exchange_code: `${base}api/instagram/exchange-code`, // POST /api/instagram/exchange-code
    post_api_instagram_request_delete: `${base}api/instagram/request-delete`, // POST /api/instagram/request-delete
    get_api_instagram_webhook: `${base}api/instagram/webhook`, // GET /api/instagram/webhook
    post_api_instagram_webhook: `${base}api/instagram/webhook`, // POST /api/instagram/webhook
    delete_api_instagram_id: `${base}api/instagram/{id}`, // DELETE /api/instagram/{id}
    get_api_leads: `${base}api/leads`, // GET /api/leads
    post_api_leads: `${base}api/leads`, // POST /api/leads
    get_api_leads_company_names: `${base}api/leads/company-names`, // GET /api/leads/company-names
    delete_api_leads_id: `${base}api/leads/{id}`, // DELETE /api/leads/{id}
    get_api_leads_id: `${base}api/leads/{id}`, // GET /api/leads/{id}
    patch_api_leads_id: `${base}api/leads/{id}`, // PATCH /api/leads/{id}
    patch_api_leads_id_team_inbox: `${base}api/leads/{id}/team-inbox`, // PATCH /api/leads/{id}/team-inbox
    get_api_leads_leadId_comments: `${base}api/leads/{leadId}/comments`, // GET /api/leads/{leadId}/comments
    post_api_leads_leadId_comments: `${base}api/leads/{leadId}/comments`, // POST /api/leads/{leadId}/comments
    get_api_macros: `${base}api/macros`, // GET /api/macros
    post_api_macros: `${base}api/macros`, // POST /api/macros
    post_api_macros_check_shortcut_code: `${base}api/macros/check-shortcut-code`, // POST /api/macros/check-shortcut-code
    delete_api_macros_id: `${base}api/macros/{id}`, // DELETE /api/macros/{id}
    get_api_macros_id: `${base}api/macros/{id}`, // GET /api/macros/{id}
    put_api_macros_id: `${base}api/macros/{id}`, // PUT /api/macros/{id}
    delete_api_media: `${base}api/media`, // DELETE /api/media
    post_api_media: `${base}api/media`, // POST /api/media
    delete_api_media_shared_media_token: `${base}api/media/shared-media/{token}`, // DELETE /api/media/shared-media/{token}
    get_api_media_shared_media_token_resolve: `${base}api/media/shared-media/{token}/resolve`, // GET /api/media/shared-media/{token}/resolve
    get_api_media_resourceName_mediaName: `${base}api/media/{resourceName}/{mediaName}`, // GET /api/media/{resourceName}/{mediaName}
    get_api_member: `${base}api/member`, // GET /api/member
    patch_api_member_accept_chat_outside_work_hours: `${base}api/member/accept-chat-outside-work-hours`, // PATCH /api/member/accept-chat-outside-work-hours
    post_api_member_invite: `${base}api/member/invite`, // POST /api/member/invite
    get_api_member_invited: `${base}api/member/invited`, // GET /api/member/invited
    patch_api_member_set_bulk_max_conversation: `${base}api/member/set-bulk-max-conversation`, // PATCH /api/member/set-bulk-max-conversation
    patch_api_member_shift: `${base}api/member/shift`, // PATCH /api/member/shift
    get_api_member_status: `${base}api/member/status`, // GET /api/member/status
    patch_api_member_status: `${base}api/member/status`, // PATCH /api/member/status
    get_api_member_user: `${base}api/member/user`, // GET /api/member/user
    delete_api_member_id: `${base}api/member/{id}`, // DELETE /api/member/{id}
    get_api_member_id: `${base}api/member/{id}`, // GET /api/member/{id}
    post_api_member_id_resend_invitation: `${base}api/member/{id}/resend-invitation`, // POST /api/member/{id}/resend-invitation
    patch_api_member_id_roles: `${base}api/member/{id}/roles`, // PATCH /api/member/{id}/roles
    patch_api_member_id_set_max_conversation: `${base}api/member/{id}/set-max-conversation`, // PATCH /api/member/{id}/set-max-conversation
    get_api_messenger_auth_url: `${base}api/messenger/auth-url`, // GET /api/messenger/auth-url
    post_api_messenger_exchange_code: `${base}api/messenger/exchange-code`, // POST /api/messenger/exchange-code
    post_api_messenger_request_delete: `${base}api/messenger/request-delete`, // POST /api/messenger/request-delete
    get_api_messenger_webhook: `${base}api/messenger/webhook`, // GET /api/messenger/webhook
    post_api_messenger_webhook: `${base}api/messenger/webhook`, // POST /api/messenger/webhook
    delete_api_messenger_id: `${base}api/messenger/{id}`, // DELETE /api/messenger/{id}
    get_api_notifications: `${base}api/notifications`, // GET /api/notifications
    get_api_notifications_unread_count: `${base}api/notifications/unread-count`, // GET /api/notifications/unread-count
    patch_api_notifications_id_read: `${base}api/notifications/{id}/read`, // PATCH /api/notifications/{id}/read
    get_api_organization_id: `${base}api/organization/{id}`, // GET /api/organization/{id}
    patch_api_organization_id: `${base}api/organization/{id}`, // PATCH /api/organization/{id}
    post_api_payment_webhook_webhook_bills: `${base}api/payment-webhook/webhook-bills`, // POST /api/payment-webhook/webhook-bills
    post_api_payment_addons_activate: `${base}api/payment/addons/activate`, // POST /api/payment/addons/activate
    post_api_payment_addons_connect_account: `${base}api/payment/addons/connect-account`, // POST /api/payment/addons/connect-account
    post_api_payment_addons_deactivate: `${base}api/payment/addons/deactivate`, // POST /api/payment/addons/deactivate
    post_api_payment_addons_disconnect_account: `${base}api/payment/addons/disconnect-account`, // POST /api/payment/addons/disconnect-account
    get_api_payment_addons_prices: `${base}api/payment/addons/prices`, // GET /api/payment/addons/prices
    get_api_payment_billing_cycles: `${base}api/payment/billing-cycles`, // GET /api/payment/billing-cycles
    post_api_payment_billing_cycles_run: `${base}api/payment/billing-cycles/run`, // POST /api/payment/billing-cycles/run
    get_api_payment_billing_cycles_id: `${base}api/payment/billing-cycles/{id}`, // GET /api/payment/billing-cycles/{id}
    get_api_payment_info: `${base}api/payment/info`, // GET /api/payment/info
    post_api_payment_payment_bills_request: `${base}api/payment/payment-bills/request`, // POST /api/payment/payment-bills/request
    get_api_payment_subscriptions: `${base}api/payment/subscriptions`, // GET /api/payment/subscriptions
    post_api_payment_subscriptions: `${base}api/payment/subscriptions`, // POST /api/payment/subscriptions
    post_api_payment_subscriptions_calculate_proration: `${base}api/payment/subscriptions/calculate-proration`, // POST /api/payment/subscriptions/calculate-proration
    post_api_payment_subscriptions_cancel: `${base}api/payment/subscriptions/cancel`, // POST /api/payment/subscriptions/cancel
    post_api_payment_subscriptions_manual_expire: `${base}api/payment/subscriptions/manual-expire`, // POST /api/payment/subscriptions/manual-expire
    get_api_payment_subscriptions_packages: `${base}api/payment/subscriptions/packages`, // GET /api/payment/subscriptions/packages
    get_api_payment_upcoming_bill: `${base}api/payment/upcoming-bill`, // GET /api/payment/upcoming-bill
    post_api_payment_vouchers_validate: `${base}api/payment/vouchers/validate`, // POST /api/payment/vouchers/validate
    delete_api_platform_id: `${base}api/platform/{id}`, // DELETE /api/platform/{id}
    get_api_platform_id: `${base}api/platform/{id}`, // GET /api/platform/{id}
    patch_api_platform_id: `${base}api/platform/{id}`, // PATCH /api/platform/{id}
    get_api_privacy_policy: `${base}api/privacy/policy`, // GET /api/privacy/policy
    put_api_privacy_policy: `${base}api/privacy/policy`, // PUT /api/privacy/policy
    get_api_role: `${base}api/role`, // GET /api/role
    get_api_shifts: `${base}api/shifts`, // GET /api/shifts
    post_api_shifts: `${base}api/shifts`, // POST /api/shifts
    get_api_shifts_default: `${base}api/shifts/default`, // GET /api/shifts/default
    delete_api_shifts_id: `${base}api/shifts/{id}`, // DELETE /api/shifts/{id}
    get_api_shifts_id: `${base}api/shifts/{id}`, // GET /api/shifts/{id}
    put_api_shifts_id: `${base}api/shifts/{id}`, // PUT /api/shifts/{id}
    get_api_shipping_credentials: `${base}api/shipping-credentials`, // GET /api/shipping-credentials
    post_api_shipping_credentials: `${base}api/shipping-credentials`, // POST /api/shipping-credentials
    get_api_shipping_credentials_vendor_vendorCode: `${base}api/shipping-credentials/vendor/{vendorCode}`, // GET /api/shipping-credentials/vendor/{vendorCode}
    delete_api_shipping_credentials_id: `${base}api/shipping-credentials/{id}`, // DELETE /api/shipping-credentials/{id}
    get_api_shipping_credentials_id: `${base}api/shipping-credentials/{id}`, // GET /api/shipping-credentials/{id}
    put_api_shipping_credentials_id: `${base}api/shipping-credentials/{id}`, // PUT /api/shipping-credentials/{id}
    get_api_shipping_vendors: `${base}api/shipping-vendors`, // GET /api/shipping-vendors
    post_api_shipping_vendors: `${base}api/shipping-vendors`, // POST /api/shipping-vendors
    delete_api_shipping_vendors_code: `${base}api/shipping-vendors/{code}`, // DELETE /api/shipping-vendors/{code}
    get_api_shipping_vendors_code: `${base}api/shipping-vendors/{code}`, // GET /api/shipping-vendors/{code}
    put_api_shipping_vendors_code: `${base}api/shipping-vendors/{code}`, // PUT /api/shipping-vendors/{code}
    get_api_sla_setting: `${base}api/sla-setting`, // GET /api/sla-setting
    put_api_sla_setting: `${base}api/sla-setting`, // PUT /api/sla-setting
    get_api_stage_default_stage: `${base}api/stage/default-stage`, // GET /api/stage/default-stage
    get_api_tag: `${base}api/tag`, // GET /api/tag
    post_api_tag: `${base}api/tag`, // POST /api/tag
    delete_api_tag_tagId: `${base}api/tag/{tagId}`, // DELETE /api/tag/{tagId}
    put_api_tag_tagId_archive: `${base}api/tag/{tagId}/archive`, // PUT /api/tag/{tagId}/archive
    put_api_tag_tagId_name: `${base}api/tag/{tagId}/name`, // PUT /api/tag/{tagId}/name
    put_api_tag_tagId_restore: `${base}api/tag/{tagId}/restore`, // PUT /api/tag/{tagId}/restore
    get_api_team: `${base}api/team`, // GET /api/team
    post_api_team: `${base}api/team`, // POST /api/team
    patch_api_team_archive_id: `${base}api/team/archive/{id}`, // PATCH /api/team/archive/{id}
    get_api_team_id: `${base}api/team/{id}`, // GET /api/team/{id}
    patch_api_team_id: `${base}api/team/{id}`, // PATCH /api/team/{id}
    post_api_team_id_sync_conversations: `${base}api/team/{id}/sync-conversations`, // POST /api/team/{id}/sync-conversations
    get_api_ticket: `${base}api/ticket`, // GET /api/ticket
    post_api_ticket: `${base}api/ticket`, // POST /api/ticket
    get_api_ticket_type: `${base}api/ticket-type`, // GET /api/ticket-type
    post_api_ticket_type: `${base}api/ticket-type`, // POST /api/ticket-type
    delete_api_ticket_type_id: `${base}api/ticket-type/{id}`, // DELETE /api/ticket-type/{id}
    get_api_ticket_type_id: `${base}api/ticket-type/{id}`, // GET /api/ticket-type/{id}
    patch_api_ticket_type_id: `${base}api/ticket-type/{id}`, // PATCH /api/ticket-type/{id}
    patch_api_ticket_type_id_archive: `${base}api/ticket-type/{id}/archive`, // PATCH /api/ticket-type/{id}/archive
    get_api_ticket_bulk_reply: `${base}api/ticket/bulk-reply`, // GET /api/ticket/bulk-reply
    post_api_ticket_bulk_reply: `${base}api/ticket/bulk-reply`, // POST /api/ticket/bulk-reply
    get_api_ticket_bulk_reply_identifier_fields: `${base}api/ticket/bulk-reply/identifier-fields`, // GET /api/ticket/bulk-reply/identifier-fields
    post_api_ticket_bulk_reply_template: `${base}api/ticket/bulk-reply/template`, // POST /api/ticket/bulk-reply/template
    get_api_ticket_bulk_reply_ticket_types: `${base}api/ticket/bulk-reply/ticket-types`, // GET /api/ticket/bulk-reply/ticket-types
    delete_api_ticket_bulk_reply_id: `${base}api/ticket/bulk-reply/{id}`, // DELETE /api/ticket/bulk-reply/{id}
    get_api_ticket_bulk_reply_id: `${base}api/ticket/bulk-reply/{id}`, // GET /api/ticket/bulk-reply/{id}
    get_api_ticket_bulk_reply_id_report: `${base}api/ticket/bulk-reply/{id}/report`, // GET /api/ticket/bulk-reply/{id}/report
    get_api_ticket_bulk_reply_id_rows: `${base}api/ticket/bulk-reply/{id}/rows`, // GET /api/ticket/bulk-reply/{id}/rows
    post_api_ticket_bulk_resolve: `${base}api/ticket/bulk/resolve`, // POST /api/ticket/bulk/resolve
    post_api_ticket_bulk_snooze: `${base}api/ticket/bulk/snooze`, // POST /api/ticket/bulk/snooze
    delete_api_ticket_bulk_tags: `${base}api/ticket/bulk/tags`, // DELETE /api/ticket/bulk/tags
    post_api_ticket_bulk_tags: `${base}api/ticket/bulk/tags`, // POST /api/ticket/bulk/tags
    post_api_ticket_bulk_unsnooze: `${base}api/ticket/bulk/unsnooze`, // POST /api/ticket/bulk/unsnooze
    get_api_ticket_export: `${base}api/ticket/export`, // GET /api/ticket/export
    get_api_ticket_kpi: `${base}api/ticket/kpi`, // GET /api/ticket/kpi
    patch_api_ticket_message_edit: `${base}api/ticket/message/edit`, // PATCH /api/ticket/message/edit
    post_api_ticket_message_send: `${base}api/ticket/message/send`, // POST /api/ticket/message/send
    get_api_ticket_view_settings: `${base}api/ticket/view-settings`, // GET /api/ticket/view-settings
    patch_api_ticket_view_settings_id: `${base}api/ticket/view-settings/{id}`, // PATCH /api/ticket/view-settings/{id}
    patch_api_ticket_view_settings_id_tab: `${base}api/ticket/view-settings/{id}/tab`, // PATCH /api/ticket/view-settings/{id}/tab
    delete_api_ticket_id: `${base}api/ticket/{id}`, // DELETE /api/ticket/{id}
    get_api_ticket_id: `${base}api/ticket/{id}`, // GET /api/ticket/{id}
    patch_api_ticket_id: `${base}api/ticket/{id}`, // PATCH /api/ticket/{id}
    patch_api_ticket_id_custom_attributes: `${base}api/ticket/{id}/custom-attributes`, // PATCH /api/ticket/{id}/custom-attributes
    get_api_ticket_id_media: `${base}api/ticket/{id}/media`, // GET /api/ticket/{id}/media
    delete_api_ticket_id_members: `${base}api/ticket/{id}/members`, // DELETE /api/ticket/{id}/members
    patch_api_ticket_id_members: `${base}api/ticket/{id}/members`, // PATCH /api/ticket/{id}/members
    delete_api_ticket_id_message_messageId: `${base}api/ticket/{id}/message/{messageId}`, // DELETE /api/ticket/{id}/message/{messageId}
    get_api_ticket_id_messages: `${base}api/ticket/{id}/messages`, // GET /api/ticket/{id}/messages
    patch_api_ticket_id_reminder: `${base}api/ticket/{id}/reminder`, // PATCH /api/ticket/{id}/reminder
    patch_api_ticket_id_remove_tags: `${base}api/ticket/{id}/remove-tags`, // PATCH /api/ticket/{id}/remove-tags
    delete_api_ticket_id_snooze: `${base}api/ticket/{id}/snooze`, // DELETE /api/ticket/{id}/snooze
    patch_api_ticket_id_snooze: `${base}api/ticket/{id}/snooze`, // PATCH /api/ticket/{id}/snooze
    put_api_ticket_id_stage: `${base}api/ticket/{id}/stage`, // PUT /api/ticket/{id}/stage
    patch_api_ticket_id_status: `${base}api/ticket/{id}/status`, // PATCH /api/ticket/{id}/status
    patch_api_ticket_id_tags: `${base}api/ticket/{id}/tags`, // PATCH /api/ticket/{id}/tags
    patch_api_ticket_id_team: `${base}api/ticket/{id}/team`, // PATCH /api/ticket/{id}/team
    get_api_tracking: `${base}api/tracking`, // GET /api/tracking
    get_api_visits: `${base}api/visits`, // GET /api/visits
    post_api_visits: `${base}api/visits`, // POST /api/visits
    get_api_visits_id: `${base}api/visits/{id}`, // GET /api/visits/{id}
    patch_api_visits_id_approve: `${base}api/visits/{id}/approve`, // PATCH /api/visits/{id}/approve
    post_api_visits_id_check_in: `${base}api/visits/{id}/check-in`, // POST /api/visits/{id}/check-in
    patch_api_visits_id_reject: `${base}api/visits/{id}/reject`, // PATCH /api/visits/{id}/reject
    get_api_wallet: `${base}api/wallet`, // GET /api/wallet
    get_api_wallet_quota: `${base}api/wallet/quota`, // GET /api/wallet/quota
    get_api_wallet_quota_usage: `${base}api/wallet/quota-usage`, // GET /api/wallet/quota-usage
    post_api_wallet_topup: `${base}api/wallet/topup`, // POST /api/wallet/topup
    get_api_wallet_topup_history: `${base}api/wallet/topup-history`, // GET /api/wallet/topup-history
    get_api_wallet_transactions: `${base}api/wallet/transactions`, // GET /api/wallet/transactions
    get_api_webhook_whatsapp_api: `${base}api/webhook/whatsapp-api`, // GET /api/webhook/whatsapp-api
    post_api_webhook_whatsapp_api: `${base}api/webhook/whatsapp-api`, // POST /api/webhook/whatsapp-api
    get_api_webhook_whatsapp_api_id: `${base}api/webhook/whatsapp-api/{id}`, // GET /api/webhook/whatsapp-api/{id}
    post_api_webhook_whatsapp_api_id: `${base}api/webhook/whatsapp-api/{id}`, // POST /api/webhook/whatsapp-api/{id}
    get_api_widget_settings: `${base}api/widget/settings`, // GET /api/widget/settings
    patch_api_widget_settings_id: `${base}api/widget/settings/{id}`, // PATCH /api/widget/settings/{id}
    get_api_widget_topic: `${base}api/widget/topic`, // GET /api/widget/topic
    post_api_widget_topic: `${base}api/widget/topic`, // POST /api/widget/topic
    delete_api_widget_topic_bulk_soft_delete: `${base}api/widget/topic/bulk-soft-delete`, // DELETE /api/widget/topic/bulk-soft-delete
    delete_api_widget_topic_soft_delete_id: `${base}api/widget/topic/soft-delete/{id}`, // DELETE /api/widget/topic/soft-delete/{id}
    delete_api_widget_topic_id: `${base}api/widget/topic/{id}`, // DELETE /api/widget/topic/{id}
    get_api_widget_topic_id: `${base}api/widget/topic/{id}`, // GET /api/widget/topic/{id}
    patch_api_widget_topic_id: `${base}api/widget/topic/{id}`, // PATCH /api/widget/topic/{id}
    get_api_widget_topic_id_usage: `${base}api/widget/topic/{id}/usage`, // GET /api/widget/topic/{id}/usage
    get_health: `${base}health`, // GET /health
    //--------------API-----------------

    //--------------PATH-----------------
    visit_user: "/setting/manage-team",
    visit_user_grup: "/setting/manage-group",
    visit_register: "/register",
    visit_broadcast: "/broadcast/riwayat",
    visit_broadcast_temp: "/broadcast/riwayat",
    visit_template: "/broadcast/template",
    visit_ticket: "/ticket",
    visit_liveChat: "/live-chat",
    inbox: "/inbox",
    //----V2-----
    visitGeneralSetting: "/settings/organization/general",
    visitRole: "/settings/organization/roles",
    visitMembers: "/settings/organization/members",
    visitShift: "/settings/organization/shift-hours",
    visitTags: "/settings/organization/tags",
    visitChangePass: "/settings/organization/change-password",
    visitTeaminbox: "/settings/inbox/team-inbox",
    visitAssignment: "/settings/inbox/assignments",
    visitMacros: "/settings/inbox/macros",
    visitTicketTypes: "/settings/inbox/tickets",
    visitSLA: "/settings/inbox/sla",
    visitWidgetSetting: "/settings/channels/widget",
    visitWhatsappwebSetting: "/settings/channels/whatsapp-web",
    visitAddons: "/settings/channels/addon",
    visitSubscription: "/settings/subscriptions/billing",
    visitWebhookSetting: "/settings/developer/webhook",
    visitTrackingSetting: "/settings/developer/shipping-credentials",
    visitConversation: "/conversation",
    visitTicket: "/ticketing",
    visitBroadcast: "/broadcast/messages",
    visitStatistic: "/statistic",
    //--------------PATH-----------------

    loginBody: { keyword: "goddummyprod", password: "TongTji89" },
    loginBody_GD_dev: { keyword: "goddummy", password: "asdqwe12" },
    loginBody_testing270520252: {
      keyword: "testing270520252",
      password: "Asdqwe12@",
    },
    loginBody_CT: { keyword: "chickentester01", password: "asdqwe12" },
    loginBody_ms2: { keyword: "messagelogdua", password: "Asdqwe12@" },
    loginBody_prodtestingjuli: {
      keyword: "prodtestingjuli",
      password: "asdqwe12",
    },
    loginBody_prodtestingakun1dua: {
      keyword: "prodtestingakun1dua",
      password: "Asdqwe12@",
    },
    loginBody_goddumstag: {
      keyword: "goddumstag",
      password: "Asdqwe12!",
    },

    //---------goddummyprod2 SAP----------
    loginBody_goddummyprod2: {
      identifier: "goddummyprod2",
      password: "Password1@",
    },
    //---------goddummyprod2 SAP----------

    //---------tester dummy prod -------
    loginBody_testerdummy01: {
      identifier: "testerdummy01",
      password: "Asdqwe12@",
    },
    loginBody_testerdummy01: {
      identifier: "testerdummyprod01",
      password: "Asdqwe12@",
    },
    //---------tester dummy prod -------

    //----------tantaffgo---------- prod
    loginBody_tantaffgo: {
      identifier: "tantaffgo01",
      password: "Asdqwe12@",
    },
    loginBody_danyatminsatu: {
      //adm
      identifier: "danyatmin01",
      password: "Asdqwe12@",
    },
    loginBody_danyspvsatu: {
      //spv
      identifier: "danyspv01",
      password: "Asdqwe12@",
    },
    loginBody_danyaagentsatu: {
      //agent
      identifier: "danyagent01",
      password: "Asdqwe12@",
    },
    //----------tantaffgo----------

    //-------chickentester-------- dev
    loginBody_CT2: {
      identifier: "chickentester01",
      password: "Asdqwe12@",
    },
    loginBody_cekerayam01: {
      //adm
      identifier: "cekerayam01",
      password: "Asdqwe12@",
    },
    loginBody_mataayam01: {
      //spv
      identifier: "mataayam01",
      password: "Asdqwe12@",
    },
    loginBody_leherayam01: {
      //agent
      identifier: "leherayam01",
      password: "Asdqwe12@",
    },
    //-------chickentester--------

    //-------roleValidation--------
    //dev
    loginBody_supervisor: {
      //agent
      identifier: "pusatadmin10",
      password: "Password1@",
    },
    loginBody_agent: {
      //agent
      identifier: "aprilch",
      password: "Password1@",
    },
    loginBody_crm: {
      //agent
      identifier: "crmagent01",
      password: "Password1@",
    },
    loginBody_tlc: {
      //agent
      identifier: "jbaagent01",
      password: "Password1@",
    },

    //prod
    loginBody_supervisorProd: {
      //agent
      identifier: "pusatadmin10",
      password: "Password1@",
    },
    loginBody_agentProd: {
      //agent
      identifier: "aprilch",
      password: "Password1@",
    },
    loginBody_crmProd: {
      //agent
      identifier: "crmagent01",
      password: "Password1@",
    },
    loginBody_tlcProd: {
      //agent
      identifier: "jbaagent01",
      password: "Password1@",
    },
    //-------roleValidation--------

    headers: {
      //goddummyprod
      "x-api-key":
        // "ae1bd41cfbe437bb5755068ab5d2038aa240660d87c5cdca0f69001a3a52e3c5",
        "10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6",
    },
    header_tantaffgo: {
      "x-signature-key": "sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM",
    },
    randomGlobalDelay: Math.floor(Math.random() * 1800000) + 60000, //1 menit + random wait time
    randomGlobalDelayStaging: Math.floor(Math.random() * 2000) + 10000, //1 menit + random wait time
    parentNumber: "6285147211094",
    parentNumber2: "6285135431734",
    targetMessage_me: "6289655057778",
    targetMessage_dummy: "6285135431270",
  };

  // const config = environmentConfig[baseUrl];
  // if (!config) throw new Error(`Unknown baseUrl: ${baseUrl}`);
  // return config;
}
