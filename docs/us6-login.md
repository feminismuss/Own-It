# User Story 6 – Login & Registrierung

| | |
|---|---|
| **Branch** | `feature/login` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `db/models/User.js` | Neu: name, email (unique), password |
| `pages/api/auth/[...nextauth].js` | Neu: NextAuth CredentialsProvider + JWT callbacks |
| `pages/api/auth/register.js` | Neu: Email Check + bcrypt Hash + User erstellen |
| `services/userService.js` | Neu: registerUser Funktion |
| `components/RegisterForm.jsx` | Neu: name, email, password Felder |
| `components/LoginForm.jsx` | Neu: email, password Felder |
| `pages/register.js` | Neu: Register Page |
| `pages/login.js` | Neu: Login Page mit signIn |
| `pages/_app.js` | SessionProvider + AuthGuard eingebaut |
| `pages/api/plans/index.js` | GET + POST nach session.user.id gefiltert |
| `db/models/Plan.js` | owner Feld hinzugefügt (ObjectId ref User) |

## Herausforderungen

- **JWT user.id:** session.user.id war undefined – gelöst durch callbacks in authOptions (token.id = user._id.toString())
- **AuthGuard PUBLIC_PAGES:** Alle Seiten außer /login und /register wurden geblockt
- **bcrypt altes Passwort:** Bereits registrierte User konnten sich nicht einloggen – neuer Account nötig
- **MongoDB Casing:** Plan.js vs plan.js – Mac ignoriert Groß/Kleinschreibung, gelöst mit git config core.ignorecase false

## Abweichungen von der Planung

- **Kein GitHub OAuth:** Email + Passwort statt OAuth – kein Problem mit Vercel Preview URLs
- **Plans nach owner filtern:** Zusätzlich zur Login US: Plans werden nach session.user.id gefiltert

## Bootcamp Themen

- ✅ **NextAuth.js:** CredentialsProvider, JWT Strategy, Session Callbacks
- ✅ **bcryptjs:** Passwort Hashing mit Salt Rounds
- ✅ **getServerSession:** Session in API Routes lesen
- ✅ **useSession:** Session im Frontend lesen
- ✅ **AuthGuard Pattern:** Schutz aller Seiten außer public routes in _app.js

## Zusätzlich eingebaut

- **Logout im BurgerMenu:** signOut mit callbackUrl zu /login
- **Link Login → Register:** Noch kein Account? Registrieren Link

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
