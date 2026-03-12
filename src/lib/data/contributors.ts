import { Mail, Linkedin, Github, Globe, Instagram, Twitter, Cloud } from '@lucide/svelte';

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

export const contributors = [
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
			// Cloud used as a representation for BlueSky
			{ icon: Cloud, label: 'BlueSky', href: '#' }
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
		name: 'Daniel Kim',
		role: 'Lead Developer',
		bio: 'Daniel builds robust and scalable web applications, with a focus on accessibility, performance, and a thoughtful user experience.',
		image: marcusImg,
		links: [
			{ icon: Mail, label: 'Email', href: 'mailto:daniel@example.com' },
			{ icon: Linkedin, label: 'LinkedIn', href: '#' },
			{ icon: Github, label: 'GitHub', href: '#' }
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
] as const;

export type Contributor = (typeof contributors)[number];
