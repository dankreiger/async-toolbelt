import type { AsyncFunction } from "../types";

export const mapAsync =
	<const T, const R>(fn: AsyncFunction<T, R>) =>
	(inp: T): Promise<R> =>
		fn(inp);

/**
 * @alias for tapAsync
 */
export const map = mapAsync;
