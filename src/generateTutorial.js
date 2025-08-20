import fs from 'fs-extra';
import path from 'path';
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
	spinner.start(`Start "${topic}"`);
	const response = await ollama.chat({
		model,
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: prompt }
		],
		temperature
	});
	spinner.succeed(`End "${topic}"`);
	const outputFilePath = path.join(outputDir, `${filePath}.md`);
	await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
	const cleaned = sanitizeContent(response.message.content);
	await fs.writeFile(outputFilePath, cleaned, 'utf-8');
}
