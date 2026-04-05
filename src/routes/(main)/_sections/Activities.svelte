<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CalendarIcon, ChevronRightIcon, StarIcon } from '@lucide/svelte';
	import type { ActivityCardItem } from '$lib/activities/activity-card';
	import { formatDateOnly } from '$lib/format/dates';

	const MAX_TAGS = 3;

	let { activities = [] }: { activities?: ActivityCardItem[] } = $props();

	function handleImageError(e: Event) {
		const img = e.currentTarget as HTMLImageElement | null;
		img?.remove();
	}
</script>

<PageSection
	id="aktivitas"
	title="Aktivitas Kami"
	subtitle="Dokumentasi kegiatan, perkembangan produk, dan kontribusi kami dalam membangun ekosistem crypto syariah."
>
	<div class="grid grid-cols-1 fl-gap-3/6 sm:grid-cols-2 lg:grid-cols-3">
		{#each activities as activity, i (activity.id)}
			<Card
				href={`/aktivitas/${activity.slug}`}
				class="group flex flex-col overflow-hidden {i === 3 ? 'hidden sm:flex lg:hidden' : ''}"
				gradient="tl"
			>
				<div
					class="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/10 via-transparent to-primary/5"
				>
					{#if activity.isFeatured}
						<div class="absolute top-2 right-2 z-10 rounded-full bg-primary p-1.5 text-on-primary">
							<StarIcon size={14} class="fill-on-primary" />
						</div>
					{/if}
					{#if activity.coverImageUrl}
						<img
							src={activity.coverImageUrl}
							alt={activity.title}
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
						{formatDateOnly(activity.publishedAt)}
					</div>
					<h3 class="mb-3 line-clamp-1 text-xl font-bold text-primary">
						{activity.title}
					</h3>
					<p class="mb-6 line-clamp-2 text-faded">
						{activity.excerpt}
					</p>
					<div class="mt-auto flex flex-nowrap items-center gap-2 overflow-hidden">
						{#each activity.tags.slice(0, MAX_TAGS) as tag (tag.id)}
							<span
								title={tag.name}
								class="inline-flex max-w-40 min-w-0 shrink truncate rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-tighter text-primary/70 uppercase"
							>
								{tag.name}
							</span>
						{/each}
						{#if activity.tags.length > MAX_TAGS}
							<span
								title={`+${activity.tags.length - MAX_TAGS} tag lainnya`}
								class="inline-flex shrink-0 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-tighter text-primary/70 uppercase"
							>
								+{activity.tags.length - MAX_TAGS}
							</span>
						{/if}
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<div class="mt-12 flex justify-center">
		<Button size="lg" variant="outline" href="/aktivitas" rounded>
			{#snippet suffixIcon({ class: iconClass })}
				<ChevronRightIcon class={iconClass} />
			{/snippet}
			Lihat Semua Aktivitas
		</Button>
	</div>
</PageSection>
