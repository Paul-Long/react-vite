import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Account',
    slug: SLUGS.Account,
    loader: () => import('./views'),
  },
];

appendTemplates(templates);
