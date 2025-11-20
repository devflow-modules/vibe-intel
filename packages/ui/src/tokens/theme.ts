export const colors = {
  primary: "#4c6ef5",
  primaryHover: "#3b5bdb",
  primaryMuted: "#edf2ff",
  surface: "#0f172a",
  background: "#020617",
  accent: "#10b981",
  danger: "#ef4444",
  text: "#e2e8f0",
  subtle: "#94a3b8"
} as const;

export const spacing = {
  0: "0px",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem"
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  pill: "9999px"
} as const;

export const typography = {
  heading: {
    xl: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
    lg: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }]
  },
  body: {
    md: ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
    sm: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }]
  }
} as const;

export const tokens = {
  colors,
  spacing,
  radii,
  typography
};

export type Tokens = typeof tokens;

