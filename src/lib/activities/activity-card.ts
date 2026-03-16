export type ActivityCardItem = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	publishedAt: string | null;
	coverImageUrl: string | null;
	tags: { id: string; name: string }[];
};

type PostListItemLike = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	publishedAt: string | null;
	coverImage?: { url?: string | null } | null;
	tags?: { id: string; name: string }[] | null;
};

export function toActivityCardItem(post: PostListItemLike): ActivityCardItem {
	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		excerpt: post.excerpt,
		publishedAt: post.publishedAt,
		coverImageUrl: post.coverImage?.url ?? null,
		tags: (post.tags ?? []).map((tag) => ({ id: tag.id, name: tag.name }))
	};
}
