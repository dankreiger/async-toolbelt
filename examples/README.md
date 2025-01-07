# async-toolbelt Examples

This directory contains various examples demonstrating the usage patterns and capabilities of async-toolbelt.

## Examples Overview

### 1. Basic Pipeline (`01-basic-pipeline.ts`)

Demonstrates the fundamental concepts of function composition and pipeline creation.

- Basic function composition
- String transformation
- Logging with `tap`

### 2. Error Handling (`02-error-handling.ts`)

Shows how to handle errors and validate data in pipelines.

- Error handling patterns
- Input validation
- Data transformation with error boundaries

### 3. API Fetching (`03-api-fetching.ts`)

Example of handling HTTP requests and response processing.

- Fetching and processing API data
- Response transformation
- Error handling for HTTP requests

### 4. Data Transformation (`04-data-transformation.ts`)

Demonstrates complex data transformation patterns.

- Type conversion
- Array processing
- Date handling
- Data normalization

### 5. Caching (`05-caching.ts`)

Implements caching patterns using async-toolbelt.

- TTL-based caching
- Cache invalidation
- Request memoization

### 6. Event Processing (`06-event-processing.ts`)

Shows how to process and transform event streams.

- Event filtering
- Data grouping
- Complex type handling
- Statistics generation

### 7. Retry Logic (`07-retry-logic.ts`)

Implements retry patterns with exponential backoff.

- Configurable retry attempts
- Exponential backoff
- Error recovery
- Progress tracking

### 8. Validation Pipeline (`08-validation-pipeline.ts`)

Comprehensive validation pipeline example.

- Input validation
- Data normalization
- Complex validation rules
- Error aggregation

## Running the Examples

To run any example:

```bash
# Install dependencies first
npm install

# Run an example using ts-node
npx ts-node examples/01-basic-pipeline.ts
```

## Tips

1. Each example is self-contained and can be run independently
2. Examples demonstrate different aspects of the library
3. Feel free to modify and experiment with the examples
4. Check the comments in each file for detailed explanations

## Contributing

Feel free to add more examples! When adding examples:

1. Follow the existing naming convention
2. Include detailed comments
3. Demonstrate a specific use case
4. Update this README with your example

## Advanced Usage

The examples progress in complexity and showcase different features:

- Start with `01-basic-pipeline.ts` for fundamental concepts
- Move to error handling and data transformation examples
- Explore more complex patterns like caching and retry logic
- Study the validation pipeline for a comprehensive real-world example

## Getting Help

If you run into issues or have questions:

1. Check the comments in the example files
2. Refer to the main documentation
3. Open an issue on GitHub
