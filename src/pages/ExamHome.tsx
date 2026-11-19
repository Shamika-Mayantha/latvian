import { useState } from "react";
import { Link } from "react-router-dom";
import { exams, PARTS, PASS, type Part } from "../data";
import { useProgress } from "../lib/progress";
import { AudioButton } from "../components/ui";

const TASKS: Record<Part, { t: string; pts: number }[]> = {
  listening: [
    { t: "6 short announcements (radio, shop, station). One question each, 3 options.", pts: 6 },
    { t: "One conversation. 4 statements — Jā (true) or Nē (false).", pts: 4 },
    { t: "5 short dialogues. Fill one missing word or number per sentence from 9 options.", pts: 5 },
  ],
  reading: [
    { t: "4 short texts (ad, notice, note, article). Pick the one true statement of 3.", pts: 4 },
    { t: "6 people's situations and 8 ads. Match each person to an ad.", pts: 6 },
    { t: "A ~100-word text with 5 gaps. Pick the right word form of 3.", pts: 5 },
  ],
  writing: [
    { t: "Describe a person from a business card and pictures — at least 30 words.", pts: 4 },
    { t: "5 sentences: write the word in brackets in the correct form.", pts: 5 },
    { t: "Email / letter / invitation / ad following a 5-point plan — at least 35 words.", pts: 6 },
  ],
  speaking: [
    { t: "Interview: the examiner asks 9–10 questions about you. Answer in full sentences.", pts: 0 },
    { t: "Describe two pictures — people, actions, place, time.", pts: 12 },
    { t: "3 ads with missing info. Ask one full question for each.", pts: 3 },
  ],
};

const TIPS: Record<Part, string[]> = {
  listening: [
    "Read the questions BEFORE the audio starts. Underline what kind of answer you need: a time? a date? a place?",
    "Every recording plays twice. First time: catch the answer. Second time: check it.",
    "Distractors are deliberate: the audio often mentions two dates or two times. Listen for which one the question asks about.",
    "Know your numbers, dates (-ajā), times (-os, pus-) and days cold — about half the points depend on them.",
  ],
  reading: [
    "You don't need every word. Find the sentence the question is about and read only that closely.",
    "In task 2, two ads are extra. Match the easy situations first, then the rest by elimination.",
    "In task 3, look at the words around the gap: preposition? case? tense? The grammar decides.",
    "30 minutes for about 700 words is plenty. Don't rush — check task 3 at the end.",
  ],
  writing: [
    "Hit the word count: 30 and 35 are minimums. Aim for 40–50 words.",
    "Cover EVERY point of the plan. A missing point costs more than a grammar mistake.",
    "Write short, correct sentences linked with un, bet, jo, tāpēc. Don't try to be fancy.",
    "Use the words from the task sheet — they're already spelled correctly. Check ā ē ī ū š ž č at the end.",
    "Start and end letters properly: Sveiks/Sveika, …! — Uz redzēšanos! / Tava …",
  ],
  speaking: [
    "Always answer in a FULL sentence, repeating the question's words: “Kur jūs dzīvojat?” → “Es dzīvoju Rīgā.”",
    "Add one more sentence with jo (because) — it shows you can give a reason.",
    "Didn't understand? Say “Lūdzu, atkārtojiet!” — that's allowed and costs nothing.",
    "Pictures: use the 5-step plan from unit 18. Where/when → who → what they do → how they look → your opinion.",
    "Task 3: question word + verb + words from the ad. “Kurā datumā notiks spēle?”",
  ],
};

