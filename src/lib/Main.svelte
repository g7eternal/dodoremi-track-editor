<script>
  import { fade } from "svelte/transition";
  import Controls from "./sections/Controls.svelte";
  import Track from "./sections/Track.svelte";
</script>

<div class="uk-flex uk-flex-row uk-height-1-1 uk-width-1-1" transition:fade={{ duration: 200 }}>
  <Controls />
  <Track />
</div>
