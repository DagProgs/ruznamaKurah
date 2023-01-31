var text = '{"employees":[' +
    '{"titles":"Рузнама" },' +
    '{"titles":"Курахский р-он" },' +

    '{"titles":"Фаджр" },' +
    '{"titles":"Время утреннего намаза" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Шурук" },' +
    '{"titles":"Восход солнца" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Зухр" },' +
    '{"titles":"Время полуденного намаза" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Аср" },' +
    '{"titles":"Время предвечернего намаза" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Магриб" },' +
    '{"titles":"Время вечернего намаза" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Иша" },' +
    '{"titles":"Время ночного намаза" },' +
    '{"titles":"00:00" },' +

    '{"titles":"Понедельник" },' +
    '{"titles":"01 Январь 2022 г" },' +
    '{"titles":"00:00:00" }]}';

obj = JSON.parse(text);

document.getElementById("navbartext").innerHTML =
    obj.employees[0].titles;
document.getElementById("navbarsubtext").innerHTML =
    obj.employees[1].titles;

document.getElementById("fajr").innerHTML =
    obj.employees[2].titles;
document.getElementById("fajrru").innerHTML =
    obj.employees[3].titles;
document.getElementById("fajrtime").innerHTML =
    obj.employees[4].titles;

document.getElementById("shuruk").innerHTML =
    obj.employees[5].titles;
document.getElementById("shurukru").innerHTML =
    obj.employees[6].titles;
document.getElementById("shuruktime").innerHTML =
    obj.employees[7].titles;

document.getElementById("zuhr").innerHTML =
    obj.employees[8].titles;
document.getElementById("zuhrru").innerHTML =
    obj.employees[9].titles;
document.getElementById("zuhrtime").innerHTML =
    obj.employees[10].titles;

document.getElementById("asr").innerHTML =
    obj.employees[11].titles;
document.getElementById("asrru").innerHTML =
    obj.employees[12].titles;
document.getElementById("asrtime").innerHTML =
    obj.employees[13].titles;

document.getElementById("magrib").innerHTML =
    obj.employees[14].titles;
document.getElementById("magribru").innerHTML =
    obj.employees[15].titles;
document.getElementById("magribtime").innerHTML =
    obj.employees[16].titles;

document.getElementById("isha").innerHTML =
    obj.employees[17].titles;
document.getElementById("isharu").innerHTML =
    obj.employees[18].titles;
document.getElementById("ishatime").innerHTML =
    obj.employees[19].titles;

document.getElementById("dtday").innerHTML =
    obj.employees[20].titles;
document.getElementById("dtyear").innerHTML =
    obj.employees[21].titles;
document.getElementById("dttime").innerHTML =
    obj.employees[22].titles;