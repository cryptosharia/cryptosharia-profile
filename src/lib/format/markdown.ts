import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export function parseMarkdown(content: string | null | undefined): string {
	if (!content) return '';
	const html = marked.parse(content, { async: false });
	const sanitized = DOMPurify.sanitize(typeof html === 'string' ? html : '');
	return sanitized;
}
