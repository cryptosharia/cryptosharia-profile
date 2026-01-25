<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CalendarIcon, ChevronRightIcon } from '@lucide/svelte';
	import activityWorkshop from '$lib/assets/activity-workshop.png';
	import activityFeature from '$lib/assets/activity-feature.png';
	import activityGathering from '$lib/assets/activity-gathering.png';
	import activityAMA from '$lib/assets/activity-ama.avif';

	const activities = [
		{
			image: activityWorkshop,
			date: '15 Jan 2026',
			title: 'Workshop Edukasi Crypto Syariah',
			description:
				'Membantu komunitas memahami dasar-dasar blockchain dan kepatuhan syariah dalam aset kripto.',
			tags: ['Edukasi', 'Blockchain']
		},
		{
			image: activityFeature,
			date: '10 Jan 2026',
			title: 'Peluncuran Fitur Token Screening',
			description:
				'Fitur baru kami untuk membantu pengguna menyaring token yang sesuai dengan prinsip syariah.',
			tags: ['Produk', 'Syariah']
		},
		{
			image: activityGathering,
			date: '5 Jan 2026',
			title: 'Gathering Komunitas CryptoSharia',
			description:
				'Pertemuan rutin pengurus dan member untuk membahas arah perkembangan ekosistem.',
			tags: ['Komunitas', 'Internal']
		},
		{
			image: activityAMA,
			date: '1 Jan 2026',
			title: 'AMA: Masa Depan Web3 Syariah',
			description: 'Diskusi interaktif mengenai peran teknologi Web3 dalam ekonomi syariah global.',
			tags: ['AMA', 'Web3']
		}
	];
</script>

<PageSection
	id="activities"
	title="Aktivitas Kami"
	subtitle="Dokumentasi kegiatan, perkembangan produk, dan kontribusi kami dalam membangun ekosistem crypto syariah."
>
	<div class="grid grid-cols-1 fl-gap-3/6 sm:grid-cols-2 lg:grid-cols-3">
		{#each activities as activity, i (activity.title)}
			<Card
				href="/activities"
				class="group flex flex-col overflow-hidden {i === 3 ? 'hidden sm:flex lg:hidden' : ''}"
				gradient="tl"
			>
				<div class="aspect-video w-full overflow-hidden">
					<img src={activity.image} alt={activity.title} class="size-full object-cover" />
				</div>
				<div class="flex flex-1 flex-col p-5">
					<div
						class="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-faded uppercase"
					>
						<CalendarIcon size={14} />
						{activity.date}
					</div>
					<h3 class="mb-3 line-clamp-1 text-xl font-bold text-primary">
						{activity.title}
					</h3>
					<p class="mb-6 line-clamp-2 text-faded">
						{activity.description}
					</p>
					<div class="mt-auto flex flex-wrap gap-2">
						{#each activity.tags as tag (tag)}
							<span
								class="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-tighter text-primary/70 uppercase"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<div class="mt-12 flex justify-center">
		<Button variant="outline" href="/activities" rounded suffixIcon={ChevronRightIcon}>
			Lihat Semua Aktivitas
		</Button>
	</div>
</PageSection>
