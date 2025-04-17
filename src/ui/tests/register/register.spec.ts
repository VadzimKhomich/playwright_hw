import test, { expect } from "@playwright/test";

test.describe("[UI] [anatoly-karpovich] Registration", () => {
  const validCredentials = {
    userName: "vadim Khomich",
    password: "strongPassword1234"
  }

  const validCredentialsMinLenght = {
    userName: "vad",
    password: "strongtY"
  }

  const validCredentialsMaxLenght = {
    userName: "flbtpurodzwipemmdekbnhlcrlreisycmwdbliar",
    password: "Eduvgkmjfytxfspvbwle"
  }

  test.beforeEach(async ({page}) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/")
    await page.locator("#registerOnLogin").click()
  })

  test.afterEach(async ({page}) => {
    await page.locator("#register").click()
    const notification = page.locator("#errorMessageOnRegister")
    await expect(notification).toHaveText("Successfully registered! Please, click Back to return on login page")
  })

  test("Registration with valid credentials", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(validCredentials.userName)
    await page.locator("#passwordOnRegister").fill(validCredentials.password)
  });

  test("Registration with minimum length valid credentials", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(validCredentialsMinLenght.userName)
    await page.locator("#passwordOnRegister").fill(validCredentialsMinLenght.password)
  });

  test("Registration with maximum length valid credentials", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(validCredentialsMaxLenght.userName)
    await page.locator("#passwordOnRegister").fill(validCredentialsMaxLenght.password)
  });
});
