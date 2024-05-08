import {BehaviorSubject, Subject} from 'rxjs';

export const asset$ = new BehaviorSubject<string>('SOL');
export const chain$ = new BehaviorSubject<string>('SOL');
export const contract$ = new BehaviorSubject<string | null>(null);
export const maturity$ = new BehaviorSubject<string | null>(null);
export const time$ = new BehaviorSubject<string>('1M');
export const resize$ = new Subject();
export const openRecent$ = new BehaviorSubject<boolean>(false);

export const mode$ = new BehaviorSubject('YT');
