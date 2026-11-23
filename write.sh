#!/data/data/com.termux/files/usr/bin/bash
echo "$1" | base64 -d > "$2"
echo "Wrote $2"
