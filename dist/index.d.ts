import './polyfills';
import { ITarget, IOptions } from './Interfaces';
export declare class CountDown implements ITarget {
    datetime: Date;
    options: IOptions;
    constructor(datetime: string | Date, options: IOptions);
    stringify(counted: number): string;
    render(dom: any, value: any): void;
    monthDays(date: Date): number;
    fullYear(now: Date): number;
    fullDay(now: Date): number;
    fullHour(now: Date): number;
    fullMinute(now: Date): number;
    fullSecond(now: Date): number;
    year(now: Date): number;
    day(now: Date): number;
    hour(now: Date): number;
    minute(now: Date): number;
    second(now: Date): number;
    initialize(): number;
}
//# sourceMappingURL=index.d.ts.map