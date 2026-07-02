#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

resolve_node_bin() {
  if [[ -n "${NODE_BIN:-}" ]] && [[ -x "${NODE_BIN}" ]]; then
    printf '%s' "${NODE_BIN}"
    return 0
  fi

  local candidate=""
  candidate="$(command -v node 2>/dev/null || true)"
  if [[ -n "$candidate" ]]; then
    printf '%s' "$candidate"
    return 0
  fi

  candidate="$(command -v node.exe 2>/dev/null || true)"
  if [[ -n "$candidate" ]]; then
    printf '%s' "$candidate"
    return 0
  fi

  if [[ -x "/mnt/c/Program Files/nodejs/node.exe" ]]; then
    printf '%s' "/mnt/c/Program Files/nodejs/node.exe"
    return 0
  fi

  if [[ -x "/c/Program Files/nodejs/node.exe" ]]; then
    printf '%s' "/c/Program Files/nodejs/node.exe"
    return 0
  fi

  return 1
}

if ! NODE_BIN="$(resolve_node_bin)"; then
  echo "[run-all] ERROR: node binary not found in non-interactive bash PATH." >&2
  echo "[run-all] Try one of these:" >&2
  echo "  1) export NODE_BIN='/mnt/c/Program Files/nodejs/node.exe'" >&2
  echo "  2) run: which node || which node.exe" >&2
  echo "  3) ensure PATH is exported in a file sourced by non-interactive shells" >&2
  exit 1
fi

if [[ -z "${RMQ_PASS:-}" ]]; then
  echo "[run-all] ERROR: RMQ_PASS env var is required" >&2
  exit 1
fi

ENV_NAME="${ENV:-dev}"
LOGIN_TYPE="${LOGIN_TYPE:-danyatmin01}"
TOTAL_MESSAGES="${TOTAL_MESSAGES:-300}"
DISCOVER_TARGETS="${DISCOVER_TARGETS:-100}"
STORM_SUBSCRIBERS="${STORM_SUBSCRIBERS:-danyatmin01:1,danyspv01:2,danyagent01:2}"
STORM_SUBSCRIBERS_FILE="${STORM_SUBSCRIBERS_FILE:-}"
STORM_ROUTE="${STORM_ROUTE:-your-inbox}"
STORM_TEAM_ID="${STORM_TEAM_ID:-}"
STORM_DURATION_SEC="${STORM_DURATION_SEC:-300}"
STORM_HOTPATH_ENABLED="${STORM_HOTPATH_ENABLED:-true}"
STORM_HOTPATH_INTERVAL_MS="${STORM_HOTPATH_INTERVAL_MS:-1000}"
PROBE_DURATION_SEC="${PROBE_DURATION_SEC:-300}"
PROBE_INTERVAL_MS="${PROBE_INTERVAL_MS:-1000}"
STORM_READY_TIMEOUT_SEC="${STORM_READY_TIMEOUT_SEC:-600}"
FLOOD_COMPANY_IDS="${FLOOD_COMPANY_IDS:-}"
FLOOD_COMPANY_BALANCE="${FLOOD_COMPANY_BALANCE:-false}"
DEFAULT_LOG_DIR="$ROOT_DIR/scripts/storm-reproducer/logs/storm-$(date +%Y%m%d-%H%M%S)"
LOG_DIR="${LOG_DIR:-$DEFAULT_LOG_DIR}"
RMQ_URI="${RMQ_URI:-amqp://admin:${RMQ_PASS}@127.0.0.1:5672}"

mkdir -p "$LOG_DIR"
PROBE_LOG="$LOG_DIR/probe.log"
STORM_LOG="$LOG_DIR/storm.log"
FLOOD_LOG="$LOG_DIR/flood.log"

PROBE_PID=""
STORM_PID=""

