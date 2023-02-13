const CACHE_NAME = 'ruznamakurah-v1.1.1';
const cacheList = [
    'index.html',
    'offline.html',
	'css/font-awesome.min.css',
	'css/index.css',
	'css/RuznamaKurakh_end.css',
    'js/app.js',
    'js/main.js',
	'js/jquery.hijri.date.min.js',
	'js/jquery-3.6.0.min.js',
	'js/jquery-ui.min.js',
	'js/dayruznama.js',
	'js/script.js.js',
	'js/wwb18.min.js',
    'images/no-image.jpg'
];

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});

// Внимание: ваши данные могут отличаться! Настройте удаление старого кэша
const CACHE_PREFIX = 'ruznamakurah';

this.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Внимание: ваши данные могут отличаться!
this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Внимание: ваши данные могут отличаться!
this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }
    const cachedResponsePromise = caches.match(event.request, { ignoreSearch: true });

    event.respondWith(
        fetch(event.request).then(response => {
            if (response.ok) {
                return caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(event.request, response).then(() => response.clone());
                    });
            } else {
                return cachedResponsePromise;
            }
        }).catch(() => cachedResponsePromise)
    );
});