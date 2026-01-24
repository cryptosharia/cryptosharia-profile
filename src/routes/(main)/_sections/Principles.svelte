<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import PageSectionHeader from '$lib/components/PageSectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Heart, Users, Lightbulb, Award, Shield, Rocket } from '@lucide/svelte';

	const principles = [
		{
			title: 'Syariah Compliance',
			description:
				'Kami memastikan semua layanan dan produk kami sesuai dengan prinsip-prinsip syariah Islam.',
			icon: Heart,
			class: 'bg-red-500/10 text-red-500'
		},
		{
			title: 'Komunitas',
			description:
				'Membangun komunitas yang solid dan saling mendukung dalam ekosistem crypto syariah.',
			icon: Users,
			class: 'bg-blue-600/10 text-blue-600'
		},
		{
			title: 'Edukasi',
			description: 'Memberikan edukasi berkualitas tentang crypto dan blockchain sesuai syariah.',
			icon: Lightbulb,
			class: 'bg-amber-500/10 text-amber-500'
		},
		{
			title: 'Integritas',
			description: 'Menjunjung tinggi kejujuran dan transparansi dalam setiap aspek operasional.',
			icon: Award,
			class: 'bg-purple-500/10 text-purple-500'
		},
		{
			title: 'Keamanan',
			description: 'Mengutamakan keamanan dan perlindungan aset serta data komunitas kami.',
			icon: Shield,
			class: 'bg-emerald-500/10 text-emerald-500'
		},
		{
			title: 'Inovasi',
			description: 'Terus berinovasi untuk menghadirkan solusi crypto syariah yang lebih baik.',
			icon: Rocket,
			class: 'bg-orange-600/10 text-orange-600'
		}
	];
</script>

<PageSection id="principles">
	<PageSectionHeader
		title="Prinsip Kami"
		subtitle="Prinsip-prinsip yang memandu setiap langkah kami dalam membangun ekosistem crypto syariah"
	/>

	<div class="grid grid-cols-1 fl-gap-3/6 sm:grid-cols-2 lg:grid-cols-3">
		{#each principles as principle (principle.title)}
			{@const textColor = principle.class.split(' ').find((c) => c.startsWith('text-'))}
			<Card class="flex flex-col items-start gap-4">
				<div class="flex items-center gap-2">
					<Button
						variant="blank"
						size="icon-md"
						rounded
						pointerEvents={false}
						class={principle.class}
					>
						<principle.icon size={24} />
					</Button>
					<h3 class="line-clamp-1 fl-text-lg/xl font-semibold {textColor}">
						{principle.title}
					</h3>
				</div>
				<div class="space-y-1">
					<p class="line-clamp-3 fl-text-base/lg leading-relaxed">
						{principle.description}
					</p>
				</div>
			</Card>
		{/each}
	</div>
</PageSection>
