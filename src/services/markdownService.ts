import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  let langClass = 'language-plaintext';
  let highlighted = '';

  if (language && hljs.getLanguage(language)) {
    const { value } = hljs.highlight(code, { language });
    highlighted = value;
    langClass = `language-${language}`;
  } else {
    const { value, language: detectedLanguage } = hljs.highlightAuto(code);
    highlighted = value;
    langClass = detectedLanguage ? `language-${detectedLanguage}` : langClass;
  }

  return `<pre class="markdown-pre"><code class="hljs ${langClass}">${highlighted}</code></pre>`;
};

renderer.blockquote = (quote) => `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
renderer.table = (header, body) =>
  `<div class="markdown-table-wrapper"><table>${header}${body}</table></div>`;

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
  renderer
});

export function renderMarkdown(input: string): string {
  const content = input ?? '';
  if (!content.trim()) {
    return '';
  }

  const rawHtml = marked.parse(content);
  const resolvedHtml = typeof rawHtml === 'string' ? rawHtml : '';
  return DOMPurify.sanitize(resolvedHtml);
}
