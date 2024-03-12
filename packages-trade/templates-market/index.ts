import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Dashboard',
    slug: SLUGS.Home,
    loader: () => import('./market'),
  },
];

appendTemplates(templates);
