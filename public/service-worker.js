// public/service-worker.js
const CACHE = 'offline-mvp-v1';
const BASE = self.registration.scope;
const url = (p) => new URL(p, BASE).toString();

const ASSETS = [
  url('.'),
  url('index.html'),
  url('manifest.webmanifest'),
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isHTML = req.headers.get('accept')?.includes('text/html');

  // HTML: network-first with cached fallback
  if (isHTML) {
    e.respondWith(
      fetch(req).then((res) => {
        caches.open(CACHE).then((c) => c.put(req, res.clone()));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match(url('index.html'))))
    );
    return;
  }

  // Assets/JSON: cache-first, then network
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }))
  );
});
