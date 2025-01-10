import { pipe, tap } from "../src";

// ----- Types -----
interface User {
	readonly id: number;
	readonly name: string;
	readonly email: string;
}

type Permissions = readonly string[];

interface Post {
	readonly id: number;
	readonly userId: number;
	readonly content: string;
}

interface Address {
	readonly userId: number;
	readonly street: string;
	readonly city: string;
	readonly zip: string;
}

interface Phone {
	readonly userId: number;
	readonly phoneNumber: string;
	readonly type: "mobile" | "home" | "work";
}

interface Preferences {
	readonly userId: number;
	readonly theme: "light" | "dark";
	readonly notificationsEnabled: boolean;
}

// Single aggregated type to hold *all* user data
interface FullUserProfile {
	readonly user: User;
	readonly permissions: Permissions;
	readonly preferences: Preferences;
	readonly posts: Post[];
	readonly addresses: Address[];
	readonly phones: Phone[];
}

// ----- (1) Async fetch user -----
const fetchUser = async (id: number): Promise<User> => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 100));
	return { id, name: "Alice", email: "alice@example.com" };
};

// ----- (2) Validate user data (sync) -----
const validateUser = (user: User): User => {
	if (!user.email.includes("@") || !user.name) {
		throw new Error("User data is invalid");
	}
	return user;
};

// ----- (3) Async fetch permissions -----
const fetchPermissions = async (
	user: User,
): Promise<{ user: User; permissions: Permissions }> => {
	await new Promise((resolve) => setTimeout(resolve, 80));
	// Mock permissions data
	const permissions: Permissions = ["READ", "WRITE", "ADMIN"];
	return { user, permissions };
};

// ----- (4) Check permissions (sync) -----
const checkPermissions = ({
	user,
	permissions,
}: {
	user: User;
	permissions: Permissions;
}): { user: User; permissions: Permissions } => {
	if (!permissions.includes("ADMIN")) {
		console.warn(`User ${user.name} does not have ADMIN permission.`);
	}
	return { user, permissions };
};

// ----- (5) Side-effect: log user & permissions -----
const logUserAndPermissions = ({
	user,
	permissions,
}: {
	user: User;
	permissions: Permissions;
}) => {
	console.log(
		`[LOG] Fetched user #${user.id} with permissions: ${permissions.join(", ")}`,
	);
};

// ----- (6) Async fetch preferences -----
const fetchPreferences = async ({
	user,
	permissions,
}: {
	user: User;
	permissions: Permissions;
}): Promise<{
	user: User;
	permissions: Permissions;
	preferences: Preferences;
}> => {
	await new Promise((resolve) => setTimeout(resolve, 40));
	// Mock preferences
	const preferences: Preferences = {
		userId: user.id,
		theme: "dark",
		notificationsEnabled: true,
	};
	return { user, permissions, preferences };
};

// ----- (7) Async fetch posts -----
const fetchPosts = async ({
	user,
	permissions,
	preferences,
}: {
	user: User;
	permissions: Permissions;
	preferences: Preferences;
}): Promise<{
	user: User;
	permissions: Permissions;
	preferences: Preferences;
	posts: Post[];
}> => {
	await new Promise((resolve) => setTimeout(resolve, 110));
	const posts: Post[] = [
		{ id: 101, userId: user.id, content: "Hello world!" },
		{ id: 102, userId: user.id, content: "My second post." },
		{ id: 103, userId: user.id, content: "Vacation photos..." },
	];
	return { user, permissions, preferences, posts };
};

// ----- (8) Async fetch addresses -----
const fetchAddresses = async ({
	user,
	permissions,
	preferences,
	posts,
}: {
	user: User;
	permissions: Permissions;
	preferences: Preferences;
	posts: Post[];
}): Promise<{
	user: User;
	permissions: Permissions;
	preferences: Preferences;
	posts: Post[];
	addresses: Address[];
}> => {
	await new Promise((resolve) => setTimeout(resolve, 60));
	const addresses: Address[] = [
		{ userId: user.id, street: "123 Main St", city: "Berlin", zip: "10115" },
		{ userId: user.id, street: "456 Side Ave", city: "Hamburg", zip: "20095" },
	];
	return { user, permissions, preferences, posts, addresses };
};

// ----- (9) Async fetch phone numbers -----
const fetchPhones = async ({
	user,
	permissions,
	preferences,
	posts,
	addresses,
}: {
	user: User;
	permissions: Permissions;
	preferences: Preferences;
	posts: Post[];
	addresses: Address[];
}): Promise<FullUserProfile> => {
	await new Promise((resolve) => setTimeout(resolve, 70));
	const phones: Phone[] = [
		{ userId: user.id, phoneNumber: "555-1234", type: "mobile" },
		{ userId: user.id, phoneNumber: "555-5678", type: "home" },
	];
	return { user, permissions, preferences, posts, addresses, phones };
};

