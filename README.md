## Lit SSR Template for Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPonomareVlad%2Flit-ssr-vercel&project-name=lit-ssr&repo-name=lit-ssr-vercel)

[Live demo](https://lit-ssr-template.vercel.app)

### Run locally

Install Vercel CLI

```bash
npm i -g vercel
```

Then run local dev server

```bash
vercel dev
```

Now you can make some changes in [components/my-component.mjs](components/my-component.mjs)

### Template structure:

- [api/index.mjs](api/index.mjs) — Server-side endpoint function
- [includes/head.html](includes/head.html) — Inner `<head>` content
- [includes/footer.html](includes/footer.html) — Before `</body>` content
- [includes/importmap.json](includes/importmap.json) — Import map for builder-less modules
