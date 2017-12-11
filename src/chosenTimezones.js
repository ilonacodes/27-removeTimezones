function ChosenTimezones() {
    this.timezones = [];
}

ChosenTimezones.prototype.add = function (timezone) {
    this.timezones.push(timezone);

    this.save();
};

ChosenTimezones.prototype.remove = function (timezone) {
    var index = this.timezones.indexOf(timezone);

    if (index > -1) {
        this.timezones.splice(index, 1);
    }

    this.save();
};

ChosenTimezones.prototype.save = function () {
    localStorage.setItem('timezone', JSON.stringify({
        timezones: this.timezones,
    }));
};

ChosenTimezones.prototype.load = function () {
    var data = localStorage.getItem('timezone');
    var parsed = JSON.parse(data);

    if (parsed) {
        this.timezones = parsed.timezones;
    }
};