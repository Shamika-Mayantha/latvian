import { Link } from "react-router-dom";
import { stages, units, unitNo } from "../data";
import { useProgress } from "../lib/progress";

export default function Course() {
  const { lessons } = useProgress();
  return (
    <div className="wrap">
      <div className="eyebrow">Kurss</div>
      <h1>The course</h1>
      <p className="lede">{units.length} units in order, starting from zero at A1. Each one takes about an hour, spread over two or three days. Finish the practice to mark it done — you can redo it any time.</p>
      {stages.map((s) => (
        <section key={s.n}>
          <div className="stage">
            <div className="num">{s.n}</div>
            <div><h2 style={{ marginBottom: 2 }}>{s.title}</h2><div className="muted">{s.sub}</div></div>
          </div>
          <ul className="ulist">
            {units.filter((u) => u.stage === s.n).map((u) => {
              const l = lessons[u.id];
              return (
                <li key={u.id}>
                  <Link to={`/learn/${u.id}`}>
                    <span className="no">{String(unitNo(u)).padStart(2, "0")}</span>
                    <span>
                      <span className="tt">{u.title}</span> <span className="lv muted"> · {u.lvTitle}</span>
                      <div className="sub">{u.exam}</div>
                    </span>
                    <span className={`st${l ? " done" : ""}`}>{l ? `Done · ${l.score}/${l.max_score}` : `${u.vocab.length} words`}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
