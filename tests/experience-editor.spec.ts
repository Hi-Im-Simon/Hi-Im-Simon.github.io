import { expect, test } from "@playwright/test";

test.use({ locale: "pl-PL" });

test("README is the default, folders collapse, files open as tabs and closing the last file returns to README", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const editor = page.getByTestId("experience-editor");
  const tree = editor.getByRole("navigation", {
    name: "Przeglądaj doświadczenie",
  });
  await expect(editor.getByRole("tabpanel")).toContainText(
    "Szymon Stanisławski",
  );
  await expect(
    editor.getByRole("tab", { name: "README.md", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(tree.getByRole("button")).toHaveCount(9); // eight files and README; folders use native disclosures
  await tree
    .locator('summary').filter({ hasText: /^programowanie$/ })
    .click();
  await expect(
    tree.getByRole("button", { name: "retail-apps.md", exact: true }),
  ).not.toBeVisible();
  await tree
    .locator('summary').filter({ hasText: /^programowanie$/ })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    tree.getByRole("button", { name: "retail-apps.md", exact: true }),
  ).toBeVisible();
  await tree
    .getByRole("button", { name: "retail-apps.md", exact: true })
    .click();
  await expect(editor.getByRole("tabpanel")).toContainText(
    "największych sieci handlowych",
  );
  await editor
    .getByRole("tab", { name: "retail-apps.md", exact: true })
    .press("ArrowLeft");
  await page.keyboard.press("Enter");
  await expect(
    editor.getByRole("tab", { name: "README.md", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await editor
    .getByRole("button", { name: "Zamknij README.md", exact: true })
    .click();
  await expect(
    editor.getByRole("tab", { name: "README.md", exact: true }),
  ).toHaveCount(0);
  await editor
    .getByRole("button", { name: "Zamknij retail-apps.md", exact: true })
    .click();
  await expect(
    editor.getByRole("tab", { name: "README.md", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(editor.getByRole("tabpanel")).toContainText(
    "Szymon Stanisławski",
  );
  await expect(
    editor.getByRole("button", { name: "Zamknij README.md", exact: true }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("AI files stay concise, the example only opens in a modal, and file content follows the site language", async ({
  page,
}) => {
  await page.goto("/");
  const editor = page.getByTestId("experience-editor");
  const tree = editor.getByRole("navigation", {
    name: "Przeglądaj doświadczenie",
  });
  for (const file of [
    "task-design.md",
    "evaluation-rubrics.md",
    "model-evaluation.md",
    "evaluation-reports.md",
    "rate-and-review.md",
  ]) {
    await tree.getByRole("button", { name: file, exact: true }).click();
    await expect(
      editor.getByRole("tab", { name: file, exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByTestId("rubric-example")).toHaveCount(0);
  }
  await tree
    .getByRole("button", { name: "evaluation-rubrics.md", exact: true })
    .click();
  await editor
    .getByRole("button", { name: "Zobacz mały przykład rubryki" })
    .click();
  await expect(page.getByRole("dialog").getByRole("listitem")).toHaveCount(3);
  await expect(page.getByTestId("rubric-example")).toContainText(
    "Starsza odpowiedź",
  );
  await expect(page.getByRole("dialog").getByText("Obiektywne", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("dialog").getByText("Subiektywne", { exact: true })).toHaveCount(1);
  await expect(page.getByRole("dialog")).toContainText("Wynikające z kontekstu");
  await expect(page.getByRole("dialog")).toContainText("Lepsza odpowiedź: A");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await expect(editor.getByRole("tabpanel")).toContainText(
    "Evaluation rubrics",
  );
  await editor
    .getByRole("button", { name: "See a small rubric example" })
    .click();
  await expect(page.getByTestId("rubric-example")).toContainText(
    "An older response",
  );
  await expect(page.getByRole("dialog").getByRole("listitem")).toHaveCount(3);
  await expect(page.getByRole("dialog").getByRole("group")).toHaveCount(0);
  await expect(page.getByRole("dialog").getByText("A: Pass", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("dialog").getByText("B: Fail", { exact: true })).toHaveCount(2);
  await expect(page.getByRole("dialog")).toContainText("Better response: A");
  await page.setViewportSize({ width: 320, height: 700 });
  const dialog = page.getByRole("dialog");
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await dialog.getByRole("button", { name: "Close details", exact: true }).last().click();
  await expect(dialog).not.toBeVisible();
});

test("mobile explorer opens and closes without losing the selected file, and layouts fit both languages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const editor = page.getByTestId("experience-editor");
  const toggle = editor.getByRole("button", { name: "Pokaż lub ukryj pliki" });
  const tree = editor.getByRole("navigation", {
    name: "Przeglądaj doświadczenie",
  });
  await expect(tree).not.toBeVisible();
  await toggle.click();
  await expect(tree).toBeVisible();
  await tree
    .getByRole("button", { name: "component-library.md", exact: true })
    .click();
  await expect(tree).not.toBeVisible();
  await expect(editor.getByRole("tabpanel")).toContainText("lead developerem");
  for (const language of ["Polski", "English"]) {
    await page.getByRole("button", { name: language, exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", language === "Polski" ? "pl" : "en");
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${language}, ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await editor.getByRole("button", { name: "Show or hide files" }).click();
  await expect(
    editor.getByRole("navigation", { name: "Explore my experience" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await editor
    .getByRole("navigation", { name: "Explore my experience" })
    .getByRole("button", { name: "README.md", exact: true })
    .click();
  await expect(editor.getByRole("tabpanel")).toContainText(
    "Szymon Stanisławski",
  );
});
