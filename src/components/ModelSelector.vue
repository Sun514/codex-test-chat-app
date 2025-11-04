<template>
  <Dropdown
    v-model="selected"
    :options="options"
    optionLabel="label"
    optionValue="name"
    :disabled="disabled"
    class="min-w-[220px]"
    placeholder="Select model"
    :filter="true"
  >
    <template #option="{ option }">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-surface-900">{{ option.label }}</span>
        <span class="text-xs text-surface-600">{{ option.description }}</span>
      </div>
    </template>
    <template #value="{ value, placeholder }">
      <span v-if="value" class="text-sm text-surface-900">
        {{ displayLabel(value) }}
      </span>
      <span v-else class="text-sm text-surface-500">{{ placeholder }}</span>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Dropdown from 'primevue/dropdown';

import type { ChatModel } from '@/constants/models';
import { fallbackModels } from '@/constants/models';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
  models?: ChatModel[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const options = computed(() =>
  props.models && props.models.length > 0 ? props.models : fallbackModels
);

const optionLookup = computed(() =>
  options.value.reduce((accumulator, model) => {
    accumulator[model.name] = model;
    return accumulator;
  }, {} as Record<string, ChatModel>)
);

const selected = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});

function displayLabel(value: string) {
  return optionLookup.value[value]?.label ?? value;
}
</script>
