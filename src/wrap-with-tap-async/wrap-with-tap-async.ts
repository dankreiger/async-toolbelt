import { pipeAsync } from '../pipe-async/pipe-async.utils.ts';
import { tapAsync } from '../tap-async/index.ts';
import type { AsyncFunction } from '../types.ts';

export const wrapWithTapAsync = <const T>(...fns: AsyncFunction<T>[]) => {
  return fns.map((fn) => tapAsync(fn));
};

export const pipeTappedAsync = <const T>(...fns: AsyncFunction<T>[]) => {
  return pipeAsync(...wrapWithTapAsync(...fns));
};
