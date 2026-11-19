import { useEffect, useRef, useState, type RefObject } from "react";
import { play, stop } from "../lib/audio";
import type { Voice } from "../data/types";
import { PASS } from "../data";

const SpeakerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6h3l4-3v10L5 10H2z" fill="currentColor" /><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
);
const StopIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="2" width="10" height="10" fill="currentColor" /></svg>);

/** Small round button that speaks Latvian text. */
export function AudioButton({ text, v = "f", lines, big, label, rate }: { text?: string; v?: Voice; lines?: { t: string; v: Voice }[]; big?: boolean; label?: string; rate?: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => () => { if (on) stop(); }, [on]);
  return (
    <button
      type="button"
      className={`play${big ? " big" : ""}${on ? " on" : ""}`}
      aria-label={on ? "Stop" : label ?? `Listen: ${text ?? ""}`}
      title={on ? "Stop" : "Listen"}
      onClick={async () => {
        if (on) { stop(); setOn(false); return; }
        setOn(true);
        await play(lines ?? [{ t: text ?? "", v }], { rate });
        setOn(false);
      }}
    >
      {on ? <StopIcon /> : <SpeakerIcon />}
    </button>
  );
}

const LETTERS = ["ā", "č", "ē", "ģ", "ī", "ķ", "ļ", "ņ", "š", "ū", "ž"];

/** Buttons that type Latvian letters into the given input/textarea. */
export function DiacriticKeys({ target, onInsert }: { target: RefObject<HTMLInputElement | HTMLTextAreaElement>; onInsert: (value: string) => void }) {
  const [upper, setUpper] = useState(false);
  const insert = (ch: string) => {
    const el = target.current;
    if (!el) return;
    const s = el.selectionStart ?? el.value.length;
    const e = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, s) + ch + el.value.slice(e);
    onInsert(next);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + ch.length, s + ch.length); });
  };
  return (
    <div className="keys" role="group" aria-label="Latvian letters">
      {LETTERS.map((l) => {
        const ch = upper ? l.toUpperCase() : l;
        return <button type="button" key={l} onMouseDown={(e) => e.preventDefault()} onClick={() => insert(ch)}>{ch}</button>;
      })}
      <button type="button" style={{ width: "auto", padding: "0 10px", fontSize: 13, fontFamily: "var(--sans)" }} onMouseDown={(e) => e.preventDefault()} onClick={() => setUpper((u) => !u)}>
        {upper ? "abc" : "ABC"}
      </button>
    </div>
  );
}

/** Text input with Latvian letter keys underneath. */
export function LvInput({ value, onChange, className = "", placeholder, disabled, onEnter, inline }: { value: string; onChange: (v: string) => void; className?: string; placeholder?: string; disabled?: boolean; onEnter?: () => void; inline?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  return (
    <span style={{ display: inline ? "inline-block" : "block" }}>
      <input
        ref={ref}
        className={`in ${inline ? "inline " : ""}${className}`}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
        lang="lv"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && onEnter) onEnter(); }}
      />
      {!disabled && !inline && focused !== null && <DiacriticKeys target={ref} onInsert={onChange} />}
    </span>
  );
}

export function Meter({ score, max = 15 }: { score: number | null; max?: number }) {
  const pct = score == null ? 0 : Math.max(0, Math.min(100, (score / max) * 100));
  const cls = score == null ? "" : score >= (max * PASS) / 15 ? "pass" : "fail";
  return (
    <div className="meter" role="img" aria-label={score == null ? "No attempts yet" : `${score} of ${max}; pass line is 60%`}>
      <div className={`fill ${cls}`} style={{ width: `${pct}%` }} />
      <div className="line" title="Pass line: 60%" />
    </div>
  );
}

export function Segmented({ value, options, onChange, label }: { value: number | null; options: number[]; onChange: (n: number) => void; label: string }) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" role="radio" aria-checked={value === o} className={value === o ? "on" : ""} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

/** Renders **bold** in a plain string. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return <>{parts.map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>))}</>;
}
