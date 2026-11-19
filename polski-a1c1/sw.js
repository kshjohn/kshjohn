/* Polski A1–C1 — 오프라인 캐시.
   index.html 은 네트워크 우선(3.5초 뒤 캐시로 넘어감), 나머지 정적 파일은 캐시 우선.
   앱을 고치고 배포할 때 VERSION 을 올리면 예전 캐시가 정리된다. */
const VERSION = "2026-09-08a";
const CACHE   = "polski-a1c1-" + VERSION;
const ASSETS  = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/favicon.svg",
  "./icons/icon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png"
];
const NET_TIMEOUT = 3500;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("polski-a1c1-") && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* 페이지가 "업데이트" 버튼을 누르면 대기 중인 워커를 바로 넘긴다 */
self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

async function fromNetwork(req, timeout) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(req, { signal: ctrl.signal });
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    }
    return res;
  } finally {
    clearTimeout(timer);
  }
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* 화면 이동(주소창·홈 화면 아이콘)은 항상 최신 HTML을 먼저 노린다 */
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try { return await fromNetwork(req, NET_TIMEOUT); }
      catch (err) {
        return (await caches.match(req)) || (await caches.match("./index.html")) ||
               new Response("오프라인입니다.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) {
      /* 뒤에서 조용히 갱신해 다음 실행 때 최신을 쓴다 */
      fromNetwork(req, NET_TIMEOUT).catch(() => {});
      return hit;
    }
    try { return await fromNetwork(req, NET_TIMEOUT); }
    catch (err) { return new Response("", { status: 504 }); }
  })());
});
