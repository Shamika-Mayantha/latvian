import { Link } from "react-router-dom";
import { allWords, PARTS, PASS, units } from "../data";
import { readiness, useProgress } from "../lib/progress";
import { useAuth } from "../lib/auth";
import { Meter } from "../components/ui";

export default function Dashboard() {
  const { user } = useAuth();
  const { ready, lessons, attempts, vocab, profile, error } = useProgress();
  if (!ready) return <div className="wrap muted">{error ? <div className="alert">{error}</div> : "Loading your progress…"}</div>;

  const name = profile.display_name || (user?.user_metadata?.name as string) || "";
  const done = units.filter((u) => lessons[u.id]).length;
  const next = units.find((u) => !lessons[u.id]);
  const learned = new Set(units.filter((u) => lessons[u.id]).map((u) => u.id));
  const now = Date.now();
  const due = allWords.filter((w) => learned.has(w.unitId) && (!vocab[w.id] || new Date(vocab[w.id].due_at).getTime() <= now)).length;
  const r = readiness(attempts);
  const days = profile.exam_date ? Math.ceil((new Date(profile.exam_date + "T09:00").getTime() - now) / 86400000) : null;
  const weakest = PARTS.filter((p) => r[p.id].avg !== null).sort((a, b) => (r[a.id].avg ?? 0) - (r[b.id].avg ?? 0))[0];

  const hour = new Date().getHours();
  const greet = hour < 11 ? "Labrīt" : hour < 18 ? "Labdien" : "Labvakar";

  return (
    <div className="wrap">
      <div className="eyebrow">{new Date().toLocaleDateString("lv-LV", { weekday: "long", day: "numeric", month: "long" })}</div>
      <h1>{greet}{name ? `, ${name}` : ""}!</h1>

      <div className="grid4" style={{ margin: "28px 0 36px" }}>
        <div className="stat">
          <div className="lbl">Exam</div>
          {days === null ? <div><Link to="/settings">Set your exam date</Link></div>
            : days >= 0 ? <div className="big-n">{days} <small>days left</small></div>
            : <div className="big-n" style={{ fontSize: 22 }}>Date passed</div>}
        </div>
        <div className="stat"><div className="lbl">Course</div><div className="big-n">{done}<small> / {units.length} units</small></div></div>
        <div className="stat"><div className="lbl">Words due</div><div className="big-n">{due}</div>{due > 0 && <Link to="/review" className="small">Review now</Link>}</div>
        <div className="stat"><div className="lbl">Mock attempts</div><div className="big-n">{attempts.length}</div></div>
      </div>

      <div className="grid2">
        <section className="panel">
          <div className="eyebrow">Next step</div>
          {next ? (
            <>
              <h2 style={{ marginBottom: 4 }}>Unit {Number(next.id.slice(1))}: {next.title}</h2>
              <div className="lv ink2" style={{ fontSize: 19, marginBottom: 10 }}>{next.lvTitle}</div>
              <p className="ink2">{next.goal}</p>
              <p className="small muted">Helps with: {next.exam}</p>
              <Link className="btn red" to={`/learn/${next.id}`}>{done === 0 ? "Start the course" : "Continue"}</Link>
            </>
          ) : (
            <>
              <h2>Course complete</h2>
              <p className="ink2">You've worked through every unit. Now it's about exam practice: sit a full mock under time, then re-do the weakest part.</p>
              <Link className="btn red" to="/exam">Go to mock exams</Link>
            </>
          )}
        </section>

        <section className="panel">
          <div className="spread"><div className="eyebrow">Exam readiness</div><span className="small muted">avg. of last 3 · line = pass (9/15)</span></div>
          {PARTS.map((p) => {
            const x = r[p.id];
            return (
              <div key={p.id} style={{ marginBottom: 14 }}>
                <div className="spread">
                  <span><b>{p.en}</b> <span className="muted small lv">{p.lv}</span></span>
                  <span className="mono small">{x.avg === null ? "—" : `${x.avg.toFixed(1)} / 15`}</span>
                </div>
                <Meter score={x.avg} />
              </div>
            );
          })}
          {attempts.length === 0 ? (
            <p className="small muted">No mock exams yet. Try one after unit 6 to see where you stand — it's fine to score low at first.</p>
          ) : weakest && (r[weakest.id].avg ?? 0) < PASS ? (
            <p className="small"><b>Focus:</b> {weakest.en} is below the pass line. <Link to="/exam">Practise it</Link>.</p>
          ) : (
            <p className="small" style={{ color: "var(--ok)" }}>All practised parts are at or above the pass line. Keep it there.</p>
          )}
        </section>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2>A daily routine that works</h2>
        <div className="tablewrap">
          <table className="t">
            <thead><tr><th>Time</th><th>Do this</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td>10 min</td><td><Link to="/review">Review due words</Link>, say each one out loud</td><td>Vocabulary is the biggest factor in every part</td></tr>
              <tr><td>20 min</td><td>One unit section: words → grammar → dialogue → practice</td><td>Small steps every day beat long weekend sessions</td></tr>
              <tr><td>5 min</td><td>Answer 3 speaking questions out loud from the <Link to="/exam">exam page</Link></td><td>Speaking is where beginners lose the most points</td></tr>
              <tr><td>Weekly</td><td>One mock exam part under time</td><td>Learn the format so nothing surprises you on the day</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
