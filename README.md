# ai-learn-sql

Generate a structured SQLite-focused SQL tutorial using a local LLM (Ollama) and publish it via [Docsify](https://docsify.js.org/#/).

## Purpose

- Practice core SQL (DP-900 oriented)
- Emphasize SQLite syntax and concepts
- Auto-generate lesson markdown + per-lesson demo database
- Lightweight static documentation (Docsify)

## Tech Stack

| Area       | Tool           |
| ---------- | -------------- |
| LLM        | Ollama (local) |
| DB         | SQLite         |
| Runtime    | Node.js (ESM)  |
| Docs site  | Docsify (CDN)  |
| Generation | Custom scripts |

## Generated Content Layout

Each chapter entry in `src/chapters.js` like:

```
["02_read_data/01_select", "SELECT"]
```

produces:

```
docs/02_read_data/01_select/01_select.md
```

Sidebar links point to: `folder/slug/slug.md`.

A fresh `demo.db` is also copied into every chapter directory.

## Scripts

| Script          | Description                                           |
| --------------- | ----------------------------------------------------- |
| prebuild        | Cleans first-level directories inside `docs/`         |
| build           | Runs `build:tutorials` then `build:db`                |
| build:tutorials | Generates markdown lessons + sidebar                  |
| build:db        | Rebuilds `demo.db` and copies into each lesson folder |
| docs            | Alias for `build`                                     |

## Install Prerequisites (macOS)

```bash
brew install sqlite
curl -sSfL https://ollama.com/download.sh | sh
```

Pull (or choose) a model (examples):

```bash
ollama pull mistral:7b-instruct
```

## Install & Generate

```bash
npm install
npm run build
```

Outputs in `docs/`:

- `_sidebar.md`
- Per-topic directories with `*.md`
- `demo.db` inside each topic folder
- Static Docsify scaffold (`index.html`, `.nojekyll`, README.md)

## Preview Docs

Any static server works. Examples:

```bash
npx serve docs
# or
python3 -m http.server -d docs 5173
```

Open http://localhost:PORT

## Key Source Files

| File                         | Purpose                                               |
| ---------------------------- | ----------------------------------------------------- |
| `src/chapters.js`            | Ordered chapter list `[path, title]`                  |
| `src/template.md`            | Markdown structure template (wrapped in ```md fences) |
| `src/buildPrompt.js`         | Builds user prompt for the LLM                        |
| `src/generateTutorial.js`    | Calls Ollama, writes cleaned markdown                 |
| `src/sanitizeContent.js`     | Strips outer code fences                              |
| `src/generateSidebar.js`     | Builds `_sidebar.md` with deep file links             |
| `src/db-setup.mjs`           | Recreates and seeds `demo.db`, copies per lesson      |
| `src/config.js`              | Model, template path, output dir, system prompt       |
| `src/generate-tutorials.mjs` | Orchestrates sidebar + lessons                        |

## Customization

1. Edit `src/chapters.js` to add/remove lessons.
2. Adjust `src/template.md` structure.
3. Change `MODELNAME` or system prompt in `src/config.js`.
4. Re-run: `npm run build`.

## Regeneration Cycle

1. Clean (auto via prebuild)
2. Generate sidebar
3. Generate each tutorial (LLM)
4. Create fresh database
5. Copy `demo.db` into each chapter directory

## Limitations

- Generated content may need manual editing.
- Local model quality varies by choice.
- Not a full DP-900 replacement.

## References

- [Ollama](https://ollama.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Docsify](https://docsify.js.org/#/)
- [Node.js](https://nodejs.org/en/)
- [mermaid-docsify](https://github.com/Leward/mermaid-docsify)
