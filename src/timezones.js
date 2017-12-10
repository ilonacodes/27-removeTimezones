var container = document.querySelector('.container');

var timezones = [];

data.forEach(function (timezoneData) {
    timezoneData.utc.forEach(function (name) {
        var parts = name.split('/');
        var city = parts.slice(1).join('/');
        var zone = parts[0];

        if (zone !== 'Etc' && city !== '') {
            timezones.push(Object.assign({}, timezoneData, {
                city: city,
                zone: zone
            }));
        }
    });
});

timezones.sort(function (a, b) {
    if (a.city < b.city)
        return -1;
    if (a.city > b.city)
        return 1;
    return 0;
});

var chosenTimezones = new ChosenTimezones();
chosenTimezones.load();


function renderTimezone(timezone) {
    var timezoneOptionElem = document.createElement('a');
    container.appendChild(timezoneOptionElem);
    timezoneOptionElem.setAttribute('href', '#');
    timezoneOptionElem.classList.add('timezone-option');
    timezoneOptionElem.innerText = timezone.city + ', ' + timezone.zone + ' (' + timezone.abbr + ')';

    timezoneOptionElem.addEventListener('click', function (e) {
        chosenTimezones.add(timezone);
        location.replace('index.html');
    })
    // click:
    // 1. add to chosen
    // 2. redirect to index.html
}

function renderTimezones(query) {
    container.innerHTML = '';

    timezones
        .filter(function (timezone) {
            return timezone.city.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })
        .forEach(function (timezone) {
            renderTimezone(timezone);
        });
}

renderTimezones('');

document.querySelector('input').addEventListener('keyup', function (e) {
    renderTimezones(e.target.value);
});


