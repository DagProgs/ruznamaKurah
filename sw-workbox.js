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
    "revision": "051e2ed529bfbac2d0f80984136e6a28"
  },
  {
    "url": "mounth.html",
    "revision": "c85e56ecce252696cfa0c1420058e904"
  },
  {
    "url": "year.html",
    "revision": "17e227464c00f0bb703388916fe1a7eb"
  },
  {
    "url": "calendar.html",
    "revision": "8344930798d1053d8e4f03da3205ee16"
  },
  {
    "url": "manifest.json",
    "revision": "e107cc52e5d02752492365b71f8b2db5"
  },
  {
    "url": "css/styles.css",
    "revision": "ae0ddbbe4f97fab1020de845230f041c"
  },
  {
    "url": "js/calendar-ar.js",
    "revision": "9f71cc48d5846ddcc3c22547dd52c88f"
  },
  {
    "url": "js/calendar-calendar.js",
    "revision": "0a3d3310365545820a52dd94c67ae06c"
  },
  {
    "url": "js/calendar.js",
    "revision": "d5ebfb1e75f414efbfaa581207e17c74"
  },
  {
    "url": "js/index.js",
    "revision": "2c98b884e6f96434a9d7809168b9bc06"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "8fb8fee4fcc3cc86ff6c724154c49c42"
  },
  {
    "url": "js/json/kurah.min.json",
    "revision": "9fa73418c1118fd575680d525f2e9eee"
  },
  {
    "url": "js/json/makhachkala.min.json",
    "revision": "a6c29888d765175ca7f778b3ba9cc837"
  },
  {
    "url": "js/jumma.js",
    "revision": "4ca73997ba1a396515f91316c50cea6a"
  },
  {
    "url": "js/modal-description-prayer.js",
    "revision": "fd0d152da3bf655df1a4d8c3bedae136"
  },
  {
    "url": "js/modernizr.min.js",
    "revision": "65f1d21d5fcc9d21da758adababd0c3c"
  },
  {
    "url": "js/mounth.js",
    "revision": "2492ae14b858739e2837e047ffa8bb86"
  },
  {
    "url": "js/prefixfree.min.js",
    "revision": "99ea8d1961f9bb4e61f0512d1870aaf4"
  },
  {
    "url": "js/reklama.js",
    "revision": "951755aaf9be72e669d3cbe8f5b521a8"
  },
  {
    "url": "js/year.js",
    "revision": "671da6e030e922119b01c44620930fe9"
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
    "url": "img/ramadan.png",
    "revision": "68a642d1aa582d801540584db10abe19"
  },
  {
    "url": "img/svg/calendar.svg",
    "revision": "61f05b037be052de95f1020b7dd10b94"
  },
  {
    "url": "img/svg/menu-close.svg",
    "revision": "c3e681e21fc603267c213f7b94573b87"
  },
  {
    "url": "img/svg/menu-open.svg",
    "revision": "122d3ea208c1ec64e1973084437f1d96"
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


// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst({
    cacheName: 'timeline-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60 // 1 день
      })
    ]
  })
);

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst({
    cacheName: 'favorites-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// HTML-страницы (StaleWhileRevalidate)
workbox.routing.registerRoute(
  /\.(?:html)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'html-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10, // Максимум 10 страниц
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 дней
      })
    ]
  })
);

// JSON-файлы (CacheFirst)
workbox.routing.registerRoute(
  /\/js\/json\/.*\.min\.json$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'json-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20, // Максимум 20 JSON-файлов
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// CSS и JavaScript (StaleWhileRevalidate)
workbox.routing.registerRoute(
  /\.(?:css|js)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50, // Максимум 50 файлов
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// Изображения (CacheFirst)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50, // Максимум 50 изображений
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// Шрифты (CacheFirst)
workbox.routing.registerRoute(
  /\.(?:woff|woff2|ttf|eot|otf)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20, // Максимум 20 шрифтов
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// Google Fonts (StaleWhileRevalidate)
workbox.routing.registerRoute(
  /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30, // Максимум 30 файлов
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
      })
    ]
  })
);

// API (NetworkFirst)
workbox.routing.registerRoute(
  /^https:\/\/api\.example\.com\/.*/, // Замените на ваш API URL
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50, // Максимум 50 запросов
        maxAgeSeconds: 24 * 60 * 60 // 1 день
      })
    ]
  })
);

// 3. ОБРАБОТКА ОШИБОК
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        return new Response('Ошибка загрузки файла. Попробуйте позже.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
  
  const title = 'Новое уведомление!';
  const options = {
    body: event.data ? event.data.text() : 'У вас новое уведомление.',
    icon: 'assets/icons/icon-72x72.png', // Укажите путь к иконке уведомления
    badge: 'assets/icons/icon-72x72.png' // Укажите путь к значку уведомления
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
