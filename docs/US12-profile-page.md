# User Story 12 – Profile Page

| | |
|---|---|
| **Branch** | `feature/profile-page` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `pages/profile.js` | Neu: Profilseite mit Stats, Begrüßung und Logout |
| `pages/api/profile.js` | Neu: API Route mit countDocuments für Stats |
| `components/BurgerMenu.jsx` | Profile Link hinzugefügt (nur wenn eingeloggt) |

## Herausforderungen

- **countDocuments vs find:** `countDocuments()` gibt nur die Anzahl zurück – effizienter als alle Dokumente zu laden und dann `.length` zu nutzen
- **Stats Grid auf Mobile:** `grid-template-columns: repeat(3, 1fr)` für drei gleichbreite Spalten

## Abweichungen von der Planung

- **Kein separater API Call für User:** Session liefert bereits Name und Email – kein extra DB-Abfrage nötig
- **Großzahlen statt Badges:** Stats werden als große Zahlen in Karten angezeigt statt als kleine Badges

## Bootcamp Themen

- ✅ **Mongoose countDocuments():** Effizientes Zählen von Dokumenten mit Filter
- ✅ **CSS Grid:** `grid-template-columns: repeat(3, 1fr)` für gleichmäßige Spalten
- ✅ **useSession:** Name und Email direkt aus der Session anzeigen
- ✅ **signOut:** NextAuth `signOut()` mit `callbackUrl` für Redirect nach Logout

## Zusätzlich eingebaut

- **Begrüßung:** "Hey, {name}!" mit Email-Anzeige
- **Logout Button:** Direkt auf der Profilseite erreichbar
- **Conditional Navigation:** Profile Link nur sichtbar wenn eingeloggt (`{session && ...}`)

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
