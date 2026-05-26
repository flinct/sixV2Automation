# RBAC Memory - Omnichannel BE

> **Source:** `C:\Users\MyBook SAGA 12\Desktop\BE satuinbox\omnichannel-satuinbox-be`

---

## 1. Roles

| Role | Code | Description | Contact Area | Contact Visibility |
|------|------|-------------|-------------|-------------------|
| Super Admin | `SUPER_ADMIN` | Platform-wide access | `all` | `all` |
| Admin | `ADMIN` | Company-wide admin | `all` | `all` |
| Supervisor | `SUPERVISOR` | Team supervisor | `operational` | `team` |
| Supervisor Sales | `SUPERVISOR` (name: SUPERVISOR SALES) | Sales supervisor | `sales` | `team` |
| Agent | `AGENT` | Regular agent | `operational` | `own_and_assigned` |
| Sales | `AGENT` (name: SALES) | Sales agent | `sales` | `own_and_assigned` |
| Team Lead | `TEAM_LEAD` | Defined but not in default seed | - | - |
| Manager | `MANAGER` | Defined but not in default seed | - | - |
| User | `USER` | Base user | - | - |

---

## 2. Permission Resources & Actions

Format: `resource:action`

### Resources (`ResourceTypeEnum`)
| Resource | Key |
|----------|-----|
| Conversation | `conversation` |
| Ticket | `ticket` |
| Broadcast | `broadcast` |
| Client Contact | `client_contact` |
| Member | `member` |
| Team | `team` |
| Account Channel | `account_channel` |
| Statistic | `statistic` |
| Setting | `setting` |
| Macro | `macro` |
| Assignment | `assignment` |
| Shift Hours | `shift_hours` |
| Ticket Type | `ticket_type` |
| Lead | `lead` |
| Visit | `visit` |
| Comment | `comment` |
| Privacy | `privacy` |
| Roles | `roles` |
| Audit | `audit` |
| User | `user` |
| Company | `company` |
| Organization | `organization` |
| Subscription | `subscription` |

### Actions (`PermissionActionEnum`)
| Action | Meaning |
|--------|---------|
| `*` | All access (super-admin) |
| `create` | Create new |
| `read` | View all |
| `read_team` | View team-scoped |
| `read_own` | View own only |
| `update` | Update any |
| `update_own` | Update own |
| `update_team` | Update team-scoped |
| `delete` | Delete any |
| `approve` | Approve |
| `reject` | Reject |
| `assign` | Assign |
| `export` | Export |
| `import` | Import |
| `execute` | Execute |
| `check_in` | Check-in (visits) |
| `send_message` | Send message |
| `pull` | Pull conversation |
| `pin_convo` | Pin conversation |
| `pin_message` | Pin message |
| `star` | Star conversation |
| `mark_read` | Mark as read |
| `mark_spam` | Mark as spam |
| `change_status` | Change status |
| `reopen` | Reopen conversation |
| `manage_asignee` | Manage assignee |
| `manage_macros` | Manage macros |
| `manage_notes` | Manage notes |
| `manage_member` | Manage members |
| `manage_sla` | Manage SLA |
| `manage_team_inbox` | Manage team inbox |
| `manage_live_chat` | Manage live chat |
| `manage_whatsapp_web` | Manage WhatsApp Web |
| `manage_tags` | Manage tags |
| `manage_shared_macro` | Manage shared macros |
| `manage_webhook` | Manage webhooks |
| `manage_addons` | Manage addons |
| `manage_ticket_type` | Manage ticket types |
| `manage_shipping` | Manage shipping |
| `manage_subscription` | Manage subscription |
| `manage_widget` | Manage widget |
| `manage_general_setting` | Manage general settings |
| `edit_own_message` | Edit own message |
| `edit_team_message` | Edit team message |
| `edit_message` | Edit any message |
| `delete_own_message` | Delete own message |
| `delete_team_message` | Delete team message |
| `delete_message` | Delete any message |
| `read_client_data` | Read client data |
| `read_api_key` | Read API key |
| `take_screenshot` | Take screenshot |
| `change_team_inbox` | Change team inbox |
| `view_full_email` | View unmasked email |
| `view_full_phone` | View unmasked phone |
| `backfill` | Backfill data |

---

## 3. Default Permissions per Role

### SUPER_ADMIN
```
['*', 'privacy:view_full_email', 'privacy:view_full_phone']
```

### ADMIN
```
['*', 'privacy:view_full_email', 'privacy:view_full_phone']
```

