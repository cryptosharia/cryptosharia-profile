<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLElement> & {
		as?: string;
		containerClass?: string;
		title?: string;
		subtitle?: string;
		headerClass?: string;
		titleClass?: string;
		subtitleClass?: string;
	};

	let {
		as = 'section',
		class: className,
		containerClass,
		title,
		subtitle,
		headerClass,
		titleClass,
		subtitleClass,
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element this={as} class={cn('fl-py-10/16', className)} {...rest}>
	<div class={cn('mx-auto max-w-7xl fl-px-3/6', containerClass)}>
		{#if title}
			<div class={cn('mx-auto fl-space-y-3/4 mb-10 max-w-3xl text-center', headerClass)}>
				<h2 class={cn('font-serif fl-text-3xl/4xl font-semibold text-primary', titleClass)}>
					{title}
				</h2>
				{#if subtitle}
					<p class={cn('fl-text-lg/xl leading-relaxed text-foreground', subtitleClass)}>
						{subtitle}
					</p>
				{/if}
			</div>
		{/if}
		{@render children?.()}
	</div>
</svelte:element>
