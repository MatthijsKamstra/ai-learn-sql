import fs from 'fs-extra';
import { Ollama } from 'ollama';
import ora from 'ora';
import chapterList from './chapters.js';

import { buildUserPrompt } from './buildPrompt.js';
import { MODELNAME, OUTPUT_DIR, SYSTEM_PROMPT, TEMPLATE_FILE } from './config.js';
import { generateSidebar } from './generateSidebar.js';
import { generateTutorial } from './generateTutorial.js';

const ollama = new Ollama();

const template = await fs.readFile(TEMPLATE_FILE, 'utf-8');

console.time('⏱️ Generating sidebar.md');
await generateSidebar(chapterList, OUTPUT_DIR);
console.timeEnd('⏱️ Generating sidebar.md');

const spinner = ora();

for (const [filePath, topic] of chapterList) {
	console.time(`⏱️ Generating ${filePath}.md`);
	try {
		await generateTutorial(ollama, {
			model: MODELNAME,
			systemPrompt: SYSTEM_PROMPT,
			template,
			filePath,
			topic,
			outputDir: OUTPUT_DIR,
			buildPrompt: buildUserPrompt,
			spinner,
			temperature: 0.7
		});
	} catch (e) {
		spinner.fail(`Error "${topic}": ${e.message}`);
	}
	console.timeEnd(`⏱️ Generating ${filePath}.md`);
}