### SUPERVISOR
```
conversation: send_message, pull, take_screenshot, manage_macros, manage_notes,
            manage_asignee, pin_convo, pin_message, read_client_data, change_status,
            read, mark_spam, mark_read, star, assign, edit_team_message, delete_team_message
setting:     manage_general_setting, manage_live_chat, manage_member, manage_shared_macro,
            manage_tags, manage_team_inbox, manage_whatsapp_web
account_channel: *
ticket:          *
broadcast:       *
statistic:       *
client_contact:  *
company:         *
member:          *
team:            *
shift_hours:     *
ticket_type:     *
macro:           *
assignment:      *
privacy:         view_full_email, view_full_phone
```

### AGENT
```
conversation: send_message, pull, take_screenshot, read, change_status, pin_convo,
            pin_message, mark_spam, mark_read, star, assign, edit_own_message, delete_own_message
ticket:      create, read, update, change_status, send_message
broadcast:   read_team
account_channel: read
roles:       read
shift_hours: read
ticket_type: read
macro:       read
assignment:  read
member:      read
team:        read
company:     read, update
conversation: read_client_data
```

### SUPERVISOR SALES
```
lead:       read_team, update_team, create
visit:      read_team, create
comment:    read, create
client_contact: read_team, update_team, create, delete
(plus operational supervisor perms for conversation/settings/etc.)
```

### SALES
```
lead:       read_own, create, update_own
visit:      read_own, create, check_in
comment:    read, create
client_contact: read_own, create
```

---

## 4. Contact Scope RBAC

Controls which contacts a user can access, based on two dimensions:

### Area Scope
| Scope | Meaning |
|-------|---------|
| `all` | All contact areas (super admin / admin) |
| `operational` | Customer service / conversation contacts |
| `sales` | Sales / lead contacts |

### Visibility Scope
| Scope | Meaning |
|-------|---------|
| `all` | All contacts in the area |
| `team` | Contacts belonging to user's team |
| `own_and_assigned` | Contacts owned by or assigned to the user |

### Matrix
| Role | Area | Visibility |
|------|------|------------|
| SUPER_ADMIN | `all` | `all` |
| ADMIN | `all` | `all` |
| SUPERVISOR | `operational` | `team` |
| AGENT | `operational` | `own_and_assigned` |
| SUPERVISOR SALES | `sales` | `team` |
| SALES | `sales` | `own_and_assigned` |

---

## 5. Privacy Masking (PII)

| Role | Email | Phone |
|------|-------|-------|
| SUPER_ADMIN | Full | Full |
| ADMIN | Full | Full |
| SUPERVISOR | Full | Full |
| MANAGER | Full | Full |
| TEAM_LEAD | Full | Full |
| AGENT | Masked | Masked |
| USER | Masked | Masked |

Privacy policies are configurable per-role via `PUT /privacy/policy` (requires `setting:manage_general_setting`).

---

## 6. Ticket Views by Role

| Role | Allowed Views | Default |
|------|--------------|---------|
| SUPER_ADMIN | `all_ticket`, `unassigned_ticket`, `assigned_ticket`, `created_by_me` | `all_ticket` |
| ADMIN | `all_ticket`, `unassigned_ticket`, `assigned_ticket`, `created_by_me` | `all_ticket` |
| SUPERVISOR | `all_ticket_team`, `my_ticket`, `queue_unassigned`, `created_by_me` | `all_ticket_team` |
| AGENT | `my_ticket`, `queue_team`, `created_by_me` | `my_ticket` |

---

## 7. Guards & Decorators (How RBAC Is Enforced)

### Guard Chain (API Gateway)
```
Request → JwtAuthGuard → RolesGuard + PermissionsGuard → Controller
```

### Decorators
| Decorator | Effect |
|-----------|--------|
| `@Public()` | Bypass all auth |
| `@SkipAuth()` | Skip authentication |
| `@RequirePermissions(['resource:action', ...])` | Require specific permissions |
| `@RequireRoles(RoleTypeEnum.ADMIN, ...)` | Require specific roles |
| `@AdminOnly()` | Shorthand for `@RequireRoles(SUPER_ADMIN)` |
| `@ManagerOnly()` | Shorthand for `@RequireRoles(SUPER_ADMIN, MANAGER)` |
| `@Auth(['resource:action', ...])` | Combined auth + permission check |
| `@ApiKeyAuth()` | Require valid API key |
| `@SkipPrivacyMasking()` | Bypass PII masking for this endpoint |

### Privacy Interceptor
Global `PrivacyMaskingInterceptor` masks email/phone in API responses unless user has `privacy:view_full_email` or `privacy:view_full_phone`.

---

## 8. RBAC Impact per Feature

