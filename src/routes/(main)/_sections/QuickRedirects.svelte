<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { Component } from 'svelte';
	import { BookOpen, MessageCircle, Newspaper, Users } from '@lucide/svelte';

	type BadgeVariant = 'primary' | 'success' | 'warning' | 'neutral';

	type RedirectLink = {
		title: string;
		description: string;
		href: string;
		ctaText: string;
		icon: Component;
		badgeText: string;
		badgeVariant: BadgeVariant;
	};

	const badgeStyles: Record<BadgeVariant, string> = {
		primary: 'border-primary/20 bg-primary/10 text-primary',
		success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
		warning: 'border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300',
		neutral: 'border-foreground/10 bg-foreground/5 text-foreground/70'
	};

	const links: RedirectLink[] = [
		{
			title: 'Grup WhatsApp',
			description:
				'Diskusi crypto berbasis syariat: tanya jawab, sharing insight, dan bertukar opini secara sehat.',
			href: 'https://chat.whatsapp.com/EkyYn2gmXVN7tspbMvz6fx',
			ctaText: 'Gabung WhatsApp',
			icon: MessageCircle,
			badgeText: 'Eksklusif',
			badgeVariant: 'primary'
		},
		{
			title: 'Grup Discord',
			description: 'Akses harian ke event, berita terbaru, dan edukasi crypto tanpa biaya.',
			href: 'https://discord.gg/raBFJtB4ja',
			ctaText: 'Join Discord',
			icon: Users,
			badgeText: 'Gratis',
			badgeVariant: 'success'
		},
		{
			title: 'Website Berita',
			description:
				'Analisis makro, riset mendalam, dan kajian hukum koin crypto dalam satu platform.',
			href: 'https://media.cryptosharia.id',
			ctaText: 'Buka Website',
			icon: Newspaper,
			badgeText: 'Premium',
			badgeVariant: 'warning'
		},
		{
			title: 'Website Pembelajaran',
			description:
				'Belajar crypto dari nol hingga mahir: teknikal, fundamental, web3, dan fikih muamalah bersama ahli terpercaya.',
			href: 'https://academy.cryptosharia.id',
			ctaText: 'Mulai Belajar',
			icon: BookOpen,
			badgeText: 'Terstruktur',
			badgeVariant: 'neutral'
		}
	];
</script>

<PageSection id="mulai">
	<div
		aria-hidden="true"
		class="mx-auto mb-12 h-0.5 w-full max-w-6xl rounded-full bg-linear-to-r from-transparent via-primary/35 to-transparent"
	></div>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
		{#each links as link (link.title)}
			<Card class="flex h-full flex-col gap-5 p-5 sm:p-6" interactive={false}>
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-start gap-3">
						<Button variant="soft" size="icon-md" class="shrink-0">
							<link.icon size={22} />
						</Button>
						<div class="space-y-1">
							<div class="flex flex-wrap items-center gap-2">
								<h3 class="text-base font-bold text-foreground sm:text-lg">{link.title}</h3>
								<span
									class="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black tracking-wide uppercase {badgeStyles[
										link.badgeVariant
									]}"
								>
									{link.badgeText}
								</span>
							</div>
							<p class="text-sm leading-relaxed text-faded">{link.description}</p>
						</div>
					</div>
				</div>

				<div class="mt-auto flex items-center justify-between gap-4">
					<div class="text-xs text-faded">Buka di tab baru</div>
					<Button
						variant="solid"
						size="md"
						rounded
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold"
					>
						{link.ctaText}
					</Button>
				</div>
			</Card>
		{/each}
	</div>

	<div
		aria-hidden="true"
		class="mx-auto mt-12 h-0.5 w-full max-w-6xl rounded-full bg-linear-to-r from-transparent via-primary/35 to-transparent"
	></div>
</PageSection>
