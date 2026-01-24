<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import PageSectionHeader from '$lib/components/PageSectionHeader.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Mail, Linkedin, Github, Globe, Instagram, Twitter, Cloud } from '@lucide/svelte';
	import johnImg from '$lib/assets/ceo_john.png';
	import sarahImg from '$lib/assets/cto_sarah.avif';
	import michaelImg from '$lib/assets/coo_michael.png';
	import emilyImg from '$lib/assets/cfo_emily.png';
	import daffaImg from '$lib/assets/dev_daffa.png';
	import lisaImg from '$lib/assets/chro_lisa.png';
	import charlieImg from '$lib/assets/hor_charlie.avif';
	import davidImg from '$lib/assets/cmo_david.jpeg';

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
			name: 'Michael Chen',
			role: 'Chief Operations Officer',
			image: michaelImg,
			links: [
				{ icon: Mail, href: 'mailto:michael@example.com' },
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
			name: 'Daffa Ilhami',
			role: 'Fullstack & Lead Developer',
			image: daffaImg,
			links: [
				{ icon: Globe, href: 'https://mdaffailhami.my.id' },
				{ icon: Linkedin, href: 'https://linkedin.com/in/mdaffailhami' },
				{ icon: Github, href: 'https://github.com/mdaffailhami' },
				{ icon: Mail, href: 'mailto:mdaffailhami@gmail.com' }
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
			name: 'Lisa Thompson',
			role: 'Chief Human Resources Officer',
			image: lisaImg,
			links: [
				{ icon: Mail, href: 'mailto:lisa@example.com' },
				{ icon: Instagram, href: '#' },
				{ icon: Twitter, href: '#' }
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
		}
	];
</script>

<PageSection id="contributors">
	<PageSectionHeader
		title="Siapa Kami?"
		subtitle="Kenali tim profesional berpengalaman di balik organisasi kami"
	/>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each contributors as member (member.name)}
			<Card
				direction="tl"
				class="group flex cursor-pointer flex-col overflow-hidden bg-surface p-0 transition-all"
			>
				<div class="aspect-square w-full overflow-hidden">
					<img
						src={member.image}
						alt={member.name}
						class="size-full object-cover transition-transform hover:scale-105"
					/>
				</div>
				<div class="flex flex-col p-6 text-left">
					<h3
						class="text-xl font-semibold text-foreground underline-offset-2 group-hover:underline"
					>
						{member.name}
					</h3>
					<p class="mb-4 text-sm font-medium text-primary">{member.role}</p>

					<div class="mt-auto flex gap-3">
						{#each member.links as link (link.icon)}
							<Button variant="soft" size="icon-sm" href={link.href} target="_blank">
								<link.icon size={18} />
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
