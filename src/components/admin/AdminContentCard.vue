<template>
  <section class="flex flex-col gap-3 rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
    <header class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold text-surface-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-surface-500">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </header>
    <div class="text-sm text-surface-600">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
