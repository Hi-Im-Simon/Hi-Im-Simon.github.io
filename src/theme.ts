import { createTheme } from "@mui/material/styles";

/** Field Notes: graphite surroundings, real paper notes and colored annotations. */
export const studio = {
  ink: "#24252a",
  paper: "#383a40",
  sheet: "#42464f",
  section: "#2e3542",
  text: "#f0f1f4",
  muted: "#bcc1cd",
  cutout: "#e3e5ec",
  note: "#f7f7f3",
  noteMuted: "#535966",
  noteLine: "#b4b6bd",
  noteBlue: "#dce5fb",
  white: "#fffdf5",
  blue: "#2346c7",
  blueAccent: "#b7c6ff",
  red: "#bc3425",
  coral: "#f1a98e",
  orange: "#ef8b65",
  yellow: "#f4db83",
  pink: "#f1e4eb",
  research: "#f1e5d8",
  footer: "#453c48",
  line: "#565b67",
  serif: '"Instrument Serif", Georgia, serif',
  mono: '"IBM Plex Mono", monospace',
} as const;

const translatedCopy = ":is(.MuiTypography-root, [data-language-text], .MuiChip-label):not(.MuiDialogTitle-root, .MuiLink-root, [data-language-static], [aria-hidden='true'])";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: studio.blueAccent, contrastText: studio.ink },
    secondary: { main: studio.coral, contrastText: studio.ink },
    background: { default: studio.paper, paper: studio.sheet },
    text: { primary: studio.text, secondary: studio.muted },
    divider: studio.line,
    info: { main: studio.blueAccent },
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: '"Manrope Variable", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-.075em", lineHeight: 0.98 },
    h2: {
      fontWeight: 750,
      letterSpacing: "-.055em",
      lineHeight: 1.08,
      fontSize: "clamp(2rem, 4.6vw, 3.7rem)",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-.035em",
      lineHeight: 1.2,
      fontSize: "1.6rem",
    },
    h4: { fontWeight: 700, letterSpacing: "-.025em", fontSize: "1.15rem" },
    body1: { fontSize: "1rem", lineHeight: 1.8 },
    body2: { fontSize: ".875rem", lineHeight: 1.75 },
    button: { textTransform: "none", fontWeight: 700, letterSpacing: "-.01em" },
    overline: {
      fontFamily: studio.mono,
      fontSize: ".625rem",
      letterSpacing: ".07em",
      lineHeight: 1.7,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          colorScheme: "dark",
          scrollBehavior: "smooth",
          scrollPaddingTop: "105px",
        },
        body: {
          minWidth: 320,
          backgroundImage:
            "radial-gradient(#f0f1f40b .65px, transparent .65px)",
          backgroundSize: "5px 5px",
        },
        "::selection": { background: studio.yellow, color: studio.ink },
        "a, button, [tabindex]": { WebkitTapHighlightColor: "transparent" },
        ":focus-visible": {
          outline: `3px solid ${studio.orange}`,
          outlineOffset: 5,
        },
        "@keyframes language-copy-out": {
          from: { translate: "0 0", filter: "blur(0)" },
          to: { opacity: 0, translate: "0 -5px", filter: "blur(2px)" },
        },
        "[data-language-text]": { display: "inline-block" },
        "@keyframes language-copy-in": {
          from: { opacity: 0, translate: "0 6px", filter: "blur(2px)" },
          to: { translate: "0 0", filter: "blur(0)" },
        },
        [`html[data-language-phase='leaving'] ${translatedCopy}`]: {
          animation: "language-copy-out 200ms ease-in both",
        },
        [`html[data-language-phase='entering'] ${translatedCopy}`]: {
          animation: "language-copy-in 460ms cubic-bezier(.2,.7,.2,1) 40ms both",
        },
        [`html[data-language-phase='entering'] ${translatedCopy}:is(h1, h2, h3)`]: {
          animationDelay: "0ms",
        },
        [`html[data-language-phase='entering'] ${translatedCopy}[data-language-text]`]: {
          animationDelay: "90ms",
        },
        "@media (prefers-reduced-motion: reduce)": {
          html: { scrollBehavior: "auto" },
          "*, *::before, *::after": {
            animation: "none !important",
            transition: "none !important",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
      styleOverrides: {
        maxWidthLg: ({ theme }) => ({
          [theme.breakpoints.up("xl")]: { maxWidth: 1440 },
        }),
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "11px 18px",
          transition: "transform .18s, box-shadow .18s, background-color .18s",
          "&:active": { transform: "translate(2px, 2px)" },
        },
        contained: {
          border: `1.5px solid ${studio.ink}`,
          boxShadow: `3px 3px 0 ${studio.ink}`,
          "&:hover": {
            boxShadow: `1px 1px 0 ${studio.ink}`,
            transform: "translate(2px, 2px)",
          },
        },
        outlined: {
          border: `1.5px solid ${studio.muted}`,
          color: studio.text,
          "&:hover": { borderColor: studio.blueAccent, bgcolor: "#b7c6ff0d" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: studio.mono,
          fontSize: ".625rem",
          height: 26,
        },
        outlined: {
          borderColor: studio.line,
          color: studio.muted,
          backgroundColor: "#24252a33",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${studio.line}`,
          borderRadius: 0,
          boxShadow: `10px 10px 0 ${studio.ink}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderLeft: `1px solid ${studio.line}` } },
    },
    MuiTooltip: { defaultProps: { arrow: true } },
  },
});

/** Paper notes have their own ink and accent colors, including nested controls. */
export const paperTheme = createTheme(theme, {
  palette: {
    mode: "light",
    primary: { main: studio.blue, contrastText: studio.white },
    secondary: { main: studio.red, contrastText: studio.white },
    background: { default: studio.note, paper: studio.note },
    text: { primary: studio.ink, secondary: studio.noteMuted },
    divider: studio.noteLine,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: studio.ink,
          borderColor: studio.noteLine,
          "&:hover": { borderColor: studio.blue, bgcolor: "#2346c70a" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          color: studio.noteMuted,
          borderColor: studio.noteLine,
          backgroundColor: "#ffffff40",
        },
      },
    },
  },
});
