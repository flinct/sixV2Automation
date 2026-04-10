#!/bin/sh

# Log machine info
echo "=========================================="
echo "Load Test Machine Starting..."
echo "=========================================="
HOSTNAME=$(hostname)
echo "Hostname: $HOSTNAME"
echo "Container ID: $(cat /etc/hostname)"

# Get IP address from all network interfaces
echo "Network Interfaces:"
IP_ADDR=$(ip -4 addr show | grep 'inet ' | awk '{print $2}' | cut -d/ -f1 | grep -v '^127\.' | head -1)
if [ ! -z "$IP_ADDR" ]; then
  echo "  Primary IP: $IP_ADDR"
else
  echo "  IP: Not found"
fi

echo ""
echo "Environment Configuration:"
echo "  BASE_URL: $BASE_URL"
echo "  MODE: $MODE"
echo "  TARGET_CONNECTIONS: $TARGET_CONNECTIONS"
echo "  RUN_DURATION_MS: $RUN_DURATION_MS"
echo "  EMIT_EVERY_MS: $EMIT_EVERY_MS"
echo "  LOG_LEVEL: $LOG_LEVEL"
echo "  PREPARE_MODE: $PREPARE_MODE"
echo "  MAX_PREPARE_CONCURRENCY: ${MAX_PREPARE_CONCURRENCY:-10}"
echo ""
echo "=========================================="
echo "Starting widget-socket-load-2.js..."
echo "=========================================="
echo ""

# Export machine info as env var for script
export MACHINE_HOSTNAME="$HOSTNAME"
export MACHINE_IP="$IP_ADDR"

# Run the main script
node scripts/widget-socket-load-2.js

# After script completes, show final IP info
echo ""
echo "=========================================="
echo "Machine: $HOSTNAME (IP: $IP_ADDR)"
echo "Load Test Completed"
echo "=========================================="
