import {LitElement, html} from "lit"
import {until} from 'lit/directives/until.js'
import {ip, fetchIP} from '../utils/ip.mjs'

export class AsyncComponent extends LitElement {
    render() {
        const ipLoader = fetchIP()
        return html`<span style="color: gray">Worker IP:</span> ${until(ipLoader, ip)}
        <span style="color: coral">${until(ipLoader.then(() => null), 'Updating...')}</span>`
    }
}

customElements.define('async-component', AsyncComponent)
