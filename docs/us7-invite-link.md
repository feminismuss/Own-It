# User Story 7 – Invite Link

| | |
|---|---|
| **Branch** | `feature/join-a-plan-via-invite-link` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/Plan.js` | members[] und inviteToken Felder hinzugefügt |
| `pages/api/plans/[id]/invite.js` | Neu: Token generieren (POST) |
| `pages/api/plans/invite/[token].js` | Neu: Plan per Token laden (GET) + beitreten (POST) |
| `components/InviteLink.jsx` | Neu: Link generieren + Copy Button |
| `pages/invite/[token].js` | Neu: Invite Page (öffentlich zugänglich) |
| `pages/plans/[id].js` | InviteLink Component + isOwner Check eingebaut |
| `pages/_app.js` | AuthGuard: /invite/* als public route hinzugefügt |

## Herausforderungen

- **Git Casing Problem:** Plan.js vs plan.js – gelöst mit git config core.ignorecase false
- **AuthGuard blockierte Invite Page:** Dynamische Route /invite/[token] musste mit startsWith('/invite') als public markiert werden
- **Fragment als Flex-Item:** React Fragment <> verhält sich nicht als Flex-Item – InviteLink Struktur angepasst
- **Tasks auf Invite Page:** plan?._id musste erst verfügbar sein bevor Tasks geladen werden konnten

## Abweichungen von der Planung

- **JOIN Endpoint:** Ursprünglich als /api/plans/join.js geplant – in /api/plans/invite/[token].js als POST integriert
- **Invite Page ohne Login:** Read-only Ansicht mit Redirect zu /login beim Klick auf 'I'll do it!'

## Bootcamp Themen

- ✅ **REST API Design:** GET vs POST, dynamische Routen, verschachtelte API Endpoints
- ✅ **Mongoose:** Arrays im Schema (members[]), sparse unique Index (inviteToken)
- ✅ **NextAuth Session:** getServerSession in API Routes, useSession im Frontend
- ✅ **Conditional Rendering:** Props basierend auf Session Status (showStatusButton={!!session})
- ✅ **Crypto:** Node.js crypto.randomBytes() für sichere Token Generierung

## Zusätzlich eingebaut

- **Copy Button mit Feedback:** Icon wechselt von Copy zu Check für 2 Sekunden nach dem Kopieren
- **isOwner Check:** Invite Link nur für Plan Owner sichtbar
- **disableLink Prop in TaskCard:** Task Titel nicht klickbar wenn nicht eingeloggt
- **Login to Join Button:** Nicht eingeloggte Nutzer werden zu /login weitergeleitet

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
