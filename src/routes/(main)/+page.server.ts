import { fail, type Actions } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { createServerCsApiClient } from '$lib/api/cs-api.server';
import { toActivityCardItem } from '$lib/activities/activity-card';

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

	return {
		activities: error ? [] : (data?.data?.items ?? []).map(toActivityCardItem)
	};
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
