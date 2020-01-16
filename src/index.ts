interface ITarget {
  datetime: Date
  now: Date
  options: Options

  fullYear(dom: HTMLElement): number
  fullDay(dom: HTMLElement): number
  fullHour(dom: HTMLElement): number
  fullMinute(dom: HTMLElement): number
  fullSecond(dom: HTMLElement): number
  year(dom: HTMLElement): number
  day(dom: HTMLElement): number
  hour(dom: HTMLElement): number
  minute(dom: HTMLElement): number
  second(dom: HTMLElement): number
}

interface Options {
  yearDOM: HTMLElement
  dayDOM: HTMLElement
  hourDOM: HTMLElement
  minuteDOM: HTMLElement
  secondDOM: HTMLElement
}

class CountDown implements ITarget {
  public datetime: Date
  public now: Date
  public options: Options

  constructor(datetime: string | Date, options: Options) {
    this.options = options

    this.datetime = typeof datetime === 'number' || typeof datetime === 'string' ? new Date(datetime.replace(/ /g,"T")) : datetime
    
    this.now = new Date()
  }

  public monthDays(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
  }

  public fullYear(): number {
    return this.datetime.getFullYear() - this.now.getFullYear()
  }

  public fullDay(): number {
    return Math.floor((this.fullHour() / 24))
  }

  public fullHour(): number {
    return Math.floor((this.fullMinute() / 60))
  }

  public fullMinute(): number {
    return Math.floor((this.fullSecond() / 60))
  }

  public fullSecond(): number {
    return Math.floor((this.datetime.getTime() - this.now.getTime()) / 1000)
  }

  public year(): number {
    const year = this.datetime.getFullYear() - this.now.getFullYear()
    if(this.options.yearDOM) this.options.yearDOM.innerHTML = year.toString().padStart(2, '0')
    return year
  }

  public day(): number {
    const day = Math.floor(this.fullDay() % 365)
    if(this.options.dayDOM) this.options.dayDOM.innerHTML = day.toString().padStart(2, '0')
    return day
  }

  public hour(): number {
    const hour = Math.floor(this.fullHour() % 24)
    if(this.options.hourDOM) this.options.hourDOM.innerHTML = hour.toString().padStart(2, '0')
    return hour
  }

  public minute(): number {
    const minute = Math.floor(this.fullMinute() % 60)
    if(this.options.minuteDOM) this.options.minuteDOM.innerHTML = minute.toString().padStart(2, '0')
    return minute
  }

  public second(): number {
    const second = Math.floor(this.fullSecond() % 60)
    if(this.options.secondDOM) this.options.secondDOM.innerHTML = second.toString().padStart(2, '0')
    return second
  }

  public initialize(): NodeJS.Timeout {
    this.now = new Date()
    this.second()
    this.minute()
    this.hour()
    this.day()
    this.year()

    return setInterval(() => {
      this.now = new Date()

      this.second()

      if(this.second() === 59) {
        this.minute()

        this.minute() === 59 && this.hour()

        this.hour() === 23 && this.day()

        this.day() === 364 && this.year()
      }
    }, 1000)
  }
}

export default CountDown