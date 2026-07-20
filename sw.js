const CACHE_NAME = 'paris-trip-v30';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './splash.png',
  './ticket-page1.png',
  './ticket-page2.png',
  './document.pdf',
  './Screenshot%202026-07-19%20012546.png',
  './images.jpg',
  './port-maillot-from-beauvais.jpg',
  './csm_Plan_site_web_plateforme_GB_juin_2024_0a82a5ca67.png',
  './metro-l1.png',
  './metro-l4.png',
  './metro-l9.svg',
  './metro-l12.svg',
  './metro-l13.svg',
  './metro-l14.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(r => {
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
