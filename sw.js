//cache name
const CACHE_NAME = "kurahruznama-v0";
//we want to cache the next files
const cacheAssets = [
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
//Install event
self.addEventListener("install", e => {
  console.log("Service Worker Installed");
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log("From service worker:caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});
//Active event
self.addEventListener("activate", e => {
  console.log("Service Worker activated");
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Cleaning up old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Fetch event
self.addEventListener("fetch", e => {
  console.log("fetching cached content");
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copyCache = res.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, copyCache);
        });
        return res;
      })
      .catch(error => caches.match(e.request).then(res => res))
  );
});
