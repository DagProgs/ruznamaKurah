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
    "revision": "4250d320ea4c0c655f0a7495a385def3"
  },
  {
    "url": "css/style.css",
    "revision": "365ad46ea4ecf2497897b116869a9a06"
  },
  {
    "url": "js/accordion.js",
    "revision": "7b6c7076f2a35632b36f49d6e7f2b099"
  },
  {
    "url": "js/dayruznama.js",
    "revision": "ac964b7f0da9833ef244841320d561a2"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "0732e3eabbf8aa7ce7f69eedbd07dfdd"
  },
  {
    "url": "img/icons/android-launchericon-144-144.png",
    "revision": "8aa0c04fd358d0ac0dea4d360e5fb419"
  },
  {
    "url": "img/icons/android-launchericon-192-192.png",
    "revision": "a5f847807405588c9f1c38eac93b6768"
  },
  {
    "url": "img/icons/android-launchericon-48-48.png",
    "revision": "abb95a38dee43c83fa11948b30f1c746"
  },
  {
    "url": "img/icons/android-launchericon-512-512.png",
    "revision": "4f684c9918e559764f3aa80e96e73eb8"
  },
  {
    "url": "img/icons/android-launchericon-72-72.png",
    "revision": "b46ad7977dcc7e574313611f982960c4"
  },
  {
    "url": "img/icons/android-launchericon-96-96.png",
    "revision": "8cbdc0671faead1df83d006a1443f6f4"
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
