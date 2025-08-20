import fs from 'fs-extra';
import path from 'path';

export async function generateSidebar(chapterList, outputDir) {
	const header = "<!-- docs/_sidebar.md -->\n\n- [Home](/)";
	const body = chapterList
		.map(([filePath, topic]) => `- [${topic}](${filePath}.md)`)
		.join('\n');
	const generatedAt = new Date().toISOString();
	const footer = `\n\n<!-- Generated at ${generatedAt} -->`;
	const sidebar = `${header}\n${body}\n${footer}`.trim();
	const outPath = path.join(outputDir, `_sidebar.md`);
	await fs.writeFile(outPath, sidebar, 'utf-8');
}
