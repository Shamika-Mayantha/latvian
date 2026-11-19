import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { allWords, units, type WordRef, unitNo } from "../data";
import { BOX_DAYS, useProgress, type VocabRow } from "../lib/progress";
import { say } from "../lib/audio";
import { shuffle } from "../lib/text";
import { AudioButton } from "../components/ui";

type Dir = "lv-en" | "en-lv";

export default function Review() {
  const { lessons, vocab, saveVocab } = useProgress();
  const [scope, setScope] = useState<string>("due");
  const [dir, setDir] = useState<Dir>("lv-en");
  const [deck, setDeck] = useState<WordRef[] | null>(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ knew: 0, again: 0 });

  const learned = useMemo(() => new Set(units.filter((u) => lessons[u.id]).map((u) => u.id)), [lessons]);
  const now = Date.now();
  const dueWords = allWords.filter((w) => learned.has(w.unitId) && (!vocab[w.id] || new Date(vocab[w.id].due_at).getTime() <= now));

  const start = () => {
    const pool = scope === "due" ? dueWords : allWords.filter((w) => w.unitId === scope);
    setDeck(shuffle(pool).slice(0, 30));
    setI(0); setFlipped(false); setStats({ knew: 0, again: 0 });
  };

  const answer = (knew: boolean) => {
    if (!deck) return;
    const w = deck[i];
    const prev = vocab[w.id]?.box ?? 0;
    const box = knew ? Math.min(prev + 1, BOX_DAYS.length - 1) : 0;
    const due = new Date(Date.now() + BOX_DAYS[box] * 86400000 - 3600000).toISOString();
    const row: VocabRow = { word_id: w.id, box, due_at: due };
    saveVocab([row]);
    setStats((s) => ({ knew: s.knew + (knew ? 1 : 0), again: s.again + (knew ? 0 : 1) }));
    setFlipped(false);
    if (!knew) setDeck((d) => (d ? [...d, w] : d)); // see it again this session
    setI((x) => x + 1);
  };

  if (deck && i < deck.length) {
    const w = deck[i];
    const front = dir === "lv-en" ? w.lv : w.en;
    const back = dir === "lv-en" ? w.en : w.lv;
    return (
      <div className="narrow">
        <div className="spread"><button className="btn small ghost" onClick={() => setDeck(null)}>← Stop</button><span className="mono small">{i + 1} / {deck.length}</span></div>
        <div style={{ margin: "24px 0" }}>
          <div className="card3d" role="button" tabIndex={0}
            onClick={() => { setFlipped(true); if (dir === "lv-en" || !flipped) say(w.lv); }}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped(true); say(w.lv); } }}>
            <div className={`front${dir === "lv-en" ? " lv" : ""}`} style={dir === "en-lv" ? { fontFamily: "var(--sans)", fontSize: 26 } : undefined}>{front}</div>
            {flipped ? (
              <div className={`back${dir === "en-lv" ? " lv" : ""}`} style={dir === "en-lv" ? { fontSize: 30, color: "var(--ink)", fontWeight: 600 } : undefined}>{back}{w.note && <div className="small muted">{w.note}</div>}</div>
            ) : (
              <div className="muted small" style={{ marginTop: 16 }}>{dir === "lv-en" ? "Say what it means, then tap" : "Say it in Latvian out loud, then tap"}</div>
            )}
          </div>
        </div>
        {flipped ? (
          <div className="grid2">
            <button className="btn ghost" onClick={() => answer(false)}>Again</button>
            <button className="btn" onClick={() => answer(true)}>I knew it</button>
          </div>
        ) : (
          <div className="row" style={{ justifyContent: "center" }}><AudioButton text={w.lv} big /></div>
        )}
      </div>
    );
  }

  return (
    <div className="narrow">
      <div className="eyebrow">Vārdi</div>
      <h1>Word review</h1>
      <p className="lede">Spaced repetition: words you know come back after 1, 3, 7, 14 and 30 days. Words you miss come back tomorrow.</p>

      {deck && i >= deck.length && (
        <div className="result pass" style={{ marginBottom: 24 }}>
          <h3>Session done</h3>
          <p>Knew {stats.knew} · Again {stats.again}. Your next reviews are scheduled.</p>
        </div>
      )}

      <div className="panel">
        <label className="f"><span>What to review</span>
          <select className="in" value={scope} onChange={(e) => setScope(e.target.value)}>
            <option value="due">Due words from finished units ({dueWords.length})</option>
            {units.map((u) => <option key={u.id} value={u.id}>Unit {unitNo(u)}: {u.title} ({u.vocab.length})</option>)}
          </select>
        </label>
        <label className="f"><span>Direction</span>
          <select className="in" value={dir} onChange={(e) => setDir(e.target.value as Dir)}>
            <option value="lv-en">Latvian → English (easier)</option>
            <option value="en-lv">English → Latvian (exam-level)</option>
          </select>
        </label>
        {scope === "due" && dueWords.length === 0 ? (
          <p className="muted">{learned.size === 0 ? <>Finish the practice in a unit first — <Link to="/learn">start unit 1</Link>. Or pick a unit above.</> : "Nothing due right now. Come back tomorrow, or pick a unit above."}</p>
        ) : (
          <button className="btn red" onClick={start}>Start ({Math.min(30, scope === "due" ? dueWords.length : allWords.filter((w) => w.unitId === scope).length)} cards)</button>
        )}
      </div>
    </div>
  );
}
