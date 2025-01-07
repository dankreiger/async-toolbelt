import { map, pipe, tap } from "../src";

interface RawData {
	readonly user_id: number;
	readonly user_name: string;
	readonly created_at: string;
	readonly metadata?: Record<string, unknown>;
}

interface ProcessedData {
	readonly id: number;
	readonly username: string;
	readonly createdAt: Date;
	readonly metadata: Record<string, unknown>;
}

const processData = (data: RawData[]) =>
	pipe(
		data,
		// Convert array of raw data
		map((data) =>
			data.map((item) => ({
				id: item.user_id,
				username: item.user_name.toLowerCase(),
				createdAt: new Date(item.created_at),
				metadata: item.metadata || {},
			})),
		),
		// Filter out invalid dates
		map((data) =>
			data.filter((item) => !Number.isNaN(item.createdAt.getTime())),
		),
		// Sort by date
		map((data) =>
			[...data].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
		),
		// Log processing stats
		tap((data) => {
			console.log(`Processed ${data.length} records`);
			console.log(`Latest record: ${data[0]?.createdAt}`);
		}),
	);

async function main() {
	const rawData: RawData[] = [
		{
			user_id: 1,
			user_name: "JohnDoe",
			created_at: "2023-01-01T00:00:00Z",
		},
		{
			user_id: 2,
			user_name: "JaneSmith",
			created_at: "2023-02-01T00:00:00Z",
			metadata: { role: "admin" },
		},
	];

	const processed = await processData(rawData);
	console.log("Processed data:", processed);
}

main().catch(console.error);
