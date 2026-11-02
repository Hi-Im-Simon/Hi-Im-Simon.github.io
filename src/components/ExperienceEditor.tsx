import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import FileCopyOutlined from "@mui/icons-material/FileCopyOutlined";
import FolderOutlined from "@mui/icons-material/FolderOutlined";
import GitHub from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";
import {
  profile,
  workEntries,
  workFileNames,
  type WorkFileId,
} from "../content";
import { editorColors as colors, editorTheme } from "../editorTheme";
import { studio } from "../theme";
import { TagList } from "./SiteChrome";
import LanguageText from "./LanguageText";
import RubricExampleDialog from "./RubricExampleDialog";

const files = (
  Object.keys(workFileNames) as Array<Exclude<WorkFileId, "readme">>
).map((id) => ({
  id,
  name: workFileNames[id],
  entry: workEntries.find((entry) => entry.id === id)!,
}));
const fileName = (id: WorkFileId) =>
  id === "readme" ? "README.md" : workFileNames[id];

const disclosureSx = {
  "& > summary": {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: 0.75,
    cursor: "pointer",
    userSelect: "none",
    py: 0.7,
    px: 1,
    fontSize: ".6875rem",
    color: colors.foreground,
    "&::-webkit-details-marker": { display: "none" },
    "&:hover": { bgcolor: colors.selected },
  },
  "& > summary .folder-chevron": {
    fontSize: 16,
    transition: "transform .15s",
    flexShrink: 0,
  },
  "&[open] > summary .folder-chevron": { transform: "rotate(90deg)" },
} as const;

