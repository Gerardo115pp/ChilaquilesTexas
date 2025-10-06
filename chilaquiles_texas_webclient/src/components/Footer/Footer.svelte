<script>
    import { external_links } from "@app/common/page_paths";
    import InstagramIcon from "@components/icons/InstagramIcon.svelte";
</script>

<footer id="txc-vbpl-footer">
    <address id="txc-vbpl-footer-content">
        <a 
            id="txc-vbpl-footer-contact-address"
            target="_blank"
            rel="noopener noreferrer"
            href="{external_links.ADDRESS}"
            class="txc-vbpl-footer-contact-item"
        >
            702 E 11TH STREET, HOUSTON, TEXAS
        </a>
        <hgroup id="txc-vbpl-footer-open-days">
            <h4>
                SEVEN DAYS A WEEK / <strong>FROM 7AM TO 3PM</strong>
            </h4>
        </hgroup>
        <a 
            id="txc-vbpl-footer-contact-email"
            target="_blank"
            rel="noopener noreferrer"
            href="{external_links.EMAIL}"
            class="txc-vbpl-footer-contact-item"
        >
            hola@loschilaquiles.com
        </a>
        <a 
            id="txc-vbpl-footer-instagram"
            target="_blank"
            rel="noopener noreferrer"
            href="{external_links.INSTAGRAM}" 
            class="txc-nv-cl-socials-item-icon-wrapper"
        >
            <InstagramIcon />
        </a>
        <a 
            id="txc-vbpl-footer-contact-phone"
            target="_blank"
            rel="noopener noreferrer"
            href="{external_links.PHONE}"
            class="txc-vbpl-footer-contact-item"
        >
            +1 832 469 7664
        </a>
    </address>
</footer>

<style>
    footer#txc-vbpl-footer {
        width: 100%;
        container-type: inline-size;
        container-name: vbpl-footer;
        font-size: var(--font-size-3);
    }
    
    address#txc-vbpl-footer-content {
        display: flex;
        align-items: center;
        height: 2.6190em;
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

    a#txc-vbpl-footer-instagram {
        display: none;
    }

    /*=============================================
    =            Responsiveness            =
    =============================================*/

        /* @media (max-width: 1300px) {
            footer#txc-vbpl-footer {
                font-size: min(var(--font-size-3), 1.5svh);
            }
        } */

        @container vbpl-footer (980px < width <= 1300px) {
            address#txc-vbpl-footer-content {
                font-size: 1.4cqw;
                column-gap: 1.7em;
            }
        }

        @container (width <= 980px) {

            address#txc-vbpl-footer-content {
                display: grid;
                width: 100%;
                grid-template-columns: auto min(26px, 5.6353%) 28.8397%;
                column-gap: 3%;
                font-size: 2.4cqw;
                row-gap: min(10px, 0.5em);
                
                & hgroup#txc-vbpl-footer-open-days {
                    grid-column: 1 / -1;
                    grid-row: 1;
                    display: flex;
                    justify-content: center;
                    align-self: auto;
                    padding-inline: 0;
                    padding: min(13px, calc(var(--spacing-3) * 0.90625)) 0;
                }

                & hgroup#txc-vbpl-footer-open-days h4 {
                    font-size: 1.1285em;
                }

                & a#txc-vbpl-footer-contact-address {
                    grid-column: 1 / span 1;
                    grid-row: 2;
                }

                & a#txc-vbpl-footer-instagram {
                    grid-column: 2 / span 1;
                    display: block;
                    aspect-ratio: 1 / 1;
                    grid-row: 2;
                }

                & a#txc-vbpl-footer-contact-phone {
                    grid-column: 3 / span 1;
                    grid-row: 2;
                    text-align: right;
                }

                & a#txc-vbpl-footer-contact-email {
                    display: none;
                }
            }
        }

        @container (width <= 400px) {
            address#txc-vbpl-footer-content {
                font-size: 3cqw;
            }
        }

    
        @media (max-aspect-ratio: 0.98) {
            footer#txc-vbpl-footer {
                height: 9.7395dvh;
                font-size: calc(var(--font-size-4) * 1.169);
            }
        }
    
    /*=====  End of Responsiveness  ======*/

</style>