import {render} from "@lit-labs/ssr/lib/render-lit-html.js";
import {withAsync, iteratorToStream} from "@svalit/edge";

import head from '../includes/head.mjs';
import footer from '../includes/footer.mjs';
import importMap from '../includes/importmap.mjs';

const importMapTag = `<script type="importmap">${JSON.stringify(importMap, null, 4)}</script>`

export const page = {
    headers: {'Content-Type': 'text/html; charset=utf-8'},
    before: `<!doctype html><html lang="en"><head>${head}${importMapTag}</head><body>`,
    after: `${footer}</body></html>`,
}

export default function (templateResult, {before, after, headers} = page) {
    const iterator = withAsync(render(templateResult));
    const readable = iteratorToStream(iterator, {before, after});
    return new Response(readable, {headers});
}
