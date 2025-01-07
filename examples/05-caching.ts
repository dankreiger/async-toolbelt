import { pipe, tap } from "../src";

class Cache<T> {
	private store = new Map<string, { value: T; timestamp: number }>();
	private ttl: number;

	constructor(ttlMs: number) {
		this.ttl = ttlMs;
	}

	get(key: string): T | undefined {
		const item = this.store.get(key);
		if (!item) return undefined;

		if (Date.now() - item.timestamp > this.ttl) {
			this.store.delete(key);
			return undefined;
		}

		return item.value;
	}

	set(key: string, value: T): void {
		this.store.set(key, { value, timestamp: Date.now() });
	}
}

function createCachedFetcher(ttlMs = 60000) {
	const cache = new Cache<unknown>(ttlMs);

	return (url: string) =>
		pipe(
			url,
			tap(() => console.log(`Requesting: ${url}`)),
			async (url) => {
				const cached = cache.get(url);
				if (cached) {
					console.log("Cache hit");
					return cached;
				}

				console.log("Cache miss, fetching...");
				const response = await fetch(url);
				const data = await response.json();

				cache.set(url, data);
				return data;
			},
		);
}

async function main() {
	const fetchWithCache = createCachedFetcher(5000);
	const URL = "https://jsonplaceholder.typicode.com/posts";

	// First request - cache miss
	await fetchWithCache(URL);

	// Second request within TTL - cache hit
	await fetchWithCache(URL);

	// Wait for TTL to expire
	await new Promise((resolve) => setTimeout(resolve, 6000));

	// Third request after TTL - cache miss
	await fetchWithCache(URL);
}

main().catch(console.error);
