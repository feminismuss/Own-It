# User Story 5 – Status Reset

| | |
|---|---|
| **Branch** | `feature/status-reset` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `components/TaskCard.js` | Reset Button hinzugefügt (nur wenn showEditDelete) |

## Herausforderungen

Keine besonderen Herausforderungen.

## Abweichungen von der Planung

- **Reset nur auf Einzelansicht:** Reset Button ursprünglich überall sichtbar – eingeschränkt auf showEditDelete
- **router.push nach Reset:** Nach Reset navigiert zu plans/[planId] statt zur Übersicht

## Bootcamp Themen

- ✅ **Bedingte Renderung:** task.status !== 'todo' && showEditDelete für Reset Button
- ✅ **updateTask mit planId:** Status Reset ruft updateTask mit task.plan als drittes Argument auf

## Zusätzlich eingebaut

- **router.push mit planId:** Nach Reset direkt zurück zur Plan Detail Page

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