export default function ExamHome() {
  const { attempts } = useProgress();
  const [open, setOpen] = useState<Part | null>("listening");
  const [bank, setBank] = useState(false);
  const best = (examId: string, part: Part) => {
    const rows = attempts.filter((a) => a.exam_id === examId && a.part === part);
    return rows.length ? Math.max(...rows.map((r) => r.score)) : null;
  };

  return (
    <div className="wrap">
      <div className="eyebrow">Valsts valodas prasmes pārbaude</div>
      <h1>The A2 exam</h1>
      <p className="lede">Four parts, 15 points each. You need <b>at least 9 points (60%) in every part</b> — a strong part can't make up for a weak one. Results only count if you sit all four parts.</p>

      <div className="grid4" style={{ margin: "28px 0" }}>
        {PARTS.map((p) => (
          <div key={p.id} className="stat">
            <div className="lbl">{p.en}</div>
            <div className="lv" style={{ fontSize: 20, fontWeight: 600 }}>{p.lv}</div>
            <div className="small ink2">{p.minutes} min · 15 points · pass {PASS}</div>
            <div className="small muted">{p.how}</div>
          </div>
        ))}
      </div>

      <h2>Mock exams</h2>
      <p className="ink2">Each part is timed like the real thing. Listening and reading are marked automatically; for writing and speaking you mark yourself against the official criteria, with model answers to compare.</p>
      <div className="tablewrap">
        <table className="t">
          <thead><tr><th>Paper</th>{PARTS.map((p) => <th key={p.id}>{p.en}</th>)}</tr></thead>
          <tbody>
            {exams.map((x) => (
              <tr key={x.id}>
                <td><b>{x.title}</b><div className="small muted" style={{ fontWeight: 400 }}>{x.note}</div></td>
                {PARTS.map((p) => {
                  const b = best(x.id, p.id);
                  return (
                    <td key={p.id}>
                      <Link className="btn small ghost" to={`/exam/${x.id}/${p.id}`}>{b === null ? "Start" : "Retry"}</Link>
                      {b !== null && <div className="small mono" style={{ marginTop: 4, whiteSpace: "nowrap", color: b >= PASS ? "var(--ok)" : "var(--carmine)" }}>best {b}/15</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />
      <h2>Each part, task by task — and how to score</h2>
      {PARTS.map((p) => (
        <section key={p.id} className="panel">
          <button type="button" onClick={() => setOpen(open === p.id ? null : p.id)} aria-expanded={open === p.id}
            style={{ all: "unset", cursor: "pointer", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "baseline" }}>
            <h3 style={{ margin: 0 }}>{p.en} <span className="lv muted" style={{ fontWeight: 400 }}>· {p.lv}</span></h3>
            <span className="mono small">{open === p.id ? "−" : "+"}</span>
          </button>
          {open === p.id && (
            <div className="grid2" style={{ marginTop: 16 }}>
              <div>
                <h4>The tasks</h4>
                <ol style={{ paddingLeft: 20 }}>
                  {TASKS[p.id].map((t, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>{t.t} {t.pts > 0 && <span className="tag">{t.pts} p</span>}</li>
                  ))}
                </ol>
                {p.id === "speaking" && <p className="small muted">Tasks 1 and 2 are marked together (12 points), task 3 gives 3 points.</p>}
              </div>
              <div>
                <h4>How to score</h4>
                <ul style={{ paddingLeft: 20 }}>{TIPS[p.id].map((t, i) => <li key={i} style={{ marginBottom: 8 }}>{t}</li>)}</ul>
              </div>
            </div>
          )}
        </section>
      ))}

      <hr />
      <div className="spread">
        <h2>Speaking question bank</h2>
        <button className="btn small ghost" onClick={() => setBank((b) => !b)}>{bank ? "Hide" : "Show"} all {exams.reduce((s, x) => s + x.speaking.t1.length, 0)} questions</button>
      </div>
      <p className="ink2">These are the kinds of questions the examiner asks in task 1. Listen, answer out loud, then compare with the model. Change the model to be true for <i>you</i> — then learn your version.</p>
      {bank && (
        <div className="tablewrap">
          <table className="t">
            <thead><tr><th style={{ width: 44 }} /><th>Question</th><th>Model answer</th></tr></thead>
            <tbody>
              {exams.flatMap((x) => x.speaking.t1).map((q, i) => (
                <tr key={i}>
                  <td><AudioButton text={q.q} v="m" /></td>
                  <td className="lv">{q.q}</td>
                  <td className="lv ink2"><span className="row" style={{ gap: 8, flexWrap: "nowrap" }}><AudioButton text={q.model} />{q.model}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr />
      <h2>Official sources</h2>
      <ul className="ink2" style={{ paddingLeft: 20 }}>
        <li><a href="https://www.viaa.gov.lv/lv/parbaudes-programma" target="_blank" rel="noreferrer">VIAA — test programme and the official A2 sample paper (PDF + audio)</a></li>
        <li><a href="https://www.viaa.gov.lv/lv/valsts-valodas-prasmes-limeni" target="_blank" rel="noreferrer">VIAA — proficiency levels</a></li>
        <li><a href="https://elaipa.lv/Home/A2" target="_blank" rel="noreferrer">e-Laipa A2 — free self-study from the Latvian Language Agency</a></li>
        <li><a href="https://likumi.lv/ta/id/330669" target="_blank" rel="noreferrer">Cabinet Regulation No. 157 — the legal rules of the test</a></li>
      </ul>
      <p className="small muted">Register for the exam and check dates on the VIAA website. Bring a valid ID; phones and smartwatches stay in your bag.</p>
    </div>
  );
}
