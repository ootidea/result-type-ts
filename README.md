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
<summary><code>Result.success</code></summary>

Type: `<T>(value: T) => Result.Success<T>`
<br>
Creates a success value.
</details>

<details>
<summary><code>Result.failure</code></summary>

Type: `<E>(error: E) => Result.Failure<E>`
<br>
Creates a failure value.
</details>

<details>
<summary><code>Result.tryCatch</code></summary>

Type: `<T>(f: () => T) => Result<T>`
<br>
Creates a success value if the function `f` returns a value, and a failure value if the function throws an exception.
</details>

<details>
<summary><code>Result.fromNullish</code></summary>

Type: `<T>(value: T | null | undefined) => Result<T, null | undefined>`
<br>
Convert a nullish value to a Result value.
</details>

<details>
<summary><code>Result.fromPromise</code></summary>

Type: `<T>(promise: PromiseLike<T>) => Promise<Result<T>>`
<br>
Convert a Promise value to a Result value.
</details>

### Types

<details>
<summary><code>Result.Success&lt;T&gt;</code></summary>

The type of a success value holding a value of type `T`.
</details>

<details>
<summary><code>Result.Failure&lt;E&gt;</code></summary>

The type of a failure value holding an error value of type `E`.
</details>

<details>
<summary><code>Result&lt;T, E&gt;</code></summary>

Shorthand for `Result.Success<T> | Result.Failure<E>` type. `E` is optional with a default value of `unknown`.
</details>

### Properties

<details>
<summary><code>result.value</code></summary>

Type: `T | undefined`
<br>
The payload of the success value.
</details>

<details>
<summary><code>result.error</code></summary>

Type: `E | undefined`
<br>
The payload of the failure value.
</details>

<details>
<summary><code>result.payload</code></summary>

Type: `T | E`
<br>
The payload of the result value.
</details>

<details>
<summary><code>result.isSuccess</code></summary>

Type: `boolean`
<br>
Whether it is a success value.
</details>

<details>
<summary><code>result.isFailure</code></summary>

Type: `boolean`
<br>
Whether it is a failure value.
</details>

### Methods

<details>
<summary><code>result.getOrThrow</code></summary>

Type: `() => T`
<br>
Returns `result.value` if it's a success value, otherwise throws `result.error`.
</details>

<details>
<summary><code>result.ifSuccess</code></summary>

Type: `<T2>(f: (value: T) => T2) => T2 | undefined`
<br>
Applies the function `f` to `result.value` if it's a success value, otherwise returns `undefined`.
</details>

<details>
<summary><code>result.ifFailure</code></summary>

Type: `<E2>(f: (error: E) => E2) => E2 | undefined`
<br>
Applies the function `f` to `result.error` if it's a failure value, otherwise returns `undefined`.
</details>

<details>
<summary><code>result.match</code></summary>

Type: `<T2, E2>((value: T) => T2, (error: E) => E2) => T2 | E2`
<br>
Applies specified functions to either a success value or a failure value, returning the result of the applied function.
</details>

<details>
<summary><code>result.map</code></summary>

Type: `<T2>(f: (value: T) => T2) => Result<T2, E>`
<br>
Creates a Result value by modifying the payload of the success value using the function `f`
</details>

<details>
<summary><code>result.mapError</code></summary>

Type: `<E2>(f: (error: E) => E2) => Result<T, E2>`
<br>
Creates a Result value by modifying the payload of the failure value using the function `f`
</details>

<details>
<summary><code>result.flatMap</code></summary>

Type: `<T2, E2>(f: (value: T) => Result<T2, E2>) => Result<T2, E2> | Result.Failure<E>`
<br>
Maps the payload of the success value and flattens the nested Result type.
</details>
