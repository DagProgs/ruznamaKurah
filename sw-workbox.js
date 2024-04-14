importScripts('./workbox-v4.3.1/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: './workbox-v4.3.1/',
  debug: true
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "b9ecf1b9d29e9e99c4c7f9992f4d600e"
  },
  {
    "url": "yt.html",
    "revision": "990dbceed67668257a21ce061226e544"
  },
  {
    "url": "manifest.json",
    "revision": "9d772f22a6e9165682832eecf7d5bbd7"
  },
  {
    "url": "css/plyr.css",
    "revision": "b762f4687b3d9c3c834acb09af73cc40"
  },
  {
    "url": "css/style.css",
    "revision": "b093cabec4ce4ce131ae10c05235ecc8"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "9b3ce38c563c200320cdd395088c6b4c"
  },
  {
    "url": "js/calendar-ru.js",
    "revision": "5bd13c7dcb3b833600275783ac045d92"
  },
  {
    "url": "js/clock.js",
    "revision": "099265fb106f32c7a8fa7b31da037e2e"
  },
  {
    "url": "js/end-time.js",
    "revision": "8cddfed8ae4a3b05a90cfed52bf4166b"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "8fb8fee4fcc3cc86ff6c724154c49c42"
  },
  {
    "url": "js/juma.js",
    "revision": "971acee4cf24bb83e115762d4bd5d73e"
  },
  {
    "url": "js/menu.js",
    "revision": "499807da0ba790c0c07a214379433cd9"
  },
  {
    "url": "js/prayer-days.js",
    "revision": "ba2f1d5c32300b2a6a1787e80a8687d9"
  },
  {
    "url": "js/prayer-times-mounths.js",
    "revision": "6259c5e99da1d6f51115a235005e5f81"
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
    "revision": "f64644972655feea2b492bb9b0a40250"
  },
  {
    "url": "img/close.svg",
    "revision": "bac90ed061e57fe65ecaff5d346cefbe"
  },
  {
    "url": "img/menu.svg",
    "revision": "0d0c07eff7cd14e968ad846a9e5db4c0"
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

workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
);

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
