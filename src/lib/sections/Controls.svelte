<script>
  import BeatmapSelector from "$lib/components/controls/BeatmapSelector.svelte";
  import SongLoader from "$lib/components/controls/SongLoader.svelte";
  import { backingAudio, song } from "$lib/utils/loader.js";
</script>

<main>
  <h1><img src="favicon.ico" alt="Icon" width="48" height="48" /> <b>Dodo Re Mi</b> Track Editor</h1>

  <SongLoader />

  {#if $song.slug && $backingAudio.src}
    <BeatmapSelector />
  {/if}
</main>

<style>
  main {
    padding: 1rem;
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
  }
  h1 img {
    vertical-align: middle;
  }
</style>
