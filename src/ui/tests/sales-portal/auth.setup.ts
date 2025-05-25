import { test } from "../../../fixtures/ui.services.fixture"

const authFile = "src/.auth/user.json";

test("Login to Sales Portal", async ({ page, signInUIService }) => {
  const token = await signInUIService.signInAsLocalUser();
  await page.context().addCookies([
    {
      name: "Authorization",
      value: token,
      domain: "anatoly-karpovich.github.io",
      path: "/aqa-course-project",
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
  await page.context().storageState({ path: authFile });
});