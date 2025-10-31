<template>
  <div class="relative flex min-h-[320px] flex-1 overflow-hidden">
    <div
      ref="logEl"
      class="flex w-full flex-col gap-4 overflow-y-auto px-2 py-4 sm:px-4 md:px-6"
    >
      <div
        v-if="!messages.length && !isLoading"
        class="flex flex-1 flex-col items-center justify-center gap-3 text-center text-surface-600"
      >
        <i class="pi pi-comments text-2xl text-surface-500"></i>
        <p class="max-w-md text-sm">
          Share a prompt to start a conversation with your selected model.
        </p>
      </div>

      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />

      <div
        v-if="isLoading"
        class="inline-flex items-center gap-3 self-start rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-surface-500 shadow-sm"
      >
        <span class="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
        Thinking…
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, toRefs, watch } from 'vue';

import MessageBubble from '@/components/MessageBubble.vue';
import type { ChatMessage } from '@/types/chat';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

const props = defineProps<Props>();
const { messages } = toRefs(props);

const logEl = ref<HTMLDivElement | null>(null);

watch(
  messages,
  async () => {
    await nextTick();
    if (logEl.value) {
      logEl.value.scrollTop = logEl.value.scrollHeight;
    }
  },
  { deep: true }
);
</script>
