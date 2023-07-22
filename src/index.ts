export type Result<T, E = unknown> = Result.Success<T> | Result.Failure<E>

export namespace Result {
  export class Success<const T> {
    constructor(readonly value: T) {}

    readonly error?: never

    readonly isSuccess = true
    readonly isFailure = false

    ifSuccess<U>(f: (value: T) => U): U {
      return f(this.value)
    }
    ifFailure(f: (value: never) => unknown): undefined {
      return undefined
    }

    map<T2, E>(f: (value: T) => T2, g: (_: never) => E): Success<T2> {
      return new Success(f(this.value))
    }

    flatMap<T2, E>(f: (value: T) => Result<T2, E>): Result<T2, E> {
      return f(this.value)
    }
  }

  export class Failure<const E> {
    constructor(readonly error: E) {}

    readonly value?: never

    readonly isSuccess = false
    readonly isFailure = true

    ifSuccess(f: (value: never) => unknown): undefined {
      return undefined
    }
    ifFailure<U>(f: (value: E) => U): U {
      return f(this.error)
    }

    map<T, E2>(f: (_: never) => T, g: (value: E) => E2): Failure<E2> {
      return new Failure(g(this.error))
    }

    flatMap<T, E2>(f: (_: never) => Result<T, E2>): Failure<E> {
      return this
    }
  }

  export function tryCatch<T>(f: () => T): Result<T> {
    try {
      return new Success(f())
    } catch (error) {
      return new Failure(error)
    }
  }

  export function success<const T>(value: T): Success<T> {
    return new Success(value)
  }

  export function failure<const E>(error: E): Failure<E> {
    return new Failure(error)
  }
}
