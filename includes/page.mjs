import {render} from "@lit-labs/ssr/lib/render-lit-html.js";

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
    const encoder = new TextEncoder();
    const iterable = render(templateResult);
    const readable = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(before));
        },
        async pull(controller) {
            const {value, done} = await iterable.next();
            if (done) {
                controller.enqueue(encoder.encode(after));
                return controller.close();
            }
            controller.enqueue(encoder.encode(value));
        },
    });
    return new Response(readable, {headers});
}
