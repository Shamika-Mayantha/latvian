import { Link } from "react-router-dom";
import { units, unitNo } from "../data";
import { Rich } from "../components/ui";

const CASES = {
  head: ["Case", "Answers", "galds (m)", "brālis (m)", "māsa (f)", "māte (f)"],
  rows: [
    ["Nominative — dictionary form, subject", "kas?", "galds", "brālis", "māsa", "māte"],
    ["Genitive — of, from (no), after nav", "kā?", "galda", "brāļa", "māsas", "mātes"],
    ["Dative — to / for someone", "kam?", "galdam", "brālim", "māsai", "mātei"],
    ["Accusative — object; after uz (to), ar, par", "ko?", "galdu", "brāli", "māsu", "māti"],
    ["Locative — in / at", "kur?", "galdā", "brālī", "māsā", "mātē"],
    ["Plural nominative", "kas?", "galdi", "brāļi", "māsas", "mātes"],
    ["Plural dative", "kam?", "galdiem", "brāļiem", "māsām", "mātēm"],
    ["Plural accusative", "ko?", "galdus", "brāļus", "māsas", "mātes"],
    ["Plural locative", "kur?", "galdos", "brāļos", "māsās", "mātēs"],
  ],
};

const TENSES = {
  head: ["", "būt", "strādāt", "iet", "braukt"],
  rows: [
    ["Present: es", "esmu", "strādāju", "eju", "braucu"],
    ["Present: viņš / viņi", "ir", "strādā", "iet", "brauc"],
    ["Past: es", "biju", "strādāju", "gāju", "braucu"],
    ["Past: viņš / viņi", "bija", "strādāja", "gāja", "brauca"],
    ["Future: es", "būšu", "strādāšu", "iešu", "braukšu"],
    ["Future: viņš / viņi", "būs", "strādās", "ies", "brauks"],
    ["Must (debitive)", "man jābūt", "man jāstrādā", "man jāiet", "man jābrauc"],
  ],
};

function T({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="tablewrap">
      <table className="t">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={j > 0 ? "lv" : ""}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function Grammar() {
  return (
    <div className="narrow">
      <div className="eyebrow">Gramatika</div>
      <h1>Grammar on one page</h1>
      <p className="lede">Everything the A2 exam expects, in the order the course teaches it. Print it, or keep it open while you write.</p>

      <section className="panel">
        <h2>The five cases you need</h2>
        <p className="ink2">Latvian has seven cases; at A2 you need these five. Find the noun's ending in the top row, then read down.</p>
        <T {...CASES} />
        <p className="small muted">Masculine -s/-š words follow <span className="lv">galds</span>, -is words follow <span className="lv">brālis</span>, -a words follow <span className="lv">māsa</span>, -e words follow <span className="lv">māte</span>.</p>
      </section>

      <section className="panel">
        <h2>Verbs at a glance</h2>
        <p className="ink2">Remember: the <b>he / she / they</b> form is always the same.</p>
        <T {...TENSES} />
      </section>

      <hr />
      <h2>Unit by unit</h2>
      <nav className="small" style={{ columns: 2, marginBottom: 24 }}>
        {units.map((u) => <div key={u.id}><a href={`#g-${u.id}`}>{unitNo(u)}. {u.title}</a></div>)}
      </nav>
      {units.map((u) => (
        <section key={u.id} id={`g-${u.id}`} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
          <div className="spread"><h3 style={{ marginBottom: 2 }}>{unitNo(u)}. {u.title}</h3><Link to={`/learn/${u.id}`} className="small">Open unit</Link></div>
          {u.grammar.map((g, i) => (
            <div key={i} style={{ marginTop: 12 }}>
              <h4>{g.title}</h4>
              {g.body.map((p, j) => <p key={j} className="ink2"><Rich text={p} /></p>)}
              {g.table && <T head={g.table.head} rows={g.table.rows} />}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
