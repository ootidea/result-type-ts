import { expect, expectTypeOf, test } from 'vitest'
import { Result } from './index'

test('Properties', () => {
  const success = Result.success(123) as Result<number>
  expect(success.isSuccess).toBe(true)
  expect(success.isFailure).toBe(false)
  expect(success.value).toBe(123)
  expect(success.error).toBe(undefined)

  const failure = Result.failure('error') as Result<number>
  expect(failure.isSuccess).toBe(false)
  expect(failure.isFailure).toBe(true)
  expect(failure.value).toBe(undefined)
  expect(failure.error).toBe('error')
})

test('getOrThrow', () => {
  const success = Result.success(123) as Result<number>
  expect(success.getOrThrow()).toBe(123)

  const failure = Result.failure(new Error('error')) as Result<number>
  expect(() => failure.getOrThrow()).toThrow('error')
})

test('ifSuccess', () => {
  const success = Result.success(123) as Result<number>
  expect(success.ifSuccess((value) => -value)).toBe(-123)

  const failure = Result.failure(new Error('error')) as Result<number>
  expect(failure.ifSuccess((value) => -value)).toBe(undefined)
})

test('ifFailure', () => {
  const success = Result.success(123) as Result<number, Error>
  expect(success.ifFailure((error) => error.message)).toBe(undefined)

  const failure = Result.failure(new Error('error')) as Result<number, Error>
  expect(failure.ifFailure((error) => error.message)).toBe('error')
})

test('match', () => {
  const success = Result.success(123) as Result<number, Error>
  expect(
    success.match(
      (value) => -value,
      (error) => error.message,
    ),
  ).toBe(-123)

  const failure = Result.failure(new Error('error')) as Result<number, Error>
  expect(
    failure.match(
      (value) => -value,
      (error) => error.message,
    ),
  ).toBe('error')
})

test('map', () => {
  const success = Result.success(123) as Result<number, string>
  expect(success.map((value) => -value)).toStrictEqual(Result.success(-123))

  const failure = Result.failure('error') as Result<number, string>
  expect(failure.map((value) => -value)).toBe(failure)
})
test('mapError', () => {
  const success = Result.success(123) as Result<number, string>
  expect(success.mapError((error) => -error)).toBe(success)

  const failure = Result.failure('error') as Result<number, string>
  expect(failure.mapError((error) => '> ' + error)).toStrictEqual(Result.failure('> error'))
})

test('flatMap', () => {
  const success = Result.success(123) as Result<number, string>
  expect(success.flatMap((value) => Result.success(-value))).toStrictEqual(Result.success(-123))

  const failure = Result.failure('error') as Result<number, string>
  expect(failure.flatMap((value) => Result.success(-value))).toBe(failure)
})

test('tryCatch', () => {
  const success = Result.tryCatch(() => 123)
  expect(success.isSuccess).toBe(true)
  expect(success.value).toBe(123)

  const failure = Result.tryCatch(() => {
    throw new Error('error')
  })
  expect(failure.isFailure).toBe(true)
  expect(failure.error instanceof Error && failure.error.message).toBe('error')
})

test('fromNullish', () => {
  const nonNullishValue = Result.fromNullish(123 as number | null)
  expect(nonNullishValue.value).toBe(123)
  expectTypeOf(nonNullishValue).toEqualTypeOf<Result<number, null>>()

  const nonNullishType = Result.fromNullish(123)
  expect(nonNullishType.value).toBe(123)
  expectTypeOf(nonNullishType).toEqualTypeOf<Result<123, never>>()

  const nullType = Result.fromNullish(null)
  expect(nullType.error).toBe(null)
  expectTypeOf(nullType).toEqualTypeOf<Result<never, null>>()
})

test('fromPromise', () => {
  const successPromise = Result.fromPromise(Promise.resolve(123))
  expect(successPromise).resolves.toStrictEqual(Result.success(123))

  const failurePromise = Result.fromPromise(Promise.reject('error'))
  expect(failurePromise).resolves.toStrictEqual(Result.failure('error'))
})

test('assertErrorInstanceOf', () => {
  const success = Result.success(123) as Result<number>
  expect(success.assertErrorInstanceOf(Error)).toBe(success)

  const failure = Result.failure(new Error('error')) as Result<number>
  expectTypeOf(failure.assertErrorInstanceOf(Error)).toEqualTypeOf<Result<number, Error>>()
  expect(() => failure.assertErrorInstanceOf(URIError)).toThrow(TypeError)
})
