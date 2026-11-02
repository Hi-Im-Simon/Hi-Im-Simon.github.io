import { useState, type ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { profile } from "../content";
import { studio } from "../theme";
import LanguageSwitch from "./LanguageSwitch";
import LanguageText from "./LanguageText";

export function ExternalButton({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
  startIcon?: ReactNode;
  color?: "primary" | "secondary" | "inherit";
}) {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<ArrowOutwardRounded fontSize="small" />}
      {...props}
    >
      <LanguageText>{children}</LanguageText>
    </Button>
  );
}

const tagKeys: Record<string, string> = {
  "LLM evaluation": "evaluation",
  "AI training": "training",
  "Rate & review": "rateReview",
  "Code review": "review",
  Rubrics: "rubrics",
  "Machine learning": "ml",
  "Web Workers": "workers",
  "Payment plugins": "paymentPlugins",
  "Prompt design": "promptDesign",
  "Evaluation reports": "evaluationReports",
};
export function TagList({ tags }: { tags: readonly string[] }) {
  const { t } = useTranslation();
  return (
    <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 0.75 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tagKeys[tag] ? t(`tags.${tagKeys[tag]}`) : tag}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigation = ["skills", "work", "about"] as const;
  return (
    <>
      <Link
        href="#main"
        sx={{
          position: "fixed",
          left: 16,
          top: -100,
          zIndex: 1500,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          px: 3,
          py: 1.5,
          "&:focus": { top: 16 },
        }}
      >
        <LanguageText>{t("nav.skip")}</LanguageText>
      </Link>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: studio.paper,
          borderBottom: `1px solid ${studio.line}`,
        }}
      >
        <Container
          sx={{
            height: { xs: 72, md: 84 },
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            aria-label={t("nav.home")}
            underline="none"
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: 1.75,
              mr: "auto",
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                display: "grid",
                placeItems: "center",
                bgcolor: studio.red,
                color: studio.white,
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: "-.09em",
                transform: "rotate(-6deg)",
                transition: "transform .25s",
                "&:hover": { transform: "rotate(6deg)" },
              }}
            >
              s*
            </Box>
            <Typography
              data-language-static
              sx={{
                fontWeight: 750,
                fontSize: ".8125rem",
                display: { xs: "none", md: "block" },
                letterSpacing: "-.04em",
              }}
            >
              szymon.stanisławski
              <Box component="span" sx={{ color: "secondary.main" }}>
                {" "}
                ↗
              </Box>
            </Typography>
          </Link>
          <Stack
            component="nav"
            direction="row"
            aria-label={t("nav.label")}
            sx={{ display: { xs: "none", md: "flex" }, gap: 3.5, mr: 2 }}
          >
            {navigation.map((item) => (
              <Link
                key={item}
                component={RouterLink}
                to={`/#${item}`}
                underline="none"
                sx={{
                  fontSize: ".6875rem",
                  fontFamily: studio.mono,
                  color: "text.primary",
                  textUnderlineOffset: 5,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "primary.main",
                  },
                }}
              >
                <LanguageText>{t(`nav.${item}`)}</LanguageText>
              </Link>
            ))}
          </Stack>
          <LanguageSwitch />
          <Button
            component={RouterLink}
            to="/#contact"
            endIcon={<ArrowOutwardRounded />}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              color: "text.primary",
              ml: 1,
              py: 1,
              fontSize: ".75rem",
              width: 152,
              minWidth: 152,
              flexShrink: 0,
              px: 1.5,
              whiteSpace: "nowrap",
              justifyContent: "space-between",
              "& .MuiButton-endIcon": { m: 0 },
            }}
          >
            <LanguageText>{t("nav.contact")}</LanguageText>
          </Button>
          <IconButton
            aria-label={t("nav.menu")}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRounded />
          </IconButton>
        </Container>
      </Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box id="mobile-navigation" sx={{ width: 280, p: 3 }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Typography variant="overline">Software + AI</Typography>
            <IconButton
              aria-label={t("nav.close")}
              onClick={() => setOpen(false)}
            >
              <CloseRounded />
            </IconButton>
          </Stack>
          <Stack component="nav" aria-label={t("nav.label")} spacing={1}>
            {[...navigation, "contact" as const].map((item) => (
              <Button
                key={item}
                component={RouterLink}
                to={`/#${item}`}
                onClick={() => setOpen(false)}
                sx={{ justifyContent: "space-between" }}
                endIcon={<ArrowOutwardRounded />}
              >
                <LanguageText>{t(`nav.${item}`)}</LanguageText>
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        bgcolor: studio.footer,
        borderTop: `1.5px solid ${studio.line}`,
        mt: 6,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          height: 9,
          borderBottom: `1px solid ${studio.line}`,
          backgroundImage: `repeating-linear-gradient(125deg, ${studio.coral} 0 1px, transparent 1px 8px)`,
        }}
      />
      <Container sx={{ pt: { xs: 5, md: 8 } }}>
        <Typography variant="overline">{t("contact.eyebrow")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr .8fr" },
            gap: 4,
            alignItems: "center",
            py: 4,
          }}
        >
          <Typography
            component="h2"
            sx={{
              whiteSpace: "pre-line",
              fontFamily: studio.serif,
              fontStyle: "italic",
              fontSize: { xs: "4rem", sm: "6rem", md: "7rem" },
              lineHeight: 0.95,
              letterSpacing: "-.045em",
            }}
          >
            {t("contact.title")}
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                display: "inline-block",
                ml: 2,
                color: studio.orange,
                fontFamily: studio.mono,
                fontSize: ".65em",
                transform: "rotate(-15deg)",
              }}
            >
              ↗
            </Box>
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 3, maxWidth: 380 }}>
              {t("contact.description")}
            </Typography>
            <Stack sx={{ alignItems: "flex-start", gap: 1.25 }}>
              <Stack
                direction="row"
                useFlexGap
                sx={{ flexWrap: "wrap", gap: 1.5 }}
              >
                {profile.email && (
                  <ExternalButton
                    variant="contained"
                    href={`mailto:${profile.email}`}
                  >
                    {t("contact.email")}
                  </ExternalButton>
                )}
                <ExternalButton
                  variant="outlined"
                  href={profile.linkedin}
                  startIcon={<LinkedIn />}
                >
                  {t("contact.linkedin")}
                </ExternalButton>
              </Stack>
              <ExternalButton
                href={profile.github}
                color="inherit"
                startIcon={<GitHub sx={{ fontSize: 18 }} />}
              >
                {t("contact.github")}
              </ExternalButton>
            </Stack>
          </Box>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 1,
            py: 3,
            mt: 3,
            borderTop: `1px solid ${studio.line}`,
          }}
        >
          <Typography
            variant="body2"
            data-language-static
            sx={{ fontSize: ".75rem", fontWeight: 650 }}
          >
            © {new Date().getFullYear()} {profile.businessName}
          </Typography>
          {t("contact.footer") && (
            <Typography
              variant="overline"
              sx={{ fontSize: ".5625rem", display: { xs: "none", md: "block" } }}
            >
              {t("contact.footer")}
            </Typography>
          )}
          <Button
            href="#top"
            size="small"
            endIcon={<ArrowUpwardRounded sx={{ fontSize: 14 }} />}
            sx={{ fontSize: ".625rem", color: "text.primary", px: 0 }}
          >
            <LanguageText>{t("contact.back")}</LanguageText>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
