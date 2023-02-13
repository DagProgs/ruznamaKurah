const staticCacheName = 'static-kurahruznama-v5'
const dynamicCacheName = 'dynamic-kurahruznama-v5'

const staticAssets = [
	'./',
    './index.html',
    './offline.html',
	'./css/font-awesome.min.css',
	'./css/index.css',
	'./css/RuznamaKurakh_end.css',
    './js/app.js',
    './js/main.js',
	'./js/jquery.hijri.date.min.js',
	'./js/jquery-3.6.0.min.js',
	'./js/jquery-ui.min.js',
	'./js/dayruznama.js',
	'./js/script.js.js',
	'./js/wwb18.min.js',
    './images/no-image.jpg'
];

self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        Promise.all([
            // caches.open('one')
            caches.open('two')
                .then(cache => cache.addAll(toCaches)) //Может быть возвращаемое значение, я не знаю
                .then(ok => console.log('add all ok'), e => console.log(e))
            ,
            //  Очистить старые версии
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'two') {
                            console.log('Очистить',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

self.addEventListener('activate', event => {
    console.log('two now ready to handle fetches!');
    event.waitUntil(
        Promise.all([
            // Очищаем старую версию
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'two') {
                            console.log('Очистить',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});


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