/* Huddle Timer service worker: keeps a copy of the app so it opens offline.
   Strategy: network first (so updates arrive as soon as you're online), cached copy as the fallback.
   The network request skips the browser's own HTTP cache (GitHub Pages marks files as fresh for 10 minutes, which
   would otherwise keep serving the previous version right after an update); an unchanged file is just a quick
   "not modified" reply.
   It only ever touches files from this same site, and never sends anything anywhere else. */
const CACHE = 'huddle-timer-v2';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(cache => cache.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('index.html')))
  );
});
