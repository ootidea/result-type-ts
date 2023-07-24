export type Result<T, E = unknown> = Result.Success<T> | Result.Failure<E>

export namespace Result {
  export class Success<const T> {
    constructor(readonly value: T) {}

    readonly error?: never

    readonly isSuccess = true
    readonly isFailure = false

    getOrThrow(): T {
      return this.value
    }

    ifSuccess<U>(f: (value: T) => U): U {
      return f(this.value)
    }
    ifFailure(f: (value: never) => unknown): undefined {
      return undefined
    }

    map<U>(f: (value: T) => U): Success<U> {
      return new Success(f(this.value))
    }
    mapError(f: (error: never) => unknown): Success<T> {
      return this
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

    getOrThrow(): never {
      throw this.error
    }

    ifSuccess(f: (value: never) => unknown): undefined {
      return undefined
    }
    ifFailure<U>(f: (value: E) => U): U {
      return f(this.error)
    }

    map(f: (value: never) => unknown): Failure<E> {
      return this
    }
    mapError<U>(f: (error: E) => U): Failure<U> {
      return new Failure(f(this.error))
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
