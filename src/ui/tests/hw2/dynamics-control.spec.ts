import { test, expect } from "@playwright/test";

test.describe("[UI], [Heroku], Dynamic Controls", () => {
  test("Auto waiting dynamic loading", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
    //Remove button
    const btnRemove = page.getByRole("button", { name: "Remove" });
    await expect(btnRemove).toBeVisible();
    await expect(btnRemove).toHaveText("Remove");
    //Page title
    const pageTitle = page.getByRole("heading", { name: "Dynamic Controls" });
    await expect(pageTitle).toHaveText("Dynamic Controls");
    //Page text
    const pageContent = page.getByText("This example demonstrates");
    await expect(pageContent).toHaveText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );
    //Checkbox
    const checkbox = page.getByRole("checkbox");
    await expect(checkbox).toBeVisible();
    await btnRemove.click();
    await expect(checkbox).toBeHidden();
    //Add button
    const addBtn = page.getByRole("button", { name: "Add" });
    await expect(addBtn).toBeVisible();
    //Page new text
    const pageText = page.getByText("It's gone!");
    await expect(pageText).toHaveText("It's gone!");
    //Return checkbox
    await addBtn.click();
    await expect(checkbox).toBeVisible();
    const pageTextBack = page.getByText("It's back!");
    await expect(pageTextBack).toHaveText("It's back!");
  });
});
