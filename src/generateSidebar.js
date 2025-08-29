import fs from 'fs-extra';
import path from 'path';

/**
 * Converteer een hoofdstuk/map naam zoals '01_intro' naar 'Intro'
 */
function prettifyChapter(slug) {
	return slug
		.replace(/^\d+[_-]?/, '')           // verwijder voorloopnummer + scheiding
		.split(/[_-]+/)                     // splits op _ of -
		.map(w => w ? w[0].toUpperCase() + w.slice(1) : w)
		.join(' ')
		.trim();
}

export async function generateSidebar(chapterList, outputDir) {
	const header = "<!-- docs/_sidebar.md -->\n\n- [Home](/)";

	// Map: chapterSlug -> [{ topic, filePath, base }]
	const chapters = new Map();

	for (const [filePath, topic] of chapterList) {
		const parts = filePath.split('/');
		const chapterSlug = parts[0];
		const base = path.posix.basename(filePath);

		if (!chapters.has(chapterSlug)) chapters.set(chapterSlug, []);
		chapters.get(chapterSlug).push({ topic, filePath, base });
	}

	const lines = [header];

	for (const [chapterSlug, lessons] of chapters.entries()) {
		const chapterTitle = prettifyChapter(chapterSlug);

		// Hoofdstuk header (geen link)
		lines.push(`- ${chapterTitle}`);

		// Les links
		for (const { topic, filePath, base } of lessons) {
			lines.push(`  - [${topic}](${filePath}/${base}.md)`);
		}
	}

	const generatedAt = new Date().toISOString();
	lines.push(`\n<!-- Generated at ${generatedAt} -->`);

	const sidebar = lines.join('\n');
	const outPath = path.join(outputDir, `_sidebar.md`);
	await fs.writeFile(outPath, sidebar, 'utf-8');
}
