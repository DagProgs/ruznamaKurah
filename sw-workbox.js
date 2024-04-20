importScripts('./workbox-v4.3.1/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: './workbox-v4.3.1/'
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
    "revision": "57e1ad414019920e89f57af94c0fdf8b"
  },
  {
    "url": "calc.html",
    "revision": "d5c092e7b5bde0d464c1f514c18d7226"
  },
  {
    "url": "calendar.html",
    "revision": "dd9f6bbb702674153ddc8bda5848ad86"
  },
  {
    "url": "compass.html",
    "revision": "5f69bdc19266f5b8fc162504b15c07f2"
  },
  {
    "url": "mounth.html",
    "revision": "62a8ad288e6514491a129195aa6c61a1"
  },
  {
    "url": "offline.html",
    "revision": "b6ed7f462ddf7c7fb04e4915c8662697"
  },
  {
    "url": "tasbih.html",
    "revision": "fe007c7e02d70ed75085884e4cd9f609"
  },
  {
    "url": "video.html",
    "revision": "ea511ed273c4ffc936b7fa584cac3947"
  },
  {
    "url": "year.html",
    "revision": "1c54a1673d1f7ee2809d4f05aabdaa5a"
  },
  {
    "url": "manifest.json",
    "revision": "f320089ad502cabf5878a44b48f73731"
  },
  {
    "url": "css/style.css",
    "revision": "9e14ef3c3fc054f1055b9f03664d0ebe"
  },
  {
    "url": "js/calc.js",
    "revision": "302af459d130c527a97a9f0ed027de52"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "9f71cc48d5846ddcc3c22547dd52c88f"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "5bd13c7dcb3b833600275783ac045d92"
  },
  {
    "url": "js/calendar.js",
    "revision": "6b968a30943442c651937ed37f215f93"
  },
  {
    "url": "js/clock.js",
    "revision": "099265fb106f32c7a8fa7b31da037e2e"
  },
  {
    "url": "js/compass.js",
    "revision": "61771ca58c858962d8ec364c74d719cb"
  },
  {
    "url": "js/end-time.js",
    "revision": "8cddfed8ae4a3b05a90cfed52bf4166b"
  },
  {
    "url": "js/jquery-3.7.1.min.js",
    "revision": "2c872dbe60f4ba70fb85356113d8b35e"
  },
  {
    "url": "js/juma.js",
    "revision": "4ca73997ba1a396515f91316c50cea6a"
  },
  {
    "url": "js/menu.js",
    "revision": "b294147672e2c9eeba6fedcf5623bce9"
  },
  {
    "url": "js/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/mounths-names.js",
    "revision": "a8a3895aef09d25d61403da5dbfb5210"
  },
  {
    "url": "js/online-offline.js",
    "revision": "7bc120e94570c896948416031f40ef1b"
  },
  {
    "url": "js/prayer-days.js",
    "revision": "cf89284cf51a14609971ffee10e66fd8"
  },
  {
    "url": "js/prayer-times-mounths.js",
    "revision": "e0594737db41bd586e6a82b0536ddf45"
  },
  {
    "url": "js/prayer-year.js",
    "revision": "623a773a02cd05649db71f098225e5f6"
  },
  {
    "url": "js/prefixfree.min.js",
    "revision": "c133bc0d840e28562c1c75c70173507d"
  },
  {
    "url": "js/tasbih.js",
    "revision": "1e978dae441ecadddc4f6505f34714e8"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
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
    "revision": "db409cd90d613a43e7a19c449e074441"
  },
  {
    "url": "img/1.svg",
    "revision": "ca0ec45cd521c6f4be1dec19ab2e63f8"
  },
  {
    "url": "img/2.svg",
    "revision": "a2a2a2ecb6c758d519b8c4623ca54086"
  },
  {
    "url": "img/3.svg",
    "revision": "ed57ca4dae496d5645e4da282e063ef0"
  },
  {
    "url": "img/4.svg",
    "revision": "be3d080a27ad98b431e1216e5b49a4f5"
  },
  {
    "url": "img/5.svg",
    "revision": "3f7c8b0595e8904423c7b5ebdc15d0d2"
  },
  {
    "url": "img/6.svg",
    "revision": "e35ffe5a9a0fb69091824b26cc26e1eb"
  },
  {
    "url": "img/back.svg",
    "revision": "abd3b1b232415b6603af511c6f18b5a7"
  },
  {
    "url": "img/mounth.svg",
    "revision": "e73b302b239df27bb22824f2f22d1a08"
  },
  {
    "url": "img/purepng.com-compasscompassinstrumentnavigationcardinal-directionspointsdiagram-1701527842316onq7x.png",
    "revision": "2ea2bfd8a214313df7cb836d679d1d8d"
  },
  {
    "url": "img/solat.png",
    "revision": "da087a1197c1d940c6d7791761635e87"
  },
  {
    "url": "img/year.svg",
    "revision": "505acc4fd4a08ba225ba2b98ae8c94f6"
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
