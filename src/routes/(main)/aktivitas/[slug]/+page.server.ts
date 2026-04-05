import { error as kitError } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { createServerCsApiClient } from '$lib/api/cs-api.server';
import { toActivityCardItem, sortByFeaturedAndDate } from '$lib/activities/activity-card';

export const load = async ({ fetch, params }: RequestEvent) => {
	const slug = params.slug;
	if (!slug) throw kitError(404, 'Aktivitas tidak ditemukan.');

	const client = createServerCsApiClient(fetch);
	const { data, error, response } = await client.GET('/posts/{id}', {
		params: {
			path: {
				id: slug
			}
		}
	});

	if (error || !data?.data) {
		if (response.status === 404) throw kitError(404, 'Aktivitas tidak ditemukan.');
		throw kitError(500, 'Gagal memuat aktivitas.');
	}

	const { data: listData } = await client.GET('/posts', {
		params: {
			query: {
				statuses: ['published'],
				sections: ['activity'],
				exclude: [slug],
				limit: 6,
				page: 1
			}
		}
	});

	const otherItems = (listData?.data?.items ?? []).map(toActivityCardItem);
	const sortedOtherItems = sortByFeaturedAndDate(otherItems);

	return {
		post: data.data,
		otherActivities: sortedOtherItems
	};
};
