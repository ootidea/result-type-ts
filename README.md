# result-type-ts
`result-type-ts` is a TypeScript library for the `Result<T, E>` type, which is supported in modern languages like Rust, Swift, Kotlin.  

This library provides a sophisticated set of utilities about Result type.  

## API

### Functions

|                   | Type                                 | Description                                                                                                           |
|-------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `Result.success`  | `<T>(value: T) => Result.Success<T>` | Creates a success value.                                                                                              |
| `Result.failure`  | `<E>(error: E) => Result.Failure<E>` | Creates a failure value.                                                                                              |
| `Result.tryCatch` | `<T>(f: () => T) => Result<T>`       | Creates a success value if the function `f` returns a value, and a failure value if the function throws an exception. |

### Types

|                     | Description                                                                                                     |
|---------------------|-----------------------------------------------------------------------------------------------------------------|
| `Result.Success<T>` | The type of a success value holding a value of type `T`.                                                        |
| `Result.Failure<E>` | The type of a failure value holding an error value of type `E`.                                                 |
| `Result<T, E>`      | Shorthand for `Result.Success<T> \| Result.Failure<E>` type. `E` is optional with a default value of `unknown`. |

### Properties

|                    | Type             | Description                       |
|--------------------|------------------|-----------------------------------|
| `result.value`     | `T \| undefined` | The payload of the success value. |
| `result.error`     | `E \| undefined` | The payload of the failure value. |
| `result.isSuccess` | `boolean`        | Whether it is a success value.    |
| `result.isFailure` | `boolean`        | Whether it is a failure value.    |

### Methods

|                     | Type                                                                               | Description                                                                                                             |
|---------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `result.getOrThrow` | `() => T`                                                                          | Returns `result.value` if it's a success value, otherwise throws `result.error`.                                        |
| `result.ifSuccess`  | `<T2>(f: (value: T) => T2) => T2 \| undefined`                                     | Applies the function `f` to `result.value` if it's a success value, otherwise returns `undefined`.                      |
| `result.ifFailure`  | `<E2>(f: (error: E) => E2) => E2 \| undefined`                                     | Applies the function `f` to `result.error` if it's a failure value, otherwise returns `undefined`.                      |
| `result.match`      | `<T2, E2>((value: T) => T2, (error: E) => E2) => T2 \| E2`                         | Applies specified functions to either a success value or a failure value, returning the result of the applied function. |
| `result.map`        | `<T2>(f: (value: T) => T2) => Result<T2, E>`                                       | Creates a Result value by modifying the payload of the success value using the function `f`                             |
| `result.mapError`   | `<E2>(f: (error: E) => E2) => Result<T, E2>`                                       | Creates a Result value by modifying the payload of the failure value using the function `f`                             |
| `result.flatMap`    | `<T2, E2>(f: (value: T) => Result<T2, E2>) => Result<T2, E2> \| Result.Failure<E>` | Maps the payload of the success value and flattens the nested Result type.                                              |
