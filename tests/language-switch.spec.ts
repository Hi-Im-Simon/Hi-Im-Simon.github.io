import { expect, test } from "@playwright/test";

test.use({ locale: "pl-PL" });

test("selected language stays first, swaps follow opposite paths and contact never moves", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const header = page.locator("header");
  const group = header.getByRole("group");
  const polish = group.getByRole("button", { name: "Polski", exact: true });
  const english = group.getByRole("button", { name: "English", exact: true });
  const contact = header.locator('a[href="/#contact"]');

  await expect(group.getByRole("button").first()).toHaveAccessibleName("Polski");
  await expect(polish).toHaveAttribute("aria-pressed", "true");
  await expect(polish.locator("svg")).toBeVisible();
  const before = await contact.boundingBox();
  const arrowBefore = await contact.locator(".MuiButton-endIcon").boundingBox();
  const switchBefore = await group.boundingBox();
  await english.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(group.getByRole("button").first()).toHaveAccessibleName("English");
  await expect(english).toBeFocused();

  const paths = await group.getByRole("button").evaluateAll((buttons) =>
    buttons.map((button) => ({
      selected: button.getAttribute("aria-pressed"),
      frames: button.getAnimations().flatMap((animation) =>
        (animation.effect as KeyframeEffect).getKeyframes()
          .map((frame) => frame.transform as string)
          .filter(Boolean),
      ),
    })),
  );
  expect(paths[0].frames).toContain("translate(29px, -16px)");
  expect(paths[1].frames).toContain("translate(-29px, 16px)");
  expect(await contact.boundingBox()).toEqual(before);
  expect(await contact.locator(".MuiButton-endIcon").boundingBox()).toEqual(arrowBefore);
  expect(await group.boundingBox()).toEqual(switchBefore);
  await english.evaluate(async (button) => {
    await Promise.allSettled(button.getAnimations().map((animation) => animation.finished));
  });
  expect((await english.boundingBox())!.x).toBeLessThan((await polish.boundingBox())!.x);
  expect(await contact.boundingBox()).toEqual(before);

  await english.click();
  expect(await english.locator("svg").evaluate((icon) => icon.getAnimations().length)).toBeGreaterThan(0);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => localStorage.getItem("portfolio.language"))).toBe("en");

  for (const width of [600, 768, 900, 1024, 1440, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    const position = await contact.boundingBox();
    await polish.click();
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    expect(await contact.boundingBox()).toEqual(position);
    await english.click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(await contact.boundingBox()).toEqual(position);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.reload();
  await expect(group.getByRole("button").first()).toHaveAccessibleName("English");
});

test("reduced motion changes the language immediately and keeps keyboard order", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  const group = page.locator("header").getByRole("group");
  const english = group.getByRole("button", { name: "English", exact: true });
  await english.focus();
  await page.keyboard.press("Enter");
  await expect(english).toBeFocused();
  await expect(group.getByRole("button").first()).toHaveAccessibleName("English");
  expect(await group.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.keyboard.press("Tab");
  await expect(group.getByRole("button", { name: "Polski", exact: true })).toBeFocused();
  await english.click();
  expect(await english.locator("svg").evaluate((icon) => icon.getAnimations().length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
