# async-toolbelt

A lightweight, modular utility library for managing asynchronous workflows in JavaScript and TypeScript.

🌟 Features

- Composable Pipelines: Chain async functions seamlessly with pipeAsync.
- Side Effect Handlers: Debug or log values during async operations using tapAsync.
- Function Wrapping: Extend or augment behavior of existing async functions with wrapWithTapAsync.
- TypeScript Native: Full type definitions included.

📦 Installation

Install using npm or yarn:

```bash
npm install async-toolbelt
```

or

```bash
yarn add async-toolbelt
```

🛠️ Usage Examples

1. Compose Functions with pipeAsync

   ```ts
   import { pipeAsync } from 'async-toolbelt';

   const addOne = async (x: number) => x + 1;
   const square = async (x: number) => x * x;

   const pipeline = pipeAsync(addOne, square);

   pipeline(2).then((result) => {
     console.log(result); // Output: 9
   });
   ```

2. Log with tapAsync

   ```ts
   import { tapAsync } from 'async-toolbelt';

   const logValue = async (value: any) => {
     console.log('Value:', value);
   };

   const process = tapAsync(logValue);

   process('Hello World'); // Logs: Value: Hello World
   ```

3. Wrap Functions with wrapWithTapAsync

   ```ts
   import { wrapWithTapAsync } from 'async-toolbelt';

   const logAndRun = wrapWithTapAsync(async (value: string) => {
     console.log('Processing:', value);
     return value.toUpperCase();
   });

   logAndRun('hello').then((result) => {
     console.log(result); // Logs: Processing: hello, then HELLO
   });
   ```

📚 API Documentation

pipeAsync(...fns)

Chains multiple async functions into a single pipeline.

- Parameters: ...fns - Functions to pipe.
- Returns: A new function executing the pipeline sequentially.

tapAsync(fn)

Allows side effects (like logging or debugging) in an async flow without altering the result.

- Parameters: fn - Function executed for its side effects.
- Returns: A function that passes through the original input.

wrapWithTapAsync(fn)

Wraps an async function to extend its behavior.

- Parameters: fn - The function to wrap.
- Returns: A wrapped version of the function.

🔧 Development

Clone and Install

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/async-toolbelt.git
   cd async-toolbelt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Run tests:

   ```bash
     npm test
   ```

Contributing

We welcome contributions! Feel free to:

- Open issues for bugs or feature requests.
- Submit pull requests with your improvements.

📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

⭐ Support

If you find this package useful, consider starring the repository on GitHub!
