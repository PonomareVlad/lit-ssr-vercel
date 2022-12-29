import '@svalit/dom-shim-edge';
import {html} from "lit";
import {render} from "@lit-labs/ssr/lib/render-lit-html.js";

import '../components/my-component.mjs';
import head from '../includes/head.mjs';
import footer from '../includes/footer.mjs';
import importMap from '../includes/importmap.json' assert {type: 'json'};

const importMapTag = `<script type="importmap">${JSON.stringify(importMap)}</script>`

const page = {
    before: `<!doctype html><html lang="en"><head>${head}${importMapTag}</head><body>`,
    after: `${footer}</body></html>`
}

const template = ({url}) => html`
    <my-component url="${url}"><span style="color: coral">Not rendered</span></my-component>`

export default req => {
    const encoder = new TextEncoder();
    const ssrResult = render(template(req));
    const readable = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(page.before));
        },
        async pull(controller) {
            const {value, done} = await ssrResult.next();
            if (done) {
                controller.enqueue(encoder.encode(page.after));
                return controller.close();
            }
            controller.enqueue(encoder.encode(value));
        },
    });
    return new Response(readable, {
        headers: {'Content-Type': 'text/html; charset=utf-8'},
    });
}

export const config = {
    runtime: 'edge',
}
