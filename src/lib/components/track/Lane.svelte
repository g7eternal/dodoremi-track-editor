<script>
  import Note from "./Note.svelte";
  export let lane;
</script>

<div class="lane uk-light">
  <div class="lane-guide" />
  {#each [...lane.notes.values()] as note}
    <Note {note} />
  {/each}
</div>

<style>
  .lane {
    height: 100%;
    width: 50px;
    position: relative;
    display: flex;
  }
  .lane-guide {
    height: 100%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 2px;
    background-color: black;
    opacity: 0.33;
  }
</style>
