import type { ReactNode } from "react";
import { Box } from "@mui/material";

/** Inline copy moves independently of its button, icon or surrounding surface. */
export default function LanguageText({ children }: { children: ReactNode }) {
  return (
    <Box component="span" data-language-text sx={{ display: "inline-block" }}>
      {children}
    </Box>
  );
}
