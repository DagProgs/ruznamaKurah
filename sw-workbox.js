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
    "revision": "d944ee4af700a49921203e3c994aeb98"
  },
  {
    "url": "mounth.html",
    "revision": "f4ab63cb7b5dde88cb4b8e4e60397e78"
  },
  {
    "url": "year.html",
    "revision": "1d3db52aa68ab35911a3bb03066593bd"
  },
  {
    "url": "times.html",
    "revision": "a2fced8ceeda3f5f585e488a50887a06"
  },
  {
    "url": "calendar.html",
    "revision": "addcbfb9033b70ca38170e9ba844f923"
  },
  {
    "url": "manifest.json",
    "revision": "df0933f2f940a459ffe5daa8f2a1d6b5"
  },
  {
    "url": "css/styles.css",
    "revision": "c73b3c24f3fd75eb9ee944b692871813"
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
    "url": "js/calendar-calendar.js",
    "revision": "0a3d3310365545820a52dd94c67ae06c"
  },
  {
    "url": "js/calendar.js",
    "revision": "d5ebfb1e75f414efbfaa581207e17c74"
  },
  {
    "url": "js/end-time.js",
    "revision": "553fd369909c5276977bd1b96501163e"
  },
  {
    "url": "js/jquery-3.6.0.min.js",
    "revision": "8fb8fee4fcc3cc86ff6c724154c49c42"
  },
  {
    "url": "js/json/prayer-times.json",
    "revision": "fa29c9bf6a50f842418b4f0c6a632167"
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
    "url": "js/mounths-names.js",
    "revision": "dca606af43f0631a25eb1bbdede7ba5a"
  },
  {
    "url": "js/na-ves-akran.js",
    "revision": "418ed2f7f4acf109aad99a5c318d630e"
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
    "url": "js/reklama.js",
    "revision": "951755aaf9be72e669d3cbe8f5b521a8"
  },
  {
    "url": "js/times-index.js",
    "revision": "778ff2aa513fdf904d747f721ada20c6"
  },
  {
    "url": "js/times-times.js",
    "revision": "1f1d1406f79c9b16cc8a58b6cf81bd17"
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
    "url": "img/svg/menu-add.svg",
    "revision": "122d3ea208c1ec64e1973084437f1d96"
  },
  {
    "url": "img/svg/menu-fold.svg",
    "revision": "c3e681e21fc603267c213f7b94573b87"
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
    "url": "timesprayer/1/1.json",
    "revision": "df9239eb52f0542f87c4fe097e1a8be4"
  },
  {
    "url": "timesprayer/1/10.json",
    "revision": "8bc776dda03d869128da9b10c869dbcd"
  },
  {
    "url": "timesprayer/1/11.json",
    "revision": "6ec907d086e0c27048a3b76645ca1beb"
  },
  {
    "url": "timesprayer/1/12.json",
    "revision": "41f9d028cd0188c069a380805e37fdc7"
  },
  {
    "url": "timesprayer/1/2.json",
    "revision": "9329dc6377d4453f99ed55468f8a8be2"
  },
  {
    "url": "timesprayer/1/3.json",
    "revision": "a91d7cb08c035b9584cabbb3d20fc67e"
  },
  {
    "url": "timesprayer/1/4.json",
    "revision": "1f8b21dca0f8b124f89392fd014ec332"
  },
  {
    "url": "timesprayer/1/5.json",
    "revision": "5d9de3e00ffaef63b0bcfd48b8717e18"
  },
  {
    "url": "timesprayer/1/6.json",
    "revision": "6950f21c0e0f908f885100e8e62e750d"
  },
  {
    "url": "timesprayer/1/7.json",
    "revision": "4bbfbcb4555da65028c7da1d244d977c"
  },
  {
    "url": "timesprayer/1/8.json",
    "revision": "d1eeae662d9940dacd571516fddee6f9"
  },
  {
    "url": "timesprayer/1/9.json",
    "revision": "852763fdb71f93a0a8de328fec0eb6f8"
  },
  {
    "url": "timesprayer/2/1.json",
    "revision": "4fb4526d50585365f6ed418e9b9bcc04"
  },
  {
    "url": "timesprayer/2/10.json",
    "revision": "9ddb65927d93e17634fd44ce07597d2a"
  },
  {
    "url": "timesprayer/2/11.json",
    "revision": "1cfbc060635447b4bd4fc13ace993b59"
  },
  {
    "url": "timesprayer/2/12.json",
    "revision": "5c7d3a4549e1ad0f8f16c2189e062200"
  },
  {
    "url": "timesprayer/2/2.json",
    "revision": "9e53f6dbc9b53475f55cafe5653dd876"
  },
  {
    "url": "timesprayer/2/3.json",
    "revision": "573af4b7f7d31724c0a12382f1e8cfc8"
  },
  {
    "url": "timesprayer/2/4.json",
    "revision": "98ed312451e8910a5a1b316292467c0b"
  },
  {
    "url": "timesprayer/2/5.json",
    "revision": "73efb0b4afb37c80488df70198985306"
  },
  {
    "url": "timesprayer/2/6.json",
    "revision": "d908f3fd8dc379af9abb93e200663c56"
  },
  {
    "url": "timesprayer/2/7.json",
    "revision": "22febfe909e834cbd13f156667055172"
  },
  {
    "url": "timesprayer/2/8.json",
    "revision": "4d61235b1dc47c1b67a0593a0b043630"
  },
  {
    "url": "timesprayer/2/9.json",
    "revision": "3d94127551ae49cef104cd96bf1efb49"
  },
  {
    "url": "timesprayer/3/1.json",
    "revision": "dcbea882f7549b5812cfad817498f945"
  },
  {
    "url": "timesprayer/3/10.json",
    "revision": "2c71b4253dee481f2fc2433c281da238"
  },
  {
    "url": "timesprayer/3/11.json",
    "revision": "a21012f1d5d4e00e2bd696cbb1c352e7"
  },
  {
    "url": "timesprayer/3/12.json",
    "revision": "9f88c89d5f6dc32fd0260e950a9d471b"
  },
  {
    "url": "timesprayer/3/2.json",
    "revision": "290f0ba7674a573bf88b81017be3ef89"
  },
  {
    "url": "timesprayer/3/3.json",
    "revision": "600dea575f9e6c50b110d5cc56ee05ce"
  },
  {
    "url": "timesprayer/3/4.json",
    "revision": "c28d57670b5aa8cec9a904e8f97854d7"
  },
  {
    "url": "timesprayer/3/5.json",
    "revision": "a96203cacfccdb4e7173d97fbd4ba610"
  },
  {
    "url": "timesprayer/3/6.json",
    "revision": "7673c1f5cb43e7659d071aa8e6ef1d11"
  },
  {
    "url": "timesprayer/3/7.json",
    "revision": "ac5f357d40f56b74d6f39022d2ce0d2d"
  },
  {
    "url": "timesprayer/3/8.json",
    "revision": "fb92da07d19f030455e85cf6bb5dd6b9"
  },
  {
    "url": "timesprayer/3/9.json",
    "revision": "283222d0893d153a38d8f33dc9607a57"
  },
  {
    "url": "timesprayer/4/1.json",
    "revision": "d5d59d05cd1755a950f490a651024175"
  },
  {
    "url": "timesprayer/4/10.json",
    "revision": "57495a098c6b01ae622ee28a311ff146"
  },
  {
    "url": "timesprayer/4/11.json",
    "revision": "9945950aad85f47f6e960064d4419947"
  },
  {
    "url": "timesprayer/4/12.json",
    "revision": "557ccf4c940b3c67bd1482ccac6c4fb1"
  },
  {
    "url": "timesprayer/4/2.json",
    "revision": "a2c3dac927c6e06c9668fb25c2ea318a"
  },
  {
    "url": "timesprayer/4/3.json",
    "revision": "6c90e2f6a855daf716d400a3a4f4e5bd"
  },
  {
    "url": "timesprayer/4/4.json",
    "revision": "e9fce98823dfdee47a1fbe1243d9e242"
  },
  {
    "url": "timesprayer/4/5.json",
    "revision": "80bb85690e6cf002f5ac184b6ea58481"
  },
  {
    "url": "timesprayer/4/6.json",
    "revision": "e6f61028ae7e527370bfb54378874a9d"
  },
  {
    "url": "timesprayer/4/7.json",
    "revision": "17e01b081e53edd2f5d2bcc36906b6cf"
  },
  {
    "url": "timesprayer/4/8.json",
    "revision": "4c07ed096212eefe14bb48d637a05632"
  },
  {
    "url": "timesprayer/4/9.json",
    "revision": "1a29f551551a17639d5eff2ce9cdaaf5"
  },
  {
    "url": "timesprayer/6/1.json",
    "revision": "b86cd5b938766f6e461efccf48be4521"
  },
  {
    "url": "timesprayer/6/10.json",
    "revision": "5cd9b552d66ab19ea51373ed2f56a505"
  },
  {
    "url": "timesprayer/6/11.json",
    "revision": "223adb9938b399ff3f5a392525cc5f90"
  },
  {
    "url": "timesprayer/6/12.json",
    "revision": "fca3e1873b584aa50fff5e31e1a1f0f6"
  },
  {
    "url": "timesprayer/6/2.json",
    "revision": "5ee9dbd39310f59b1149e6d99a2d2b56"
  },
  {
    "url": "timesprayer/6/3.json",
    "revision": "9afac99f2ecfdf90649b5a8357cd3a7b"
  },
  {
    "url": "timesprayer/6/4.json",
    "revision": "6ef32a59beed07866d3c7a1aee87660a"
  },
  {
    "url": "timesprayer/6/5.json",
    "revision": "6983ab97da95f569f644df494bf7a478"
  },
  {
    "url": "timesprayer/6/6.json",
    "revision": "80e0017574b15a23e16d907223034fce"
  },
  {
    "url": "timesprayer/6/7.json",
    "revision": "168e8ac2fac3112a13de3667d0bcccaf"
  },
  {
    "url": "timesprayer/6/8.json",
    "revision": "596fab5a4df1fd3e582854b358d77d3b"
  },
  {
    "url": "timesprayer/6/9.json",
    "revision": "05a7e5a8d4c8560abf6d4852be2b52fc"
  },
  {
    "url": "timesprayer/localization.json",
    "revision": "633ca28980a130874e120d33a7b86c35"
  },
  {
    "url": "fonts/evolventa/bold/evolventa-bold.otf",
    "revision": "42ae20e2909821f794acdde1c25a2285"
  },
  {
    "url": "fonts/evolventa/bold/evolventa-bold.svg",
    "revision": "42ae20e2909821f794acdde1c25a2285"
  },
  {
    "url": "fonts/evolventa/bold/evolventa-bold.ttf",
    "revision": "42ae20e2909821f794acdde1c25a2285"
  },
  {
    "url": "fonts/evolventa/bold/evolventa-bold.woff",
    "revision": "42ae20e2909821f794acdde1c25a2285"
  },
  {
    "url": "fonts/evolventa/bold/evolventa-bold.woff2",
    "revision": "42ae20e2909821f794acdde1c25a2285"
  },
  {
    "url": "fonts/evolventa/normal/evolventa-normal.otf",
    "revision": "8324b41b96fe2e1232af47360042457c"
  },
  {
    "url": "fonts/evolventa/normal/evolventa-normal.svg",
    "revision": "8324b41b96fe2e1232af47360042457c"
  },
  {
    "url": "fonts/evolventa/normal/evolventa-normal.ttf",
    "revision": "8324b41b96fe2e1232af47360042457c"
  },
  {
    "url": "fonts/evolventa/normal/evolventa-normal.woff",
    "revision": "8324b41b96fe2e1232af47360042457c"
  },
  {
    "url": "fonts/evolventa/normal/evolventa-normal.woff2",
    "revision": "8324b41b96fe2e1232af47360042457c"
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
