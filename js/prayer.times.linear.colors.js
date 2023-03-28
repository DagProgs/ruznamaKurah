jQuery( document ).ready(function() {
    var areas = {"query":{"total":41},"array":[{"id":185777,"ru_name":"Агульский","district_code":"2","type_name":"район"},{"id":185796,"ru_name":"Акушинский","district_code":"3","type_name":"район"},{"id":185876,"ru_name":"Ахвахский","district_code":"4","type_name":"район"},{"id":185894,"ru_name":"Ахтынский","district_code":"5","type_name":"район"},{"id":185916,"ru_name":"Бабаюртовский","district_code":"6","type_name":"район"},{"id":185937,"ru_name":"Ботлихский","district_code":"7","type_name":"район"},{"id":185975,"ru_name":"Буйнакский","district_code":"8","type_name":"район"},{"id":186007,"ru_name":"Гергебильский","district_code":"9","type_name":"район"},{"id":186024,"ru_name":"Гумбетовский","district_code":"10","type_name":"район"},{"id":186051,"ru_name":"Гунибский","district_code":"11","type_name":"район"},{"id":186119,"ru_name":"Дахадаевский","district_code":"12","type_name":"район"},{"id":186182,"ru_name":"Дербентский","district_code":"13","type_name":"район"},{"id":186224,"ru_name":"Докузпаринский","district_code":"14","type_name":"район"},{"id":186241,"ru_name":"Казбековский","district_code":"15","type_name":"район"},{"id":186257,"ru_name":"Кайтагский","district_code":"16","type_name":"район"},{"id":186304,"ru_name":"Карабудахкентский","district_code":"17","type_name":"район"},{"id":186323,"ru_name":"Каякентский","district_code":"18","type_name":"район"},{"id":186345,"ru_name":"Кизилюртовский","district_code":"19","type_name":"район"},{"id":186362,"ru_name":"Кизлярский","district_code":"20","type_name":"район"},{"id":186446,"ru_name":"Кулинский","district_code":"22","type_name":"район"},{"id":186461,"ru_name":"Кумторкалинский","district_code":"23","type_name":"район"},{"id":186472,"ru_name":"Курахский","district_code":"24","type_name":"район"},{"id":186501,"ru_name":"Лакский","district_code":"25","type_name":"район"},{"id":186552,"ru_name":"Левашинский","district_code":"26","type_name":"район"},{"id":186621,"ru_name":"Магарамкентский","district_code":"27","type_name":"район"},{"id":186655,"ru_name":"Новолакский","district_code":"28","type_name":"район"},{"id":186670,"ru_name":"Ногайский","district_code":"29","type_name":"район"},{"id":186690,"ru_name":"Рутульский","district_code":"30","type_name":"район"},{"id":186730,"ru_name":"Сергокалинский","district_code":"31","type_name":"район"},{"id":186762,"ru_name":"Сулейман-Стальский","district_code":"32","type_name":"район"},{"id":186806,"ru_name":"Табасаранский","district_code":"33","type_name":"район"},{"id":186882,"ru_name":"Тарумовский","district_code":"34","type_name":"район"},{"id":186908,"ru_name":"Тляратинский","district_code":"35","type_name":"район"},{"id":186998,"ru_name":"Унцукульский","district_code":"36","type_name":"район"},{"id":187019,"ru_name":"Хасавюртовский","district_code":"37","type_name":"район"},{"id":187078,"ru_name":"Хивский","district_code":"38","type_name":"район"},{"id":187121,"ru_name":"Хунзахский","district_code":"39","type_name":"район"},{"id":187184,"ru_name":"Цумадинский","district_code":"40","type_name":"район"},{"id":187247,"ru_name":"Цунтинский","district_code":"41","type_name":"район"},{"id":187305,"ru_name":"Чародинский","district_code":"42","type_name":"район"},{"id":187360,"ru_name":"Шамильский","district_code":"43","type_name":"район"}]};
	/*console.log(areas);
	var areas = jQuery.getJSON("https://app.muftiyatrd.ru/api/areas")
		.success(function(data){return data;})
		.error(function(){jQuery(".bottom_info").text("Не удалось загрузить список районов!");});
	console.log(areas);*/

	var city = {"query":{"total":10},"array":[{"id":185733,"ru_name":"Махачкала","district_code":"0","type_name":"г.","ruznama_id":2044},{"id":185751,"ru_name":"Дагестанские Огни","district_code":"0","type_name":"г.","ruznama_id":2619},{"id":185752,"ru_name":"Избербаш","district_code":"0","type_name":"г.","ruznama_id":1851},{"id":185754,"ru_name":"Каспийск","district_code":"0","type_name":"г.","ruznama_id":1891},{"id":185764,"ru_name":"Южно-Сухокумск","district_code":"0","type_name":"г.","ruznama_id":2541},{"id":185766,"ru_name":"Дербент","district_code":"0","type_name":"г.","ruznama_id":1674},{"id":185767,"ru_name":"Кизилюрт","district_code":"0","type_name":"г.","ruznama_id":1927},{"id":185773,"ru_name":"Кизляр","district_code":"0","type_name":"г.","ruznama_id":1928},{"id":185775,"ru_name":"Хасавюрт","district_code":"0","type_name":"г.","ruznama_id":1901},{"id":185776,"ru_name":"Буйнакск","district_code":"0","type_name":"г.","ruznama_id":1638}]};
	/*var city = jQuery.getJSON("https://app.muftiyatrd.ru/api/cities")
		.success(function(data){return data;})
		.error(function(){jQuery(".bottom_info").text("Не удалось загрузить список районов!");});
	*/
	
	var places = areas.array.concat(city.array); /*console.log(places);*/
	var ruznamaName = {
		fajr: "Фаджра", 
		sunrise: "Шурука",
		dhuhr: "Зухра",
		asr: "Асра",
		maghrib: "Магриба",
		night: "Иша"
	};
	jQuery("#choose_place").change(function(){
		jQuery(".top-element span").text("--:--");
		placeID = this.value;
		jQuery("#pray-month").data('placeID',placeID);
		date = new Date();
		day = date.getDate()-1;
		url = "https://app.muftiyatrd.ru/api/ruznama?city=" + placeID + "&year=" + date.getFullYear() + "&month=" + (date.getMonth() + 1);
		//console.log(url);
		jQuery.getJSON(url, function(data){
			ruznama = data.array[day].times;
			var currentTime 		= date.getHours()*60+date.getMinutes()*1; //текущее время в минутах
			var currentValue, 		//время намаза в цикле в минутах
				currentPrayIndex,	//индекс текущего намаза в массиве {fajr, asr, magrib ...}
				currentPrayTime;	//время текущего намаза	в минутах
			var nextPrayerTime = false;		//время следующего намаза
			var nextPrayerIndex = false;	//индекс следующего намаза
			var flag = false;
			
			jQuery.each(ruznama, function (index, value) {
				var currentValue 		= value.split(':')[0]*60+value.split(':')[1]*1;
				console.log(index + " " + value + " " + currentValue);				
				if(currentValue < currentTime) {//получаем время текущего намаза
					currentPrayTime = currentValue;
					currentPrayIndex = index;
				}
				
				if(currentPrayTime < currentValue && !flag) {//получаем время следующего намаза
					nextPrayerTime = currentValue;
					nextPrayerIndex = index;
					flag = true;
				}

				jQuery("."+index + " span").text(value); 
			});
			
			if(!currentPrayTime) {
				currentPrayTime = ruznama.night.split(':')[0]*60+ruznama.night.split(':')[1]*1;;
				currentPrayIndex = "night";
			}
			if(!nextPrayerTime) {
				nextPrayerTime = ruznama.fajr.split(':')[0]*60+ruznama.fajr.split(':')[1]*1;
				nextPrayerIndex = "fajr";
			}
			
			//вычисляем разницу между текущим временем и временем до следующего намаза
			var timeUntilNextPrayer = 0;
			if(currentPrayIndex == "night" && currentTime > currentPrayTime) {
				timeUntilNextPrayer = 1440 - currentTime + nextPrayerTime;
				//console.log("timeUntilNextPrayer = " + timeUntilNextPrayer );
			} else {
				var timeUntilNextPrayer = nextPrayerTime - currentTime;
			}
			//console.log(timeUntilNextPrayer);
			var h = Math.trunc(timeUntilNextPrayer/60);
			if(h < 10) h = "0"+h;
			var m = timeUntilNextPrayer % 60;
			if(m < 10) m = "0"+m;
			timeUntilNextPrayer = h + ":" + m + ":00";
			
			jQuery(".timeUntilNextPrayer").text(timeUntilNextPrayer);
			jQuery(".bottom_info span.strong").text(ruznamaName[nextPrayerIndex]);
			
			//отмечаем в html текущий намаз и оформляем
			jQuery('div.time_line_cont div[data-name="*"]').removeClass("after");
			jQuery('*[data-name="' + currentPrayIndex +'"]').nextAll("div.pnt").addClass("after");
			jQuery('*[data-name="' + currentPrayIndex +'"]').removeClass("after").addClass("active");
			jQuery('*[data-name="' + nextPrayerIndex +'"]').addClass("nextPrayerTime");
			
			var diffCurrentPrayAndNextPray = nextPrayerTime - currentPrayTime; 	//разница между текущим и следущим намазами
			var diffCurrentTimeAndNextPray = nextPrayerTime - currentTime; 		//разница между текущим временем и следущим намазом
			var position = (diffCurrentTimeAndNextPray * 100 / diffCurrentPrayAndNextPray);
			//console.log(position);
			var lineWidth = 100 - (jQuery('div.nextPrayerTime').data("position"));
			if(currentPrayIndex != "night")
				jQuery(".line_full").css({ 'width': 'calc('+lineWidth+'% + ' + position + 'px)' });

			console.log("текущее время - " + currentTime);
			console.log("текущее время намаза - " + currentPrayIndex + " " + currentPrayTime);
			console.log("время следующего намаза - " + nextPrayerIndex + " " + nextPrayerTime);
		});
	});	
		
	jQuery("#pray-month").click(function(){
		var placeID = jQuery(this).data("placeID");
		jQuery.ajax({
			type: "POST",
			url: window.wp_data.ajax_url,
			data: {
				action : 'get_pray_time_page_url', 
				place : placeID
			},
			success: function (response) {
				response = JSON.parse(response);
				if(response.status == "ok"){
					url = response.page_url;
					location.href = url;
				}
			}
		});

	})
		
	jQuery.each(places, function(key, value) {   
		jQuery('#choose_place')
			.append(jQuery("<option></option>")
			.attr("value", value.id)
			.text((value.type_name == "г.") ? value.type_name + " " + value.ru_name : value.ru_name + " " + value.type_name)); 
	});
	jQuery('#choose_place option[value="186472"]').attr('selected', 'true');
	jQuery('#choose_place').change();
});