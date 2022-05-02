import {render} from "@lit-labs/ssr/lib/render-with-global-dom-shim.js"
import {readableFrom} from '@lit-labs/ssr/lib/readable.js';
import {readFileSync} from 'fs'
import {html} from "lit"

import '../components/my-component.mjs'

const readFile = path => readFileSync(new URL(path, import.meta.url))

const head = readFile('../includes/head.html')
const footer = readFile('../includes/footer.html')
const importMap = `<script type="importmap">${readFile('../includes/importmap.json')}</script>`

const template = ({url}) => html`
    <my-component url="${url}"><span style="color: coral">Not rendered</span></my-component>`

export default async (req, res) => {
    const stream = readableFrom(render(template(req)), true)
    res.write(`<!doctype html><html lang="en"><head>${head}${importMap}</head><body>`)
    stream.on('end', () => res.end(`${footer}</body></html>`))
    stream.pipe(res, {end: false})
}
