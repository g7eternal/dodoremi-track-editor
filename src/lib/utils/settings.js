import { browser } from "$app/environment";
import { writable } from "svelte/store";

const lsKey = "dodoremi-editor-settings";

const defaultSettings = {
  // add settings here
};

export const settings = writable(Object.assign({}, defaultSettings));
export const appReady = writable(false);

try {
  if (!browser) throw new Error("Not a browser, skip loading settings");

  let parsedSettings = null;
  const storedSettings = localStorage.getItem(lsKey);

  if (storedSettings) {
    parsedSettings = JSON.parse(storedSettings);
  }
  if (parsedSettings) {
    settings.update((s) => {
      for (let key in parsedSettings) {
        if (key in defaultSettings) {
          if (defaultSettings[key] instanceof Date) {
            s[key] = new Date(parsedSettings[key]);
          } else {
            s[key] = parsedSettings[key];
          }
        }
      }
      return s;
    });
  }
} catch (e) {
  console.warn("Failed to restore settings from localStorage", e);
} finally {
  // subscribe an auto-saver
  if (browser) {
    settings.subscribe((s) => {
      localStorage.setItem(lsKey, JSON.stringify(s));
    });
  }

  // do first update
  settings.update((s) => {
    // validate according to default settings list
    for (let key in defaultSettings) {
      s[key] = key in s ? s[key] : defaultSettings[key];
    }
    return s;
  });

  // set ready flag to True as we finished parsing settings
  appReady.set(true);
}

export function setOption(key, value) {
  settings.update((s) => {
    if (value === undefined) value = !s[key]; // toggler behavior
    s[key] = value;
    return s;
  });
}
