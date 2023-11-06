<script>
  import { backingAudio, playerOffset } from "$lib/utils/loader.js";

  function playOrPause() {
    $backingAudio[$backingAudio.paused ? "play" : "pause"]();
  }
  function stop() {
    $backingAudio.pause();
    $backingAudio.currentTime = 0;
    $playerOffset = 0;
  }
</script>

<div>
  <div>
    <div class="uk-button-group">
      <button type="button" class="uk-button uk-button-primary" title="Play/pause" on:click={playOrPause}>
        <span uk-icon="icon: play; ratio: 1.5" />
      </button>
      <button type="button" class="uk-button uk-button-danger" title="Restart" on:click={stop}>
        <span uk-icon="icon: refresh; ratio: 1.5" />
      </button>
    </div>
  </div>
</div>

<style>
  button {
    padding: 0 1em;
  }
</style>
