const STRIP: Record<string, string> = { ā: "a", č: "c", ē: "e", ģ: "g", ī: "i", ķ: "k", ļ: "l", ņ: "n", š: "s", ū: "u", ž: "z" };

export function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[“”„"«».,!?;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
export function stripMarks(s: string) {
  return s.replace(/[āčēģīķļņšūž]/g, (c) => STRIP[c] ?? c);
}

/** "ok" | "marks" (right except diacritics) | "wrong" */
export function check(input: string, accepted: string[]): "ok" | "marks" | "wrong" {
  const n = norm(input);
  if (accepted.some((a) => norm(a) === n)) return "ok";
  if (accepted.some((a) => stripMarks(norm(a)) === stripMarks(n))) return "marks";
  return "wrong";
}

export function wordCount(s: string) {
  return s.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
}

export function shuffle<T>(arr: T[], seed = Math.random()): T[] {
  const a = [...arr];
  let s = Math.floor(seed * 2 ** 31) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 48271) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
