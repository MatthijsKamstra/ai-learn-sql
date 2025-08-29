import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let _systemCache;
let _userTemplateCache;

function read(p) {
  return readFileSync(resolve(__dirname, p), 'utf8').trim();
}

export function getSystemPrompt() {
  if (!_systemCache) _systemCache = read('prompts/system.md');
  return _systemCache;
}

export function buildUserPrompt(topic, template) {
  if (!_userTemplateCache) _userTemplateCache = read('prompts/user.md');
  return _userTemplateCache
    .replace(/\$\{topic\}/g, topic)
    .replace(/\$\{template\}/g, template.trim())
    .trim();
}