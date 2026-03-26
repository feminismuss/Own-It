# User Story 9 – Claim a Task

| | |
|---|---|
| **Branch** | `feature/claim-task` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Task.js` | `assignedTo` Feld hinzugefügt (ref zu User) |
| `pages/api/tasks/index.js` | `.populate("assignedTo", "name")` + 405 Handler |
| `pages/api/tasks/[id].js` | `.populate("assignedTo", "name")` + 405 Handler |
| `components/TaskCard.jsx` | "I'll do it!" Button + AssignedTo Anzeige + Done Button Logik |
| `pages/plans/[id].js` | `isOwnerOrMember` berechnet + als Prop an TaskCard übergeben |

## Herausforderungen

- **ObjectId vs String Vergleich:** `task.assignedTo?._id.toString() === session.user.id` – MongoDB ObjectIds müssen explizit mit `.toString()` in Strings umgewandelt werden bevor man sie vergleichen kann
- **populate() Nebeneffekt:** Nach `.populate("members", "name")` enthält `plan.members` Objekte statt IDs – `isMember` Check musste von `.includes()` auf `.some()` umgestellt werden
- **Button Logik:** "I'll do it!", "Done" und Name-Anzeige mussten alle voneinander abhängig sein – Status UND assignedTo müssen geprüft werden

## Abweichungen von der Planung

- **Start Button ersetzt:** Der ursprüngliche "Start" Button wurde durch "I'll do it!" ersetzt statt einen zweiten Button hinzuzufügen
- **Member Restriction:** Button nur für Owner und Members sichtbar – nicht für alle eingeloggten User (Option B gewählt)
- **Member Liste:** Zusätzlich Member-Anzeige im PlanHeader eingebaut

## Bootcamp Themen

- ✅ **Mongoose populate():** Referenzierte Dokumente in einer Query laden
- ✅ **ObjectId Vergleich:** `.toString()` für korrekte ID-Vergleiche
- ✅ **Conditional Rendering:** Button-Sichtbarkeit basierend auf mehreren Bedingungen
- ✅ **Props Pattern:** `isOwnerOrMember` von Page zu Component weitergegeben
- ✅ **useSession:** Session-Daten im Frontend für Berechtigungsprüfungen

## Zusätzlich eingebaut

- **Durchgestrichener Titel:** Tasks mit Status "done" werden mit `text-decoration: line-through` und `opacity: 0.5` angezeigt
- **AssignedTo Anzeige:** Name des Users der die Task geclaimed hat wird auf der TaskCard angezeigt
- **Reset löscht assignedTo:** Beim Reset wird `assignedTo: null` gesetzt damit der Button wieder erscheint
- **Member Liste im PlanHeader:** Alle Members eines Plans werden als Badges angezeigt

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
