# Header & Navigation

| | |
|---|---|
| **Branch** | `feature/navigation` |
| **Status** | ✅ Fertig |
| **Datum** | März 2026 |
| **Bearbeitet von** | Hannah Capell |

## Geänderte Dateien

| Datei | Was wurde geändert? |
|---|---|
| `components/Header.jsx` | Neu: sticky Header, Own It Titel, Motivational Quote |
| `components/BurgerMenu.jsx` | Neu: isOpen State, Home + Login/Logout Links |
| `components/Footer.jsx` | Neu: Copyright Footer |
| `components/BackButton.jsx` | Neu: FloatingButton mit router.back() |
| `pages/_app.js` | Header + Footer + Wrapper mit min-height: 100vh |
| `pages/tasks/[id].js` | BackButton eingebaut |
| `pages/plans/[id].js` | BackButton eingebaut |

## Herausforderungen

- **Hydration Error:** Math.random() für Quotes verursachte Server/Client Mismatch – gelöst mit useState(() => ...) und suppressHydrationWarning
- **BurgerMenu Position:** MenuButton musste position: absolute mit top: 50% + transform: translateY(-50%) gesetzt werden
- **Footer am Ende:** Wrapper mit display: flex + flex-direction: column + main {flex: 1}

## Abweichungen von der Planung

- **Quote nur auf Planseiten:** Eingeschränkt auf /plans/* mit router.pathname.startsWith('/plans/')
- **Own It auf allen Seiten:** Titel steht immer im Header, Quote zusätzlich auf Planseiten

## Bootcamp Themen

- ✅ **useRouter:** router.pathname für aktive Seite, router.back() für Navigation
- ✅ **position sticky/fixed:** Header sticky, BackButton fixed
- ✅ **Flexbox:** Wrapper Layout mit flex-direction: column für Footer am Ende

## Zusätzlich eingebaut

- **Motivational Quotes:** 8 Quotes lokal gespeichert, zufällig ausgewählt
- **FloatingButton:** Runder FAB mit box-shadow und hover Effect

---
*Own It – Hannah Capell | Bootcamp Capstone 2026*
