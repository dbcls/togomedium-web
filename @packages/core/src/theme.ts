const sizeBase: number = 8;

const COLOR_PRIMARY = "#8FC31F";
const COLOR_PRIMARY_DARK = "#698c1f";

export const THEME = {
  COLOR: {
    WHITE: "#FFFFFF",
    PRIMARY: COLOR_PRIMARY,
    PRIMARY_DARK: COLOR_PRIMARY_DARK,
    PRIMARY_PALE: "#eef3d9",
    GRAY: "#CCCCCC",
    GRAY_BG: "#f4f3f2",
    GRAY700: "#374151",
    GRAY500: "#6B7280",
    GRAY400: "#9ca3af",
    GRAY300: "#d1d5db",
    GRAY_LINE: "#E5E7EB",
    TEXT: "#333333",
    ACCENT: "#F39800",
  } as const,
  STANZA_COLOR: {
    PRIMARY: `var(--color-primary, ${COLOR_PRIMARY})`,
    PRIMARY_DARK: `var(--color-primary-dark, ${COLOR_PRIMARY_DARK})`,
  },
  SIZE: {
    S05: sizeBase / 2,
    S1: sizeBase,
    S2: sizeBase * 2,
    S3: sizeBase * 3,
    S4: sizeBase * 4,
    S5: sizeBase * 5,
  } as const,
  ROUND: {
    BASE: 5,
  } as const,
  FONT_WEIGHT: {
    BOLD: 700,
    MEDIUM: 500,
    REGULAR: 400,
  } as const,
} as const;

export const S3 = sizeBase * 3;
