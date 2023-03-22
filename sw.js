const staticCacheName = "ScroocCacheV1";
const dynamicCacheName = "ScroocDynamicCacheV1";

const assets = [
        '/',
		'/index.html',
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
}
const dynamicCacheLimit = 18;

// Install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

// Activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            keys.map((key => {
                if (key !== staticCacheName && key !== dynamicCacheName) {
                    return caches.delete(key); //Deleting the old cache (cache v1)
                }
            }))
        })
    )
});

// Intercept fetch 
self.addEventListener('fetch', evt => {
    evt.respondWith(
        fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
                return caches.match(evt.request).then(function(result) {
                    if (result) {
                        return result;
                    } else {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, dynamicCacheLimit);
                        return fetchRes; 
                    }
                });
            });
        }).catch(function() {
            return caches.match(evt.request).catch((error) => {
                console.info(error)
                return caches.match('/img/fallbackImage.png');
            });
        })        
    );
});