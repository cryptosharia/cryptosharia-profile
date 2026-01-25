<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { CheckCircleIcon } from '@lucide/svelte';

	interface Feature {
		icon: Component;
		title: string;
		description: string;
	}

	type Props = HTMLAttributes<HTMLElement> & {
		title: string;
		titleHighlight?: string;
		subtitle: string;
		features: Feature[];
		posterSrc: string;
		benefitsTitle: string;
		benefitsDescription: string;
		benefits: string[];
		ctaText: string;
		ctaHref: string;
		ctaIcon?: Component;
		reverse?: boolean;
	};

	let {
		class: className,
		title,
		titleHighlight,
		subtitle,
		features,
		posterSrc,
		benefitsTitle,
		benefitsDescription,
		benefits,
		ctaText,
		ctaHref,
		ctaIcon: CtaIcon,
		reverse = false,
		...rest
	}: Props = $props();
</script>

<section class={cn('fl-py-10/16', className)} {...rest}>
	<div class="mx-auto max-w-7xl fl-px-3/6">
		<!-- Header -->
		<div class="mx-auto fl-space-y-3/4 mb-6 max-w-3xl text-center">
			<div class="mt-4 flex flex-col items-center gap-1">
				<h2
					class="font-serif fl-text-3xl/5xl leading-tight font-bold tracking-tight text-foreground"
				>
					{title}
					{#if titleHighlight}<span class="text-primary">{titleHighlight}</span>{/if}
				</h2>
				<div
					class="mt-2 h-1 w-20 rounded-full bg-linear-to-r from-transparent via-primary/50 to-transparent"
				></div>
			</div>

			<p class="fl-text-lg/xl leading-relaxed text-foreground">
				{subtitle}
			</p>
		</div>

		<!-- Features Grid -->
		<div class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature (feature.title)}
				<Card class="group flex flex-col items-start gap-4 p-8">
					<div class="flex items-center gap-2">
						<Button
							variant="blank"
							size="icon-md"
							pointerEvents={false}
							class="rounded-2xl bg-primary/10 text-primary transition-transform group-hover:rotate-6"
						>
							<feature.icon size={24} />
						</Button>
						<h3 class="line-clamp-1 fl-text-lg/xl font-semibold text-primary">
							{feature.title}
						</h3>
					</div>
					<div class="space-y-1">
						<p class="line-clamp-3 fl-text-base/lg leading-relaxed text-faded">
							{feature.description}
						</p>
					</div>
				</Card>
			{/each}
		</div>

		<!-- Main Content Card -->
		<Card class="fl-p-6/12" gradient={reverse ? 'br' : 'bl'}>
			<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
				<!-- Poster Column -->
				<div
					class={cn(
						'relative flex justify-center',
						reverse ? 'md:order-2 lg:justify-end' : 'lg:justify-start'
					)}
				>
					<Card
						href={ctaHref}
						target="_blank"
						gradient="none"
						class="group relative aspect-3/4 w-full max-w-md overflow-hidden border-2 border-white/20 p-2 shadow-2xl transition-all hover:scale-[1.02]"
					>
						<div class="relative h-full w-full overflow-hidden rounded-2xl">
							<img src={posterSrc} alt={title} class="h-full w-full object-cover" />
							<div
								class="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"
							></div>
						</div>
					</Card>
				</div>

				<!-- Content/Benefits Column -->
				<div class={cn('flex flex-col space-y-10', reverse && 'md:order-1')}>
					<div class="space-y-6">
						<h2
							class="font-serif fl-text-3xl/5xl leading-tight font-bold tracking-tight text-foreground"
						>
							{@html benefitsTitle}
						</h2>
						<p class="max-w-xl fl-text-base/lg leading-relaxed text-foreground/80">
							{benefitsDescription}
						</p>
					</div>

					<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
						{#each benefits as benefit (benefit)}
							<li class="group flex items-center gap-4">
								<div
									class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-all group-hover:scale-110"
								>
									<CheckCircleIcon size={16} strokeWidth={3} />
								</div>
								<span
									class="fl-text-base/lg font-semibold text-foreground/90 transition-colors group-hover:text-primary"
									>{benefit}</span
								>
							</li>
						{/each}
					</ul>

					<Button
						variant="solid"
						size="md"
						class="font-bold"
						rounded
						href={ctaHref}
						target="_blank"
						suffixIcon={CtaIcon}
					>
						{ctaText}
					</Button>
				</div>
			</div>
		</Card>
	</div>
</section>
