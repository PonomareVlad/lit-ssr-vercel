import {LitElement, html} from "lit"
import {styleMap} from 'lit/directives/style-map.js'
import {serverUntil} from "@lit-labs/ssr-client/directives/server-until.js";

export class MyComponent extends LitElement {
    static get properties() {
        return {
            url: {type: String},
            hydrated: {state: true}
        }
    }

    firstUpdated() {
        this.url = location.href.replace(location.origin, '')
        this.hydrated = true
        this.scheduleUpdate()
    }

    hydrationStatus() {
        const styles = styleMap({color: this.hydrated ? 'greenyellow' : 'gold'})
        return html`<span style="${styles}">${this.hydrated ? 'Hydrated' : 'Not hydrated'}</span>`
    }

    render() {
        return html`<p>Path: ${this.url} (${this.hydrationStatus()})</p>
        <div>
            ${serverUntil(import('./async-component.mjs').then(() => html`
                <async-component></async-component>`), 'Loading...')}
        </div>`
    }
}

customElements.define('my-component', MyComponent);
