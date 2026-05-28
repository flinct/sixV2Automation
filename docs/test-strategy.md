# Test Strategy

## Scope

| Category | Coverage |
|---|---|
| Auth | Login, invalid login, register, onboarding, token behavior |
| Conversation | Inbox navigation, chat list, channel filter, message send, SLA metrics |
| RBAC | Role access validation and permission boundaries |
| Ticketing | Ticket smoke, linked bubble, append/remove linked messages |
| Socket | WebSocket connect/disconnect and message event validation |
| Navigation | Cross-module smoke tests for main application routes |

## Design Principles

- Prefer `data-cy` selectors, then role/text selectors.
- Keep selectors inside page objects.
- Use generated test data for unique usernames, phones, business IDs, and messages.
- Keep environment values in config and CI secrets.
- Prefer Playwright `expect` assertions over manual polling.

## CI Approach

- Run smoke tests on pull request.
- Run full regression on schedule.
- Keep HTML report, JSON result, screenshot, video, and trace artifacts for debugging.
- Use one worker in CI when shared test data could collide.
