import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildUserPrompt, getSystemPrompt } from './utils/promptFiles.js';

export async function generateTutorialPhased(client, topic, templatePath) {
	const template = readFileSync(templatePath, 'utf8');

	const system = getSystemPrompt();

	const outlineUser = buildUserPrompt(
		topic,
		template
	) + `

REDUCE TASK:
Return only an Outline:
- Goal: 1 sentence
- Concept: bullets (Definition, Analogy, Why, Use, Avoid)
- Learning Steps: 5 step labels
- Examples: 4 labels
- Performance Notes: 3 bullets
- Common Mistakes: 3 items (just titles)
- Exercises: 5 story lines (no SQL)
Stop.`;

	const outline = await client.chat({
		model: 'mistral:7b-instruct-v0.3-q5_K_M',
		messages: [
			{ role: 'system', content: system },
			{ role: 'user', content: outlineUser }
		]
	});

	const outlineText = outline.message.content;
	const expandUser = buildUserPrompt(topic, template) + `

You MUST expand following Outline without adding/removing major items:

${outlineText}

Rules:
- Keep each explanation <= 4 sentences
- Fill tables; keep them compact
- Supply SQL only where template calls for it
- Leave no placeholder text.`;

	const full = await client.chat({
		model: 'mistral:7b-instruct-v0.3-q5_K_M',
		messages: [
			{ role: 'system', content: system },
			{ role: 'user', content: expandUser }
		]
	});

	return full.message.content;
}
