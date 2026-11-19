import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./auth";
import type { Part } from "../data";

export interface LessonRow { lesson_id: string; score: number; max_score: number; completed_at: string }
export interface AttemptRow { id: number; exam_id: string; part: Part; score: number; max_score: number; created_at: string }
export interface VocabRow { word_id: string; box: number; due_at: string }
export interface Profile { display_name: string | null; exam_date: string | null }

interface Progress {
  ready: boolean;
  lessons: Record<string, LessonRow>;
  attempts: AttemptRow[];
  vocab: Record<string, VocabRow>;
  profile: Profile;
  saveLesson: (id: string, score: number, max: number) => Promise<void>;
  saveAttempt: (examId: string, part: Part, score: number) => Promise<void>;
  saveVocab: (rows: VocabRow[]) => Promise<void>;
  saveProfile: (p: Partial<Profile>) => Promise<void>;
  error: string | null;
}

const Ctx = createContext<Progress | null>(null);

/** Leitner review intervals in days, for boxes 0..5 */
export const BOX_DAYS = [0, 1, 3, 7, 14, 30];

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [lessons, setLessons] = useState<Record<string, LessonRow>>({});
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [vocab, setVocab] = useState<Record<string, VocabRow>>({});
  const [profile, setProfile] = useState<Profile>({ display_name: null, exam_date: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setReady(false); return; }
    let live = true;
    (async () => {
      const [l, a, v, p] = await Promise.all([
        supabase.from("lv_lesson_progress").select("lesson_id,score,max_score,completed_at"),
        supabase.from("lv_exam_attempts").select("id,exam_id,part,score,max_score,created_at").order("created_at", { ascending: false }),
        supabase.from("lv_vocab_review").select("word_id,box,due_at"),
        supabase.from("lv_profiles").select("display_name,exam_date").maybeSingle(),
      ]);
      if (!live) return;
      const err = l.error || a.error || v.error || p.error;
      if (err) setError(err.message);
      setLessons(Object.fromEntries((l.data ?? []).map((r) => [r.lesson_id, r as LessonRow])));
      setAttempts(((a.data ?? []) as AttemptRow[]).map((r) => ({ ...r, score: Number(r.score) })));
      setVocab(Object.fromEntries((v.data ?? []).map((r) => [r.word_id, r as VocabRow])));
      setProfile((p.data as Profile | null) ?? { display_name: (user.user_metadata?.name as string) ?? null, exam_date: null });
      setReady(true);
    })();
    return () => { live = false; };
  }, [user]);

  const saveLesson = useCallback(async (id: string, score: number, max: number) => {
    if (!user) return;
    const prev = lessons[id];
    if (prev && prev.score > score) return; // keep the best result
    const row = { lesson_id: id, score, max_score: max, completed_at: new Date().toISOString() };
    setLessons((s) => ({ ...s, [id]: row }));
    const { error } = await supabase.from("lv_lesson_progress").upsert({ ...row, user_id: user.id });
    if (error) setError(error.message);
  }, [user, lessons]);

  const saveAttempt = useCallback(async (examId: string, part: Part, score: number) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("lv_exam_attempts")
      .insert({ user_id: user.id, exam_id: examId, part, score, max_score: 15 })
      .select("id,exam_id,part,score,max_score,created_at")
      .single();
    if (error) setError(error.message);
    if (data) setAttempts((s) => [{ ...(data as AttemptRow), score: Number(data.score) }, ...s]);
  }, [user]);

  const saveVocab = useCallback(async (rows: VocabRow[]) => {
    if (!user || !rows.length) return;
    setVocab((s) => ({ ...s, ...Object.fromEntries(rows.map((r) => [r.word_id, r])) }));
    const { error } = await supabase.from("lv_vocab_review").upsert(rows.map((r) => ({ ...r, user_id: user.id })));
    if (error) setError(error.message);
  }, [user]);

  const saveProfile = useCallback(async (p: Partial<Profile>) => {
    if (!user) return;
    const next = { ...profile, ...p };
    setProfile(next);
    const { error } = await supabase.from("lv_profiles").upsert({ user_id: user.id, ...next });
    if (error) setError(error.message);
  }, [user, profile]);

  return (
    <Ctx.Provider value={{ ready, lessons, attempts, vocab, profile, saveLesson, saveAttempt, saveVocab, saveProfile, error }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProgress() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useProgress used outside ProgressProvider");
  return c;
}

/** Per part: average of the last 3 attempts, the last score and the attempt count. */
export function readiness(attempts: AttemptRow[]) {
  const parts: Part[] = ["listening", "reading", "writing", "speaking"];
  return Object.fromEntries(
    parts.map((p) => {
      const all = attempts.filter((a) => a.part === p);
      const rows = all.slice(0, 3);
      const avg = rows.length ? rows.reduce((s, r) => s + r.score, 0) / rows.length : null;
      return [p, { avg, last: rows[0]?.score ?? null, count: all.length }];
    }),
  ) as Record<Part, { avg: number | null; last: number | null; count: number }>;
}
