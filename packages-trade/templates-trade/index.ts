import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Trade',
    slug: SLUGS.Trade,
    loader: () => import('./trade'),
  },
];

appendTemplates(templates);
