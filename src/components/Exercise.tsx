import { useMemo, useState } from "react";
import type { Exercise } from "../data/types";
import { check, norm, shuffle } from "../lib/text";
import { say } from "../lib/audio";
import { AudioButton, LvInput } from "./ui";

const KEYS = "ABCDEF";

export function ExerciseView({ ex, n, onDone }: { ex: Exercise; n: number; onDone: (correct: boolean) => void }) {
  return (
    <div className="ex">
      <div className="qn">{String(n).padStart(2, "0")} · {LABEL[ex.type]}</div>
      {ex.type === "mc" && <MC ex={ex} onDone={onDone} />}
      {ex.type === "listen" && <MC ex={{ ...ex, type: "mc" }} listen onDone={onDone} />}
      {ex.type === "fill" && <Fill ex={ex} onDone={onDone} />}
      {ex.type === "order" && <Order ex={ex} onDone={onDone} />}
      {ex.type === "match" && <Match ex={ex} onDone={onDone} />}
    </div>
  );
}

const LABEL: Record<Exercise["type"], string> = {
  mc: "Choose", listen: "Listen and choose", fill: "Type the word", order: "Build the sentence", match: "Match the pairs",
};

function MC({ ex, onDone, listen }: { ex: Extract<Exercise, { type: "mc" }> | (Extract<Exercise, { type: "listen" }> & { type: "mc" }); onDone: (c: boolean) => void; listen?: boolean }) {
  const [pick, setPick] = useState<number | null>(null);
  const done = pick !== null;
  const say_ = "say" in ex ? ex.say : undefined;
  return (
    <>
      {listen && say_ && (
        <div className="row" style={{ marginBottom: 8 }}>
          <AudioButton big text={say_} v={ex.voice ?? "f"} label="Play the recording" />
          <span className="muted small">Press play. You can listen as many times as you like here (twice in the exam).</span>
        </div>
      )}
      <div className="q">{ex.q}</div>
      <div className="opts">
        {ex.options.map((o, i) => {
          const cls = !done ? "" : i === ex.answer ? "ok" : i === pick ? "bad" : "";
          return (
            <button key={i} type="button" className={`opt ${cls}`} disabled={done} onClick={() => { setPick(i); onDone(i === ex.answer); }}>
              <span className="k">{KEYS[i]}</span>{o}
            </button>
          );
        })}
      </div>
      {done && (
        <div className={`fb ${pick === ex.answer ? "ok" : "bad"}`}>
          {pick === ex.answer ? "Correct." : `Answer: ${ex.options[ex.answer]}.`} {ex.explain}
          {listen && say_ && <div className="muted" style={{ marginTop: 6 }}>You heard: <span className="lv">“{say_}”</span></div>}
        </div>
      )}
    </>
  );
}

function Fill({ ex, onDone }: { ex: Extract<Exercise, { type: "fill" }>; onDone: (c: boolean) => void }) {
  const [val, setVal] = useState("");
  const [res, setRes] = useState<"ok" | "marks" | "wrong" | null>(null);
  const submit = () => {
    if (!val.trim() || res) return;
    const r = check(val, ex.answer);
    setRes(r);
    onDone(r === "ok");
  };
  return (
    <>
      <div className="q lv">{ex.q}</div>
      <div style={{ maxWidth: 420 }}>
        <LvInput value={val} onChange={setVal} disabled={!!res} onEnter={submit} className={res === "ok" ? "ok" : res ? "bad" : ""} placeholder="Type here…" />
      </div>
      {!res && <button className="btn small" type="button" onClick={submit} disabled={!val.trim()}>Check</button>}
      {res && (
        <div className={`fb ${res === "ok" ? "ok" : res === "marks" ? "warn" : "bad"}`}>
          {res === "ok" && "Correct."}
          {res === "marks" && <>Almost — check the long marks / letters: <b className="lv">{ex.answer[0]}</b>. In the writing exam this counts as a mistake.</>}
          {res === "wrong" && <>Answer: <b className="lv">{ex.answer[0]}</b>.</>} {ex.explain}
        </div>
      )}
    </>
  );
}

