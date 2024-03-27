const KEY = 'SESSION-ID';

export function readToken() {
  return localStorage.getItem(KEY);
}

export function writeToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function removeToken() {
  localStorage.removeItem(KEY);
}
