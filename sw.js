var CACHE_NAME = 'snapdrop-cache-v1';
var urlsToCache = [
  'index.html',
  './',
  'offline.html',
	'css/menu.css',
	'css/style.css',
    'js/app.js',
    'js/ar.js',
	'js/jquery.hijri.date.min.js',
	'js/jquery-3.6.0.min.js',
	'js/clock.js',
	'js/dayruznama.js',
	'js/menu.js',
	'js/mount.js',
	'js/ru.js',
	'js/script.js.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('activate', function(event) {
  console.log('Updating Service Worker...')
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          return true
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});