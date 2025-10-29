<template>
  <div class="relative flex min-h-[320px] flex-1 overflow-hidden rounded-xl border border-surface-200 bg-surface-50">
    <div ref="logEl" class="flex w-full flex-col gap-4 overflow-y-auto px-6 py-6">
      <div
        v-if="!messages.length && !isLoading"
        class="flex flex-col items-center gap-3 text-center text-surface-600"
      >
        <i class="pi pi-comments text-2xl text-surface-600"></i>
        <p>Share a prompt to start a conversation with your selected model.</p>
      </div>
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
      <div
        v-if="isLoading"
        class="self-start rounded-2xl bg-white px-4 py-3 text-sm text-surface-600 shadow"
      >
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
