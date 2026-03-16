const DATE_ONLY_FORMATTER = new Intl.DateTimeFormat('id-ID', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
	timeZone: 'Asia/Jakarta'
});

const WIB_DATE_TIME_FORMATTER = new Intl.DateTimeFormat('id-ID', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
	timeZone: 'Asia/Jakarta'
});

export function formatDateOnly(iso: string | null | undefined) {
	if (!iso) return '';
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	return DATE_ONLY_FORMATTER.format(date);
}

export function formatWibDateTime(iso: string | null | undefined) {
	if (!iso) return '';
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	return `${WIB_DATE_TIME_FORMATTER.format(date)} WIB`;
}

export function isSafeExternalHttpUrl(value: string | null | undefined) {
	if (!value) return false;
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}

export function getUrlHost(value: string | null | undefined) {
	if (!value) return '';
	try {
		return new URL(value).host;
	} catch {
		return '';
	}
}
