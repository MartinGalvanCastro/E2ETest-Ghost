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
});

When("Crea una nueva page", async function (this: IPlaywrightWorld) {
  await this.page.locator("[data-test-new-page-button]").click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/editor/**`);
});

When(
  "Ingresa {string} en el campo de título",
  async function (this: IPlaywrightWorld, titulo: string) {
    await this.page.getByPlaceholder("Post title").fill(titulo);
  }
);

When(
  "Ingresa {string} en el campo de título de pagina",
  async function (this: IPlaywrightWorld, titulo: string) {
    await this.page.getByPlaceholder("Page title").fill(titulo);
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

When("Guarda la page", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: /Publish/i }).click();
  await this.page.waitForTimeout(2000);
});

// Editar perfil

// Editar perfil: Nombre de usuario
When(
  "Ingresa {string} en el campo de nombre de usuario",
  async function (this: IPlaywrightWorld, nombre_usuario: string) {
    await this.page.getByLabel("Full name").fill(nombre_usuario);
    // const nombreInput = this.page.locator('input#\\:r1q\\:');
    // await nombreInput.fill(nombre_usuario);
  }
);

// Editar perfil: Email
When(
  "Ingresa {string} en el campo de email",
  async function (this: IPlaywrightWorld, email: string) {
    await this.page.getByLabel("Email").fill(email);
    // const emailInput = this.page.locator('input#\\:r1r\\:');
    // await emailInput.fill(email);
  }
);

// Guardar los cambios
When(
  "Guarda los cambios en el perfil",
  async function (this: IPlaywrightWorld) {
    await this.page.getByLabel("Slug").click();
    // await this.page.locator('button:has-text("Save")').click(); // Ajusta el selector según sea necesario
  }
);

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

Then(
  "La page es guardada con {string}",
  async function (this: IPlaywrightWorld, resultado: string) {
    const esExitoso = resultado === "exito";
    if (esExitoso) {
      await expect(this.page.getByText("Ready, set, publish.")).toBeVisible();
    } else {
      await expect(this.page.getByText("Validation failed")).toBeVisible();
    }
  }
);

// Validar resultado de nombre de usuario
Then(
  "El perfil es actualizado con {string}",
  async function (this: IPlaywrightWorld, resultado: string) {
    const textoResultado = await this.page
      .locator('span:has-text("' + resultado + '")')
      .isVisible();
    if (!textoResultado) {
      throw new Error(`El resultado esperado no fue encontrado: ${resultado}`);
    }
  }
);
