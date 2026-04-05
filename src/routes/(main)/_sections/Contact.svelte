<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import Field from '$lib/components/ui/Field.svelte';
	import InputField from '$lib/components/ui/InputField.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { MapPin, MessageCircle, Mail, Send } from '@lucide/svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const contactInfo = [
		{
			title: 'WhatsApp',
			content: '+62 821-8658-4279',
			href: 'https://wa.me/6282186584279',
			icon: MessageCircle
		},
		{
			title: 'Email',
			content: 'contact@cryptosharia.id',
			href: 'mailto:contact@cryptosharia.id',
			icon: Mail
		},
		{
			title: 'Alamat',
			content:
				'Crypto Sharia Headquarters Ruko Tengah, Jl. Wibawa Mukti II No. 6, RT.007/RW.002,\nJatiluhur, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17425',
			href: 'https://maps.google.com/?q=Jl.+Wibawa+Mukti+II+No.+6,+Jatiluhur,+Jatiasih,+Kota+Bekasi',
			icon: MapPin
		}
	];

	const formState = $derived(
		page.form as { success?: boolean; error?: string; fields?: Record<string, string> } | null
	);

	let isSubmitting = $state(false);

	const enhanceSendMessage: SubmitFunction = ({ formElement }) => {
		isSubmitting = true;

		return async ({ result, update }) => {
			await update();
			isSubmitting = false;

			if (result.type === 'success' && (result.data as { success?: boolean } | null)?.success) {
				formElement.reset();
			}
		};
	};
</script>

<PageSection
	id="kontak"
	title="Hubungi Kami"
	subtitle="Punya pertanyaan mengenai fitur, layanan, atau kolaborasi? Tim kami siap memberikan informasi yang Anda butuhkan dengan cepat dan transparan."
	headerClass="mb-20"
>
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
		<Card class="fl-p-5/8">
			<form
				method="POST"
				action="?/sendMessage#kontak"
				class="space-y-5"
				aria-busy={isSubmitting}
				use:enhance={enhanceSendMessage}
			>
				<Field label="Nama" forId="name">
					<InputField
						id="name"
						name="name"
						required
						disabled={isSubmitting}
						autocomplete="name"
						placeholder="Masukkan nama anda"
						value={formState?.fields?.name ?? ''}
					/>
				</Field>

				<Field label="Alamat Email" forId="email">
					<InputField
						id="email"
						name="email"
						type="email"
						required
						disabled={isSubmitting}
						autocomplete="email"
						placeholder="Masukkan alamat email anda"
						value={formState?.fields?.email ?? ''}
					/>
				</Field>

				<Field label="Pesan" forId="message">
					<InputField
						id="message"
						name="message"
						multiline
						required
						disabled={isSubmitting}
						placeholder="Tulis pesan anda di sini..."
						value={formState?.fields?.message ?? ''}
					/>
				</Field>

				<Button size="md-lg" variant="solid" type="submit" class="w-full" disabled={isSubmitting}>
					{#snippet prefixIcon({ class: iconClass })}
						<Send class={iconClass} />
					{/snippet}
					{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
				</Button>

				{#if formState?.success}
					<div
						class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
					>
						Pesan berhasil dikirim. Terima kasih!
					</div>
				{:else if formState?.error}
					<div
						class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
					>
						{formState.error}
					</div>
				{/if}
			</form>
		</Card>
	</div>
</PageSection>
