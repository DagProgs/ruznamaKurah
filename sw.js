const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';

const staticAssets = [
  './',
  './index.html',
  './mounts.html',
  './style.css',
  './img/clock-calendar',
  './assets/style/table.css',
  './assets/js/js.js',
  './assets/js/jquery-1.11.3.min.js',
  './assets/js/index.js',
  './assets/js/12/1.js',
  './assets/js/12/2.js',
  './assets/js/12/3.js',
  './assets/js/12/4.js',
  './assets/js/12/5.js',
  './assets/js/12/6.js',
  './assets/js/12/7.js',
  './assets/js/12/8.js',
  './assets/js/12/9.js',
  './assets/js/12/10.js',
  './assets/js/12/11.js',
  './assets/js/12/12.js',
  './assets/img/clock-calendar.png',
  './assets/db/ruznama.db'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('offline.html');
        } else {
            return caches.match('images/no-image.png');
        }
    }
}