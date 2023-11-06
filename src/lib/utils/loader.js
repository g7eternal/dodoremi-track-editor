import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { Beatmap, Song } from "$lib/classes/song.js";

export const song = writable(new Song());
export const beatmap = writable(new Beatmap());
export const playerOffset = writable(0);
export const backingAudio = writable(browser ? new Audio() : null);

export function loadSong(obj) {
  const s = new Song(obj);

  const beatmaps = s.beatmaps.values();
  const firstBM = beatmaps.next();
  beatmap.set(firstBM.value || new Beatmap());

  song.set(s);
  return s;
}

export function loadBackingAudio(file) {
  const a = new Audio(file);
  a.load();

  const tick = function () {
    playerOffset.set(a.currentTime * 1e3);
    if (!a.paused) requestAnimationFrame(tick);
  };

  a.addEventListener("play", tick);
  a.addEventListener("seeked", tick);

  backingAudio.set(a);
  playerOffset.set(0);
}
