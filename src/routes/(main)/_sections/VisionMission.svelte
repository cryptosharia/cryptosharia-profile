<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Eye, Target } from '@lucide/svelte';

	const cards = [
		{
			title: 'Visi',
			content:
				'Menjadi platform terdepan dalam ekosistem cryptocurrency syariah di dunia, memberikan solusi keuangan digital yang halal, transparan, dan inovatif untuk komunitas Muslim global serta menjadi rujukan utama dalam edukasi crypto berbasis syariah.',
			Icon: Eye,
			iconClass: 'bg-purple-600 text-white',
			titleClass: 'text-purple-600',
			bgClass: 'bg-linear-to-br from-purple-50 to-background dark:from-purple-950/60'
		},
		{
			title: 'Misi',
			content:
				'Menyediakan edukasi berkualitas tentang cryptocurrency dan blockchain yang sesuai dengan prinsip syariah, membangun komunitas yang solid, serta mengembangkan ekosistem crypto halal yang berkelanjutan dan bermanfaat bagi umat.',
			Icon: Target,
			iconClass: 'bg-blue-600 text-white',
			titleClass: 'text-blue-600',
			bgClass: 'bg-linear-to-br from-blue-50 to-background dark:from-blue-950/60'
		}
	];
</script>

<PageSection id="vision-mission">
	<div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:fl-gap-3/6">
		{#each cards as card (card.title)}
			<Card class="{card.bgClass} text-foreground">
				<div class="mb-6 flex items-center gap-4">
					<div class="{card.iconClass} flex size-12 items-center justify-center rounded-full">
						<card.Icon size={26} />
					</div>
					<h2 class="{card.titleClass} font-serif text-2xl font-bold">{card.title}</h2>
				</div>
				<p class="text-lg leading-relaxed">
					{card.content}
				</p>
			</Card>
		{/each}
	</div>
</PageSection>
