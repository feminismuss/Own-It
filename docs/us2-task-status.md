# User Story 2 – Task Status

| | |
|---|---|
| **Branch** | `feature/task-status` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Task.js` | status Feld hinzugefügt (todo/inprogress/done) |
| `components/TaskCard.js` | STATUS_CONFIG, Lucide Icons, Status Buttons |
| `services/taskService.js` | mutate für gefilterten planId Key ergänzt |
| `pages/index.js` | showStatusButton Prop + handleUpdate |
| `styles/sharedStyles.js` | $variant transient prop für StyledButton Farben |

## Herausforderungen

- **$variant vs variant:** variant Prop wurde an den DOM weitergegeben – gelöst mit $variant (transient prop)
- **mutate planId:** Status Update erst beim nächsten Laden sichtbar – gelöst durch mutate auf gefilterten API Key
- **Prop Drilling:** onUpdate als Prop weitergegeben – später durch direkten Service Import ersetzt (Coach Feedback)

## Abweichungen von der Planung

- **Lucide Icons:** Ursprünglich Unicode Zeichen (○◑●) – auf Coach-Empfehlung durch Lucide React Icons ersetzt
- **onSubmit Pattern:** onUpdate/onCreate Props durch einheitliches onSubmit Pattern ersetzt
- **Direkter Service Import:** onDelete/onUpdate Props entfernt – TaskCard importiert direkt aus taskService.js

## Bootcamp Themen

- ✅ **React Props:** showStatusButton, showEditDelete, navigateAfterEdit als Boolean Props
- ✅ **Lucide React:** Circle, CircleDot, CircleCheckBig Icons
- ✅ **Transient Props:** $variant verhindert DOM-Leak in Styled Components
- ✅ **SWR mutate:** Mehrere Keys gleichzeitig invalidieren
- ✅ **Accessibility:** aria-label für StatusBadge (WCAG AA)

## Zusätzlich eingebaut

- **STATUS_CONFIG:** Zentrales Objekt für Icon, Text und Farbe je Status
- **Sortierung vorbereitet:** STATUS_ORDER Konstante für spätere Sortierung nach Status

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
