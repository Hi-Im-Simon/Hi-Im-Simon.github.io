import { flushSync } from "react-dom";
import i18n from "./i18n";

type Language = "pl" | "en";
type Transition = {
  language: Language;
  timer: number;
  motion: MediaQueryList;
  onMotionChange: () => void;
};

let active: Transition | undefined;

function finishTransition() {
  if (active) {
    window.clearTimeout(active.timer);
    active.motion.removeEventListener("change", active.onMotionChange);
    active = undefined;
  }
  delete document.documentElement.dataset.languagePhase;
}

/** Fade the old copy first, then translate and reveal it. Latest choice wins. */
export function changeSiteLanguage(language: Language) {
  if (language === i18n.resolvedLanguage) {
    if (active && active.language !== language) finishTransition();
    return;
  }
  if (active?.language === language) return;
  finishTransition();

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motion.matches) {
    void i18n.changeLanguage(language);
    return;
  }

  const transition: Transition = {
    language,
    timer: 0,
    motion,
    onMotionChange: () => {
      if (!motion.matches || active !== transition) return;
      finishTransition();
      void i18n.changeLanguage(language);
    },
  };
  active = transition;
  motion.addEventListener("change", transition.onMotionChange);
  document.documentElement.dataset.languagePhase = "leaving";
  transition.timer = window.setTimeout(() => {
    if (active !== transition) return;
    // Commit translated React content before the incoming animation can paint.
    flushSync(() => {
      void i18n.changeLanguage(language);
    });
    document.documentElement.dataset.languagePhase = "entering";
    transition.timer = window.setTimeout(() => {
      if (active === transition) finishTransition();
    }, 560);
  }, 200);
}
