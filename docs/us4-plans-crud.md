# User Story 4 – Plans CRUD

| | |
|---|---|
| **Branch** | `feature/plans-crud` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Plan.js` | PLAN_COLORS Array + default color Funktion |
| `components/PlanCard.js` | Neu: Plan als Link mit Farbakzent |
| `components/PlanForm.js` | Neu: Plan erstellen und editieren |
| `pages/index.js` | Komplett umgebaut: Plans statt Tasks, PlanForm, isCreating State |
| `pages/plans/[id].js` | Edit/Delete Plan, isEditingPlan State, PlanHeader |
| `styles/sharedStyles.js` | StyledMain, OutlineButton hinzugefügt |

## Herausforderungen

- **border-left Styling:** PlanCard mit farbigem Streifen statt vollem Hintergrund – bessere Lesbarkeit
- **PlanHeader Layout:** Titel und Buttons in flex-column mit auto-assigned Hintergrundfarbe
- **OutlineButton width:** width: auto für Buttons in einer Reihe – ursprünglich width: 100% aus sharedStyles

## Abweichungen von der Planung

- **Farbige Karten:** Ursprünglich volle Planfarbe als Hintergrund – geändert zu subtiler border-left + schwachem Hintergrund ($color + 22 hex)
- **Edit/Delete Position:** Plan Edit/Delete Buttons unter dem Titel statt in einer Reihe mit ihm

## Bootcamp Themen

- ✅ **Math.random():** Zufällige Farbauswahl mit Array und Math.floor
- ✅ **Mongoose default:** Funktion als default Wert im Schema
- ✅ **useState isCreating:** Boolean State zum Ein-/Ausblenden der PlanForm
- ✅ **ul/li für Listen:** Coach-Konvention: Maps immer mit ul und li Elementen

## Zusätzlich eingebaut

- **Textmarker-Effekt:** linear-gradient für PlanHeader Hintergrund
- **OutlineButton:** Gestrichelter Button für sekundäre Aktionen in sharedStyles
- **StyledMain:** Geteiltes Layout-Component für alle Seiten

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
