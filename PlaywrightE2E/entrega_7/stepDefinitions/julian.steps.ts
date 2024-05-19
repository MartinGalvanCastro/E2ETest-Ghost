import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld } from "../../e2e/world";
const adminPrefixUrl = "/ghost/#";

const adminSignInUrl = `${adminPrefixUrl}/signin`;
function generateLongString(length: number): string {
  return "a".repeat(length);
}

/** *****************************
 * GIVENS
 ****************************** */

/** *****************************
 * WHENS
 ****************************** */

When("Crea un nuevo post", async function (this: IPlaywrightWorld) {
  await this.page.getByTitle("New post").click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/editor/**`);
  // await this.page.locator('a[data-test-new-post-button="true"]').click();
  // await this.page.waitForURL(`${adminPrefixUrl}/editor/post`);
});

When(
  "Ingresa {string} en el campo de título",
  async function (this: IPlaywrightWorld, titulo: string) {
    await this.page.getByPlaceholder("Post title").fill(titulo);
  }
);

When(
  "Ingresa {string} en el campo del cuerpo",
  async function (this: IPlaywrightWorld, cuerpo: string) {
    const editorSelector = 'div[data-kg="editor"] [contenteditable="true"]';
    await this.page.locator(editorSelector).click(); // Hacer clic para enfocar el editor
    await this.page.locator(editorSelector).fill(""); // Limpiar el contenido existente
    await this.page.locator(editorSelector).type(cuerpo); // Ingresar el nuevo contenido
  }
);

When("Guarda el post", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: /Publish/i }).click();
  await this.page.waitForTimeout(2000);
});

/** *****************************
 * THENS
 ****************************** */
Then(
  "El post es guardado con {string}",
  async function (this: IPlaywrightWorld, resultado: string) {
    const esExitoso = resultado === "exito";
    if (esExitoso) {
      await expect(this.page.getByText("Ready, set, publish.")).toBeVisible();
    } else {
      await expect(this.page.getByText("Validation failed")).toBeVisible();
    }
  }
);
