import {LitElement, html, nothing, isServer} from "lit"
import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";

export class AsyncComponent extends LitElement {
    static get properties() {
        return {hydrated: {state: true}, ip: {state: true}}
    }

    async fetchIP(apiURL = 'https://api.ipify.org?format=json') {
        const response = await fetch(apiURL)
        const {ip} = await response.json()
        return this.ip = ip
    }

    firstUpdated() {
        requestAnimationFrame(() => this.hydrated = true)
    }

    render() {
        const ip = this.ip || ((isServer || this.hydrated) ? serverUntil(this.fetchIP()) : nothing)
        const updating = this.hydrated && !this.ip ? 'Updating...' : nothing
        return html`<span style="color: gray">Worker IP:</span> ${ip}
        <span style="color: coral">${updating}</span>`
    }
}

customElements.define('async-component', AsyncComponent)
