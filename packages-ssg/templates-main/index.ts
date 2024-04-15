import {HOME_SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Home',
    slug: HOME_SLUGS.Home,
    loader: () => import('./home'),
  },
];

appendTemplates(templates);
