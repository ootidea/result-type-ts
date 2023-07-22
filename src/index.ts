export class Success<const T> {
  constructor(public readonly value: T) {}
  public readonly error?: never
  readonly isSuccess = true
  readonly isFailure = false

  map<T2, E>(f: (value: T) => T2, g: (_: never) => E): Success<T2> {
    return new Success(f(this.value))
  }
}

export class Failure<const E> {
  constructor(public readonly error: E) {}
  public readonly value?: never
  readonly isSuccess = false
  readonly isFailure = true

  map<T, E2>(f: (_: never) => T, g: (value: E) => E2): Failure<E2> {
    return new Failure(g(this.error))
  }
}

export type Result<T, E = unknown> = Success<T> | Failure<E>

export namespace Result {
  export function tryCatch<T>(f: () => T): Result<T> {
    try {
      return new Success(f())
    } catch (error) {
      return new Failure(error)
    }
  }
}
