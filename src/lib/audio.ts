import map from "../data/audio-map.json";
import type { Voice } from "../data/types";
import { audioKey } from "./audioKey";

const files = map as Record<string, string>;
let current: HTMLAudioElement | null = null;
let token = 0;

export function hasAudio(text: string, v: Voice = "f") {
  return Boolean(files[audioKey(text, v)]);
}

export function stop() {
  token++;
  current?.pause();
  current = null;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function playOne(text: string, v: Voice, my: number, rate = 1): Promise<void> {
  return new Promise((resolve) => {
    if (my !== token) return resolve();
    const file = files[audioKey(text, v)];
    if (file) {
      const a = new Audio(`/audio/${file}`);
      a.playbackRate = rate;
      current = a;
      a.onended = () => resolve();
      a.onerror = () => resolve();
      a.play().catch(() => resolve());
      return;
    }
    // Fallback: the browser's own Latvian voice, if it has one
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "lv-LV";
      u.rate = 0.85 * rate;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      speechSynthesis.speak(u);
    } else resolve();
  });
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Play lines in order with a short pause between them. Resolves true if it finished without being stopped. */
export async function play(lines: { t: string; v: Voice }[], opts: { gap?: number; rate?: number } = {}) {
  stop();
  const my = token;
  for (let i = 0; i < lines.length; i++) {
    if (my !== token) return false;
    await playOne(lines[i].t, lines[i].v, my, opts.rate);
    if (i < lines.length - 1) await wait(opts.gap ?? 450);
  }
  return my === token;
}

export const say = (t: string, v: Voice = "f", rate = 1) => play([{ t, v }], { rate });
