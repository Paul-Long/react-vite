import {BehaviorSubject} from 'rxjs';

export const selectPosition$ = new BehaviorSubject<Record<string, any> | null>(null);
