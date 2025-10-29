<template>
  <article :class="wrapperClass">
    <div :class="bubbleClass">
      <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <i :class="iconClass"></i>
        <span>{{ label }}</span>
      </div>
      <p :class="contentClass">
        {{ message.content }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { ChatMessage } from '@/types/chat';

const props = defineProps<{
  message: ChatMessage;
}>();

const isUser = computed(() => props.message.role === 'user');
const isAssistant = computed(() => props.message.role === 'assistant');

const label = computed(() => {
  if (isUser.value) {
    return 'You';
  }
  if (isAssistant.value) {
    return 'Assistant';
  }
  return 'System';
});

const wrapperClass = computed(() =>
  [
    'flex',
    isUser.value ? 'justify-end' : 'justify-start'
  ].join(' ')
);

const bubbleClass = computed(() =>
  [
    'flex',
    'max-w-[85%]',
    'flex-col',
    'gap-2',
    'rounded-2xl',
    'px-4',
    'py-3',
    isUser.value ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-surface-900 shadow'
  ].join(' ')
);

const iconClass = computed(() =>
  [
    'pi',
    isUser.value ? 'pi-user' : 'pi-robot',
    isUser.value ? 'text-white' : 'text-blue-500'
  ].join(' ')
);

const contentClass = computed(() =>
  [
    'whitespace-pre-wrap',
    'text-sm',
    'leading-6',
    isUser.value ? 'text-white' : 'text-surface-900'
  ].join(' ')
);
</script>
