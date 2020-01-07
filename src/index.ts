interface ITarget {
  datetime: string | bigint | number
  targetDOM: HTMLElement

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

class CountDown implements ITarget {
  public datetime: string | bigint | number
  public targetDOM: HTMLElement

  constructor(datetime: string | bigint | number, targetDOM: HTMLElement) {
    this.datetime = datetime
    this.targetDOM = targetDOM
  }

  public fullYear(dom: HTMLElement = null): number {
    if(dom) {
      dom.innerText = ''
    }
    return 1
  }

  public fullDay(dom: HTMLElement = null): number {
    return 1
  }

  public fullHour(dom: HTMLElement = null): number {
    return 1
  }

  public fullMinute(dom: HTMLElement = null): number {
    return 1
  }

  public fullSecond(dom: HTMLElement = null): number {
    return 1
  }

  public year(dom: HTMLElement = null): string {
    return "1"
  }

  public day(dom: HTMLElement = null): string {
    return "1"
  }

  public hour(dom: HTMLElement = null): string {
    return "1"
  }

  public minute(dom: HTMLElement = null): string {
    return "1"
  }

  public second(dom: HTMLElement = null): string {
    return "1"
  }
}

export default CountDown