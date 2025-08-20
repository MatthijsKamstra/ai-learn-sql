export function sanitizeContent(raw) {
	let content = raw.trim();
	if (/^```md\s*$/i.test(content.split('\n')[0])) {
		content = content.split('\n').slice(1).join('\n');
	}
	const lines = content.split('\n');
	if (/^```\s*$/.test(lines[lines.length - 1])) {
		content = lines.slice(0, -1).join('\n');
	}
	return content.trim();
}
