/**
 * A function that could be either sync or async.
 */
export type MaybeAsyncUnaryFunction<in I, out O = I> = (
	input: I,
) => O | Promise<O>;

/**
 * A reducer function that could be either sync or async.
 */
export type MaybeAsyncReducer<T, R> = (acc: T, inp: T) => R | Promise<R>;
