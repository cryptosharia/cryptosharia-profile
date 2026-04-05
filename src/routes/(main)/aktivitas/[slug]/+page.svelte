<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CalendarIcon, ExternalLinkIcon } from '@lucide/svelte';
	import type { PageData } from './$types';
	import type { ActivityCardItem } from '$lib/activities/activity-card';
	import {
		formatDateOnly,
		formatWibDateTime,
		getUrlHost,
		isSafeExternalHttpUrl
	} from '$lib/format/dates';
	import { parseMarkdown } from '$lib/format/markdown';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const interactive = false;
	const otherActivities = $derived(
		(data as { otherActivities?: ActivityCardItem[] }).otherActivities ?? []
	);

	const contentHtml = $derived(parseMarkdown(post.content));

	const hasExternal = $derived(isSafeExternalHttpUrl(post.externalLink));
	const externalHost = $derived(getUrlHost(post.externalLink));

	function handleImageError(e: Event) {
		const img = e.currentTarget as HTMLImageElement | null;
		img?.remove();
	}
</script>

<main>
	<PageSection as="section">
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] lg:gap-6">
			<Card class="overflow-hidden" {interactive}>
				<div
					class="aspect-video w-full overflow-hidden bg-linear-to-br from-primary/10 via-transparent to-primary/5"
				>
					{#if post.coverImage?.url}
						<img
							src={post.coverImage.url}
							alt={post.title}
							class="size-full object-cover"
							onerror={handleImageError}
						/>
					{/if}
				</div>
				<div class="p-6">
					<h1 class="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						{post.title}
					</h1>

					{#if post.excerpt}
						<p class="mt-3 text-base leading-relaxed text-foreground/80">{post.excerpt}</p>
					{/if}

					<div
						class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-faded"
					>
						<span class="inline-flex items-center gap-2">
							<CalendarIcon size={16} />
							Dipublikasikan {formatDateOnly(post.publishedAt)}
						</span>

						{#if post.eventDate}
							<span class="inline-flex items-center gap-2">
								<CalendarIcon size={16} />
								Jadwal {formatWibDateTime(post.eventDate)}
							</span>
						{/if}
					</div>

					{#if post.tags?.length}
						<div class="mt-5 flex flex-wrap gap-2">
							{#each post.tags as tag (tag.id)}
								<span
									class="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[11px] font-bold tracking-tighter text-primary/70 uppercase"
								>
									{tag.name}
								</span>
							{/each}
						</div>
					{/if}

					<div class="prose mt-8 max-w-none prose-cs">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html contentHtml}
					</div>
				</div>
			</Card>

			<div class="space-y-4 lg:sticky lg:top-20 lg:self-start">
				{#if hasExternal}
					<Card class="p-5">
						<div class="text-sm font-semibold text-faded">Tautan</div>
						<div class="mt-2 text-sm font-semibold text-foreground">{externalHost}</div>
						<Button
							class="mt-4 w-full"
							variant="solid"
							size="lg"
							rounded
							href={post.externalLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{#snippet suffixIcon({ class: iconClass })}
								<ExternalLinkIcon class={iconClass} />
							{/snippet}
							Buka Link
						</Button>
					</Card>
				{/if}

				{#if otherActivities.length}
					<Card class="p-5">
						<div class="text-sm font-semibold text-faded">Aktivitas Lainnya</div>
						<div class="mt-3 space-y-3">
							{#each otherActivities as item (item.id)}
								<a
									href={`/aktivitas/${item.slug}`}
									class="group block rounded-2xl border border-primary/10 bg-primary/5 p-3 transition-all hover:bg-primary/10"
								>
									<div class="line-clamp-2 text-sm font-bold text-primary">{item.title}</div>
									<div class="mt-1 text-xs font-semibold tracking-wider text-faded uppercase">
										{formatDateOnly(item.publishedAt)}
									</div>
								</a>
							{/each}
						</div>
					</Card>
				{/if}

				<div class="flex justify-center">
					<Button variant="outline" href="/aktivitas" rounded>Lihat Semua Aktivitas</Button>
				</div>
			</div>
		</div>
	</PageSection>
</main>
