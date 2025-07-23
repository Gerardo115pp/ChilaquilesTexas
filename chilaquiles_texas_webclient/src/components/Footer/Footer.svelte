<script>
    import { external_links } from "@app/common/page_paths";
</script>

<footer id="txc-vbpl-footer">
    <address id="txc-vbpl-footer-content">
        <a id="txc-vbpl-footer-contact-address" href="{external_links.ADDRESS}" class="txc-vbpl-footer-contact-item">
            702 E 11TH STREET, HOUSTON, TEXAS
        </a>
        <hgroup id="txc-vbpl-footer-open-days">
            <h4>
                SEVEN DAYS A WEEK / <strong>FROM 7AM TO 7PM</strong>
            </h4>
        </hgroup>
        <a id="txc-vbpl-footer-contact-email" href="{external_links.EMAIL}" class="txc-vbpl-footer-contact-item">
            hola@loschilaquiles.com
        </a>
        <a id="txc-vbpl-footer-contact-phone" href="{external_links.PHONE}" class="txc-vbpl-footer-contact-item">
            +1 832 469 7664
        </a>
    </address>
</footer>

<style>
    footer#txc-vbpl-footer {
        width: 100%;
        container-type: inline-size;
        font-size: var(--font-size-3);
        height: 2.6190em;
    }

    address#txc-vbpl-footer-content {
        display: flex;
        height: 100%;
        align-items: center;
        gap: max(1em, 5.6826cqw);
        font-style: normal;

        & a, h4 {
            text-decoration: none;
            font-size: 0.9523em;
            white-space: nowrap;
        }
    }

    hgroup#txc-vbpl-footer-open-days {
        display: flex;
        align-self: stretch;
        border: 1px solid currentColor;
        place-items: center;
        padding-inline: 1.1428em;

        & h4 {
            font-family: var(--font-read);
        }

        & h4 > strong {
            font-family: var(--font-titles);
        }
    }

    a#txc-vbpl-footer-contact-email, a#txc-vbpl-footer-contact-phone {
        font-family: var(--font-titles);
    }

</style>