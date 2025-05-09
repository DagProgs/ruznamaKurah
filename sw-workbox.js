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
    "url": "index.html",
    "revision": "53b57f46e7ce3e8b6fb6cb14e75a12b5"
  },
  {
    "url": "mounth.html",
    "revision": "21756a52586784beab045ec0f897e66b"
  },
  {
    "url": "year.html",
    "revision": "fb5104abe8e8b25550a36955c4955f17"
  },
  {
    "url": "manifest.json",
    "revision": "6f5946cc35dda25c36c200525fbaffdc"
  },
  {
    "url": "css/reset.css",
    "revision": "a4e8ee575d5ceb6554b4b0646aa176c4"
  },
  {
    "url": "css/styles.css",
    "revision": "6d56f4fc4e0f191a2994333dafed1a43"
  },
  {
    "url": "js/accordion.js",
    "revision": "ef7dadb9a5eb23bf72206844abf005ed"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "6d4bb981e034772317710de0f5e33536"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "980524c7b06ae90e2b8d3072fc872e51"
  },
  {
    "url": "js/clock.js",
    "revision": "c30623704c7e7fada499b0b3dd3379d4"
  },
  {
    "url": "js/end-time.js",
    "revision": "3cfcf37da71fd6de3b01152c2be3d9a2"
  },
  {
    "url": "js/jquery-3.7.1.min.js",
    "revision": "c9a1b0aa0167c8a4df724d18d06814a8"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
  },
  {
    "url": "js/jumma.js",
    "revision": "77083ddef0ac434caf31d17e4894fe3a"
  },
  {
    "url": "js/modal-description-prayer.js",
    "revision": "f3bbd02ae731a9bea9b70b25c1a9bf96"
  },
  {
    "url": "js/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/mounths-names.js",
    "revision": "dca606af43f0631a25eb1bbdede7ba5a"
  },
  {
    "url": "js/na-ves-akran.js",
    "revision": "defa1add28ad656cb0f3baef77609943"
  },
  {
    "url": "js/prayer-days.js",
    "revision": "ba2f1d5c32300b2a6a1787e80a8687d9"
  },
  {
    "url": "js/prayer-times-mounths.js",
    "revision": "110b2f2486fb0dffe3fb5739fe4edd22"
  },
  {
    "url": "js/prayer-times-year.js",
    "revision": "9982a9853e313e1671e51d446096e3b3"
  },
  {
    "url": "js/prefixfree.min.js",
    "revision": "99ea8d1961f9bb4e61f0512d1870aaf4"
  },
  {
    "url": "js/reklama.js",
    "revision": "478a0fbbfc979addfbcdfd47fc4c4d42"
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
    "url": "img/1.png",
    "revision": "2f7d7fd5526d17feda258bc14eacb597"
  },
  {
    "url": "img/2.png",
    "revision": "0aa1020c2da12b812d297d5cb27416e9"
  },
  {
    "url": "img/3.png",
    "revision": "cc749dae7aa37ea8f996f07e8cb8ce65"
  },
  {
    "url": "img/4.png",
    "revision": "d3f2c63cafe9e6a8cb252d59dedac65a"
  },
  {
    "url": "img/5.png",
    "revision": "1dc9f96736b1d9ad0faba8acaec3fb2f"
  },
  {
    "url": "img/hiasan.png",
    "revision": "68a642d1aa582d801540584db10abe19"
  },
  {
    "url": "img/mounth.svg",
    "revision": "28b9786d0a8b41c97a7a7801711a1f8a"
  },
  {
    "url": "img/year.svg",
    "revision": "8b97737e3fc289d58f9aaad12ea0d411"
  },
  {
    "url": "fonts/monplesir.otf",
    "revision": "126cb1d646ba54c4a2354879a9f57bcd"
  },
  {
    "url": "fonts/monplesir.svg",
    "revision": "126cb1d646ba54c4a2354879a9f57bcd"
  },
  {
    "url": "fonts/monplesir.ttf",
    "revision": "d8954ca9bec9609b3d415e6deb2b6454"
  },
  {
    "url": "fonts/monplesir.woff",
    "revision": "126cb1d646ba54c4a2354879a9f57bcd"
  },
  {
    "url": "fonts/monplesir.woff2",
    "revision": "126cb1d646ba54c4a2354879a9f57bcd"
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
