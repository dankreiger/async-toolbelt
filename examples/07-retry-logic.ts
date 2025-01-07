import { pipe, tap } from "../src";

interface RetryOptions {
	readonly maxAttempts: number;
	readonly baseDelay: number;
	readonly maxDelay: number;
}

function createRetryWrapper(options: RetryOptions) {
	const { maxAttempts, baseDelay, maxDelay } = options;

	return <T>(fn: () => Promise<T>) =>
		pipe(
			0 as number, // start with attempt count
			async function attempt(retryCount) {
				try {
					return await fn();
				} catch (error) {
					if (retryCount >= maxAttempts - 1) {
						throw error;
					}

					// Calculate delay with exponential backoff
					const delay = Math.min(baseDelay * 2 ** retryCount, maxDelay);

					console.log(
						`Attempt ${retryCount + 1} failed. Retrying in ${delay}ms...`,
					);

					await new Promise((resolve) => setTimeout(resolve, delay));
					return attempt(retryCount + 1);
				}
			},
			tap(() => console.log("Operation completed successfully")),
		);
}

async function main() {
	const retryWithBackoff = createRetryWrapper({
		maxAttempts: 3,
		baseDelay: 1000,
		maxDelay: 5000,
	});

	// Example of a flaky operation that fails sometimes
	let attempts = 0;
	const flakyOperation = async () => {
		attempts++;
		if (attempts < 2) {
			throw new Error("Random failure");
		}
		return "Success!";
	};

	try {
		const result = await retryWithBackoff(flakyOperation);
		console.log("Final result:", result);
	} catch (error) {
		console.error("All retry attempts failed: ", error);
	}
}

main().catch(console.error);
