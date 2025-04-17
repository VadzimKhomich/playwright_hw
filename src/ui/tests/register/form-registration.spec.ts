import test, { expect } from "@playwright/test";

test.describe("UI], [anatoly-karpovich], form registration", async () => {
  const user = {
    firstName: "Vadim",
    lastName: "Khomich",
    address: "Belarus",
    email: "example@gmail.com",
    phone: "+375291111111",
    country: "USA",
    gender: "male",
    language: "en",
    skills: "JavaScript",
    hobbies: "Travelling",
    birthDay: "30",
    birthYear: "1990",
    birthMonth: "November",
    password: "Strong123456",
  };

  test("Registration with valid data", async ({ page }) => {
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
    // text fields
    await page.locator("#firstName").fill(user.firstName);
    await page.locator("#lastName").fill(user.lastName);
    await page.locator("#address").fill(user.address);
    await page.locator("#email").fill(user.email);
    await page.locator("#phone").fill(user.phone);
    //country
    const dropdown = page.locator("#country");
    await dropdown.selectOption("USA");
    await expect(dropdown).toHaveValue("USA");
    //gender
    const genderRadioButton = page.locator("[value='male']");
    await genderRadioButton.setChecked(true);
    await expect(genderRadioButton).toBeChecked();
    //hobbies
    const travelling = page.locator("input[value='Travelling']");
    await travelling.setChecked(true);
    await expect(travelling).toBeChecked();
    //language
    await page.locator("#language").fill(user.language);
    //skills
    await page.locator("#skills").selectOption(user.skills);
    //date of birth
    const year = page.locator("#year");
    await year.selectOption("1990");
    const month = page.locator("#month");
    await month.selectOption("November");
    const day = page.locator("#day");
    await day.selectOption("30");
    await expect(year).toHaveValue("1990");
    await expect(month).toHaveValue("November");
    await expect(day).toHaveValue("30");
    //password
    await page.locator("#password").fill(user.password);
    await page.locator("#password-confirm").fill(user.password);

    await page.locator("button[type='submit']").click();
    await expect(page.locator("#fullName")).toHaveText(
      `${user.firstName} ${user.lastName}`
    );
    await expect(page.locator("#address")).toHaveText(`${user.address}`);
    await expect(page.locator("#email")).toHaveText(`${user.email}`);
    await expect(page.locator("#phone")).toHaveText(`${user.phone}`);
    await expect(page.locator("#country")).toHaveText(`${user.country}`);
    await expect(page.locator("#gender")).toHaveText(`${user.gender}`);
    await expect(page.locator("#language")).toHaveText(`${user.language}`);
    await expect(page.locator("#skills")).toHaveText(`${user.skills}`);
    await expect(page.locator("#hobbies")).toHaveText(`${user.hobbies}`);
    await expect(page.locator("#dateOfBirth")).toHaveText(`${user.birthDay} ${user.birthMonth} ${user.birthYear}`);
    await expect(page.locator("#password")).toContainText(`*`);
  });
});
