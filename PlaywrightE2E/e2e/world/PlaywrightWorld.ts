import type { IWorldOptions } from "@cucumber/cucumber";
import {
  setWorldConstructor,
  World,
  setDefaultTimeout,
  Before,
  After,
} from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import type {
  Browser,
  BrowserContext,
  Page,
  PlaywrightTestOptions,
} from "@playwright/test";
import "dotenv/config";
import { fa, Faker, faker } from "@faker-js/faker";

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

/**
 * Playwright World Interface
 */
export interface IPlaywrightWorld extends World {
  page: Page;
  urls: Record<string, string>;
  adminUser?: string;
  adminPassword?: string;
  playwrightOptions?: PlaywrightTestOptions;
  dataGenerator: Faker;
  init(url: string): Promise<void>;
  teardown(): Promise<void>;
}

/**
 * Playwright World Class
 */
class PlaywrightWorld extends World implements IPlaywrightWorld {
  debug = false;
  urls: Record<string, string> = {
    "5.80.0": "https://ghost-al42.onrender.com",
    "3.42.0": "https://ghost-al342.onrender.com",
  };
  browser!: Browser;
  browserContext!: BrowserContext;
  page!: Page;
  dataGenerator!: Faker;

  constructor(options: IWorldOptions) {
    super(options);
    this.dataGenerator = faker;
  }

  /**
   * Call this in a Before Hook
   */
  async init(version: string) {
    const url = this.urls[version];
    if (!url) {
      throw new Error(`URL not found for version: ${version}`);
    }
    const headless = process.env.HEAD !== "1";
    this.browser = await chromium.launch({
      headless,
    });
    this.browserContext = await this.browser.newContext({
      baseURL: url,
    });
    this.page = await this.browserContext.newPage();
    await this.page.goto("");
    await this.page.waitForURL(this.baseUrl);
  }

  /**
   * Call this in a After Hook
   */
  async teardown() {
    this.page.close();
    this.browserContext.close();
    this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
setDefaultTimeout(10000);

After(async function (this: IPlaywrightWorld) {
  await this.teardown();
});
