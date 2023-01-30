import {LitElement, html, isServer} from "lit";

export class IndexPage extends LitElement {

    static get properties() {
        return {
            url: {type: String},
            server: {type: Boolean}
        }
    }

    constructor() {
        super();
        if (!isServer) return;
        this.server = isServer;
        this.url = import.meta.url;
    }

    firstUpdated() {
        setTimeout(() => {
            this.server = isServer;
            this.url = import.meta.url
        }, 1000);
    }

    render() {
        return html`
            <h1>IndexPage</h1>
            <p>IsServer: ${this.server}</p>
            <p>Module url: ${this.url}</p>`;
    }

}

customElements.define('index-page', IndexPage);
