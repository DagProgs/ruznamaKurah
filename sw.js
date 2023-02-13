const staticCacheName = 'kurahruznama-static-v1';
const assets = [
  '/',
    '/index.html',
    '/offline.html',
	'/css/font-awesome.min.css',
	'/css/index.css',
	'/css/RuznamaKurakh_end.css',
    '/js/app.js',
    '/js/main.js',
	'/js/jquery.hijri.date.min.js',
	'/js/jquery-3.6.0.min.js',
	'/js/jquery-ui.min.js',
	'/js/dayruznama.js',
	'/js/script.js.js',
	'/js/wwb18.min.js',
    '/images/no-image.jpg'
];

// событие install
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// событие activate
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// событие fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});