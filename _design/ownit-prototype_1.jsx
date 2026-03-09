import { useState } from "react";

// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:         "#F0F4F8",   // helles Taubenblau-Grau
  surface:    "#FFFFFF",
  blue:       "#6B8FA8",   // Taubenblau
  blueDark:   "#3D6B8A",   // dunkles Taubenblau
  blueLight:  "#C8DCE8",   // sehr helles Taubenblau
  coral:      "#E8725A",   // Koralle (Akzent)
  coralLight: "#FAE8E5",
  text:       "#1C2B3A",
  muted:      "#8FA3B1",
  done:       "#6BBF8E",
};

const QUOTES = [
  "Done is better than perfect.",
  "Start where you are. Use what you have.",
  "Focus on progress, not perfection.",
  "Small steps every day lead to big results.",
  "The secret of getting ahead is getting started.",
];

const INITIAL_PROJECTS = [
  {
    id: 1, name: "Geburtstagsparty", color: C.blueDark,
    todos: [
      { id: 1, text: "Venue buchen", status: "done", owner: "Hannah" },
      { id: 2, text: "Einladungen verschicken", status: "done", owner: "Mia" },
      { id: 3, text: "Dekoration kaufen", status: "inprogress", owner: "Hannah" },
      { id: 4, text: "Musik Playlist", status: "inprogress", owner: "Mia" },
      { id: 5, text: "Fotos ausdrucken", status: "todo", owner: null },
      { id: 6, text: "Blumen besorgen", status: "todo", owner: null },
      { id: 7, text: "Kuchen bestellen", status: "todo", owner: null },
    ],
    members: ["H", "M", "T"],
  },
  {
    id: 2, name: "Mallorca", color: C.blue,
    todos: [
      { id: 1, text: "Flüge buchen", status: "done", owner: "Hannah" },
      { id: 2, text: "Hotel suchen", status: "inprogress", owner: "Tom" },
      { id: 3, text: "Ausflüge planen", status: "todo", owner: null },
      { id: 4, text: "Koffer packen", status: "todo", owner: null },
    ],
    members: ["H", "T"],
  },
  {
    id: 3, name: "Renovierung", color: C.coral,
    todos: [
      { id: 1, text: "Farbe aussuchen", status: "todo", owner: null },
      { id: 2, text: "Handwerker anrufen", status: "todo", owner: null },
    ],
    members: ["H", "M"],
  },
];

const USER = "Hannah";
const MEMBER_COLORS = { H: C.coral, M: C.blue, T: C.done };

