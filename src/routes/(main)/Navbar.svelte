<script lang="ts">
	import { page } from '$app/state';
	import logo1 from '$lib/assets/logo1.png';
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';
	import Button from '$lib/components/ui/Button.svelte';

	type Link = {
		text: string;
		href: string;
	};

	// Reactive state for UI
	let isDrawerOpen = $state(false);
	let drawerHeight = $state(0);

	// Derived navigation links based on current route
	const LINKS: Link[] = [
		{ text: 'Prinsip', href: '#principles' },
		{ text: 'Kontributor', href: '#contributors' },
		{ text: 'Aktivitas', href: '#activities' },
		{ text: 'Media', href: '#media' },
		{ text: 'Discord', href: '#discord' },
		{ text: 'Kontak', href: '#contact' }
	];

	// Derived active path (first segment of the URL)
	const activeSegment = $derived(`/${page.url.pathname.split('/')[1]}`);

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
			href={link.href}
			onclick={closeDrawer}
			class={cn('rounded-full', isMobile ? 'w-full text-base' : 'fl-text-sm/base')}
		>
			{link.text}
		</Button>
	{:else}
		<Button
			variant="blank"
			size="text"
			href={link.href}
			onclick={closeDrawer}
			class={cn(
				'h-fit p-0 font-semibold transition-all hover:text-primary hover:no-underline',
				'text-muted-foreground',
				isActive && 'text-primary',
				isMobile ? 'w-full text-center text-base' : 'fl-text-sm/base'
			)}
		>
			{link.text}
		</Button>
	{/if}
{/snippet}

<header class="fixed top-0 left-0 z-50 h-16 w-full shadow-sm backdrop-blur-lg">
	<nav class="mx-auto flex h-full max-w-7xl items-center justify-between fl-px-4/12">
		<!-- Brand/Logo -->
		<a
			href={resolve('/')}
			class="group flex items-center gap-x-2 transition-transform active:scale-95"
		>
			<img src={logo1} alt="Logo" class="fl-size-9/10" />
			<span
				class="font-serif fl-text-xl/2xl font-semibold text-primary transition-colors group-hover:text-primary/80"
			>
				CryptoSharia
			</span>
		</a>

		<!-- Desktop Menu -->
		<ul class="hidden items-center fl-gap-x-6/8 md:flex">
			{#each LINKS as link (link.href)}
				<li>
					{@render navLink(link)}
				</li>
			{/each}
		</ul>

		<!-- Mobile Hamburger -->
		<Button
			variant="blank"
			size="text"
			class="relative flex size-10 flex-col items-center justify-center gap-y-1.5 hover:bg-primary/10 md:hidden"
			onclick={() => (isDrawerOpen = !isDrawerOpen)}
			aria-expanded={isDrawerOpen}
			aria-label="Toggle menu"
		>
			<!-- Top line -->
			<span
				class={cn(
					'h-0.5 w-6 rounded-full bg-primary transition-all duration-300',
					isDrawerOpen && 'opacity-0'
				)}
			></span>

			<!-- Center lines -->
			<div class="relative h-0.5 w-6">
				<span
					class={cn(
						'absolute inset-0 h-full w-full rounded-full bg-primary transition-all duration-300',
						isDrawerOpen && 'rotate-45'
					)}
				></span>
				<span
					class={cn(
						'absolute inset-0 h-full w-full rounded-full bg-primary transition-all duration-300',
						isDrawerOpen && '-rotate-45'
					)}
				></span>
			</div>

			<!-- Bottom line -->
			<span
				class={cn(
					'h-0.5 w-6 rounded-full bg-primary transition-all duration-300',
					isDrawerOpen && 'opacity-0'
				)}
			></span>
		</Button>
	</nav>

	<!-- Mobile Drawer -->
	<div
		bind:clientHeight={drawerHeight}
		class={cn(
			'border-border absolute top-0 left-0 -z-10 w-full rounded-b-3xl border-b bg-background px-4 pt-16 pb-2 shadow-xl transition-all duration-500 md:hidden',
			!isDrawerOpen && 'invisible opacity-0'
		)}
		style:transform={isDrawerOpen ? 'translateY(0)' : `translateY(-${drawerHeight + 100}px)`}
	>
		<ul class="flex flex-col gap-y-2">
			{#each LINKS as link (link.href)}
				<li class="border-border/50 border-b py-2 last:border-0 last:pt-4">
					{@render navLink(link, true)}
				</li>
			{/each}
		</ul>
	</div>
</header>
