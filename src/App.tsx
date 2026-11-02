import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import GitHub from "@mui/icons-material/GitHub";
import MilitaryTechRounded from "@mui/icons-material/MilitaryTechRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  profile,
  workEntries,
  type Field,
  type WorkEntry,
  type WorkFileId,
} from "./content";
import { paperTheme, studio } from "./theme";
import CollageBoard from "./components/CollageBoard";
import ExperienceEditor from "./components/ExperienceEditor";
import LanguageText from "./components/LanguageText";
import {
  ExternalButton,
  Footer,
  Header,
  TagList,
} from "./components/SiteChrome";

const fields: Field[] = ["software", "ai"];
const fieldColor = { software: studio.blueAccent, ai: studio.coral };
const sectionSpacing = { py: { xs: 7, md: 10 } };

function RoutePosition() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView(),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

function Hero() {
  const { t } = useTranslation();
  return (
    <Box
      component="section"
      aria-labelledby="hero-title"
      sx={{ pt: { xs: 5, md: 8, xl: 10 }, pb: { md: 2 }, overflow: "clip" }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "center",
            gap: { xs: 5, md: 5, xl: 8 },
            "& > figure": {
              width: "100%",
              maxWidth: { sm: 540, md: 520, xl: 560 },
              justifySelf: "center",
            },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: studio.coral,
                  transform: "rotate(45deg)",
                }}
              />
              <Typography variant="overline">{t("hero.eyebrow")}</Typography>
            </Stack>
            <Typography
              component="h1"
              variant="h1"
              id="hero-title"
              sx={{
                fontSize: {
                  xs: "clamp(2.9rem, 10vw, 4.5rem)",
                  md: "clamp(3.7rem, 5.7vw, 5.2rem)",
                  xl: "6.25rem",
                },
              }}
            >
              <Box component="span" sx={{ display: "block" }}>
                {t("hero.line1")}
              </Box>
              <Box
                component="span"
                sx={{ display: "block", color: "primary.main", mt: 0.15 }}
              >
                {t("hero.line2")}
              </Box>
            </Typography>
            {t("hero.intersection") && (
              <Typography
                sx={{
                  fontFamily: studio.serif,
                  fontStyle: "italic",
                  fontSize: { xs: "1.8rem", md: "2.1rem" },
                  lineHeight: 1.1,
                  mt: 2.5,
                  color: "secondary.main",
                  transform: "rotate(-2deg)",
                  transformOrigin: "left",
                }}
              >
                {t("hero.intersection")}
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{
                maxWidth: 480,
                color: "text.secondary",
                mt: 3,
                mb: 3.5,
                fontSize: { xs: ".875rem", xl: "1rem" },
              }}
            >
              {t("hero.description")}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ gap: 2, alignItems: { xs: "stretch", sm: "center" } }}
            >
              <Button
                href="#skills"
                variant="contained"
                endIcon={<ArrowDownwardRounded sx={{ fontSize: 17 }} />}
              >
                <LanguageText>{t("hero.cta")}</LanguageText>
              </Button>
              <ExternalButton
                href={profile.github}
                color="inherit"
                startIcon={<GitHub sx={{ fontSize: 18 }} />}
              >
                {t("hero.github")}
              </ExternalButton>
            </Stack>
          </Box>
          <CollageBoard />
        </Box>
      </Container>
    </Box>
  );
}

function SectionHeading({
  section,
}: {
  section: "skills" | "work" | "projects";
}) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.15fr .85fr" },
        gap: 3,
        alignItems: "end",
        mb: 5,
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ display: "block", mb: 2, color: "secondary.main" }}
        >
          {t(`${section}.eyebrow`)}
        </Typography>
        <Typography
          component="h2"
          id={`${section}-heading`}
          variant="h2"
          sx={{ whiteSpace: "pre-line" }}
        >
          {t(`${section}.title`)}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", maxWidth: 390, ml: { md: "auto" } }}
      >
        {t(`${section}.description`)}
      </Typography>
    </Box>
  );
}

