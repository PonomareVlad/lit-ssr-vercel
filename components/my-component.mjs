import {LitElement, html} from "lit"
import {styleMap} from 'lit/directives/style-map.js'
import './async-component.mjs'

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
        return html`<p>Path: ${this.url} (${this.hydrationStatus()})</p>
        <async-component></async-component>`
    }
}

customElements.define('my-component', MyComponent);
