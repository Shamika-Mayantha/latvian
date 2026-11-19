import { stage1 } from "./units/stage1";
import { stage2 } from "./units/stage2";
import { stage3 } from "./units/stage3";
import { a01, a02, a03, a04 } from "./units/starter";
import { mock1 } from "./exams/mock1";
import { mock2 } from "./exams/mock2";
import { mock3 } from "./exams/mock3";
import type { Unit, Word } from "./types";

const [u01, u02, u03, u04, u05, u06] = stage1;
// A1 path: gentle starter units are interleaved with the original stage 1
export const units: Unit[] = [a01, u01, u02, a02, a03, u03, u04, u05, a04, u06, ...stage2, ...stage3];
/** 1-based position of a unit in the course */
export const unitNo = (u: { id: string }) => units.findIndex((x) => x.id === u.id) + 1;
export const exams = [mock1, mock2, mock3];

export const stages = [
  { n: 1, title: "A1 · Starting from zero", sub: "Sounds, greetings, yourself, things around you, numbers, family, time and your first verbs." },
  { n: 2, title: "A2 · Everyday life", sub: "The cases you need for food, shops, home, city, work, and the past tense." },
  { n: 3, title: "A2 · Exam-ready", sub: "Future, health, free time, holidays, asking questions and describing pictures." },
] as const;

export interface WordRef extends Word { id: string; unitId: string }

export const allWords: WordRef[] = units.flatMap((u) =>
  u.vocab.map((w, i) => ({ ...w, id: `${u.id}-${i}`, unitId: u.id })),
);

export const unitById = (id: string) => units.find((u) => u.id === id);
export const examById = (id: string) => exams.find((e) => e.id === id);

export type Part = "listening" | "reading" | "writing" | "speaking";
export const PARTS: { id: Part; lv: string; en: string; minutes: number; how: string }[] = [
  { id: "listening", lv: "Klausīšanās", en: "Listening", minutes: 25, how: "On a computer. 3 tasks. Each recording plays twice." },
  { id: "reading", lv: "Lasīšana", en: "Reading", minutes: 30, how: "On a computer. 3 tasks, about 700 words in total." },
  { id: "writing", lv: "Rakstīšana", en: "Writing", minutes: 35, how: "On paper, blue or black pen. 3 tasks." },
  { id: "speaking", lv: "Runāšana", en: "Speaking", minutes: 15, how: "Face to face or by video call, alone with the examiner." },
];
export const PASS = 9; // of 15, = 60 %
