<template>
  <header class="flex h-16 items-center justify-between border-b border-surface-200 bg-white px-6">
    <div class="flex items-center gap-3">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg font-semibold text-white">
        OC
      </span>
      <div>
        <p class="text-xs font-medium uppercase tracking-wider text-surface-500">Admin</p>
        <h1 class="text-lg font-semibold text-surface-900">Control Center</h1>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="relative hidden sm:block">
        <i class="pi pi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-surface-400"></i>
        <input
          type="search"
          class="h-10 w-64 rounded-xl border border-surface-200 bg-surface-50 pl-9 pr-4 text-sm text-surface-700 outline-none transition focus:border-blue-500 focus:bg-white"
          placeholder="Search settings"
        />
      </div>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-surface-200 bg-white text-surface-500 transition hover:border-blue-500 hover:text-blue-500"
        aria-label="Notifications"
      >
        <i class="pi pi-bell text-sm"></i>
      </button>
      <div class="flex items-center gap-2 rounded-full border border-surface-200 bg-white px-3 py-1">
        <span class="h-8 w-8 rounded-full bg-blue-100 text-center text-sm leading-8 text-blue-600">SO</span>
        <span class="hidden text-sm font-medium text-surface-700 md:inline">sun.oh</span>
      </div>
    </div>
  </header>
</template>
