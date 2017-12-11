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

    var offset = timezone.offset;

    if (timezone.isdst) {
        offset--;
    }
    
    var hoursOffset = Math.floor(offset);
    var minutesOffset = Math.floor((offset - hoursOffset) * 60);

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

    var removeLink = document.createElement('a');
    timeElem.appendChild(removeLink);
    removeLink.classList.add('remove');
    removeLink.innerText = '-';

    removeLink.addEventListener('click', function () {
        chosenTimezones.remove(timezone);
        renderDates();
    })
}

function renderDates() {
    containerElem.innerHTML = '';

    chosenTimezones.timezones.forEach(function (timezone) {
        renderDateForTimezone(timezone);
    });
}

renderDates();
setInterval(renderDates, 1000);