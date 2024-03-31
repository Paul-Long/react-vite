import {BehaviorSubject} from 'rxjs';

const _user$ = new BehaviorSubject<User>(createInitUser());
export const user$ = _user$.asObservable();

export function updateUser(user: User) {
  _user$.next(user);
}

export function resetUser() {
  _user$.next(createInitUser());
}

function createInitUser(): User {
  return {
    userId: 0,
    name: 'Guest',
    kolFlag: '0',
    sid: '8cfW3Lwxgh3FV43ANxxskg==',
  };
}
