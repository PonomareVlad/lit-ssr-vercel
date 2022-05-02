import {render} from "@lit-labs/ssr/lib/render-with-global-dom-shim.js"
import {readFileSync} from 'fs'
import {html} from "lit"
import {fetchIP} from '../utils/ip.mjs'

import '../components/my-component.mjs'

const readFile = path => readFileSync(new URL(path, import.meta.url))

const head = readFile('../includes/head.html')
const footer = readFile('../includes/footer.html')
const importMap = `<script type="importmap">${readFile('../includes/importmap.json')}</script>`

const template = ({url}) => html`
    <my-component url="${url}"><span style="color: coral">Not rendered</span></my-component>`

export default async (req, res) => {
    res.write(`<!doctype html><html lang="en"><head>${head}${importMap}</head><body>`)
    await fetchIP();
    for await (const chunk of render(template(req))) res.write(chunk)
    res.end(`${footer}</body></html>`)
}
