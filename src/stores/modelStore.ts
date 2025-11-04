import { defineStore } from 'pinia';

import type { ChatModel } from '@/constants/models';
import { fallbackModels } from '@/constants/models';
import { fetchAvailableModels } from '@/services/modelService';

interface ModelState {
  models: ChatModel[];
  isLoading: boolean;
  error: string | null;
  hasAttemptedFetch: boolean;
}

export const useModelStore = defineStore('models', {
  state: (): ModelState => ({
    models: [...fallbackModels],
    isLoading: false,
    error: null,
    hasAttemptedFetch: false
  }),
  actions: {
    async fetchModels(force = false) {
      if (this.isLoading) {
        return;
      }

      if (this.hasAttemptedFetch && !force) {
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const models = await fetchAvailableModels();
        this.models = models;
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = 'Unable to load models from Ollama.';
        }
        this.models = [...fallbackModels];
      } finally {
        this.isLoading = false;
        this.hasAttemptedFetch = true;
      }
    }
  }
});
