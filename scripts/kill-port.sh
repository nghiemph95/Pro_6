#!/usr/bin/env bash
# Tắt process đang dùng port (mặc định 5001)
PORT="${1:-5001}"
PID=$(lsof -ti :"$PORT")
if [ -n "$PID" ]; then
  echo "Đang tắt process $PID (port $PORT)..."
  kill "$PID"
  echo "Đã tắt."
else
  echo "Không có process nào dùng port $PORT."
fi