// ----- (10) Sync transform: compile user profile to a single object (already done above) -----
// We actually end up with FullUserProfile in the prior step.
// This step is conceptually “compiling” the data into one combined structure, but we already did so.
// Let’s do a quick pass-through:
const compileUserProfile = (profile: FullUserProfile): FullUserProfile => {
	// Here you could apply any additional calculations or transformations
	return profile;
};

// ----- (11) Sync scrub sensitive fields (e.g. partial email) -----
const scrubSensitiveData = (profile: FullUserProfile): FullUserProfile => {
	const scrubbedUser: User = {
		...profile.user,
		email: profile.user.email.replace(/(.{2}).+(@.+)/, "$1***$2"),
	};
	return { ...profile, user: scrubbedUser };
};

// ----- (12) Sync transform to summary string -----
const dataToSummaryString = (profile: FullUserProfile): string => {
	const { user, permissions, preferences, posts, addresses, phones } = profile;
	return `
[User #${user.id}]
  Name: ${user.name}
  Email: ${user.email}
  Permissions: ${permissions.join(", ")}
  Theme: ${preferences.theme}, Notifications: ${preferences.notificationsEnabled}
  Addresses:
    ${addresses.map((a) => `- ${a.street}, ${a.city} ${a.zip}`).join("\n    ")}
  Phones:
    ${phones.map((p) => `- ${p.type}: ${p.phoneNumber}`).join("\n    ")}
  Posts:
    ${posts.map((p) => `- (#${p.id}) ${p.content}`).join("\n    ")}
`.trim();
};

// ----- (13) Sync transform to CSV (pseudo CSV for demonstration) -----
const dataToCsv = (summary: string): string => {
	// Pretend we parse the summary and turn it into CSV lines
	return summary
		.split("\n")
		.map((line) => line.replace(/\s+/g, ",")) // Very naive CSV transform
		.join("\n");
};

// ----- (14) Sync transform to PDF (mock) -----
const dataToPdf = (csv: string): string => {
	// We'll pretend it’s a base64-encoded PDF. In reality, you’d call a library to generate it.
	return Buffer.from(`PDF_CONTENT:\n${csv}`, "utf8").toString("base64");
};

// ----- (15) Side-effect: log final data steps -----
const logPipelineData = (pdfString: string) => {
	console.log(
		`[LOG] Pipeline produced a pseudo-PDF of length: ${pdfString.length}`,
	);
};

// ----- (16) Async send analytics -----
const sendAnalytics = async (pdfString: string): Promise<string> => {
	await new Promise((resolve) => setTimeout(resolve, 30));
	// Mock analytics event
	return `Analytics event sent for PDF size ${pdfString.length}`;
};

// ----- (17) Async send notification -----
const sendNotification = async (message: string): Promise<string> => {
	await new Promise((resolve) => setTimeout(resolve, 50));
	return `Notification sent with message: "${message.slice(0, 50)}..."`; // truncated
};

// ----- (18) Side-effect: final logging -----
const logNotificationResult = (notification: string) => {
	console.log(`[LOG] Notification result: ${notification}`);
};

// ----- (19) Async save to database (mock) -----
const saveToDatabase = async (notification: string): Promise<string> => {
	await new Promise((resolve) => setTimeout(resolve, 100));
	return `Database record created for: "${notification}"`;
};

// ----- Putting it all together in one giant pipeline -----
pipe(
	1, // userId
	fetchUser, // (1) Fetch user (async)
	validateUser, // (2) Validate user (sync)
	fetchPermissions, // (3) Fetch permissions (async)
	checkPermissions, // (4) Check permissions (sync)
	tap(logUserAndPermissions), // (5) Side-effect logging
	fetchPreferences, // (6) Fetch preferences (async)
	fetchPosts, // (7) Fetch posts (async)
	fetchAddresses, // (8) Fetch addresses (async)
	fetchPhones, // (9) Fetch phone(s) (async) => FullUserProfile
	compileUserProfile, // (10) Combine data (sync)
	scrubSensitiveData, // (11) Scrub sensitive data (sync)
	dataToSummaryString, // (12) Convert to summary (sync)
	dataToCsv, // (13) Transform to CSV (sync)
	dataToPdf, // (14) Transform to PDF (mock) (sync)
	tap(logPipelineData), // (15) Side-effect log final data
	sendAnalytics, // (16) Send analytics (async)
	sendNotification, // (17) Send notifications (async)
	tap(logNotificationResult), // (18) Additional side-effect logging
	saveToDatabase, // (19) Write final record to DB (async)
).then((dbResult) => {
	console.log(dbResult);
	// Example final log:
	//   [LOG] Fetched user #1 with permissions: READ, WRITE, ADMIN
	//   [LOG] Pipeline produced a pseudo-PDF of length: 123
	//   [LOG] Notification result: Notification sent with message: "..."
	//   Database record created for: "Notification sent with message: "..."
});
