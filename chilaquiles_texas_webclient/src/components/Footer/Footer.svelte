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
                SEVEN DAYS A WEEK / <strong>FROM 7AM TO 7PM</strong>
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

    a#txc-vbpl-footer-instagram {
        display: none;
    }

    /*=============================================
    =            Responsiveness            =
    =============================================*/
    
        @media (max-aspect-ratio: 0.98) {
            footer#txc-vbpl-footer {
                height: 9.7395dvh;
                font-size: calc(var(--font-size-4) * 1.169);

                & a, h4 {
                    font-size: 1em;
                }
            }

            address#txc-vbpl-footer-content {
                display: grid;
                grid-template-columns: 54.9171% 5.6353% 28.8397%;
                row-gap: normal;
                
                & hgroup#txc-vbpl-footer-open-days {
                    grid-column: 1 / -1;
                    grid-row: 1;
                    display: flex;
                    justify-content: center;
                    align-self: auto;
                    padding-inline: 0;
                    padding: calc(var(--spacing-3) * 0.90625) 0;
                }

                & hgroup#txc-vbpl-footer-open-days h4 {
                    font-size: 1.4285em;
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
                }

                & a#txc-vbpl-footer-contact-email {
                    display: none;
                }
            }
        }
    
    /*=====  End of Responsiveness  ======*/
    
    

</style>