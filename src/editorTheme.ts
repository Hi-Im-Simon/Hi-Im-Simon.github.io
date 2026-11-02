import { createTheme } from "@mui/material/styles";
import { studio } from "./theme";

/** Scoped workbench colors inspired by One Dark Pro Darker. */
export const editorColors = {
  background: "#23272e",
  sidebar: "#1e2227",
  border: "#181a1f",
  foreground: "#abb2bf",
  bright: "#dcdcdc",
  muted: "#9da5b4",
  blue: "#61afef",
  purple: "#c678dd",
  green: "#98c379",
  yellow: "#e5c07b",
  red: "#e06c75",
  selected: "#2c313c",
} as const;

export const editorTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: editorColors.blue },
    secondary: { main: editorColors.purple },
    background: {
      default: editorColors.background,
      paper: editorColors.background,
    },
    text: { primary: editorColors.foreground, secondary: editorColors.muted },
    divider: "#3a404b",
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: studio.mono,
    h3: {
      fontFamily: '"Manrope Variable", sans-serif',
      fontSize: "1.6rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-.03em",
    },
    h4: { fontSize: ".9375rem", fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: ".8125rem", lineHeight: 1.85 },
    body2: { fontSize: ".8125rem", lineHeight: 1.85 },
    button: { textTransform: "none", fontSize: ".75rem", fontWeight: 400 },
    overline: { fontSize: ".625rem", letterSpacing: ".08em" },
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 0, minWidth: 0, textTransform: "none" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: studio.mono,
          fontSize: ".6875rem",
          textTransform: "none",
          minHeight: 42,
          minWidth: 0,
          padding: "10px 15px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 42 },
        indicator: { top: 0, height: 2 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: studio.mono,
          fontSize: ".625rem",
          borderRadius: 2,
          height: 25,
        },
        outlined: {
          color: editorColors.foreground,
          borderColor: "#4b5362",
          backgroundColor: "#1e2227",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { border: "1px solid #4b5362", borderRadius: 4 },
      },
    },
  },
});
