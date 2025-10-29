import type { ChatMessage } from '@/types/chat';

import { chat, toOllamaMessages } from './ollamaClient';

export async function requestChatCompletion(
  model: string,
  history: ChatMessage[],
  signal?: AbortSignal
): Promise<ChatMessage> {
  const response = await chat(
    {
      model,
      messages: toOllamaMessages(history),
      stream: false
    },
    signal
  );

  return {
    id: createMessageId('assistant'),
    role: response.message.role,
    content: response.message.content.trim(),
    createdAt: Date.now()
  };
}

export function createMessageId(role: ChatMessage['role']) {
  return `${role}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
