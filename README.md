# result-type-ts
A TypeScript library for the `Result<T, E>` type, which is supported in modern languages like Rust, Swift, Kotlin.

## Features
- 0 dependencies
- Provides many sophisticated functions, properties, and methods
- Well-tested
- Works on both browsers and Node.js
- Strict type inference

## API

### Functions

<details>
<summary><code>Result.success(value)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T&gt;(value: T) => Result.Success&lt;T&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a successful result.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.value) // 123
console.log(result.isSuccess) // true
console.log(result.isFailure) // false
```

<br/>
</details>

<details>
<summary><code>Result.failure(error)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E&gt;(error: E) =&gt; Result.Failure&lt;E&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a failed result.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.failure('error')
console.log(result.error) // error
console.log(result.isFailure) // true
console.log(result.isSuccess) // false
```

<br/>
</details>

<details>
<summary><code>Result.tryCatch(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T&gt;(f: () =&gt; T) =&gt; Result&lt;T, unknown&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>If the given function returns a value, a successful result is created. If it throws an exception, a failed result is created.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.tryCatch(() => 123)
console.log(result.value) // 123

const result2 = Result.tryCatch(() => {
  throw 'error'
})
console.log(result2.error) // error
```

<br/>
</details>

<details>
<summary><code>Result.fromNullish(value)</code></summary>

<br>
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

#### Example
```ts
const result = Result.fromNullish(123);
console.log(result.value) // 123

const result2 = Result.fromNullish(null);
console.log(result2.error) // null
console.log(result2.isFailure) // true
```

<br/>
</details>

<details>
<summary><code>Result.fromPromise(promise)</code></summary>

<br>
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

#### Example
```ts
const result = await Result.fromPromise(Promise.resolve(123))
console.log(result.value) // 123

const result2 = await Result.fromPromise(Promise.reject('error'))
console.log(result2.error) // error
```

<br/>
</details>

<details>
<summary><code>Result.all(results)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T, E&gt;(results: Result&lt;T, E&gt;[]) =&gt; Result&lt;T[], E&gt;</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Converts an array of Results into a single Result. If all results are successful, it returns a successful result of an array of values. Otherwise, it returns the first failed result.</td>
  </tr>
</table>

#### Example
```ts
const result = await Result.all([Result.success(123), Result.success(456)])
console.log(result.value) // 123

const result2 = await Result.all([Result.success(123), Result.failure('error')])
console.log(result2.error) // error

const result3 = await Result.all([Result.failure('error'), Result.failure('error2')])
console.log(result3.error) // error
```

<br/>
</details>

### Types

<details>
<summary><code>Result.Success&lt;T&gt;</code></summary>

<br>
Represents a successful result type with a payload of type <code>T</code>.

#### Example
```ts
const result: Result.Success<number> = Result.success(123)
```

<br/>
</details>

<details>
<summary><code>Result.Failure&lt;E&gt;</code></summary>

<br>
Represents a failed result type with an error value of type <code>E</code>.

#### Example
```ts
const result: Result.Failure<string> = Result.failure('error')
```

<br/>
</details>

<details>
<summary><code>Result&lt;T, E&gt;</code></summary>

<br>
Shorthand for <code>Result.Success&lt;T&gt; | Result.Failure&lt;E&gt;</code> type. <code>E</code> is optional with a default value of <code>unknown</code>.

#### Example
```ts
const result: Result<number, string> = Math.random() > 0.5 ? Result.success(123) : Result.failure('error')
```

<br/>
</details>

### Properties

<details>
<summary><code>result.value</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>T | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>The payload of the successful result. If the result is a failure, it's <code>undefined</code>.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.value) // 123

const result2 = Result.failure('error')
console.log(result2.value) // undefined
```

<br/>
</details>

<details>
<summary><code>result.error</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>E | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>The payload of the failed result.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.error) // undefined

const result2 = Result.failure('error')
console.log(result2.error) // error
```

<br/>
</details>

<details>
<summary><code>result.isSuccess</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>boolean</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Whether it is a successful result.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.isSuccess) // true

const result2 = Result.failure('error')
console.log(result2.isSuccess) // false
```

<br/>
</details>

<details>
<summary><code>result.isFailure</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>boolean</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Whether it is a failed result.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.isFailure) // false

