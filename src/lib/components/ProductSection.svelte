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

	type PricingPlan = {
		name: string;
		oldPrice: string;
		newPrice: string;
	};

	type Props = HTMLAttributes<HTMLElement> & {
		primaryColor?: string;
		title: string;
		titleHighlight?: string;
		subtitle: string;
		features: Feature[];
		posterSrc: string;
		benefitsTitle: string;
		benefitsDescription: string;
		benefits: string[];
		pricingPlans?: PricingPlan[];
		ctaText: string;
		ctaHref: string;
		ctaIcon?: Component;
		reverse?: boolean;
	};

	let {
		class: className,
		primaryColor,
		title,
		titleHighlight,
		subtitle,
		features,
		posterSrc,
		benefitsTitle,
		benefitsDescription,
		benefits,
		pricingPlans,
		ctaText,
		ctaHref,
		ctaIcon: CtaIcon,
		reverse = false,
		...rest
	}: Props = $props();
</script>

<section
	style={primaryColor ? `--color-primary: ${primaryColor}` : undefined}
	class={cn('fl-py-10/16', className)}
	{...rest}
>
	<div class="mx-auto fl-space-y-3/6 max-w-7xl fl-px-3/6">
		<!-- Header -->
		<div class="mx-auto fl-space-y-3/4 max-w-3xl text-center">
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
		<div class="grid grid-cols-2 fl-gap-3/6 lg:grid-cols-4">
			{#each features as feature (feature.title)}
				<Card class="group flex flex-col items-start p-4 sm:gap-2.5 sm:p-5">
					<div class="flex items-center gap-2">
						<Button
							variant="blank"
							size="icon-md"
							class="hidden rounded-2xl bg-primary/10 text-primary transition-transform group-hover:rotate-6 sm:inline-flex"
						>
							<feature.icon />
						</Button>
						<h3 class="line-clamp-1 text-base font-semibold text-primary sm:text-lg">
							{feature.title}
						</h3>
					</div>
					<div>
						<p class="line-clamp-3 text-xs text-faded sm:text-base sm:leading-relaxed">
							{feature.description}
						</p>
					</div>
				</Card>
			{/each}
		</div>

		<!-- Main Content Card -->
		<Card class="fl-p-6/12">
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
						class="aspect-3/4 w-full max-w-md overflow-hidden p-2"
					>
						<img src={posterSrc} alt={title} class="h-full w-full rounded-2xl object-cover" />
					</Card>
				</div>

				<!-- Content/Benefits Column -->
				<div class={cn('flex flex-col space-y-10', reverse && 'md:order-1')}>
					<div class="space-y-6">
						<h2
							class="font-serif fl-text-3xl/5xl leading-tight font-bold tracking-tight text-foreground"
						>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
						size="lg"
						class="font-bold uppercase"
						rounded
						href={ctaHref}
						target="_blank"
					>
						{#snippet suffixIcon({ class: iconClass })}
							{#if CtaIcon}
								<CtaIcon class={iconClass} />
							{/if}
						{/snippet}
						{ctaText}
					</Button>
				</div>
			</div>
		</Card>

		{#if pricingPlans?.length}
			<div class="grid grid-cols-2 fl-gap-3/6 lg:grid-cols-4">
				{#each pricingPlans as plan (plan.name)}
					<Card class="relative flex flex-col gap-3 p-4 sm:gap-2.5 sm:p-5" gradient="none">
						<div class="text-sm font-extrabold tracking-wide text-foreground uppercase">
							{plan.name}
						</div>

						<div class="space-y-1">
							<div class="text-xs text-faded">
								<del class="decoration-2">{plan.oldPrice}</del>
							</div>
							<div
								class="text-lg font-black tracking-tight"
								style={primaryColor ? `color: ${primaryColor}` : ''}
							>
								{plan.newPrice}
							</div>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</section>
