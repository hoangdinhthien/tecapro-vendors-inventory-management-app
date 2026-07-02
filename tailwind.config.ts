import type { Config } from "tailwindcss";

const themeColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

const themeShades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

type ThemeColor = (typeof themeColors)[number];
type ThemeShade = (typeof themeShades)[number];

type ThemePalette = Record<ThemeColor, Record<ThemeShade, string>>;

const buildPalette = (): ThemePalette => {
  const palette = {} as ThemePalette;

  for (const color of themeColors) {
    palette[color] = {} as Record<ThemeShade, string>;

    for (const shade of themeShades) {
      palette[color][shade] = `var(--color-${color}-${shade})`;
    }
  }

  return palette;
};

const themeColorsForTailwind = {
  ...buildPalette(),
  white: "var(--color-white)",
  black: "var(--color-black)",
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: themeColorsForTailwind,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
