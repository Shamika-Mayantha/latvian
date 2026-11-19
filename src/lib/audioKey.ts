import type { Voice } from "../data/types";
export const audioKey = (text: string, v: Voice = "f") => `${v}|${text.trim()}`;
