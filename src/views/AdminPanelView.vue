<template>
  <div class="flex min-h-screen flex-col bg-surface-100">
    <AdminTopBar />
    <div class="flex flex-1">
      <AdminSidebar v-model="activeSection" :items="navItems" />
      <main class="flex-1 overflow-y-auto px-6 py-8">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <AdminSectionHeader
            :eyebrow="activeContext.eyebrow"
            :title="activeContext.title"
            :description="activeContext.description"
            :actions="activeContext.actions"
          />
          <div class="grid gap-6 md:grid-cols-2" v-if="activeSection === 'models'">
            <AdminContentCard title="Model Overview" subtitle="Snapshot of locally installed models.">
              <ul class="space-y-3">
                <li class="flex items-center justify-between">
                  <span>Default model</span>
                  <span class="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">llama3.2</span>
                </li>
                <li class="flex items-center justify-between">
                  <span>Active models</span>
                  <span class="text-sm font-semibold text-surface-900">4</span>
                </li>
                <li class="flex items-center justify-between">
                  <span>Last Ollama sync</span>
                  <span class="text-sm text-surface-500">6 minutes ago</span>
                </li>
              </ul>
            </AdminContentCard>
            <AdminContentCard title="Upload New Model" subtitle="Bring in a new GGUF or quantized model.">
              <div class="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-surface-300 bg-surface-50 text-center">
                <i class="pi pi-upload text-2xl text-surface-400"></i>
                <p class="mt-3 text-sm text-surface-500">Drag &amp; drop your file here or browse storage.</p>
                <Button label="Select File" class="mt-4" severity="secondary" />
              </div>
            </AdminContentCard>
            <AdminContentCard
              class="md:col-span-2"
              title="Installed Models"
              subtitle="Manage all models exposed to the chat client."
            >
              <div class="flex flex-wrap gap-2 pb-4">
                <span
                  v-for="filter in ['All', 'Active', 'Disabled']"
                  :key="filter"
                  class="rounded-full border border-surface-200 bg-white px-3 py-1 text-xs font-medium text-surface-500"
                >
                  {{ filter }}
                </span>
              </div>
              <table class="w-full table-fixed border-collapse text-sm">
                <thead>
                  <tr class="text-left text-surface-400">
                    <th class="pb-3 font-medium">Name</th>
                    <th class="pb-3 font-medium">Version</th>
                    <th class="pb-3 font-medium">Size</th>
                    <th class="pb-3 font-medium">Status</th>
                    <th class="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-100">
                  <tr v-for="model in modelRows" :key="model.name" class="text-surface-700">
                    <td class="py-3">
                      <div class="font-semibold text-surface-900">{{ model.label }}</div>
                      <div class="text-xs text-surface-400">{{ model.variant }}</div>
                    </td>
                    <td class="py-3">{{ model.version }}</td>
                    <td class="py-3">{{ model.size }}</td>
                    <td class="py-3">
                      <span
                        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                        :class="model.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-surface-100 text-surface-500'"
                      >
                        <span class="h-2 w-2 rounded-full" :class="model.status === 'Active' ? 'bg-green-500' : 'bg-surface-400'"></span>
                        {{ model.status }}
                      </span>
                    </td>
                    <td class="py-3 text-right text-surface-400">
                      <i class="pi pi-ellipsis-h cursor-pointer rounded-full p-2 hover:bg-surface-100 hover:text-surface-700"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </AdminContentCard>
          </div>

          <div class="grid gap-6 md:grid-cols-2" v-else-if="activeSection === 'prompts'">
            <AdminContentCard title="Prompt Templates" subtitle="Predefined starter prompts available to all users.">
              <ul class="space-y-3">
                <li v-for="prompt in promptTemplates" :key="prompt.title" class="rounded-xl border border-surface-200 bg-surface-50 p-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-surface-900">{{ prompt.title }}</span>
                    <span class="text-xs text-surface-400">{{ prompt.usage }} uses</span>
                  </div>
                  <p class="mt-2 text-xs text-surface-500">{{ prompt.preview }}</p>
                </li>
              </ul>
            </AdminContentCard>
            <AdminContentCard title="Prompt Categories" subtitle="Organize templates by workflow or audience.">
              <ul class="space-y-3">
                <li
                  v-for="category in promptCategories"
                  :key="category.name"
                  class="flex items-center justify-between rounded-xl border border-surface-200 bg-white px-4 py-3"
                >
                  <div>
                    <div class="text-sm font-semibold text-surface-900">{{ category.name }}</div>
                    <div class="text-xs text-surface-400">{{ category.count }} prompts</div>
                  </div>
                  <Button icon="pi pi-pencil" aria-label="Edit category" severity="secondary" outlined />
                </li>
              </ul>
            </AdminContentCard>
          </div>

          <div class="grid gap-6 md:grid-cols-2" v-else-if="activeSection === 'users'">
            <AdminContentCard title="User Directory" subtitle="Manage platform access.">
              <table class="w-full table-fixed border-collapse text-sm">
                <thead>
                  <tr class="text-left text-surface-400">
                    <th class="pb-3 font-medium">Name</th>
                    <th class="pb-3 font-medium">Role</th>
                    <th class="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-100">
                  <tr v-for="user in userRows" :key="user.email" class="text-surface-700">
                    <td class="py-3">
                      <div class="font-semibold text-surface-900">{{ user.name }}</div>
                      <div class="text-xs text-surface-400">{{ user.email }}</div>
                    </td>
                    <td class="py-3">{{ user.role }}</td>
                    <td class="py-3">
                      <span
                        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                        :class="user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-surface-100 text-surface-500'"
                      >
                        <span class="h-2 w-2 rounded-full" :class="user.status === 'Active' ? 'bg-green-500' : 'bg-surface-400'"></span>
                        {{ user.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </AdminContentCard>
            <AdminContentCard title="Access Policies" subtitle="High-level overview of group permissions.">
              <ul class="space-y-3">
                <li
                  v-for="policy in accessPolicies"
                  :key="policy.name"
                  class="flex items-center justify-between rounded-xl border border-surface-200 bg-surface-50 px-4 py-3"
                >
                  <div>
                    <div class="text-sm font-semibold text-surface-900">{{ policy.name }}</div>
                    <div class="text-xs text-surface-400">{{ policy.summary }}</div>
                  </div>
                  <Button icon="pi pi-chevron-right" severity="secondary" outlined />
                </li>
              </ul>
            </AdminContentCard>
          </div>

          <div class="grid gap-6" v-else>
            <AdminContentCard
              v-for="placeholder in activeContext.placeholders"
              :key="placeholder.title"
              :title="placeholder.title"
              :subtitle="placeholder.subtitle"
            >
              <p class="text-sm text-surface-500">{{ placeholder.copy }}</p>
            </AdminContentCard>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Button from 'primevue/button';

import AdminContentCard from '@/components/admin/AdminContentCard.vue';
import AdminSectionHeader from '@/components/admin/AdminSectionHeader.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AdminTopBar from '@/components/admin/AdminTopBar.vue';

interface SidebarItem {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const navItems: SidebarItem[] = [
  { value: 'models', label: 'Models', icon: 'pi pi-table', description: 'Local Ollama models' },
  { value: 'prompts', label: 'Prompts', icon: 'pi pi-file-edit', description: 'Reusable prompt templates' },
  { value: 'users', label: 'Users', icon: 'pi pi-users', description: 'Manage workspace accounts' },
  { value: 'groups', label: 'Groups', icon: 'pi pi-sitemap', description: 'Role-based access rules' },
  { value: 'general', label: 'General', icon: 'pi pi-cog', description: 'Branding and system defaults' },
  { value: 'audit', label: 'Audit Logs', icon: 'pi pi-history', description: 'Trace changes and access' },
  { value: 'keys', label: 'API Keys', icon: 'pi pi-key', description: 'External integrations' }
];

const activeSection = ref(navItems[0]?.value ?? 'models');

const headerContext = {
  models: {
    eyebrow: 'Models',
    title: 'Model Inventory',
    description: 'Configure which Ollama models are synced and available to chat clients.',
    actions: [
      { label: 'Sync Ollama', icon: 'pi pi-refresh' },
      { label: 'Add Model', icon: 'pi pi-plus', severity: 'primary' }
    ]
  },
  prompts: {
    eyebrow: 'Prompts',
    title: 'Prompt Library',
    description: 'Maintain prompt presets for consistent agent hand-offs.',
    actions: [{ label: 'New Prompt', icon: 'pi pi-plus', severity: 'primary' }]
  },
  users: {
    eyebrow: 'Users',
    title: 'Workspace Members',
    description: 'Invite teammates, assign roles, and keep access current.',
    actions: [
      { label: 'Invite User', icon: 'pi pi-user-plus', severity: 'primary' },
      { label: 'Export', icon: 'pi pi-download', outlined: true }
    ]
  },
  groups: {
    eyebrow: 'Groups',
    title: 'Permission Groups',
    description: 'Bundle users into reusable permission sets.',
    actions: [{ label: 'New Group', icon: 'pi pi-plus', severity: 'primary' }],
    placeholders: [
      {
        title: 'No groups yet',
        subtitle: 'Create your first permission bundle.',
        copy: 'Groups let you assign model and prompt access at scale. Start by defining roles like “Support” or “Engineering”.'
      }
    ]
  },
  general: {
    eyebrow: 'General',
    title: 'System Defaults',
    description: 'Control branding, localization, and notification rules.',
    actions: [{ label: 'Edit Branding', icon: 'pi pi-pencil', severity: 'primary' }],
    placeholders: [
      {
        title: 'Branding',
        subtitle: 'Logos, colors, and typography.',
        copy: 'Upload updated assets to align the chat client with your company brand. Changes apply instantly across devices.'
      },
      {
        title: 'Notifications',
        subtitle: 'Email and in-app alerts.',
        copy: 'Decide when admins and end users receive alerts for model changes, new prompts, or usage thresholds.'
      }
    ]
  },
  audit: {
    eyebrow: 'Audit Logs',
    title: 'Change History',
    description: 'Compliance-friendly view into settings edits and sign-ins.',
    actions: [{ label: 'Download CSV', icon: 'pi pi-download', outlined: true }],
    placeholders: [
      {
        title: 'Audit timeline',
        subtitle: 'Historical events appear here.',
        copy: 'When activity is logged, you’ll see actor, timestamp, IP, and diff. Use filters to trace model or prompt edits.'
      }
    ]
  },
  keys: {
    eyebrow: 'API Keys',
    title: 'Integration Tokens',
    description: 'Issue and rotate API keys for external automation.',
    actions: [{ label: 'Generate Key', icon: 'pi pi-plus', severity: 'primary' }],
    placeholders: [
      {
        title: 'No API keys',
        subtitle: 'Generate your first key.',
        copy: 'Use keys to sync prompts or trigger model refreshes from CI/CD. Remember to store them securely.'
      }
    ]
  }
} as const;

const activeContext = computed(() => headerContext[activeSection.value as keyof typeof headerContext]);

const modelRows = [
  { name: 'llama3-8b', label: 'Llama 3 8B', variant: 'q4_0', version: '3.0.0', size: '4.1 GB', status: 'Active' },
  { name: 'llama3-70b', label: 'Llama 3 70B', variant: 'q4_1', version: '3.0.0', size: '39 GB', status: 'Active' },
  { name: 'codellama-13b', label: 'Code Llama 13B', variant: 'q4_0', version: '2.1.1', size: '7.2 GB', status: 'Active' },
  { name: 'mistral-7b', label: 'Mistral 7B', variant: 'q5_1', version: '1.0.2', size: '4.8 GB', status: 'Disabled' }
] as const;

const promptTemplates = [
  { title: 'Bug Triage', usage: 82, preview: 'You are an assistant helping triage bug reports…' },
  { title: 'Release Summary', usage: 41, preview: 'Summarize release notes based on the following commits…' },
  { title: 'Support Reply', usage: 67, preview: 'Draft a friendly support email reply referencing the knowledge base…' }
] as const;

const promptCategories = [
  { name: 'Support', count: 5 },
  { name: 'Engineering', count: 8 },
  { name: 'Product', count: 3 }
] as const;

const userRows = [
  { name: 'Avery Johnson', email: 'avery@company.com', role: 'Owner', status: 'Active' },
  { name: 'Jordan Blake', email: 'jordan@company.com', role: 'Admin', status: 'Active' },
  { name: 'Taylor Reese', email: 'taylor@company.com', role: 'Editor', status: 'Disabled' }
] as const;

const accessPolicies = [
  { name: 'Support Team', summary: 'Access to llama3.2 + support prompts' },
  { name: 'Engineering', summary: 'Full model catalog + deploy permissions' },
  { name: 'Guests', summary: 'Read-only transcripts' }
] as const;
</script>