const result2 = Result.failure('error')
console.log(result2.isFailure) // true
```

<br/>
</details>

### Methods

<details>
<summary><code>result.getOrThrow()</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>() => T</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Returns <code>this.value</code> if it's a successful result, otherwise throws <code>this.error</code>.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.getOrThrow()) // 123

const result2 = Result.failure('error')
try {
  result2.getOrThrow()
} catch (e) {
  console.log(e) // error
}
```

<br/>
</details>

<details>
<summary><code>result.toUnion()</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>() => T | E</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Returns the payload of the result value.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.toUnion()) // 123

const result2 = Result.failure('error')
console.log(result2.toUnion()) // error
```

<br/>
</details>

<details>
<summary><code>result.ifSuccess(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2&gt;(f: (value: T) =&gt; T2) =&gt; T2 | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Applies the given function to <code>this.value</code> if it's a successful result, otherwise returns <code>undefined</code>.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.ifSuccess((value) => value * 2)) // 246

const result2 = Result.failure('error')
console.log(result2.ifSuccess((value) => value * 2)) // undefined
```

<br/>
</details>

<details>
<summary><code>result.ifFailure(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E2&gt;(f: (error: E) =&gt; E2) =&gt; E2 | undefined</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Applies the given function to <code>result.error</code> if it's a failed result, otherwise returns <code>undefined</code>.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.ifFailure((error) => error + '!')) // undefined

const result2 = Result.failure('error')
console.log(result2.ifFailure((error) => error + '!')) // error!
```

<br/>
</details>

<details>
<summary><code>result.match(f, g)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2, E2>((value: T) => T2, (error: E) => E2) => T2 | E2</code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Return the result of applying one of the given functions to the payload.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123)
console.log(result.match((value) => value * 2, (error) => error + '!')) // 246

const result2 = Result.failure('error')
console.log(result2.match((value) => value * 2, (error) => error + '!')) // error!
```

<br/>
</details>

<details>
<summary><code>result.map(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2>(f: (value: T) => T2) => Result&lt;T2, E></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a Result value by modifying the payload of the successful result using the given function</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123).map((value) => value * 2)
console.log(result.value) // 246

const result2 = Result.failure('error').map((value) => value * 2)
console.log(result2.error) // error
```

<br/>
</details>

<details>
<summary><code>result.mapError(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;E2>(f: (error: E) => E2) => Result&lt;T, E2></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Creates a Result value by modifying the payload of the failed result using the given function</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123).mapError((error) => error + '!')
console.log(result.value) // 123

const result2 = Result.failure('error').mapError((error) => error + '!')
console.log(result2.error) // error!
```

<br/>
</details>

<details>
<summary><code>result.flatMap(f)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;T2, E2>(f: (value: T) => Result&lt;T2, E2>) => Result&lt;T2, E | E2></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Maps the payload of the successful result and flattens the nested Result type.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(123).flatMap((value) => Result.success(value * 2))
console.log(result.value) // 246

const result2 = Result.failure('error').flatMap((value) => Result.failure(value * 2))
console.log(result2.error) // error
```

<br/>
</details>

<details>
<summary><code>result.flatten()</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>() => Result&lt;T, E | E2></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Flattens the nested Result type. For instance, it converts <code>Result&lt;Result&lt;T, E>, E2></code> into <code>Result&lt;T, E | E2></code>.</td>
  </tr>
</table>

#### Example
```ts
const result = Result.success(Result.success(123)).flatten()
console.log(result.value) // 246

const result2 = Result.success(Result.failure('error')).flatten()
console.log(result2.error) // error

const result3 = Result.failure('error').flatten()
console.log(result3.error) // error
```

<br/>
</details>

<details>
<summary><code>result.assertErrorInstanceOf(constructor)</code></summary>

<br>
<table>
  <tr>
    <td><b>Type</b></td>
    <td><code>&lt;C extends abstract new (..._: any) => any>(constructor: C) => Result&lt;T, InstanceType&lt;C>></code></td>
  </tr>
  <tr>
    <td><b>Description</b></td>
    <td>Perform a safe cast of the error type to the given class. If the payload of the failed result is not instance of <code>constructor</code>, throws <code>TypeError</code></td>
  </tr>
</table>

#### Example
```ts
const result: Result<number, Error> = Result.tryCatch(() => {
  if (Math.random() >= 0) {
    throw new Error('error')
  } else {
    return 123
  }
}).assertErrorInstanceOf(Error)
console.log(result.isFailure && result.error.message) // error
```

<br/>
</details>
