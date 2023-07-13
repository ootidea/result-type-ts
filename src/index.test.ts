import { expect, test } from 'vitest'
import { Failure, Result, Success } from './index'

test('Constructor', () => {
  const success: Result<number> = new Success(123)
  expect(success.value).toBe(123)
  expect(success.isSuccess).toBe(true)
  expect(success.isFailure).toBe(false)

  const failure: Result<number> = new Failure(new Error('error'))
  expect(failure.error.message).toBe('error')
  expect(failure.isSuccess).toBe(false)
  expect(failure.isFailure).toBe(true)
})
