#!/usr/bin/env bash
cd "$(dirname "$0")/.."
exec node ./node_modules/.bin/react-scripts --openssl-legacy-provider build "$@"
