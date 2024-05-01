import { expect, Page } from "@playwright/test";
import { IPlaywrightWorld } from "../world";
import { Given, When, Then } from "@cucumber/cucumber";

let browserPage: Page;

Given("A user that wants to check the blog", function (this: IPlaywrightWorld) {
  browserPage = this.page;
});

When("The user navigates to the blog page", async function () {
  //DO NOTHING
});

Then("The blog page is rendered", async function () {
  await expect(browserPage.url()).toBe("https://ghost-al42.onrender.com/");
  const title = await browserPage.getByRole("heading", {
    name: "Ghost - Grupo",
  });
  await expect(title).toBeVisible();
});
