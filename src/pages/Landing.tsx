import { Link } from "react-router-dom";
import { PARTS, units } from "../data";
import { AudioButton } from "../components/ui";

export default function Landing() {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <div className="eyebrow">Valsts valodas prasmes pārbaude · A2</div>
          <h1>From your first <em>Labdien</em> to a pass in the A2 exam.</h1>
          <p className="lede">
            A course built backwards from the real test: {units.length} short units from A1 to A2, native-voice audio for every word,
            and full mock exams in the exact four-part format, scored against the 60% pass line.
          </p>
          <div className="row">
            <Link to="/login" className="btn red">Log in</Link>
          </div>
        </div>
        <div className="examtable" aria-label="The A2 exam at a glance">
          <div className="r hd"><span>Part</span><span>Time</span><span>Points</span></div>
          {PARTS.map((p) => (
            <div className="r" key={p.id}>
              <span><b>{p.lv}</b> <span className="muted small">{p.en}</span></span>
              <span className="mono small">{p.minutes} min</span>
              <span className="mono small">15</span>
            </div>
          ))}
          <div className="r"><span>You pass with <b>9 of 15 in every part</b>.</span><span /><span className="mono small">60%</span></div>
        </div>
      </section>

      <hr />

      <section>
        <h2>How it gets you there</h2>
        <ol className="steps">
          <li>
            <h3>Learn in the exam's own topics</h3>
            <p className="ink2">Family, home, shopping, health, transport, holidays — the topics the official programme lists. Every unit ends with exercises in exam style.</p>
          </li>
          <li>
            <h3>Hear it, then say it</h3>
            <p className="ink2">Every word and dialogue is read by native Latvian neural voices, slowed to A2 pace. Record yourself for the speaking part.</p>
          </li>
          <li>
            <h3>Sit the mock exam</h3>
            <p className="ink2">Timed listening, reading, writing and speaking papers. See your score per part against the pass line, and what to fix.</p>
          </li>
        </ol>
      </section>

      <hr />

      <section className="grid2">
        <div>
          <h2>Try it: listen</h2>
          <p className="ink2">Press play. This is the kind of sentence you'll understand by unit 5.</p>
          <div className="panel">
            <div className="row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
              <AudioButton big text="Koncerts sāksies svētdien, trešajā maijā, pulksten vienpadsmitos." />
              <div>
                <div className="lv" style={{ fontSize: 19 }}>Koncerts sāksies svētdien, 3. maijā, pulksten vienpadsmitos.</div>
                <div className="muted small">The concert will start on Sunday, 3 May, at eleven.</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>What's inside</h2>
          <ul className="ink2" style={{ paddingLeft: 20 }}>
            <li>{units.length} units from absolute beginner to A2</li>
            <li>{units.reduce((s, u) => s + u.vocab.length, 0)} words with audio and spaced review</li>
            <li>3 complete mock exams, one built on the official 2026 sample</li>
            <li>A grammar sheet with every table on one page</li>
            <li>Progress saved to your account, on any device</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
