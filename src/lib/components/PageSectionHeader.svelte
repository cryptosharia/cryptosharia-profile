<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		title: string;
		subtitle?: string;
		class?: string;
		titleClass?: string;
		subtitleClass?: string;
	};

	let { title, subtitle, class: className, titleClass, subtitleClass }: Props = $props();
</script>

<div class={cn('mx-auto fl-space-y-3/4 max-w-3xl text-center', className)}>
	<h2 class={cn('font-serif fl-text-3xl/4xl font-semibold text-primary', titleClass)}>
		{title}
	</h2>
	{#if subtitle}
		<p class={cn('mx-auto fl-text-lg/xl leading-relaxed', subtitleClass)}>
			{subtitle}
		</p>
	{/if}
</div>