### Conversation
- **Read**: Agent+ can read own/assigned; Supervisor can read team; Admin+ can read all
- **Send Message**: Agent+ can send; edit own (agent) vs edit team (supervisor)
- **Assign**: Agent+ can assign; supervisor can manage assignee
- **Change Status**: Agent+ can close/reopen/spam
- **Pin/Star**: Agent+ available
- **Pull**: Agent+ can pull from queue
- **Delete Message**: Own only (agent), team (supervisor), any (admin+)
- **Take Screenshot**: Agent+

### Ticket
- **Create/Read/Update**: Agent+; Supervisor has full `ticket:*`
- **View**: Agent sees own tickets, supervisor sees team tickets, admin sees all
- **Ticket Type**: Read by all; manage requires `manage_ticket_type`

### Broadcast
- **Read**: Agent can read team broadcasts
- **Full Access**: Supervisor+ (broadcast:*)

### Contacts (Client Contact)
- **Read**: Agent reads own/assigned; Supervisor reads team; Admin+ reads all
- **Create/Update/Delete**: Scope follows contact visibility rules
- **Privacy**: Agent sees masked phone/email; supervisor sees full

### Teams & Members
- **Read**: All roles can read teams and members
- **Manage**: Supervisor+ can manage members, teams, team inbox

### Settings
- **General, SLA, Live Chat, WhatsApp Web, Tags, Shared Macro, Member, Team Inbox**: Supervisor+
- **Webhook, Addons, Shipping, Subscription, Widget**: Admin+

### Statistics
- **View**: Supervisor+ (statistic:*); Agent has no stat access

### Roles & Permissions
- **Read**: All roles can read
- **Manage**: Admin+ only

### Leads (Sales)
- **Sales**: Create and read own leads
- **Sales Supervisor**: Read/update team leads
- **Operational roles**: No lead access

### Visits (Sales)
- **Sales**: Create, read own, check-in
- **Sales Supervisor**: Read team visits

### Comments (Sales)
- Read & create: Sales and Sales Supervisor

### Privacy Policy
- **View/Update**: Requires `setting:manage_general_setting` (Supervisor+)

---

## 9. Session & Token Invalidation

Sessions are invalidated on:
| Event | Reason |
|-------|--------|
| Member deleted | `MEMBER_DELETED` |
| Password reset | `PASSWORD_RESET` |
| Role changed | `ROLE_CHANGED` |
| Subscription expired | `SUBSCRIPTION_EXPIRED` |

---

## 10. Key Source Files

| File | Content |
|------|---------|
| `libs/common/src/lib/enums/index.ts` | RoleTypeEnum, PermissionActionEnum, ResourceTypeEnum, TicketViewEnum |
| `libs/common/src/lib/constants/default-permission.constant.ts` | All permission constants + DEFAULT_PERMISSION per role |
| `libs/common/src/lib/constants/base.constant.ts` | METADATA_KEYS, TICKET_VIEW_CONFIG |
| `libs/common/src/lib/decorators/index.ts` | @RequirePermissions, @RequireRoles, @AdminOnly, @ManagerOnly, etc. |
| `libs/common/src/lib/utils/permission.utils.ts` | hasPermission() logic |
| `libs/common/src/lib/utils/privacy.utils.ts` | PII masking per role |
| `libs/common/src/lib/utils/role.utils.ts` | Role type extraction |
| `apps/auth-service/src/app/schemas/role.schema.ts` | Role Mongoose schema |
| `apps/auth-service/src/app/services/role.service.ts` | Role CRUD + seeding |
| `apps/auth-service/src/app/seeders/role.seed.ts` | Default role definitions |
| `apps/auth-service/src/app/utils/contact-scope.util.ts` | Contact scope resolution |
| `apps/api-gateway/src/guards/permission.guard.ts` | PermissionsGuard |
| `apps/api-gateway/src/guards/roles.guard.ts` | RolesGuard |
| `apps/api-gateway/src/guards/jwt-auth.guard.ts` | JwtAuthGuard |
| `apps/api-gateway/src/guards/api-key.guard.ts` | ApiKeyAuthGuard |
| `apps/api-gateway/src/strategies/jwt.strategy.ts` | JWT validation + permission caching |
| `apps/api-gateway/src/interceptors/privacy-masking.interceptor.ts` | PII masking |
| `apps/api-gateway/src/app/client-contact/contact-visibility-resolver.service.ts` | Contact scope RBAC logic |
| `apps/api-gateway/src/app/privacy/privacy-policy.controller.ts` | Privacy policy CRUD |
| `apps/api-gateway/src/app/role/role.controller.ts` | Role listing API |
| `tools/scripts/db/contact-area-rbac-backfill-write.js` | Contact area backfill script |
