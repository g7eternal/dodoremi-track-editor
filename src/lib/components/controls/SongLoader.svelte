<script>
  import UIkit from "uikit";
  import { backingAudio, loadBackingAudio, playerOffset, loadSong } from "$lib/utils/loader.js";

  async function loadSongConfig(event) {
    const target = event.currentTarget || event.target;
    const files = target?.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    try {
      $backingAudio.pause();

      const data = new Response(file);
      const json = await data.json();
      loadSong(json);

      $backingAudio.currentTime = 0;
      $playerOffset = 0;
    } catch (e) {
      console.error(e);
      UIkit.modal.alert(`Failed to load file: ${e.message}`);
    }
  }

  async function loadSongAudio(event) {
    const target = event.currentTarget || event.target;
    const files = target?.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    try {
      $backingAudio.pause();

      const blob = window.URL || window.webkitURL;
      loadBackingAudio(blob.createObjectURL(file));
    } catch (e) {
      console.error(e);
      UIkit.modal.alert(`Failed to load audio file: ${e.message}`);
    }
  }
</script>

<form class="uk-form-horizontal">
  <div>
    <label class="uk-form-label" for="songConfigLoader"> Choose song config file: </label>
    <div class="uk-form-controls">
      <input
        type="file"
        class="uk-input"
        id="songConfigLoader"
        accept="application/json, text/json"
        on:change={loadSongConfig}
      />
    </div>
  </div>
  <div>
    <label class="uk-form-label" for="songAudioLoader"> Choose audio backing track: </label>
    <div class="uk-form-controls">
      <input type="file" class="uk-input" id="songAudioLoader" accept="audio/ogg" on:change={loadSongAudio} />
    </div>
  </div>
</form>
