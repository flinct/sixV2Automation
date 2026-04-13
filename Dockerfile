FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# RUN npm ci --production
RUN npm ci 

COPY scripts/ ./scripts/
COPY cypress/support/ ./cypress/support/
RUN mkdir -p scripts/report

# Copy entrypoint script
COPY scripts/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

ENV BASE_URL=https://dev-v2.satuinbox.com
ENV MODE=throughput
ENV TARGET_CONNECTIONS=50
ENV RUN_DURATION_MS=300000
ENV EMIT_EVERY_MS=200
ENV LOG_LEVEL=info
ENV PREPARE_MODE=perClient

ENTRYPOINT ["./entrypoint.sh"]