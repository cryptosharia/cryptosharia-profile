<script>
	import { ExternalLinkIcon } from '@lucide/svelte';
	import PageSection from '$lib/components/PageSection.svelte';
	import logo2 from '$lib/assets/logo2.png';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<PageSection class="bg-linear-to-br from-orange-50 to-white py-15">
	<div class="grid grid-cols-1 items-center fl-gap-6/12 md:grid-cols-2">
		<div class="md:order-2">
			<img alt="CryptoSharia Logo" src={logo2} class="mx-auto fl-w-60/80" />
		</div>
		<div class="space-y-6 md:order-1">
			<div class="space-y-4">
				<h1 class="font-serif fl-text-4xl/5xl font-bold text-primary">CryptoSharia</h1>
				<p class="fl-text-base/lg leading-relaxed max-md:text-justify">
					<b>CryptoSharia</b> adalah organisasi yang berdedikasi untuk menggabungkan teknologi blockchain
					dan cryptocurrency dengan prinsip-prinsip syariah Islam. Kami berkomitmen untuk memberikan solusi
					crypto yang halal dan sesuai dengan nilai-nilai Islam.
				</p>
				<p class="fl-text-base/lg leading-relaxed max-md:text-justify">
					Dengan fokus pada edukasi, inovasi, dan kepatuhan syariah, kami membantu komunitas Muslim
					memahami dan memanfaatkan teknologi crypto secara bertanggung jawab.
				</p>
			</div>
			<div class="flex gap-4">
				<Button
					size="medium"
					suffixIcon={ExternalLinkIcon}
					href="https://media.cryptosharia.id"
					target="_blank"
				>
					Kunjungi Media Kami
				</Button>
				<Button size="medium" variant="secondary" href="/#contact">Hubungi Kami</Button>
			</div>
		</div>
	</div>
</PageSection>
