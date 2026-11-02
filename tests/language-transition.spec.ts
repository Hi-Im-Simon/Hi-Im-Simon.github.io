import { expect, test } from "@playwright/test";

test.use({ locale: "pl-PL" });

test("copy leaves before translation, returns in a wave and keeps surfaces and contact visible", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-01-01T08:00:00Z") });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.clock.pauseAt(new Date("2026-01-01T10:00:00Z"));
  const root = page.locator("html");
  const heading = page.locator("#hero-title");
  const contact = page.locator('header a[href="/#contact"]');
  const position = await contact.boundingBox();
  await page.getByRole("button", { name: "English", exact: true }).evaluate((button) => button.click());
  await expect(root).toHaveAttribute("data-language-phase", "leaving");
  await expect(root).toHaveAttribute("lang", "pl");
  await expect(heading).toContainText("Piszę kod.");
  expect(await heading.evaluate((element) => getComputedStyle(element).animationName)).toBe("language-copy-out");
  for (const selector of ["header", "#skills article", "#collage-board", "#work", "#contact"]) {
    expect(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  }
  await page.clock.runFor(200);
  await expect(root).toHaveAttribute("lang", "en");
  await expect(root).toHaveAttribute("data-language-phase", "entering");
  expect(await heading.evaluate((element) => getComputedStyle(element).animationName)).toBe("language-copy-in");
  expect(await heading.evaluate((element) => getComputedStyle(element).animationDelay)).toBe("0s");
  expect(await contact.locator("[data-language-text]").evaluate((element) => getComputedStyle(element).animationDelay)).toBe("0.09s");
  expect(await contact.boundingBox()).toEqual(position);
  await page.clock.runFor(560);
  await expect(root).not.toHaveAttribute("data-language-phase");
  await expect(heading).toContainText("I write code.");
  expect(await heading.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
});

test("the latest choice cancels an outgoing change and changing motion preference finishes immediately", async ({ page }) => {
  await page.goto("/");
  const root = page.locator("html");
  const english = page.getByRole("button", { name: "English", exact: true });
  const polish = page.getByRole("button", { name: "Polski", exact: true });
  await english.evaluate((button) => button.click());
  await polish.evaluate((button) => button.click());
  await expect(root).not.toHaveAttribute("data-language-phase");
  await expect(root).toHaveAttribute("lang", "pl");
  await english.evaluate((button) => button.click());
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(root).toHaveAttribute("lang", "en");
  await expect(root).not.toHaveAttribute("data-language-phase");
  await polish.click();
  await expect(root).toHaveAttribute("lang", "pl");
  await expect(root).not.toHaveAttribute("data-language-phase");
});

test("text in a portaled project modal animates without fading its surface or losing the open modal", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").getByRole("button", { name: /RNAQuANet/ }).click();
  const dialog = page.getByRole("dialog");
  await page.getByRole("button", { name: "English", exact: true, includeHidden: true }).evaluate((button) => button.click());
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  expect(await dialog.locator("h2").evaluate((element) => getComputedStyle(element).animationName)).toBe("language-copy-in");
  await expect(page.locator("html")).not.toHaveAttribute("data-language-phase");
  await expect(dialog.getByRole("link", { name: "Source code" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("resizing during the outgoing copy keeps language buttons inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "English", exact: true }).evaluate((button) => button.click());
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const samples = await page.evaluate(async () => {
    const result: boolean[] = [];
    for (let frame = 0; frame < 20; frame++) {
      await new Promise(requestAnimationFrame);
      result.push(document.documentElement.scrollWidth <= innerWidth);
    }
    return result;
  });
  expect(samples.every(Boolean)).toBe(true);
  await expect(page.locator("html")).not.toHaveAttribute("data-language-phase");
});
