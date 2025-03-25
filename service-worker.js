const CACHE_NAME = 'custom-tees-cache-v2';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/script.js',
    '/cart.html',
    '/shop.html',
    '/shop2.html',
    '/createForm.html',
    '/cart.css',
    '/shop.css',
    '/image.png',
    '/image1.png',
    '/image2.png',
    '/image3.png',
    '/shop-img.png',
    '/tee-1.png',
    '/tee-2.png',
    '/icons/logo-192.png',
    '/icons/logo-512.png',
    '/offline.html' // Fallback offline page
];

// Install event – Cache files
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching files...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] All files cached successfully');
                self.skipWaiting(); // Activate new SW immediately
            })
            .catch((error) => {
                console.error('[Service Worker] Caching failed:', error);
            })
    );
});

// Fetch event – Serve cached files when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
                    return response;
                }
                console.log(`[Service Worker] Fetching from network: ${event.request.url}`);
                return fetch(event.request)
                    .catch(() => caches.match('/offline.html')); // Serve fallback page if offline
            })
    );
});

// Activate event – Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activated and old caches deleted');
            return self.clients.claim(); // Take control of any open clients
        })
    );
});
