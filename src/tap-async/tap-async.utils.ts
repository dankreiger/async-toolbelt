export const tapAsync = <const T>(fn: (input: T) => Promise<unknown>) => {
	return async (input: T): Promise<T> => {
		await fn(input);
		return input;
	};
};
