<script>
    import { external_links } from "@app/common/page_paths";
    import layout_properties from "@stores/layout/layout";
</script>

<main id="txc-pan-dulce-page"
    class="vbpl-page"
>
    <article id="txc-smp-content" class="txc-common-main-content-layout">
        {#if $layout_properties.ORIENTATION_LANDSCAPE}
            <p class="txc-smp-content-p main-content-paragraph">
                Pan dulce doesn't play second.<br/>
                It sets the tone.<br/>
                It's how we soften the morning,<br/>
                stretch a moment, or sweeten any hour.
            </p>
        {:else}
            <p class="txc-smp-content-p main-content-paragraph">
                Pan dulce doesn't play second.<br/>
                It sets the tone.<br/>
            </p>            
            <p class="txc-smp-content-p main-content-paragraph">
                It's how we soften the morning,<br/>
                stretch a moment, or sweeten any hour.
            </p>
        {/if}
        <p class="txc-smp-content-p main-content-paragraph">
            Pick one. Eat it whenever.<br/>
            Because breakfast, like pan dulce,<br/>
            has no rules.
        </p>
        <ul class="txc-ctas-container">
            <a href="{external_links.GENERIC_WORK_IN_PROGRESS}" class="txc-button">
                Our Pan Dulce is here
            </a>
        </ul>
    </article>
</main>