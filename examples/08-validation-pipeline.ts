import { map, pipe, tap } from "../src";

interface UserData {
	readonly username: string;
	readonly email: string;
	readonly age: number;
	readonly preferences?: Record<string, unknown>;
}

const validateUser = (userData: UserData) =>
	pipe(
		userData,
		// Normalize input
		map((data) => ({
			...data,
			username: data.username.trim().toLowerCase(),
			email: data.email.trim().toLowerCase(),
			preferences: data.preferences || {},
		})),

		// Validate username
		tap((data) => {
			if (data.username.length < 3) {
				throw new Error("Username must be at least 3 characters long");
			}
			if (!/^[a-z0-9_]+$/.test(data.username)) {
				throw new Error(
					"Username can only contain letters, numbers, and underscores",
				);
			}
		}),

		// Validate email
		tap((data) => {
			if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
				throw new Error(`Invalid email: ${data.email}`);
			}
		}),

		// Validate age
		tap((data) => {
			if (typeof data.age !== "number" || data.age < 13) {
				throw new Error("User must be at least 13 years old");
			}
		}),

		// Add metadata
		map((data) => ({
			...data,
			validated: true,
			validatedAt: new Date().toISOString(),
		})),

		tap((data) => console.log("Validation successful:", data)),
	);

async function main() {
	try {
		const validUser = await validateUser({
			username: "john_doe",
			email: "john@example.com",
			age: 25,
		});
		console.log("Valid user:", validUser);

		await validateUser({
			username: "x", // This will fail
			email: "invalid-email",
			age: 10,
		});
	} catch (error) {
		console.error("Validation failed: ", error);
	}
}

main();
