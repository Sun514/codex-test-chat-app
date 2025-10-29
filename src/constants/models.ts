export interface ChatModel {
  name: string;
  label: string;
  description: string;
}

export const availableModels: ChatModel[] = [
  {
    name: 'llama3.2',
    label: 'Llama 3.2',
    description: 'Latest Llama chat model tuned for helpful responses.'
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
