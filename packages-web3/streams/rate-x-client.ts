import {RateClient} from '@/sdk';
import {BehaviorSubject} from 'rxjs';

export const rateXClient$ = new BehaviorSubject<RateClient | null>(null);
export const clientReady$ = new BehaviorSubject(false);
