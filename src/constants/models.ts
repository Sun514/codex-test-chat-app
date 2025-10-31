export interface ChatModel {
  name: string;
  label: string;
  description: string;
}

export const availableModels: ChatModel[] = [
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

export const defaultModel = availableModels[0]?.name ?? 'llama2';

export const modelLookup: Record<string, ChatModel> = availableModels.reduce(
  (accumulator, model) => {
    accumulator[model.name] = model;
    return accumulator;
  },
  {} as Record<string, ChatModel>
);
