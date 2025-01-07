import { map, pipe, tap } from "../src";

interface User {
	readonly id: number;
	readonly email: string;
}

async function validateUser(user: User) {
	return pipe(
		user,
		// Validate email
		tap((user) => {
			if (!user.email.includes("@")) {
				throw new Error(`Invalid email: ${user.email}`);
			}
		}),
		// Normalize email
		map((user) => ({
			...user,
			email: user.email.toLowerCase().trim(),
		})),
		// Log success
		tap(() => console.log("User validated successfully")),
		// Add metadata
		map((user) => ({
			...user,
			validatedAt: new Date().toISOString(),
		})),
	);
}

async function main() {
	try {
		const validUser = await validateUser({
			id: 1,
			email: "user@example.com",
		});
		console.log("Valid user:", validUser);

		await validateUser({
			id: 2,
			email: "invalid-email", // This will throw
		});
	} catch (error) {
		console.error("Validation failed:", error);
	}
}

main();
