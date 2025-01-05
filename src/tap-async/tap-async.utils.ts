import type { AsyncFunction } from "../types";

export const tapAsync = <const T, const R>(fn: AsyncFunction<T, R>) => {
	return async (inp: T): Promise<T> => {
		await fn(inp);
		return inp;
	};
};

/**
 * @alias for tapAsync
 */
export const tap = tapAsync;
