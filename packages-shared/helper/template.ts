const templateSet: Set<Template> = new Set<Template>();

export function getAllTemplates(): Template[] {
  return [...templateSet];
}

export function appendTemplates(templates: Template[]) {
  templates.forEach((template: Template) => templateSet.add(template));
}

export function findStaticTemplate(locale: Locale, slug: string) {
  return [...templateSet].find(
    (template: Template) =>
      (template.locale === undefined || template.locale === locale) && template.slug === slug
  );
}
