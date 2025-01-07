import { pipe, tap } from "../src";

async function main() {
	const result = await pipe(
		"hello world",
		tap((str) => console.log("Input:", str)),
		(str) => str.toUpperCase(),
		tap((str) => console.log("After uppercase:", str)),
		(str) => str.split(""),
		tap((arr) => console.log("After split:", arr)),
		(arr) => arr.reverse(),
		(arr) => arr.join(""),
		tap((str) => console.log("Final result:", str)),
	);

	return result; // "DLROW OLLEH"
}

main().catch(console.error);
