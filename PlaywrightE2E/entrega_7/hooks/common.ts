import { Before, After, Given, When, Then } from "@cucumber/cucumber";
import { IPlaywrightWorld } from "../../e2e/world";
const adminPrefixUrl = "/ghost/#";

Before(async function (this: IPlaywrightWorld) {
  await this.init("5.80.0");
});

After(async function (this: IPlaywrightWorld) {
  await this.teardown();
});

Given(
  "Un administrador inicia sesion",
  async function (this: IPlaywrightWorld) {
    this.adminUser = process.env.ADMIN_USER!;
    this.adminPassword = process.env.ADMIN_PASS!;
    await this.page.goto("/ghost");
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/signin`);
    await this.page.getByLabel("Email address").fill(this.adminUser);
    await this.page.getByLabel("Password").fill(this.adminPassword);
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await this.page.waitForURL(`${this.baseUrl}/ghost/#/dashboard`);
    await this.page.waitForTimeout(2 * 1000);
  }
);

Given(
  "Un usuario lector",
  async function (this: IPlaywrightWorld) {
    await this.page.goto("/");
    await this.page.waitForURL(`${this.baseUrl}`);
  }
)

When(
  "Navega al menu de {string}",
  async function (this: IPlaywrightWorld, opcion: string) {
    switch (opcion) {
      case "View site":
        await this.page.locator('a[data-test-nav="site"]').click();
        break;
      case "Explore":
        await this.page.locator('a[data-test-nav="explore"]').click();
        break;
      case "Post":
        await this.page.locator('a[data-test-nav="posts"]').click();
        break;
      case "Pages":
        await this.page.locator('a[data-test-nav="pages"]').click();
        break;
      case "Tags":
        await this.page.locator('a[data-test-nav="tags"]').click();
        break;
      case "Members":
        await this.page.locator('a[data-test-nav="members"]').click();
        break;
      case "Settings":
        await this.page.locator('a[data-test-nav="settings"]').click();
        await this.page.waitForTimeout(500);
        break;
      case "Profile":
        await this.page.locator("div.gh-user-avatar").click();
        await this.page.waitForTimeout(500);
        await this.page.locator("a[data-test-nav='user-profile']").click();
        break;
      case "Dashboard":
        await this.page.locator('a[data-test-nav="dashboard"]').click();
        break;
      default:
        throw new Error("Navegacion no reconocida");
    }
    await this.page.waitForTimeout(2 * 1000);
  }
);
