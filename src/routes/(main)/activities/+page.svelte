<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { formatDateOnly } from '$lib/format/dates';

	const MAX_TAGS = 3;

	let { data }: { data: PageData } = $props();

	function handleImageError(e: Event) {
		const img = e.currentTarget as HTMLImageElement | null;
		img?.remove();
	}

	const hasPrev = $derived(data.pagination.page > 1);
	const hasNext = $derived(data.pagination.page < data.pagination.totalPages);
	const prevHref = $derived(`/activities?page=${data.pagination.page - 1}`);
	const nextHref = $derived(`/activities?page=${data.pagination.page + 1}`);
</script>

<main>
	<PageSection
		as="section"
		title="Aktivitas"
		subtitle="Dokumentasi kegiatan dan event CryptoSharia yang telah dipublikasikan."
	>
		<div class="grid grid-cols-1 fl-gap-3/6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.items as item (item.id)}
				<Card
					href={`/activities/${item.slug}`}
					class="group flex flex-col overflow-hidden"
					gradient="tl"
				>
					<div
						class="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/10 via-transparent to-primary/5"
					>
						{#if item.isFeatured}
							<div
								class="absolute top-2 right-2 z-10 rounded-full bg-primary p-1.5 text-on-primary"
							>
								<StarIcon size={14} class="fill-on-primary" />
							</div>
						{/if}
						{#if item.coverImageUrl}
							<img
								src={item.coverImageUrl}
								alt={item.title}
								class="size-full object-cover"
								onerror={handleImageError}
								loading="lazy"
							/>
						{/if}
					</div>
					<div class="flex flex-1 flex-col p-5">
						<div
							class="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-faded uppercase"
						>
							<CalendarIcon size={14} />
							{formatDateOnly(item.publishedAt)}
						</div>
						<h3 class="mb-3 line-clamp-1 text-xl font-bold text-primary">{item.title}</h3>
						<p class="mb-6 line-clamp-2 text-faded">{item.excerpt}</p>
						<div class="mt-auto flex flex-nowrap items-center gap-2 overflow-hidden">
							{#each item.tags.slice(0, MAX_TAGS) as tag (tag.id)}
								<span
									title={tag.name}
									class="inline-flex max-w-40 min-w-0 shrink truncate rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-tighter text-primary/70 uppercase"
								>
									{tag.name}
								</span>
							{/each}
							{#if item.tags.length > MAX_TAGS}
								<span
									title={`+${item.tags.length - MAX_TAGS} tag lainnya`}
									class="inline-flex shrink-0 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-tighter text-primary/70 uppercase"
								>
									+{item.tags.length - MAX_TAGS}
								</span>
							{/if}
						</div>
					</div>
				</Card>
			{/each}
		</div>

		{#if data.pagination.totalPages > 1}
			<div class="mt-12 flex items-center justify-center gap-3">
				<Button variant="outline" href={prevHref} disabled={!hasPrev} rounded>
					{#snippet prefixIcon({ class: iconClass })}
						<ChevronLeftIcon class={iconClass} />
					{/snippet}
				</Button>
				<div class="text-sm font-semibold text-primary">
					{data.pagination.page} / {data.pagination.totalPages}
				</div>
				<Button variant="outline" href={nextHref} disabled={!hasNext} rounded>
					{#snippet suffixIcon({ class: iconClass })}
						<ChevronRightIcon class={iconClass} />
					{/snippet}
				</Button>
			</div>
		{/if}
	</PageSection>
</main>
