function getCurrentMonth() { let t = new Date; return t.toLocaleDateString("ru-RU", { month: "long", year: "numeric" }) } const today = new Date; function getUrlParameter(t) { let e = new URLSearchParams(window.location.search); return e.get(t) } document.getElementById("current-month").textContent = `Сегодня: ${today.getDate()} ${getCurrentMonth()}`; const area = getUrlParameter("area"), areaId = getUrlParameter("id"); if (area && areaId) {
  document.getElementById("selected-area").textContent = `${area}`; let t = new Date, e = t.getDate(), r = t.getMonth() + 1; fetch(`./times/${areaId}/${r}.json`).then(t => { if (!t.ok) throw Error("Сеть ответила с ошибкой: " + t.status); return t.json() }).then(t => {
      let r = document.getElementById("times-list"); r.innerHTML = "", t.array.forEach(t => {
          let a = t.date.split("-"), n = parseInt(a[2]), d = document.createElement("tr"); n === e && d.classList.add("today"), d.innerHTML = `
              <td>${n}</td>
              <td>${t.times.fajr}</td>
              <td>${t.times.sunrise}</td>
              <td>${t.times.dhuhr}</td>
              <td>${t.times.asr}</td>
              <td>${t.times.maghrib}</td>
              <td>${t.times.night}</td>
          `, r.appendChild(d)
      })
  }).catch(t => console.error("Ошибка при загрузке данных времени:", t))
} else document.getElementById("selected-area").textContent = "Выбор области не был сделан.";