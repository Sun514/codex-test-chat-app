import { describe, expect, it } from 'vitest';

import { renderMarkdown } from '@/services/markdownService';

describe('markdownService', () => {
  it('renders markdown to HTML', () => {
    const html = renderMarkdown('**Bold Text**');
    expect(html).toContain('<strong>Bold Text</strong>');
  });

  it('wraps fenced code blocks with markdown classes', () => {
    const html = renderMarkdown('```js\nconst x = 1 < 2;\n```');
    expect(html).toContain('class="markdown-pre"');
    expect(html).toContain('hljs');
    expect(html).toContain('language-js');
    expect(html).toContain('&lt;'); // ensure code is escaped appropriately
  });

  it('renders blockquotes with custom styling class', () => {
    const html = renderMarkdown('> hello');
    expect(html).toContain('markdown-blockquote');
  });

  it('sanitizes potentially unsafe HTML', () => {
    const html = renderMarkdown('<img src=x onerror="alert(1)" />');
    expect(html).not.toContain('onerror');
  });
});
