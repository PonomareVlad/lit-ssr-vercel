import {LitElement, html} from "lit"
import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";

export class AsyncComponent extends LitElement {
    static get properties() {
        return {ip: {state: true}, isClient: {state: true}}
    }

    async fetchIP() {
        return this.ip || (this.ip = await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(({ip}) => ip))
    }

    firstUpdated(_changedProperties) {
        this.isClient = true
    }

    render() {
        return html`<span style="color: gray">Worker IP:</span> ${serverUntil(this.fetchIP())}
        <span style="color: coral">${this.isClient && !this.ip ? 'Updating...' : ''}</span>`
    }
}

customElements.define('async-component', AsyncComponent)
