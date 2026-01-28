<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Facebook, Twitter, Instagram, Linkedin, Youtube } from '@lucide/svelte';
	import CryptoShariaLogo from '$lib/components/CryptoShariaLogo.svelte';

	const quickLinks = [
		{ name: 'Tentang Kami', href: '/' },
		{ name: 'Prinsip Kami', href: '/#principles' },
		{ name: 'Kontributor', href: '/#contributors' },
		{ name: 'Aktivitas', href: '/#activities' }
	];

	const services = [
		{ name: 'CryptoSharia Media', href: '/#cryptosharia-media' },
		{ name: 'Discord Premium', href: '/#discord-premium' },
		{ name: 'Hubungi Kami', href: '#contact' }
	];

	const socials = [
		{ icon: Facebook, href: '#' },
		{ icon: Twitter, href: '#' },
		{ icon: Instagram, href: '#' },
		{ icon: Linkedin, href: '#' },
		{ icon: Youtube, href: '#' }
	];
</script>

<PageSection
	as="footer"
	id="footer"
	style="
    --color-background: var(--color-gray-950);
    --color-foreground: var(--color-white);
    --color-faded: var(--color-gray-400);
    --color-line: var(--color-gray-600);
  "
	class="mt-10 border-t bg-background fl-pt-10/16 pb-0 dark:bg-transparent"
>
	<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
		<!-- Column 1: Brand (Always first) -->
		<div id="col" class="sm:order-1 lg:order-1 lg:col-span-4">
			<CryptoShariaLogo size="lg" variant="type" />
			<p class="text-sm leading-relaxed text-faded">
				Membangun ekosistem crypto syariah yang halal, transparan, dan inovatif untuk komunitas
				Muslim di Indonesia.
			</p>
		</div>

		<!-- Column 2: Quick Links (3rd on sm, 2nd on lg) -->
		<div id="col" class="sm:order-3 lg:order-2 lg:col-span-2">
			<h4>Tautan</h4>
			<ul class="space-y-3">
				{#each quickLinks as link (link.name)}
					<li>
						<Button variant="link-ghost" size="text" href={link.href} class="text-sm">
							{link.name}
						</Button>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Column 3: Services (4th on sm, 3rd on lg) -->
		<div id="col" class="sm:order-4 lg:order-3 lg:col-span-2">
			<h4>Produk & Layanan</h4>
			<ul class="space-y-3">
				{#each services as link (link.name)}
					<li>
						<Button variant="link-ghost" size="text" href={link.href} class="text-sm">
							{link.name}
						</Button>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Column 4: Socials (2nd on sm, 4th on lg) -->
		<div id="col" class="sm:order-2 lg:order-4 lg:col-span-4">
			<h4>Ikuti Kami</h4>
			<div class="flex flex-wrap gap-3">
				{#each socials as social (social.icon)}
					<Button variant="ghost" size="icon-md" rounded href={social.href}>
						<social.icon size={23} />
					</Button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom Copyright -->
	<div class="mt-10 border-t border-line/50 py-8 text-center font-serif text-sm text-faded">
		<p>© 2025 - 2026 CryptoSharia. All rights reserved.</p>
	</div>
</PageSection>

<style lang="postcss">
	@reference "../../layout.css";

	h4 {
		@apply text-sm font-bold tracking-wider text-foreground uppercase;
	}

	#col {
		@apply space-y-5;
	}
</style>
