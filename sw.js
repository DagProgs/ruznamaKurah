const staticCacheName = 'static-cache-v20';
const dynamicCacheName = 'dynamic-cache-v20';

const staticAssets = [
  './',
  './index.html',
  './mounts.html',
  './style.css',
  './footer.css',
  './header.css',
  './main.css',
  './img/calendarnext.svg',
  './img/calendarback.svg',
  './assets/style/table.css',
  './assets/js/js.js',
  './assets/js/jquery-1.11.3.min.js',
  './assets/js/titles.js',
  './assets/js/date.js',
  './assets/img/clock-calendar.png',
  './assets/db/ruznama_k.db'
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
