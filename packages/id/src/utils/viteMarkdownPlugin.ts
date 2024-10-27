import { PluginOption } from "vite";

import markdownIt from "markdown-it";
import frontmatter from "front-matter";

const markdown = markdownIt({
  html: true,
  linkify: true,
});

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\\`]/g, "\\$&");

/**
 * Adds support to import markdown files, parse its frontmatter (attributes),
 * convert Markdown to HTML and export it as JS module
 */
export const viteMarkdownPlugin = (): PluginOption => {
  return {
    name: "markdown",
    transform: (code, id) => {
      // excluded non-*.md files

      if (!/\.md$/.test(id)) {
        return;
      }

      const markdownContent = frontmatter(code);
      const html = markdown.render(markdownContent.body);

      return {
        code: `
            export const attributes = ${JSON.stringify(
              markdownContent.attributes
            )};
            export const body = \`${escapeRegex(html)}\`;
        `,
      };
    },
  };
};
