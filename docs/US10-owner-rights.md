# User Story 10 – Owner Rights

| | |
|---|---|
| **Branch** | `feature/owner-rights` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `pages/plans/[id].js` | `isOwner` mit `.toString()` Fix + Edit/Delete/InviteLink nur für Owner |
| `pages/tasks/[id].js` | `isOwner`, `isMember`, `isOwnerOrMember` berechnet + Plan geladen |
| `components/TaskCard.jsx` | `isOwner` Prop + Reset/Delete nur für Owner, Edit für Owner+Member |
| `pages/api/plans/[id].js` | PUT + DELETE mit Session + Owner Check geschützt |
| `pages/api/tasks/[id].js` | DELETE mit Session + Owner Check über Plan geschützt |

## Herausforderungen

- **ObjectId vs String (wieder!):** `plan.owner === session.user.id` funktionierte nicht – fix: `plan.owner?.toString() === session?.user?.id`
- **Task kennt seinen Plan:** Für den API-Schutz bei Task DELETE mussten wir erst den Task laden, dann den Plan laden um den Owner zu prüfen – zwei DB-Abfragen nötig
- **tasks/[id].js braucht Plan:** Die Task-Einzelansicht brauchte `useSWR` für den Plan um Rollen berechnen zu können – `task.plan` als SWR-Key

## Abweichungen von der Planung

- **UI-Schutz zuerst:** Buttons werden in der UI versteckt bevor API-Schutz eingebaut wurde
- **API-Schutz zusätzlich:** Sowohl UI als auch API sind geschützt – verhindert direkte API-Aufrufe ohne Berechtigung

## Bootcamp Themen

- ✅ **API-Schutz:** `getServerSession` in API Routes für serverseitige Authentifizierung
- ✅ **HTTP Status Codes:** 401 (Not authenticated), 403 (Not authorized), 404 (Not found)
- ✅ **Rollenbasierte Berechtigungen:** Owner vs Member – unterschiedliche Rechte
- ✅ **Props als Feature Flags:** `isOwner`, `isOwnerOrMember` steuern welche Buttons sichtbar sind
- ✅ **Verkettete DB-Abfragen:** Task laden → Plan laden → Owner prüfen

## Zusätzlich eingebaut

- **Doppelter SWR Call in tasks/[id].js:** Plan wird zusätzlich geladen um Rollen zu berechnen
- **Abgeschlossene Pläne:** Delete bleibt für Owner sichtbar auch wenn Plan completed ist

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
