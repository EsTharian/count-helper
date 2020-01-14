/// <reference types="node" />
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
    yearDOM: HTMLElement;
    dayDOM: HTMLElement;
    hourDOM: HTMLElement;
    minuteDOM: HTMLElement;
    secondDOM: HTMLElement;
}
declare class CountDown implements ITarget {
    datetime: Date;
    now: Date;
    options: Options;
    constructor(datetime: string | number | Date, options: Options);
    monthDays(date: Date): number;
    fullYear(): number;
    fullDay(): number;
    fullHour(): number;
    fullMinute(): number;
    fullSecond(): number;
    year(): number;
    day(): number;
    hour(): number;
    minute(): number;
    second(): number;
    initialize(): NodeJS.Timeout;
}
export default CountDown;
