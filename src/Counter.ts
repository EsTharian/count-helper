import './polyfills';
import {ICounter, IOptions} from './Interfaces';


export class Counter implements ICounter {
  datetime: Date
  options: IOptions
  start = document.timeline.currentTime
  stop = false
  upDownFixer: number

  constructor(datetime: string | Date, options: IOptions) {
    this.options = options;
    this.upDownFixer = this.options.type === 'countup' ? -1 : 1;

    // If datetime type is "yyyy-mm-dd hh:mm", replace space with "T"
    this.datetime = typeof datetime === 'string'
      ? new Date(datetime.replace(/ /g,"T")) : datetime;
  }

  stringify(counted: number): string {
    return counted.toString().padStart(2, '0');
  }

  render(dom: any, value: any) {
    if (value < 0) {
      const negative = new Event('countdown.negative');

      dom && (dom.length
        ? [...dom].forEach((d) => d.dispatchEvent(negative))
        : dom.dispatchEvent(negative));

      this.stop = true;

      dom && (dom.length
        ? [...dom].forEach((d) => d.innerHTML = '00')
        : dom.innerHTML = '00');
    } else {
      value = this.stringify(value);

      dom && (dom.length
        ? [...dom].forEach((d) => d.innerHTML = value)
        : dom.innerHTML = value);
    }

  }

  fullYear(now: Date): number {
    const fullYear = this.upDownFixer * (this.datetime.getFullYear() - now.getFullYear()) - Math.max(0, this.upDownFixer);
    this.render(this.options.fullYearDOM, fullYear);
    return fullYear;
  }

  fullDay(now: Date): number {
    const fullDay = Math.floor((this.fullHour(now) / 24));
    this.render(this.options.fullDayDOM, fullDay);
    return fullDay;
  }

  fullHour(now: Date): number {
    const fullHour = Math.floor((this.fullMinute(now) / 60));
    this.render(this.options.fullHourDOM, fullHour);
    return fullHour;
  }

  fullMinute(now: Date): number {
    const fullMinute = Math.floor((this.fullSecond(now) / 60));
    this.render(this.options.fullMinuteDOM, fullMinute)
    return fullMinute;
  }

  fullSecond(now: Date): number {
    const fullSecond = Math.floor(this.upDownFixer * (this.datetime.getTime() - now.getTime()) / 1000);
    this.render(this.options.fullSecondDOM, fullSecond);
    return fullSecond;
  }

  year(now: Date): number {
    const year = this.fullYear(now);
    this.render(this.options.yearDOM, year);
    return year;
  }

  day(now: Date): number {
    const day = Math.floor(this.fullDay(now) % 365);
    this.render(this.options.dayDOM, day);
    return day;
  }

  hour(now: Date): number {
    const hour = Math.floor(this.fullHour(now) % 24);
    this.render(this.options.hourDOM, hour);
    return hour;
  }

  minute(now: Date): number {
    const minute = Math.floor(this.fullMinute(now) % 60);
    this.render(this.options.minuteDOM, minute);
    return minute;
  }

  second(now: Date): number {
    const second = Math.floor(this.fullSecond(now) % 60);
    this.render(this.options.secondDOM, second);
    return second;
  }

  initialize(time: number): void {
    const self = this;

    function recursive(time: number) {
      const now = new Date();

      const seconds = Math.round((time - self.start) / 1000);
      self.second(now);
      self.minute(now);
      self.hour(now);
      self.day(now);
      self.year(now);
      const targetNext = (seconds + 1) * 1e3 + self.start;

      if (!self.stop) {
        setTimeout(() => {
          requestAnimationFrame(recursive);
        }, targetNext - performance.now());
      }
    }

    recursive(time);
  }
}
