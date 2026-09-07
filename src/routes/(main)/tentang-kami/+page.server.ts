import { env } from '$env/dynamic/public';

export type SiteProfile = {
	vision: string;
	mission: string;
	goals: string[];
	members: Array<{ name: string; role: string; imageUrl: string }>;
};

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => {
	try {
		const response = await fetch(`${env.PUBLIC_CS_API_URL}/site-profile`);
		if (!response.ok) return { profile: null };
		const profile = (await response.json()) as SiteProfile | null;
		return { profile: profile?.vision && profile.mission ? profile : null };
	} catch {
		return { profile: null };
	}
};
