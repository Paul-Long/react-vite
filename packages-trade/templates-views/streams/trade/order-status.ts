import {Toast} from '@rx/widgets';
import {BehaviorSubject} from 'rxjs';

export const orderStatus$ = new BehaviorSubject<{event: string; data: any} | null>(null);

orderStatus$.subscribe((eventData) => {
  const {event, data} = eventData || {};
  console.log('------ order status : ', event, data);
  if (event === 'OrderRecord') {
    console.log('------ order status : ', event, data?.user?.toBase58(), data?.order?.orderId);
  }
  if (event === 'Finished') {
    Toast.success(`Place Order Success.`);
  }
});
