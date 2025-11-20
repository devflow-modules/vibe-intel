import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, spacing, radii, typography } from "./src/tokens/theme";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        "primary-hover": colors.primaryHover,
        "primary-muted": colors.primaryMuted,
        accent: colors.accent,
        surface: colors.surface,
        background: colors.background,
        danger: colors.danger,
        text: colors.text,
        subtle: colors.subtle
      },
      spacing,
      borderRadius: radii,
      fontSize: {
        "heading-xl": typography.heading.xl,
        "heading-lg": typography.heading.lg,
        "body-md": typography.body.md,
        "body-sm": typography.body.sm
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("keyboard-focus", "&:focus-visible");
    })
  ]
};

export default config;

