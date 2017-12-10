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

var containerElem = document.querySelector('.container');

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
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    var localDate = new Date(date);

    localDate.setUTCHours(localDate.getUTCHours() + timezoneHours);
    localDate.setUTCMinutes(localDate.getUTCMinutes() + timezoneMinutes);

    return weekday[localDate.getUTCDay()];
}

var chosenTimezones = new ChosenTimezones();
chosenTimezones.load();



function renderDateForTimezone(timezone) {
    var date = new Date();

    var hoursOffset = Math.floor(timezone.offset);
    var minutesOffset = Math.floor((timezone.offset - hoursOffset) * 60);

    var timezoneElem = document.createElement('div');
    containerElem.appendChild(timezoneElem);
    timezoneElem.classList.add('timezone');

    var zoneInfoElem = document.createElement('div');
    timezoneElem.appendChild(zoneInfoElem);
    zoneInfoElem.classList.add('zone-info');

    var titleElem = document.createElement('p');
    zoneInfoElem.appendChild(titleElem);
    titleElem.classList.add('title');
    titleElem.innerText = timezone.city;

    var dayElem = document.createElement('p');
    zoneInfoElem.appendChild(dayElem);
    dayElem.classList.add('day');
    dayElem.innerText = getWeekday(date, hoursOffset, minutesOffset);


    var timeElem = document.createElement('div');
    timezoneElem.appendChild(timeElem);
    timeElem.classList.add('time');
    timeElem.innerText = calculateTime(date, hoursOffset, minutesOffset);

}

function renderDates() {
    containerElem.innerHTML = '';

    chosenTimezones.timezones.forEach(function (timezone) {
        renderDateForTimezone(timezone);
    });
}

renderDates();
setInterval(renderDates, 1000);