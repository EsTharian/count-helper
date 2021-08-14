"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
require("./polyfills");
var Counter = /** @class */ (function () {
    function Counter(datetime, options) {
        this.start = document.timeline.currentTime;
        this.stop = false;
        this.options = options;
        this.upDownFixer = this.options.type === 'countup' ? -1 : 1;
        // If datetime type is "yyyy-mm-dd hh:mm", replace space with "T"
        this.datetime = typeof datetime === 'string'
            ? new Date(datetime.replace(/ /g, "T")) : datetime;
    }
    Counter.prototype.stringify = function (counted) {
        return counted.toString().padStart(2, '0');
    };
    Counter.prototype.render = function (dom, value) {
        if (value < 0) {
            var negative_1 = new Event('countdown.negative');
            dom && (dom.length
                ? __spreadArray([], dom).forEach(function (d) { return d.dispatchEvent(negative_1); })
                : dom.dispatchEvent(negative_1));
            this.stop = true;
            dom && (dom.length
                ? __spreadArray([], dom).forEach(function (d) { return d.innerHTML = '00'; })
                : dom.innerHTML = '00');
        }
        else {
            value = this.stringify(value);
            dom && (dom.length
                ? __spreadArray([], dom).forEach(function (d) { return d.innerHTML = value; })
                : dom.innerHTML = value);
        }
    };
    Counter.prototype.fullYear = function (now) {
        var fullYear = Math.floor((this.fullDay(now) / 365));
        this.render(this.options.fullYearDOM, fullYear);
        return fullYear;
    };
    Counter.prototype.fullDay = function (now) {
        var fullDay = Math.floor((this.fullHour(now) / 24));
        this.render(this.options.fullDayDOM, fullDay);
        return fullDay;
    };
    Counter.prototype.fullHour = function (now) {
        var fullHour = Math.floor((this.fullMinute(now) / 60));
        this.render(this.options.fullHourDOM, fullHour);
        return fullHour;
    };
    Counter.prototype.fullMinute = function (now) {
        var fullMinute = Math.floor((this.fullSecond(now) / 60));
        this.render(this.options.fullMinuteDOM, fullMinute);
        return fullMinute;
    };
    Counter.prototype.fullSecond = function (now) {
        var fullSecond = Math.floor(this.upDownFixer * (this.datetime.getTime() - now.getTime()) / 1000);
        this.render(this.options.fullSecondDOM, fullSecond);
        return fullSecond;
    };
    Counter.prototype.year = function (now) {
        var year = this.fullYear(now);
        this.render(this.options.yearDOM, year);
        return year;
    };
    Counter.prototype.day = function (now) {
        var day = Math.floor(this.fullDay(now) % 365);
        this.render(this.options.dayDOM, day);
        return day;
    };
    Counter.prototype.hour = function (now) {
        var hour = Math.floor(this.fullHour(now) % 24);
        this.render(this.options.hourDOM, hour);
        return hour;
    };
    Counter.prototype.minute = function (now) {
        var minute = Math.floor(this.fullMinute(now) % 60);
        this.render(this.options.minuteDOM, minute);
        return minute;
    };
    Counter.prototype.second = function (now) {
        var second = Math.floor(this.fullSecond(now) % 60);
        this.render(this.options.secondDOM, second);
        return second;
    };
    Counter.prototype.initialize = function (time) {
        var self = this;
        function recursive(time) {
            var now = new Date();
            var seconds = Math.round((time - self.start) / 1000);
            if (self.options.secondDOM || self.options.fullSecondDOM) {
                self.second(now);
            }
            if (self.options.minuteDOM || self.options.fullMinuteDOM) {
                self.minute(now);
            }
            if (self.options.hourDOM || self.options.fullHourDOM) {
                self.hour(now);
            }
            if (self.options.dayDOM || self.options.fullDayDOM) {
                self.day(now);
            }
            if (self.options.yearDOM || self.options.fullYearDOM) {
                self.year(now);
            }
            var fullSecond = new CustomEvent('countdown.current', {
                detail: self.fullSecond(now)
            });
            self.options.fullSecondDOM && ('length' in self.options.fullSecondDOM
                ? __spreadArray([], self.options.fullSecondDOM).forEach(function (d) { return d.dispatchEvent(fullSecond); })
                : self.options.fullSecondDOM.dispatchEvent(fullSecond));
            var targetNext = (seconds + 1) * 1e3 + self.start;
            if (!self.stop) {
                setTimeout(function () {
                    requestAnimationFrame(recursive);
                }, targetNext - performance.now());
            }
        }
        recursive(time);
    };
    return Counter;
}());
exports.Counter = Counter;
