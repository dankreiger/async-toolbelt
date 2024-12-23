type AsyncFunction<T> = (input: T) => Promise<T>;

export const pipeAsync = <T>(...fns: AsyncFunction<T>[]) => {
	return (input: T): Promise<T> =>
		fns.reduce<Promise<T>>(
			(promise, fn) => promise.then(fn),
			Promise.resolve(input),
		);
};
