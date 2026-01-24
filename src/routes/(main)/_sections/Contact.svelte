<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import PageSectionHeader from '$lib/components/PageSectionHeader.svelte';
	import Field from '$lib/components/ui/Field.svelte';
	import InputField from '$lib/components/ui/InputField.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { MapPin, MessageCircle, Mail, Send } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';

	const contactInfo = [
		{
			title: 'WhatsApp',
			content: '+62 821-8658-4279',
			href: 'https://wa.me/6282186584279',
			icon: MessageCircle
		},
		{
			title: 'Email',
			content: 'cryptoshariaforum@gmail.com',
			href: 'mailto:cryptoshariaforum@gmail.com',
			icon: Mail
		},
		{
			title: 'Alamat',
			content: '123 Business Street, Suite 100\nJakarta, Indonesia 12345',
			href: 'https://maps.google.com',
			icon: MapPin
		}
	];
</script>

<PageSection id="contact">
	<PageSectionHeader
		title="Hubungi Kami"
		subtitle="Punya pertanyaan? Kami siap membantu Anda. Kirim pesan dan kami akan merespons secepat mungkin."
		class="mb-20"
	/>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<!-- Left: Contact info -->
		<div class="space-y-10">
			<div class="max-lg:hidden">
				<h3 class="fl-text-xl/2xl font-bold text-foreground">Kontak Informasi</h3>
				<p class="mt-4 text-faded">
					Apapun pertanyaan Anda tentang fitur, layanan, atau hal lainnya, tim kami siap menjawab
					semua pertanyaan Anda.
				</p>
			</div>

			<div class="flex flex-wrap justify-between gap-6 lg:flex-col">
				{#each contactInfo as info (info.title)}
					<div class="flex items-start gap-4">
						<Button variant="soft" size="icon-md" href={info.href} target="_blank">
							<info.icon size={24} />
						</Button>
						<div>
							<h4 class="text-lg font-semibold text-foreground">{info.title}</h4>
							<Button
								variant="blank"
								size="text"
								href={info.href}
								target="_blank"
								class="mt-0.5 whitespace-pre-line text-faded hover:text-primary"
							>
								{info.content}
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right: Contact Form -->
		<Card>
			<form onsubmit={(e) => e.preventDefault()} class="space-y-6">
				<Field label="Nama Lengkap" forId="name">
					<InputField id="name" placeholder="Nama Anda" />
				</Field>

				<Field label="Alamat Email" forId="email">
					<InputField id="email" type="email" placeholder="email@contoh.com" />
				</Field>

				<Field label="Pesan" forId="message">
					<InputField id="message" multiline placeholder="Tulis pesan Anda di sini..." />
				</Field>

				<Button variant="solid" type="submit" class="w-full" prefixIcon={Send}>Kirim Pesan</Button>
			</form>
		</Card>
	</div>
</PageSection>
