<script lang="ts">
	import ProductSection from '$lib/components/ProductSection.svelte';
	import {
		Newspaper,
		TrendingUp,
		BookOpen,
		ShieldCheck,
		Users,
		MessageSquare,
		Zap,
		BarChart3
	} from '@lucide/svelte';
	import cryptoShariaMediaImg from '$lib/assets/discord-premium.webp';
	import discordPremiumImg from '$lib/assets/discord-premium.webp';

	const mediaFeatures = [
		{
			icon: Newspaper,
			title: 'Berita Terkini',
			description: 'Update berita crypto dan blockchain terbaru dari perspektif syariah'
		},
		{
			icon: TrendingUp,
			title: 'Analisis Pasar',
			description: 'Analisis mendalam tentang tren dan pergerakan pasar cryptocurrency'
		},
		{
			icon: BookOpen,
			title: 'Artikel Edukasi',
			description: 'Panduan dan tutorial lengkap tentang crypto syariah untuk semua level'
		},
		{
			icon: ShieldCheck,
			title: 'Token Screening',
			description: 'Analisis fundamental token crypto apakah sesuai syariah atau tidak'
		}
	];

	const mediaBenefits = [
		'Artikel dan berita terupdate setiap hari',
		'Konten edukasi dari para ahli syariah',
		'Token Screening sesuai syariah',
		'Gratis dan dapat diakses kapan saja'
	];

	const discordFeatures = [
		{
			icon: Users,
			title: 'Komunitas Elite',
			description: 'Bergabung dengan grup trader dan investor yang memiliki visi yang sama'
		},
		{
			icon: MessageSquare,
			title: 'Diskusi Interaktif',
			description: 'Tanya jawab langsung dengan analis kami mengenai tren pasar terbaru'
		},
		{
			icon: Zap,
			title: 'Sinyal Cepat',
			description: 'Dapatkan update peluang investasi syariah secara real-time'
		},
		{
			icon: BarChart3,
			title: 'Riset Mendalam',
			description: 'Akses laporan riset eksklusif yang tidak tersedia untuk publik'
		}
	];

	const discordBenefits = [
		'Akses ke channel eksklusif',
		'Dukungan prioritas dari tim kami',
		'Akses awal ke fitur baru',
		'Role dan badge khusus',
		'Pengalaman bebas iklan',
		'Event spesial dan giveaway',
		'Komunikasi langsung dengan pimpinan',
		'Sumber daya dan tools premium'
	];
</script>

<!-- Ecosystem / Product Stack -->
<section
	class="relative my-16 overflow-hidden rounded-[3rem] border-y border-primary/5 bg-primary/5 py-16 shadow-inner dark:bg-primary/10"
>
	<!-- Decorative Background Element -->
	<div
		class="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 opacity-30 grayscale select-none"
		style="background-image: radial-gradient(var(--color-primary) 1px, transparent 0); background-size: 40px 40px;"
	></div>

	<div class="text-center">
		<span
			class="rounded-full border border-primary/10 bg-primary/10 px-6 py-3 text-xs font-black text-primary/60"
			>E K O S I S T E M</span
		>
	</div>

	<ProductSection
		id="media"
		title="CryptoSharia"
		titleHighlight="Media"
		subtitle="Platform berita dan edukasi cryptocurrency syariah terlengkap di Indonesia"
		features={mediaFeatures}
		posterSrc={cryptoShariaMediaImg}
		benefitsTitle="Akses Informasi <span class=&quot;text-primary italic&quot;>Crypto Syariah</span> Terpercaya"
		benefitsDescription="CryptoSharia Media menyediakan berita, analisis, dan edukasi tentang cryptocurrency dari perspektif syariah. Dapatkan insight terkini tentang perkembangan crypto halal dan blockchain technology."
		benefits={mediaBenefits}
		ctaText="KUNJUNGI WEBSITE"
		ctaHref="https://media.cryptosharia.id"
		ctaIcon={TrendingUp}
		reverse={true}
	/>

	<ProductSection
		id="discord"
		title="Discord"
		titleHighlight="Premium"
		subtitle="Bergabunglah dengan komunitas Discord eksklusif kami, lalu dapatkan benefitnya"
		features={discordFeatures}
		posterSrc={discordPremiumImg}
		benefitsTitle="Benefit <span class=&quot;text-primary italic&quot;>Komunitas Premium</span> Kami"
		benefitsDescription="Nikmati pengalaman yang lebih baik dengan dukungan prioritas, konten eksklusif, dan kesempatan untuk terhubung langsung with tim kami."
		benefits={discordBenefits}
		ctaText="GABUNG DISCORD PREMIUM"
		ctaHref="https://discord.gg/cryptosharia"
		ctaIcon={Zap}
	/>
</section>
