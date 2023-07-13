import { expect, test } from 'vitest'
import { Failure, Result, Success } from './index'

test('Constructor', () => {
  const success = new Success(123) as Result<number>
  expect(success.isSuccess).toBe(true)
  expect(success.isFailure).toBe(false)
  if (success.isSuccess) {
    expect(success.value).toBe(123)
  }

  const failure = new Failure(new Error('error')) as Result<number>
  expect(failure.isSuccess).toBe(false)
  expect(failure.isFailure).toBe(true)
  if (failure.isFailure) {
    expect(failure.error instanceof Error && failure.error.message).toBe('error')
  }
})
