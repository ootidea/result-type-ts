function getOrThrow<T>(this: Result.Success<T>): T
function getOrThrow<E>(this: Result.Failure<E>): never
function getOrThrow<T, E>(this: Result<T, E>): T
function getOrThrow<T, E>(this: Result<T, E>): T {
  if (this.isSuccess) return this.value

  throw this.error
}

function toUnion<T>(this: Result.Success<T>): T
function toUnion<E>(this: Result.Failure<E>): E
function toUnion<T, E>(this: Result<T, E>): T | E
function toUnion<T, E>(this: Result<T, E>): T | E {
  if (this.isSuccess) return this.value

  return this.error
}

function ifSuccess<T, T2>(this: Result.Success<T>, f: (value: T) => T2): T2
function ifSuccess<T, E, T2>(this: Result.Failure<E>, f: (value: T) => T2): undefined
function ifSuccess<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): T2 | undefined
function ifSuccess<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): T2 | undefined {
  if (this.isFailure) return undefined

  return f(this.value)
}

function ifFailure<T, E, E2>(this: Result.Success<T>, f: (error: E) => E2): undefined
function ifFailure<E, E2>(this: Result.Failure<E>, f: (error: E) => E2): E2
function ifFailure<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): E2 | undefined
function ifFailure<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): E2 | undefined {
  if (this.isSuccess) return undefined

  return f(this.error)
}

function match<T, E, T2, E2>(this: Result.Success<T>, f: (value: T) => T2, g: (error: E) => E2): T2
function match<T, E, T2, E2>(this: Result.Failure<E>, f: (value: T) => T2, g: (error: E) => E2): E2
function match<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => T2, g: (error: E) => E2): T2 | E2
function match<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => T2, g: (error: E) => E2): T2 | E2 {
  if (this.isSuccess) return f(this.value)

  return g(this.error)
}

function map<T, T2>(this: Result.Success<T>, f: (value: T) => T2): Result.Success<T2>
function map<T, E, T2>(this: Result.Failure<E>, f: (value: T) => T2): Result.Failure<E>
function map<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): Result<T2, E>
function map<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): Result<T2, E> {
  if (this.isFailure) return this

  return Result.success(f(this.value))
}

function mapError<T, E, E2>(this: Result.Success<T>, f: (error: E) => E2): Result.Success<T>
function mapError<E, E2>(this: Result.Failure<E>, f: (error: E) => E2): Result.Failure<E2>
function mapError<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): Result<T, E2>
function mapError<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): Result<T, E2> {
  if (this.isSuccess) return this

  return Result.failure(f(this.error))
}

function flatMap<T, T2>(this: Result.Success<T>, f: (value: T) => Result.Success<T2>): Result.Success<T2>
function flatMap<T, E2>(this: Result.Success<T>, f: (value: T) => Result.Failure<E2>): Result.Failure<E2>
function flatMap<T, T2, E2>(this: Result.Success<T>, f: (value: T) => Result<T2, E2>): Result<T2, E2>
function flatMap<T, E, T2, E2>(this: Result.Failure<E>, f: (value: T) => Result<T2, E2>): Result.Failure<E>
function flatMap<T, E, T2>(this: Result<T, E>, f: (value: T) => Result.Success<T2>): Result<T2, E>
function flatMap<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Result.Failure<E2>): Result.Failure<E | E2>
function flatMap<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Result<T2, E2>): Result<T2, E | E2>
function flatMap<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Result<T2, E2>) {
  if (this.isFailure) return this

  return f(this.value)
}

function flatMapAsync<T, T2>(this: Result.Success<T>, f: (value: T) => Promise<Result.Success<T2>>): Promise<Result.Success<T2>>
function flatMapAsync<T, E2>(this: Result.Success<T>, f: (value: T) => Promise<Result.Failure<E2>>): Promise<Result.Failure<E2>>
function flatMapAsync<T, T2, E2>(this: Result.Success<T>, f: (value: T) => Promise<Result<T2, E2>>): Promise<Result<T2, E2>>
function flatMapAsync<T, E, T2, E2>(this: Result.Failure<E>, f: (value: T) => Promise<Result<T2, E2>>): Promise<Result.Failure<E>>
function flatMapAsync<T, E, T2>(this: Result<T, E>, f: (value: T) => Promise<Result.Success<T2>>): Promise<Result<T2, E>>
function flatMapAsync<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Promise<Result.Failure<E2>>): Promise<Result.Failure<E | E2>>
function flatMapAsync<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Promise<Result<T2, E2>>): Promise<Result<T2, E | E2>>
function flatMapAsync<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Promise<Result<T2, E2>>) {
  if (this.isFailure) return Promise.resolve(this)

  return f(this.value)
}

