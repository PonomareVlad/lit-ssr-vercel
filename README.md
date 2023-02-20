## Lit SSR Template for Vercel

With [async component](components/async-component.mjs) based
on [fork](https://github.com/PonomareVlad/lit/tree/lit-async) of Lit, that provides ability for async
rendering in a Vercel Edge Runtime (worker)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPonomareVlad%2Flit-ssr-vercel%2Ftree%2Fasync-edge&project-name=lit-ssr&repo-name=lit-ssr-vercel)

[Live demo](https://lit-ssr-async-edge-template.vercel.app)

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
- [includes/page.mjs](includes/page.mjs) — Page template renderer
- [includes/head.mjs](includes/head.mjs) — Inner `<head>` content
- [includes/footer.mjs](includes/footer.mjs) — Before `</body>` content
- [includes/importmap.json](includes/importmap.json) — Import map for builder-less modules
