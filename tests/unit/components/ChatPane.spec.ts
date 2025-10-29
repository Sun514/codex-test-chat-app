import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import ChatPane from '@/components/ChatPane.vue';
import type { ChatMessage } from '@/types/chat';

const baseMessage: ChatMessage = {
  id: 'assistant-123',
  role: 'assistant',
  content: 'Hello there!',
  createdAt: Date.now()
};

describe('ChatPane', () => {
  it('renders empty state when no messages are present', () => {
    const wrapper = mount(ChatPane, {
      props: {
        messages: [],
        isLoading: false
      }
    });

    expect(wrapper.text()).toContain('Share a prompt');
  });

  it('renders message bubbles', () => {
    const wrapper = mount(ChatPane, {
      props: {
        messages: [baseMessage],
        isLoading: false
      }
    });

    expect(wrapper.text()).toContain(baseMessage.content);
  });
});
