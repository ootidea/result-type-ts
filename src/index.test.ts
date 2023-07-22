import { expect, test } from 'vitest'
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
