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
    "revision": "aa492b588d1d551100b214a8a8de87c6"
  },
  {
    "url": "calc.html",
    "revision": "e19deaf7776643cb0b13ad22df95f948"
  },
  {
    "url": "calendar.html",
    "revision": "fd6568cbc27e95120d2e7d0f0e0ebd23"
  },
  {
    "url": "offline.html",
    "revision": "fdc5cd2c30b4d683af04232b15e27dfb"
  },
  {
    "url": "tasbih.html",
    "revision": "22998e3be94fe0a3d0ffb1c4b9ff729d"
  },
  {
    "url": "video.html",
    "revision": "7840150bc8f84aeb729b76fccd3fcf0b"
  },
  {
    "url": "manifest.json",
    "revision": "f26c504fd3ea38f792455b69f3cd9155"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
  },
  {
    "url": "css/style.css",
    "revision": "6ef2ff30d5b69166df4b9a4454a4c6d7"
  },
  {
    "url": "js/calc.js",
    "revision": "302af459d130c527a97a9f0ed027de52"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "c414a52ee43d8f2937abecf566be2046"
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
    "url": "js/end-time.js",
    "revision": "d66d69aa30c7937d7f1e4e564e677ef7"
  },
  {
    "url": "js/jumma.js",
    "revision": "4ca73997ba1a396515f91316c50cea6a"
  },
  {
    "url": "js/min/jquery-3.7.1.min.js",
    "revision": "2c872dbe60f4ba70fb85356113d8b35e"
  },
  {
    "url": "js/min/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/min/prefixfree.min.js",
    "revision": "c133bc0d840e28562c1c75c70173507d"
  },
  {
    "url": "js/modal-reklama.js",
    "revision": "dac3bd67b778998061d249a74fa450d2"
  },
  {
    "url": "js/mounths-names.js",
    "revision": "dca606af43f0631a25eb1bbdede7ba5a"
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
    "url": "js/prayer-times-year.js",
    "revision": "9982a9853e313e1671e51d446096e3b3"
  },
  {
    "url": "js/system/accordion.js",
    "revision": "ef7dadb9a5eb23bf72206844abf005ed"
  },
  {
    "url": "js/system/modal.js",
    "revision": "2f4fbe50167694d06bfef53a59e9dec4"
  },
  {
    "url": "js/system/theme.js",
    "revision": "89dad9ae0fc8b084ec4ec7d593008acf"
  },
  {
    "url": "js/tasbih.js",
    "revision": "24b0a664cc01ed81fd708a334b14175b"
  },
  {
    "url": "img/back.svg",
    "revision": "6701e569a9bb8e6b056d39607805bf71"
  },
  {
    "url": "img/fon.jpg",
    "revision": "257258e174ebcc2d97d54dc4d7052da3"
  },
  {
    "url": "img/svg/dark.svg",
    "revision": "dcfa7a4c3f3e9ff810900427126de6c0"
  },
  {
    "url": "img/svg/light.svg",
    "revision": "bf5c6d038a905bd193b0350df31fe6db"
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
    "revision": "0bf1bea41b1ba758d3989814c988f46e"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "update.js",
    "revision": "292a54366527e52ade23e3025af48f31"
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
