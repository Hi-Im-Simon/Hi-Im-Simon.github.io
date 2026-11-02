import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";
import { editorColors as colors } from "../editorTheme";
import LanguageText from "./LanguageText";

// Fictional outcomes illustrate the two scoring formats; no client task data.
const criteria = [
  {
    id: "freshness", type: "objective", necessity: "explicit",
    a: "pass", b: "fail",
  },
  {
    id: "empty", type: "objective", necessity: "implicit",
    a: "pass", b: "fail",
  },
  {
    id: "explanation", type: "subjective", necessity: "explicit",
    preference: "A",
  },
] as const;

export default function RubricExampleDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const key = "work.aiRubrics.example";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      aria-labelledby="rubric-example-title"
      aria-describedby="rubric-example-note"
      sx={{
        "& .MuiDialog-paper": {
          m: { xs: 2, sm: 3 },
          width: "calc(100% - 32px)",
        },
      }}
    >
      <DialogTitle component="div" sx={{ px: { xs: 2, sm: 3 }, pr: 6, pb: 1.5 }}>
        <Typography
          component="h3"
          id="rubric-example-title"
          sx={{ color: colors.bright, fontWeight: 600, fontSize: "1rem" }}
        >
          {t(`${key}.title`)}
        </Typography>
        <Typography
          id="rubric-example-note"
          sx={{ mt: 0.75, fontSize: ".6875rem", color: "text.secondary" }}
        >
          {t(`${key}.note`)}
        </Typography>
        <IconButton
          aria-label={t("work.close")}
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent data-testid="rubric-example" sx={{ px: { xs: 2, sm: 3 }, pb: 1 }}>
        <Box sx={{
          p: 1.5, bgcolor: colors.sidebar,
          border: "1px solid", borderColor: "divider", mb: 2,
        }}>
          <Typography sx={{ color: colors.blue, fontSize: ".625rem", mb: 0.5 }}>
            {t(`${key}.labels.task`)}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.25 }}>
            {t(`${key}.task`)}
          </Typography>
          {(["a", "b"] as const).map((response) => (
            <Stack key={response} direction="row" sx={{ gap: 1, mt: 0.5 }}>
              <Typography sx={{ color: colors.blue, fontSize: ".6875rem", fontWeight: 600 }}>
                {response.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: ".6875rem" }}>
                {t(`${key}.responses.${response}`)}
              </Typography>
            </Stack>
          ))}
        </Box>
        <Stack component="ol" sx={{ p: 0, m: 0, listStyle: "none", gap: 1.25 }}>
          {criteria.map((criterion) => (
            <Box
              component="li"
              key={criterion.id}
              sx={{ border: "1px solid", borderColor: "divider", p: 1.5 }}
            >
              <Typography variant="body2" sx={{ color: colors.bright, mb: 1 }}>
                {t(`${key}.criteria.${criterion.id}.text`)}
              </Typography>
              <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 0.75, mb: 1 }}>
                <Chip
                  variant="outlined"
                  label={t(`${key}.labels.${criterion.type}`)}
                  sx={{ color: criterion.type === "objective" ? colors.blue : colors.purple }}
                />
                <Chip variant="outlined" label={t(`${key}.labels.${criterion.necessity}`)} />
              </Stack>
              <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1, mb: 1 }}>
                {criterion.type === "objective" ? (["a", "b"] as const).map((response) => {
                  const outcome = criterion[response];
                  return (
                    <Chip
                      key={response}
                      label={`${response.toUpperCase()}: ${t(`${key}.labels.${outcome}`)}`}
                      sx={{
                        color: outcome === "pass" ? colors.green : colors.red,
                        bgcolor: colors.sidebar,
                        border: "1px solid currentColor",
                      }}
                    />
                  );
                }) : (
                  <Chip
                    label={t(`${key}.labels.preference`, { response: criterion.preference })}
                    sx={{
                      color: colors.purple,
                      bgcolor: colors.sidebar,
                      border: "1px solid currentColor",
                    }}
                  />
                )}
              </Stack>
              <Typography sx={{ color: "text.secondary", fontSize: ".6875rem", lineHeight: 1.7 }}>
                {t(`${key}.criteria.${criterion.id}.reason`)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: { xs: 2, sm: 3 } }}>
        <Button onClick={onClose}>
          <LanguageText>{t("work.close")}</LanguageText>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
