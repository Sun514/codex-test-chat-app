import type { ChatModel } from '@/constants/models';
import { fallbackModels, toChatModel } from '@/constants/models';

import { listModels } from './ollamaClient';

export async function fetchAvailableModels(signal?: AbortSignal): Promise<ChatModel[]> {
  const modelIds = await listModels(signal);

  if (!modelIds.length) {
    return [...fallbackModels];
  }

  return modelIds.map((modelId) => toChatModel(modelId));
}
