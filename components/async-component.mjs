import {LitElement, html} from "lit"
import {until} from 'lit/directives/until.js'

export class AsyncComponent extends LitElement {
    async fetchIP() {
        return await fetch('https://api.ipify.org?format=json').then(r => r.json()).then(({ip}) => ip)
    }

    render() {
        return html`<span style="color: gray">Worker IP:</span> ${until(this.fetchIP(), 'Loading...')}`
    }
}

customElements.define('async-component', AsyncComponent)
