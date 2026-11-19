// Collects every Latvian string the app can speak and writes:
//   scripts/audio-manifest.json  (for gen_audio.py)
//   src/data/audio-map.json      (key -> file, imported by the app)
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { units, exams } from "../src/data/index";
import { audioKey } from "../src/lib/audioKey";
import type { Voice } from "../src/data/types";

const items = new Map<string, { file: string; v: Voice; t: string }>();
const add = (t: string, v: Voice = "f") => {
  const text = t.trim();
  if (!text) return;
  const key = audioKey(text, v);
  if (items.has(key)) return;
  const file = createHash("sha1").update(key).digest("hex").slice(0, 12) + ".mp3";
  items.set(key, { file, v, t: text });
};

for (const u of units) {
  u.vocab.forEach((w) => add(w.lv));
  u.dialogue.lines.forEach((l) => add(l.lv, l.v));
  for (const e of u.exercises) {
    if (e.type === "listen") add(e.say, e.voice ?? "f");
    if (e.type === "mc" && e.say) add(e.say, e.voice ?? "f");
    if (e.type === "order") add(e.answer);
  }
}
for (const x of exams) {
  const L = x.listening;
  L.t1.forEach((i) => i.clip.lines.forEach((l) => add(l.t, l.v)));
  L.t2.clip.lines.forEach((l) => add(l.t, l.v));
  L.t3.items.forEach((i) => i.clip.lines.forEach((l) => add(l.t, l.v)));
  x.speaking.t1.forEach((q) => { add(q.q, "m"); add(q.model, "f"); });
  x.speaking.t2.scenes.forEach((s) => add(s.model, "f"));
  x.speaking.t3.ads.forEach((a) => add(a.model, "f"));
  add(x.writing.t1.model, "f");
}

// Landing page sample
add("Koncerts sāksies svētdien, trešajā maijā, pulksten vienpadsmitos.");

const list = [...items.values()];
writeFileSync("scripts/audio-manifest.json", JSON.stringify(list, null, 0));
const map: Record<string, string> = {};
for (const [k, v] of items) map[k] = v.file;
writeFileSync("src/data/audio-map.json", JSON.stringify(map));
console.log(`${list.length} audio items`);
