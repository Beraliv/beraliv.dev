# blog.beraliv.dev

This is the blog page where I write articles about TypeScript 🦺 and video players 📺

## Getting Started

First, install all dependencies

```bash
yarn
```

To be able to run the project, you run dev server

```bash
yarn dev
```

To be able to continue working on the project, you need to set environment variables:

1. [packages/blog2/src/functions/firebaseDb.ts](https://github.com/Beraliv/beraliv.dev/blob/main/packages/blog2/src/functions/firebaseDb.ts)

```ts
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
```

These variables are required to work with Firebase. In this particular project, it's connected to see and update the views for every article.

2. [packages/blog2/src/validators/validateEnvParameters.ts](https://github.com/Beraliv/beraliv.dev/blob/main/packages/blog2/src/validators/validateEnvParameters.ts)

```ts
const apiKey = process.env.CONVERTKIT_PUBLIC_KEY;
const formId = process.env.CONVERTKIT_SIGNUP_FORM_ID;
```

This part is connected to ConvertKit. On the bottom of the page you will see the form where they are used.

Once, you've set them all, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

- [Firebase](https://firebase.google.com/?gclsrc=aw.ds&gclid=Cj0KCQiA_JWOBhDRARIsANymNOZHP8ZGgGZaai_oWZ_L9ajH6IqX4FcM4Hfbi7094cCGAY2M057LbWAaAkO8EALw_wcB) - storing data
- [Formik](https://formik.org/) - building forms
- [MDX](https://mdxjs.com/) - write articles
  - [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - transform MDX to HTML
  - [gray-matter](https://github.com/jonschlinkert/gray-matter) - extract metadata from MDX
- [Next.js](https://nextjs.org/) - static rendering
- [Prism](https://github.com/FormidableLabs/prism-react-renderer) - code highlights
- [React](https://reactjs.org/) - building User Interfaces
- [SWR](https://github.com/vercel/swr) - data fetching
- [Vercel](https://vercel.com/) - deployment and serving content
