function getOrThrow<T>(this: Success<T>): T
function getOrThrow<E>(this: Failure<E>): never
function getOrThrow<T, E>(this: Result<T, E>): T
function getOrThrow<T, E>(this: Result<T, E>): T {
  if (this.isSuccess) return this.value

  throw this.error
}

function toUnion<T>(this: Success<T>): T
function toUnion<E>(this: Failure<E>): E
function toUnion<T, E>(this: Result<T, E>): T | E
function toUnion<T, E>(this: Result<T, E>): T | E {
  if (this.isSuccess) return this.value

  return this.error
}

function ifSuccess<T, T2>(this: Success<T>, f: (value: T) => T2): T2
function ifSuccess<T, E, T2>(this: Failure<E>, f: (value: T) => T2): undefined
function ifSuccess<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): T2 | undefined
function ifSuccess<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): T2 | undefined {
  if (this.isFailure) return undefined

  return f(this.value)
}

function ifFailure<T, E, E2>(this: Success<T>, f: (error: E) => E2): undefined
function ifFailure<E, E2>(this: Failure<E>, f: (error: E) => E2): E2
function ifFailure<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): E2 | undefined
function ifFailure<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): E2 | undefined {
  if (this.isSuccess) return undefined

  return f(this.error)
}

function match<T, E, T2, E2>(this: Success<T>, f: (value: T) => T2, g: (error: E) => E2): T2
function match<T, E, T2, E2>(this: Failure<E>, f: (value: T) => T2, g: (error: E) => E2): E2
function match<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => T2, g: (error: E) => E2): T2 | E2
function match<T, E, T2, E2>(
  this: Result<T, E>,
  f: (value: T) => T2,
  g: (error: E) => E2,
): T2 | E2 {
  if (this.isSuccess) return f(this.value)

  return g(this.error)
}

function map<T, T2>(this: Success<T>, f: (value: T) => T2): Success<T2>
function map<T, E, T2>(this: Failure<E>, f: (value: T) => T2): Failure<E>
function map<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): Result<T2, E>
function map<T, E, T2>(this: Result<T, E>, f: (value: T) => T2): Result<T2, E> {
  if (this.isFailure) return this

  return Result.success(f(this.value))
}

function mapError<T, E, E2>(this: Success<T>, f: (error: E) => E2): Success<T>
function mapError<E, E2>(this: Failure<E>, f: (error: E) => E2): Failure<E2>
function mapError<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): Result<T, E2>
function mapError<T, E, E2>(this: Result<T, E>, f: (error: E) => E2): Result<T, E2> {
  if (this.isSuccess) return this

  return Result.failure(f(this.error))
}

function flatMap<T, T2>(this: Success<T>, f: (value: T) => Success<T2>): Success<T2>
function flatMap<T, E2>(this: Success<T>, f: (value: T) => Failure<E2>): Failure<E2>
function flatMap<T, T2, E2>(this: Success<T>, f: (value: T) => Result<T2, E2>): Result<T2, E2>
function flatMap<T, E, T2, E2>(this: Failure<E>, f: (value: T) => Result<T2, E2>): Failure<E>
function flatMap<T, E, T2>(this: Result<T, E>, f: (value: T) => Success<T2>): Result<T2, E>
function flatMap<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Failure<E2>): Failure<E | E2>
function flatMap<T, E, T2, E2>(
  this: Result<T, E>,
  f: (value: T) => Result<T2, E2>,
): Result<T2, E | E2>
function flatMap<T, E, T2, E2>(this: Result<T, E>, f: (value: T) => Result<T2, E2>) {
  if (this.isFailure) return this

  return f(this.value)
}

