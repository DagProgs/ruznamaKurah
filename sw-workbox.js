importScripts('workbox-v4.3.1/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/'
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
    "url": "img/favicon.ico",
    "revision": "1d106d6b50c150a91366af73e6f25e0b"
  },
  {
    "url": "index.html",
    "revision": "ab79d01cd73e4230e0b1db77b3f9c940"
  },
  {
    "url": "mounth.html",
    "revision": "d22c3ce7c144b027cd8dea229ec5e4d7"
  },
  {
    "url": "year.html",
    "revision": "d05c8150a446a26e0d2aa1873ceddaac"
  },
  {
    "url": "data/derbent.json",
    "revision": "ecd13ab83a5369e4baad3df7a138f693"
  },
  {
    "url": "data/izberbash.json",
    "revision": "233f8cbbea5d809f6cb3887c49014534"
  },
  {
    "url": "data/kaspiysk.json",
    "revision": "412aa8c57e7d88fb559adff034c6e8af"
  },
  {
    "url": "data/kurah.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
  },
  {
    "url": "data/makhachkala.json",
    "revision": "a6c29888d765175ca7f778b3ba9cc837"
  },
  {
    "url": "data/s.stalsk.json",
    "revision": "cece35168dea92cca3964394dc4f509e"
  },
  {
    "url": "manifest.json",
    "revision": "dd1d1cf3ea8f261b54748f6c61f211e8"
  },
  {
    "url": "css/styles.css",
    "revision": "02f378e9ca6c67d7f599c04699937d55"
  },
  {
    "url": "js/prayer-times/day.js",
    "revision": "8a8ced03a3caa3597d89e45d306ad58d"
  },
  {
    "url": "js/prayer-times/mounth.js",
    "revision": "4a721906e090e6316c84edac72552d99"
  },
  {
    "url": "js/prayer-times/yer.js",
    "revision": "3da38d94765868aeacde12f83fd04a8e"
  },
  {
    "url": "js/system/jquery-3.7.1.min.js",
    "revision": "c9a1b0aa0167c8a4df724d18d06814a8"
  },
  {
    "url": "js/system/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/system/prefixfree.min.js",
    "revision": "99ea8d1961f9bb4e61f0512d1870aaf4"
  },
  {
    "url": "js/theme.js",
    "revision": "4dc2d1bb6cbc416b7ee56dc22a7a7c92"
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
    "url": "pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "update.js",
    "revision": "2e37a1e61c0f6c88bddbb61150536944"
  },
  {
    "url": "img/svg/mounth.svg",
    "revision": "28b9786d0a8b41c97a7a7801711a1f8a"
  },
  {
    "url": "img/svg/year.svg",
    "revision": "8b97737e3fc289d58f9aaad12ea0d411"
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