function Readme({ onOpen }: { onOpen: (id: WorkFileId) => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        component="h3"
        variant="h3"
        sx={{ color: colors.bright, mb: 1 }}
      >
        <Box component="span" aria-hidden="true" sx={{ color: colors.purple }}>
          #{" "}
        </Box>
        {t("editor.readme.title")}
      </Typography>
      <Typography sx={{ color: colors.green, fontSize: ".8125rem", mb: 3 }}>
        {t("editor.readme.subtitle")}
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, maxWidth: 700 }}>
        {t("editor.readme.intro")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        {(["software", "ai"] as const).map((field) => (
          <Box key={field} sx={{ borderTop: `1px solid #3a404b`, pt: 2 }}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: field === "software" ? colors.blue : colors.purple,
                mb: 1.5,
              }}
            >
              ## {field}/
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t(`editor.readme.${field}`)}
            </Typography>
            <Button
              onClick={() =>
                onOpen(field === "software" ? "retail" : "aiTasks")
              }
              endIcon={<ChevronRightRounded />}
              sx={{ px: 0, fontSize: ".6875rem", color: colors.blue }}
            >
              <LanguageText>{t("editor.readme.open")}</LanguageText>
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default function ExperienceEditor({
  selectedFile,
  onFileChange,
}: {
  selectedFile: WorkFileId;
  onFileChange: (id: WorkFileId) => void;
}) {
  const { t } = useTranslation();
  const wide = useMediaQuery("(min-width:900px)", { noSsr: true });
  const [explorerPreference, setExplorerPreference] = useState<boolean | null>(
    null,
  );
  const explorerOpen = explorerPreference ?? wide;
  const [openFiles, setOpenFiles] = useState<WorkFileId[]>(["readme"]);
  const [exampleOpen, setExampleOpen] = useState(false);
  const rootRef = useRef<HTMLDetailsElement>(null);
  const softwareRef = useRef<HTMLDetailsElement>(null);
  const aiRef = useRef<HTMLDetailsElement>(null);
  const visibleTabs = openFiles.includes(selectedFile)
    ? openFiles
    : [...openFiles, selectedFile];
  const activeEntry = files.find((file) => file.id === selectedFile)?.entry;
  const folderLabel = activeEntry ? activeEntry.field : null;
  const contributions = activeEntry
    ? (t(`work.${activeEntry.id}.contribution`, {
        returnObjects: true,
      }) as string[])
    : [];

  useEffect(() => {
    setOpenFiles((current) =>
      current.includes(selectedFile) ? current : [...current, selectedFile],
    );
    if (rootRef.current) rootRef.current.open = true;
    const field = files.find((file) => file.id === selectedFile)?.entry.field;
    const folder =
      field === "software"
        ? softwareRef.current
        : field === "ai"
          ? aiRef.current
          : null;
    if (folder) folder.open = true;
  }, [selectedFile]);

  const openFile = (id: WorkFileId) => {
    setOpenFiles((current) =>
      current.includes(id) ? current : [...current, id],
    );
    onFileChange(id);
    if (!wide) setExplorerPreference(false);
  };
  const closeActiveFile = () => {
    const remaining = visibleTabs.filter((id) => id !== selectedFile);
    const next = remaining.at(-1) ?? "readme";
    setOpenFiles(remaining.length ? remaining : ["readme"]);
    onFileChange(next);
  };
  const renderFile = (id: WorkFileId, nested = false) => (
    <Box component="li" key={id}>
      <Button
        fullWidth
        disableRipple
        onClick={() => openFile(id)}
        aria-current={selectedFile === id ? "page" : undefined}
        sx={{
          justifyContent: "flex-start",
          gap: 1,
          px: 1.5,
          pl: nested ? 4.5 : 3,
          py: 0.65,
          lineHeight: 1.6,
          color: selectedFile === id ? colors.bright : colors.foreground,
          bgcolor: selectedFile === id ? colors.selected : "transparent",
          borderLeft: `2px solid ${selectedFile === id ? colors.blue : "transparent"}`,
          "&:hover": { bgcolor: colors.selected },
          fontSize: ".6875rem",
        }}
      >
        <DescriptionOutlined
          sx={{
            fontSize: 15,
            color: id === "readme" ? colors.blue : colors.green,
            flexShrink: 0,
          }}
        />
        <Box
          component="span"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {fileName(id)}
        </Box>
      </Button>
    </Box>
  );

  return (
    <ThemeProvider theme={editorTheme}>
      <Box
        data-testid="experience-editor"
        sx={{
          border: `1px solid ${colors.border}`,
          borderRadius: 1.5,
          overflow: "hidden",
          bgcolor: colors.background,
          color: colors.foreground,
          boxShadow: "0 20px 60px #17191f24",
          fontFamily: studio.mono,
          "& :focus-visible": {
            outline: `2px solid ${colors.blue}`,
            outlineOffset: -2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            height: 38,
            bgcolor: colors.background,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <CodeRounded
            aria-hidden="true"
            sx={{ color: colors.blue, fontSize: 19 }}
          />
          <Typography
            data-language-static
            sx={{
              flex: 1,
              fontSize: ".625rem",
              textAlign: "center",
              color: colors.muted,
            }}
          >
            szymon-stanislawski-portfolio
          </Typography>
          <Box aria-hidden="true" sx={{ width: 19 }} />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "36px minmax(0, 1fr)",
              md: explorerOpen
                ? "44px 248px minmax(0, 1fr)"
                : "44px minmax(0, 1fr)",
            },
            alignItems: "stretch",
            minHeight: { xs: 510, md: 570 },
          }}
        >
          <Stack
            sx={{
              gridColumn: 1,
              gridRow: { xs: explorerOpen ? "1 / 3" : "1", md: 1 },
              alignItems: "center",
              justifyContent: "space-between",
              borderRight: `1px solid ${colors.border}`,
              bgcolor: colors.background,
              py: 1,
            }}
          >
            <Tooltip title={t("editor.toggleExplorer")} placement="right">
              <IconButton
                aria-label={t("editor.toggleExplorer")}
                aria-expanded={explorerOpen}
                aria-controls="work-explorer"
                onClick={() => setExplorerPreference(!explorerOpen)}
                sx={{
                  borderRadius: 0,
                  width: "100%",
                  color: explorerOpen ? colors.bright : colors.muted,
                  borderLeft: `2px solid ${explorerOpen ? colors.blue : "transparent"}`,
                  py: 1.5,
                }}
              >
                <FileCopyOutlined sx={{ fontSize: 21 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub" placement="right">
              <IconButton
                component="a"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                size="small"
                sx={{ color: colors.muted }}
              >
                <GitHub sx={{ fontSize: 19 }} />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box
            component="aside"
            id="work-explorer"
            sx={{
              display: explorerOpen ? "block" : "none",
              gridColumn: 2,
              gridRow: 1,
              bgcolor: colors.sidebar,
              borderRight: { md: `1px solid ${colors.border}` },
              borderBottom: { xs: `1px solid ${colors.border}`, md: 0 },
              maxHeight: { xs: 330, md: "none" },
              overflowY: "auto",
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: ".625rem",
                letterSpacing: ".08em",
                px: 2,
                py: 1.5,
              }}
            >
              {t("editor.explorer")}
            </Typography>
            <Box component="nav" aria-label={t("editor.label")}>
              <Box component="details" open ref={rootRef} sx={disclosureSx}>
                <Box component="summary" sx={{ fontWeight: 600 }}>
                  <ChevronRightRounded className="folder-chevron" />
                  <Box component="span">szymon-stanislawski</Box>
                </Box>
                {(["software", "ai"] as const).map((field) => (
                  <Box
                    key={field}
                    component="details"
                    open
                    ref={field === "software" ? softwareRef : aiRef}
                    sx={{
                      ...disclosureSx,
                      "& > summary": { ...disclosureSx["& > summary"], pl: 2 },
                    }}
                  >
                    <Box component="summary">
                      <ChevronRightRounded className="folder-chevron" />
                      <FolderOutlined
                        sx={{
                          fontSize: 16,
                          color:
                            field === "software" ? colors.blue : colors.purple,
                        }}
                      />
                      <Box data-language-static component="span">
                        {field}
                      </Box>
                    </Box>
                    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                      {files
                        .filter((file) => file.entry.field === field)
                        .map((file) => renderFile(file.id, true))}
                    </Box>
                  </Box>
                ))}
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {renderFile("readme")}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: { xs: 2, md: explorerOpen ? 3 : 2 },
              gridRow: { xs: explorerOpen ? 2 : 1, md: 1 },
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                minWidth: 0,
                bgcolor: colors.sidebar,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <Tabs
                value={selectedFile}
                onChange={(_, id: WorkFileId) => openFile(id)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label={t("editor.openFiles")}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  "& .Mui-selected": {
                    color: `${colors.bright} !important`,
                    bgcolor: colors.background,
                  },
                }}
              >
                {visibleTabs.map((id) => (
                  <Tab
                    key={id}
                    value={id}
                    id={`work-tab-${id}`}
                    aria-controls={`work-file-${id}`}
                    label={fileName(id)}
                    icon={
                      <DescriptionOutlined
                        sx={{
                          fontSize: 15,
                          color: id === "readme" ? colors.blue : colors.green,
                        }}
                      />
                    }
                    iconPosition="start"
                  />
                ))}
              </Tabs>
              {(visibleTabs.length > 1 || selectedFile !== "readme") && (
                <IconButton
                  aria-label={t("editor.closeFile", {
                    file: fileName(selectedFile),
                  })}
                  onClick={closeActiveFile}
                  size="small"
                  sx={{ width: 32, borderRadius: 0, color: colors.muted }}
                >
                  <CloseRounded sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>
            <Box
              aria-label={t("editor.breadcrumb")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: { xs: 2, md: 3 },
                py: 1,
                color: colors.muted,
                fontSize: ".625rem",
                overflow: "hidden",
              }}
            >
              {folderLabel && (
                <>
                  <Box
                    component="span"
                    data-language-text
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {folderLabel}
                  </Box>
                  <ChevronRightRounded sx={{ fontSize: 13, flexShrink: 0 }} />
                </>
              )}
              <Box
                component="span"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {fileName(selectedFile)}
              </Box>
            </Box>
            {visibleTabs.map((id) => (
              <Box
                key={id}
                role="tabpanel"
                hidden={selectedFile !== id}
                id={`work-file-${id}`}
                aria-labelledby={`work-tab-${id}`}
                tabIndex={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  pt: { xs: 2, md: 3.5 },
                  minWidth: 0,
                  pb: 5,
                }}
              >
                {selectedFile === id &&
                  (id === "readme" ? (
                    <Readme onOpen={openFile} />
                  ) : (
                    activeEntry && (
                      <>
                        <Typography
                          component="h3"
                          variant="h3"
                          sx={{ color: colors.bright, mb: 3 }}
                        >
                          <Box
                            component="span"
                            aria-hidden="true"
                            sx={{ color: colors.purple }}
                          >
                            #{" "}
                          </Box>
                          {t(`work.${activeEntry.id}.title`)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>
                          {t(`work.${activeEntry.id}.summary`)}
                        </Typography>
                        <Typography
                          component="h4"
                          variant="h4"
                          sx={{ color: colors.blue, mb: 1.5 }}
                        >
                          ## {t("work.contribution")}
                        </Typography>
                        <Box component="ul" sx={{ pl: 2.25, mt: 0, mb: 3.5 }}>
                          {contributions.map((item) => (
                            <Typography
                              component="li"
                              variant="body2"
                              key={item}
                              sx={{
                                mb: 1,
                                "&::marker": { color: colors.yellow },
                              }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>
                        <Typography
                          component="h4"
                          variant="h4"
                          sx={{ color: colors.blue, mb: 1.5 }}
                        >
                          ## {t("work.stack")}
                        </Typography>
                        <TagList tags={activeEntry.tags} />
                        {id === "aiRubrics" && (
                          <Button
                            onClick={() => setExampleOpen(true)}
                            sx={{ mt: 3, p: 0, fontSize: ".6875rem" }}
                          >
                            <LanguageText>
                              {t("editor.showExample")}
                            </LanguageText>
                          </Button>
                        )}
                      </>
                    )
                  ))}
              </Box>
            ))}
          </Box>
        </Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            gap: 1,
            bgcolor: colors.sidebar,
            color: colors.muted,
            borderTop: `1px solid ${colors.border}`,
            py: 0.6,
            px: 1.5,
            "& .MuiTypography-root": { fontSize: ".5625rem" },
          }}
        >
          <Typography>{t("editor.footerLeft")}</Typography>
          <Typography>{t("editor.footerCenter")}</Typography>
          <Typography data-language-static>
            UTF-8&nbsp;&nbsp;LF&nbsp;&nbsp;{"{}"} Markdown
          </Typography>
        </Stack>
      </Box>
      <RubricExampleDialog
        open={exampleOpen}
        onClose={() => setExampleOpen(false)}
      />
    </ThemeProvider>
  );
}
