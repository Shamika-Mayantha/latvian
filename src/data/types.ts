// Voice for generated audio: f = Everita (female), m = Nils (male)
export type Voice = "f" | "m";

export interface Word {
  lv: string;
  en: string;
  /** optional note, e.g. plural or gender */
  note?: string;
}

export interface Table {
  head: string[];
  rows: string[][];
}

export interface GrammarBlock {
  title: string;
  /** Paragraphs. Supports **bold** only. */
  body: string[];
  table?: Table;
  examples?: { lv: string; en: string }[];
}

export interface Line {
  s: string; // speaker name
  v: Voice;
  lv: string;
  en: string;
}

export interface Dialogue {
  title: string;
  lines: Line[];
}

export type Exercise =
  | { type: "mc"; q: string; options: string[]; answer: number; explain?: string; say?: string; voice?: Voice }
  | { type: "fill"; q: string; answer: string[]; hint?: string; explain?: string }
  | { type: "order"; en: string; answer: string }
  | { type: "match"; pairs: [string, string][] }
  | { type: "listen"; say: string; voice?: Voice; q: string; options: string[]; answer: number; explain?: string };

export interface Unit {
  id: string;
  stage: 1 | 2 | 3;
  title: string;
  lvTitle: string;
  goal: string;
  /** Which exam parts this unit directly prepares for */
  exam: string;
  vocab: Word[];
  grammar: GrammarBlock[];
  dialogue: Dialogue;
  exercises: Exercise[];
}

/* ---------- Mock exam ---------- */

export interface Clip {
  lines: { v: Voice; t: string }[];
}

export interface ListeningExam {
  t1: { clip: Clip; q: string; options: string[]; answer: number }[]; // 6 × 1p
  t2: { clip: Clip; statements: { text: string; answer: boolean }[] }; // 4 × 1p
  t3: { items: { clip: Clip; sentence: string; answer: string }[]; bank: string[] }; // 5 × 1p
}

export interface ReadingExam {
  t1: { title: string; body: string[]; options: string[]; answer: number }[]; // 4 × 1p
  t2: { situations: { text: string; answer: string }[]; ads: { id: string; title: string; body: string }[] }; // 6 × 1p
  t3: { title: string; parts: (string | { options: string[]; answer: number })[] }; // 5 × 1p
}

export interface WritingExam {
  t1: { name: string; facts: { label: string; value: string }[]; ask: string; model: string }; // 4p
  t2: { intro: string; items: { before: string; base: string; after: string; answer: string[] }[] }; // 5p
  t3: { situation: string; points: string[]; minWords: number; model: string }; // 6p
}

export interface SpeakingExam {
  t1: { q: string; model: string }[];
  t2: { scenes: { title: string; description: string; helpers: string[]; model: string }[] };
  t3: { ads: { text: string; ask: string; model: string; keys: string[][] }[] }; // 3 × 1p
}

export interface MockExam {
  id: string;
  title: string;
  note?: string;
  listening: ListeningExam;
  reading: ReadingExam;
  writing: WritingExam;
  speaking: SpeakingExam;
}
