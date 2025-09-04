import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSystemPrompt } from './utils/promptFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const MODELNAME = 'mistral:7b-instruct-v0.3-q5_K_M';// 'mistral'; // 'mistral:7b-instruct'; // 'mistral:7b-instruct-v0.3-q5_K_M'; // 'phi3'; // or your choice
export const TEMPLATE_FILE = './templates/tutorial_sqlite_compact.md';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const OUTPUT_DIR = path.join(ROOT_DIR, 'docs');
export const DB_BUILD_DIR = path.join(ROOT_DIR, 'build', 'db');

export const SYSTEM_PROMPT = getSystemPrompt();
