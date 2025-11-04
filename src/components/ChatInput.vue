<template>
  <form class="flex flex-col gap-3 sm:flex-row" @submit.prevent="handleSubmit">
    <Textarea
      v-model="draft"
      autoResize
      rows="2"
      :disabled="disabled"
      class="w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm text-surface-900 shadow-sm focus:border-blue-500 focus:outline-none"
      placeholder="Ask your model anything…"
      @keydown.enter.exact.prevent="handleSubmit"
      @keydown.enter.shift.stop
    />
    <Button
      type="submit"
      icon="pi pi-send"
      aria-label="Send message"
      :disabled="disabled || !draft.trim()"
      class="h-12 w-full sm:w-auto"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Button from 'primevue/button';
import Textarea from 'primevue/textarea';

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  submit: [value: string];
}>();

const draft = ref('');

function handleSubmit() {
  if (props.disabled) {
    return;
  }

  const value = draft.value.trim();
  if (!value) {
    return;
  }

  emit('submit', value);
  draft.value = '';
}
</script>
