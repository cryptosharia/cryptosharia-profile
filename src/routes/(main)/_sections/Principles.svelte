<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import {
		Heart,
		Newspaper,
		ChartColumnIncreasing,
		Users,
		Lightbulb,
		Rocket
	} from '@lucide/svelte';

	const principles = [
		{
			title: 'Kepatuhan Syariah',
			description:
				'Memastikan setiap layanan, produk, dan instrumen investasi selaras dengan prinsip fiqh muamalah untuk menjaga keberkahan aset.',
			icon: Heart,
			class: 'bg-red-500/10 text-red-500'
		},
		{
			title: 'Media Terpercaya',
			description:
				'Menjadi sumber informasi utama yang akurat, obyektif, dan kredibel dalam menyajikan dinamika pasar kripto serta isu syariah terkini.',
			icon: Newspaper,
			class: 'bg-blue-600/10 text-blue-600'
		},
		{
			title: 'Literasi Keuangan Digital',
			description:
				'Meningkatkan kecerdasan finansial komunitas dalam mengelola aset digital secara bijak, strategis, dan sesuai kaidah pengelolaan harta dalam Islam.',
			icon: ChartColumnIncreasing,
			class: 'bg-amber-500/10 text-amber-500'
		},
		{
			title: 'Pemberdayaan Komunitas',
			description:
				'Membangun ekosistem yang inklusif, solid, dan saling mendukung guna menciptakan kekuatan ekonomi kolektif bagi para anggota.',
			icon: Users,
			class: 'bg-purple-500/10 text-purple-500'
		},
		{
			title: 'Edukasi Berkelanjutan',
			description:
				'Menyajikan literasi berkualitas tinggi mengenai teknologi blockchain dan kripto yang relevan serta mudah dipahami dari sudut pandang syariah.',
			icon: Lightbulb,
			class: 'bg-emerald-500/10 text-emerald-500'
		},
		{
			title: 'Inovasi Terukur',
			description:
				'Terus beradaptasi dan menghadirkan solusi teknologi mutakhir yang relevan dengan kebutuhan finansial digital masa kini.',
			icon: Rocket,
			class: 'bg-orange-600/10 text-orange-600'
		}
	];
</script>

<PageSection
	id="prinsip"
	title="Prinsip Kami"
	subtitle="Prinsip-prinsip yang memandu setiap langkah kami dalam membangun ekosistem crypto syariah"
>
	<div class="grid grid-cols-1 fl-gap-3/6 sm:grid-cols-2 lg:grid-cols-3">
		{#each principles as principle (principle.title)}
			{@const textColor = principle.class.split(' ').find((c) => c.startsWith('text-'))}
			<Card class="flex flex-col items-start gap-4 p-8">
				<div class="flex items-center gap-2">
					<Button variant="blank" size="icon-md" rounded class={principle.class}>
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
