<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-surface-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-surface-400">{{ eyebrow }}</p>
      <h2 class="text-xl font-semibold text-surface-900">{{ title }}</h2>
      <p class="text-sm text-surface-500">{{ description }}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <Button
        v-for="action in actions"
        :key="action.label"
        :label="action.label"
        :icon="action.icon"
        :severity="action.severity ?? 'secondary'"
        :outlined="action.outlined ?? false"
        :class="action.class"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

interface HeaderAction {
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'danger' | 'success' | 'help' | 'warning' | 'info';
  outlined?: boolean;
  class?: string;
}

defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeaderAction[];
}>();
</script>
