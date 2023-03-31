importScripts('workbox-v4.3.0/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.0/'
});

// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "da02ca10d85758b031a2ded55676a8f7"
  },
  {
    "url": "css/style.css",
    "revision": "5ee31a3cf62c3aaca3f228b25bf676f7"
  },
  {
    "url": "js/accordion.js",
    "revision": "7b6c7076f2a35632b36f49d6e7f2b099"
  },
  {
    "url": "js/data-ru.clock.js",
    "revision": "d6b5e942b5cee2a7f7470c49bee1348a"
  },
  {
    "url": "js/dayruznama.js",
    "revision": "bee1b709a4beb0625c72bb63f1d42b8b"
  },
  {
    "url": "js/hijri.js",
    "revision": "22160ccd8745afbf08d7653b08b4f5df"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "0732e3eabbf8aa7ce7f69eedbd07dfdd"
  },
  {
    "url": "js/jquery.hijri.date.min.js",
    "revision": "e1382399f8832a5378e2e1df0f833225"
  },
  {
    "url": "js/prayer.times.linear.colors.js",
    "revision": "1e05f29099ad0d1fb5f2e2ea1afa854b"
  },
  {
    "url": "js/share.js",
    "revision": "faac381b78ec2ebba6aad90c28257680"
  },
  {
    "url": "img/hiasan.png",
    "revision": "68a642d1aa582d801540584db10abe19"
  },
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "img/icons/icon-284x284.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "img/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "img/icons/icon-48x48.png",
    "revision": "89428bb1e2be1296fb147effedac4a0f"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
  },
  {
    "url": "img/rolling-dots.gif",
    "revision": "c8b0d07f8a41e35a693cb7e36811eb88"
  },
  {
    "url": "img/update.svg",
    "revision": "dd0041bacce10287c9794f63fb667e7d"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
)

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
