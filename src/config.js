export const MODELNAME = 'mistral:7b-instruct-v0.3-q5_K_M'; // 'mistral:7b-instruct', 'phi3' or your choice
export const TEMPLATE_FILE = './template.md';
export const OUTPUT_DIR = '../docs';
export const SYSTEM_PROMPT = `
You are a technical writer creating tutorials for developers learning SQL using SQLite.
Use the provided markdown structure as a blueprint. Keep content structured, concise, practical, and beginner-friendly.
Only output markdown content, no explanations or comments.
`;
