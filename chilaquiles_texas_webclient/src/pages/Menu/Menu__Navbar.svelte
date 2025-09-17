<script>
    import { website_page_paths } from "@app/common/page_paths";
    import LosChilaquilesLogo from "@components/icons/LosChilaquilesLogo.svelte";

</script>

<nav id="txc-ic-menu-navbar">
    <div id="rmp-mn-logo-wrapper">
        <a href="{website_page_paths.HOME.path}">
            <LosChilaquilesLogo />
        </a>
    </div>
</nav>

<style>
    nav#txc-ic-menu-navbar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #rmp-mn-logo-wrapper {
        width: min(200px, 9.5%);

        & > a {
            width: 100%;
        }
    }
</style>