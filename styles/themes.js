const theme = {
  colors: {
    // Hintergründe
    bg:       "#FFFFFF",   // weiß
    surface:  "#FFFFFF",   // weiße Karten

    // Akzentfarbe – für Buttons und Highlights
    accent:   "#6B8FA8",   // Taubenblau

    // Texte
    text:     "#1C2B3A",   // Haupttext
    muted:    "#9E9E9E",   // dezenter Text
    border:   "#E0E0E0",   // Rahmen

    // Status
    done:     "#6BBF8E",   // Grün für erledigte Tasks

    // Planfarben – nur für Bubbles und Karten-Akzente
    plan: {
      one:   "#6B8FA8",   // Taubenblau
      two:   "#E8725A",   // Koralle
      three: "#8FA86B",   // Grün
    },
  },

  borderRadius: {
    sm:   "8px",
    md:   "12px",
    lg:   "16px",
    xl:   "24px",
    full: "50%",    // Kreise / Avatare
  },

  fontSizes: {
    xs:  "10px",
    sm:  "12px",
    md:  "14px",
    lg:  "16px",
    xl:  "20px",
    xxl: "26px",
  },

  fonts: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.08)",
  },

  spacing: {
    xs:  "4px",
    sm:  "8px",
    md:  "16px",
    lg:  "24px",
    xl:  "32px",
    xxl: "48px",
  },
};

export default theme;