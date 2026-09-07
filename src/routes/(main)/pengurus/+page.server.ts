import { env } from '$env/dynamic/public';

type SiteProfile = {
	members: Array<{ name: string; role: string; imageUrl: string }>;
};

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => {
	try {
		const response = await fetch(`${env.PUBLIC_CS_API_URL}/site-profile`);
		if (!response.ok) return { members: null };
		const profile = (await response.json()) as SiteProfile | null;
		return { members: profile?.members ?? null };
	} catch {
		return { members: null };
	}
};
