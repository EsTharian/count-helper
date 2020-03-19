/// <reference types="node" />
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
declare class CountDown implements ITarget {
    datetime: Date;
    now: Date;
    options: Options;
    constructor(datetime: string | Date, options: Options);
    stringify(counted: number): string;
    render(dom: any, value: any): void;
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
