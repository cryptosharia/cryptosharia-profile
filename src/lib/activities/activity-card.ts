export type ActivityCardItem = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	publishedAt: string | null;
	coverImageUrl: string | null;
	tags: { id: string; name: string }[];
	isFeatured: boolean;
};

type PostListItemLike = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	publishedAt: string | null;
	coverImage?: { url?: string | null } | null;
	tags?: { id: string; name: string }[] | null;
	isFeatured?: boolean;
};

export function toActivityCardItem(post: PostListItemLike): ActivityCardItem {
	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		publishedAt: post.publishedAt,
		coverImageUrl: post.coverImage?.url ?? null,
		tags: (post.tags ?? []).map((tag) => ({ id: tag.id, name: tag.name })),
		isFeatured: post.isFeatured ?? false
	};
}

export function sortByFeaturedAndDate(items: ActivityCardItem[]): ActivityCardItem[] {
	return [...items].sort((a, b) => {
		if (a.isFeatured !== b.isFeatured) {
			return a.isFeatured ? -1 : 1;
		}
		const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
		const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
		return dateB - dateA;
	});
}
