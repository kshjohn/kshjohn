// Google 뉴스 폴란드판에서 한국 관련 헤드라인을 모아 data.json으로 저장한다.
// GitHub Actions에서 주기적으로 실행된다 (.github/workflows/korea-radar.yml).
// 사용: node collect.mjs <index.html 경로> <출력 data.json 경로> [이전 data.json URL]
import { readFileSync, writeFileSync } from "node:fs";

const [, , htmlPath, outPath, prevUrl] = process.argv;
const KEEP_DAYS = 45;
const DAY = 86400000;

// 검색어는 페이지와 한 곳에서 관리한다: index.html의 KOREA, QUERIES 정의를 그대로 읽는다.
const html = readFileSync(htmlPath, "utf8");
const src = html.match(/const KOREA = [\s\S]*?const QUERIES = \[[\s\S]*?\n\];/);
if (!src) throw new Error("QUERIES not found in " + htmlPath);
const QUERIES = new Function(src[0] + "; return QUERIES;")();

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = s => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&(\w+);/g, (m, n) => ENT[n] ?? m)
  .trim();
let retriesLeft = 3;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]) : ""; };

async function fetchQuery(q) {
  const url = "https://news.google.com/rss/search?q=" + encodeURIComponent(q.q + " when:30d") + "&hl=pl&gl=PL&ceid=PL:pl";
  // Google이 요청이 잦다고 429를 주면 30초 쉬고 한 번 더 시도한다. 실행 전체에서 최대 3번까지만.
  const get = () => fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; feed-reader)" }, signal: AbortSignal.timeout(30000) });
  let res = await get();
  if (res.status === 429 && retriesLeft > 0) { retriesLeft--; await sleep(30000); res = await get(); }
  if (!res.ok) throw new Error("HTTP " + res.status);
  const xml = await res.text();
  if (!xml.includes("<rss")) throw new Error("not an RSS response");
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => ({
    title: tag(m[1], "title"), link: tag(m[1], "link"),
    ts: Date.parse(tag(m[1], "pubDate")), source: tag(m[1], "source"), q: q.id
  })).filter(i => i.title && i.link && !isNaN(i.ts));
}

const byLink = new Map();
if (prevUrl) {
  try {
    const res = await fetch(prevUrl, { signal: AbortSignal.timeout(20000) });
    if (res.ok) for (const i of (await res.json()).items || []) byLink.set(i.link, i);
    console.log(`previous snapshot: ${byLink.size} items (HTTP ${res.status})`);
  } catch (e) { console.log("no previous snapshot:", e.message); }
}

const queries = {};
for (const q of QUERIES) {
  try {
    const items = await fetchQuery(q);
    for (const i of items) if (!byLink.has(i.link)) byLink.set(i.link, i);
    queries[q.id] = { ok: true, count: items.length };
    console.log(`${q.id}: ${items.length} items` + (items[0] ? ` | e.g. ${items[0].title}` : ""));
  } catch (e) {
    queries[q.id] = { ok: false, count: 0 };
    console.log(`${q.id}: FAILED ${e.message}`);
  }
  await sleep(4000);
}

if (!Object.values(queries).some(q => q.ok)) { console.error("every query failed"); process.exit(1); }

const cutoff = Date.now() - KEEP_DAYS * DAY;
const items = [...byLink.values()].filter(i => i.ts >= cutoff).sort((a, b) => b.ts - a.ts);
const bySource = {};
for (const i of items) bySource[i.source] = (bySource[i.source] || 0) + 1;
console.log("top outlets: " + Object.entries(bySource).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([n, c]) => `${n} ${c}`).join(", "));
writeFileSync(outPath, JSON.stringify({ generatedAt: Date.now(), queries, items }));
console.log(`wrote ${items.length} items to ${outPath}`);
