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
    "revision": "1bf39bf874fa624cfe3337cdbea92984"
  },
  {
    "url": "css/style.css",
    "revision": "039b3b792ccf1cc864d7f3ecffe4c1a9"
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
