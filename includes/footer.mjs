export default `
<script defer type="module">
    import 'lit/experimental-hydrate-support.js'
    import {hydrateShadowRoots} from '@webcomponents/template-shadowroot/template-shadowroot.js'

    if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
        hydrateShadowRoots(document.body)
    }

    import('/components/my-component.mjs')
</script>
<script async>
    globalThis.calcLoadTime = server => console.debug({client: Date.now() - globalThis.time, server});
</script>
`
