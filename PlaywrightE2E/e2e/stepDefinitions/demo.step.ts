import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let calculator: any;
let result = 0;

Given("A calculator", function () {
  calculator = {
    sum(num1: number, num2: number): number {
      return num1 + num2;
    },
  };
});

When(
  "The operation performed is {int}+{int}",
  function (int: number, int2: number) {
    result = calculator.sum(int, int2);
  }
);

Then("The result is {int}", function (int) {
  expect(result).toBe(int);
});
