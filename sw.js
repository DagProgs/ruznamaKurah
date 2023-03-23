const staticCacheName = 'srk-v5';
const dynamicCacheName = 'drk-v5';
const staticAssets = [
	'./',
	'./index.html',
	'./offline.html',
	'./accordion.js',
	'./dayruznama.js',
	'./jquery-3.6.0.min.js',
	'./js/sb/ruznama_k.db',
	'./css/style.css'
]

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
	event.respondWith((async () => {
	
	const r = await caches.match(event.request);
	if (r) { return r; }
	
	
	const response = await fetch(e.request);
	const cache = await caches.open(cacheName);
	cache.put(e.request, response.clone());
	return response;
	
	})());
});