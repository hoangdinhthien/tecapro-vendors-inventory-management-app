import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

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

const colors = {
  gray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
  },
  red: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
  },
  yellow: {
    "50": "#fefce8",
    "100": "#fef9c3",
    "200": "#fef08a",
    "300": "#fde047",
    "400": "#facc15",
    "500": "#eab308",
    "600": "#ca8a04",
    "700": "#a16207",
    "800": "#854d0e",
    "900": "#713f12",
  },
  green: {
    "50": "#f0fdf4",
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d",
  },
  blue: {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
  },
  indigo: {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
  },
  purple: {
    "50": "#faf5ff",
    "100": "#f3e8ff",
    "200": "#e9d5ff",
    "300": "#d8b4fe",
    "400": "#c084fc",
    "500": "#a855f7",
    "600": "#9333ea",
    "700": "#7e22ce",
    "800": "#6b21a8",
    "900": "#581c87",
  },
  pink: {
    "50": "#fdf2f8",
    "100": "#fce7f3",
    "200": "#fbcfe8",
    "300": "#f9a8d4",
    "400": "#f472b6",
    "500": "#ec4899",
    "600": "#db2777",
    "700": "#be185d",
    "800": "#9d174d",
    "900": "#831843",
  },
} as const satisfies ThemePalette;

const paletteToCssVariables = (palette: ThemePalette) =>
  themeColors
    .map((color) =>
      themeShades
        .map(
          (shade) => `  --color-${color}-${shade}: ${palette[color][shade]};`,
        )
        .join("\n"),
    )
    .join("\n");

const themeCss = `
:root,
.light,
[data-theme="light"] {
  color-scheme: light;
  --color-white: #ffffff;
  --color-black: #030712;
${paletteToCssVariables(colors)}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  --color-white: #030712;
  --color-black: #f9fafb;
${paletteToCssVariables({
  gray: {
    "50": "#111827",
    "100": "#1f2937",
    "200": "#374151",
    "300": "#4b5563",
    "400": "#6b7280",
    "500": "#9ca3af",
    "600": "#d1d5db",
    "700": "#e5e7eb",
    "800": "#f3f4f6",
    "900": "#f9fafb",
  },
  red: {
    "50": "#7f1d1d",
    "100": "#991b1b",
    "200": "#b91c1c",
    "300": "#dc2626",
    "400": "#ef4444",
    "500": "#f87171",
    "600": "#fca5a5",
    "700": "#fecaca",
    "800": "#fee2e2",
    "900": "#fef2f2",
  },
  yellow: {
    "50": "#713f12",
    "100": "#854d0e",
    "200": "#a16207",
    "300": "#ca8a04",
    "400": "#eab308",
    "500": "#facc15",
    "600": "#fde047",
    "700": "#fef08a",
    "800": "#fef9c3",
    "900": "#fefce8",
  },
  green: {
    "50": "#14532d",
    "100": "#166534",
    "200": "#15803d",
    "300": "#16a34a",
    "400": "#22c55e",
    "500": "#4ade80",
    "600": "#86efac",
    "700": "#bbf7d0",
    "800": "#dcfce7",
    "900": "#f0fdf4",
  },
  blue: {
    "50": "#1e3a8a",
    "100": "#1e40af",
    "200": "#1d4ed8",
    "300": "#2563eb",
    "400": "#3b82f6",
    "500": "#60a5fa",
    "600": "#93c5fd",
    "700": "#bfdbfe",
    "800": "#dbeafe",
    "900": "#eff6ff",
  },
  indigo: {
    "50": "#312e81",
    "100": "#3730a3",
    "200": "#4338ca",
    "300": "#4f46e5",
    "400": "#6366f1",
    "500": "#818cf8",
    "600": "#a5b4fc",
    "700": "#c7d2fe",
    "800": "#e0e7ff",
    "900": "#eef2ff",
  },
  purple: {
    "50": "#581c87",
    "100": "#6b21a8",
    "200": "#7e22ce",
    "300": "#9333ea",
    "400": "#a855f7",
    "500": "#c084fc",
    "600": "#d8b4fe",
    "700": "#e9d5ff",
    "800": "#f3e8ff",
    "900": "#faf5ff",
  },
  pink: {
    "50": "#831843",
    "100": "#9d174d",
    "200": "#be185d",
    "300": "#db2777",
    "400": "#ec4899",
    "500": "#f472b6",
    "600": "#f9a8d4",
    "700": "#fbcfe8",
    "800": "#fce7f3",
    "900": "#fdf2f8",
  },
} as ThemePalette)}
}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-full flex flex-col">
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
