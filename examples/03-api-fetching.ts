import { pipe, tap } from "../src";

interface Post {
	readonly id: number;
	readonly title: string;
	readonly body: string;
}

const fetchPosts = () =>
	pipe(
		tap(() => console.log("Fetching posts...")),
		async () => {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
			);
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			return (await response.json()) as Post[];
		},
		tap((posts) => console.log(`Fetched ${posts.length} posts`)),
		// Filter posts
		(posts) => posts.filter((post) => post.title.length < 50),
		tap((posts: Post[]) =>
			console.log(`${posts.length} posts after filtering`),
		),
		// Transform posts
		(posts: Post[]) =>
			posts.map((post) => ({
				...post,
				title: post.title.toUpperCase(),
				preview: `${post.body.slice(0, 100)}...`,
			})),
	);

async function main() {
	const posts = await fetchPosts();
	console.log("Processed posts:", posts);
}

main().catch(console.error);