const STATUS_CONFIG = {
  todo:       { label: "To Do",       bg: C.blueLight,  color: C.blueDark },
  inprogress: { label: "In Progress", bg: C.coralLight, color: C.coral },
  done:       { label: "Done",        bg: "#E0F5EB",    color: C.done },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const getOpen   = (p) => p.todos.filter(t => t.status !== "done").length;
const getDone   = (p) => p.todos.filter(t => t.status === "done").length;
const getProgress = (p) => Math.round((getDone(p) / p.todos.length) * 100);

// Bubble-Größe: min 90px, max 160px basierend auf offenen Aufgaben
const getBubbleSize = (openCount, maxOpen) => {
  const min = 90, max = 160;
  if (maxOpen === 0) return min;
  return Math.round(min + ((openCount / maxOpen) * (max - min)));
};

// ── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "80px 32px 60px", fontFamily: "'Georgia', serif" }}>

      {/* Logo + Tagline */}
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 24, background: C.blueDark, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 8px 24px ${C.blueDark}44` }}>
          <span style={{ fontSize: 32 }}>✓</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 700, color: C.text, letterSpacing: "-1px" }}>
          Own It
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 16, color: C.muted, lineHeight: 1.5 }}>
          Take ownership.<br />Get things done together.
        </p>
      </div>

      {/* Bubble Preview – dekorativ */}
      <div style={{ position: "relative", width: 280, height: 240 }}>
        {[
          { size: 140, x: 20,  y: 20,  color: C.blueDark,  label: "Urlaub", count: 5 },
          { size: 100, x: 150, y: 10,  color: C.blue,      label: "Party",  count: 3 },
          { size: 80,  x: 170, y: 120, color: C.coral,     label: "Umzug",  count: 2 },
          { size: 60,  x: 30,  y: 160, color: C.blueLight, label: "",       count: 0 },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", left: b.x, top: b.y,
            width: b.size, height: b.size, borderRadius: "50%",
            background: b.color,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 20px ${b.color}55`,
            transition: "transform 0.3s ease",
          }}>
            {b.label && <span style={{ fontSize: b.size > 100 ? 13 : 11, color: b.size > 100 ? "#fff" : C.muted, fontWeight: 600 }}>{b.label}</span>}
            {b.count > 0 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{b.count} offen</span>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ width: "100%", maxWidth: 320 }}>
        <button
          onClick={onEnter}
          style={{ width: "100%", padding: "16px", background: C.blueDark, color: "#fff", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 8px 24px ${C.blueDark}44`, marginBottom: 12 }}
        >
          Jetzt starten →
        </button>
        <button
          onClick={onEnter}
          style={{ width: "100%", padding: "16px", background: "transparent", color: C.muted, border: `1.5px solid ${C.blueLight}`, borderRadius: 16, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}
        >
          Einloggen
        </button>
      </div>
    </div>
  );
}

// ── PROJECT LIST ─────────────────────────────────────────────────────────────
function ProjectList({ projects, onOpen, quote }) {
  const maxOpen = Math.max(...projects.map(getOpen));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ padding: "52px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1, paddingRight: 16 }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: C.muted }}>Guten Morgen, {USER} 👋</p>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: C.text, lineHeight: 1.3, fontStyle: "italic" }}>
              "{quote}"
            </h1>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.coral, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
            H
          </div>
        </div>
      </div>

      {/* Bubble View */}
      <div style={{ padding: "0 28px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 15, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Deine Projekte</h2>
          <button style={{ background: C.coral, color: "#fff", border: "none", borderRadius: 99, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            + Neu
          </button>
        </div>

        {/* Bubbles */}
        <div style={{ position: "relative", minHeight: 320, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16, padding: "16px 0 32px" }}>
          {projects.map((project) => {
            const size = getBubbleSize(getOpen(project), maxOpen);
            const bg = project.color;

            return (
              <div
                key={project.id}
                onClick={() => onOpen(project.id)}
                style={{
                  width: size, height: size, borderRadius: "50%",
                  background: `${bg}22`,
                  border: `2px solid ${bg}66`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: `0 4px 20px ${bg}33, inset 0 2px 8px rgba(255,255,255,0.6)`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  padding: 12,
                  textAlign: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 8px 28px ${bg}44, inset 0 2px 8px rgba(255,255,255,0.6)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 20px ${bg}33, inset 0 2px 8px rgba(255,255,255,0.6)`; }}
              >
                <span style={{ fontSize: size > 120 ? 13 : 11, color: bg, fontWeight: 700, lineHeight: 1.2 }}>
                  {project.name}
                </span>
                <span style={{ fontSize: 10, color: `${bg}99`, marginTop: 3 }}>
                  {getOpen(project)} offen
                </span>
              </div>
            );
          })}
        </div>

        {/* Legende */}
        <p style={{ textAlign: "center", fontSize: 11, color: C.muted, margin: "0 0 24px", fontStyle: "italic" }}>
          Größere Bubbles = mehr offene Aufgaben
        </p>
      </div>

      {/* Project List – kompakte Übersicht */}
      <div style={{ padding: "0 28px 40px" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 15, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Übersicht</h2>
        {projects.map((project) => {
          const bg = project.color;
          return (
            <div
              key={project.id}
              onClick={() => onOpen(project.id)}
              style={{ background: C.surface, borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: bg, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text }}>{project.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted }}>{getDone(project)}/{project.todos.length} erledigt</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: getOpen(project) > 0 ? C.coral : C.done }}>
                  {getOpen(project) > 0 ? `${getOpen(project)} offen` : "✓ Fertig"}
                </span>
                <div style={{ width: 60, height: 4, background: C.blueLight, borderRadius: 99, marginTop: 4 }}>
                  <div style={{ width: `${getProgress(project)}%`, height: 4, background: bg, borderRadius: 99 }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PROJECT DETAIL ───────────────────────────────────────────────────────────
function ProjectDetail({ project, projects, onBack, onUpdate }) {
  const p = projects.find(x => x.id === project.id);
  const byStatus = (s) => p.todos.filter(t => t.status === s);
  const bg = p.color;

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "48px 28px 28px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, padding: "8px 16px", color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 16 }}>
          ← Zurück
        </button>
        <h1 style={{ margin: "0 0 16px", fontSize: 26, color: "#fff", fontWeight: 700 }}>{p.name}</h1>

        {/* Members */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
          {p.members.map((m) => (
            <div key={m} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {m}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.8)", fontSize: 12, marginBottom: 6 }}>
          <span>{getDone(p)}/{p.todos.length} erledigt</span>
          <span>{getProgress(p)}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 99, height: 6 }}>
          <div style={{ background: "#fff", borderRadius: 99, height: 6, width: `${getProgress(p)}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Todos */}
      <div style={{ padding: "8px 20px 40px" }}>
        {["todo", "inprogress", "done"].map((status) => {
          const items = byStatus(status);
          const cfg = STATUS_CONFIG[status];
          return (
            <div key={status} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ background: "rgba(255,255,255,0.25)", color: "#fff", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
                  {cfg.label}
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{items.length}</span>
              </div>

              {items.length === 0 && (
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 14, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 13, border: "2px dashed rgba(255,255,255,0.25)" }}>
                  Leer
                </div>
              )}

              {items.map((todo) => (
                <div key={todo.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", borderLeft: `3px solid ${cfg.color}` }}>
                  <p style={{ margin: "0 0 10px", fontSize: 15, color: status === "done" ? C.muted : C.text, textDecoration: status === "done" ? "line-through" : "none" }}>
                    {todo.text}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {todo.owner ? (
                        <>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: MEMBER_COLORS[todo.owner[0]] || C.muted, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {todo.owner[0]}
                          </div>
                          <span style={{ fontSize: 12, color: C.muted }}>{todo.owner}</span>
                        </>
                      ) : (
                        <span style={{ fontSize: 12, color: C.muted }}>Niemand</span>
                      )}
                    </div>

                    {status === "todo" && (
                      <button
                        onClick={() => onUpdate(p.id, todo.id, { status: "inprogress", owner: USER })}
                        style={{ background: C.coral, color: "#fff", border: "none", borderRadius: 99, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        Ich mach das! →
                      </button>
                    )}
                    {status === "inprogress" && todo.owner === USER && (
                      <button
                        onClick={() => onUpdate(p.id, todo.id, { status: "done" })}
                        style={{ background: C.done, color: "#fff", border: "none", borderRadius: 99, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        ✓ Erledigt!
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | list | detail
  const [activeId, setActiveId] = useState(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const updateTodo = (projectId, todoId, changes) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === projectId
          ? { ...p, todos: p.todos.map(t => t.id === todoId ? { ...t, ...changes } : t) }
          : p
      )
    );
  };

  if (screen === "landing") return <LandingPage onEnter={() => setScreen("list")} />;
  if (screen === "detail") return (
    <ProjectDetail
      project={projects.find(p => p.id === activeId)}
      projects={projects}
      onBack={() => setScreen("list")}
      onUpdate={(pid, tid, changes) => { updateTodo(pid, tid, changes); }}
    />
  );
  return (
    <ProjectList
      projects={projects}
      quote={quote}
      onOpen={(id) => { setActiveId(id); setScreen("detail"); }}
    />
  );
}
