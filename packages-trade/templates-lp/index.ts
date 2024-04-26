import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Liquidity',
    slug: SLUGS.Liquidity,
    loader: () => import('./views'),
  },
];

appendTemplates(templates);
