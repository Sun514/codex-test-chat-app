<template>
  <div class="min-h-screen bg-surface-50">
    <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">
      <div class="flex flex-col gap-6 rounded-2xl border border-surface-200 bg-white px-6 py-7 shadow-lg">
        <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        </header>

        <section class="flex flex-col gap-4">
          <div v-if="error" class="max-w-md">
            <Message severity="error" :closable="false">
              {{ error }}
            </Message>
          </div>
          <ChatPane :messages="messages" :is-loading="isLoading" />
        </section>

        <footer class="flex flex-col gap-4">
          <ChatInput :disabled="isLoading" @submit="handleSubmit" />
          <div v-if="isLoading" class="flex items-center gap-3 text-surface-600">
            <ProgressSpinner style="width: 22px; height: 22px" strokeWidth="6" />
            <span>Waiting for response from {{ activeModel }}…</span>
          </div>
        </footer>
      </div>
    </div>
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
