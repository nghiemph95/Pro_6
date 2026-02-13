#!/usr/bin/env bash
cd "$(dirname "$0")/.."
# Pass --openssl-legacy-provider to the child process (react-scripts spawns start.js with process.execPath)
exec node ./node_modules/.bin/react-scripts --openssl-legacy-provider start "$@"
