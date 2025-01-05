import { describe, expect, it, mock } from "bun:test";
import { tap, tapAsync } from "./tap-async.utils";

describe("tapAsync", () => {
	it("should return the input value unchanged", async () => {
		const input = { value: 42 };
		const tappedMock = mock();

		const result = await tapAsync(tappedMock)(input);

		expect(result).toBe(input);
		expect(tappedMock).toHaveBeenCalledWith(input);
	});

	it("should execute the side effect function", async () => {
		let sideEffectValue = 0;
		const sideEffect = async (x: number) => {
			sideEffectValue = x * 2;
		};

		const input = 21;
		await tapAsync(sideEffect)(input);

		expect(sideEffectValue).toBe(42);
	});

	it("should handle async side effects", async () => {
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));
		let value = 0;

		const sideEffect = async (x: number) => {
			await delay(10);
			value = x;
		};

		await tapAsync(sideEffect)(42);
		expect(value).toBe(42);
	});

	it("should handle errors in side effects", async () => {
		const error = new Error("Test error");
		const failingFn = async () => {
			throw error;
		};

		await expect(tapAsync(failingFn)(42)).rejects.toThrow(error);
	});

	it("should work with tap alias", async () => {
		const input = "test";
		const tappedMock = mock();

		const result = await tap(tappedMock)(input);

		expect(result).toBe(input);
		expect(tappedMock).toHaveBeenCalledWith(input);
	});

	it("should maintain input type through the pipeline", async () => {
		interface User {
			readonly id: number;
			readonly name: string;
		}

		const user: User = { id: 1, name: "John" };
		const logger = async (u: User) => {
			console.log(u.name);
		};

		const result = await tapAsync(logger)(user);

		// TypeScript should recognize that result is of type User
		expect(result.id).toBe(1);
		expect(result.name).toBe("John");
	});
});
