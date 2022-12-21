                for(x = 0; x < mydate.length; x++) {
				var serializedUser = JSON.stringify(mydate[x]);
				var user = JSON.parse(serializedUser);
				
				
				
				

				document.write("<tr><th>" + user.date + "</th><th>" + user.fajr + "</th><th>" + user.sunrise + "</th><th>" + user.dhuhr + "</th><th>" + user.asr + "</th><th>" + user.maghrib + "</th><th>" + user.isha + "</th></tr>");
				
				
				};


				for(x = 0; x < november.length; x++) {
				var serializedUser = JSON.stringify(november[x]);
				var user = JSON.parse(serializedUser);
				
				
				
				

				document.write("<tr><td>" + user.date + "</td><td>" + user.fajr + "</td><td>" + user.sunrise + "</td><td>" + user.dhuhr + "</td><td>" + user.asr + "</td><td>" + user.maghrib + "</td><td>" + user.isha + "</td></tr>");
				
				
				};