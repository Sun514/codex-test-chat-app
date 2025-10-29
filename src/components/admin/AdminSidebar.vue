<template>
  <aside class="flex w-72 flex-col border-r border-surface-200 bg-white">
    <div class="px-6 pb-4 pt-6">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-surface-400">Settings</h2>
    </div>
    <nav class="flex-1 space-y-1 px-3">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition"
        :class="[
          item.value === modelValue
            ? 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
        ]"
        @click="$emit('update:modelValue', item.value)"
      >
        <span
          class="flex h-8 w-8 items-center justify-center rounded-lg border text-base"
          :class="item.value === modelValue ? 'border-blue-200 bg-white text-blue-500' : 'border-surface-200 bg-surface-50 text-surface-400'"
        >
          <i :class="item.icon"></i>
        </span>
        <div class="flex flex-col">
          <span>{{ item.label }}</span>
          <span class="text-xs font-normal text-surface-400">{{ item.description }}</span>
        </div>
      </button>
    </nav>
    <div class="border-t border-surface-200 px-6 py-4">
      <Button label="Create New" icon="pi pi-plus" class="w-full" severity="secondary" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

interface SidebarItem {
  value: string;
  label: string;
  icon: string;
  description: string;
}

defineProps<{
  items: SidebarItem[];
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
