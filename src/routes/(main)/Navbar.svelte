<script lang="ts">
	import { page } from '$app/state';
	import CryptoShariaLogoType from '$lib/components/CryptoShariaLogoType.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	type Link = {
		text: string;
		href: string;
	};

	// Reactive state for UI
	let isDrawerOpen = $state(false);
	let drawerHeight = $state(0);
	// Derived active path (first segment of the URL)
	const activeSegment = $derived(`/${page.url.pathname.split('/')[1]}`);

	// Derived navigation links based on current route
	const links: Link[] = $derived([
		{ text: 'Prinsip', href: '/#principles' },
		{ text: 'Kontributor', href: activeSegment === '/' ? '/#contributors' : '/contributors' },
		{ text: 'Aktivitas', href: activeSegment === '/' ? '/#activities' : '/activities' },
		{ text: 'Media', href: '/#media' },
		{ text: 'Discord', href: '/#discord' },
		{ text: 'Kontak', href: '/#contact' }
	]);

	function closeDrawer() {
		// Small delay to allow the tap/click to be perceived before closing
		setTimeout(() => (isDrawerOpen = false), 150);
	}
</script>

{#snippet navLink(link: Link, isMobile = false)}
	{@const isActive = link.href === activeSegment}
	{@const isCta = link.text === 'Kontak'}

	{#if isCta}
		<Button
			rounded
			variant="solid"
			size="md"
			href={link.href}
			onclick={closeDrawer}
			class="font-semibold {isMobile && 'w-full'}"
		>
			{link.text}
		</Button>
	{:else}
		<Button
			variant="link-ghost"
			size="md"
			href={link.href}
			onclick={closeDrawer}
			class="px-0 hover:no-underline {isActive && 'text-primary'} {isMobile && 'w-full'}"
		>
			{link.text}
		</Button>
	{/if}
{/snippet}

<header class="fixed top-0 left-0 z-50 h-16 w-full shadow-sm backdrop-blur-lg">
	<nav class="mx-auto flex h-full max-w-7xl items-center justify-between fl-px-3/6">
		<!-- Brand/Logo -->
		<CryptoShariaLogoType size="sm-md" />

		<!-- Desktop Menu -->
		<ul class="hidden items-center fl-gap-x-4/10 md:flex">
			{#each links as link (link.href)}
				<li>
					{@render navLink(link)}
				</li>
			{/each}
		</ul>

		<!-- Mobile Hamburger -->
		<Button
			variant={isDrawerOpen ? 'outline' : 'blank'}
			size="icon-md"
			class="relative flex-col gap-y-1.5 hover:bg-primary/5 md:hidden"
			onclick={() => (isDrawerOpen = !isDrawerOpen)}
			aria-expanded={isDrawerOpen}
			aria-label="Toggle navigation menu"
		>
			<!-- Top line -->
			<span
				class="h-0.5 w-6 rounded-full bg-primary transition-transform {isDrawerOpen && 'opacity-0'}"
			></span>

			<!-- Center lines -->
			<div class="relative h-0.5 w-6">
				<span
					class="absolute inset-0 h-full w-full rounded-full bg-primary transition-transform {isDrawerOpen &&
						'rotate-45'}"
				></span>
				<span
					class="absolute inset-0 h-full w-full rounded-full bg-primary transition-transform {isDrawerOpen &&
						'-rotate-45'}"
				></span>
			</div>

			<!-- Bottom line -->
			<span
				class="h-0.5 w-6 rounded-full bg-primary transition-transform {isDrawerOpen && 'opacity-0'}"
			></span>
		</Button>
	</nav>

	<!-- Mobile Drawer -->
	<div
		bind:clientHeight={drawerHeight}
		class="border-border absolute top-0 left-0 -z-10 w-full rounded-b-3xl border-b gradient-background bg-background px-4 pt-16 pb-2 shadow-xl transition-all duration-500 md:hidden {!isDrawerOpen &&
			'invisible opacity-0'}"
		style:transform={isDrawerOpen ? 'translateY(0)' : `translateY(-${drawerHeight + 100}px)`}
	>
		<ul class="flex flex-col gap-y-2">
			{#each links as link (link.href)}
				<li class="border-b py-2 last:border-0 last:pt-2">
					{@render navLink(link, true)}
				</li>
			{/each}
		</ul>
	</div>
</header>
