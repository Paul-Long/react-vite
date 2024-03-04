declare module 'rxjs' {
  interface BehaviorSubject<T> {
    set(value: T): void;
  }
}
