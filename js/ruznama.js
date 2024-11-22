jQuery(document).ready(function () {
    var areas, city;

    // Load areas data
    jQuery.getJSON('js/json/city.json', function(data) {
        areas = data;
        loadCityData(); // Call to load city data after areas are loaded
    });

    function loadCityData() {
        jQuery.getJSON('js/json/areas.json', function(data) {
            city = data;
            initializePlaces(); // Initialize the places once both are loaded
        });
    }

    function initializePlaces() {
        // Объединение данных о районах и городах
        var places = areas.array.concat(city.array);

        // Названия молитв
        var ruznamaName = {
            fajr: "Фаджра",
            sunrise: "Восхода",
            dhuhr: "Зухра",
            asr: "Асра",
            maghrib: "Магриба",
            night: "Иша"
        };

        // Заполнение выпадающего списка мест
        jQuery.each(places, function (key, value) {
            jQuery('#choose_place').append(jQuery("<option></option>")
                .attr("value", value.id)
                .text((value.type_name === "г.") ? value.type_name + " " + value.ru_name : value.ru_name + " " + value.type_name));
        });

        // Восстановление выбранного значения из localStorage
        var savedPlaceID = localStorage.getItem('selectedPlaceID');
        if (savedPlaceID) {
            jQuery('#choose_place').val(savedPlaceID);
        } else {
            // Установка выбранного значения по умолчанию, если нет сохраненного
            jQuery('#choose_place option[value="185733"]').attr('selected', 'true');
        }

        // Обработка изменения выбора места
        jQuery("#choose_place").change(function () {
            // Сохранение выбранного значения в localStorage
            localStorage.setItem('selectedPlaceID', this.value);

            jQuery(".top-element span").text("--:--");
            var placeID = this.value;
            jQuery("#pray-month").data('placeID', placeID);
            var date = new Date();
            var day = date.getDate() - 1; // Коррекция для нулевой индексации
            var url = "https://app.muftiyatrd.ru/api/ruznama?city=" + placeID + "&year=" + date.getFullYear() + "&month=" + (date.getMonth() + 1);

            // Проверка наличия данных в localStorage
            var savedPrayTimes = localStorage.getItem('prayTimes_' + placeID);
            if (savedPrayTimes) {
                // Если данные есть в localStorage, используем их
                processPrayTimes(JSON.parse(savedPrayTimes), day);
            } else {
                // Запрос данных о молитвах
                jQuery.getJSON(url, function (data) {
                    // Сохранение данных в localStorage
                    localStorage.setItem('prayTimes_' + placeID, JSON.stringify(data));
                    processPrayTimes(data, day);
                }).fail(function () {
                    jQuery(".bottom_info").text("Не удалось загрузить расписание намазов!");
                });
            }
        });

        // Функция для обработки и отображения времени молитв
        function processPrayTimes(data, day) {
            // Проверка наличия данных
            if (data.array && data.array.length > day) {
                var ruznama = data.array[day].times;
                var currentTime = new Date().getHours() * 60 + new Date().getMinutes();
                var currentPrayIndex, currentPrayTime;
                var nextPrayerTime = false, nextPrayerIndex = false;
                var flag = false;

                // Обработка времени молитв
                jQuery.each(ruznama, function (index, value) {
                    var currentValue = value.split(':')[0] * 60 + value.split(':')[1] * 1;

                    if (currentValue < currentTime) {
                        currentPrayTime = currentValue;
                        currentPrayIndex = index;
                    }

                    if (currentPrayTime < currentValue && !flag) {
                        nextPrayerTime = currentValue;
                        nextPrayerIndex = index;
                        flag = true;
                    }

                    jQuery("." + index + " span").text(value);
                });

                // Обработка случаев, когда текущее или следующее время молитвы не найдено
                if (!currentPrayTime) {
                    currentPrayTime = ruznama.night.split(':')[0] * 60 + ruznama.night.split(':')[1] * 1;
                    currentPrayIndex = "night";
                }
                if (!nextPrayerTime) {
                    nextPrayerTime = ruznama.fajr.split(':')[0] * 60 + ruznama.fajr.split(':')[1] * 1;
                    nextPrayerIndex = "fajr";
                }

                // Расчет времени до следующей молитвы
                var timeUntilNextPrayer = (currentPrayIndex === "night" && currentTime > currentPrayTime)
                    ? 1440 - currentTime + nextPrayerTime
                    : nextPrayerTime - currentTime;

                // Форматирование времени
                var h = Math.trunc(timeUntilNextPrayer / 60);
                var m = timeUntilNextPrayer % 60;
                timeUntilNextPrayer = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":00";

                jQuery(".timeUntilNextPrayer").text(timeUntilNextPrayer);
                jQuery(".bottom_info span.strong").text(ruznamaName[nextPrayerIndex]);

                // Обновление HTML для текущих и следующих молитв
                jQuery('div.time_line_cont div[data-name="*"]').removeClass("after");
                jQuery('*[data-name="' + currentPrayIndex + '"]').nextAll("div.pnt").addClass("after");
                jQuery('*[data-name="' + currentPrayIndex + '"]').removeClass("after").addClass("active");
                jQuery('*[data-name="' + nextPrayerIndex + '"]').addClass("nextPrayerTime");

                // Расчет позиции на временной линии
                var diffCurrentPrayAndNextPray = nextPrayerTime - currentPrayTime;
                var diffCurrentTimeAndNextPray = nextPrayerTime - currentTime;
                var position = (diffCurrentTimeAndNextPray * 100 / diffCurrentPrayAndNextPray);
                var lineWidth = 100 - (jQuery('div.nextPrayerTime').data("position"));

                if (currentPrayIndex !== "night") {
                    jQuery(".line_full").css({ 'width': 'calc(' + lineWidth + '% + ' + position + 'px)' });
                }
            } else {
                jQuery(".bottom_info").text("Не удалось загрузить расписание намазов!");
            }
        }

        // Обработка клика на элементе с ID pray-month
        jQuery("#pray-month").click(function () {
            var placeID = jQuery(this).data("placeID");
            jQuery.ajax({
                type: "POST",
                url: window.wp_data.ajax_url,
                data: {
                    action: 'get_pray_time_page_url',
                    place: placeID
                },
                success: function (response) {
                    response = JSON.parse(response);
                    if (response.status === "ok") {
                        location.href = response.page_url;
                    }
                }
            });
        });

        // Инициализация выбора места
        jQuery('#choose_place').change(); // Вызываем смену, чтобы обновить данные при загрузке
    }
});
