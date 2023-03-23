//cache name
const CACHE_NAME = "ruznamakurah-v7";
//we want to cache the next files
const cacheAssets = ["index.html", "css/style.css"];
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