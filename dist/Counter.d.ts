import './polyfills';
import { ICounter, IOptions } from './Interfaces';
export declare class Counter implements ICounter {
    datetime: Date;
    options: IOptions;
    start: number;
    stop: boolean;
    upDownFixer: number;
    constructor(datetime: string | Date, options: IOptions);
    stringify(counted: number): string;
    render(dom: any, value: any): void;
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
    initialize(time: number): void;
}
//# sourceMappingURL=Counter.d.ts.map