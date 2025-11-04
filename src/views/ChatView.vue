<template>
  <div class="flex min-h-screen flex-col bg-surface-50">
    <header class="border-b border-surface-200 bg-brand-sand/40 px-6 py-6 backdrop-blur">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-col gap-2">
          <AppBrand />
          <p class="text-sm text-surface-600">
            Local models, crafted exchanges. Converse with the Ollama installs running on your machine.
          </p>
          <p v-if="modelError" class="text-xs font-medium text-red-600">
            Unable to refresh model list: {{ modelError }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <ModelSelector
            v-model="activeModel"
            :disabled="disableModelSelection"
            :models="models"
          />
          <Button
            label="Reset"
            icon="pi pi-refresh"
            class="p-button-outlined"
            @click="handleReset"
            :disabled="isLoading || !hasMessages"
          />
          <Button
            v-if="isLoading"
            label="Cancel"
            icon="pi pi-stop"
            severity="danger"
            @click="handleCancel"
          />
        </div>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-6 px-6 py-6">
      <div v-if="error" class="max-w-md">
        <Message severity="error" :closable="false">
          {{ error }}
        </Message>
      </div>
      <ChatPane :messages="messages" :is-loading="isLoading" />
    </main>

    <footer class="border-t border-surface-200 bg-white/80 px-6 py-4 backdrop-blur">
      <div class="flex flex-col gap-4">
        <ChatInput :disabled="isLoading" @submit="handleSubmit" />
        <div v-if="isLoading" class="flex items-center gap-3 text-surface-600">
          <ProgressSpinner style="width: 22px; height: 22px" strokeWidth="6" />
          <span>Waiting for response from {{ activeModel }}…</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

import AppBrand from '@/components/AppBrand.vue';
import ChatInput from '@/components/ChatInput.vue';
import ChatPane from '@/components/ChatPane.vue';
import ModelSelector from '@/components/ModelSelector.vue';
import { useChat } from '@/composables/useChat';
import { useModelStore } from '@/stores/modelStore';

const {
  messages,
  selectedModel,
  isLoading,
  error,
  hasMessages,
  sendMessage,
  setModel,
  resetConversation,
  cancelRequest
} = useChat();

const modelStore = useModelStore();
const { models, isLoading: isModelLoading, error: modelError } = storeToRefs(modelStore);

onMounted(() => {
  void modelStore.fetchModels();
});

watch(
  models,
  (currentModels) => {
    if (!currentModels.length) {
      return;
    }
    if (!currentModels.some((model) => model.name === selectedModel.value)) {
      setModel(currentModels[0].name);
    }
  },
  { immediate: true }
);

const activeModel = computed({
  get: () => selectedModel.value,
  set: (value: string) => setModel(value)
});

const disableModelSelection = computed(() => isLoading.value || isModelLoading.value);

function handleSubmit(message: string) {
  void sendMessage(message);
}

function handleReset() {
  resetConversation();
}

function handleCancel() {
  cancelRequest();
}
</script>
