import type { ChatMessage, ChatRole } from '@/types/chat';

export interface OllamaChatMessage {
  role: ChatRole;
  content: string;
}

export interface OllamaChatRequest {
  model: string;
  messages: OllamaChatMessage[];
  stream?: boolean;
  options?: Record<string, unknown>;
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: OllamaChatMessage;
  done: boolean;
}

export class OllamaClientError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'OllamaClientError';
    this.status = status;
  }
}

const FALLBACK_BASE_URL = 'http://localhost:11434';

export function resolveBaseUrl() {
  const raw = import.meta.env.VITE_OLLAMA_BASE_URL;
  if (!raw) {
    return FALLBACK_BASE_URL;
  }

  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function toOllamaMessages(history: ChatMessage[]): OllamaChatMessage[] {
  return history.map(({ role, content }) => ({
    role,
    content
  }));
}

interface OllamaModelsResponse {
  data?: Array<{
    id: string;
    object?: string;
    created?: number;
    owned_by?: string;
  }>;
}

export async function listModels(signal?: AbortSignal): Promise<string[]> {
  const response = await fetch(`${resolveBaseUrl()}/v1/models`, {
    method: 'GET',
    signal
  });

  if (!response.ok) {
    const detail = await safeReadJson(response);
    const message =
      typeof detail?.error === 'string'
        ? detail.error
        : `Failed to load models (status ${response.status})`;
    throw new OllamaClientError(message, response.status);
  }

  const payload = (await response.json()) as OllamaModelsResponse;

  return (
    payload.data
      ?.map((entry) => entry.id)
      .filter((id): id is string => typeof id === 'string' && id.length > 0) ?? []
  );
}

export async function chat(
  payload: OllamaChatRequest,
  signal?: AbortSignal
): Promise<OllamaChatResponse> {
  const response = await fetch(`${resolveBaseUrl()}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload,
      stream: payload.stream ?? false
    }),
    signal
  });

  if (!response.ok) {
    const detail = await safeReadJson(response);
    const message =
      typeof detail?.error === 'string'
        ? detail.error
        : `Ollama request failed with status ${response.status}`;
    throw new OllamaClientError(message, response.status);
  }

  return (await response.json()) as OllamaChatResponse;
}

async function safeReadJson(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }
}
