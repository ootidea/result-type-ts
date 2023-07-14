import { expect, test } from 'vitest'
import { Failure, Result, Success } from './index'

test('Properties', () => {
  const success = new Success(123) as Result<number>
  expect(success.isSuccess).toBe(true)
  expect(success.isFailure).toBe(false)
  expect(success.value).toBe(123)
  expect(success.error).toBe(undefined)

  const failure = new Failure(new Error('error')) as Result<number>
  expect(failure.isSuccess).toBe(false)
  expect(failure.isFailure).toBe(true)
  expect(failure.value).toBe(undefined)
  expect(failure.error instanceof Error && failure.error.message).toBe('error')
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
