<script lang="ts">
	import { NetworkIcon } from '@lucide/svelte';
	import PageSection from '$lib/components/PageSection.svelte';
	import logo2 from '$lib/assets/logo2.png';
	import Button from '$lib/components/ui/Button.svelte';
	import { streamViewport } from '$lib/runes.svelte';

	const viewport = streamViewport();

	const buttonSize = $derived.by(() => {
		if (viewport.breakpoint >= 4 || viewport.breakpoint == 2) {
			return 'md';
		} else {
			return 'sm';
		}
	});

	// Tilt effect state
	let rotateX = $state(0);
	let rotateY = $state(0);

	/**
	 * Calculates the 3D rotation values based on the mouse position relative to the center of the logo.
	 * This creates the interactive 'tilt' effect.
	 */
	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect(); // Get element dimensions and position

		// Calculate mouse position relative to the element (0,0 is top-left)
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Find the center point of the element
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		/**
		 * Calculate rotation:
		 * - Difference from center determines the angle.
		 * - Divided by 10 to limit the maximum tilt (sensitivity).
		 * - rotateX uses Y distance, rotateY uses X distance.
		 */
		rotateX = (y - centerY) / 10;
		rotateY = (centerX - x) / 10;
	}

	/**
	 * Resets the rotation values back to 0 when the mouse leaves
	 * the container, causing the logo to snap back to its original orientation.
	 */
	function handleMouseLeave() {
		rotateX = 0;
		rotateY = 0;
	}
</script>

<PageSection id="hero">
	<!-- class="bg-linear-to-br from-primary-50 to-white dark:from-primary-950 dark:to-gray-950" -->
	<div class="grid grid-cols-1 items-center fl-gap-6/12 md:grid-cols-2">
		<div class="md:order-2">
			<!-- Floating layer -->
			<div class="animate-float">
				<!-- Mouse tracking layer (static relative to its parent) -->
				<div
					class="relative mx-auto fl-w-60/80 cursor-pointer"
					onmousemove={handleMouseMove}
					onmouseleave={handleMouseLeave}
					role="presentation"
					style:perspective="1000px"
				>
					<!-- `perspective` adds 3D depth so rotations look realistic -->
					<!-- It tells the browser: "Imagine the user is standing 1000 pixels away from this element." -->
					<img
						alt="CryptoSharia Logo"
						src={logo2}
						class="pointer-events-none w-full transition-transform duration-200 ease-out"
						style:transform="rotateX({rotateX}deg) rotateY({rotateY}deg)"
					/>
				</div>
			</div>
		</div>
		<div class="space-y-6 md:order-1">
			<div class="space-y-4">
				<h1 class="font-serif fl-text-4xl/5xl font-bold text-primary">CryptoSharia</h1>
				<p class="fl-text-base/lg leading-relaxed max-md:text-justify">
					<b>CryptoSharia</b> adalah organisasi yang berdedikasi untuk menggabungkan teknologi blockchain
					dan cryptocurrency dengan prinsip-prinsip syariah Islam. Kami berkomitmen untuk memberikan solusi
					crypto yang halal dan sesuai dengan nilai-nilai Islam.
				</p>
				<p class="fl-text-base/lg leading-relaxed max-md:text-justify">
					Dengan fokus pada edukasi, inovasi, dan kepatuhan syariah, kami membantu komunitas Muslim
					memahami dan memanfaatkan teknologi crypto secara bertanggung jawab.
				</p>
			</div>
			<div class="flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
				<Button size={buttonSize} variant="solid" suffixIcon={NetworkIcon} href="/#ecosystem">
					Lihat Ekosistem Kami
				</Button>
				<Button size={buttonSize} variant="outline" href="/#contact">Hubungi Kami</Button>
			</div>
		</div>
	</div>
</PageSection>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-25px);
		}
	}

	.animate-float {
		animation: float 5s ease-in-out infinite;
	}
</style>
