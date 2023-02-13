




let toCaches = [
    pre + 'index.html',
    pre + 'offline.html',
];
self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        caches.open('one')
            .then(cache => cache.addAll(toCaches)) // Может быть возвращаемое значение, я не знаю
            .then(ok => console.log('add all ok'), e => console.log(e))
    );
});

self.addEventListener('activate', event => {
    console.log('one now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
    console.log(`fetch`, event.request.url);
    caches.keys().then(ks => console.log(ks));
    if (event.request.url.includes('zhaomin')) {
        event.respondWith(caches.match(pre + 'img/xiaolongnv.jpg'));
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    console.log('Есть', event.request.url);
                    return response;
                } else {
                    console.log("Нет", event.request.url);
                    return fetch(event.request);
                }
            })
        );
    }
});

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
