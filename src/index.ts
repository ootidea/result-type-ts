export type Result<T, E extends Error = Error> = Success<T> | Failure<E>

export class Success<T> {
  constructor(public value: T) {}
  isSuccess = true
  isFailure = false
}

export class Failure<E extends Error> {
  constructor(public error: E) {}
  isSuccess = false
  isFailure = true
}
