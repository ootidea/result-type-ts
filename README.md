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
<summary><code>Result.success(value)</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T&gt;(value: T) => Result.Success&lt;T&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a success value.</td>
  </tr>
</table>

#### Example
```ts
const sucess = Result.success(123)
console.log(sucess.value) // 123
```

<hr/>
</details>

<details>
<summary><code>Result.failure</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E&gt;(error: E) =&gt; Result.Failure&lt;E&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a failure value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>Result.tryCatch</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T&gt;(f: () =&gt; T) =&gt; Result&lt;T&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a success value if the function `f` returns a value, and a failure value if the function throws an exception.</td>
  </tr>
</table>
</details>

<details>
<summary><code>Result.fromNullish</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
     <td><code>&lt;T&gt;(value: T | null | undefined) =&gt; Result&lt;T, null | undefined&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Convert a nullish value to a Result value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>Result.fromPromise</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T&gt;(promise: PromiseLike&lt;T&gt;) =&gt; Promise&lt;Result&lt;T&gt;&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Convert a Promise value to a Result value.</td>
  </tr>
</table>
</details>

### Types

<details>
<summary><code>Result.Success&lt;T&gt;</code></summary>

<table>
  <tr>
    <td><b>Description</b></td>
    <td>The type of a success value holding a value of type `T`.</td>
  </tr>
</table>
</details>

<details>
<summary><code>Result.Failure&lt;E&gt;</code></summary>

<table>
  <tr>
    <td><b>Description</b></td>
    <td>The type of a failure value holding an error value of type `E`.</td>
  </tr>
</table>
</details>

<details>
<summary><code>Result&lt;T, E&gt;</code></summary>

<table>
  <tr>
    <td><b>Description</b></td>
    <td>Shorthand for `Result.Success&lt;T&gt; | Result.Failure&lt;E&gt;` type. `E` is optional with a default value of `unknown`.</td>
  </tr>
</table>
</details>

### Properties

<details>
<summary><code>result.value</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>T | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>The payload of the success value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.error</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>E | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>The payload of the failure value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.payload</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>T | E</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>The payload of the result value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.isSuccess</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>boolean</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Whether it is a success value.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.isFailure</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>boolean</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Whether it is a failure value.</td>
  </tr>
</table>
</details>

### Methods

<details>
<summary><code>result.getOrThrow</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>() => T</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Returns `result.value` if it's a success value, otherwise throws `result.error`.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.ifSuccess</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2&gt;(f: (value: T) =&gt; T2) =&gt; T2 | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Applies the function `f` to `result.value` if it's a success value, otherwise returns `undefined`.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.ifFailure</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E2&gt;(f: (error: E) =&gt; E2) =&gt; E2 | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Applies the function `f` to `result.error` if it's a failure value, otherwise returns `undefined`.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.match</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2, E2>((value: T) => T2, (error: E) => E2) => T2 | E2</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Applies specified functions to either a success value or a failure value, returning the result of the applied function.</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.map</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2>(f: (value: T) => T2) => Result&lt;T2, E></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a Result value by modifying the payload of the success value using the function `f`</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.mapError</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E2>(f: (error: E) => E2) => Result&lt;T, E2></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a Result value by modifying the payload of the failure value using the function `f`</td>
  </tr>
</table>
</details>

<details>
<summary><code>result.flatMap</code></summary>

<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2, E2>(f: (value: T) => Result&lt;T2, E2>) => Result&lt;T2, E2> | Result.Failure&lt;E></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Maps the payload of the success value and flattens the nested Result type.</td>
  </tr>
</table>
</details>