function Order({ ex, onDone }: { ex: Extract<Exercise, { type: "order" }>; onDone: (c: boolean) => void }) {
  const tokens = useMemo(() => {
    const words = ex.answer.split(" ");
    let s = shuffle(words.map((w, i) => ({ w, i })));
    if (s.every((t, i) => t.i === i) && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  }, [ex.answer]);
  const [picked, setPicked] = useState<number[]>([]);
  const [res, setRes] = useState<boolean | null>(null);
  const built = picked.map((i) => tokens[i].w).join(" ");
  const submit = () => {
    const ok = norm(built) === norm(ex.answer);
    setRes(ok);
    onDone(ok);
    say(ex.answer);
  };
  return (
    <>
      <div className="q">“{ex.en}”</div>
      <div className="answerline lv" aria-live="polite">
        {picked.map((i, k) => (
          <button key={k} type="button" className={`chip${res === null ? "" : res ? " ok" : " bad"}`} disabled={res !== null} onClick={() => setPicked((p) => p.filter((x) => x !== i))}>{tokens[i].w}</button>
        ))}
      </div>
      <div className="chips">
        {tokens.map((t, i) => (
          <button key={i} type="button" className={`chip${picked.includes(i) ? " used" : ""}`} disabled={picked.includes(i) || res !== null} onClick={() => setPicked((p) => [...p, i])}>{t.w}</button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        {res === null && <button className="btn small" type="button" disabled={picked.length !== tokens.length} onClick={submit}>Check</button>}
        {res === null && picked.length > 0 && <button className="btn small ghost" type="button" onClick={() => setPicked([])}>Clear</button>}
      </div>
      {res !== null && (
        <div className={`fb ${res ? "ok" : "bad"}`}>
          <span className="row" style={{ gap: 8 }}><AudioButton text={ex.answer} />{res ? "Correct." : <>Answer: <b className="lv">{ex.answer}</b></>}</span>
        </div>
      )}
    </>
  );
}

function Match({ ex, onDone }: { ex: Extract<Exercise, { type: "match" }>; onDone: (c: boolean) => void }) {
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ t: p[1], i }))), [ex.pairs]);
  const [selL, setSelL] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const pickR = (i: number) => {
    if (selL === null) return;
    if (i === selL) {
      const next = [...matched, i];
      setMatched(next);
      say(ex.pairs[i][0]);
      setSelL(null);
      if (next.length === ex.pairs.length) onDone(errors === 0);
    } else {
      setWrong(i);
      setErrors((e) => e + 1);
      setTimeout(() => setWrong(null), 500);
    }
  };
  return (
    <>
      <div className="q">Tap a Latvian word, then its meaning.</div>
      <div className="match">
        <div className="opts">
          {ex.pairs.map((p, i) => (
            <button key={i} type="button" className={`opt ${matched.includes(i) ? "ok" : selL === i ? "sel" : ""}`} disabled={matched.includes(i)} onClick={() => setSelL(i)}>{p[0]}</button>
          ))}
        </div>
        <div className="opts">
          {right.map((r) => (
            <button key={r.i} type="button" style={{ fontFamily: "var(--sans)" }} className={`opt ${matched.includes(r.i) ? "ok" : wrong === r.i ? "bad" : ""}`} disabled={matched.includes(r.i)} onClick={() => pickR(r.i)}>{r.t}</button>
          ))}
        </div>
      </div>
      {matched.length === ex.pairs.length && <div className={`fb ${errors === 0 ? "ok" : "warn"}`}>{errors === 0 ? "All correct." : `Done, with ${errors} mistake${errors > 1 ? "s" : ""}.`}</div>}
    </>
  );
}
