import type { FixedLengthArray, IntRange, ReadonlyTuple } from "type-fest";
import { tap } from "../tap";
import type { MaybeAsyncUnaryFunction } from "../types";

export function wrapWithTap<
	const N extends IntRange<0, 20>,
	const A,
	const R = unknown,
	const F extends MaybeAsyncUnaryFunction<A, R> = MaybeAsyncUnaryFunction<A, R>,
	const AA extends N extends 0
		? readonly []
		: FixedLengthArray<F, N> = N extends 0
		? readonly []
		: FixedLengthArray<F, N>,
>(fns: AA): ReadonlyTuple<MaybeAsyncUnaryFunction<A>, N> {
	return fns.map((x) => tap(x)) as ReadonlyTuple<MaybeAsyncUnaryFunction<A>, N>;
}
