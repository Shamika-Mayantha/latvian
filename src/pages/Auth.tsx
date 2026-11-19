import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

type Mode = "login" | "signup" | "reset";

export default function AuthPage({ mode }: { mode: Mode }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  if (user && mode !== "reset") return <Navigate to={loc.state?.from ?? "/app"} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null); setMsg(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav(loc.state?.from ?? "/app", { replace: true });
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { data: { name }, emailRedirectTo: `${window.location.origin}/app` },
        });
        if (error) throw error;
        if (!data.session) setMsg("Almost done — we sent you an email. Click the link in it to confirm your account, then log in.");
        else nav("/app", { replace: true });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/settings` });
        if (error) throw error;
        setMsg("If that email has an account, a reset link is on its way.");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const title = mode === "login" ? "Log in" : mode === "signup" ? "Create your account" : "Reset password";

  return (
    <div className="auth narrow">
      <div className="eyebrow">{mode === "signup" ? "Sāksim! — Let's begin" : "Laipni lūdzam atpakaļ"}</div>
      <h1>{title}</h1>
      <form onSubmit={submit} className="panel" noValidate>
        {mode === "signup" && (
          <label className="f"><span>Your first name</span>
            <input className="in" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
          </label>
        )}
        <label className="f"><span>Email</span>
          <input className="in" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        {mode !== "reset" && (
          <label className="f"><span>Password {mode === "signup" && <span className="muted small" style={{ display: "inline" }}>(at least 6 characters)</span>}</span>
            <input className="in" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          </label>
        )}
        {err && <div className="alert" role="alert">{err}</div>}
        {msg && <div className="alert ok" role="status">{msg}</div>}
        <button className="btn red" style={{ width: "100%" }} disabled={busy || !email || (mode !== "reset" && password.length < 6)}>
          {busy ? "Please wait…" : title}
        </button>
      </form>
      <p className="small muted" style={{ marginTop: 16 }}>
        {mode === "login" && <>No account? Ask the site owner for your login. · <Link to="/reset">Forgot password?</Link></>}
        {mode === "signup" && <>Already have an account? <Link to="/login">Log in</Link></>}
        {mode === "reset" && <><Link to="/login">Back to log in</Link></>}
      </p>
    </div>
  );
}
