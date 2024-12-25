export const tapAsync = <const T>(fn: (input: T) => Promise<unknown>) => {
  return async (inp: T): Promise<T> => {
    await fn(inp);
    return inp;
  };
};

/**
 * @alias for tapAsync
 */
export const tap = tapAsync;
