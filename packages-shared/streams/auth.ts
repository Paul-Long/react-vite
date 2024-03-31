import {userApi} from '@rx/api/user';
import {readToken} from '@rx/helper/token';
import {BehaviorSubject, Subject, map} from 'rxjs';
import {updateUser} from './user';

const _authStatus$ = new BehaviorSubject<AuthStatus>('Init');
export const authStatus$ = _authStatus$.asObservable();

export const isLogin$ = authStatus$.pipe(map((authStatus) => authStatus === 'Login'));
export const login$ = new Subject<User>();
export const logout$ = new Subject<{manual?: boolean; code?: number}>();

login$.subscribe((user: User) => {
  updateUser(user);
  _authStatus$.next('Login');
});

logout$.subscribe(async ({manual, code}) => {
  _authStatus$.next('Logout');
});

export async function checkAuth() {
  const token = readToken();
  if (!token) {
    _authStatus$.next('Logout');
    return;
  }

  const {success, data, fail, error} = await userApi.userInfo();
  if (success) {
    login$.next(data);
  }
  if (fail) {
    logout$.next({manual: false, code: error.code});
  }
}
