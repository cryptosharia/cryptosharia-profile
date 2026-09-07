import { fail, type Actions } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { createServerCsApiClient } from '$lib/api/cs-api.server';
import { toActivityCardItem, sortByFeaturedAndDate } from '$lib/activities/activity-card';
import { env } from '$env/dynamic/public';

export type SiteProfile = {
	vision: string;
	mission: string;
	goals: string[];
	members: Array<{ name: string; role: string; imageUrl: string }>;
};

async function loadSiteProfile(fetchFn: typeof fetch): Promise<SiteProfile | null> {
	try {
		const response = await fetchFn(`${env.PUBLIC_CS_API_URL}/site-profile`);
		if (!response.ok) return null;
		const profile = (await response.json()) as SiteProfile | null;
		return profile?.vision && profile.mission ? profile : null;
	} catch {
		return null;
	}
}

export const load = async ({ fetch }: RequestEvent) => {
	const client = createServerCsApiClient(fetch);

	const { data, error } = await client.GET('/posts', {
		params: {
			query: {
				statuses: ['published'],
				sections: ['activity'],
				limit: 4,
				page: 1
			}
		}
	});

	const items = error ? [] : (data?.data?.items ?? []).map(toActivityCardItem);
	const sortedItems = sortByFeaturedAndDate(items);

	return { activities: sortedItems, siteProfile: await loadSiteProfile(fetch) };
};

function readFormString(form: FormData, key: string) {
	const value = form.get(key);
	return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string) {
	// Intentionally simple; upstream validation is source of truth.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const actions: Actions = {
	sendMessage: async ({ request, fetch }) => {
		const form = await request.formData();
		const name = readFormString(form, 'name');
		const email = readFormString(form, 'email');
		const message = readFormString(form, 'message');

		const fields = { name, email, message };

		if (!name) return fail(400, { fields, error: 'Nama wajib diisi.' });
		if (!email) return fail(400, { fields, error: 'Email wajib diisi.' });
		if (!isValidEmail(email)) return fail(400, { fields, error: 'Format email tidak valid.' });
		if (!message) return fail(400, { fields, error: 'Pesan wajib diisi.' });

		const client = createServerCsApiClient(fetch);
		const { error, response } = await client.POST('/messages', {
			body: {
				name,
				email,
				message
			}
		});

		if (error) {
			return fail(response.status, {
				fields,
				error: 'Gagal mengirim pesan. Silakan coba lagi.'
			});
		}

		return { success: true };
	}
};
