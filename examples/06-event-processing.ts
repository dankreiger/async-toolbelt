import { map, pipe, tap } from "../src";

interface BaseEvent {
	id: string;
	timestamp: number;
	type: string;
}

interface ClickEvent extends BaseEvent {
	type: "click";
	target: string;
}

interface PageViewEvent extends BaseEvent {
	type: "pageview";
	url: string;
	duration: number;
}

type Event = ClickEvent | PageViewEvent;

const processEvents = (events: Event[]) =>
	pipe(
		// Deduplicate events
		[...new Set(events)],

		// Sort by timestamp
		map((events) => [...events].sort((a, b) => a.timestamp - b.timestamp)),

		// Add processing metadata
		map((events) =>
			events.map((event) => ({
				...event,
				processed_at: Date.now(),
			})),
		),

		// Group by type
		map((events) =>
			events.reduce(
				(acc, event) => {
					acc[event.type] = [...(acc[event.type] || []), event];
					return acc;
				},
				{} as Record<string, typeof events>,
			),
		),

		// Log statistics
		tap((grouped) => {
			for (const [type, events] of Object.entries(grouped)) {
				console.log(`Processed ${events.length} ${type} events`);
			}
		}),
	);

async function main() {
	const events: Event[] = [
		{
			id: "1",
			timestamp: Date.now(),
			type: "click",
			target: "button-1",
		},
		{
			id: "2",
			timestamp: Date.now() + 1000,
			type: "pageview",
			url: "/home",
			duration: 5000,
		},
	];

	const processed = await processEvents(events);
	console.log("Processed events:", processed);
}

main().catch(console.error);
