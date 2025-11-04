import { defineStore } from 'pinia';

import { fallbackDefaultModel } from '@/constants/models';
import type { ChatMessage } from '@/types/chat';

import { createMessageId, requestChatCompletion } from '@/services/chatService';

interface ChatState {
  messages: ChatMessage[];
  selectedModel: string;
  isLoading: boolean;
  error: string | null;
  abortController: AbortController | null;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [],
    selectedModel: fallbackDefaultModel,
    isLoading: false,
    error: null,
    abortController: null
  }),
  getters: {
    hasMessages: (state) => state.messages.length > 0
  },
  actions: {
    setModel(model: string) {
      this.selectedModel = model;
    },
    resetConversation() {
      this.cancelRequest();
      this.messages = [];
      this.error = null;
    },
    cancelRequest() {
      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
        this.isLoading = false;
      }
    },
    async sendMessage(rawContent: string) {
      const content = rawContent.trim();
      if (!content) {
        return;
      }

      const userMessage: ChatMessage = {
        id: createMessageId('user'),
        role: 'user',
        content,
        createdAt: Date.now()
      };

      this.messages.push(userMessage);
      this.isLoading = true;
      this.error = null;

      const controller = new AbortController();
      this.abortController = controller;

      try {
        const assistantMessage = await requestChatCompletion(
          this.selectedModel,
          this.messages,
          controller.signal
        );
        this.messages.push(assistantMessage);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          this.error = 'Request cancelled.';
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'Something went wrong while contacting Ollama.';
        }
      } finally {
        this.isLoading = false;
        this.abortController = null;
      }
    }
  }
});
