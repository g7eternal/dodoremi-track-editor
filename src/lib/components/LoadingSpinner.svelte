<script>
  import { fade } from "svelte/transition";

  export let ratio = 1;
</script>

<div class="spinner" transition:fade={{ duration: 200 }}>
  <div uk-spinner={`ratio: ${ratio}`} />
</div>

<style>
  .spinner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
