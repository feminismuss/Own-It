# User Story 11 – Plan Progress & Completion

| | |
|---|---|
| **Branch** | `feature/plan-progress` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Plan.js` | `isCompleted` Boolean Feld hinzugefügt (default: false) |
| `pages/plans/[id].js` | Task Counts berechnet + Stats angezeigt + Complete Button + TaskForm versteckt |
| `pages/home.js` | `sortedPlans` – abgeschlossene Pläne ans Ende sortiert |
| `components/PlanCard.js` | `$completed` Prop + Titel durchgestrichen + Owner Name angezeigt |
| `styles/sharedStyles.js` | `$completed` Prop zur Card hinzugefügt (opacity: 0.5) |
| `pages/api/plans/index.js` | `.populate("owner", "name")` + `.populate("members", "name")` |
| `pages/api/plans/[id].js` | `.populate("members", "name")` + 405 Handler |

## Herausforderungen

- **populate() Nebeneffekt (wieder):** Nach `.populate("members", "name")` musste `isMember` von `.includes()` auf `.some()` umgestellt werden
- **isOwner ObjectId Fix:** `plan.owner?.toString() === session?.user?.id` – gleicher Fix wie in US 10
- **Completed Plans sortieren:** `.sort()` mit `isCompleted` Vergleich – abgeschlossene Pläne ans Ende
- **TaskForm und Status Buttons:** Beide müssen bei abgeschlossenen Plans deaktiviert werden

## Abweichungen von der Planung

- **Member Liste:** Zusätzlich Team-Anzeige mit SectionLabel "Team" und "Progress" eingebaut
- **BadgeList Design:** Members und Stats verwenden dasselbe Badge-Design mit Lucide Icons
- **Delete für completed Plans:** Edit und InviteLink werden versteckt, Delete bleibt für Owner sichtbar

## Bootcamp Themen

- ✅ **Array Methods:** `.filter()` + `.length` für Task Counts, `.sort()` für Plan-Sortierung
- ✅ **Conditional Rendering:** `showStatusButton={!plan.isCompleted}` als Prop
- ✅ **Mongoose Default Values:** `isCompleted: { type: Boolean, default: false }`
- ✅ **SWR mutate():** Nach `handleComplete` wird der Plan-Cache neu geladen
- ✅ **Transient Props:** `$completed`, `$top` für bedingte Styled Component Styles

## Zusätzlich eingebaut

- **Owner Name auf PlanCard:** Nach populate() wird `plan.owner.name` auf der Index-Seite angezeigt
- **SectionLabel:** Wiederverwendbare Komponente für "TEAM" und "PROGRESS" Überschriften
- **Logged-in User im Header:** `useSession` in Header.jsx + `LoggedInAs` Styled Component

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
