<script lang="ts">
	import { NetworkIcon } from '@lucide/svelte';
	import PageSection from '$lib/components/PageSection.svelte';
	import logo2 from '$lib/assets/logo2.png';
	import Button from '$lib/components/ui/Button.svelte';

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
					<b>Crypto Sharia</b> adalah platform komunitas yang mengintegrasikan edukasi, literasi, dan
					inovasi aset digital dengan prinsip kepatuhan syariah Islam. Platform ini hadir sebagai panduan
					strategis bagi investor untuk menavigasi pasar kripto dan teknologi blockchain secara etis,
					transparan, serta bebas dari unsur yang dilarang dalam fiqh muamalah.
				</p>
				<p class="fl-text-base/lg leading-relaxed max-md:text-justify">
					Sebagai pusat inovasi dan media, Crypto Sharia berkomitmen membangun ekosistem ekonomi
					digital yang inklusif demi kemaslahatan umat. Dengan menjembatani teknologi modern dan
					nilai-nilai spiritual, platform ini memastikan bahwa investasi aset masa depan tetap
					berjalan selaras dengan prinsip keberkahan dan keamanan syar'i.
				</p>
			</div>
			<div class="flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
				<Button size="md-lg" variant="solid" href="/#ekosistem">
					{#snippet suffixIcon({ class: iconClass })}
						<NetworkIcon class={iconClass} />
					{/snippet}
					Jelajahi Ekosistem
				</Button>
				<Button size="md-lg" variant="outline" href="/#kontak">Hubungi Kami</Button>
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
