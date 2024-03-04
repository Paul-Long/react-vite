import {SLUGS} from '@rx/const/slugs';
import {appendTemplates} from '@rx/helper/template';

export const templates: Template[] = [
  {
    name: 'Test',
    slug: SLUGS.Test,
    loader: () => import('./test'),
  },
];

appendTemplates(templates);
