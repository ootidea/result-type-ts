export class Success<const T> {
  constructor(public readonly value: T) {}
  public readonly error?: never
  readonly isSuccess = true
  readonly isFailure = false
}

export class Failure<const E> {
  constructor(public readonly error: E) {}
  public readonly value?: never
  readonly isSuccess = false
  readonly isFailure = true
}

export type Result<T, E = unknown> = Success<T> | Failure<E>
