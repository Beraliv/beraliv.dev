# blog.beraliv.dev

This is the blog page where I write articles about TypeScript 🦺 and video players 📺

## Getting Started

First, install all dependencies

```bash
pnpm install
```

To be able to run the project, you run dev server

```bash
pnpm --filter blog2 dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

- [MDX](https://mdxjs.com/) - write articles
  - [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - transform MDX to HTML
  - [gray-matter](https://github.com/jonschlinkert/gray-matter) - extract metadata from MDX
- [Next.js](https://nextjs.org/) - static rendering
- [Prism](https://github.com/FormidableLabs/prism-react-renderer) - code highlights
- [React](https://reactjs.org/) - building User Interfaces
- [SWR](https://github.com/vercel/swr) - data fetching
- [Vercel](https://vercel.com/) - deployment and serving content
