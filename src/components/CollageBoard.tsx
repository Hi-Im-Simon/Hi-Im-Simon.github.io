import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShuffleRounded from "@mui/icons-material/ShuffleRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import { useTranslation } from "react-i18next";
import { studio } from "../theme";

const layouts = [
  { software: -6, ai: 5, star: 12, ring: -17, note: -9 },
  { software: 3, ai: -5, star: 52, ring: 15, note: 7 },
  { software: -3, ai: 8, star: -20, ring: -35, note: -4 },
  { software: 6, ai: -3, star: 75, ring: 8, note: 11 },
  { software: -8, ai: 2, star: 25, ring: -5, note: 3 },
];

/** Only the artwork is shuffled: navigation and meaningful text stay in place. */
export default function CollageBoard() {
  const { t } = useTranslation();
  const [layout, setLayout] = useState(0);
  const pose = layouts[layout];
  return (
    <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
      <Box
        id="collage-board"
        data-layout={layout}
        sx={{
          height: { xs: 425, sm: 440, md: 470 },
          position: "relative",
          isolation: "isolate",
          mx: { xs: 1, sm: 2 },
          backgroundImage:
            "linear-gradient(#f0f1f40c 1px, transparent 1px), linear-gradient(90deg, #f0f1f40c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          border: `1px solid ${studio.line}`,
        }}
      >
        <Typography
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: 9,
            left: 12,
            fontFamily: studio.mono,
            color: "text.secondary",
            fontSize: ".5625rem",
          }}
        >
          SZ / FIELD NOTES
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 26 },
            right: 16,
            width: { xs: 68, sm: 104 },
            height: { xs: 68, sm: 104 },
            bgcolor: studio.orange,
            clipPath:
              "polygon(50% 0%, 60% 27%, 82% 9%, 79% 36%, 100% 37%, 82% 54%, 98% 77%, 70% 73%, 66% 100%, 49% 79%, 27% 99%, 30% 72%, 3% 78%, 19% 55%, 0 39%, 28% 34%, 21% 8%, 43% 26%)",
            transform: `rotate(${pose.star}deg)`,
            transition: "transform .65s cubic-bezier(.2,.8,.2,1)",
            zIndex: 3,
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            left: 17,
            bottom: 31,
            width: 118,
            height: 118,
            border: `17px solid ${studio.blueAccent}`,
            borderRadius: "50%",
            transform: `rotate(${pose.ring}deg)`,
            transition: "transform .6s",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 25,
              height: 135,
              bgcolor: studio.paper,
              left: 28,
              top: -25,
            },
          }}
        />
        <IconButton
          aria-label={t("hero.shuffle")}
          aria-controls="collage-board"
          onClick={() => {
            const step = 1 + Math.floor(Math.random() * (layouts.length - 1));
            setLayout((current) => (current + step) % layouts.length);
          }}
          sx={{
            color: "text.primary",
            fontSize: ".6875rem",
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 5,
          }}
        >
          <ShuffleRounded sx={{ fontSize: 16 }} />
        </IconButton>
        {(["software", "ai"] as const).map((field, index) => (
          <Box
            key={field}
            component="a"
            href={`#skill-${field}`}
            aria-label={t(`hero.${field}.title`)}
            sx={{
              position: "absolute",
              width: "78%",
              left: index === 0 ? "6%" : "16%",
              top: index === 0 ? 65 : 210,
              p: { xs: 2.5, sm: 3 },
              color: index === 0 ? studio.ink : studio.blue,
              bgcolor: index === 0 ? studio.note : studio.noteBlue,
              border: `1.5px solid ${studio.ink}`,
              boxShadow: "5px 6px 0 #16191e55",
              textDecoration: "none",
              zIndex: index === 0 ? 1 : 2,
              transform: `rotate(${pose[field]}deg)`,
              transition:
                "transform .55s cubic-bezier(.2,.8,.2,1), box-shadow .2s",
              "&:hover": {
                transform: "rotate(0deg) translateY(-5px)",
                boxShadow: "8px 10px 0 #16191e55",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                width: 75,
                height: 24,
                left: "36%",
                top: -13,
                bgcolor: index === 0 ? "#c6c2afaa" : "#dbbecfaa",
                transform: index === 0 ? "rotate(5deg)" : "rotate(-8deg)",
                borderInline: "2px dashed #fffdf550",
              },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "inherit",
                opacity: 0.9,
              }}
            >
              {t(`hero.${field}.label`)}
              <ArrowOutwardRounded sx={{ fontSize: 17 }} />
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                fontFamily: index === 0 ? studio.mono : studio.serif,
                fontWeight: index === 0 ? 500 : 400,
                fontStyle: index === 0 ? "normal" : "italic",
                fontSize: {
                  xs: index === 0 ? "1.3rem" : "1.7rem",
                  sm: index === 0 ? "2rem" : "2.8rem",
                },
                lineHeight: 1.15,
                letterSpacing: "-.04em",
              }}
            >
              {index === 0 ? "</> software" : t("hero.ai.boardTitle")}
            </Typography>
            <Typography
              sx={{
                fontFamily: studio.mono,
                fontSize: ".625rem",
                mt: 1.75,
                opacity: 0.9,
              }}
            >
              {t(`hero.${field}.boardLine`)}
            </Typography>
          </Box>
        ))}
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            bottom: 18,
            right: 9,
            zIndex: 4,
            bgcolor: studio.yellow,
            color: studio.ink,
            px: 2,
            py: 0.7,
            border: `1px solid ${studio.ink}`,
            transform: `rotate(${pose.note}deg)`,
            transition: "transform .6s",
          }}
        >
          <Typography
            sx={{
              fontFamily: studio.serif,
              fontSize: { xs: "1.25rem", sm: "1.6rem" },
              fontStyle: "italic",
              lineHeight: 1.2,
            }}
          >
            {t("hero.boardNote")}
          </Typography>
        </Box>
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            bottom: 2,
            left: "45%",
            width: 70,
            height: 30,
            backgroundImage: `repeating-linear-gradient(90deg, ${studio.muted} 0 2px, transparent 2px 5px, ${studio.muted} 5px 6px, transparent 6px 9px)`,
          }}
        />
      </Box>
      <Box
        component="figcaption"
        sx={{
          mt: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      ></Box>
    </Box>
  );
}
