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
    "revision": "23ce58475484ae72a7e4e195d7542f52"
  },
  {
    "url": "css/style.css",
    "revision": "131e787008a7cf5d5a4878b5b75df2b7"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "88ecc4a72b19f784466094cbedb8c715"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "21f8150a08ce439bbb79a233c8db580e"
  },
  {
    "url": "js/clock.js",
    "revision": "59cec707bbaf501a5fd944e9b573b62e"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "0732e3eabbf8aa7ce7f69eedbd07dfdd"
  },
  {
    "url": "js/prayer-times-day.js",
    "revision": "d6f92eb7cdc124fd8dabd30b85f6ed27"
  },
  {
    "url": "js/prayer-times-mounth.js",
    "revision": "33471f2a113a80acf05f085b84674ef9"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "fa29c9bf6a50f842418b4f0c6a632167"
  },
  {
    "url": "main.js",
    "revision": "80846bb3403b82a07c7f84658f186b23"
  },
  {
    "url": "polyfills.js",
    "revision": "56f34b0f4d3a42d45bfdb1782adaa173"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "manifest.json",
    "revision": "818f682f702fff52c18507baf4e42433"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "25c8eb241d5e0c913da717f6007736b2"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "6e606e6871ccc1fdc7222dee1d72d42e"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "33b8202ee77c28c332a4fa3efee61d34"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "c5d401eb140c47f0d0a1b8880b5c8b49"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "47f069d621e0e363d1f0b560be4335dc"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "84f212482ada6ec3913a2a76d4b89c0d"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "9c82c0475577731db0e52b9fa62e8c05"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "9815fb3c4b57df1e8cda23d01fc66078"
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
