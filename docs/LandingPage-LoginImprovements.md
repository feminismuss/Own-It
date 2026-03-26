# Landing Page & Login Improvements

| | |
|---|---|
| **Branch** | `feature/landing-page`, `feature/login-improvements` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `pages/index.js` | Neu: Landing Page (vorher Home) |
| `pages/home.js` | Umbenannt von index.js – Plan Übersicht |
| `pages/_app.js` | `/` zu PUBLIC_PAGES hinzugefügt + `isLanding` Check für Header/Footer |
| `pages/_document.js` | Google Fonts (Caveat) eingebunden |
| `components/Header.jsx` | Titel klickbar (Link zu /home) + `isLanding` Check |
| `pages/login.js` | Fehlermeldung mit useState + onClear Prop |
| `components/LoginForm.jsx` | `onClear` Prop + onChange löscht Fehlermeldung |
| `pages/api/auth/[...nextauth].js` | Email lowercase + error page auf /login |
| `pages/api/auth/register.js` | Email lowercase beim Suchen und Speichern + 405 |

## Herausforderungen

- **Alle internen Links updaten:** Nach Umbenennung von index.js zu home.js mussten alle `router.push("/")` und `href="/"` auf `/home` geändert werden
- **Header/Footer auf Landing Page:** `isLanding` Check in `_app.js` versteckt Header und Footer auf der Landing Page
- **NextAuth Fehlermeldungen:** NextAuth gibt aus Sicherheitsgründen immer nur "CredentialsSignin" zurück – generische Fehlermeldung gewählt
- **redirect: false:** Da `signIn()` mit `redirect: false` aufgerufen wird, kommen Fehler als `result.error` zurück – nicht als URL Parameter

## Abweichungen von der Planung

- **Keine getServerSideProps:** Redirect für eingeloggte User wird mit `useEffect` + `useSession` gelöst statt mit `getServerSideProps`
- **Generische Fehlermeldung:** "Email oder Passwort falsch" statt spezifischer Meldungen – bewusste Sicherheitsentscheidung

## Bootcamp Themen

- ✅ **Google Fonts:** Einbindung über `_document.js` Head
- ✅ **Next.js Routing:** Seiten umbenennen + alle Links updaten
- ✅ **useState für Fehler:** Fehlermeldung als lokaler State statt URL Parameter
- ✅ **Callback Props:** `onClear` Prop zum Löschen der Fehlermeldung beim Tippen
- ✅ **Security Best Practices:** Lowercase Email, generische Login-Fehlermeldungen

## Zusätzlich eingebaut

- **Caveat Font:** Handschrift-Schriftart für den "Own It" Titel auf der Landing Page
- **App Beschreibung:** Kurzer, prägnanter Einleitungstext
- **unauthenticated Redirect:** `home.js` leitet zur Landing Page weiter wenn nicht eingeloggt

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
