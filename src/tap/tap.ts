import type { MaybeAsyncUnaryFunction } from "../types";

export const tap = <const T, const R>(fn: MaybeAsyncUnaryFunction<T, R>) => {
	return async (inp: T): Promise<T> => {
		await fn(inp);
		return inp;
	};
};
