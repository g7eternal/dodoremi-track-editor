<script>
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  UIkit.use(Icons);

  import { onMount } from "svelte";
  import { appReady } from "$lib/utils/settings";

  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
  import Main from "$lib/Main.svelte";

  let pageReady = false;
  onMount(() => {
    pageReady = true;
  });
</script>

{#if pageReady && $appReady}
  <Main />
{:else}
  <LoadingSpinner ratio={3} />
{/if}

<style>
</style>
