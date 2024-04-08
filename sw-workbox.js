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
    "revision": "a1b1a5516e4344c6a423f45770f5b27d"
  },
  {
    "url": "manifest.json",
    "revision": "9146b2f64d5399c7222425f415f9a9f8"
  },
  {
    "url": "css/style.css",
    "revision": "e582bd18df4f64de9fd36d7c5179ea7d"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "354b6295d66a7a9fb054ee57f3c7001a"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "a00564cbe2169a01b57b03b148cfb6fa"
  },
  {
    "url": "js/clock.js",
    "revision": "59cec707bbaf501a5fd944e9b573b62e"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "8fb8fee4fcc3cc86ff6c724154c49c42"
  },
  {
    "url": "js/line-timer.js",
    "revision": "b3305349138e5e3c0fbabc094f3e8a8d"
  },
  {
    "url": "js/prayer-days.js",
    "revision": "70fe03d94140ba637b638ad0545f9058"
  },
  {
    "url": "js/prayer-times-mounths.js",
    "revision": "7ed9d0e8bc6545156595e8fbd36cd55c"
  },
  {
    "url": "update.js",
    "revision": "99e339283bc892b4f93ee0ceaedbd0ca"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "fa29c9bf6a50f842418b4f0c6a632167"
  },
  {
    "url": "img/1.svg",
    "revision": "bce40a862445411ec686482c02cb588f"
  },
  {
    "url": "img/2.svg",
    "revision": "fc59ee299076adf26ae064f8c68f6165"
  },
  {
    "url": "img/3.svg",
    "revision": "f7a39f3588a86b33a524b33b256ac77a"
  },
  {
    "url": "img/4.svg",
    "revision": "434f3c80313dfecce4ed0e457ff46f6e"
  },
  {
    "url": "img/5.svg",
    "revision": "724c9ad02feec579f2543988e375b352"
  },
  {
    "url": "img/6.svg",
    "revision": "b37a0352904a124bf991b809fad2bec4"
  },
  {
    "url": "img/ramadan.png",
    "revision": "be633c928304412f00ce027321c3ff3e"
  },
  {
    "url": "img/screen.png",
    "revision": "21909f0bd0f04a0c9873d2abe38a82db"
  },
  {
    "url": "img/solat.png",
    "revision": "da087a1197c1d940c6d7791761635e87"
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
