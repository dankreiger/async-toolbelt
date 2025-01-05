import type { FixedLengthArray, IntRange, ReadonlyTuple } from "type-fest";
import { tapAsync } from "../tap-async/index.ts";
import type { AsyncFunction } from "../types.ts";

export function wrapWithTapAsync<
	const N extends IntRange<0, 20>,
	const A,
	const R = unknown,
	const F extends AsyncFunction<A, R> = AsyncFunction<A, R>,
	const AA extends N extends 0
		? readonly []
		: FixedLengthArray<F, N> = N extends 0
		? readonly []
		: FixedLengthArray<F, N>,
>(fns: AA): ReadonlyTuple<AsyncFunction<A>, N> {
	return fns.map((x) => tapAsync(x)) as ReadonlyTuple<AsyncFunction<A>, N>;
}
