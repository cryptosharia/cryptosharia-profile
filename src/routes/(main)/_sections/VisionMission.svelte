<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Eye, Target } from '@lucide/svelte';
	import type { SiteProfile } from '../+page.server';

	let { profile = null }: { profile?: SiteProfile | null } = $props();

	const cards = $derived([
		{
			title: 'Visi',
			content: profile?.vision ?? 'Menjadi platform media dan riset kripto syariah terbesar di dunia yang menjadi rujukan utama bagi umat Muslim dalam berinvestasi di ekonomi digital.',
			Icon: Eye,
			iconClass: 'bg-purple-600 text-white',
			titleClass: 'text-purple-600',
			bgClass: 'bg-linear-to-br from-purple-50 to-background dark:from-purple-950/60'
		},
		{
			title: 'Misi',
			content: profile?.mission ?? 'Menyediakan konten edukasi kripto yang mudah dipahami dan sesuai syariah, mengembangkan komunitas yang aktif dan inklusif, memberikan analisis serta riset market yang akurat, dan menciptakan solusi digital agar masyarakat dapat bertransisi ke ekonomi berbasis blockchain secara aman.',
			Icon: Target,
			iconClass: 'bg-blue-600 text-white',
			titleClass: 'text-blue-600',
			bgClass: 'bg-linear-to-br from-blue-50 to-background dark:from-blue-950/60'
		}
	]);
</script>

<PageSection id="vision-mission">
	<div class="grid grid-cols-1 fl-gap-3/6 md:grid-cols-2">
		{#each cards as card (card.title)}
			<Card class="{card.bgClass} fl-space-y-3/4 fl-p-5/8 text-foreground">
				<div class="flex items-center gap-3">
					<Button variant="blank" size="icon-md" rounded class={card.iconClass}>
						<card.Icon size={24} />
					</Button>
					<h2 class="{card.titleClass} font-serif text-2xl font-bold">{card.title}</h2>
				</div>
				<p class="fl-text-base/lg leading-relaxed">
					{card.content}
				</p>
			</Card>
		{/each}
	</div>
	{#if profile?.goals?.length}
		<Card class="mt-6 fl-space-y-3/4 fl-p-5/8 text-foreground">
			<h2 class="font-serif text-2xl font-bold text-primary">Tujuan</h2>
			<ul class="list-disc space-y-2 pl-5 fl-text-base/lg leading-relaxed">
				{#each profile.goals as goal (goal)}<li>{goal}</li>{/each}
			</ul>
		</Card>
	{/if}
</PageSection>
