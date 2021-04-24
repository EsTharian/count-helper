import './polyfills';
import {ICountDown, IOptions} from './Interfaces';


export class CountDown implements ICountDown {
  datetime: Date
  options: IOptions
  start = document.timeline.currentTime

  constructor(datetime: string | Date, options: IOptions) {
    this.options = options;

    // If datetime type is "yyyy-mm-dd hh:mm", replace space with "T"
    this.datetime = typeof datetime === 'string'
      ? new Date(datetime.replace(/ /g,"T")) : datetime;
  }

  stringify(counted: number): string {
    return counted.toString().padStart(2, '0');
  }

  render(dom: any, value: any) {
    value = this.stringify(value);

    dom && (dom.length ? [...dom].forEach((d) => d.innerHTML = value) : dom.innerHTML = value);
  }

  monthDays(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
  }

  fullYear(now: Date): number {
    return this.datetime.getFullYear() - now.getFullYear();
  }

  fullDay(now: Date): number {
    return Math.round((this.fullHour(now) / 24));
  }

  fullHour(now: Date): number {
    return Math.round((this.fullMinute(now) / 60));
  }

  fullMinute(now: Date): number {
    return Math.round((this.fullSecond(now) / 60))
  }

  fullSecond(now: Date): number {
    return Math.round((this.datetime.getTime() - now.getTime()) / 1000);
  }

  year(now: Date): number {
    const year = this.datetime.getFullYear() - now.getFullYear();
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

      const seconds = Math.round((time - self.start) / 1000)
      self.second(now);
      self.minute(now);
      self.hour(now);
      self.day(now);
      self.year(now);
      const targetNext = (seconds + 1) * 1e3 + self.start;

      return setTimeout(() => {
        requestAnimationFrame(recursive)
      }, targetNext - performance.now());
    }

    recursive(this.start);
  }
}
