const staticCacheName = 'static-kurahruznama-v12'
const dynamicCacheName = 'dynamic-kurahruznama-v12'

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
            caches.open('static-kurahruznama-v12')
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
