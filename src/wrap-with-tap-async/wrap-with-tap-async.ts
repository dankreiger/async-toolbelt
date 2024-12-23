import { tapAsync } from "../tap-async/index.ts";
import type { UnaryAsyncFunction } from "../types.ts";

export const wrapWithTapAsync = <const T>(
	...fns: UnaryAsyncFunction<T, T>[]
) => {
	return fns.map((fn) => tapAsync(fn));
};