function Skills({ onOpenFile }: { onOpenFile: (id: WorkFileId) => void }) {
  const { t } = useTranslation();
  return (
    <Container
      component="section"
      id="skills"
      aria-labelledby="skills-heading"
      sx={sectionSpacing}
    >
      <SectionHeading section="skills" />
      <ThemeProvider theme={paperTheme}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 4 },
            px: { xs: 0, md: 1 },
            pt: 1,
          }}
        >
          {fields.map((field, index) => {
            const items = t(`skills.${field}.items`, {
              returnObjects: true,
            }) as string[];
            return (
              <Paper
                component="article"
                id={`skill-${field}`}
                key={field}
                sx={{
                  p: { xs: 3, sm: 4 },
                  border: `1.5px solid ${studio.noteLine}`,
                  bgcolor: field === "ai" ? studio.pink : studio.note,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  transform: {
                    xs: "none",
                    md: index === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  },
                  transition: "transform .25s, box-shadow .25s",
                  "&:hover": {
                    transform: "rotate(0deg) translateY(-4px)",
                    boxShadow: `5px 6px 0 ${studio.ink}`,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: "42%",
                    top: -12,
                    width: 70,
                    height: 24,
                    bgcolor: "#c6c2afaa",
                    transform: "rotate(-4deg)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{
                      color: field === "ai" ? "secondary.main" : "primary.main",
                      fontFamily: field === "ai" ? studio.serif : studio.mono,
                      fontSize: "3.2rem",
                      lineHeight: 1,
                    }}
                  >
                    {field === "ai" ? "✳" : "{ }"}
                  </Typography>
                </Stack>
                <Typography component="h3" variant="h3" sx={{ mb: 1.5 }}>
                  {t(`skills.${field}.title`)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 3, maxWidth: 430 }}
                >
                  {t(`skills.${field}.description`)}
                </Typography>
                <Stack
                  component="ul"
                  sx={{ p: 0, m: 0, mb: 4, listStyle: "none", gap: 1.5 }}
                >
                  {items.map((item) => (
                    <Stack
                      key={item}
                      component="li"
                      direction="row"
                      sx={{ gap: 1.5 }}
                    >
                      <Typography
                        aria-hidden="true"
                        sx={{
                          color:
                            field === "ai" ? "secondary.main" : "primary.main",
                          lineHeight: 1.75,
                        }}
                      >
                        ↳
                      </Typography>
                      <Typography variant="body2">{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button
                  onClick={() =>
                    onOpenFile(field === "ai" ? "aiTasks" : "retail")
                  }
                  endIcon={<ArrowOutwardRounded />}
                  sx={{
                    mt: "auto",
                    px: 0,
                    borderTop: `1px solid ${studio.noteLine}`,
                    pt: 2,
                    justifyContent: "space-between",
                    fontSize: ".75rem",
                    color: "text.primary",
                  }}
                >
                  <LanguageText>{t(`skills.${field}.evidence`)}</LanguageText>
                </Button>
              </Paper>
            );
          })}
        </Box>
      </ThemeProvider>
    </Container>
  );
}

function Work({
  selectedFile,
  onFileChange,
}: {
  selectedFile: WorkFileId;
  onFileChange: (id: WorkFileId) => void;
}) {
  return (
    <Box
      component="section"
      id="work"
      aria-labelledby="work-heading"
      sx={{
        ...sectionSpacing,
        bgcolor: studio.section,
        borderBlock: `1px solid ${studio.line}`,
        my: { xs: 2, md: 3 },
      }}
    >
      <Container>
        <SectionHeading section="work" />
        <ExperienceEditor
          selectedFile={selectedFile}
          onFileChange={onFileChange}
        />
      </Container>
    </Box>
  );
}

function Award({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const rna = workEntries[3];
  return (
    <Box
      sx={{ borderTop: "1px dashed", borderColor: "divider", pt: 2.5, mt: 3 }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1.5 }}>
        <MilitaryTechRounded
          sx={{ fontSize: 30, color: "secondary.main", mt: 0.25 }}
        />
        <Box>
          <Typography
            component="h4"
            sx={{ fontWeight: 800, fontSize: ".8125rem", mb: 0.5 }}
          >
            {t("projects.awardTitle")}
          </Typography>
          {!compact && (
            <Typography variant="body2" sx={{ fontSize: ".75rem", mb: 1 }}>
              {t("projects.awardDescription")}
            </Typography>
          )}
          <Link
            href={rna.awardSource}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.primary",
              textUnderlineOffset: 3,
              fontSize: ".6875rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <LanguageText>{t("projects.awardLink")}</LanguageText>
            <ArrowOutwardRounded sx={{ fontSize: 13 }} />
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}

function Projects({ onSelect }: { onSelect: (entry: WorkEntry) => void }) {
  const { t } = useTranslation();
  return (
    <Container
      component="section"
      id="projects"
      aria-labelledby="projects-heading"
      sx={sectionSpacing}
    >
      <SectionHeading section="projects" />
      <ThemeProvider theme={paperTheme}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <Paper
            component="article"
            sx={{
              bgcolor: studio.research,
              p: { xs: 3, sm: 4 },
              border: `1.5px solid ${studio.noteLine}`,
              position: "relative",
              mt: 1,
              boxShadow: `5px 5px 0 ${studio.ink}`,
              "&::before": {
                content: '""',
                position: "absolute",
                height: 8,
                top: -8,
                left: 0,
                right: 0,
                backgroundImage: `radial-gradient(circle at 8px 0, transparent 5px, ${studio.noteLine} 5px 6px, ${studio.research} 6px)`,
                backgroundSize: "16px 8px",
              },
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <Typography variant="overline">{t("work.research")}</Typography>
              <Box
                aria-hidden="true"
                sx={{
                  width: 62,
                  height: 62,
                  border: `2px solid ${studio.red}`,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: "secondary.main",
                  transform: "rotate(12deg)",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 700, textAlign: "center", lineHeight: 1.5 }}
                >
                  PTBI
                  <br />
                  2024
                </Typography>
              </Box>
            </Stack>
            <Typography
              component="h3"
              sx={{
                fontFamily: studio.serif,
                fontSize: { xs: "2.7rem", sm: "3.4rem" },
                lineHeight: 1.05,
                mb: 2,
              }}
            >
              RNAQuANet
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  fontFamily: studio.mono,
                  fontSize: ".5em",
                  color: "secondary.main",
                }}
              >
                {" "}
                *
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ mb: 2.5 }}>
              {t("work.rna.summary")}
            </Typography>
            <TagList tags={workEntries[3].tags} />
            <Award />
            <Button
              onClick={() => onSelect(workEntries[3])}
              aria-label={`${t("work.details")}: RNAQuANet`}
              endIcon={<ArrowOutwardRounded />}
              sx={{ mt: 2, px: 0, color: "text.primary", fontSize: ".75rem" }}
            >
              <LanguageText>{t("work.details")}</LanguageText>
            </Button>
          </Paper>
          <Paper
            component="article"
            sx={{
              bgcolor: studio.note,
              p: { xs: 3, sm: 4 },
              border: `1.5px solid ${studio.noteLine}`,
              mt: { md: 8 },
              transform: { md: "rotate(2deg)" },
            }}
          >
            <Typography variant="overline" sx={{ display: "block", mb: 3 }}>
              {t("work.personal")}
            </Typography>
            <Box
              aria-hidden="true"
              sx={{
                height: 65,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "primary.main",
              }}
            >
              <Box
                sx={{
                  width: 13,
                  height: 13,
                  border: `3px solid ${studio.blue}`,
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  width: 85,
                  height: 35,
                  borderTop: `2px dashed ${studio.blue}`,
                  borderRight: `2px dashed ${studio.blue}`,
                  transform: "skew(-20deg) translateY(16px)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: studio.serif,
                  fontSize: "3.5rem",
                  transform: "rotate(-16deg)",
                }}
              >
                ↗
              </Typography>
            </Box>
            <Typography component="h3" variant="h3" sx={{ mb: 2 }}>
              TravelTactician
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2.5 }}
            >
              {t("work.travel.summary")}
            </Typography>
            <TagList tags={workEntries[4].tags} />
            <Button
              onClick={() => onSelect(workEntries[4])}
              aria-label={`${t("work.details")}: TravelTactician`}
              endIcon={<ArrowOutwardRounded />}
              sx={{ mt: 2, px: 0, color: "text.primary", fontSize: ".75rem" }}
            >
              <LanguageText>{t("work.details")}</LanguageText>
            </Button>
          </Paper>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

function WorkDialog({
  entry,
  onClose,
}: {
  entry: WorkEntry | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const contributions = entry
    ? (t(`work.${entry.id}.contribution`, { returnObjects: true }) as string[])
    : [];
  return (
    <Dialog
      open={Boolean(entry)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="work-dialog-title"
      scroll="paper"
    >
      {entry && (
        <>
          <DialogTitle
            component="div"
            sx={{ p: { xs: 3, sm: 4 }, pb: 2, pr: 7 }}
          >
            <Typography
              variant="overline"
              sx={{ color: fieldColor[entry.field], display: "block", mb: 1.5 }}
            >
              {t(`work.${entry.category}`)}
            </Typography>
            <Typography component="h2" id="work-dialog-title" variant="h3">
              {t(`work.${entry.id}.title`)}
            </Typography>
            <IconButton
              aria-label={t("work.close")}
              onClick={onClose}
              sx={{ position: "absolute", right: 12, top: 12 }}
            >
              <CloseRounded />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ px: { xs: 3, sm: 4 } }}>
            <Typography
              component="h3"
              variant="overline"
              sx={{ color: "text.secondary", mt: 1, mb: 1 }}
            >
              {t("work.context")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {t(`work.${entry.id}.context`)}
            </Typography>
            <Typography
              component="h3"
              variant="overline"
              sx={{ color: "text.secondary", mb: 1 }}
            >
              {t("work.contribution")}
            </Typography>
            <Stack component="ul" spacing={1.5} sx={{ pl: 2, mb: 3 }}>
              {contributions.map((item) => (
                <Typography component="li" key={item} variant="body2">
                  {item}
                </Typography>
              ))}
            </Stack>
            <Typography
              component="h3"
              variant="overline"
              sx={{ color: "text.secondary", mb: 1.5 }}
            >
              {t("work.stack")}
            </Typography>
            <TagList tags={entry.tags} />
            {entry.id === "rna" && <Award />}
          </DialogContent>
          <DialogActions
            sx={{
              px: { xs: 3, sm: 4 },
              pb: 3,
              justifyContent: "flex-start",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {"source" in entry && (
              <ExternalButton
                href={entry.source}
                variant="outlined"
                startIcon={<GitHub />}
              >
                {t("work.source")}
              </ExternalButton>
            )}
            {"demo" in entry && (
              <ExternalButton href={entry.demo}>
                {t("work.demo")}
              </ExternalButton>
            )}
            {!("source" in entry) && (
              <Button onClick={onClose}>
                <LanguageText>{t("work.close")}</LanguageText>
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

function About() {
  const { t } = useTranslation();
  const principles = t("about.principles", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];
  return (
    <Container
      component="section"
      id="about"
      aria-labelledby="about-title"
      sx={{
        ...sectionSpacing,
        borderTop: `1px solid ${studio.line}`,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: 5, md: 10 },
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ display: "block", mb: 2, color: "secondary.main" }}
        >
          {t("about.eyebrow")}
        </Typography>
        <Typography
          component="h2"
          id="about-title"
          sx={{
            whiteSpace: "pre-line",
            fontFamily: studio.serif,
            fontSize: { xs: "3.3rem", md: "4.5rem" },
            fontStyle: "italic",
            lineHeight: 1,
            mb: 3,
          }}
        >
          {t("about.title")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {t("about.description")}
        </Typography>
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          {t("about.note")}
        </Typography>
      </Box>
      <Stack sx={{ justifyContent: "center" }}>
        {principles.map((item) => (
          <Stack
            key={item.title}
            direction="row"
            sx={{
              gap: 3,
              py: 2.5,
              borderBottom: `1px solid ${studio.line}`,
              "&:last-child": { border: 0 },
            }}
          >
            <Box>
              <Typography component="h3" variant="h4" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

function Home() {
  const [entry, setEntry] = useState<WorkEntry | null>(null);
  const [selectedFile, setSelectedFile] = useState<WorkFileId>("readme");
  const openWorkFile = (id: WorkFileId) => {
    setSelectedFile(id);
    requestAnimationFrame(() =>
      document.getElementById("work")?.scrollIntoView(),
    );
  };
  return (
    <>
      <Box component="main" id="main" tabIndex={-1}>
        <Hero />
        <Skills onOpenFile={openWorkFile} />
        <Work selectedFile={selectedFile} onFileChange={setSelectedFile} />
        <Projects onSelect={setEntry} />
        <About />
      </Box>
      <Footer />
      <WorkDialog entry={entry} onClose={() => setEntry(null)} />
    </>
  );
}

function UtilityPage({ missing = false }: { missing?: boolean }) {
  const { t } = useTranslation();
  const section = missing ? "missing" : "lab";
  return (
    <>
      <Container
        component="main"
        id="main"
        tabIndex={-1}
        sx={{ py: { xs: 9, md: 14 }, minHeight: "65vh" }}
      >
        {missing ? (
          <Typography variant="overline" sx={{ color: "secondary.main" }}>
            404 / WRONG TURN
          </Typography>
        ) : (
          <ScienceRounded
            sx={{ color: "secondary.main", fontSize: 44, mb: 3 }}
          />
        )}
        {!missing && (
          <Typography
            variant="overline"
            sx={{ color: "primary.main", display: "block", mb: 2 }}
          >
            {t("lab.eyebrow")}
          </Typography>
        )}
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "2.8rem", md: "4.5rem" },
            maxWidth: 800,
            mb: 3,
          }}
        >
          {t(`${section}.title`)}
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: 550, mb: 4 }}>
          {t(`${section}.description`)}
        </Typography>
        {!missing && (
          <Typography variant="overline" sx={{ mb: 4, display: "block" }}>
            {t("lab.status")}
          </Typography>
        )}
        <Button
          component={RouterLink}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackRounded />}
        >
          <LanguageText>{t(`${section}.back`)}</LanguageText>
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Box id="top">
      <Header />
      <RoutePosition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab" element={<UtilityPage />} />
        <Route path="*" element={<UtilityPage missing />} />
      </Routes>
    </Box>
  );
}
