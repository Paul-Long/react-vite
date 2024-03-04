interface Window {
  preloadedData: PreloadedData;
}

interface PreloadedData {
  templateName?: string;
  pageData: any;
}

type PreloadedDataLoader = ((templateName: string, pageDataLoaders: ContentLoader[]) => Promise<PreloadedData>) | (() => Promise<PreloadedData>);

interface ContentService {
  findTemplateName: ((url: string) => Promise<string>) | (() => Promise<string>);
  loadPreloadedData: PreloadedDataLoader;
}

interface ContentQuery {
  populate?: string | string[] | Record<string, any>;
  locale?: string;
  fields?: string[];
  filters?: Record<string, any>;
  [index: string]: any;
}

interface EntityQuery {
  apiPath?: string;
  query?: ContentQuery;
  formatter?: (data?: any) => any;
}

interface ContentLoaderResult {
  initValue?: any;
  reduce?: (p: any, c: any, index?: number) => any;
  queries?: EntityQuery[];
}

type ContentLoader = (prev: any) => ContentLoaderResult;

type FindManyParams = {apiPath?: string; query: Record<string, any>};

type FindMany = (params: FindManyParams) => Promise<any>;

interface Template {
  name: string;
  locale?: Locale;
  slug?: string;
  loader: (locale?: Locale) => Promise<{component: (props: any) => any; getPageDataLoaders: (locale: Locale, slug: string) => ContentLoader[]}>;
}
