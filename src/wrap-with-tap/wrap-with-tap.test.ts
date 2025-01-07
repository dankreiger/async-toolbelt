import {
	afterAll,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
	mock,
	spyOn,
} from "bun:test";
import { pipe } from "../pipe";
import { wrapWithTap } from "./wrap-with-tap";

describe("wrapWithTap", () => {
	// ------------------------------------------------------------------------------------
	// Mocks
	// ------------------------------------------------------------------------------------
	const jsonResponseMock = mock(async () => ({
		name: "John",
		age: 30,
	}));

	const fetchMock = mock(([url]: Parameters<typeof fetch>) =>
		Promise.resolve({
			json: jsonResponseMock,
		}),
	) as unknown as typeof fetch;

	const sleep = mock(
		(x: number) => new Promise((resolve) => setTimeout(resolve, x)),
	);

	const consoleLogSpy = spyOn(console, "log").mockImplementation(() => {});
	const consoleInfoSpy = spyOn(console, "info").mockImplementation(() => {});
	const setTimeoutSpy = spyOn(global, "setTimeout"); // bun mocks out timeout api

	spyOn(global, "fetch").mockImplementation(fetchMock);

	beforeEach(() => {
		// Ensure everything is reset before each test
		jest.clearAllMocks();
	});

	afterEach(() => {
		// Additional cleanup if needed
	});

	afterAll(() => {
		// Restore mocks after all tests are done
		jest.restoreAllMocks();
	});

	// ------------------------------------------------------------------------------------
	// Example: Test with multiple async side-effect functions
	// ------------------------------------------------------------------------------------
	it("wraps multiple functions with tapAsync and preserves piped value", async () => {
		// ------------------------
		// Arrange
		// ------------------------
		const expectedPipedValue = "123";
		const getUrlById = (x: string) =>
			`https://jsonplaceholder.typicode.com/todos/${x}`;

		const effect1 = mock((x: string) => {
			const url = getUrlById(x);
			console.info(`effect1: fetching from ${url}`);
			// Return a promise
			const res = fetch(url).then((res) => res.json());
			console.info("effect1: ", res);
			return res;
		});

		const effect2 = mock(async () => {
			console.info("effect2: sleeping");
			await sleep(10);
			console.info("effect2: slept");
		});

		const effect3 = mock(
			async (x: string) =>
				new Promise((resolve) => {
					console.log(x);
					resolve("anything");
				}),
		);

		// Wrap the effects
		const wrapped = wrapWithTap<3, string>([effect1, effect2, effect3]);

		// ------------------------
		// Act
		// ------------------------
		const result = await pipe(expectedPipedValue, ...wrapped);

		// ------------------------
		// Assert
		// ------------------------
		// 1. piped value should remain unaltered
		expect(result).toEqual(expectedPipedValue);

		// 2. effect1 assertions
		expect(effect1).toHaveBeenCalledTimes(1);
		expect(effect1).toHaveBeenCalledWith(expectedPipedValue);
		expect(consoleInfoSpy).toHaveBeenCalledWith(
			`effect1: fetching from ${getUrlById(expectedPipedValue)}`,
		);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(getUrlById(expectedPipedValue));
		expect(jsonResponseMock).toHaveBeenCalledTimes(1);
		expect(await jsonResponseMock()).toEqual({ name: "John", age: 30 });

		// 3. effect2 assertions
		expect(effect2).toHaveBeenCalledWith(expectedPipedValue);
		expect(consoleInfoSpy).toHaveBeenCalledWith("effect2: sleeping");
		expect(sleep).toHaveBeenCalledWith(10);
		expect(consoleInfoSpy).toHaveBeenCalledWith("effect2: slept");
		expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

		// 4. effect3 assertions
		expect(effect3).toHaveBeenCalledWith(expectedPipedValue);
		expect(consoleLogSpy).toHaveBeenCalledWith(expectedPipedValue);
	});

	// ------------------------------------------------------------------------------------
	// Example: Test with an empty array of fns
	// ------------------------------------------------------------------------------------
	it("returns an empty array of wrapped functions for an empty input array", async () => {
		// ------------------------
		// Arrange
		// ------------------------
		const wrapped = wrapWithTap<0, string>([]);

		// ------------------------
		// Act
		const value = "no-op-test";
		const result = await pipe(value, ...wrapped);

		// ------------------------
		// Assert
		// If no functions are passed in, the value should remain untouched
		expect(result).toEqual(value);
		expect(wrapped).toHaveLength(0);
	});

	// ------------------------------------------------------------------------------------
	// Example: Test error propagation if a wrapped function rejects
	// ------------------------------------------------------------------------------------
	it("propagates errors if one of the wrapped functions throws", async () => {
		// Arrange
		const effectThatThrows = mock(async (x: string) => {
			throw new Error("Intentional error from effect");
		});
		const wrapped = wrapWithTap<1, string>([effectThatThrows]);
		const expectedPipedValue = "err-test";

		// Act & Assert
		await expect(pipe(expectedPipedValue, ...wrapped)).rejects.toThrowError(
			"Intentional error from effect",
		);

		// Ensure side effect was called
		expect(effectThatThrows).toHaveBeenCalledTimes(1);
		expect(effectThatThrows).toHaveBeenCalledWith(expectedPipedValue);
	});
});
