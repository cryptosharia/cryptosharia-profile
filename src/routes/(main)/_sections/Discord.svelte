<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CheckCircleIcon } from '@lucide/svelte';
	import discordPremiumImg from '$lib/assets/discord-premium.webp';

	const benefits = [
		'Akses ke channel eksklusif',
		'Dukungan prioritas dari tim kami',
		'Akses awal ke fitur baru',
		'Role dan badge khusus',
		'Pengalaman bebas iklan',
		'Event spesial dan giveaway',
		'Komunikasi langsung dengan pimpinan',
		'Sumber daya dan tools premium'
	];
</script>

<PageSection
	id="discord"
	title="Discord Premium"
	subtitle="Bergabung dengan komunitas Discord eksklusif kami dan dapatkan manfaat premium. Terhubung dengan profesional yang berpikiran sama, akses konten eksklusif, dan jadilah bagian dari sesuatu yang istimewa."
	class="bg-linear-to-br from-indigo-600 to-background transition-colors dark:from-indigo-700"
>
	<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
		<!-- Left: Poster Image in Card -->
		<div class="flex justify-center">
			<Card
				href="https://discord.gg/cryptosharia"
				target="_blank"
				class="group relative aspect-square overflow-hidden border-none from-white/10 to-gray-900 p-4 backdrop-blur-sm"
			>
				<div class="relative h-full w-full overflow-hidden rounded-2xl">
					<img src={discordPremiumImg} alt="Discord Premium" class="h-full w-full object-cover" />
				</div>
				<!-- Badge/Ribbon -->
				<div
					class="absolute top-4 left-0 translate-x-[-20%] -rotate-45 bg-amber-500 px-6 py-1 text-[10px] font-black text-black shadow-lg"
				>
					PREMIUM
				</div>
			</Card>
		</div>

		<!-- Right: Benefits List -->
		<div class="flex flex-col space-y-8 md:items-end md:text-right">
			<div class="space-y-4">
				<h3 class="fl-text-xl/2xl font-bold text-foreground">Manfaat Premium</h3>
				<ul class="space-y-4">
					{#each benefits as benefit (benefit)}
						<li class="flex items-center gap-3 md:flex-row-reverse">
							<CheckCircleIcon class="h-6 w-6 shrink-0 text-green-300" />
							<span class="fl-text-base/lg text-foreground">{benefit}</span>
						</li>
					{/each}
				</ul>
			</div>

			<Button
				variant="solid"
				size="md"
				class="bg-primary font-bold hover:bg-primary/90"
				href="https://discord.gg/cryptosharia"
				target="_blank"
			>
				Gabung Discord Premium
			</Button>
		</div>
	</div>
</PageSection>

<style>
	/* Light Mode */
	:global(#discord) {
		--color-foreground: white;
		--color-background: var(--color-purple-700);
		--color-primary: white;
		--color-on-primary: var(--color-background);
		--color-faded: rgba(255, 255, 255, 0.9);
	}

	/* Dark Mode */
	:global(.dark) :global(#discord) {
		--color-background: var(--color-purple-800);
	}
</style>
