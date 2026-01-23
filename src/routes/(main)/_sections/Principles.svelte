<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import PageSectionHeader from '$lib/components/PageSectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Heart, Users, Lightbulb, Award, Shield, Rocket } from '@lucide/svelte';

	const principles = [
		{
			title: 'Syariah Compliance',
			description:
				'Kami memastikan semua layanan dan produk kami sesuai dengan prinsip-prinsip syariah Islam.',
			icon: Heart,
			color: 'text-red-500',
			bgColor: 'bg-red-50 dark:bg-red-950/30'
		},
		{
			title: 'Komunitas',
			description:
				'Membangun komunitas yang solid dan saling mendukung dalam ekosistem crypto syariah.',
			icon: Users,
			color: 'text-blue-600',
			bgColor: 'bg-blue-50 dark:bg-blue-950/30'
		},
		{
			title: 'Edukasi',
			description: 'Memberikan edukasi berkualitas tentang crypto dan blockchain sesuai syariah.',
			icon: Lightbulb,
			color: 'text-amber-500',
			bgColor: 'bg-amber-50 dark:bg-amber-950/30'
		},
		{
			title: 'Integritas',
			description: 'Menjunjung tinggi kejujuran dan transparansi dalam setiap aspek operasional.',
			icon: Award,
			color: 'text-purple-500',
			bgColor: 'bg-purple-50 dark:bg-purple-950/30'
		},
		{
			title: 'Keamanan',
			description: 'Mengutamakan keamanan dan perlindungan aset serta data komunitas kami.',
			icon: Shield,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-50 dark:bg-emerald-950/30'
		},
		{
			title: 'Inovasi',
			description: 'Terus berinovasi untuk menghadirkan solusi crypto syariah yang lebih baik.',
			icon: Rocket,
			color: 'text-orange-600',
			bgColor: 'bg-orange-50 dark:bg-orange-950/30'
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
			<Card class="flex flex-col items-start gap-4">
				<div
					class="{principle.bgColor} {principle.color} flex size-14 items-center justify-center rounded-full"
				>
					<principle.icon size={28} />
				</div>
				<div class="space-y-1">
					<h3 class="{principle.color} fl-text-lg/xl font-bold">
						{principle.title}
					</h3>
					<p class="fl-text-base/lg leading-relaxed text-faded">
						{principle.description}
					</p>
				</div>
			</Card>
		{/each}
	</div>
</PageSection>
