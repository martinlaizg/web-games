#!/bin/sh
set -eu

node /app/dist/index.js &
api_pid=$!

nginx -g 'daemon off;' &
nginx_pid=$!

stop() {
  kill -TERM "$api_pid" "$nginx_pid" 2>/dev/null || true
  wait "$api_pid" "$nginx_pid" 2>/dev/null || true
  exit 0
}

trap stop INT TERM
wait "$api_pid" "$nginx_pid"
