import { test, expect } from "@playwright/test";
interface IRegistrationTestData {
  testName: string;
  userName: string;
  password: string;
  message: string;
}

const registrationInvalidData: IRegistrationTestData[] = [
  {
    testName: "unable to register with data with space",
    userName: "   ",
    password: "   ",
    message: "Please, provide valid data",
  },
  {
    testName: "unable to register with short passwort",
    userName: "adsfsdfsdfkasdf",
    password: "c24",
    message: "Password should contain at least 8 characters",
  },
  {
    testName: "unable to register without password",
    userName: "adsfsdfsdfkasdf",
    password: "",
    message: "Password is required",
  },
  {
    testName:
      "unable to register with password without at least one character in lower case",
    userName: "adsfsdfsdfkasdf",
    password: "SDGSDFGDSGSDF",
    message: "Password should contain at least one character in lower case",
  },
  {
    testName: "unable to register Prefix and postfix spaces",
    userName: "   adsfsdfsdfkasdf",
    password: "sdfsdfsdf",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "unable to register with short usename",
    userName: "kk",
    password: "sdfsdfsdfDD",
    message: "Username should contain at least 3 characters",
  },
  {
    testName: "unable to register with empty usename",
    userName: "",
    password: "sdfsdfsdfDD",
    message: "Username is required",
  },
  {
    testName: "unable to register with long password",
    userName: "dsfdfgWdfddd",
    password: "fwersdfsdf345345sdfsdf4345345345",
    message: "Password can't exceed 20 characters",
  },
  {
    testName: "unable to register existing user",
    userName: "ExistentUserHere",
    password: "strongPassword",
    message: "Username is in use",
  },
  {
    testName: "unable to register with long username",
    userName: "dwefsdfsdfsfsdfsdfksdfKklsdfsfsdfsdfsdfsdfsdfodfsdfsdfshfjdsfsdfsfdsfdfsf",
    password: "strongPassword",
    message: "Username can't exceed 40 characters",
  },
];

test.describe("[UI] [anatoly-carpovich] registration with invalid data", async () => {
  registrationInvalidData.forEach(
    ({ testName, userName, password, message }) => {
      test(testName, async ({ page }) => {
        await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
        //set user in localStorage
        await page.evaluate(() => {
          localStorage.setItem(
            "ExistentUserHere",
            JSON.stringify({
              name: "ExistentUserHere",
              password: "strongPassword",
            })
          );
        });
        //change maxLength for password field
        await page.evaluate(() => {
          const passwordSelector = document.querySelector(
            "#passwordOnRegister"
          );
          if (passwordSelector) {
            passwordSelector.setAttribute("maxlength", "200");
          }
        });

        await page.locator("#registerOnLogin").click();
        await page.locator("#userNameOnRegister").fill(userName);
        await page.locator("#passwordOnRegister").fill(password);
        await page.locator("#register").click();
        await expect(page.locator("#errorMessageOnRegister")).toHaveText(
          message
        );
      });
    }
  );
});
