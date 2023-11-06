<script>
  import RhythmGuide from "$lib/components/track/RhythmGuide.svelte";
  import Lane from "$lib/components/track/Lane.svelte";

  import { playerOffset, song, beatmap } from "$lib/utils/loader.js";
</script>

<aside>
  <div id="songTrack" style:height={`${$song.duration}px`} style:bottom={`-${$playerOffset}px`}>
    {#each $beatmap.lanes as lane}
      <Lane {lane} />
    {/each}
    {#each $song.guide as guide, guideIndex}
      <RhythmGuide bold={guideIndex % $song.guideMajorTiming === 0} offset={guide} />
    {/each}
  </div>
  <div class="timing-bar">
    <div class="timing-bar-content" />
  </div>
</aside>

<style>
  aside {
    min-width: 400px;
    width: 400px;
    height: 100%;
    max-height: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
  }

  #songTrack {
    width: 90%;
    overflow: hidden;
    position: absolute;
    left: 5%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
    transform: translateY(-100px);
  }

  .timing-bar {
    position: absolute;
    z-index: 20;
    bottom: 0;
    left: 2%;
    width: 96%;
    transform: translateY(-100px);
  }
  .timing-bar-content {
    width: 100%;
    height: 24px;
    border-radius: 1rem;
    background-color: silver;
    opacity: 0.3;
    transform: translateY(50%);
  }
</style>