cleanup() {
  local exit_code=$?
  echo ""
  echo "[run-all] cleaning up..."

  if [[ -n "$STORM_PID" ]] && kill -0 "$STORM_PID" 2>/dev/null; then
    kill -TERM "$STORM_PID" 2>/dev/null || true
    wait "$STORM_PID" 2>/dev/null || true
  fi

  if [[ -n "$PROBE_PID" ]] && kill -0 "$PROBE_PID" 2>/dev/null; then
    kill -TERM "$PROBE_PID" 2>/dev/null || true
    wait "$PROBE_PID" 2>/dev/null || true
  fi

  echo "[run-all] logs:"
  echo "  probe: $PROBE_LOG"
  echo "  storm: $STORM_LOG"
  echo "  flood: $FLOOD_LOG"
  exit "$exit_code"
}
trap cleanup EXIT INT TERM

echo "[run-all] root=$ROOT_DIR"
echo "[run-all] using node=$NODE_BIN"
PROBE_LOGIN_TYPE="${LOGIN_TYPE%%,*}"

echo "[run-all] starting hotpath probe -> $PROBE_LOG"
"$NODE_BIN" scripts/storm-reproducer/hotpath-probe.js \
  --env "$ENV_NAME" \
  --login-type "$PROBE_LOGIN_TYPE" \
  --duration-sec "$PROBE_DURATION_SEC" \
  --interval-ms "$PROBE_INTERVAL_MS" \
  > "$PROBE_LOG" 2>&1 &
PROBE_PID=$!

echo "[run-all] starting storm reproducer -> $STORM_LOG"
STORM_CMD=(
  "$NODE_BIN" scripts/storm-reproducer/storm-reproducer.js
  --env "$ENV_NAME"
  --duration-sec "$STORM_DURATION_SEC"
  --route "$STORM_ROUTE"
)
if [[ -n "$STORM_SUBSCRIBERS_FILE" ]]; then
  STORM_CMD+=(--subscribers-file "$STORM_SUBSCRIBERS_FILE")
else
  STORM_CMD+=(--subscribers "$STORM_SUBSCRIBERS")
fi
if [[ "$STORM_HOTPATH_ENABLED" == "true" ]]; then
  STORM_CMD+=(--hotpath-enabled --hotpath-interval-ms "$STORM_HOTPATH_INTERVAL_MS")
else
  STORM_CMD+=(--no-hotpath)
fi
if [[ -n "$STORM_TEAM_ID" ]]; then
  STORM_CMD+=(--team-id "$STORM_TEAM_ID")
fi
"${STORM_CMD[@]}" > "$STORM_LOG" 2>&1 &
STORM_PID=$!

echo "[run-all] waiting for storm subscribers to be ready (timeout=${STORM_READY_TIMEOUT_SEC}s)..."
for _ in $(seq 1 "$STORM_READY_TIMEOUT_SEC"); do
  if grep -q "subscriber(s) ready" "$STORM_LOG" 2>/dev/null; then
    echo "[run-all] storm ready"
    break
  fi
  sleep 1
done

if ! grep -q "subscriber(s) ready" "$STORM_LOG" 2>/dev/null; then
  echo "[run-all] ERROR: storm-reproducer did not become ready in time" >&2
  tail -50 "$STORM_LOG" || true
  exit 1
fi

echo "[run-all] starting inbound-rmq-flood -> $FLOOD_LOG"
FLOOD_CMD=(
  "$NODE_BIN" scripts/inbound-rmq-flood/inbound-rmq-flood.js
  --env "$ENV_NAME"
  --login-type "$LOGIN_TYPE"
  --discover-targets "$DISCOVER_TARGETS"
  --discover-profiles widget,messenger,email,instagram,whatsapp
  --total-messages "$TOTAL_MESSAGES"
  --batch-size 10
  --message-type text
  --log-every 20
  --random-targets
  --uri "$RMQ_URI"
)
if [[ -n "$FLOOD_COMPANY_IDS" ]]; then
  FLOOD_CMD+=(--company-ids "$FLOOD_COMPANY_IDS")
fi
if [[ "$FLOOD_COMPANY_BALANCE" == "true" ]]; then
  FLOOD_CMD+=(--company-balance)
fi
"${FLOOD_CMD[@]}" 2>&1 | tee "$FLOOD_LOG"

echo "[run-all] flood complete; waiting for storm/probe to finish timers..."
wait "$STORM_PID" 2>/dev/null || true
wait "$PROBE_PID" 2>/dev/null || true

echo "[run-all] done"