function assertErrorInstanceOf<T, C extends abstract new (..._: any) => any>(
  this: Success<T>,
  ctor: C,
): Success<T>
function assertErrorInstanceOf<E, C extends abstract new (..._: any) => any>(
  this: Failure<E>,
  ctor: C,
): Failure<E & InstanceType<C>>
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
   * Returns `this.value` if `this` is a success result, otherwise throws `this.error`.
   * @example Returns the payload of a success result.
   * Result.success(123).getOrThrow() // 123
   * @example Throws the payload of a failure result.
   * Result.failure('error').getOrThrow() // throws 'error'
   */
  getOrThrow,
  /**
   * Returns the payload of the result.
   * @example Returns the payload of a success result.
   * Result.success(123).toUnion() // 123
   * @example Returns the payload of a failure result.
   * Result.failure('error').toUnion() // 'error'
   */
  toUnion,
  /**
   * Applies the given function to this.value if it's a success result, otherwise returns undefined.
   * @example
   * Result.success(123).ifSuccess((x) => x * 2) // 246
   * Result.failure('error').ifSuccess((x: number) => x * 2) // undefined
   */
  ifSuccess,
  /**
   * Applies the given function to this.error if it's a failure result, otherwise returns undefined.
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
   * Creates a Result value by modifying the payload of the success result using the given function.
   * @example
   * Result.success(123).map((x) => x * 2) // Result.success(246)
   * Result.failure('error').map((x: number) => x * 2) // Result.failure('error')
   */
  map,
  /**
   * Creates a Result value by modifying the payload of the failure result using the given function.
   * @example
   * Result.success(123).mapError((x: string) => x + '!') // Result.success(123)
   * Result.failure('error').mapError((x) => x + '!') // Result.failure('error!')
   */
  mapError,
  /**
   * Maps the payload of the success result and flattens the nested Result type.
   * @example
   * Result.success(123).flatMap((x) => Result.success(x * 2)) // Result.success(246)
   * Result.success(123).flatMap((x) => Result.failure('error')) // Result.failure('error')
   * Result.failure('error').flatMap((x: number) => Result.success(x * 2)) // Result.failure('error')
   * Result.failure('error').flatMap((x) => Result.failure('failure')) // Result.failure('error')
   */
  flatMap,
  /**
   * Perform a safe cast of the error type to the given class. If the payload of the failure result is not instance of ctor, throws TypeError.
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

/**
 * The type of a success result.
 * @example
 * const success: Success<number> = Result.success(123)
 */
export type Success<T> = typeof prototype & {
  readonly value: T
  readonly error?: never
  readonly isSuccess: true
  readonly isFailure: false
}
/**
 * The type of a failure result.
 * @example
 * const failure: Failure<string> = Result.failure('error')
 */
export type Failure<E> = typeof prototype & {
  readonly value?: never
  readonly error: E
  readonly isSuccess: false
  readonly isFailure: true
}
/** Type representing success or failure. */
export type Result<T, E = unknown> = Success<T> | Failure<E>

export namespace Result {
  /**
   * Creates a success result.
   * @example
   * const result = Result.success(123)
   * console.log(result.value) // 123
   */
  export function success<const T>(value: T): Success<T> {
    return withPrototype({ value, isSuccess: true, isFailure: false }, prototype)
  }

  /**
   * Creates a failure result.
   * @example
   * const result = Result.failure('error')
   * console.log(result.error) // error
   */
  export function failure<const E>(error: E): Failure<E> {
    return withPrototype({ error, isSuccess: false, isFailure: true }, prototype)
  }

  /**
   * If the given function returns a value, a success result is created. If it throws an exception, a failure result is created.
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
  export function fromNullish(value: null): Result<never, null>
  export function fromNullish(value: undefined): Result<never, undefined>
  export function fromNullish(value: null | undefined): Result<never, null | undefined>
  export function fromNullish<const T extends {}>(value: T): Result<T, never>
  export function fromNullish<const T>(value: T | null): Result<T, null>
  export function fromNullish<const T>(value: T | undefined): Result<T, undefined>
  export function fromNullish<const T>(value: T | null | undefined): Result<T, null | undefined>
  export function fromNullish<const T>(value: T | null | undefined) {
    return value != null ? success(value) : failure(value)
  }
}

function withPrototype<const T, const P extends object>(
  target: T,
  prototype: P,
): T & Omit<P, keyof T> {
  Object.setPrototypeOf(target, prototype)
  return target as any
}
