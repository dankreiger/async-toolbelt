# async-toolbelt

- [async-toolbelt](#async-toolbelt)
  - [Key Features](#key-features)
  - [Installation](#installation)
  - [Usage Examples](#usage-examples)
    - [1. Composing Functions with `pipe`](#1-composing-functions-with-pipe)
    - [2. Adding Side Effects with `tap`](#2-adding-side-effects-with-tap)
    - [3. Wrapping Functions with `wrapWithTap`](#3-wrapping-functions-with-wrapwithtap)
    - [4. Transforming Values with `map`](#4-transforming-values-with-map)
    - [5. Long Pipeline Example](#5-long-pipeline-example)
  - [API Reference](#api-reference)
    - [`pipe(input, ...fns)`](#pipeinput-fns)
    - [`tap(fn)`](#tapfn)
    - [`wrapWithTap(fns)`](#wrapwithtapfns)
    - [`map(fn)`](#mapfn)
  - [Development (Bun)](#development-bun)
  - [Contributing](#contributing)
  - [License](#license)
  - [Support](#support)

A lightweight utility library for composing, transforming, and augmenting functions (synchronous or asynchronous) in JavaScript/TypeScript. Provides a unified API, full TypeScript support (including up to 18 chained transformations), and automatically selects ESM or CJS based on your environment.

## Key Features

- **Composable Pipelines** – Chain any combination of sync or async functions with `pipe`.
- **Side Effects** – Insert logging or debugging without altering results using `tap`.
- **Function Wrapping** – Extend or augment one or more functions with `wrapWithTap`.
- **Mapping & Transformation** – Apply a single transformation using `map`.
- **TypeScript Ready** – Includes comprehensive type definitions and overloads.

## Installation

Use your preferred package manager:

- **Bun**:

  ```zsh
  bun add --exact async-toolbelt
  ```

- **pnpm**:

  ```zsh
  pnpm add --save-exact async-toolbelt 
  ```

- **Yarn**:

  ```zsh
  yarn add --exact async-toolbelt
  ```

- **npm**:

  ```zsh
  npm install --save-exact async-toolbelt 
  ```

## Usage Examples

> While these functions do not have an “Async” suffix, they handle both synchronous and asynchronous code seamlessly. Any sync function is wrapped in a promise under the hood.

### 1. Composing Functions with `pipe`

```ts
import { pipe } from 'async-toolbelt';

// Async example
const addOneAsync = async (n: number) => n + 1;
const squareAsync = async (n: number) => n * n;

// Sync example
const addOneSync = (n: number) => n + 1;
const squareSync = (n: number) => n * n;

// Async pipeline
pipe(2, addOneAsync, squareAsync).then((result) => {
  console.log(result); // 9
});

// Mixed pipeline
pipe(2, addOneSync, squareAsync).then((result) => {
  console.log(result); // 9
});

// Fully sync pipeline (still returns a promise)
pipe(2, addOneSync, squareSync).then((result) => {
  console.log(result); // 9
});
```

### 2. Adding Side Effects with `tap`

```ts
import { tap } from 'async-toolbelt';

const logValue = (val: unknown) => {
  console.log('Received:', val);
};

tap(logValue)('Hello World');
// Logs: "Received: Hello World"
// Returns a Promise resolved to "Hello World"
```

### 3. Wrapping Functions with `wrapWithTap`

```ts
import { wrapWithTap } from 'async-toolbelt';

// Wrap multiple functions at once
const wrappedFunctions = wrapWithTap([
  async (val: string) => console.log('First effect:', val),
  (val: string) => console.log('Second effect:', val.toUpperCase()),
]);

// Each function logs and then returns the original input
wrappedFunctions[0]('hello'); // Logs "First effect: hello"
wrappedFunctions[1]('hello'); // Logs "Second effect: HELLO"
```

### 4. Transforming Values with `map`

```ts
import { map } from 'async-toolbelt';

const doubleAsync = async (n: number) => n * 2;
const doubleSync = (n: number) => n * 2;

// Using an async function
map(doubleAsync)(3).then((res) => {
  console.log('Async result:', res); // 6
});

// Using a sync function
map(doubleSync)(5).then((res) => {
  console.log('Sync result:', res); // 10
});
```

### 5. Long Pipeline Example

Here’s a more **declarative** example illustrating how `pipe` can simplify a multi-step workflow. In real-world scenarios, you might fetch data, transform it, log progress, and handle both sync and async steps without deeply nested callbacks.

```ts
import { pipe, tap, map } from 'async-toolbelt';

// Mock async function to fetch user data
const fetchUser = async (id: number) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id, name: 'Alice', email: 'alice@example.com' };
};

// Convert user data to a string (sync function)
const userToString = (user: { id: number; name: string; email: string }) =>
  `[User #${user.id}]: ${user.name} <${user.email}>`;

// Log a message (sync or async)
const logMessage = (msg: string) => {
  console.log(`[LOG] ${msg}`);
};

// Asynchronously send notification
const sendNotification = async (message: string) => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return `Notification sent with message: "${message}"`;
};

// Build a pipeline that fetches a user, logs it, transforms to string, sends notification
pipe(
  1,               // userId
  fetchUser,       // Step 1: fetch user data (async)
  tap((u) => console.log('Fetched user:', u)), // Step 2: side-effect
  userToString,    // Step 3: convert to string (sync)
  tap(logMessage), // Step 4: additional side-effect
  sendNotification // Step 5: final async operation
).then((result) => {
  console.log(result);
  // Logs something like:
  //   Fetched user: { id: 1, name: 'Alice', ...}
  //   [LOG] [User #1]: Alice <alice@example.com>
  //   Notification sent with message: "[User #1]: Alice <alice@example.com>"
});
```

In this pipeline:

1. `fetchUser` retrieves user data (async).
2. `tap(...)` logs the raw user.
3. `userToString` transforms it to a string (sync).
4. Another `tap(logMessage)` logs the user string.
5. `sendNotification` finalizes the process (async).

The promise-based design keeps everything **composable**, **flat**, and **declarative** without nested callbacks or complicated promise chains.

---

## API Reference

### `pipe(input, ...fns)`

Executes a sequence of sync or async functions on an initial value. Supports up to 18 functions.

- **Parameters**  
  - `input`: initial value  
  - `...fns`: array of sync or async functions
- **Returns**  
  A `Promise` resolving to the final result

### `tap(fn)`

Inserts a side effect (e.g., logging) without changing the input.

- **Parameters**  
  - `fn`: a sync or async function that receives the input
- **Returns**  
  A function that returns the original input as a `Promise`

### `wrapWithTap(fns)`

Wraps an array of functions so each function executes a side effect while returning the original input.

- **Parameters**  
  - `fns`: an array of sync or async functions
- **Returns**  
  An array of tapped functions

### `map(fn)`

Transforms an input with a single sync or async function.

- **Parameters**  
  - `fn`: a function taking the input and returning a new value
- **Returns**  
  A function that, given an input, returns a `Promise` of the transformed value

---

## Development (Bun)

This project uses **Bun** as the development environment.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/async-toolbelt.git
   cd async-toolbelt
   ```

2. **Install dependencies** (via Bun):

   ```bash
   bun install
   ```

3. **Build the project**:

   ```bash
   bun run build
   ```

4. **Run tests**:

   ```bash
   bun test
   ```

---

## Contributing

Contributions are welcome. Please open issues or submit pull requests for features or improvements.

## License

Distributed under the [MIT License](LICENSE).

## Support

If you find this library valuable, please consider starring the repository on GitHub.
