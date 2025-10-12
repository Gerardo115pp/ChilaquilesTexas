<script>
    import AddressLabel from "@components/InformationElements/AddressLabel.svelte";
    import EmailLabel from "@components/InformationElements/EmailLabel.svelte";
    import InstagramLink from "@components/InformationElements/InstagramLink.svelte";
    import OpenHoursLabel from "@components/InformationElements/OpenHoursLabel.svelte";
    import PhoneLabel from "@components/InformationElements/PhoneLabel.svelte";
</script>

<footer id="txc-vbpl-footer">
    <address id="txc-vbpl-footer-content">
        <div id="txc-vbpl-footer-contact-address-container" class="txc-vbpl-footer-contact-item">
            <AddressLabel />
        </div>
        <div id="txc-vbpl-footer-open-days-container" class="txc-vbpl-footer-contact-item">
            <OpenHoursLabel /> 
        </div>
        <div id="txc-vbpl-footer-contact-email-container" class="txc-vbpl-footer-contact-item">
            <EmailLabel />
        </div>
        <div id="txc-vbpl-footer-contact-instagram-link-container" class="txc-vbpl-footer-contact-item">
            <InstagramLink />
        </div>
        <div id="txc-vbpl-footer-contact-phone-container" class="txc-vbpl-footer-contact-item">
            <PhoneLabel />
        </div>
    </address>
</footer>

<style>
    footer#txc-vbpl-footer {
        width: 100%;
        container-type: inline-size;
        container-name: vbpl-footer;
    }
    
    address#txc-vbpl-footer-content {
        display: flex;
        align-items: center;
        height: max-content;
        justify-content: space-between;
        /* gap: 5cqw; */
        font-style: normal;
        --txc-links-size: 1.25cqw;
    }

    #txc-vbpl-footer-contact-phone-container {
        font-family: var(--font-titles);
    }

    #txc-vbpl-footer-contact-instagram-link-container {
        display: none;
    }

    /*=============================================
    =            Responsiveness            =
    =============================================*/

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
                grid-template-columns: auto 4cqw 28.8397%;
                column-gap: 3%;
                font-size: 2.6cqw;
                --txc-links-size: 1em;
                row-gap: min(10px, 0.5em);
                
                & #txc-vbpl-footer-open-days-container {
                    grid-column: 1 / -1;
                    grid-row: 1;
                    align-self: auto;
                    --txc-links-size: 1.1285em;
                }

                & #txc-vbpl-footer-contact-address-container {
                    grid-column: 1 / span 1;
                    grid-row: 2;
                }

                & #txc-vbpl-footer-contact-instagram-link-container {
                    grid-column: 2 / span 1;
                    display: block;
                    aspect-ratio: 1 / 1;
                    grid-row: 2;
                }

                & #txc-vbpl-footer-contact-phone-container {
                    grid-column: 3 / span 1;
                    grid-row: 2;
                    text-align: right;
                }

                & #txc-vbpl-footer-contact-email-container {
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