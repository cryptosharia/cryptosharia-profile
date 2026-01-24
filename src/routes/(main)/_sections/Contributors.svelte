<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { cn } from '$lib/utils';
	import { Mail, Linkedin, Github, Globe, Instagram, Twitter, Cloud } from '@lucide/svelte';
	import johnImg from '$lib/assets/ceo_john.png';
	import sarahImg from '$lib/assets/cto_sarah.avif';
	import michaelImg from '$lib/assets/coo_michael.png';
	import emilyImg from '$lib/assets/cfo_emily.png';
	import daffaImg from '$lib/assets/dev_daffa.png';
	import lisaImg from '$lib/assets/chro_lisa.png';
	import charlieImg from '$lib/assets/hor_charlie.avif';
	import davidImg from '$lib/assets/cmo_david.jpeg';
	import robertImg from '$lib/assets/vpp_robert.avif';
	import aminahImg from '$lib/assets/cso_aminah.png';

	const contributors = [
		{
			name: 'John Anderson',
			role: 'Chief Executive Officer',
			image: johnImg,
			links: [
				{ icon: Mail, href: 'mailto:john@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Twitter, href: '#' }
			]
		},
		{
			name: 'Sarah Williams',
			role: 'Chief Technology Officer',
			image: sarahImg,
			links: [
				{ icon: Mail, href: 'mailto:sarah@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Github, href: '#' }
			]
		},
		{
			name: 'David White',
			role: 'Chief Marketing Officer',
			image: davidImg,
			links: [
				{ icon: Mail, href: 'mailto:david@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Instagram, href: '#' }
			]
		},
		{
			name: 'Emily Johnson',
			role: 'Chief Financial Officer',
			image: emilyImg,
			links: [
				{ icon: Mail, href: 'mailto:emily@example.com' },
				{ icon: Cloud, href: '#' } // Cloud used as a representation for BlueSky
			]
		},
		{
			name: 'Michael Chen',
			role: 'Chief Operations Officer',
			image: michaelImg,
			links: [
				{ icon: Mail, href: 'mailto:michael@example.com' },
				{ icon: Instagram, href: '#' }
			]
		},
		{
			name: 'Aminah Al-Farsi',
			role: 'Chief Shariah Officer',
			image: aminahImg,
			links: [
				{ icon: Mail, href: 'mailto:aminah@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Globe, href: '#' }
			]
		},
		{
			name: 'Charlie Brown',
			role: 'Head of Research',
			image: charlieImg,
			links: [
				{ icon: Mail, href: 'mailto:charlie@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Globe, href: '#' }
			]
		},
		{
			name: 'Daffa Ilhami',
			role: 'Fullstack Lead Developer',
			image: daffaImg,
			links: [
				{ icon: Globe, href: 'https://mdaffailhami.my.id' },
				{ icon: Linkedin, href: 'https://linkedin.com/in/mdaffailhami' },
				{ icon: Github, href: 'https://github.com/mdaffailhami' },
				{ icon: Mail, href: 'mailto:mdaffailhami@gmail.com' }
			]
		},
		{
			name: 'Robert Tanaka',
			role: 'VP of Product',
			image: robertImg,
			links: [
				{ icon: Mail, href: 'mailto:robert@example.com' },
				{ icon: Linkedin, href: '#' },
				{ icon: Github, href: '#' }
			]
		},
		{
			name: 'Lisa Thompson',
			role: 'Chief Human Resources Officer',
			image: lisaImg,
			links: [
				{ icon: Mail, href: 'mailto:lisa@example.com' },
				{ icon: Instagram, href: '#' },
				{ icon: Twitter, href: '#' }
			]
		}
	];
</script>

<PageSection
	id="contributors"
	title="Siapa Kami?"
	subtitle="Kenali tim profesional berpengalaman di balik organisasi kami"
>
	<div class="grid grid-cols-2 fl-gap-3/6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each contributors as member, i (member.name)}
			<Card
				direction="tl"
				class={cn(
					'group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface p-0 transition-all',
					// xs (Mobile): Shows 10 contributors (2 columns).
					// sm (Tablet): Shows 9 contributors (3 columns) — Hides the 10th item.
					// lg (Laptop): Shows 8 contributors (4 columns) — Hides the 9th and 10th items.
					// xl (Desktop): Shows 10 contributors (5 columns) — Shows everything.
					i === 8 && 'lg:max-xl:hidden',
					i === 9 && 'sm:max-xl:hidden'
				)}
			>
				<div class="aspect-square w-full overflow-hidden">
					<img
						src={member.image}
						alt={member.name}
						class="size-full object-cover transition-transform hover:scale-105"
					/>
				</div>
				<div class="p-3">
					<h3
						class="line-clamp-1 fl-text-base/lg font-semibold text-foreground underline-offset-2 group-hover:underline"
					>
						{member.name}
					</h3>
					<p class="mb-3 line-clamp-1 text-xs font-medium text-primary sm:text-sm">{member.role}</p>

					<div class="flex gap-2">
						{#each member.links.slice(0, 3) as link (link.icon)}
							<Button variant="ghost" size="icon-sm" href={link.href} target="_blank" rounded>
								<link.icon size={16} />
							</Button>
						{/each}
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<div class="mt-16 flex justify-center">
		<Button variant="outline" rounded href="/contributors" class="px-8 font-semibold">
			Lihat Semua Kontributor
		</Button>
	</div>
</PageSection>
