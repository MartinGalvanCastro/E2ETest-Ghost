import {
  Given,
  When,
  Then,
  After,
  Before,
  ITestCaseHookParameter,
} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld } from "../world";
import fs from "fs";
const adminPrefixUrl = "/ghost/#";

let scenarioName: string;
Before(function ({ pickle }: ITestCaseHookParameter) {
  scenarioName = pickle.name;
});

Given(
  "Given Se esta usando la version 3.42.0 de Ghost",
  async function (this: IPlaywrightWorld) {
    this.init("3.42.0");
  }
);
