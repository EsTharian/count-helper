"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountDown = void 0;
require("./polyfills");
var CountDown = /** @class */ (function () {
    function CountDown(datetime, options) {
        this.start = document.timeline.currentTime;
        this.options = options;
        // If datetime type is "yyyy-mm-dd hh:mm", replace space with "T"
        this.datetime = typeof datetime === 'string'
            ? new Date(datetime.replace(/ /g, "T")) : datetime;
    }
    CountDown.prototype.stringify = function (counted) {
        return counted.toString().padStart(2, '0');
    };
    CountDown.prototype.render = function (dom, value) {
        value = this.stringify(value);
        dom && (dom.length ? __spreadArray([], dom).forEach(function (d) { return d.innerHTML = value; }) : dom.innerHTML = value);
    };
    CountDown.prototype.monthDays = function (date) {
        var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return d.getDate();
    };
    CountDown.prototype.fullYear = function (now) {
        return this.datetime.getFullYear() - now.getFullYear();
    };
    CountDown.prototype.fullDay = function (now) {
        return Math.round((this.fullHour(now) / 24));
    };
    CountDown.prototype.fullHour = function (now) {
        return Math.round((this.fullMinute(now) / 60));
    };
    CountDown.prototype.fullMinute = function (now) {
        return Math.round((this.fullSecond(now) / 60));
    };
    CountDown.prototype.fullSecond = function (now) {
        return Math.round((this.datetime.getTime() - now.getTime()) / 1000);
    };
    CountDown.prototype.year = function (now) {
        var year = this.datetime.getFullYear() - now.getFullYear();
        this.render(this.options.yearDOM, year);
        return year;
    };
    CountDown.prototype.day = function (now) {
        var day = Math.floor(this.fullDay(now) % 365);
        this.render(this.options.dayDOM, day);
        return day;
    };
    CountDown.prototype.hour = function (now) {
        var hour = Math.floor(this.fullHour(now) % 24);
        this.render(this.options.hourDOM, hour);
        return hour;
    };
    CountDown.prototype.minute = function (now) {
        var minute = Math.floor(this.fullMinute(now) % 60);
        this.render(this.options.minuteDOM, minute);
        return minute;
    };
    CountDown.prototype.second = function (now) {
        var second = Math.floor(this.fullSecond(now) % 60);
        this.render(this.options.secondDOM, second);
        return second;
    };
    CountDown.prototype.initialize = function (time) {
        var self = this;
        function recursive(time) {
            var now = new Date();
            var seconds = Math.round((time - self.start) / 1000);
            self.second(now);
            self.minute(now);
            self.hour(now);
            self.day(now);
            self.year(now);
            var targetNext = (seconds + 1) * 1e3 + self.start;
            return setTimeout(function () {
                requestAnimationFrame(recursive);
            }, targetNext - performance.now());
        }
        recursive(this.start);
    };
    return CountDown;
}());
exports.CountDown = CountDown;
