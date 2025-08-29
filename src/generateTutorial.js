import fs from 'fs-extra';
import path from 'path';
import { SYSTEM_PROMPT } from './config.js';
import { buildUserPrompt } from './promptFiles.js';
import { sanitizeContent } from './sanitizeContent.js';

export async function generateTutorial(ollama, {
	model,
	systemPrompt,
	template,
	filePath,
	topic,
	outputDir,
	buildPrompt,
	spinner,
	temperature = 0.7
}) {
	const prompt = buildPrompt(topic, template);
	spinner.start(`Start generation tutorial "${topic}"`);
	const userMsg = buildUserPrompt(topic, template);
	const messages = [
		{ role: 'system', content: SYSTEM_PROMPT },
		{ role: 'user', content: userMsg }
	];
	const response = await ollama.chat({
		model,
		messages,
		temperature
	});
	spinner.succeed(`End generation tutorial "${topic}"`);
	const base = path.posix.basename(filePath);
	const outputFilePath = path.join(outputDir, `${filePath}/${base}.md`);
	await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
	const cleaned = sanitizeContent(response.message.content);
	await fs.writeFile(outputFilePath, cleaned, 'utf-8');
}
