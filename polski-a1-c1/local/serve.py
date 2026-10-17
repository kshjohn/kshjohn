#!/usr/bin/env python3
"""폴란드어 자습실 로컬 서버.

    python3 local/serve.py            # http://localhost:8765 에서 열림
    python3 local/serve.py 9000       # 다른 포트

하는 일
  1. 자습실 폴더(index.html)를 정적으로 서빙한다 — 마이크·음성 인식이 file:// 보다 잘 된다.
  2. 진도를 이 Mac 의 파일에 저장한다: local/data/progress.json
     날짜별 사본(progress-YYYY-MM-DD.json)을 60일 보관하고 더 오래된 것은 지운다.
     브라우저 기록·사이트 데이터를 지워도 진도가 남는다.

표준 라이브러리만 쓴다. 외부 접속은 받지 않는다 (127.0.0.1 전용).
"""
import json, os, sys, time, webbrowser
from datetime import date, datetime, timedelta
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "local", "data")
MAIN = os.path.join(DATA, "progress.json")
KEEP_DAYS = 60
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


def prune():
    cutoff = date.today() - timedelta(days=KEEP_DAYS)
    for name in os.listdir(DATA):
        if name.startswith("progress-") and name.endswith(".json"):
            try:
                d = datetime.strptime(name[9:19], "%Y-%m-%d").date()
            except ValueError:
                continue
            if d < cutoff:
                os.remove(os.path.join(DATA, name))


class H(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def log_message(self, fmt, *args):  # 조용히
        if "__progress" in (args[0] if args else ""):
            return
        super().log_message(fmt, *args)

    def _store_headers(self, code, length=0, ctype="application/json"):
        self.send_response(code)
        self.send_header("X-Polski-Store", "1")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(length))
        self.end_headers()

    def do_HEAD(self):
        if self.path.split("?")[0] == "/__progress":
            self._store_headers(200)
            return
        super().do_HEAD()

    def do_GET(self):
        if self.path.split("?")[0] == "/__progress":
            if not os.path.exists(MAIN):
                body = b"null"            # 아직 진도 파일이 없다 (404 로 콘솔을 어지럽히지 않는다)
            else:
                with open(MAIN, "rb") as f:
                    body = f.read()
            self._store_headers(200, len(body))
            self.wfile.write(body)
            return
        super().do_GET()

    def do_PUT(self):
        if self.path.split("?")[0] != "/__progress":
            self.send_error(404)
            return
        n = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(n)
        try:
            blob = json.loads(raw.decode("utf-8"))
            assert isinstance(blob, dict)
        except Exception:
            self.send_error(400, "bad json")
            return
        os.makedirs(DATA, exist_ok=True)
        text = json.dumps(blob, ensure_ascii=False, indent=1)
        tmp = MAIN + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            f.write(text)
        os.replace(tmp, MAIN)
        with open(os.path.join(DATA, f"progress-{date.today():%Y-%m-%d}.json"), "w", encoding="utf-8") as f:
            f.write(text)
        prune()
        self._store_headers(204)

    def do_DELETE(self):
        if self.path.split("?")[0] != "/__progress":
            self.send_error(404)
            return
        if os.path.exists(MAIN):
            os.remove(MAIN)
        self._store_headers(204)


if __name__ == "__main__":
    os.makedirs(DATA, exist_ok=True)
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), H)
    url = f"http://localhost:{PORT}/"
    print(f"폴란드어 자습실: {url}   (진도 파일: {MAIN})   Ctrl+C 로 종료")
    if "--no-open" not in sys.argv:
        try:
            webbrowser.open(url)
        except Exception:
            pass
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
