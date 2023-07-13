export class Success<const T> {
  constructor(public readonly value: T) {}
  readonly isSuccess = true
  readonly isFailure = false
}

export class Failure<const E> {
  constructor(public readonly error: E) {}
  readonly isSuccess = false
  readonly isFailure = true
}

export type Result<T, E = unknown> = Success<T> | Failure<E>
