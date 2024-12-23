export type AsyncFunction<T> = (input: T) => Promise<T>;
export type UnaryAsyncFunction<T, R> = (source: T) => Promise<R>;
