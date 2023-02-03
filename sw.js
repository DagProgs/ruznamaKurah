
const staticCacheName = 'static-cache-v12';
const dynamicCacheName = 'dynamic-cache-v12';

const staticAssets = [
    './',
    './index.html',
	'./april.html',
	'./august.html',
	'./december.html',
	'./february.html',
	'./january.html',
	'./july.html',
	'./june.html',
	'./march.html',
	'./may.html',
	'./november.html',
	'./october.html',
	'./september.html',
    './images/icons/icon-128x128.png',
    './images/icons/icon-192x192.png',
    './offline.html',
    './css/april.css',
	'./css/august.css',
	'./css/december.css',
	'./css/february.css',
	'./css/font-awesome.min.css',
	'./css/index.css',
	'./css/january.css',
	'./css/july.css',
	'./css/june.css',
	'./css/march.css',
	'./css/may.css',
	'./css/november.css',
	'./css/october.css',
	'./css/september.css',
	'./css/Ruznama2023.css',
    './js/app.js',
    './js/main.js',
	'./js/jquery-3.6.0.min.js',
	'./js/jquery-ui.min.js',
	'./js/dayruznama.js',
	'./js/script.js.js',
	'./js/wwb18.min.js',
    './images/no-image.jpg'
];

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
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}