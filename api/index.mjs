import '@svalit/dom-shim-edge/lib/install-global-dom-shim.js';
import render from "../includes/page.mjs";
import {html} from "lit";

import '../components/my-component.mjs';

const getUrlPath = url => {
    const location = new URL(url);
    return location.href.replace(location.origin, '')
}

const template = ({url}) => html`
    <my-component url="${getUrlPath(url)}"><span style="color: coral">Not rendered</span></my-component>`

export default req => render(template(req));

export const config = {runtime: 'edge'};
