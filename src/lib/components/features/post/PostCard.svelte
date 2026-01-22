<script module>
	export type PostCardProps = {
		slug: string;
		title: string;
		date: Date;
		tags: string[];
		thumbnailUrl: string;
		description: string;
	};
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '$lib/utils';

	let props: PostCardProps = $props();
</script>

<div
	class="group mx-auto w-84 overflow-hidden rounded-2xl border-2 shadow-xl transition-transform hover:scale-105"
>
	<a href={resolve(`/blog/${props.slug}`)}>
		<!-- Thumbnail -->
		<div class="relative h-50 w-full object-cover">
			<img src={props.thumbnailUrl} alt={props.title} class="size-full object-cover" />
			<span
				class="absolute right-1 bottom-1 rounded-md bg-black/50 px-1.5 py-0.5 text-sm text-white"
				>{formatDate(props.date)}</span
			>
		</div>

		<!-- Body -->
		<div class="p-2.5 pt-1">
			<h2 class="line-clamp-1 text-xl font-medium text-primary group-hover:underline">
				{props.title}
			</h2>
			<p class="line-clamp-2 text-justify text-muted-foreground">{props.description}</p>
			<div class="mt-2 flex items-stretch justify-end gap-x-1.5">
				{#each props.tags.slice(0, 3) as tag (tag)}
					<span
						class="flex items-center rounded-2xl border px-2.25 py-0.5 text-center text-sm text-muted-foreground shadow-2xl"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</a>
</div>
