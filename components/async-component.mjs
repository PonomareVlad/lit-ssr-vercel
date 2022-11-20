import {LitElement, html, isServer, noChange} from "lit"
import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";

export class AsyncComponent extends LitElement {
    async fetchIP(apiURL = 'https://api.ipify.org?format=json') {
        return await fetch(apiURL).then(r => r.json()).then(({ip}) => ip + ` (${isServer ? 'SSR' : 'CSR'})`)
    }

    firstUpdated() {
        this.scheduleUpdate();
    }

    render() {
        const ip = isServer || this.hasUpdated ? serverUntil(this.fetchIP(), 'Loading...') : noChange
        return html`<span style="color: gray">Worker IP:</span> ${ip}`
    }
}

customElements.define('async-component', AsyncComponent)
