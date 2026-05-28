# Security And Sanitization

Before publishing this repository as a portfolio, these values must stay outside git:

- Real usernames and passwords.
- API keys and signature keys.
- Customer phone numbers and personal data.
- Internal production, staging, or development endpoints.
- Local machine paths.
- Generated reports, traces, screenshots, videos, and `node_modules`.

This repo uses `.env.example` for safe placeholders. Real values should be supplied through local `.env` files or CI secret variables.
