<template>
  <div class="flex min-h-screen flex-col bg-surface-50">
    <header class="border-b border-surface-200 bg-white/80 px-6 py-6 backdrop-blur">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-surface-900">Local Ollama Chat</h1>
          <p class="text-sm text-surface-600">
            Converse with models you have installed locally via Ollama.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <ModelSelector v-model="activeModel" :disabled="isLoading" />
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
import { computed } from 'vue';

import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

import ChatInput from '@/components/ChatInput.vue';
import ChatPane from '@/components/ChatPane.vue';
import ModelSelector from '@/components/ModelSelector.vue';
import { useChat } from '@/composables/useChat';

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

const activeModel = computed({
  get: () => selectedModel.value,
  set: (value: string) => setModel(value)
});

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
