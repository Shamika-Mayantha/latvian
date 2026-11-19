import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { units, unitById } from "../data";
import { useProgress } from "../lib/progress";
import { AudioButton, Rich } from "../components/ui";
import { ExerciseView } from "../components/Exercise";
import { stop } from "../lib/audio";

const TABS = ["Words", "Grammar", "Dialogue", "Practice"] as const;
type Tab = (typeof TABS)[number];

export default function Lesson() {
  const { id = "" } = useParams();
  const unit = unitById(id);
  const [tab, setTab] = useState<Tab>("Words");
  const [showEn, setShowEn] = useState(true);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [round, setRound] = useState(0);
  const { lessons, saveLesson } = useProgress();

  useEffect(() => { setTab("Words"); setResults({}); setRound((r) => r + 1); return () => stop(); }, [id]);

  // Save once every exercise in this round is answered
  const nAnswered = Object.keys(results).length;
  useEffect(() => {
    if (!unit || nAnswered === 0 || nAnswered !== unit.exercises.length) return;
    saveLesson(unit.id, Object.values(results).filter(Boolean).length, unit.exercises.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nAnswered]);

  if (!unit) return <div className="narrow"><h1>Unit not found</h1><Link to="/learn">Back to the course</Link></div>;
  const idx = units.indexOf(unit);
  const nextUnit = units[idx + 1];
  const total = unit.exercises.length;
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;
  const finished = answered === total;

  const record = (i: number, ok: boolean) => setResults((r) => (i in r ? r : { ...r, [i]: ok }));

  const go = (t: Tab) => { stop(); setTab(t); window.scrollTo({ top: 0 }); };

  return (
    <div className="narrow">
      <Link to="/learn" className="small">← Course</Link>
      <div className="eyebrow" style={{ marginTop: 16 }}>Unit {Number(unit.id.slice(1))} of {units.length} · Stage {unit.stage}</div>
      <h1 style={{ marginBottom: 4 }}>{unit.title}</h1>
      <div className="lv ink2" style={{ fontSize: 22 }}>{unit.lvTitle}</div>
      <p className="ink2" style={{ marginTop: 12 }}>{unit.goal}</p>
      <div className="small"><span className="tag red">Exam</span> <span className="muted">{unit.exam}</span>
        {lessons[unit.id] && <> · <span className="tag ok">Done {lessons[unit.id].score}/{lessons[unit.id].max_score}</span></>}
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t, i) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => go(t)}>
            <span className="n">{i + 1}</span>{t}
          </button>
        ))}
      </div>

      {tab === "Words" && (
        <section>
          <p className="muted small">Press play on each word and repeat it out loud. Saying words is what makes them stick.</p>
          <ul className="vocab">
            {unit.vocab.map((w, i) => (
              <li key={i}>
                <AudioButton text={w.lv} />
                <span className="w">{w.lv}{w.note && <span className="nt">{w.note}</span>}</span>
                <span className="e">{w.en}</span>
              </li>
            ))}
          </ul>
          <div className="row" style={{ marginTop: 24 }}><button className="btn" onClick={() => go("Grammar")}>Next: grammar →</button></div>
        </section>
      )}

      {tab === "Grammar" && (
        <section>
          {unit.grammar.map((g, i) => (
            <article key={i} style={{ marginBottom: 36 }}>
              <h3>{g.title}</h3>
              {g.body.map((p, j) => <p key={j}><Rich text={p} /></p>)}
              {g.table && (
                <div className="tablewrap">
                  <table className="t">
                    <thead><tr>{g.table.head.map((h, k) => <th key={k}>{h}</th>)}</tr></thead>
                    <tbody>{g.table.rows.map((r, k) => <tr key={k}>{r.map((c, m) => <td key={m} className={m > 0 || g.table!.head[0] === "" ? "lv" : ""}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {g.examples && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {g.examples.map((e, k) => (
                    <li key={k} className="note" style={{ margin: "8px 0" }}>
                      <div className="lv" style={{ fontSize: 18 }}>{e.lv}</div>
                      <div className="muted small">{e.en}</div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          <div className="row"><button className="btn" onClick={() => go("Dialogue")}>Next: dialogue →</button></div>
        </section>
      )}

      {tab === "Dialogue" && (
        <section>
          <div className="spread" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>{unit.dialogue.title}</h3>
            <div className="row">
              <span className="row small" style={{ gap: 8 }}>
                <AudioButton lines={unit.dialogue.lines.map((l) => ({ t: l.lv, v: l.v }))} label="Play the whole dialogue" /> Play all
              </span>
              <label className="small row" style={{ gap: 6 }}><input type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} /> English</label>
            </div>
          </div>
          <p className="muted small">Listen once with English, then turn English off and listen again. Can you follow?</p>
          <ul className="dlg">
            {unit.dialogue.lines.map((l, i) => (
              <li key={i}>
                <AudioButton text={l.lv} v={l.v} />
                <span className="who">{l.s}</span>
                <div><div className="lv">{l.lv}</div>{showEn && <div className="en">{l.en}</div>}</div>
              </li>
            ))}
          </ul>
          <div className="row" style={{ marginTop: 24 }}><button className="btn" onClick={() => go("Practice")}>Next: practice →</button></div>
        </section>
      )}

      {tab === "Practice" && (
        <section key={round}>
          <div className="spread"><span className="muted small">{answered} of {total} answered</span><span className="mono small">{correct} correct</span></div>
          {unit.exercises.map((ex, i) => <ExerciseView key={i} ex={ex} n={i + 1} onDone={(ok) => record(i, ok)} />)}
          {finished && (
            <div className={`result ${correct / total >= 0.6 ? "pass" : "fail"}`} style={{ marginTop: 28 }}>
              <div className="big-n">{correct} <small>/ {total}</small></div>
              <p style={{ marginTop: 10 }}>
                {correct / total >= 0.8 ? "Labi! Strong result — move on." : correct / total >= 0.6 ? "Good enough to move on. Repeat this practice in a few days." : "Go back over the grammar and words, then try again. That's normal for a first go."}
              </p>
              <div className="row">
                <button className="btn ghost" onClick={() => { setResults({}); setRound((r) => r + 1); window.scrollTo({ top: 0 }); }}>Try again</button>
                {nextUnit ? <Link className="btn red" to={`/learn/${nextUnit.id}`}>Next unit: {nextUnit.title} →</Link> : <Link className="btn red" to="/exam">Go to the mock exams →</Link>}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
