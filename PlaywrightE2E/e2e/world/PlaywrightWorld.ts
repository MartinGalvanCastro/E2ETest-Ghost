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
  baseUrl:string;
  adminUser?: string;
  adminPassword?: string;
  playwrightOptions?: PlaywrightTestOptions;
  dataGenerator:Faker;
  init(): Promise<void>;
  teardown(): Promise<void>;
}

/**
 * Playwright World Class
 */
class PlaywrightWorld extends World implements IPlaywrightWorld {
  debug = false;
  baseUrl = "https://ghost-al42.onrender.com";
  browser!: Browser;
  browserContext!: BrowserContext;
  page!: Page;
  dataGenerator!:Faker;


  constructor(options: IWorldOptions) {
    super(options);
    this.dataGenerator = faker;
  }

  /**
   * Call this in a Before Hook
   */
  async init() {
    const headless = process.env.HEAD !== "1";
    this.browser = await chromium.launch({
      headless,
    });
    this.browserContext = await this.browser.newContext({
      baseURL: this.baseUrl,
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

Before(async function (this: IPlaywrightWorld) {
  await this.init();
});

After(async function (this: IPlaywrightWorld) {
  await this.teardown();
});
