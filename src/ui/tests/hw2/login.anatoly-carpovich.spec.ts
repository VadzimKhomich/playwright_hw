import test, { expect } from "@playwright/test";

test.describe("[UI] [anatoly-karpovich.github.io], login ", () => {
  test("Login to anatoly-karpovich.github.io", async ({ page }) => {
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
