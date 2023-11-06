export class Note {
  constructor(obj) {
    this.setNote(obj.note).setOffset(obj.start).setDuration(obj.duration);
  }

  setNote(note = 0) {
    this.note = note;
    return this;
  }

  setOffset(offset = 0) {
    this.offset = offset;
    return this;
  }

  setDuration(duration = 100) {
    this.duration = duration;
    return this;
  }

  toSimpleObject() {
    return {
      start: this.offset,
      duration: this.duration,
      note: this.note,
    };
  }
}

export class TrackLane {
  constructor(index = -1) {
    this.index = index;
    this.notes = new Map();
  }

  getNoteAt(offset) {
    return this.notes.get(offset) || null;
  }

  addNote(atOffset, note) {
    if (this.notes.has(atOffset)) {
      console.warn(`Track lane #${this.index} already has a note at offset ${atOffset}, cannot add another one!`);
      return;
    }
    this.notes.set(atOffset, note);
    return this;
  }

  removeNote(atOffset) {
    this.notes.delete(atOffset);
    return this;
  }

  getSortedNoteList() {
    const sortedNoteKeys = Array.from(this.notes.keys()).sort();
    return sortedNoteKeys.map((id) => this.notes.get(id));
  }
}

export class Beatmap {
  constructor(obj = {}) {
    this.slug = obj.slug;
    this.lanes = [];
    this.setLaneCount(obj.laneCount || 5);
  }

  getLane(index = -1) {
    return this.lanes[index];
  }

  setLaneCount(laneCount) {
    if (isNaN(laneCount)) return this;

    this.lanes.length = laneCount;
    for (let i = 0; i < laneCount; i++) {
      if (!this.lanes[i]) {
        this.lanes[i] = new TrackLane(i);
      } else {
        this.lanes[i].index = i;
      }
    }

    return this;
  }
}

export class Song {
  constructor(obj = {}) {
    this.slug = obj.slug; // song id

    this.duration = obj.duration || 60e3;
    this.scaleKey = obj.scaleKey || "f";
    this.scaleType = obj.scaleType || "major";

    this.guideStartOffset = obj.guideStartOffset || 0;
    this.guideMajorTiming = obj.guide?.[0]?.length || 4;
    this.guide = [];
    if (Array.isArray(obj.guide)) {
      for (const guidePortion of obj.guide) {
        this.guide.push(...guidePortion);
      }
    }

    this.beatmaps = new Map();
    if (Array.isArray(obj.beatmaps)) {
      for (const beatmap of obj.beatmaps) {
        const b = new Beatmap(beatmap);
        this.beatmaps.set(beatmap.slug, b);

        for (const input of beatmap.inputs) {
          if (Array.isArray(input.notes) && Array.isArray(input.lanes)) {
            input.notes.forEach((noteInfo, i) => {
              if (isNaN(input.lanes[i])) return;

              noteInfo.start = (noteInfo.start || 0) + (input.start || 0);
              const n = new Note(noteInfo);

              const lane = b.getLane(input.lanes[i]);
              lane.addNote(noteInfo.start, n);
            });
          }
        }
      }
    }
  }
}
