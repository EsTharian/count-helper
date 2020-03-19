/***********************************************************************************************************************
 * https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
 * String.padStart()
 * version 1.0.1
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	57   	51      (No)	            44   	10      15
 * -------------------------------------------------------------------------------
 */
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
/**********************************************************************************************************************/

interface ITarget {
  datetime: Date;
  now: Date;
  options: Options;

  fullYear(dom: HTMLElement): number;
  fullDay(dom: HTMLElement): number;
  fullHour(dom: HTMLElement): number;
  fullMinute(dom: HTMLElement): number;
  fullSecond(dom: HTMLElement): number;
  year(dom: HTMLElement): number;
  day(dom: HTMLElement): number;
  hour(dom: HTMLElement): number;
  minute(dom: HTMLElement): number;
  second(dom: HTMLElement): number;
}

interface Options {
  yearDOM: HTMLElement | NodeList | Node;
  dayDOM: HTMLElement | NodeList | Node;
  hourDOM: HTMLElement | NodeList | Node;
  minuteDOM: HTMLElement | NodeList | Node;
  secondDOM: HTMLElement | NodeList | Node;
}

class CountDown implements ITarget {
  public datetime: Date;
  public now: Date;
  public options: Options;

  constructor(datetime: string | Date, options: Options) {
    this.options = options;

    // If datetime type is "yyyy-mm-dd hh:mm", replace space with "T"
    this.datetime = typeof datetime === 'number' || typeof datetime === 'string'
        ? new Date(datetime.replace(/ /g,"T")) : datetime;
    
    this.now = new Date();
  }

  public stringify(counted: number): string {
    return counted.toString().padStart(2, '0');
  }

  public render(dom: any, value: any) {
    value = this.stringify(value);

    dom && (dom.length ? [...dom].forEach((d) => d.innerHTML = value) : dom.innerHTML = value);
  }

  public monthDays(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
  }

  public fullYear(): number {
    return this.datetime.getFullYear() - this.now.getFullYear();
  }

  public fullDay(): number {
    return Math.floor((this.fullHour() / 24));
  }

  public fullHour(): number {
    return Math.floor((this.fullMinute() / 60));
  }

  public fullMinute(): number {
    return Math.floor((this.fullSecond() / 60))
  }

  public fullSecond(): number {
    return Math.floor((this.datetime.getTime() - this.now.getTime()) / 1000);
  }

  public year(): number {
    const year = this.datetime.getFullYear() - this.now.getFullYear();
    this.render(this.options.yearDOM, year);
    return year;
  }

  public day(): number {
    const day = Math.floor(this.fullDay() % 365);
    this.render(this.options.dayDOM, day);
    return day;
  }

  public hour(): number {
    const hour = Math.floor(this.fullHour() % 24);
    this.render(this.options.hourDOM, hour);
    return hour;
  }

  public minute(): number {
    const minute = Math.floor(this.fullMinute() % 60);
    this.render(this.options.minuteDOM, minute);
    return minute;
  }

  public second(): number {
    const second = Math.floor(this.fullSecond() % 60);
    this.render(this.options.secondDOM, second);
    return second;
  }

  public initialize(): NodeJS.Timeout {
    this.now = new Date();
    this.second();
    this.minute();
    this.hour();
    this.day();
    this.year();

    return setInterval(() => {
      this.now = new Date();

      this.second();

      if(this.second() === 59) {
        this.minute();

        this.minute() === 59 && this.hour();

        this.hour() === 23 && this.day();

        this.day() === 364 && this.year();
      }
    }, 1000);
  }
}

export default CountDown