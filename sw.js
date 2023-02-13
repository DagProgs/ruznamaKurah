var urlsToCache = [
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

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache')
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {

var validCaches = ['home-cache-v2', 'articles-cache-v2'];

  event.waitUntil(
    caches.keys().then(keys => 
    Promise.all(keys.map(key => {
        if (validCaches.indexOf(key) === -1) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      // We successfully deleted all the obsolete caches
    })
  );
});

navigator.serviceWorker.getRegistration()
   .then(function(registration) {
       if(registration){
          registration.unregister()
          .then(
               function(success) {
                 if ('caches' in window) {
    caches.keys()
      .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
              return caches.delete(key);
          }));
      })
}
                });
          }
    });



