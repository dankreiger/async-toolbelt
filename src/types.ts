export type AsyncFunction<in I, out O = I> = (input: I) => Promise<O>;
