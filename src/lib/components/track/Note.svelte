<script>
  export let note;
</script>

<div uk-marker class="note" style:left="50%" style:bottom={`${note.offset}px`} />
<div
  class="note-duration"
  class:note-duration-hidden={note.duration < 500}
  style:left="50%"
  style:bottom={`${note.offset}px`}
  style:height={`${note.duration}px`}
/>

<style>
  .note {
    position: absolute;
    transform: translate(-50%, 50%);
    z-index: 9;
    left: 50%;
  }
  .note-duration {
    background-color: aliceblue;
    position: absolute;
    left: 50%;
    width: 0.75rem;
    transform: translateX(-50%);
    z-index: 8;
    border: 0;
    border-radius: 0.75rem;
  }
  .note-duration-hidden {
    visibility: hidden;
  }
</style>
