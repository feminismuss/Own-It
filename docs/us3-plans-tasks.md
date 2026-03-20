# User Story 3 – Plans & Tasks

| | |
|---|---|
| **Branch** | `feature/plans-and-tasks` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `pages/api/plans/index.js` | Neu: GET alle Plans + POST neuen Plan |
| `pages/api/plans/[id].js` | Neu: GET, PUT, DELETE einzelner Plan |
| `services/planService.js` | Neu: createPlan, updatePlan, deletePlan |
| `pages/plans/[id].js` | Neu: Plan Detail Page mit Tasks |
| `pages/api/tasks/index.js` | GET nach planId gefiltert |
| `services/taskService.js` | createTask mit planId mutate |

## Herausforderungen

- **plan ref im Task:** task.plan ist nur eine ObjectId – planId muss beim updateTask als drittes Argument mitgegeben werden
- **useSWR mit planId:** Gefilterte Tasks: /api/tasks?planId=${id} – separater SWR Key nötig
- **handleTaskUpdate:** Plan Detail Page hatte zwei separate Update Funktionen – vereinfacht durch direkten Service Import

## Abweichungen von der Planung

- **handleTaskUpdate entfernt:** Nach Coach Feedback: TaskCard importiert updateTask direkt – kein Prop Drilling mehr

## Bootcamp Themen

- ✅ **Mongoose Referenzen:** plan: ObjectId ref zu Plan Model, required: true
- ✅ **Query Parameter:** ?planId= in GET /api/tasks für gefilterte Abfragen
- ✅ **useRouter:** router.query.id für dynamische Routen
- ✅ **Conditional useSWR:** useSWR(id ? url : null) verhindert Requests ohne ID

## Zusätzlich eingebaut

- **planColor Prop:** TaskCard bekommt planColor für border-left Akzentfarbe
- **Auto-assigned colors:** Plan.js Model wählt zufällig eine Farbe aus PLAN_COLORS Array

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
