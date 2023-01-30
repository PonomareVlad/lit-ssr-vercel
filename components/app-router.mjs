import {html, unsafeStatic} from 'lit/static-html.js';
import {LitElement} from "lit";

import "./index-page.mjs";

export class AppRouter extends LitElement {

    static get properties() {
        return {
            page: {type: String}
        }
    }

    render() {
        const tag = unsafeStatic(`${this.page}-page`);
        return html`
            <${tag}></${tag}>${null} `;
    }

}

customElements.define('app-router', AppRouter);
