import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Trade',
    slug: SLUGS.Trade,
    loader: () => import('./v2'),
  },
  {
    name: 'Trade',
    slug: SLUGS.TradeContracts,
    loader: () => import('./views/contracts'),
  },
];

appendTemplates(templates);
