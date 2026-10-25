/* =========================================================
   QR Tracker - minimal service worker
   Purpose: make the app installable and open standalone. It does
   NOT cache live data: limits must always come fresh from Firestore,
   a stale total could send a payment to a full QR.

   Only this app's own static shell is cached, network-first, so a
   new version shows up on the next open and the cache is only a
   fallback when the network is down. CDN scripts and all Firebase
   requests are never touched (no respondWith for them).
   ========================================================= */

const CACHE_NAME = "qrtracker-shell-v1";
// Relative to this file, so it works under a GitHub Pages sub-path.
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"]
  .map((p) => new URL(p, self.location).pathname);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin || !SHELL.includes(url.pathname)) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match(SHELL[0])))
  );
});
