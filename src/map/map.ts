import type { MaybeAsyncUnaryFunction } from "../types";

export const map =
	<const T, const R>(fn: MaybeAsyncUnaryFunction<T, R>) =>
	(inp: T): R | Promise<R> =>
		fn(inp);
