export interface ChatModel {
  name: string;
  label: string;
  description: string;
}

const fallbackModelSeed: ChatModel[] = [
  {
    name: 'gemma3:4b',
    label: 'Gemma 3 4B',
    description: 'Lightweight Gemma model optimized for balanced quality and speed.'
  },
  {
    name: 'llama3.2',
    label: 'Llama 3.2',
    description: 'Latest Llama chat model tuned for helpful responses.'
  },
  {
    name: 'qwen3:4b',
    label: 'Qwen 3 4B',
    description: 'Qwen 3 4B model optimized for performance and quality.'
  }
];

export const fallbackModels: ChatModel[] = [...fallbackModelSeed];

export const fallbackDefaultModel = fallbackModels[0]?.name ?? 'llama2';

export const fallbackModelLookup: Record<string, ChatModel> = fallbackModels.reduce(
  (accumulator, model) => {
    accumulator[model.name] = model;
    return accumulator;
  },
  {} as Record<string, ChatModel>
);

export function toChatModel(name: string): ChatModel {
  if (fallbackModelLookup[name]) {
    return fallbackModelLookup[name];
  }

  return {
    name,
    label: formatModelLabel(name),
    description: 'Local Ollama model'
  };
}

function formatModelLabel(name: string): string {
  const cleaned = name.replace(/[:._-]/g, ' ');
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}