function flatten<E>(this: Result.Failure<E>): Result.Failure<E>
function flatten<E>(this: Result.Success<Result.Failure<E>>): Result.Failure<E>
function flatten<T>(this: Result.Success<Result.Success<T>>): Result.Success<T>
function flatten<T, E>(this: Result.Success<Result<T, E>>): Result<T, E>
function flatten<T, E>(this: Result<Result.Success<T>, E>): Result<T, E>
function flatten<E, E2>(this: Result<Result.Failure<E>, E2>): Result.Failure<E | E2>
function flatten<T, E, E2>(this: Result<Result<T, E>, E2>): Result<T, E | E2>
function flatten<T, E, E2>(this: Result<Result<T, E>, E2>): Result<T, E | E2> {
  if (this.isFailure) return this

  return this.value
}

function assertErrorInstanceOf<T, C extends abstract new (..._: any) => any>(
  this: Result.Success<T>,
  ctor: C,
): Result.Success<T>
function assertErrorInstanceOf<E, C extends abstract new (..._: any) => any>(
  this: Result.Failure<E>,
  ctor: C,
): Result.Failure<E & InstanceType<C>>
function assertErrorInstanceOf<T, E, C extends abstract new (..._: any) => any>(
  this: Result<T, E>,
  ctor: C,
): Result<T, E & InstanceType<C>>
function assertErrorInstanceOf<T, E, C extends abstract new (..._: any) => any>(
  this: Result<T, E>,
  ctor: C,
): Result<T, E & InstanceType<C>> {
  if (this.isSuccess) return this

  if (this.error instanceof ctor) return this as any

  throw new TypeError(`Assertion failed: Expected error to be an instance of ${ctor.name}.`)
}

export const prototype = {
  /**
   * Returns `this.value` if `this` is a successful result, otherwise throws `this.error`.
   * @example Returns the payload of a successful result.
   * Result.success(123).getOrThrow() // 123
   * @example Throws the payload of a failed result.
   * Result.failure('error').getOrThrow() // throws 'error'
   */
  getOrThrow,
  /**
   * Returns the payload of the result.
   * @example Returns the payload of a successful result.
   * Result.success(123).toUnion() // 123
   * @example Returns the payload of a failed result.
   * Result.failure('error').toUnion() // 'error'
   */
  toUnion,
  /**
   * Applies the given function to this.value if it's a successful result, otherwise returns undefined.
   * @example
   * Result.success(123).ifSuccess((x) => x * 2) // 246
   * Result.failure('error').ifSuccess((x: number) => x * 2) // undefined
   */
  ifSuccess,
  /**
   * Applies the given function to this.error if it's a failed result, otherwise returns undefined.
   * @example
   * Result.success(123).ifFailure((x: string) => x + '!') // undefined
   * Result.failure('error').ifFailure((x) => x + '!') // 'error!'
   */
  ifFailure,
  /**
   * Return the result of applying one of the given functions to the payload.
   * @example
   * Result.success(123).match((x) => x * 2, (x: string) => x + '!') // 246
   * Result.failure('error').match((x: number) => x * 2, (x) => x + '!') // 'error!'
   */
  match,
  /**
   * Creates a Result value by modifying the payload of the successful result using the given function.
   * @example
   * Result.success(123).map((x) => x * 2) // Result.success(246)
   * Result.failure('error').map((x: number) => x * 2) // Result.failure('error')
   */
  map,
  /**
   * Creates a Result value by modifying the payload of the failed result using the given function.
   * @example
   * Result.success(123).mapError((x: string) => x + '!') // Result.success(123)
   * Result.failure('error').mapError((x) => x + '!') // Result.failure('error!')
   */
  mapError,
  /**
   * Maps the payload of the successful result and flattens the nested Result type.
   * @example
   * Result.success(123).flatMap((x) => Result.success(x * 2)) // Result.success(246)
   * Result.success(123).flatMap((x) => Result.failure('error')) // Result.failure('error')
   * Result.failure('error').flatMap((x: number) => Result.success(x * 2)) // Result.failure('error')
   * Result.failure('error').flatMap((x) => Result.failure('failure')) // Result.failure('error')
   */
  flatMap,
  /**
   * Maps the payload of the successful result and flattens the nested Result type.
   * @example
   * Result.success(123).flatMapAsync((x) => Promise.resolve(Result.success(x * 2)))) // Promise.resolve(Result.success(246))
   * Result.success(123).flatMapAsync((x) => Promise.resolve(Result.failure('error'))) // Promise.resolve(Result.failure('error'))
   * Result.failure('error').flatMapAsync((x: number) => Promise.resolve(Result.success(x * 2))) // Promise.resolve(Result.failure('error'))
   * Result.failure('error').flatMapAsync((x) => Promise.resolve(Result.failure('failure'))) // Promise.resolve(Result.failure('error'))
   */
  flatMapAsync,
  /**
   * Flattens the nested Result type.
   * @example
   * Result.success(Result.success(123)).flatten() // Result.success(123)
   * Result.success(Result.failure('error')).flatten() // Result.failure('error')
   * Result.failure('error').flatten() // Result.failure('error')
   */
  flatten,
  /**
   * Asserts that the error value is an instance of the given class.
   * If the error value is not an instance of the given class, it throws TypeError.
   * @example
   * const result: Result<number, Error> = Result.tryCatch(() => {
   *   if (Math.random() >= 0) {
   *     throw new Error('error')
   *   } else {
   *     return 123
   *   }
   * }).assertErrorInstanceOf(Error)
   */
  assertErrorInstanceOf,
} as const

