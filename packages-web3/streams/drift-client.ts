import {DriftClient} from '@/sdk/drift-client';
import {BehaviorSubject} from 'rxjs';

export const driftClient$ = new BehaviorSubject<DriftClient | null>(null);
