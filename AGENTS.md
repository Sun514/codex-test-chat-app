# Repository Guidelines

## Project Structure & Module Organization
This Vue 3 + PrimeVue + Tailwind chat client links to local Ollama models. Store application code in `src/`: UI pieces in `src/components/`, routed views in `src/views/`, composables in `src/composables/`, and API/state logic in `src/services/` and `src/stores/`. Keep static assets inside `public/`. Place fixtures under `tests/fixtures/` and mirror component paths in `tests/` to keep specs discoverable.

## Build, Test, and Development Commands
- `npm install` — install dependencies into `node_modules/`.
- `npm run dev` — start the Vite dev server with HMR at `http://localhost:5173`.
- `npm run build` — emit optimized assets in `dist/`.
- `npm run preview` — serve the production build for smoke tests.
- `npm run lint` — run ESLint with Vue and Tailwind plugins; resolve issues before committing.
- `npm run test:unit` — execute Vitest specs in `tests/unit/`.

## Coding Style & Naming Conventions
Use TypeScript everywhere and prefer `<script setup lang="ts">`. Apply 2-space indentation per Vue style guide. Name components `PascalCase.vue`, composables `useFeature.ts`, stores `featureStore.ts`, and utilities `camelCase.ts`. Group Tailwind classes in roughly layout → spacing → color order for readability. Keep Ollama integrations inside typed service modules so components stay declarative.

## Testing Guidelines
Pair each feature with a unit spec (`src/components/ChatPane.vue` → `tests/unit/components/ChatPane.spec.ts`). Use clear `describe` blocks and the pattern `it('renders message history', ...)`. Mock Ollama responses through helpers in `tests/setup.ts` to avoid hitting the local runtime. Target coverage above 80% and run `npm run test:unit -- --coverage` before opening a PR.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) with concise subjects (`feat: add typing indicator`). Reference related issues (`Closes #42`). Pull requests must summarize the change, include UI screenshots or GIFs when relevant, list validation commands (e.g., `npm run lint`, `npm run test:unit`), and call out rollout notes. Request at least one peer review prior to merging to `main`.

## Security & Configuration Tips
Never commit secrets. Copy `.env.example` to `.env.local` and set `OLLAMA_BASE_URL` plus any vendor keys. Keep the model list in `src/constants/models.ts` aligned with `ollama list` so the dropdown only shows installed models.
