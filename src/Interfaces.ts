export interface ICounter {
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
  type: string
  fullYearDOM: NodeList | Node
  fullDayDOM: NodeList | Node
  fullHourDOM: NodeList | Node
  fullMinuteDOM: NodeList | Node
  fullSecondDOM: Node | Array<any>
  yearDOM: NodeList | Node
  dayDOM: NodeList | Node
  hourDOM: NodeList | Node
  minuteDOM: NodeList | Node
  secondDOM: NodeList | Node
}