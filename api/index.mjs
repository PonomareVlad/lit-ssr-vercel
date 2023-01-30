import {render} from "@lit-labs/ssr/lib/render-with-global-dom-shim.js"
import {readFileSync} from 'fs'
import {html} from "lit"

import '../components/app-router.mjs'

const readFile = path => readFileSync(new URL(path, import.meta.url))

const head = readFile('../includes/head.html')
const footer = readFile('../includes/footer.html')
const importMap = `<script type="importmap">${readFile('../includes/importmap.json')}</script>`

const template = () => html`
    <app-router page="index"></app-router>`

export default async (req, res) => {
    res.write(`<!doctype html><html lang="en"><head>${head}${importMap}</head><body>`)
    for await (const chunk of render(template(req))) res.write(chunk)
    res.end(`${footer}</body></html>`)
}
