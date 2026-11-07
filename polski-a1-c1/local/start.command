#!/bin/bash
# macOS: 이 파일을 더블클릭하면 로컬 서버가 켜지고 브라우저가 열립니다.
# (처음 한 번 "확인되지 않은 개발자" 경고가 뜨면 우클릭 → 열기)
cd "$(dirname "$0")/.." || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 이 없습니다. 터미널에서 xcode-select --install 을 실행해 설치한 뒤 다시 여세요."
  read -r -p "엔터를 누르면 닫힙니다."; exit 1
fi
python3 local/serve.py
