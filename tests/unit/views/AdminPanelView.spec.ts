import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AdminPanelView from '@/views/AdminPanelView.vue';

describe('AdminPanelView', () => {
  const mountView = () =>
    mount(AdminPanelView, {
      global: {
        stubs: {
          RouterLink: false
        }
      }
    });

  it('renders sidebar navigation with categories', () => {
    const wrapper = mountView();
    const menuItems = wrapper.findAll('aside nav button');
    expect(menuItems.length).toBeGreaterThanOrEqual(6);
    expect(wrapper.text()).toContain('Models');
    expect(wrapper.text()).toContain('Prompts');
  });

  it('shows model overview cards by default', () => {
    const wrapper = mountView();
    expect(wrapper.text()).toContain('Model Overview');
    expect(wrapper.text()).toContain('Installed Models');
  });

  it('switches content when selecting prompts section', async () => {
    const wrapper = mountView();
    const promptsButton = wrapper.findAll('aside nav button').find((button) => button.text().includes('Prompts'));
    expect(promptsButton).toBeDefined();
    await promptsButton?.trigger('click');
    expect(wrapper.text()).toContain('Prompt Templates');
  });
});
