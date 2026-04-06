// Colors are intentionally omitted — use useTheme().colors in each component
export const typography = {
  title: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "bold" as const,
    textAlign: "center" as const,
  },

  body: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "500" as const,
    textAlign: "center" as const,
  },

  secondary: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "500" as const,
    textAlign: "center" as const,
  },

  greeting: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600" as const,
    textAlign: "center" as const,
  },

  label: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500" as const,
  },

  error: {
    fontFamily: "Inter",
    fontSize: 13,
    color: "red",
  },

  hint: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500" as const,
    lineHeight: 20,
  },
};
