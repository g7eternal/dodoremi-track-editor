<script>
  import MediaControls from "$lib/components/controls/MediaControls.svelte";
  import { song, beatmap } from "$lib/utils/loader.js";

  function chooseBeatmap(event) {
    const value = event.target?.value;

    const b = $song.beatmaps.get(value);
    if (!b) {
      console.error(`Beatmap [${value}] was not found!`);
      return;
    }
    $beatmap = b;
  }
</script>

<div class="uk-margin">
  <label class="uk-form-label" for="beatmapSelector"> Choose beatmap: </label>
  <div class="uk-flex">
    <select id="beatmapSelector" class="uk-select uk-flex-grow-1" aria-label="Select" on:change={chooseBeatmap}>
      {#each Array.from($song.beatmaps.keys()) as mapKey}
        <option selected={$beatmap.slug === mapKey}>{mapKey}</option>
      {/each}
    </select>

    <MediaControls />
  </div>
</div>
