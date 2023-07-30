# result-type-ts
A TypeScript library for the `Result<T, E>` type, which is supported in modern languages like Rust, Swift, Kotlin.  

## Features
- 0 dependencies
- Provides many sophisticated functions, properties, and methods
- Well-tested
- Works on both browsers and Node.js

## API

### Functions

<details>
<summary> `Result.success` </summary>

- Type: `<T>(value: T) => Result.Success<T>`
- Description: Creates a success value.
</details>

<details>
<summary>`Result.failure`</summary>

- Type: `<E>(error: E) => Result.Failure<E>`
- Description: Creates a failure value.
</details>

<details>
<summary>`Result.tryCatch`</summary>

- Type: `<T>(f: () => T) => Result<T>`
- Description: Creates a success value if the function `f` returns a value, and a failure value if the function throws an exception.
</details>

<details>
<summary>`Result.fromNullish`</summary>

- Type: `<T>(value: T \| null \| undefined) => Result<T, null \| undefined>`
- Description: Convert a nullish value to a Result value.
</details>

<details>
<summary>`Result.fromPromise`</summary>

- Type: `<T>(promise: PromiseLike<T>) => Promise<Result<T>>`
- Description: Convert a Promise value to a Result value.
</details>

### Types

<details>
<summary>`Result.Success&lt;T&gt;`</summary>

- Description: The type of a success value holding a value of type `T`.
</details>

<details>
<summary>`Result.Failure&lt;E&gt;`</summary>

- Description: The type of a failure value holding an error value of type `E`.
</details>

<details>
<summary>`Result&lt;T, E&gt;`</summary>

- Description: Shorthand for `Result.Success<T> \| Result.Failure<E>` type. `E` is optional with a default value of `unknown`.
</details>

### Properties

<details>
<summary>`result.value`</summary>

- Type: `T \| undefined`
- Description: The payload of the success value.
</details>

<details>
<summary>`result.error`</summary>

- Type: `E \| undefined`
- Description: The payload of the failure value.
</details>

<details>
<summary>`result.payload`</summary>

- Type: `T \| E`
- Description: The payload of the result value.
</details>

<details>
<summary>`result.isSuccess`</summary>

- Type: `boolean`
- Description: Whether it is a success value.
</details>

<details>
<summary>`result.isFailure`</summary>

- Type: `boolean`
- Description: Whether it is a failure value.
</details>

### Methods

<details>
<summary>`result.getOrThrow`</summary>

- Type: `() => T`
- Description: Returns `result.value` if it's a success value, otherwise throws `result.error`.
</details>

<details>
<summary>`result.ifSuccess`</summary>

- Type: `<T2>(f: (value: T) => T2) => T2 \| undefined`
- Description: Applies the function `f` to `result.value` if it's a success value, otherwise returns `undefined`.
</details>

<details>
<summary>`result.ifFailure`</summary>

- Type: `<E2>(f: (error: E) => E2) => E2 \| undefined`
- Description: Applies the function `f` to `result.error` if it's a failure value, otherwise returns `undefined`.
</details>

<details>
<summary>`result.match`</summary>

- Type: `<T2, E2>((value: T) => T2, (error: E) => E2) => T2 \| E2`
- Description: Applies specified functions to either a success value or a failure value, returning the result of the applied function.
</details>

<details>
<summary>`result.map`</summary>

- Type: `<T2>(f: (value: T) => T2) => Result<T2, E>`
- Description: Creates a Result value by modifying the payload of the success value using the function `f`
</details>

<details>
<summary>`result.mapError`</summary>

- Type: `<E2>(f: (error: E) => E2) => Result<T, E2>`
- Description: Creates a Result value by modifying the payload of the failure value using the function `f`
</details>

<details>
<summary>`result.flatMap`</summary>

- Type: `<T2, E2>(f: (value: T) => Result<T2, E2>) => Result<T2, E2> \| Result.Failure<E>`
- Description: Maps the payload of the success value and flattens the nested Result type.
</details>
