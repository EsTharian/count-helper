interface ITarget {
  datetime: Date
  targetDOMs: object
  now: Date
  options: Options

  fullYear(dom: HTMLElement): number
  fullDay(dom: HTMLElement): number
  fullHour(dom: HTMLElement): number
  fullMinute(dom: HTMLElement): number
  fullSecond(dom: HTMLElement): number
  year(dom: HTMLElement): string
  day(dom: HTMLElement): string
  hour(dom: HTMLElement): string
  minute(dom: HTMLElement): string
  second(dom: HTMLElement): string
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
  public targetDOMs: object
  public now: Date
  public options: Options

  constructor(datetime: string | number | Date, options: Options) {
    this.options = options

    this.datetime = typeof datetime === 'number' || typeof datetime === 'string' ? new Date(datetime) : datetime
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

  public year(): string {
    const year = this.datetime.getFullYear() - this.now.getFullYear()
    return year.toString().padStart(2, '0')
  }

  public day(): string {
    return Math.floor(this.fullDay() % 365).toString().padStart(2, '0')
  }

  public hour(): string {
    return Math.floor(this.fullHour() % 24).toString().padStart(2, '0')
  }

  public minute(): string {
    return Math.floor(this.fullMinute() % 60).toString().padStart(2, '0')
  }

  public second(): string {
    return Math.floor(this.fullSecond() % 60).toString().padStart(2, '0')
  }

  public initialize(): NodeJS.Timeout {
    return setInterval(() => {
      this.now = new Date()

      console.log(this.second())

      if(this.second() === '59') {
        console.log(this.minute())

        this.options.hourDOM.innerHTML = this.minute() === '59' && this.hour()
        this.hour() === '23' && console.log(this.day())
        this.day() === '364' && console.log(this.year())
      }
    }, 1000)
  }
}

export default CountDown