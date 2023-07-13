export type Result<T, E extends Error = Error> = Success<T> | Failure<E>

export class Success<T> {
  constructor(public value: T) {}
  readonly isSuccess = true
  readonly isFailure = false
}

export class Failure<E extends Error> {
  constructor(public error: E) {}
  readonly isSuccess = false
  readonly isFailure = true
}
