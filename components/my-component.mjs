import {LitElement, html} from "lit"
import {styleMap} from 'lit/directives/style-map.js'

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
    }

    hydrationStatus() {
        const styles = styleMap({color: this.hydrated ? 'greenyellow' : 'gold'})
        return html`<span style="${styles}">${this.hydrated ? 'Hydrated' : 'Not hydrated'}</span>`
    }

    render() {
        return html`Path: ${this.url} (${this.hydrationStatus()})`
    }
}

const {customElements} = globalThis;

customElements.define('my-component', MyComponent);
