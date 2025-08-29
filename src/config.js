import { getSystemPrompt } from './promptFiles.js';

export const MODELNAME = 'mistral:7b-instruct-v0.3-q5_K_M'; // 'mistral'; // 'mistral:7b-instruct'; // 'mistral:7b-instruct-v0.3-q5_K_M'; // 'phi3'; // or your choice
export const TEMPLATE_FILE = './templates/tutorial_sqlite.md';
export const OUTPUT_DIR = '../docs';
export const SYSTEM_PROMPT = getSystemPrompt();
