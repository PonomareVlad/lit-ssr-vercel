import {LitElement, html} from "lit";

export class MyComponent extends LitElement {
    static get properties() {
        return {
            url: {type: String},
            hydrated: {state: true}
        }
    }

    firstUpdated() {
        this.url = location.href.replace(location.origin, '');
        this.hydrated = true;
    }

    hydrationStatus() {
        return this.hydrated ? html`<span style="color: greenyellow">Hydrated</span>` : html`
            <slot></slot>`
    }

    render() {
        return html`Path: ${this.url} (${this.hydrationStatus()})`;
    }
}

customElements.define('my-component', MyComponent);
