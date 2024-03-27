type RestState<D = any> = {loading: boolean} & {success?: true; data?: D; reply?: any} & {fail?: true; error?: any; reply?: any};

interface HttpResult {
  data?: any;
  error?: any;
  reply?: any;
}

interface HttpOptions {
  toastError?: boolean;
  querystring?: string;
  query?: {[x: string]: any};
  formData?: FormData;
  params?: {[x: string]: any};
  formatter?: (any) => any;
}

interface AjaxOptions {
  url?: string;
  type?: string;
  headers?: Record<string, string>;
  toastError?: boolean;
  querystring?: string;
  query?: {[x: string]: any};
  formData?: FormData;
  params?: {[x: string]: any};
}

type HttpErrorHandler = (error: SysError, options?: AjaxOptions) => void;

interface SysError {
  code: number;
  message?: string;
  params?: Record<string, any>;
  type?: 'error' | 'success';
}

interface HttpInitOptions {
  errorHandler?: HttpErrorHandler;
}
