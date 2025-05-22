import { Page } from "@playwright/test";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { getUser } from "data/user.data";
import { HomePage } from "ui/pages/home-page";
import { LoginPage } from "ui/pages/login-page";

export class SignInUIService {
  private signInPage: LoginPage;
  private homePage: HomePage;

  constructor(private page: Page) {
    this.signInPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }

  async signInAsLocalUser() {
    await this.signInPage.goToSalesPortal();
    const user = getUser();
    await this.signInPage.fillCredentials(user);
    await this.signInPage.clickLoginBtn();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}
