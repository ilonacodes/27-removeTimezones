var berlin = document.querySelector('[data-zone="berlin"] .time');
var newYork = document.querySelector('[data-zone="new-york"] .time');
var hongKong = document.querySelector('[data-zone="hong-kong"] .time');
var dubai = document.querySelector('[data-zone="dubai"] .time');
var kiev = document.querySelector('[data-zone="kiev"] .time');
var weekdayElemBerlin = document.querySelector('[data-zone="berlin"] .day');
var weekdayElemNewYork = document.querySelector('[data-zone="new-york"] .day');
var weekdayElemHongKong = document.querySelector('[data-zone="hong-kong"] .day');
var weekdayElemDubai = document.querySelector('[data-zone="dubai"] .day');
var weekdayElemKiev = document.querySelector('[data-zone="kiev"] .day');

function calculateTime(date, timezoneHours, timezoneMinutes) {

    var localDate = new Date(date);

    localDate.setUTCHours(localDate.getUTCHours() + timezoneHours);
    localDate.setUTCMinutes(localDate.getUTCMinutes() + timezoneMinutes);

    var hours = localDate.getUTCHours();
    var minutes = localDate.getUTCMinutes();

    if (minutes < 10) {
        return hours + ':' + '0' + minutes;
    } else {
        return hours + ':' + minutes;
    }

}

function getWeekday(date, timezoneHours, timezoneMinutes) {
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var localDate = new Date(date);

    localDate.setUTCHours(localDate.getUTCHours() + timezoneHours);
    localDate.setUTCMinutes(localDate.getUTCMinutes() + timezoneMinutes);

    return weekday[localDate.getUTCDay()];
}

function renderDates() {
    var date = new Date();

    berlin.innerText = calculateTime(date, 1, 0);
    newYork.innerText = calculateTime(date, -4, 0);
    hongKong.innerText = calculateTime(date, 8, 0);
    dubai.innerText = calculateTime(date, 4, 0);
    kiev.innerText = calculateTime(date, 2, 0);

    weekdayElemBerlin.innerText = getWeekday(date, 1, 0);
    weekdayElemNewYork.innerText = getWeekday(date, -4, 0);
    weekdayElemHongKong.innerText = getWeekday(date, 8, 0);
    weekdayElemDubai.innerText = getWeekday(date, 4, 0);
    weekdayElemKiev.innerText = getWeekday(date, 2, 0);

}

renderDates();
setInterval(renderDates, 1000);