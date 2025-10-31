import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import MessageBubble from '@/components/MessageBubble.vue';
import type { ChatMessage } from '@/types/chat';

const baseMessage: ChatMessage = {
  id: 'assistant-abc',
  role: 'assistant',
  content: 'Hello world',
  createdAt: Date.now()
};

describe('MessageBubble', () => {
  it('renders markdown content to HTML', () => {
    const wrapper = mount(MessageBubble, {
      props: {
        message: { ...baseMessage, content: '**Bold** _italic_' }
      }
    });

    expect(wrapper.html()).toContain('<strong>Bold</strong>');
    expect(wrapper.html()).toContain('<em>italic</em>');
  });

  it('formats code blocks with git-style classes', () => {
    const wrapper = mount(MessageBubble, {
      props: {
        message: { ...baseMessage, content: '```ts\nconst a = 1;\n```' }
      }
    });

    const html = wrapper.html();
    expect(html).toContain('markdown-pre');
    expect(html).toContain('hljs');
    // highlight.js may normalize ts to typescript
    expect(html).toMatch(/language-(ts|typescript)/);
  });

  it('sanitizes script tags', () => {
    const wrapper = mount(MessageBubble, {
      props: {
        message: { ...baseMessage, content: '<script>alert("x")</script>Safe' }
      }
    });

    const html = wrapper.html();
    expect(html).toContain('Safe');
    expect(html).not.toContain('<script>');
  });
});
