import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { examById, PARTS, PASS, type Part } from "../data";
import type { Clip, MockExam } from "../data/types";
import { useProgress } from "../lib/progress";
import { play, stop, wait } from "../lib/audio";
import { check, norm, wordCount } from "../lib/text";
import { AudioButton, DiacriticKeys, LvInput, Meter, Segmented } from "../components/ui";

type Breakdown = { label: string; score: number; max: number }[];

export default function ExamRun() {
  const { examId = "", part = "" } = useParams();
  const exam = examById(examId);
  const meta = PARTS.find((p) => p.id === part);
  const [started, setStarted] = useState(false);
  const [unlimited, setUnlimited] = useState(false);
  const [result, setResult] = useState<Breakdown | null>(null);
  const [secs, setSecs] = useState(0);
  const { saveAttempt } = useProgress();
  const saved = useRef(false);

  useEffect(() => { if (!started || result) return; const t = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(t); }, [started, result]);
  useEffect(() => () => stop(), []);
  useEffect(() => { setStarted(false); setResult(null); setSecs(0); saved.current = false; }, [examId, part]);

  if (!exam || !meta) return <div className="narrow"><h1>Not found</h1><Link to="/exam">Back to exams</Link></div>;

  const limit = meta.minutes * 60;
  const left = limit - secs;
  const finish = (b: Breakdown) => {
    stop();
    setResult(b);
    window.scrollTo({ top: 0 });
    const total = b.reduce((s, x) => s + x.score, 0);
    if (!saved.current) { saved.current = true; saveAttempt(exam.id, meta.id, total); }
  };

  const header = (
    <div className="examhead">
      <div className="wrap spread" style={{ alignItems: "center" }}>
        <span><b>{meta.en}</b> <span className="muted lv">· {meta.lv}</span> <span className="muted small">— {exam.title}</span></span>
        {started && !result && (
          meta.id === "speaking"
            ? <span className="timer">{fmt(secs)}</span>
            : <span className={`timer${left < 120 ? " low" : ""}`} aria-live="off">{left > 0 ? fmt(left) : "Time's up"}</span>
        )}
      </div>
    </div>
  );

  if (result) return <>{header}<Result exam={exam} part={meta.id} b={result} secs={secs} /></>;

  if (!started) {
    return (
      <>
        {header}
        <div className="narrow">
          <Link to="/exam" className="small">← All mock exams</Link>
          <h1 style={{ marginTop: 16 }}>{meta.en}: {meta.lv}</h1>
          <p className="lede">{meta.minutes} minutes · 15 points · pass mark {PASS}</p>
          <div className="panel">
            <h3>Before you start</h3>
            <ul className="ink2" style={{ paddingLeft: 20 }}>
              {meta.id === "listening" && <><li>Use headphones in a quiet room.</li><li>Each recording can be played <b>twice</b>, like in the exam. Read the questions first.</li></>}
              {meta.id === "reading" && <><li>Three tasks. Answer every question — there's no penalty for guessing.</li></>}
              {meta.id === "writing" && <><li>In the real exam you write on paper with a pen. Here you type; Latvian letter buttons appear under each box.</li><li>Afterwards you'll mark tasks 1 and 3 yourself against the official criteria, with a model answer to compare.</li></>}
              {meta.id === "speaking" && <><li>Allow the microphone when asked. Your recordings stay in this browser — nothing is uploaded.</li><li>Answer out loud in full sentences, as if the examiner were in front of you. Then mark yourself.</li></>}
              <li>The timer starts when you press Start. When it ends you can still finish, but note your time.</li>
            </ul>
            {meta.id === "listening" && (
              <label className="small row" style={{ gap: 8, marginBottom: 16 }}>
                <input type="checkbox" checked={unlimited} onChange={(e) => setUnlimited(e.target.checked)} /> Practice mode: unlimited replays (not exam conditions)
              </label>
            )}
            <button className="btn red" onClick={() => { setStarted(true); window.scrollTo({ top: 0 }); }}>Start</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <div className="narrow">
        {meta.id === "listening" && <Listening exam={exam} unlimited={unlimited} onFinish={finish} />}
        {meta.id === "reading" && <Reading exam={exam} onFinish={finish} />}
        {meta.id === "writing" && <Writing exam={exam} onFinish={finish} />}
        {meta.id === "speaking" && <Speaking exam={exam} onFinish={finish} />}
      </div>
    </>
  );
}

const fmt = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

function Task({ n, title, pts, instr, children }: { n: number; title: string; pts: number; instr: string; children: ReactNode }) {
  return (
    <section className="task">
      <h3><span className="mono" style={{ color: "var(--carmine)" }}>{n}.</span> {title} <span className="pts">{pts} p</span></h3>
      <p className="instr">{instr}</p>
      {children}
    </section>
  );
}

function Finish({ onClick, missing }: { onClick: () => void; missing: number }) {
  return (
    <div className="panel" style={{ marginTop: 40 }}>
      {missing > 0 && <p className="small" style={{ color: "var(--warn)" }}>{missing} question{missing > 1 ? "s" : ""} still unanswered. In the exam, always guess — a blank is a sure zero.</p>}
      <button className="btn red" onClick={onClick}>Finish and see my score</button>
    </div>
  );
}

/* ---------------- Listening ---------------- */

function ClipPlayer({ clip, unlimited, label = "Play" }: { clip: Clip; unlimited: boolean; label?: string }) {
  const [plays, setPlays] = useState(0);
  const [on, setOn] = useState(false);
  const left = 2 - plays;
  const disabled = !unlimited && left <= 0 && !on;
  return (
    <div className="row" style={{ marginBottom: 12 }}>
      <button type="button" className={`play big${on ? " on" : ""}`} disabled={disabled} aria-label={on ? "Stop" : label}
        onClick={async () => {
          if (on) { stop(); setOn(false); return; }
          setOn(true); setPlays((p) => p + 1);
          await play(clip.lines, { gap: 550 });
          setOn(false);
        }}>
        {on ? "■" : "▶"}
      </button>
      <span className="small muted">{on ? "Playing…" : unlimited ? `Played ${plays}×` : left > 0 ? `${label} — ${left} play${left > 1 ? "s" : ""} left` : "No plays left"}</span>
    </div>
  );
}

function Listening({ exam, unlimited, onFinish }: { exam: MockExam; unlimited: boolean; onFinish: (b: Breakdown) => void }) {
  const L = exam.listening;
  const [a1, setA1] = useState<(number | null)[]>(L.t1.map(() => null));
  const [a2, setA2] = useState<(boolean | null)[]>(L.t2.statements.map(() => null));
  const [a3, setA3] = useState<(string | null)[]>(L.t3.items.map(() => null));
  const [slot, setSlot] = useState<number>(0);

  const missing = a1.filter((x) => x === null).length + a2.filter((x) => x === null).length + a3.filter((x) => x === null).length;
  const submit = () => onFinish([
    { label: "Task 1 — announcements", score: a1.filter((x, i) => x === L.t1[i].answer).length, max: 6 },
    { label: "Task 2 — conversation, Jā/Nē", score: a2.filter((x, i) => x === L.t2.statements[i].answer).length, max: 4 },
    { label: "Task 3 — missing words", score: a3.filter((x, i) => x !== null && norm(x) === norm(L.t3.items[i].answer)).length, max: 5 },
  ]);
  sessionAnswers.listening = { a1, a2, a3 };

  const placeWord = (w: string) => {
    const next = [...a3];
    const existing = next.indexOf(w);
    if (existing >= 0) next[existing] = null;
    next[slot] = w;
    setA3(next);
    const empty = next.findIndex((x) => x === null);
    if (empty >= 0) setSlot(empty);
  };

  return (
    <>
      <Task n={1} title="Paziņojumi" pts={6} instr="Izlasiet jautājumus un atbilžu variantus! Klausieties paziņojumus! Katrs paziņojums skanēs divas reizes. Pēc katra paziņojuma atzīmējiet pareizo atbildi!">
        {L.t1.map((it, i) => (
          <div key={i} className="ex">
            <div className="qn">{i + 1}. paziņojums</div>
            <ClipPlayer clip={it.clip} unlimited={unlimited} />
            <div className="q lv">{it.q}</div>
            <div className="opts">
              {it.options.map((o, j) => (
                <button key={j} type="button" className={`opt${a1[i] === j ? " sel" : ""}`} onClick={() => setA1((a) => a.map((x, k) => (k === i ? j : x)))}>
                  <span className="k">{"ABC"[j]}</span>{o}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Task>

      <Task n={2} title="Saruna" pts={4} instr="Izlasiet apgalvojumus! Klausieties sarunu! Saruna skanēs divas reizes. Atzīmējiet, vai apgalvojums ir pareizs (Jā) vai nepareizs (Nē)!">
        <ClipPlayer clip={L.t2.clip} unlimited={unlimited} label="Play the conversation" />
        {L.t2.statements.map((s, i) => (
          <div key={i} className="yn">
            <span>{i + 1}. {s.text}</span>
            <span className="btns">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" className={`chip${a2[i] === v ? " sel" : ""}`} onClick={() => setA2((a) => a.map((x, k) => (k === i ? v : x)))}>{v ? "Jā" : "Nē"}</button>
              ))}
            </span>
          </div>
        ))}
      </Task>

      <Task n={3} title="Īsi dialogi" pts={5} instr="Izlasiet teikumus! Klausieties sarunas! Sarunas skanēs divas reizes. Izvēlieties un ievelciet atbilstošo skaitli vai vārdu! Četras atbildes ir liekas.">
        <p className="small muted">Tap a gap, then tap a word to put it there.</p>
        <div className="bank">
          {L.t3.bank.map((w) => (
            <button key={w} type="button" className={`chip${a3.includes(w) ? " used" : ""}`} onClick={() => placeWord(w)}>{w}</button>
          ))}
        </div>
        {L.t3.items.map((it, i) => {
          const [before, after] = it.sentence.split("___");
          return (
            <div key={i} className="ex">
              <div className="qn">{i + 1}. saruna</div>
              <ClipPlayer clip={it.clip} unlimited={unlimited} />
              <div className="lv" style={{ fontSize: 18 }}>
                {before}
                <span role="button" tabIndex={0} className={`slot${a3[i] ? "" : " empty"}`} style={slot === i ? { background: "var(--carmine-wash)" } : undefined}
                  onClick={() => setSlot(i)} onKeyDown={(e) => { if (e.key === "Enter") setSlot(i); }}>
                  {a3[i] ?? "______"}
                </span>
                {after}
                {a3[i] && <button type="button" className="btn small ghost" style={{ marginLeft: 8, minHeight: 28, padding: "2px 8px" }} onClick={() => setA3((a) => a.map((x, k) => (k === i ? null : x)))}>×</button>}
              </div>
            </div>
          );
        })}
      </Task>
      <Finish onClick={submit} missing={missing} />
    </>
  );
}

/* ---------------- Reading ---------------- */

function Reading({ exam, onFinish }: { exam: MockExam; onFinish: (b: Breakdown) => void }) {
  const R = exam.reading;
  const gaps = R.t3.parts.filter((p) => typeof p !== "string") as { options: string[]; answer: number }[];
  const [a1, setA1] = useState<(number | null)[]>(R.t1.map(() => null));
  const [a2, setA2] = useState<string[]>(R.t2.situations.map(() => ""));
  const [a3, setA3] = useState<(number | null)[]>(gaps.map(() => null));
  sessionAnswers.reading = { a1, a2, a3 };
  const missing = a1.filter((x) => x === null).length + a2.filter((x) => !x).length + a3.filter((x) => x === null).length;
  const submit = () => onFinish([
    { label: "Task 1 — short texts", score: a1.filter((x, i) => x === R.t1[i].answer).length, max: 4 },
    { label: "Task 2 — situations and ads", score: a2.filter((x, i) => x === R.t2.situations[i].answer).length, max: 6 },
    { label: "Task 3 — gap text", score: a3.filter((x, i) => x === gaps[i].answer).length, max: 5 },
  ]);
  let g = -1;

  return (
    <>
      <Task n={1} title="Teksti" pts={4} instr="Lasiet tekstu un atzīmējiet, kurš no apgalvojumiem par to ir pareizs!">
        {R.t1.map((t, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div className="textcard"><h4>{t.title}</h4>{t.body.map((p, j) => <p key={j} style={{ marginBottom: 8 }}>{p}</p>)}</div>
            <div className="opts">
              {t.options.map((o, j) => (
                <button key={j} type="button" className={`opt${a1[i] === j ? " sel" : ""}`} onClick={() => setA1((a) => a.map((x, k) => (k === i ? j : x)))}>
                  <span className="k">{"ABC"[j]}</span>{o}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Task>

      <Task n={2} title="Sludinājumi" pts={6} instr="Atrodiet, kurš sludinājums atbilst katrai situācijai! Divi sludinājumi ir lieki.">
        <div className="grid2" style={{ marginBottom: 20 }}>
          {R.t2.ads.map((ad) => (
            <div key={ad.id} className="ad"><span className="id">{ad.id}</span><h4>{ad.title}</h4><p>{ad.body}</p></div>
          ))}
        </div>
        {R.t2.situations.map((s, i) => (
          <div key={i} className="yn">
            <span>{i + 1}. {s.text}</span>
            <select className="in" style={{ width: 80 }} value={a2[i]} aria-label={`Ad for situation ${i + 1}`} onChange={(e) => setA2((a) => a.map((x, k) => (k === i ? e.target.value : x)))}>
              <option value="">—</option>
              {R.t2.ads.map((ad) => <option key={ad.id} value={ad.id}>{ad.id}</option>)}
            </select>
          </div>
        ))}
      </Task>

      <Task n={3} title={R.t3.title} pts={5} instr="Lasiet tekstu un izvēlieties pareizo vārdu!">
        <div className="gaptext">
          {R.t3.parts.map((p, i) => {
            if (typeof p === "string") return <span key={i}>{p}</span>;
            const idx = ++g;
            return (
              <select key={i} aria-label={`Gap ${idx + 1}`} value={a3[idx] ?? ""} onChange={(e) => setA3((a) => a.map((x, k) => (k === idx ? (e.target.value === "" ? null : Number(e.target.value)) : x)))}>
                <option value="">({idx + 1}) …</option>
                {p.options.map((o, j) => <option key={j} value={j}>{o}</option>)}
              </select>
            );
          })}
        </div>
      </Task>
      <Finish onClick={submit} missing={missing} />
    </>
  );
}

/* ---------------- Writing ---------------- */

function Writing({ exam, onFinish }: { exam: MockExam; onFinish: (b: Breakdown) => void }) {
  const W = exam.writing;
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState<string[]>(W.t2.items.map(() => ""));
  const [t3, setT3] = useState("");
  const [marking, setMarking] = useState(false);
  const r1 = useRef<HTMLTextAreaElement>(null);
  const r3 = useRef<HTMLTextAreaElement>(null);
  const active = useRef<HTMLInputElement | null>(null) as React.MutableRefObject<HTMLInputElement | null>;

  // self-marking state
  const [facts, setFacts] = useState<boolean[]>(W.t1.facts.map(() => false));
  const [lang1, setLang1] = useState<number | null>(null);
  const [points, setPoints] = useState<boolean[]>(W.t3.points.map(() => false));
  const [form3, setForm3] = useState<number | null>(null);
  const [lang3, setLang3] = useState<number | null>(null);

  const wc1 = wordCount(t1), wc3 = wordCount(t3);
  const t2score = t2.filter((v, i) => check(v, W.t2.items[i].answer) === "ok").length;

  if (marking) {
    const fc = facts.filter(Boolean).length;
    const content1 = fc === facts.length ? 2 : fc >= facts.length / 2 ? 1 : 0;
    const s1 = Math.max(0, content1 + (lang1 ?? 0) - (wc1 < 30 ? 1 : 0));
    const pc = points.filter(Boolean).length;
    const content3 = pc >= 5 ? 3 : pc === 4 ? 2 : pc >= 2 ? 1 : 0;
    const s3 = Math.max(0, content3 + (form3 ?? 0) + (lang3 ?? 0) - (wc3 < W.t3.minWords ? 1 : 0));
    const ready = lang1 !== null && form3 !== null && lang3 !== null;
    return (
      <>
        <h2 style={{ marginTop: 24 }}>Mark your writing</h2>
        <p className="ink2">Be honest — the examiner will be. Compare with the model answer, then tick what's really there.</p>

        <section className="task">
          <h3><span className="mono" style={{ color: "var(--carmine)" }}>1.</span> Person description <span className="pts">{s1} / 4</span></h3>
          <div className="grid2">
            <div><h4>Yours <span className="muted small">({wc1} words{wc1 < 30 ? " — under 30, −1" : ""})</span></h4><div className="textcard" style={{ whiteSpace: "pre-wrap" }}>{t1 || <i className="muted">empty</i>}</div></div>
            <div><h4>Model</h4><div className="textcard" style={{ whiteSpace: "pre-wrap" }}>{W.t1.model}</div></div>
          </div>
          <ul className="rubric">
            <li><span><b>Content:</b> which facts did you include, in a correct sentence?</span><span /></li>
            {W.t1.facts.map((f, i) => (
              <li key={i}><label className="row" style={{ gap: 8 }}><input type="checkbox" checked={facts[i]} onChange={(e) => setFacts((a) => a.map((x, k) => (k === i ? e.target.checked : x)))} /> {f.label}: <span className="lv">{f.value}</span></label><span /></li>
            ))}
            <li><span><b>Language:</b> 2 = few mistakes, all clear · 1 = several mistakes, still understandable · 0 = hard to understand</span><Segmented label="Language" value={lang1} options={[0, 1, 2]} onChange={setLang1} /></li>
          </ul>
        </section>

        <section className="task">
          <h3><span className="mono" style={{ color: "var(--carmine)" }}>2.</span> Word forms <span className="pts">{t2score} / 5</span></h3>
          {W.t2.items.map((it, i) => {
            const r = check(t2[i], it.answer);
            return (
              <div key={i} className="yn">
                <span className="lv">{it.before} <b style={{ color: r === "ok" ? "var(--ok)" : "var(--bad)" }}>{t2[i] || "—"}</b> {it.after}</span>
                <span className="small">{r === "ok" ? "✓" : <>→ <b className="lv">{it.answer[0]}</b></>}</span>
              </div>
            );
          })}
        </section>

        <section className="task">
          <h3><span className="mono" style={{ color: "var(--carmine)" }}>3.</span> Letter / email <span className="pts">{s3} / 6</span></h3>
          <div className="grid2">
            <div><h4>Yours <span className="muted small">({wc3} words{wc3 < W.t3.minWords ? ` — under ${W.t3.minWords}, −1` : ""})</span></h4><div className="textcard" style={{ whiteSpace: "pre-wrap" }}>{t3 || <i className="muted">empty</i>}</div></div>
            <div><h4>Model</h4><div className="textcard" style={{ whiteSpace: "pre-wrap" }}>{W.t3.model}</div></div>
          </div>
          <ul className="rubric">
            <li><span><b>Content:</b> which plan points did you cover?</span><span /></li>
            {W.t3.points.map((p, i) => (
              <li key={i}><label className="row" style={{ gap: 8 }}><input type="checkbox" checked={points[i]} onChange={(e) => setPoints((a) => a.map((x, k) => (k === i ? e.target.checked : x)))} /> {i + 1}) <span className="lv">{p}</span></label><span /></li>
            ))}
            <li><span><b>Form:</b> is it really a letter / email / ad, with the right opening and closing? (1 = yes)</span><Segmented label="Form" value={form3} options={[0, 1]} onChange={setForm3} /></li>
            <li><span><b>Language:</b> 2 = clear, linked sentences (un, bet, jo…), few mistakes · 1 = understandable · 0 = hard to understand</span><Segmented label="Language" value={lang3} options={[0, 1, 2]} onChange={setLang3} /></li>
          </ul>
        </section>

        <div className="panel">
          <button className="btn red" disabled={!ready} onClick={() => onFinish([
            { label: "Task 1 — person description", score: s1, max: 4 },
            { label: "Task 2 — word forms", score: t2score, max: 5 },
            { label: "Task 3 — letter / email", score: s3, max: 6 },
          ])}>Save my score</button>
          {!ready && <span className="small muted" style={{ marginLeft: 12 }}>Choose the language and form marks first.</span>}
        </div>
      </>
    );
  }

  return (
    <>
      <Task n={1} title="Apraksts par personu" pts={4} instr={W.t1.ask}>
        <dl className="factcard">
          <div className="nm">{W.t1.name}</div>
          {W.t1.facts.map((f, i) => <FactRow key={i} label={f.label} value={f.value} />)}
        </dl>
        <div style={{ marginTop: 16 }}>
          <textarea ref={r1} className="in" lang="lv" spellCheck={false} value={t1} onChange={(e) => setT1(e.target.value)} placeholder="Rakstiet šeit…" />
          <div className="spread"><DiacriticKeys target={r1} onInsert={setT1} /><span className={`small mono${wc1 >= 30 ? "" : " muted"}`} style={wc1 >= 30 ? { color: "var(--ok)" } : undefined}>{wc1} / 30 words</span></div>
        </div>
      </Task>

      <Task n={2} title="Vārdu formas" pts={5} instr={W.t2.intro}>
        <div style={{ position: "sticky", top: 112, zIndex: 5, background: "var(--paper)" }}>
          <DiacriticKeys target={active} onInsert={(v) => { const i = Number(active.current?.dataset.idx); if (!Number.isNaN(i)) setT2((a) => a.map((x, k) => (k === i ? v : x))); }} />
        </div>
        <div onFocusCapture={(e) => { if (e.target instanceof HTMLInputElement) active.current = e.target; }}>
        {W.t2.items.map((it, i) => (
          <div key={i} className="lv" style={{ fontSize: 18, lineHeight: 2.4, borderBottom: "1px solid var(--rule)" }}>
            {i + 1}. {it.before}{" "}
            <input className="in inline" data-idx={i} lang="lv" autoComplete="off" spellCheck={false} value={t2[i]} onChange={(e) => setT2((a) => a.map((x, k) => (k === i ? e.target.value : x)))} placeholder="…" aria-label={`Gap ${i + 1}: ${it.base}`} />
            {" "}<span className="muted">({it.base})</span> {it.after}
          </div>
        ))}
        </div>
      </Task>

      <Task n={3} title="Vēstule" pts={6} instr={W.t3.situation}>
        <ol className="lv" style={{ paddingLeft: 24 }}>{W.t3.points.map((p, i) => <li key={i}>{p}</li>)}</ol>
        <p className="small muted">Teksta apjoms – {W.t3.minWords} vārdi</p>
        <textarea ref={r3} className="in" lang="lv" spellCheck={false} value={t3} onChange={(e) => setT3(e.target.value)} placeholder="Rakstiet šeit…" />
        <div className="spread"><DiacriticKeys target={r3} onInsert={setT3} /><span className="small mono" style={{ color: wc3 >= W.t3.minWords ? "var(--ok)" : "var(--ink-3)" }}>{wc3} / {W.t3.minWords} words</span></div>
      </Task>

      <div className="panel" style={{ marginTop: 40 }}>
        <button className="btn red" onClick={() => { setMarking(true); window.scrollTo({ top: 0 }); }}>Finish writing → mark it</button>
      </div>
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return <><dt>{label}</dt><dd>{value}</dd></>;
}

/* ---------------- Speaking ---------------- */

function useRecorder() {
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const start = async (onUrl: (u: string) => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mr.ondataavailable = (e) => chunks.push(e.data);
      mr.onstop = () => { onUrl(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType }))); stream.getTracks().forEach((t) => t.stop()); setRec(null); };
      mr.start();
      setRec(mr);
    } catch {
      setErr("Microphone not available. You can still answer out loud and mark yourself.");
    }
  };
  return { recording: !!rec, start, stop: () => rec?.stop(), err };
}

type SR = { lang: string; interimResults: boolean; continuous: boolean; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; start: () => void; stop: () => void };
function getSR(): (new () => SR) | null {
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function RecordBox({ model, modelLabel = "Show a model answer" }: { model: string; modelLabel?: string }) {
  const { recording, start, stop: stopRec, err } = useRecorder();
  const [url, setUrl] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [heard, setHeard] = useState("");
  const sr = useRef<SR | null>(null);
  const begin = () => {
    setHeard("");
    start(setUrl);
    const S = getSR();
    if (S) {
      const r = new S();
      r.lang = "lv-LV"; r.interimResults = true; r.continuous = true;
      r.onresult = (e) => setHeard(Array.from(e.results).map((x) => x[0].transcript).join(" "));
      r.onend = () => {};
      try { r.start(); sr.current = r; } catch { /* ignore */ }
    }
  };
  const end = () => { stopRec(); sr.current?.stop(); sr.current = null; };
  return (
    <div style={{ marginTop: 8 }}>
      <div className="row">
        {!recording ? <button type="button" className="btn small" onClick={begin}>● Record my answer</button>
          : <button type="button" className="btn small red" onClick={end}><span className="rec"><span className="dot" /> Stop</span></button>}
        {url && !recording && <audio controls src={url} style={{ height: 36 }} />}
        <button type="button" className="btn small ghost" onClick={() => setShow((s) => !s)}>{show ? "Hide model" : modelLabel}</button>
      </div>
      {err && <div className="small" style={{ color: "var(--warn)", marginTop: 6 }}>{err}</div>}
      {heard && <div className="small muted" style={{ marginTop: 6 }}>Speech recognition heard: <span className="lv">“{heard}”</span></div>}
      {show && <div className="note"><span className="row" style={{ gap: 8, flexWrap: "nowrap", alignItems: "flex-start" }}><AudioButton text={model} /><span className="lv">{model}</span></span></div>}
    </div>
  );
}

function Speaking({ exam, onFinish }: { exam: MockExam; onFinish: (b: Breakdown) => void }) {
  const S = exam.speaking;
  const [step, setStep] = useState<"t1" | "t2" | "t3" | "mark">("t1");
  const [qi, setQi] = useState(0);
  const [t3, setT3] = useState<string[]>(S.t3.ads.map(() => ""));
  const [rub, setRub] = useState<(number | null)[]>([null, null, null, null]);

  // Auto-play each examiner question
  useEffect(() => {
    if (step !== "t1") return;
    let alive = true;
    (async () => { await wait(400); if (alive) play([{ t: S.t1[qi].q, v: "m" }]); })();
    return () => { alive = false; };
  }, [qi, step, S.t1]);

  const t3ok = (i: number) => {
    const n = norm(t3[i]);
    if (!n) return false;
    return S.t3.ads[i].keys.every((group) => group.some((k) => n.includes(norm(k))));
  };
  const next = (s: typeof step) => { stop(); setStep(s); window.scrollTo({ top: 0 }); };

  if (step === "t1") {
    const q = S.t1[qi];
    return (
      <Task n={1} title="Saruna ar eksaminētāju" pts={12} instr="Eksaminētājs uzdod jautājumus. Atbildiet pilnos teikumos!">
        <div className="spread"><span className="mono small">Jautājums {qi + 1} / {S.t1.length}</span></div>
        <div className="panel" style={{ marginTop: 10 }}>
          <div className="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <AudioButton big text={q.q} v="m" label="Hear the question again" />
            <div className="lv" style={{ fontSize: 22 }}>{q.q}</div>
          </div>
          <RecordBox key={qi} model={q.model} />
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          {qi > 0 && <button className="btn ghost" onClick={() => setQi(qi - 1)}>← Back</button>}
          {qi < S.t1.length - 1 ? <button className="btn" onClick={() => setQi(qi + 1)}>Next question →</button>
            : <button className="btn red" onClick={() => next("t2")}>Go to task 2: pictures →</button>}
        </div>
      </Task>
    );
  }

  if (step === "t2") {
    return (
      <Task n={2} title="Attēlu apraksts" pts={12} instr="Aprakstiet attēlus (personas, darbības, vietu, laiku u.c.)! Runājiet pilnos teikumos!">
        <p className="small muted">In the exam you get photos. Here the scene is described in English — picture it, then describe it in Latvian for about a minute. Use the plan: Kur? Kad? → Kas? → Ko dara? → Kā izskatās? → Mans viedoklis.</p>
        {S.t2.scenes.map((s, i) => (
          <div key={i} className="scene" style={{ marginBottom: 16 }}>
            <h4>{s.title}</h4>
            <p className="desc">{s.description}</p>
            <div className="small"><span className="muted">Useful words:</span> <span className="lv">{s.helpers.join(" · ")}</span></div>
            <RecordBox model={s.model} />
          </div>
        ))}
        <button className="btn red" onClick={() => next("t3")}>Go to task 3: ask questions →</button>
      </Task>
    );
  }

  if (step === "t3") {
    return (
      <Task n={3} title="Uzdodiet jautājumus!" pts={3} instr="Jautājumus formulējiet pilnā teikumā!">
        <p className="small muted">Say each question out loud first — then type it so it can be checked.</p>
        {S.t3.ads.map((a, i) => (
          <div key={i} className="ex">
            <div className="ad"><span className="id">{i + 1}</span><p>{a.text}</p><p style={{ marginTop: 6 }}><b>{a.ask}</b></p></div>
            <div style={{ marginTop: 10 }}><LvInput value={t3[i]} onChange={(v) => setT3((x) => x.map((y, k) => (k === i ? v : y)))} placeholder="Your question…" /></div>
          </div>
        ))}
        <button className="btn red" onClick={() => next("mark")}>Finish → mark my speaking</button>
      </Task>
    );
  }

  const CRIT = [
    "I understood the questions and answered in full sentences with clear information.",
    "I could describe people, things, actions, place and time in the pictures.",
    "I gave my opinion and a short reason (jo…) at least a few times.",
    "My vocabulary was enough, and mistakes didn't stop me being understood.",
  ];
  const t3score = S.t3.ads.filter((_, i) => t3ok(i)).length;
  const t12 = rub.reduce<number>((s, x) => s + (x ?? 0), 0);
  return (
    <>
      <h2 style={{ marginTop: 24 }}>Mark your speaking</h2>
      <section className="task">
        <h3>Tasks 1 + 2 <span className="pts">{t12} / 12</span></h3>
        <p className="ink2">Play your recordings back if you made them. For each line: 3 = always, 2 = mostly, 1 = sometimes, 0 = rarely.</p>
        <ul className="rubric">
          {CRIT.map((c, i) => (
            <li key={i}><span>{c}</span><Segmented label={c} value={rub[i]} options={[0, 1, 2, 3]} onChange={(n) => setRub((r) => r.map((x, k) => (k === i ? n : x)))} /></li>
          ))}
        </ul>
      </section>
      <section className="task">
        <h3>Task 3 <span className="pts">{t3score} / 3</span></h3>
        {S.t3.ads.map((a, i) => (
          <div key={i} className="yn">
            <span><span className="lv">{t3[i] || <i className="muted">no answer</i>}</span><div className="small muted">Model: <span className="lv">{a.model}</span></div></span>
            <span className="small" style={{ color: t3ok(i) ? "var(--ok)" : "var(--bad)" }}>{t3ok(i) ? "✓ 1 p" : "0 p"}</span>
          </div>
        ))}
      </section>
      <div className="panel">
        <button className="btn red" disabled={rub.some((x) => x === null)} onClick={() => onFinish([
          { label: "Tasks 1–2 — interview and pictures", score: t12, max: 12 },
          { label: "Task 3 — asking questions", score: t3score, max: 3 },
        ])}>Save my score</button>
      </div>
    </>
  );
}

/* ---------------- Result ---------------- */

// Answers from the last listening/reading run, for the review list
const sessionAnswers: { listening?: { a1: (number | null)[]; a2: (boolean | null)[]; a3: (string | null)[] }; reading?: { a1: (number | null)[]; a2: string[]; a3: (number | null)[] } } = {};

function Result({ exam, part, b, secs }: { exam: MockExam; part: Part; b: Breakdown; secs: number }) {
  const total = b.reduce((s, x) => s + x.score, 0);
  const pass = total >= PASS;
  return (
    <div className="narrow">
      <div className={`result ${pass ? "pass" : "fail"}`}>
        <div className="eyebrow" style={{ color: pass ? "var(--ok)" : "var(--carmine)" }}>{pass ? "Ir nokārtots — pass" : "Nav nokārtots — not yet"}</div>
        <div className="big-n" style={{ fontSize: 56 }}>{total} <small>/ 15</small></div>
        <Meter score={total} />
        <p className="small muted">Pass line 9 · time used {fmt(secs)}</p>
        <div className="tablewrap"><table className="t"><tbody>{b.map((x, i) => <tr key={i}><td>{x.label}</td><td className="mono">{x.score} / {x.max}</td></tr>)}</tbody></table></div>
        <p>{pass
          ? total >= 12 ? "Comfortably above the line. Keep this part warm with one practice a week." : "You're over the line, but close. One bad day could drop you below — practise this part again."
          : `You need ${PASS - total} more point${PASS - total > 1 ? "s" : ""}. Look at what you missed below, revise those units, and retry in a few days.`}</p>
        <div className="row">
          <Link to="/exam" className="btn">Back to exams</Link>
          <button className="btn ghost" onClick={() => window.location.reload()}>Retry this part</button>
        </div>
      </div>
      {part === "listening" && <ListeningReview exam={exam} />}
      {part === "reading" && <ReadingReview exam={exam} />}
    </div>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return <span className="mono small" style={{ color: ok ? "var(--ok)" : "var(--bad)" }}>{ok ? "✓" : "✗"}</span>;
}

function ListeningReview({ exam }: { exam: MockExam }) {
  const a = sessionAnswers.listening;
  const L = exam.listening;
  if (!a) return null;
  return (
    <section style={{ marginTop: 32 }}>
      <h2>Review</h2>
      <p className="ink2">Replay any recording and read the transcript. Mistakes here show you exactly what to listen for next time.</p>
      {L.t1.map((it, i) => (
        <div key={i} className="ex">
          <div className="spread"><b className="lv">{it.q}</b><Mark ok={a.a1[i] === it.answer} /></div>
          <div className="small">Answer: <b className="lv">{it.options[it.answer]}</b>{a.a1[i] !== null && a.a1[i] !== it.answer && <> · you: <span className="lv">{it.options[a.a1[i]!]}</span></>}</div>
          <Transcript clip={it.clip} />
        </div>
      ))}
      <div className="ex">
        <b>Task 2</b>
        {L.t2.statements.map((s, i) => (
          <div key={i} className="spread small"><span className="lv">{s.text}</span><span>{s.answer ? "Jā" : "Nē"} <Mark ok={a.a2[i] === s.answer} /></span></div>
        ))}
        <Transcript clip={L.t2.clip} />
      </div>
      {L.t3.items.map((it, i) => (
        <div key={i} className="ex">
          <div className="spread"><span className="lv">{it.sentence.replace("___", `[${it.answer}]`)}</span><Mark ok={a.a3[i] !== null && norm(a.a3[i]!) === norm(it.answer)} /></div>
          <Transcript clip={it.clip} />
        </div>
      ))}
    </section>
  );
}

function Transcript({ clip }: { clip: Clip }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 6 }}>
      <span className="row" style={{ gap: 8 }}>
        <AudioButton lines={clip.lines} label="Replay" />
        <button className="btn small ghost" onClick={() => setOpen((o) => !o)}>{open ? "Hide" : "Show"} transcript</button>
      </span>
      {open && <div className="note lv" style={{ fontSize: 16 }}>{clip.lines.map((l, i) => <div key={i}>— {l.t}</div>)}</div>}
    </div>
  );
}

function ReadingReview({ exam }: { exam: MockExam }) {
  const a = sessionAnswers.reading;
  const R = exam.reading;
  if (!a) return null;
  const gaps = R.t3.parts.filter((p) => typeof p !== "string") as { options: string[]; answer: number }[];
  return (
    <section style={{ marginTop: 32 }}>
      <h2>Review</h2>
      {R.t1.map((t, i) => (
        <div key={i} className="ex">
          <div className="spread"><b>{t.title}</b><Mark ok={a.a1[i] === t.answer} /></div>
          <div className="small">Correct: <span className="lv">{t.options[t.answer]}</span></div>
        </div>
      ))}
      <div className="ex">
        <b>Task 2</b>
        {R.t2.situations.map((s, i) => (
          <div key={i} className="spread small" style={{ padding: "4px 0" }}><span className="lv">{s.text.slice(0, 70)}…</span><span>{s.answer} <Mark ok={a.a2[i] === s.answer} /></span></div>
        ))}
      </div>
      <div className="ex">
        <b>Task 3</b>
        {gaps.map((g, i) => (
          <div key={i} className="spread small"><span>Gap {i + 1}: <b className="lv">{g.options[g.answer]}</b></span><Mark ok={a.a3[i] === g.answer} /></div>
        ))}
      </div>
    </section>
  );
}
