const staticCacheName = "srk-v3";
const dynamicCacheName = "drk-v4";
const assets = [
	"./",
	"/index.html",
	"/offline.html"
];

//Cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// Install event
self.addEventListener("install", (event) => {
  //Cache the static pages
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    //Get the cached keys and see if there is older version of cache
    caches.keys().then((keys) => {
      //Find and separate the old caches and delete them
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
    event.respondWith(
      //See if the requested page is already in the cached version or not
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            //If already cached show the cached version
            cacheRes ||
            //If not cached, fetch from the server
            fetch(event.request).then(async (fetchRes) => {
              //Cache the fetched page for future
              const cache = await caches.open(dynamicCacheName);
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 20);
              //Display the fetched page
              return fetchRes;
            })
          );
        })
        .catch(() => {
          //To display fallback page to not available html pages (This avoids showing fallback page if image was not cached of that page)
          if (event.request.url.indexOf(".html") > -1) {
           return caches.match("/offline.html");
          }
        })
    );
  }
});
