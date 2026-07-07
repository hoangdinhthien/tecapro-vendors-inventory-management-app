import type { Config } from "tailwindcss";

// Color names we expose as CSS variables in Tailwind
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

// We only need the shade KEYS (50..900) for building the CSS variable map
const themeShades = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
} as const;

type ThemeColor = (typeof themeColors)[number];
type ThemeShade = keyof typeof themeShades; // "50" | "100" | ... | "900"

type ThemePalette = Record<ThemeColor, Record<ThemeShade, string>>;

const buildPalette = (): ThemePalette => {
  const palette: Partial<Record<ThemeColor, Record<ThemeShade, string>>> = {};
  const shades = Object.keys(themeShades) as ThemeShade[];

  for (const color of themeColors) {
    const colorMap: Record<ThemeShade, string> = {} as Record<
      ThemeShade,
      string
    >;
    for (const shade of shades) {
      colorMap[shade] = `var(--color-${color}-${shade})`;
    }
    palette[color] = colorMap;
  }

  return palette as ThemePalette;
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
