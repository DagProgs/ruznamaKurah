fetch("js/json/prayer-times.json")
    .then(e => e.json())
    .then(e => {
        var t = e, r = [];
        r.push("Фаджр", "Шурук", "Зухр", "Аср", "Магриб", "Иша");
        var n = { "Фаджр": "Fajr", "Шурук": "Sunrise", "Зухр": "Dhuhr", "Аср": "Asr", "Магриб": "Maghrib", "Иша": "Isha" };
        var s = new Date(), a = s.getMonth() + 1, $ = s.getDate(), o = 60 * s.getHours() + s.getMinutes(), i = {};
        
        if (t[a] && t[a][$]) {
            r.forEach(function (e) {
                var r = n[e];
                if (r && t[a][$][r]) {
                    i[e] = 60 * t[a][$][r][0] + t[a][$][r][1];
                }
            });
        }

        var u = new Date();
        u.setDate(u.getDate() + 1);
        u.setHours(0, 0, 0, 0);
        var c = 60 * u.getHours() + u.getMinutes();

        if (o > i["Магриб"]) {
            var p = t[a][$ + 0];
            if (p) {
                r.forEach(function (e) {
                    var t = n[e];
                    if (t && p[t]) {
                        i[e] = 60 * p[t][0] + p[t][1];
                    }
                });
            }
        }

        function h(e, t) {
            var r = t - e;
            return r <= 0 ? "00:00" : Math.floor(r / 60).toString().padStart(2, "0") + ":" + (r % 60).toString().padStart(2, "0");
        }

        function l() {
            var e = new Date(), t = 60 * e.getHours() + e.getMinutes(), s = document.getElementById("nextPrayerText"), a = document.getElementById("nextPrayerTime"), $ = !1, o = 1 / 0, u = 0;

            for (u = 0; u < r.length; u++) {
                var c = r[u], p = i[c];
                if (void 0 !== p && p > t) {
                    var l = p - t;
                    if (l < o) {
                        o = l;
                        d = c;
                        $ = !0;
                    }
                }
            }

            if ($) {
                if ("Фаджр" === d && t > i["Иша"]) {
                    g = h(t, i["Фаджр"] + 1440);
                    v = i["Фаджр"] - i["Иша"] + 1440;
                } else {
                    g = h(t, i[d]);
                    v = i[d] - i[r[r.indexOf(d) - 1]];
                }
                s.innerHTML = 'До ' + d + 'а';
                a.innerHTML = g;

                var _ = o / v * 100;
                document.getElementById("redLine").style.width = 100 - _ + "%";
                var f = document.getElementById(n[d].toLowerCase() + "prayerTimes");
                if (f) f.classList.add("current-prayer");
            } else {
                var y = h(t, i["Фаджр"] + 1440);
                s.innerHTML = 'До Фаджра';
                a.innerHTML = y;
                document.getElementById("redLine").style.width = "0";
            }
        }

        setInterval(l, 1000); // Обновляем каждую секунду
        l(); // Вызов функции сразу при загрузке
    });
