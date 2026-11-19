import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { useProgress } from "../lib/progress";

export default function Settings() {
  const { user } = useAuth();
  const { profile, saveProfile, ready } = useProgress();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    setName(profile.display_name ?? (user?.user_metadata?.name as string) ?? "");
    setDate(profile.exam_date ?? "");
  }, [ready, profile.display_name, profile.exam_date, user]);

  const save = async () => {
    setErr(null);
    await saveProfile({ display_name: name.trim() || null, exam_date: date || null });
    setMsg("Saved.");
    setTimeout(() => setMsg(null), 2000);
  };

  const changePw = async () => {
    setErr(null);
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) setErr(error.message);
    else { setPw(""); setMsg("Password changed."); }
  };

  return (
    <div className="narrow">
      <div className="eyebrow">Konts</div>
      <h1>Account</h1>
      <p className="muted">Signed in as {user?.email}</p>

      <section className="panel">
        <h3>You and your exam</h3>
        <label className="f"><span>Name</span><input className="in" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="f"><span>Exam date</span><input className="in" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <p className="small muted">Book the exam on the VIAA website. Give yourself at least 3–4 months from zero, studying about 30–45 minutes a day.</p>
        <button className="btn" onClick={save}>Save</button>
      </section>

      <section className="panel">
        <h3>Password</h3>
        <label className="f"><span>New password</span><input className="in" type="password" minLength={6} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></label>
        <button className="btn ghost" disabled={pw.length < 6} onClick={changePw}>Change password</button>
      </section>

      {msg && <div className="alert ok" role="status">{msg}</div>}
      {err && <div className="alert" role="alert">{err}</div>}

      <section style={{ marginTop: 32 }}>
        <button className="btn ghost" onClick={async () => { await supabase.auth.signOut(); nav("/"); }}>Log out</button>
      </section>
    </div>
  );
}
