# Ollama Chat Client

This project is a Vue 3 + PrimeVue + Tailwind CSS chat client that connects to models served by a local Ollama runtime. Users can pick from installed models and exchange messages in a conversational UI that persists history for the active session.

## Getting Started

```bash
npm install
cp .env.example .env.local
# update VITE_OLLAMA_BASE_URL if your Ollama server is not using the default port
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` – start the Vite dev server with hot module replacement.
- `npm run build` – type-check with `vue-tsc` and emit a production build to `dist/`.
- `npm run preview` – preview the production build locally.
- `npm run lint` – lint TypeScript and Vue files with ESLint.
- `npm run test:unit` – execute Vitest unit tests in `tests/unit/`.

## Project Structure

- `src/components` – PrimeVue-powered reusable UI pieces like the chat pane and model selector.
- `src/views` – Routed views; currently includes the main chat surface.
- `src/composables` – Reusable composition functions that wrap Pinia stores and logic.
- `src/services` – Ollama API clients and chat orchestration helpers.
- `src/stores` – Pinia stores for chat state management.
- `tests/unit` – Vitest specs that mirror the source directory layout.

## Environment Variables

The app reads configuration from Vite environment variables. Copy `.env.example` to `.env.local` and set:

- `VITE_OLLAMA_BASE_URL` – Base URL of your local Ollama instance (defaults to `http://localhost:11434`).

Never commit secret keys or environment-specific values.
