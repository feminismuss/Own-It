# User Story 1 – Tasks CRUD

| | |
|---|---|
| **Branch** | `feature/task-crud` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Task.js` | Neu: title, plan ref, status, timestamps |
| `pages/api/tasks/index.js` | Neu: GET alle Tasks + POST neuen Task |
| `pages/api/tasks/[id].js` | Neu: GET, PUT, DELETE einzelner Task |
| `services/taskService.js` | Neu: createTask, updateTask, deleteTask |
| `components/TaskCard.js` | Neu: Task anzeigen, editieren, löschen |
| `components/TaskForm.js` | Neu: Task erstellen und editieren |
| `pages/tasks/[id].js` | Neu: Task Einzelansicht |
| `pages/index.js` | Neu: Task Übersicht |
| `styles/sharedStyles.js` | Neu: Card, ButtonGroup, StyledButton, StyledLink |
| `styles/theme.js` | Neu: Design System Farben, Spacing, etc. |
| `pages/_app.js` | ThemeProvider + SWR fetcher eingebaut |

## Herausforderungen

- **mongoose.models check:** Ohne `mongoose.models.Task || mongoose.model(...)` gibt es 'Cannot overwrite model' Fehler beim Hot Reload
- **ServerStyleSheet:** _document.js braucht ServerStyleSheet damit Styled Components beim SSR nicht flackern (FOUC)
- **SWR fetcher:** Ohne globalen fetcher in _app.js bleibt useSWR beim Loading hängen

## Abweichungen von der Planung

- **TaskForm Platzierung:** TaskForm wurde aus index.js entfernt – Tasks sollen nur auf der Plan Detail Page erstellt werden

## Bootcamp Themen

- ✅ **Mongoose:** Schema Definition, CRUD Methoden, Model Pattern
- ✅ **REST API:** GET/POST/PUT/DELETE Endpoints in Next.js Pages Router
- ✅ **SWR:** Datenfetching, mutate für Cache-Invalidierung
- ✅ **React:** useState, Props, bedingte Renderung
- ✅ **Styled Components:** ThemeProvider, styled.div, CSS-in-JS

## Zusätzlich eingebaut

- **sharedStyles.js:** Wiederverwendbare Styled Components für die gesamte App
- **Design System:** theme.js mit Farben, Spacing, Schriften, Border Radius

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
