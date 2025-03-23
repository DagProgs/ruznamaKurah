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
    "revision": "190c6a8c8267c8ed1855ef0de859a097"
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
    "revision": "0d35857ded975bfbfeeb89edb8affb20"
  },
  {
    "url": "js/times-times.js",
    "revision": "44c8627eff0f69086d4ed3267d2806d5"
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
    "url": "times/1/1.json",
    "revision": "df9239eb52f0542f87c4fe097e1a8be4"
  },
  {
    "url": "times/1/10.json",
    "revision": "8bc776dda03d869128da9b10c869dbcd"
  },
  {
    "url": "times/1/11.json",
    "revision": "6ec907d086e0c27048a3b76645ca1beb"
  },
  {
    "url": "times/1/12.json",
    "revision": "41f9d028cd0188c069a380805e37fdc7"
  },
  {
    "url": "times/1/2.json",
    "revision": "9329dc6377d4453f99ed55468f8a8be2"
  },
  {
    "url": "times/1/3.json",
    "revision": "a91d7cb08c035b9584cabbb3d20fc67e"
  },
  {
    "url": "times/1/4.json",
    "revision": "1f8b21dca0f8b124f89392fd014ec332"
  },
  {
    "url": "times/1/5.json",
    "revision": "5d9de3e00ffaef63b0bcfd48b8717e18"
  },
  {
    "url": "times/1/6.json",
    "revision": "6950f21c0e0f908f885100e8e62e750d"
  },
  {
    "url": "times/1/7.json",
    "revision": "4bbfbcb4555da65028c7da1d244d977c"
  },
  {
    "url": "times/1/8.json",
    "revision": "d1eeae662d9940dacd571516fddee6f9"
  },
  {
    "url": "times/1/9.json",
    "revision": "852763fdb71f93a0a8de328fec0eb6f8"
  },
  {
    "url": "times/10/1.json",
    "revision": "d93a648bedbac97265f3ec84aaa173a1"
  },
  {
    "url": "times/10/10.json",
    "revision": "bc38590add88de7260cbc0317ba4ce76"
  },
  {
    "url": "times/10/11.json",
    "revision": "3295b4ea12664f312fadc2e269c88368"
  },
  {
    "url": "times/10/12.json",
    "revision": "0f3f0a253dec6f2cea3926060c1815d6"
  },
  {
    "url": "times/10/2.json",
    "revision": "235bb6015bcc12b97d0c08dd2021671f"
  },
  {
    "url": "times/10/3.json",
    "revision": "15b4278b46fb95735f0dea3fec74905f"
  },
  {
    "url": "times/10/4.json",
    "revision": "cf0ddb632b6b5df33804eb13308fdfbd"
  },
  {
    "url": "times/10/5.json",
    "revision": "506c9a4c450032aa8e82905f2b782810"
  },
  {
    "url": "times/10/6.json",
    "revision": "34a985f79fe443557e4c19f3050f3b7e"
  },
  {
    "url": "times/10/7.json",
    "revision": "628964e18c9792bff3fbe65fd6ccc6d2"
  },
  {
    "url": "times/10/8.json",
    "revision": "b750c9057a9ed80b87eaa0d93a23abad"
  },
  {
    "url": "times/10/9.json",
    "revision": "9b9dcd045483f468587dc649eb112ff2"
  },
  {
    "url": "times/11/1.json",
    "revision": "ac1935752cae06cd67316bcb9050e0ca"
  },
  {
    "url": "times/11/10.json",
    "revision": "40c96ceaca7b5a0655ea0b5198eaccf0"
  },
  {
    "url": "times/11/11.json",
    "revision": "75eb95961dd9d09f4fe11710fbef27b8"
  },
  {
    "url": "times/11/12.json",
    "revision": "416f9b2eeaaafd3b91ecf4f34f8629db"
  },
  {
    "url": "times/11/2.json",
    "revision": "20bf06e33b346eca2934e9ab3a00ab82"
  },
  {
    "url": "times/11/3.json",
    "revision": "425ea3a52716df235fa57296682e3969"
  },
  {
    "url": "times/11/4.json",
    "revision": "09c640f871939ba4b95ad85b36ef73a4"
  },
  {
    "url": "times/11/5.json",
    "revision": "fd39cc45d38057d88c61d4a1e6fbfaac"
  },
  {
    "url": "times/11/6.json",
    "revision": "96d662a01f099197cffc20053cd9f752"
  },
  {
    "url": "times/11/7.json",
    "revision": "c0634017cefa041a421292d6a38f45e2"
  },
  {
    "url": "times/11/8.json",
    "revision": "18facb1e4eef50ad7e2509842eea15a1"
  },
  {
    "url": "times/11/9.json",
    "revision": "1ebc7c2f9b0cfcca8ff2acc94603cfe0"
  },
  {
    "url": "times/12/1.json",
    "revision": "c61fb38834145033e66aacd1413a779f"
  },
  {
    "url": "times/12/10.json",
    "revision": "208d67e4e301edb923b2380a239dfdf5"
  },
  {
    "url": "times/12/11.json",
    "revision": "94737b371886688c4625aa777e40324d"
  },
  {
    "url": "times/12/12.json",
    "revision": "b5ef202472429a463a065220adf33f1d"
  },
  {
    "url": "times/12/2.json",
    "revision": "1c370ce7eea2d3d09e676db0101580bb"
  },
  {
    "url": "times/12/3.json",
    "revision": "d14e7c66000a4a2c7805174e995ef137"
  },
  {
    "url": "times/12/4.json",
    "revision": "724bdd6d5d2a5324105a963a74e3643f"
  },
  {
    "url": "times/12/5.json",
    "revision": "a860e81bb837d601e1584e1453f6f2e0"
  },
  {
    "url": "times/12/6.json",
    "revision": "69c445a73ca4b55671789dd9ef64932f"
  },
  {
    "url": "times/12/7.json",
    "revision": "e0b5040c9bb01769e9a2638266bbea42"
  },
  {
    "url": "times/12/8.json",
    "revision": "8f94db40412a13e4705fa21adb752113"
  },
  {
    "url": "times/12/9.json",
    "revision": "2ae80d481309b94ed180c3a4f4ade74f"
  },
  {
    "url": "times/13/1.json",
    "revision": "817f55c0ca2065fd67d62c453c606c02"
  },
  {
    "url": "times/13/10.json",
    "revision": "41055f390d05ee31f3de8df39db82d0e"
  },
  {
    "url": "times/13/11.json",
    "revision": "5f4a6e42984e70c4ac43f8a4e6ce3900"
  },
  {
    "url": "times/13/12.json",
    "revision": "998cbced3f3ab2199fd8aa38df1bca93"
  },
  {
    "url": "times/13/2.json",
    "revision": "3f58d8b0d2e4eb5975dcb1a2da9ab5a5"
  },
  {
    "url": "times/13/3.json",
    "revision": "16cabb835a097149fbacb8adc61acf22"
  },
  {
    "url": "times/13/4.json",
    "revision": "799fdb8b8dc3cf1d4765994cd652cec2"
  },
  {
    "url": "times/13/5.json",
    "revision": "31d583ebd833bb377843bc4328761950"
  },
  {
    "url": "times/13/6.json",
    "revision": "c71489364b8b8c1733d598877fe795bc"
  },
  {
    "url": "times/13/7.json",
    "revision": "f64480700ea78fab83677855121cfa45"
  },
  {
    "url": "times/13/8.json",
    "revision": "605719bf0adc0f5b364ad65004324ecb"
  },
  {
    "url": "times/13/9.json",
    "revision": "5cca1ca1256842453c70b455686547fc"
  },
  {
    "url": "times/14/1.json",
    "revision": "cc80d7c4fa40ed7fcacd23c50f796363"
  },
  {
    "url": "times/14/10.json",
    "revision": "a64143fd8f02fcc5fe020a235f61f60a"
  },
  {
    "url": "times/14/11.json",
    "revision": "65af0f18121a1d0b73db390907da92a0"
  },
  {
    "url": "times/14/12.json",
    "revision": "0067bef8db33fd42e33dafe2db6626f7"
  },
  {
    "url": "times/14/2.json",
    "revision": "7f6b118e7bdfe6980d26ef2151158ad9"
  },
  {
    "url": "times/14/3.json",
    "revision": "b8004f2a1b88c8b95393823d9df57031"
  },
  {
    "url": "times/14/4.json",
    "revision": "4991c27c38c1dd0315c51cfeef94a236"
  },
  {
    "url": "times/14/5.json",
    "revision": "6b210c9b6f167b988810958523c1f3a6"
  },
  {
    "url": "times/14/6.json",
    "revision": "e63376b4051d5774c2d380dc81d59284"
  },
  {
    "url": "times/14/7.json",
    "revision": "930cd6a9e4d9f670eb48393725a88f1e"
  },
  {
    "url": "times/14/8.json",
    "revision": "656c31e1bff2062be8e1662e4810708f"
  },
  {
    "url": "times/14/9.json",
    "revision": "1d401f2698f18054cccf1ee7ee14c8d1"
  },
  {
    "url": "times/16/1.json",
    "revision": "57317251319c1b94f77bcf505e4e21e9"
  },
  {
    "url": "times/16/10.json",
    "revision": "a1beed8e3b3807dcd240a3dbaa79dc0c"
  },
  {
    "url": "times/16/11.json",
    "revision": "1ebf60a0f6ba087d1edcae98e0238ab8"
  },
  {
    "url": "times/16/12.json",
    "revision": "2008386d2532697c43241267046f4ef7"
  },
  {
    "url": "times/16/2.json",
    "revision": "2682d2d37fbae87af8edcafbf69703ce"
  },
  {
    "url": "times/16/3.json",
    "revision": "4ca05d5f5ededc4bf412870663b1ef4a"
  },
  {
    "url": "times/16/4.json",
    "revision": "1d03bdf26007e1db8496d472ceca1f91"
  },
  {
    "url": "times/16/5.json",
    "revision": "eae7d13eeba8f3e470229df9d5515630"
  },
  {
    "url": "times/16/6.json",
    "revision": "6684682005bc6dce67aabb49dde9cfaf"
  },
  {
    "url": "times/16/7.json",
    "revision": "5e2c1ff27a777c8ad0b4e47f2c47d009"
  },
  {
    "url": "times/16/8.json",
    "revision": "aea2705fc7467c212ea3b1c8483e2845"
  },
  {
    "url": "times/16/9.json",
    "revision": "2b2b5669d391fce4efee26c6dc934580"
  },
  {
    "url": "times/18/1.json",
    "revision": "169fc618d04e77ddaa7b17454584d4f9"
  },
  {
    "url": "times/18/10.json",
    "revision": "dafa883981b4750f22bfdb055a3722f1"
  },
  {
    "url": "times/18/11.json",
    "revision": "a84b75cc70107ebbff9812dcb93fea1a"
  },
  {
    "url": "times/18/12.json",
    "revision": "28e641ddf5eb965a4f818469bbde4faa"
  },
  {
    "url": "times/18/2.json",
    "revision": "b3b1533e97524becfb5e2270d0889866"
  },
  {
    "url": "times/18/3.json",
    "revision": "beec88ccef28b93ed32c23b741176f5c"
  },
  {
    "url": "times/18/4.json",
    "revision": "ffd981fe56541c11813d93ab378fac5d"
  },
  {
    "url": "times/18/5.json",
    "revision": "fc2813d785cf4264194286dc90f17d1b"
  },
  {
    "url": "times/18/6.json",
    "revision": "c8d73cbe8fb3c7d78ef38dfab5f8fa5e"
  },
  {
    "url": "times/18/7.json",
    "revision": "879373c90f577c98a7eb2c8e7683f983"
  },
  {
    "url": "times/18/8.json",
    "revision": "d607ae1779ed1ad50c6f901af7e63ebd"
  },
  {
    "url": "times/18/9.json",
    "revision": "8fb1d9103d2a6097177d377616ddf6b8"
  },
  {
    "url": "times/19/1.json",
    "revision": "5aeffe6875821ccf0af9dac78746d9ee"
  },
  {
    "url": "times/19/10.json",
    "revision": "8302506486d4d8ec1d743a9896a69e07"
  },
  {
    "url": "times/19/11.json",
    "revision": "a7e025ca9998d70f765cd3a1858eea70"
  },
  {
    "url": "times/19/12.json",
    "revision": "19f5d01f8a4817d1cfd764ef317018d5"
  },
  {
    "url": "times/19/2.json",
    "revision": "41e4c275a399ad10868c968ba61cb1ee"
  },
  {
    "url": "times/19/3.json",
    "revision": "bfaf7fd3082736d3380d8cec98e4e3e7"
  },
  {
    "url": "times/19/4.json",
    "revision": "3a02c80c821b345802fd97f5b049b048"
  },
  {
    "url": "times/19/5.json",
    "revision": "4e90003603157298e634589f4b4fe10a"
  },
  {
    "url": "times/19/6.json",
    "revision": "eb4c6693bd3f30cad6de8b794ff74c6a"
  },
  {
    "url": "times/19/7.json",
    "revision": "0526870d566a4540964598cee3ec3b15"
  },
  {
    "url": "times/19/8.json",
    "revision": "05608e071f3bdb8021c9e2eef90b2859"
  },
  {
    "url": "times/19/9.json",
    "revision": "9b006de5af1c3cf223b299836e18af9c"
  },
  {
    "url": "times/2/1.json",
    "revision": "4fb4526d50585365f6ed418e9b9bcc04"
  },
  {
    "url": "times/2/10.json",
    "revision": "9ddb65927d93e17634fd44ce07597d2a"
  },
  {
    "url": "times/2/11.json",
    "revision": "1cfbc060635447b4bd4fc13ace993b59"
  },
  {
    "url": "times/2/12.json",
    "revision": "5c7d3a4549e1ad0f8f16c2189e062200"
  },
  {
    "url": "times/2/2.json",
    "revision": "9e53f6dbc9b53475f55cafe5653dd876"
  },
  {
    "url": "times/2/3.json",
    "revision": "573af4b7f7d31724c0a12382f1e8cfc8"
  },
  {
    "url": "times/2/4.json",
    "revision": "98ed312451e8910a5a1b316292467c0b"
  },
  {
    "url": "times/2/5.json",
    "revision": "73efb0b4afb37c80488df70198985306"
  },
  {
    "url": "times/2/6.json",
    "revision": "d908f3fd8dc379af9abb93e200663c56"
  },
  {
    "url": "times/2/7.json",
    "revision": "22febfe909e834cbd13f156667055172"
  },
  {
    "url": "times/2/8.json",
    "revision": "4d61235b1dc47c1b67a0593a0b043630"
  },
  {
    "url": "times/2/9.json",
    "revision": "3d94127551ae49cef104cd96bf1efb49"
  },
  {
    "url": "times/3/1.json",
    "revision": "dcbea882f7549b5812cfad817498f945"
  },
  {
    "url": "times/3/10.json",
    "revision": "2c71b4253dee481f2fc2433c281da238"
  },
  {
    "url": "times/3/11.json",
    "revision": "a21012f1d5d4e00e2bd696cbb1c352e7"
  },
  {
    "url": "times/3/12.json",
    "revision": "9f88c89d5f6dc32fd0260e950a9d471b"
  },
  {
    "url": "times/3/2.json",
    "revision": "290f0ba7674a573bf88b81017be3ef89"
  },
  {
    "url": "times/3/3.json",
    "revision": "600dea575f9e6c50b110d5cc56ee05ce"
  },
  {
    "url": "times/3/4.json",
    "revision": "c28d57670b5aa8cec9a904e8f97854d7"
  },
  {
    "url": "times/3/5.json",
    "revision": "a96203cacfccdb4e7173d97fbd4ba610"
  },
  {
    "url": "times/3/6.json",
    "revision": "7673c1f5cb43e7659d071aa8e6ef1d11"
  },
  {
    "url": "times/3/7.json",
    "revision": "ac5f357d40f56b74d6f39022d2ce0d2d"
  },
  {
    "url": "times/3/8.json",
    "revision": "fb92da07d19f030455e85cf6bb5dd6b9"
  },
  {
    "url": "times/3/9.json",
    "revision": "283222d0893d153a38d8f33dc9607a57"
  },
  {
    "url": "times/32/1.json",
    "revision": "18d58ad5f2e881b649572f2816d2dad4"
  },
  {
    "url": "times/32/10.json",
    "revision": "c7bda230921b958a508ff44deaf885b0"
  },
  {
    "url": "times/32/11.json",
    "revision": "0a58bf93ef7b201691359707c4baebe7"
  },
  {
    "url": "times/32/12.json",
    "revision": "c71f51d01460023af89e34dd45ada0ef"
  },
  {
    "url": "times/32/2.json",
    "revision": "780ed1e52f606fca9634b9b894f19837"
  },
  {
    "url": "times/32/3.json",
    "revision": "a29364f8f0d366905fe7719ed15cb7f7"
  },
  {
    "url": "times/32/4.json",
    "revision": "8e385972818ebecf79a5cb6528075908"
  },
  {
    "url": "times/32/5.json",
    "revision": "68920023782b7c9f94cc26b531876e7b"
  },
  {
    "url": "times/32/6.json",
    "revision": "dec41c4c430272500646d58724d7df1e"
  },
  {
    "url": "times/32/7.json",
    "revision": "08dd10ac1de37ff44fa204e708eabff1"
  },
  {
    "url": "times/32/8.json",
    "revision": "e678684b7bd707a47f1217698c24f84e"
  },
  {
    "url": "times/32/9.json",
    "revision": "0531b432b5c8b7f55142748b1a389153"
  },
  {
    "url": "times/4/1.json",
    "revision": "d5d59d05cd1755a950f490a651024175"
  },
  {
    "url": "times/4/10.json",
    "revision": "57495a098c6b01ae622ee28a311ff146"
  },
  {
    "url": "times/4/11.json",
    "revision": "9945950aad85f47f6e960064d4419947"
  },
  {
    "url": "times/4/12.json",
    "revision": "557ccf4c940b3c67bd1482ccac6c4fb1"
  },
  {
    "url": "times/4/2.json",
    "revision": "a2c3dac927c6e06c9668fb25c2ea318a"
  },
  {
    "url": "times/4/3.json",
    "revision": "6c90e2f6a855daf716d400a3a4f4e5bd"
  },
  {
    "url": "times/4/4.json",
    "revision": "e9fce98823dfdee47a1fbe1243d9e242"
  },
  {
    "url": "times/4/5.json",
    "revision": "80bb85690e6cf002f5ac184b6ea58481"
  },
  {
    "url": "times/4/6.json",
    "revision": "e6f61028ae7e527370bfb54378874a9d"
  },
  {
    "url": "times/4/7.json",
    "revision": "17e01b081e53edd2f5d2bcc36906b6cf"
  },
  {
    "url": "times/4/8.json",
    "revision": "4c07ed096212eefe14bb48d637a05632"
  },
  {
    "url": "times/4/9.json",
    "revision": "1a29f551551a17639d5eff2ce9cdaaf5"
  },
  {
    "url": "times/5/1.json",
    "revision": "d9e1eb6de7444c8e7b15f62ef2a46d64"
  },
  {
    "url": "times/5/10.json",
    "revision": "9872b334c0020e92a71680e045ff069d"
  },
  {
    "url": "times/5/11.json",
    "revision": "6ccc805681ecd0f23ce9fa9457c765d7"
  },
  {
    "url": "times/5/12.json",
    "revision": "2cd9b68574eacfd120ee7259d6331947"
  },
  {
    "url": "times/5/2.json",
    "revision": "f1396471dadd90aca01979b1238c62db"
  },
  {
    "url": "times/5/3.json",
    "revision": "59b49bb54f554669d9613c74bf339ae1"
  },
  {
    "url": "times/5/4.json",
    "revision": "63866f9354792f083ee374a43442a203"
  },
  {
    "url": "times/5/5.json",
    "revision": "62f85cbc5d92c4f884e603a5fdfc053a"
  },
  {
    "url": "times/5/6.json",
    "revision": "d1613479fa5883f218346bc516e1c609"
  },
  {
    "url": "times/5/7.json",
    "revision": "f6616b72ebdf07116cd19bf4489e68f8"
  },
  {
    "url": "times/5/8.json",
    "revision": "50e485b85e4a67a1a55d2f1e245eee2d"
  },
  {
    "url": "times/5/9.json",
    "revision": "fe2d385d8a60da4c19a8199e71a5610a"
  },
  {
    "url": "times/6/1.json",
    "revision": "b86cd5b938766f6e461efccf48be4521"
  },
  {
    "url": "times/6/10.json",
    "revision": "5cd9b552d66ab19ea51373ed2f56a505"
  },
  {
    "url": "times/6/11.json",
    "revision": "223adb9938b399ff3f5a392525cc5f90"
  },
  {
    "url": "times/6/12.json",
    "revision": "fca3e1873b584aa50fff5e31e1a1f0f6"
  },
  {
    "url": "times/6/2.json",
    "revision": "5ee9dbd39310f59b1149e6d99a2d2b56"
  },
  {
    "url": "times/6/3.json",
    "revision": "9afac99f2ecfdf90649b5a8357cd3a7b"
  },
  {
    "url": "times/6/4.json",
    "revision": "6ef32a59beed07866d3c7a1aee87660a"
  },
  {
    "url": "times/6/5.json",
    "revision": "6983ab97da95f569f644df494bf7a478"
  },
  {
    "url": "times/6/6.json",
    "revision": "80e0017574b15a23e16d907223034fce"
  },
  {
    "url": "times/6/7.json",
    "revision": "168e8ac2fac3112a13de3667d0bcccaf"
  },
  {
    "url": "times/6/8.json",
    "revision": "596fab5a4df1fd3e582854b358d77d3b"
  },
  {
    "url": "times/6/9.json",
    "revision": "05a7e5a8d4c8560abf6d4852be2b52fc"
  },
  {
    "url": "times/7/1.json",
    "revision": "5d891b83afc2e452132fc971cb82e8d3"
  },
  {
    "url": "times/7/10.json",
    "revision": "a8de15aab01c493e12e63a24900f8a82"
  },
  {
    "url": "times/7/11.json",
    "revision": "aac26477a018439d1b81b90a860e0937"
  },
  {
    "url": "times/7/12.json",
    "revision": "35325fc9b5dcd8ce3ac3c4b6f09a46dd"
  },
  {
    "url": "times/7/2.json",
    "revision": "cdecdb308235167677b705693d8c4dc2"
  },
  {
    "url": "times/7/3.json",
    "revision": "46b888ba62697c20abcf2a79d2d0787e"
  },
  {
    "url": "times/7/4.json",
    "revision": "b6bda66e43fc5175d1ab2405ec01497e"
  },
  {
    "url": "times/7/5.json",
    "revision": "7d6dbfa7336f19f8343788dd4c0c1f2f"
  },
  {
    "url": "times/7/6.json",
    "revision": "83455deb0931a0c02b6db0be48ae5d1b"
  },
  {
    "url": "times/7/7.json",
    "revision": "d07edd0401fcbfd11d15e526aa2a7531"
  },
  {
    "url": "times/7/8.json",
    "revision": "eafcb365774a356629886b48a2358a42"
  },
  {
    "url": "times/7/9.json",
    "revision": "bee6ea26c8c63429716351b30dc9e727"
  },
  {
    "url": "times/8/1.json",
    "revision": "5fb187c8f72eeadd7b2c2d638680f785"
  },
  {
    "url": "times/8/10.json",
    "revision": "7fbfa9df147fc5d382fd647f0f93cc66"
  },
  {
    "url": "times/8/11.json",
    "revision": "a642e2f928a8842fe46fd3ae26be7830"
  },
  {
    "url": "times/8/12.json",
    "revision": "53ea7b10ed5f6ba3f1aa35cc41c1ca13"
  },
  {
    "url": "times/8/2.json",
    "revision": "af849048c0686ab50a3966a63adffacc"
  },
  {
    "url": "times/8/3.json",
    "revision": "72d25794c4bb79421a24dc177087c137"
  },
  {
    "url": "times/8/4.json",
    "revision": "267370e30398b260701f402cae44b416"
  },
  {
    "url": "times/8/5.json",
    "revision": "dfeca802059efef308b44b2f0c33759d"
  },
  {
    "url": "times/8/6.json",
    "revision": "fb646b209138f6f5de25ec6ff8718594"
  },
  {
    "url": "times/8/7.json",
    "revision": "6d8943895049944debb7f274ae8d7032"
  },
  {
    "url": "times/8/8.json",
    "revision": "88b2cb97cff4efaf36bb823d177e9ce2"
  },
  {
    "url": "times/8/9.json",
    "revision": "73946aba9ac6c0ca575061e06ec417fa"
  },
  {
    "url": "times/9/1.json",
    "revision": "b37a908119c7bd3e602328fe63976b3b"
  },
  {
    "url": "times/9/10.json",
    "revision": "9e4b8634efdd2a2126fb1a64378879cb"
  },
  {
    "url": "times/9/11.json",
    "revision": "2fc3edf1072510f985326ff024863063"
  },
  {
    "url": "times/9/12.json",
    "revision": "06d019b828c7c9c8fcab6c52d1bc55c1"
  },
  {
    "url": "times/9/2.json",
    "revision": "0f552cf5de05b33091a467fc43a38165"
  },
  {
    "url": "times/9/3.json",
    "revision": "8e5795f498766ebc1f10ee9a1e7c6dd6"
  },
  {
    "url": "times/9/4.json",
    "revision": "589f1a12269786e56668b0790d0fcfd6"
  },
  {
    "url": "times/9/5.json",
    "revision": "fe14b8be082b68bb58b9d75c52604842"
  },
  {
    "url": "times/9/6.json",
    "revision": "c7e79a50bf740f045461a55b9adbd299"
  },
  {
    "url": "times/9/7.json",
    "revision": "ce4fd43af27e653a53a7d9d264769b55"
  },
  {
    "url": "times/9/8.json",
    "revision": "3c67b18dc9c6460df0e3ab6dd3c22e11"
  },
  {
    "url": "times/9/9.json",
    "revision": "6e34fe0507d12b2551a473d1ed75b55e"
  },
  {
    "url": "times/localization.json",
    "revision": "012b58271fe08cfdeddfbd42b4cfdcda"
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
