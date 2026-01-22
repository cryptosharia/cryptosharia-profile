<script lang="ts">
	import footerBg from '$lib/assets/footer-bg.png';
	import logo1 from '$lib/assets/logo1.png';
	import { instagramIcon, tiktokIcon, xIcon, facebookIcon, youtubeIcon } from '$lib/assets/icons';
	import GradientDivider from '$lib/components/layout/GradientDivider.svelte';
	import Title from '$lib/components/layout/Title.svelte';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogFooter,
		DialogClose
	} from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Field, FieldLabel, FieldDescription, FieldError } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import PageSection from '$lib/components/layout/PageSection.svelte';
	import { DarkOverlay } from '$lib/components/ui/dark-overlay';
	import { Textarea } from '$lib/components/ui/textarea';

	type Socmed = {
		name: string;
		Icon: string;
		url: URL;
	};

	const socmeds: Socmed[] = [
		{
			name: 'Instagram',
			Icon: instagramIcon,
			url: new URL('https://www.instagram.com/cryptosharia')
		},
		{
			name: 'TikTok',
			Icon: tiktokIcon,
			url: new URL('https://tiktok.com/@cryptosharia')
		},
		{
			name: 'YouTube',
			Icon: youtubeIcon,
			url: new URL('https://youtube.com/@cryptosharia')
		},
		{
			name: 'X',
			Icon: xIcon,
			url: new URL('https://x.com/cryptosharia_')
		},
		{
			name: 'Facebook',
			Icon: facebookIcon,
			url: new URL('https://facebook.com/cryptosharia')
		}
	];
</script>

<div>
	<GradientDivider />
	<div class="bg-cover bg-fixed bg-center" style="background-image: url({footerBg})">
		<DarkOverlay>
			<PageSection id="footer" class="space-y-10 py-10">
				<!-- Socials -->
				<section id="socials">
					<Title class="text-white">Media Sosial</Title>
					<ul class="flex items-center justify-around">
						{#each socmeds as socmed (socmed.name)}
							<li>
								<a href={String(socmed.url)}>
									<img
										src={socmed.Icon}
										alt={socmed.name}
										class="max-w-12 transition-transform hover:scale-110"
									/>
								</a>
							</li>
						{/each}
					</ul>
				</section>

				<!-- Contact -->
				<section id="contact">
					<Title class="text-white">Kontak Kami</Title>
					<form method="POST" class="space-y-4">
						<Field>
							<FieldLabel class="text-white">Nama</FieldLabel>
							<Input name="name" type="text" placeholder="Masukkan nama anda" class="bg-white!" />
						</Field>
						<Field>
							<FieldLabel class="text-white">Email</FieldLabel>
							<Input
								name="email"
								type="email"
								placeholder="Masukkan alamat email anda"
								class="bg-white!"
							/>
						</Field>
						<Field>
							<FieldLabel class="text-white">Pesan</FieldLabel>
							<Textarea
								name="message"
								placeholder="Masukkan pesan anda"
								class="h-25 resize-none bg-white!"
							/>
						</Field>
						<Button type="submit" size="lg" class="w-full border-2 border-white"
							>✉️ Kirim Email</Button
						>
						<Button type="submit" size="lg" class="w-full border-2 border-white"
							>💬 Chat WhatsApp</Button
						>
					</form>
				</section>

				<!-- Support -->
				<section id="support">
					<Title class="text-white"
						>Support <span class="text-primary italic">CryptoSharia</span></Title
					>
					<div class="space-y-3">
						<blockquote
							class="rounded-md bg-white px-2 py-2.5 text-center text-black outline-2 outline-primary outline-dashed"
						>
							Satu donasi kecil hari ini, bisa menjadi investasi besar di akhirat. Mari dukung
							gerakan edukasi CryptoSharia, agar ilmu dan pahala terus mengalir tanpa henti.
						</blockquote>
						<Button size="lg" class="w-full rounded-md border-2 border-white bg-primary text-white"
							>💸 Support</Button
						>
					</div>
				</section>
			</PageSection>
		</DarkOverlay>
	</div>
</div>
