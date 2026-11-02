import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

test("locale dictionaries have matching keys and array shapes", () => {
  const pl = JSON.parse(
    readFileSync("src/locales/pl/translation.json", "utf8"),
  );
  const en = JSON.parse(
    readFileSync("src/locales/en/translation.json", "utf8"),
  );
  function paths(value: unknown, prefix = ""): string[] {
    if (typeof value === "string") {
      // Optional decorative copy can be hidden by leaving it empty.
      const optionalCopy = [
        ".hero.footnote",
        ".hero.intersection",
        ".contact.footer",
        ".editor.footerLeft",
        ".editor.footerCenter",
      ];
      if (!optionalCopy.includes(prefix)) {
        expect(value.trim().length, prefix).toBeGreaterThan(0);
      }
      return [prefix.replace(/_one$|_few$|_many$|_other$/, "_plural")];
    }
    return Object.entries(value as object).flatMap(([key, child]) =>
      paths(child, `${prefix}.${key}`),
    );
  }
  expect([...new Set(paths(pl))].sort()).toEqual(
    [...new Set(paths(en))].sort(),
  );
});

test.describe("Polish browser", () => {
  test.use({ locale: "pl-PL" });

  test("detects language, updates metadata and persists an explicit choice", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Piszę kod.",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Trenuję AI.",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Portfolio Szymona/,
    );
    await page.getByRole("button", { name: "English", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "I write code.",
    );
    expect(
      await page.evaluate(() => localStorage.getItem("portfolio.language")),
    ).toBe("en");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Szymon Stanisławski’s portfolio/,
    );
    expect(errors).toEqual([]);
  });

  test("two equal disciplines are visible and the collage can be shuffled by keyboard", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.getByRole("region", { name: /Piszę kod/ });
    await expect(
      hero.getByRole("link", { name: "Programowanie", exact: true }),
    ).toBeVisible();
    await expect(
      hero.getByRole("link", {
        name: "Trenowanie i ewaluacja AI",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("#skills article")).toHaveCount(2);
    const widths = await page
      .locator("#skills article")
      .evaluateAll((items) =>
        items.map((item) => item.getBoundingClientRect().width),
      );
    expect(Math.abs(widths[0] - widths[1])).toBeLessThan(2);
    await expect(page.locator("#skill-ai")).toContainText("rate & review");
    await expect(page.locator("#skill-ai")).toContainText("rubryk");
    await expect(hero).not.toContainText("RNAQuANet");
    const shuffle = page.getByRole("button", { name: "Przemieszaj trochę" });
    const before = await page
      .locator("#collage-board")
      .getAttribute("data-layout");
    await shuffle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#collage-board")).not.toHaveAttribute(
      "data-layout",
      before!,
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Trenuję AI.",
    );
  });

  test("experience files, project details and the team award work in both languages", async ({
    page,
  }) => {
    await page.goto("/");
    const work = page.locator("#work");
    await expect(
      work.getByRole("tab", { name: "README.md", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await work
      .getByRole("navigation", { name: "Przeglądaj doświadczenie" })
      .getByRole("button", { name: "task-design.md", exact: true })
      .click();
    await expect(work.getByRole("tabpanel")).toContainText(
      "Przygotowanie zadań dla modeli",
    );
    await page.getByRole("button", { name: "English", exact: true }).click();
    await expect(work.getByRole("tabpanel")).toContainText(
      "Preparing tasks for models",
    );
    const projects = page.locator("#projects");
    await expect(
      projects.getByRole("link", { name: "Award confirmation" }),
    ).toHaveAttribute(
      "href",
      "https://www.ptbi.org.pl/website/contests/winners/",
    );
    await expect(projects).toContainText("PTBI main prize");
    await projects
      .getByRole("button", { name: /My contribution: RNAQuANet/ })
      .click();
    await expect(
      page.getByRole("dialog").getByRole("link", { name: "Source code" }),
    ).toHaveAttribute("href", "https://github.com/maciejbilinski/rnaquanet");
    await page.keyboard.press("Escape");
    await work
      .getByRole("navigation", { name: "Explore my experience" })
      .getByRole("button", { name: "component-library.md", exact: true })
      .click();
    await expect(work.getByRole("tabpanel")).toContainText("lead developer");
  });

  test("mobile navigation and mixed layouts fit small screens in both languages", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: "Otwórz menu" }).click();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Umiejętności" })
      .click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator("#mobile-navigation")).not.toBeVisible();
    for (const width of [320, 375, 768, 1024, 1440, 1920, 2560, 3440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `Polish at ${width}px`,
      ).toBe(true);
    }
    await page.getByRole("button", { name: "English", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    for (const width of [320, 375, 768, 1024, 1440, 1920, 2560, 3440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `English at ${width}px`,
      ).toBe(true);
    }
  });

  test("lab, missing pages and cross-route section navigation are translated", async ({
    page,
  }) => {
    await page.goto("/lab");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Warsztat jest otwarty.",
    );
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Umiejętności" })
      .click();
    await expect(page).toHaveURL("/#skills");
    await expect(page.locator("#skills")).toBeInViewport();
    await page.goto("/no-such-page");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Tutaj jeszcze nic nie ma.",
    );
    await page.getByRole("link", { name: "Wróć do portfolio" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Piszę kod.",
    );
  });
});

test("unsupported browser language falls back to English", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "de-DE" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "I write code.",
  );
  await context.close();
});

test("portfolio still works when localStorage is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Polski", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
});

test("reduced-motion preference disables collage transitions without disabling interaction", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator("#collage-board a").first();
  expect(
    await card.evaluate((node) => getComputedStyle(node).transitionDuration),
  ).toBe("0s");
  const before = await page
    .locator("#collage-board")
    .getAttribute("data-layout");
  await page
    .getByRole("button", { name: /Shuffle things|Przemieszaj/ })
    .click();
  await expect(page.locator("#collage-board")).not.toHaveAttribute(
    "data-layout",
    before!,
  );
});
