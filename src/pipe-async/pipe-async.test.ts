import { describe, expect, it } from "bun:test";
import { pipeAsync } from "./pipe-async.utils";

// Helper async functions for testing
/**
 * Adds 1 to the given number.
 */
const addOne = async (x: number): Promise<number> => x + 1;

/**
 * Multiplies the given number by 2.
 */
const multiply = async (x: number): Promise<number> => x * 2;

/**
 * Converts a number to its string representation.
 */
const toStr = async (x: number): Promise<string> => x.toString();

/**
 * Delays the resolution of a value by `ms` milliseconds.
 */
const delay = async <T>(ms: number, value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => resolve(value), ms));

describe("pipeAsync", () => {
	it("should handle a single async function", async () => {
		// Arrange
		const initialValue = 1;

		// Act
		const result = await pipeAsync(initialValue, addOne);

		// Assert
		expect(result).toBe(2);
	});

	it("should handle multiple async functions in sequence", async () => {
		// Arrange
		const initialValue = 1;

		// Act
		const result = await pipeAsync(initialValue, addOne, multiply, toStr);

		// Assert
		expect(result).toBe("4");
	});

	it("should maintain the correct order of operations", async () => {
		// Arrange
		const initialValue = 2;

		// Act
		const result = await pipeAsync(
			initialValue,
			multiply, // 2 * 2 = 4
			addOne, // 4 + 1 = 5
			multiply, // 5 * 2 = 10
		);

		// Assert
		expect(result).toBe(10);
	});

	it("should work with delayed async functions", async () => {
		// Arrange
		const initialValue = 1;

		// Act
		const result = await pipeAsync(
			initialValue,
			(x) => delay(10, x + 1), // => 2
			(x) => delay(20, x * 2), // => 4
		);

		// Assert
		expect(result).toBe(4);
	});

	it("should handle type transformations across steps", async () => {
		// Arrange
		const initialValue = 123;
		const toBoolean = async (str: string): Promise<boolean> => str === "true";

		// Act
		const result = await pipeAsync(
			initialValue,
			toStr, // => "123"
			() => Promise.resolve("true"), // => "true"
			toBoolean, // => true
		);

		// Assert
		expect(result).toBe(true);
	});

	it("should reject if any step throws an error", async () => {
		// Arrange
		const throwError = async () => {
			throw new Error("Test error");
		};

		// Act & Assert
		// Since we are expecting a rejected promise, pass the promise directly to `.rejects.toThrow()`
		await expect(pipeAsync(1, addOne, throwError, multiply)).rejects.toThrow(
			"Test error",
		);
	});

	it("should handle the maximum number of functions (example: 18)", async () => {
		// Arrange
		const initialValue = 1;

		// This chain adds 1 repeatedly
		const result = await pipeAsync(
			initialValue,
			addOne, // => 2
			addOne, // => 3
			addOne, // => 4
			addOne, // => 5
			addOne, // => 6
			addOne, // => 7
			addOne, // => 8
			addOne, // => 9
			addOne, // => 10
			addOne, // => 11
			addOne, // => 12
			addOne, // => 13
			addOne, // => 14
			addOne, // => 15
			addOne, // => 16
			addOne, // => 17
			addOne, // => 18
			addOne, // => 19
		);

		// Assert
		expect(result).toBe(19);
	});
});
