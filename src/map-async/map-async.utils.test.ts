import { describe, expect, it } from "bun:test";
import { pipeAsync } from "../pipe-async";
import { mapAsync } from "./map-async.utils";

describe("mapAsync", () => {
	it("should apply async function to input", async () => {
		const double = async (x: number): Promise<number> => x * 2;
		const doubleMapper = mapAsync(double);

		const result = await doubleMapper(5);
		expect(result).toBe(10);
	});

	it("should handle async functions that return different types", async () => {
		const toStr = async (x: number): Promise<string> => x.toString();
		const stringMapper = mapAsync(toStr);

		const result = await stringMapper(42);
		expect(result).toBe("42");
	});

	it("should propagate errors from the async function", async () => {
		const throwError = async (_: unknown): Promise<never> => {
			throw new Error("Test error");
		};
		const errorMapper = mapAsync(throwError);

		await expect(errorMapper("anything")).rejects.toThrow("Test error");
	});

	it("it can be piped", async () => {
		const uppercaseAsync = async (str: string): Promise<string> =>
			str.toUpperCase();

		const res = await pipeAsync("dog", mapAsync(uppercaseAsync));
		expect(res).toBe("DOG");
	});
});
