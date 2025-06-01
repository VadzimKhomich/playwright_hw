import test, { expect } from "@playwright/test";
import { TAGS } from "data/tags/tags.data";

test.describe("[UI] [anatoly-karpovich.github.io], login ", () => {
  test("Login to anatoly-karpovich.github.io", {tag: [TAGS.REGRESSION, TAGS.SMOKE]}, async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await page.getByLabel("Email address").fill("test@gmail.com");
    await page.getByLabel("Password").fill("12345678");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForFunction(
      () => document.querySelectorAll(".spinner-border").length === 0
    );
    const user = page.getByText("Anatoly");
    await expect(user).toHaveText("Anatoly");
    const sideBar = page.locator("#sidebar");
    await expect(sideBar).toHaveScreenshot();
  });
});
