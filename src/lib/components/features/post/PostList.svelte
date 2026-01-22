<script lang="ts">
	import PostCard, { type PostCardProps } from './PostCard.svelte';

	let props: PostCardProps[] = $props();
</script>

<div class="flex w-full flex-wrap gap-6">
	{#each props as post (post.slug)}
		<PostCard
			slug={post.slug}
			title={post.title}
			date={post.date}
			tags={post.tags}
			thumbnailUrl={post.thumbnailUrl}
			description={post.description}
		/>
	{/each}
</div>
