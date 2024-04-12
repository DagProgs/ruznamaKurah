importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

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
    "revision": "dd722eb11031b1a45862492da2d5b67e"
  },
  {
    "url": "css/style.css",
    "revision": "682a1353c662cd441168254fe444cb12"
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
    "url": "js/jquery-3.6.0.min.js",
    "revision": "0732e3eabbf8aa7ce7f69eedbd07dfdd"
  },
  {
    "url": "js/juma.js",
    "revision": "4ca73997ba1a396515f91316c50cea6a"
  },
  {
    "url": "js/line-timer.js",
    "revision": "8cddfed8ae4a3b05a90cfed52bf4166b"
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
    "revision": "9d6cf2623bbc4a07024db2e22b665528"
  },
  {
    "url": "img/2.svg",
    "revision": "dd961ae7704d410f30cdcdd0c2a03442"
  },
  {
    "url": "img/3.svg",
    "revision": "dccc52ad0d1e7833c3487205115476ac"
  },
  {
    "url": "img/4.svg",
    "revision": "96c0c04db09822cdb186a0ce09a6f200"
  },
  {
    "url": "img/5.svg",
    "revision": "0741eda4d223da81339630b201f9e09d"
  },
  {
    "url": "img/6.svg",
    "revision": "1a376188e87b6cea6866e32fbc9b6f98"
  },
  {
    "url": "img/ramadan.png",
    "revision": "68c6547f6d4931e9f9aec5e5913b48e1"
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



workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://storage.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googlefonts',
  })
);

workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/images'),
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
  })
);




// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
