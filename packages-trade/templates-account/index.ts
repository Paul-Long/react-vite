import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Portfolio',
    slug: SLUGS.Portfolio,
    loader: () => import('./portfolio'),
  },
];

appendTemplates(templates);
