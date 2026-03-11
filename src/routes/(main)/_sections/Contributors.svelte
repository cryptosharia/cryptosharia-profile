<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import { cn } from '$lib/utils';
	import {
		Mail,
		Linkedin,
		Github,
		Globe,
		Instagram,
		Twitter,
		Cloud,
		ChevronRightIcon
	} from '@lucide/svelte';
	import johnImg from '$lib/assets/ceo_john.png';
	import sarahImg from '$lib/assets/cto_sarah.avif';
	import michaelImg from '$lib/assets/coo_michael.png';
	import emilyImg from '$lib/assets/cfo_emily.png';
	import marcusImg from '$lib/assets/dev_marcus.png';
	import lisaImg from '$lib/assets/chro_lisa.png';
	import charlieImg from '$lib/assets/hor_charlie.avif';
	import davidImg from '$lib/assets/cmo_david.jpeg';
	import robertImg from '$lib/assets/vpp_robert.avif';
	import aminahImg from '$lib/assets/cso_aminah.png';

	const contributors = [
		{
			name: 'John Anderson',
			role: 'Chief Executive Officer',
			bio: 'Professional with over 15 years of experience in the technology industry, John leads the organization with a focus on sustainable growth and community empowerment.',
			image: johnImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:john@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Twitter, label: 'Twitter', href: '#' }
			]
		},
		{
			name: 'Sarah Williams',
			role: 'Chief Technology Officer',
			bio: 'A visionary leader in blockchain technology, Sarah ensures that our platforms are built with the highest standards of security and transparency.',
			image: sarahImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:sarah@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Github, label: 'GitHub', href: '#' }
			]
		},
		{
			name: 'David White',
			role: 'Chief Marketing Officer',
			bio: 'With a passion for digital storytelling, David drives our marketing initiatives to reach a global audience and share our mission.',
			image: davidImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:david@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Instagram, label: 'Instagram', href: '#' }
			]
		},
		{
			name: 'Emily Johnson',
			role: 'Chief Financial Officer',
			bio: 'Emily manages our financial strategy with a focus on long-term sustainability and ethical investment practices.',
			image: emilyImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:emily@example.com' },
				{ icon: Cloud, label: 'BlueSky', href: '#' } // Cloud used as a representation for BlueSky
			]
		},
		{
			name: 'Michael Chen',
			role: 'Chief Operations Officer',
			bio: 'Michael oversees our day-to-day operations, ensuring that all our programs and initiatives run smoothly and effectively.',
			image: michaelImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:michael@example.com' },
				{ icon: Instagram, label: 'Instagram', href: '#' }
			]
		},
		{
			name: 'Aminah Al-Farsi',
			role: 'Chief Shariah Officer',
			bio: 'As a leading scholar in Islamic Finance, Aminah ensures that all our offerings are strictly compliant with Shariah principles.',
			image: aminahImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:aminah@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Globe, label: 'Website', href: '#' }
			]
		},
		{
			name: 'Charlie Brown',
			role: 'Head of Research',
			bio: 'Charlie leads our research efforts, providing deep insights into the intersection of technology and Shariah compliance.',
			image: charlieImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:charlie@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Globe, label: 'Website', href: '#' }
			]
		},
		{
			name: 'Marcus Chen',
			role: 'Lead Developer',
			bio: 'Building robust and scalable web applications, Marcus is dedicated to creating the best user experience for our community.',
			image: marcusImg,
			links: [
				{ icon: Globe, label: 'Website', href: 'https://mdaffailhami.my.id' },
				{ icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mdaffailhami' },
				{ icon: Github, label: 'GitHub', href: 'https://github.com/mdaffailhami' },
				{ icon: Mail, label: 'Email', href: 'mailto:mdaffailhami@gmail.com' }
			]
		},
		{
			name: 'Robert Tanaka',
			role: 'VP of Product',
			bio: 'Robert focuses on product strategy and innovation, ensuring our solutions meet the evolving needs of our users.',
			image: robertImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:robert@example.com' },
				{ icon: Linkedin, label: 'LinkedIn', href: '#' },
				{ icon: Github, label: 'GitHub', href: '#' }
			]
		},
		{
			name: 'Lisa Thompson',
			role: 'Chief Human Resources Officer',
			bio: 'Lisa is passionate about building a diverse and inclusive workplace where every team member can thrive.',
			image: lisaImg,
			links: [
				{ icon: Mail, label: 'Email', href: 'mailto:lisa@example.com' },
				{ icon: Instagram, label: 'Instagram', href: '#' },
				{ icon: Twitter, label: 'Twitter', href: '#' }
			]
		}
	];

	let selectedContributor = $state<(typeof contributors)[number] | null>(null);
</script>

<PageSection
	id="contributors"
	title="Siapa Kami?"
	subtitle="Kenali tim profesional berpengalaman di balik organisasi kami"
>
	<div class="grid grid-cols-2 fl-gap-3/6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each contributors as member, i (member.name)}
			<Card
				onclick={() => (selectedContributor = member)}
				gradient="tl"
				class={cn(
					'group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all',
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
						class="size-full object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<div class="p-3">
					<h3
						class="line-clamp-1 fl-text-base/lg font-semibold text-foreground underline-offset-2 group-hover:underline"
					>
						{member.name}
					</h3>
					<p class="mb-3 line-clamp-1 text-xs font-medium text-primary sm:text-sm">
						{member.role}
					</p>

					<div class="flex gap-2">
						{#each member.links.slice(0, 3) as link (link.icon)}
							<Button variant="ghost" size="icon-sm" href={link.href} target="_blank" rounded>
								{#snippet prefixIcon({ class: iconClass })}
									<link.icon class={iconClass} />
								{/snippet}
							</Button>
						{/each}
					</div>
				</div>
			</Card>
		{/each}
	</div>

	<!-- Use just a single dialog, no need to create a new one for each contributor -->
	<!-- We simply just update the content of the dialog based on the selected contributor -->
	<Dialog
		open={selectedContributor ? true : false}
		onOpenChangeComplete={(open) => !open && (selectedContributor = null)}
		title="Kontributor"
	>
		{#if selectedContributor}
			<div class="flex flex-col gap-6">
				<div class="border-border aspect-square w-full overflow-hidden rounded-xl border">
					<img
						src={selectedContributor.image}
						alt={selectedContributor.name}
						class="size-full object-cover"
					/>
				</div>

				<div class="space-y-4">
					<div class="space-y-1">
						<h4 class="text-xl font-bold text-foreground">{selectedContributor.name}</h4>
						<p class="text-sm font-semibold text-primary">{selectedContributor.role}</p>
					</div>

					<p class="text-sm leading-relaxed text-faded">
						{selectedContributor.bio}
					</p>

					<div class="pt-2">
						<p class="mb-3 text-xs font-bold tracking-wider text-faded uppercase">Links</p>
						<div class="flex flex-wrap gap-2">
							{#each selectedContributor.links as link (link.icon)}
								<Button variant="soft" size="sm" href={link.href} target="_blank" rounded>
									{#snippet prefixIcon({ class: iconClass }: { class: string })}
										<link.icon class={iconClass} />
									{/snippet}
									{link.label}
								</Button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</Dialog>

	<div class="mt-12 flex justify-center">
		<Button size="lg" variant="outline" rounded href="/contributors">
			{#snippet suffixIcon({ class: iconClass })}
				<ChevronRightIcon class={iconClass} />
			{/snippet}
			Lihat Semua Kontributor
		</Button>
	</div>
</PageSection>
