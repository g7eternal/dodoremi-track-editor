<script>
  import { song } from "$lib/utils/loader.js";

  export let bold = false;
  export let offset;
</script>

<div class:bold style:bottom={`${offset + $song.guideStartOffset}px`} />

<style>
  div {
    width: 90%;
    height: 4px;
    opacity: 0.3;
    border-radius: 1rem;
    position: absolute;
    left: 5%;
    bottom: 0;
    z-index: 5;
    background-color: black;
    transform: translateY(50%);
  }
  div.bold {
    height: 12px;
  }
</style>
