const CACHE_NAME = 'quantflow-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/css/styles.css',
    './assets/js/app.js',
    './assets/js/engine.js',
    './assets/img/icon-512.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/fraction.js@5.3.4/dist/fraction.min.js',
    'https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).then((fetchRes) => {
                // Dynamic caching for other assets could go here if needed
                // For now, strictly serve cached or fetch from network
                return fetchRes;
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});
