import {BehaviorSubject, Subject} from 'rxjs';

export const chain$ = new BehaviorSubject<string>('SOL');
export const contract$ = new BehaviorSubject<string | null>(null);
export const maturity$ = new BehaviorSubject<string | null>(null);
export const contractInfo$ = new BehaviorSubject<Contract | null>(null);
export const lastInfo$ = new BehaviorSubject(null);
export const resize$ = new Subject();
export const openRecent$ = new BehaviorSubject<boolean>(false);
