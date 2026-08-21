const CACHE_NAME = 'tutorpro-v1';

// Aapke exact folder structure ke hisaab se caching path:
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './login.html',
    './dashboard.html',
    './manifest.json',
    './assets/css/style.css',
    './assets/css/responsive.css',
    './assets/css/login.css',
    './assets/css/dashboard.css',
    './assets/css/theme.css',
    './assets/js/script.js',
    './assets/js/firebase-config.js',
    './assets/images/favicon.ico',
    './assets/images/icon-192.png',
    './assets/images/icon-512.png'
];

// Service Worker Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('TutorPro assets caching in progress...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Cache Activate Aur Purana Cache Clean
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Offline Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});