

const cacheNameToKeep = 'kurahruznama-v2';

//Deletion should only occur at the activate event
self.addEventListener('activate', event => {
    var cacheKeeplist = [cacheName];
    event.waitUntil(
        caches.keys().then( keyList => {
            return Promise.all(keyList.map( key => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
.then(self.clients.claim())); //this line is important in some contexts
});