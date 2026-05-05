import type { CSSProperties } from "react";

export const C = {
    gold: "#c9a96e",
    goldLight: "#d4b87a",
    goldDark: "#b08d50",
    dark: "#1a1a1a",
    text: "#1a1a1a",
    textMuted: "#555555",
    textLight: "#999999",
    border: "#e5e5e5",
    borderLight: "#f0f0f0",
    bg: "#ffffff",
    bgAlt: "#f8f7f4",
    bgCard: "#f8f7f4",
    white: "#ffffff",
    red: "#ef4444",
};

export const container: CSSProperties = {
    maxWidth: 1400,
    marginInline: "auto",
    paddingInline: 24,
};

export const dividerCenter: CSSProperties = {
    width: 64,
    height: 1,
    backgroundColor: C.gold,
    marginTop: 16,
    marginInline: "auto",
    border: "none",
};

export const subLabel: CSSProperties = {
    color: C.gold,
    fontSize: 11,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    marginBottom: 12,
};
