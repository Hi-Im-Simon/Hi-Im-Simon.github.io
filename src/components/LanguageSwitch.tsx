import { useLayoutEffect, useRef } from "react";
import { Box, ToggleButton, useMediaQuery } from "@mui/material";
import CheckRounded from "@mui/icons-material/CheckRounded";
import { useTranslation } from "react-i18next";
import { studio } from "../theme";
import { changeSiteLanguage } from "../languageTransition";

type Language = "pl" | "en";
const labels = { pl: "Polski", en: "English" };
const slotWidth = 52;
const gap = 6;

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const selected: Language = i18n.resolvedLanguage === "pl" ? "pl" : "en";
  const other: Language = selected === "pl" ? "en" : "pl";
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const previousLanguage = useRef(selected);
  const group = useRef<HTMLDivElement>(null);
  const buttons = useRef<Partial<Record<Language, HTMLButtonElement>>>({});
  const origins = useRef<Partial<Record<Language, { x: number; y: number }>>>({});
  const check = useRef<SVGSVGElement>(null);
  const focusAfterSwap = useRef<Language | null>(null);

  useLayoutEffect(() => {
    const previous = previousLanguage.current;
    previousLanguage.current = selected;
    const startPositions = origins.current;
    origins.current = {};
    for (const button of Object.values(buttons.current)) {
      button?.getAnimations().forEach((animation) => animation.cancel());
    }
    check.current?.getAnimations().forEach((animation) => animation.cancel());
    if (previous === selected) return;

    if (focusAfterSwap.current === selected) {
      buttons.current[selected]?.focus({ preventScroll: true });
      focusAfterSwap.current = null;
    }
    // DOM order follows the selected language; transforms start at the old slots.
    // Local coordinates preserve the path during interrupted swaps, scrolling or resize.
    const groupPosition = group.current?.getBoundingClientRect();
    for (const language of [selected, previous]) {
      const button = buttons.current[language];
      if (!button) continue;
      if (reduceMotion) continue;
      const incoming = language === selected;
      const target = button.getBoundingClientRect();
      const origin = startPositions[language];
      const distance = origin
        ? origin.x - (target.x - (groupPosition?.x ?? 0))
        : (slotWidth + gap) * (incoming ? 1 : -1);
      const startY = origin ? origin.y - (target.y - (groupPosition?.y ?? 0)) : 0;
      button.animate(
        [
          { transform: `translate(${distance}px, ${startY}px)` },
          { transform: `translate(${distance / 2}px, ${incoming ? -16 : 16}px)` },
          { transform: "translate(0, 0)" },
        ],
        { duration: 480, easing: "cubic-bezier(.4, 0, .2, 1)" },
      );
    }
  }, [selected, reduceMotion]);

  function remindSelection() {
    if (reduceMotion || !check.current) return;
    check.current.getAnimations().forEach((animation) => animation.cancel());
    check.current.animate(
      [
        { transform: "scale(1) rotate(0)" },
        { transform: "scale(1.5) rotate(-12deg)", offset: 0.4 },
        { transform: "scale(.9) rotate(7deg)", offset: 0.7 },
        { transform: "scale(1) rotate(0)" },
      ],
      { duration: 360, easing: "ease-out" },
    );
  }

  return (
    <Box
      ref={group}
      role="group"
      aria-label={t("nav.language")}
      sx={{
        display: "flex",
        gap: `${gap}px`,
        width: slotWidth * 2 + gap,
        flexShrink: 0,
        position: "relative",
        isolation: "isolate",
      }}
    >
      {([selected, other] as const).map((language) => (
        <ToggleButton
          key={language}
          ref={(element) => {
            buttons.current[language] = element ?? undefined;
          }}
          value={language}
          selected={language === selected}
          aria-label={labels[language]}
          lang={language}
          disableRipple
          onClick={(event) => {
            if (language === selected) {
              changeSiteLanguage(language);
              remindSelection();
              return;
            }
            if (document.activeElement === event.currentTarget) {
              focusAfterSwap.current = language;
            }
            const groupPosition = group.current?.getBoundingClientRect();
            for (const code of [selected, other]) {
              const position = buttons.current[code]?.getBoundingClientRect();
              if (position && groupPosition) {
                origins.current[code] = {
                  x: position.x - groupPosition.x,
                  y: position.y - groupPosition.y,
                };
              }
            }
            changeSiteLanguage(language);
          }}
          sx={{
            width: slotWidth,
            minWidth: slotWidth,
            height: 32,
            p: 0,
            gap: 0.5,
            border: `1px solid ${studio.line}`,
            borderRadius: 0,
            color: "text.secondary",
            bgcolor: "background.default",
            fontFamily: studio.mono,
            fontSize: ".625rem",
            zIndex: language === selected ? 2 : 1,
            "&:hover": { bgcolor: "background.paper", color: "text.primary" },
            "&.Mui-selected": {
              color: studio.ink,
              bgcolor: studio.cutout,
              borderColor: studio.cutout,
              "&:hover": {
                bgcolor: studio.blueAccent,
                borderColor: studio.blueAccent,
              },
            },
          }}
        >
          {language === selected && (
            <CheckRounded ref={check} sx={{ fontSize: 14 }} />
          )}
          {language.toUpperCase()}
        </ToggleButton>
      ))}
    </Box>
  );
}
