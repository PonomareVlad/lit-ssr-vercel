import {LitElement, html} from "lit"
import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";

export class AsyncComponent extends LitElement {
    async fetchIP(apiURL = 'https://api.ipify.org?format=json') {
        return await fetch(apiURL).then(r => r.json()).then(({ip}) => ip)
    }

    render() {
        return html`<span style="color: gray">Worker IP:</span> ${serverUntil(this.fetchIP(), 'Loading...')}`
    }
}

customElements.define('async-component', AsyncComponent)
