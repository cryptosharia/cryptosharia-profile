import type { RequestEvent } from '@sveltejs/kit';

import { createServerCsApiClient } from '$lib/api/cs-api.server';
import { toActivityCardItem, sortByFeaturedAndDate } from '$lib/activities/activity-card';

const LIMIT = 12;

export const load = async ({ fetch, url }: RequestEvent) => {
	const pageParam = url.searchParams.get('page');
	const page = Math.max(1, Number(pageParam ?? '1') || 1);

	const client = createServerCsApiClient(fetch);
	const { data, error } = await client.GET('/posts', {
		params: {
			query: {
				statuses: ['published'],
				sections: ['activity'],
				limit: LIMIT,
				page
			}
		}
	});

	const items = error ? [] : (data?.data?.items ?? []).map(toActivityCardItem);
	const sortedItems = sortByFeaturedAndDate(items);

	return {
		items: sortedItems,
		pagination: error
			? { total: 0, page, limit: LIMIT, totalPages: 1 }
			: (data?.data?.pagination ?? { total: 0, page, limit: LIMIT, totalPages: 1 })
	};
};
