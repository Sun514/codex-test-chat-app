import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useChatStore } from '@/stores/chatStore';

export function useChat() {
  const store = useChatStore();

  const { messages, selectedModel, isLoading, error } = storeToRefs(store);

  const hasMessages = computed(() => store.hasMessages);

  return {
    messages,
    selectedModel,
    isLoading,
    error,
    hasMessages,
    sendMessage: store.sendMessage,
    setModel: store.setModel,
    resetConversation: store.resetConversation,
    cancelRequest: store.cancelRequest
  };
}
