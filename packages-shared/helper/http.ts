import {readToken} from '@/token';
import qs from 'query-string';
import {camelCase} from './camel';

const TOKEN_HEADER = 'SessionId';

const httpInitOptions: HttpInitOptions = {};

export {HttpDelete as del, httpGet as get, httpPost as post, httpPut as put};

export function initHttp(options: HttpInitOptions) {
  Object.assign(httpInitOptions, options);
}

export function httpGet<D = any>(
  url,
  {query, formatter, ...rest}: HttpOptions = {}
): Promise<RestState<D>> {
  return new Promise<RestState<D>>((resolve) =>
    ajax(
      {
        url,
        type: 'GET',
        query,
        ...rest,
      },
      formatter,
      resolve
    )
  );
}

export function httpPost<D = any>(
  url,
  {query, params, formatter, ...rest}: HttpOptions = {}
): Promise<RestState<D>> {
  return new Promise<RestState<D>>((resolve) =>
    ajax(
      {
        url,
        type: 'POST',
        headers: {'Content-Type': 'application/json'},
        query,
        params,
        ...rest,
      },
      formatter,
      resolve
    )
  );
}

export function httpPut<D = any>(
  url,
  {query, params, formatter, ...rest}: HttpOptions = {}
): Promise<RestState<D>> {
  return new Promise<RestState<D>>((resolve) =>
    ajax(
      {
        url,
        type: 'PUT',
        headers: {'Content-Type': 'application/json'},
        query,
        params,
        ...rest,
      },
      formatter,
      resolve
    )
  );
}

export function HttpDelete<D = any>(
  url,
  {query, params, formatter, ...rest}: HttpOptions = {}
): Promise<RestState<D>> {
  return new Promise<RestState<D>>((resolve) =>
    ajax({url, type: 'DELETE', query, params, ...rest}, formatter, resolve)
  );
}

export function upload<D = any>(url, {formData}) {
  return new Promise<RestState<D>>((resolve) =>
    ajax(
      {
        url,
        type: 'POST',
        formData,
      },
      null,
      resolve
    )
  );
}

function fillHeaders(xhr: XMLHttpRequest, {headers}: AjaxOptions) {
  const token = readToken();
  token && xhr.setRequestHeader(TOKEN_HEADER, token);
  headers && Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
}

function ajax<D>(
  options: AjaxOptions,
  formatter: (any) => any,
  resolve: (result: RestState<D>) => void
) {
  // @ts-ignore
  const xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 2) {
      // const token = xhr.getResponseHeader(TOKEN_HEADER);
      // if (token) {
      //   writeToken(token);
      //   mc.send('http', 'token-change', {token});
      // }
    }
    if (xhr.readyState === 4) {
      const result = genResult<D>(xhr.status, xhr.responseText, formatter);
      if (result.fail) {
        console.warn(`http request fail (${options.url}):`, result.error);
        if (options.toastError !== false && httpInitOptions.errorHandler) {
          httpInitOptions.errorHandler(result.error, options);
        }
      }
      resolve(result);
    }
  };

  const query = options.querystring
    ? '?' + options.querystring
    : options.query
    ? '?' + qs.stringify(options.query)
    : '';
  const body = options.formData
    ? options.formData
    : options.params
    ? JSON.stringify(options.params)
    : null;

  xhr.open(options.type, options.url + query, true);
  fillHeaders(xhr, options);
  xhr.send(body);
}

function genResult<D>(status: number, responseText: string, formatter: (any) => any): RestState<D> {
  if ((status >= 200 && status < 300) || status === 400) {
    const reply: any = camelCase(JSON.parse(responseText));
    if (reply.hasOwnProperty('code')) {
      if (reply.code === 0) {
        return {
          loading: false,
          success: true,
          data: formatter ? formatter(reply.data) : reply.data,
          reply,
        };
      }
      return {loading: false, fail: true, error: {code: reply.code, message: reply.msg}, reply};
    }
    // strapi api
    if (reply.data === null) {
      return {loading: false, fail: true, error: {code: 601, message: reply.error.message}, reply};
    }
    return {
      loading: false,
      success: true,
      data: formatter ? formatter(reply.data) : reply.data,
      reply,
    };
  }

  if (status === 401) {
    const reply = JSON.parse(responseText);
    // removeToken();
    // mc.send('http', '401', {reply});
    return {loading: false, fail: true, reply};
  }

  console.warn('network status:', status);
  return {loading: false, fail: true, error: {code: 499, message: 'network error'}, reply: null};
}