/** Type representing success or failure. */
export type Result<T, E = unknown> = Result.Success<T> | Result.Failure<E>

export namespace Result {
  /**
   * Represents a successful result type with a payload.
   * @example
   * const success: Result.Success<number> = Result.success(123)
   * console.log(success.value) // 123
   * console.log(success.isSuccess) // true
   * console.log(success.isFailure) // false
   */
  export type Success<T> = typeof prototype & {
    readonly value: T
    readonly error?: never
    readonly isSuccess: true
    readonly isFailure: false
  }

  /**
   * Represents a failed result type with an error value.
   * @example
   * const failure: Result.Failure<string> = Result.failure('error')
   * console.log(failure.error) // error
   * console.log(failure.isFailure) // true
   * console.log(failure.isSuccess) // false
   */
  export type Failure<E> = typeof prototype & {
    readonly value?: never
    readonly error: E
    readonly isSuccess: false
    readonly isFailure: true
  }

  /**
   * Creates a successful result.
   * @example
   * const result = Result.success(123)
   * console.log(result.value) // 123
   */
  export function success<T>(value: T): Result.Success<T> {
    return withPrototype({ value, isSuccess: true, isFailure: false }, prototype)
  }

  /**
   * Creates a failed result.
   * @example
   * const result = Result.failure('error')
   * console.log(result.error) // error
   */
  export function failure<E>(error: E): Failure<E> {
    return withPrototype({ error, isSuccess: false, isFailure: true }, prototype)
  }

  /**
   * If the given function returns a value, a successful result is created. If it throws an exception, a failed result is created.
   * @example
   * const result = Result.tryCatch(() => 123)
   * console.log(result.value) // 123
   *
   * const result2 = Result.tryCatch(() => {
   *   throw 'error'
   * })
   * console.log(result2.error) // error
   */
  export function tryCatch<T>(f: () => T): Result<T, unknown> {
    try {
      return success(f())
    } catch (error) {
      return failure(error)
    }
  }

  /**
   * Convert a Promise value to a Result value.
   * @example
   * const result = await Result.fromPromise(Promise.resolve(123))
   * console.log(result.value) // 123
   *
   * const result2 = await Result.fromPromise(Promise.reject('error'))
   * console.log(result2.error) // error
   */
  export async function fromPromise<T>(promise: PromiseLike<T>): Promise<Result<T>> {
    try {
      return success(await promise)
    } catch (error) {
      return failure(error)
    }
  }

  /**
   * Convert a nullish value to a Result value.
   * @example
   * const result = Result.fromNullish(123);
   * console.log(result.value) // 123
   *
   * const result2 = Result.fromNullish(null);
   * console.log(result2.error) // null
   */
  export function fromNullish(value: null): Result.Failure<null>
  export function fromNullish(value: undefined): Result.Failure<undefined>
  export function fromNullish(value: null | undefined): Result.Failure<null | undefined>
  export function fromNullish<T>(
    value: T,
  ): Equals<T, any> extends true
    ? Result<{}, null | undefined>
    : Equals<T, unknown> extends true
      ? Result<{}, null | undefined>
      : [T] extends [{}]
        ? Result.Success<T>
        : [T] extends [{} | null]
          ? Result<Exclude<T, null>, null>
          : [T] extends [{} | undefined]
            ? Result<Exclude<T, undefined>, undefined>
            : Result<Exclude<T, null | undefined>, null | undefined>
  export function fromNullish<T>(value: T) {
    return value != null ? success(value) : failure(value)
  }

  /**
   * Converts an array of Results into a single Result.
   * If all results are successful, it returns a successful result of an array of values.
   * Otherwise, it returns the first failed result.
   */
  export function all<T>(results: readonly Result.Success<T>[]): Result.Success<T[]>
  export function all<T, E>(results: readonly Result<T, E>[]): Result<T[], E>
  export function all<T, E>(results: readonly Result<T, E>[]): Result<T[], E> {
    const values: T[] = []
    for (const result of results) {
      if (result.isFailure) return result
      values.push(result.value)
    }
    return success(values)
  }
}

function withPrototype<T, P extends object>(target: T, prototype: P): T & Omit<P, keyof T> {
  return Object.assign(Object.create(prototype), target)
}

type Equals<T, U> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U ? 1 : 2 ? true : false
