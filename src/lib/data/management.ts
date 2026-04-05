import devinImg from '$lib/assets/board-devin-halim-wijaya.png';
import laksamanaImg from '$lib/assets/board-muhammad-laksamana-lelawangsa.png';
import aliHasanImg from '$lib/assets/board-ali-hasan-bawazier.png';
import deaSakaImg from '$lib/assets/board-dea-saka-kurnia-putra.png';
import ayubImg from '$lib/assets/ceo-sholahuddin-al-ayyubi.png';
import ghalibImg from '$lib/assets/coo-ghalib-ammar-ahsan.png';
import haidarImg from '$lib/assets/cfo-habibullah-haidar-al-atsary.png';
import fikriImg from '$lib/assets/csbo-muhammad-fikri-alfarizi.png';
import bintangImg from '$lib/assets/cao-bintang-fajar-ramadhan.png';
import rifatulImg from '$lib/assets/cmo-rifatul-widaad-khotibin-tamhid.png';
import axellyoImg from '$lib/assets/cco-mokhamad-axellyo-ghani-adam.png';

export const managementMembers = [
	{
		name: 'Ust. Devin Halim Wijaya',
		role: 'Board of Commissioners',
		image: devinImg
	},
	{
		name: 'Ust. Muhammad Laksamana Lelawangsa',
		role: 'Board of Commissioners',
		image: laksamanaImg
	},
	{
		name: 'Ust. Ali Hasan Bawazier',
		role: 'Board of Commissioners',
		image: aliHasanImg
	},
	{
		name: 'Dea Saka Kurnia Putra',
		role: 'Board of Commissioners',
		image: deaSakaImg
	},
	{
		name: 'Sholahuddin Al Ayyubi',
		role: 'Chief Executive Officer',
		image: ayubImg
	},
	{
		name: 'Ghalib Ammar Ahsan',
		role: 'Chief Operating Officer',
		image: ghalibImg
	},
	{
		name: 'Habibullah Haidar Al Atsary',
		role: 'Chief Financial Officer',
		image: haidarImg
	},
	{
		name: 'Muhammad Fikri Alfarizi',
		role: 'Chief Syariah Business Officer',
		image: fikriImg
	},
	{
		name: 'Bintang Fajar Ramadhan',
		role: 'Chief Analytics Officer',
		image: bintangImg
	},
	{
		name: "Rif'atul Widaad Khotibin Tamhid",
		role: 'Chief Marketing Officer',
		image: rifatulImg
	},
	{
		name: 'Mokhamad Axellyo Ghani Adam',
		role: 'Chief Communication Officer',
		image: axellyoImg
	}
] as const;

export type ManagementMember = (typeof managementMembers)[number];
