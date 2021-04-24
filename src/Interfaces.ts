export interface ICountDown {
  datetime: Date
  options: IOptions

  fullYear(now: Date): number
  fullDay(now: Date): number
  fullHour(now: Date): number
  fullMinute(now: Date): number
  fullSecond(now: Date): number
  year(now: Date): number
  day(now: Date): number
  hour(now: Date): number
  minute(now: Date): number
  second(now: Date): number
}

export interface IOptions {
  yearDOM: HTMLElement | NodeList | Node
  dayDOM: HTMLElement | NodeList | Node
  hourDOM: HTMLElement | NodeList | Node
  minuteDOM: HTMLElement | NodeList | Node
  secondDOM: HTMLElement | NodeList | Node
}