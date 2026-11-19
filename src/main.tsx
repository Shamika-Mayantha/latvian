import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation, Link } from "react-router-dom";
import "./styles.css";
import { AuthProvider, useAuth } from "./lib/auth";
import { ProgressProvider } from "./lib/progress";
import Landing from "./pages/Landing";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import Review from "./pages/Review";
import Grammar from "./pages/Grammar";
import ExamHome from "./pages/ExamHome";
import ExamRun from "./pages/ExamRun";
import Settings from "./pages/Settings";
import { useEffect } from "react";

function Header() {
  const { user } = useAuth();
  return (
    <header className="top">
      <div className="wrap">
        <Link to={user ? "/app" : "/"} className="brand"><span className="flag" aria-hidden="true" />Latvian A2</Link>
        <nav className="nav" aria-label="Main">
          {user ? (
            <>
              <NavLink to="/app" end>Today</NavLink>
              <NavLink to="/learn">Course</NavLink>
              <NavLink to="/review">Words</NavLink>
              <NavLink to="/grammar">Grammar</NavLink>
              <NavLink to="/exam">Exam</NavLink>
              <NavLink to="/settings">Account</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Private({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <div className="wrap muted">Loading…</div>;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return <>{children}</>;
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const { user, loading } = useAuth();
  return (
    <>
      <ScrollTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={loading ? null : user ? <Navigate to="/app" replace /> : <Landing />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />
          <Route path="/reset" element={<AuthPage mode="reset" />} />
          <Route path="/app" element={<Private><Dashboard /></Private>} />
          <Route path="/learn" element={<Private><Course /></Private>} />
          <Route path="/learn/:id" element={<Private><Lesson /></Private>} />
          <Route path="/review" element={<Private><Review /></Private>} />
          <Route path="/grammar" element={<Private><Grammar /></Private>} />
          <Route path="/exam" element={<Private><ExamHome /></Private>} />
          <Route path="/exam/:examId/:part" element={<Private><ExamRun /></Private>} />
          <Route path="/settings" element={<Private><Settings /></Private>} />
          <Route path="*" element={<div className="narrow"><h1>Page not found</h1><Link to="/">Go home</Link></div>} />
        </Routes>
      </main>
      <footer className="foot">
        <div className="wrap spread">
          <span>Built for one goal: pass the Latvian state language test, A2 level.</span>
          <span>Exam format from the official <a href="https://www.viaa.gov.lv/lv/parbaudes-programma" target="_blank" rel="noreferrer">VIAA programme</a>.</span>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
