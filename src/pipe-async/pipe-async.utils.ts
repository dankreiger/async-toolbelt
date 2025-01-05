type AsyncFunction<in A, out B> = (input: A) => Promise<B>;

// No functions overload
export function pipeAsync<const I, const O extends I = I>(input: I): Promise<O>;

// Single function overload
export function pipeAsync<const I, const O>(
  input: I,
  fn: AsyncFunction<I, O>
): Promise<O>;

// Multiple functions overload
export function pipeAsync<const I, const T1, const O>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, O>
): Promise<O>;

export function pipeAsync<const I, const T1, const T2, const O>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, O>
): Promise<O>;

export function pipeAsync<const I, const T1, const T2, const T3, const O>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const T13,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, T13>,
  fn14: AsyncFunction<T13, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const T13,
  const T14,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, T13>,
  fn14: AsyncFunction<T13, T14>,
  fn15: AsyncFunction<T14, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const T13,
  const T14,
  const T15,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, T13>,
  fn14: AsyncFunction<T13, T14>,
  fn15: AsyncFunction<T14, T15>,
  fn16: AsyncFunction<T15, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const T13,
  const T14,
  const T15,
  const T16,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, T13>,
  fn14: AsyncFunction<T13, T14>,
  fn15: AsyncFunction<T14, T15>,
  fn16: AsyncFunction<T15, T16>,
  fn17: AsyncFunction<T16, O>
): Promise<O>;

export function pipeAsync<
  const I,
  const T1,
  const T2,
  const T3,
  const T4,
  const T5,
  const T6,
  const T7,
  const T8,
  const T9,
  const T10,
  const T11,
  const T12,
  const T13,
  const T14,
  const T15,
  const T16,
  const T17,
  const O
>(
  input: I,
  fn1: AsyncFunction<I, T1>,
  fn2: AsyncFunction<T1, T2>,
  fn3: AsyncFunction<T2, T3>,
  fn4: AsyncFunction<T3, T4>,
  fn5: AsyncFunction<T4, T5>,
  fn6: AsyncFunction<T5, T6>,
  fn7: AsyncFunction<T6, T7>,
  fn8: AsyncFunction<T7, T8>,
  fn9: AsyncFunction<T8, T9>,
  fn10: AsyncFunction<T9, T10>,
  fn11: AsyncFunction<T10, T11>,
  fn12: AsyncFunction<T11, T12>,
  fn13: AsyncFunction<T12, T13>,
  fn14: AsyncFunction<T13, T14>,
  fn15: AsyncFunction<T14, T15>,
  fn16: AsyncFunction<T15, T16>,
  fn17: AsyncFunction<T16, T17>,
  fn18: AsyncFunction<T17, O>
): Promise<O>;

// Implementation
export function pipeAsync<const I, const O>(
  input: I,
  ...fns: ReadonlyArray<AsyncFunction<any, any>>
): Promise<O> {
  return new Promise(async (resolve, reject) => {
    try {
      let acc = input;
      for (const fn of fns) acc = await fn(acc);
      resolve(acc as unknown as O);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @alias pipeAsync
 */
export const pipe = pipeAsync;
