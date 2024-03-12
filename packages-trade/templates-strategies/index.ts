import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Strategy',
    slug: SLUGS.Strategy,
    loader: () => import('./strategies'),
  },
];

appendTemplates(templates);
