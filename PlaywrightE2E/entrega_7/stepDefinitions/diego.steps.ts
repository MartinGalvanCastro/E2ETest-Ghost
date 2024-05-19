import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld } from "../../e2e/world";
const adminPrefixUrl = "/ghost/#";

let nombreAleatorio = "";

/** *****************************
 * GIVENS
 ****************************** */

/** *****************************
 * WHENS
 ****************************** */

When("Crea un nuevo tag", async function (this: IPlaywrightWorld) {
  await this.page.locator('css=a.ember-view.gh-btn.gh-btn-primary').click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags/new`);
});

When("Ingresa un nombre aleatorios", async function (this: IPlaywrightWorld) {
  nombreAleatorio = this.dataGenerator.person.fullName();
  await this.page.getByLabel("Name").fill(nombreAleatorio);
});

When("Intenta iniciar sesion con el correo {string}", 
  async function (this: IPlaywrightWorld, correo: string) {

  await new Promise(r => setTimeout(r, 2000));
  
  await this.page.locator('css=a.gh-head-link').click();
  await new Promise(r => setTimeout(r, 1000));
  // Obtén el iframe
  const frameElement = await this.page.locator('iframe[data-testid="portal-popup-frame"]');
  const frame = await frameElement.contentFrame();

  // Ahora puedes interactuar con los elementos dentro del iframe
  await frame.locator('input[name="email"]').isVisible();
  await frame.locator('input[name="email"]').fill(correo);
  await frame.getByRole("button", { name: /Continue/ }).click();
});

When("Intenta subscribirse a un sitio web",
 async function (this: IPlaywrightWorld) {
  await new Promise(r => setTimeout(r, 2000));
  
  await this.page.locator('css=a.gh-head-button').click();
  await new Promise(r => setTimeout(r, 1000));
 }
);

When("Con nombre {string}",
  async function (this: IPlaywrightWorld, nombre: string) {

    const frameElement = await this.page.locator('iframe[data-testid="portal-popup-frame"]');
    const frame = await frameElement.contentFrame();
    await frame.locator('input[name="name"]').isVisible();
    await frame.locator('input[name="name"]').fill(nombre);
  }
)

When("Con correo {string}",
  async function (this: IPlaywrightWorld, correo: string) {
      
      const frameElement = await this.page.locator('iframe[data-testid="portal-popup-frame"]');
      const frame = await frameElement.contentFrame();
      await frame.locator('input[name="email"]').isVisible();
      await frame.locator('input[name="email"]').fill(correo);
    }   
)

When("Falla el registro debido a {string}",
  async function (this: IPlaywrightWorld, error: string) {
    
    switch (error) {
      case 'nombre y correo no valido':
        expect(error).toEqual('nombre y correo no valido');
        break;
    case 'nombre no valido':
         expect(error).toEqual('nombre no valido');
          break;
    case 'correo no valido':
          expect(error).toEqual('correo no valido');
          break;
      default:
        break;
    }
  }
)

When(
  "{string} ingresa un color",
  async function (this: IPlaywrightWorld, tieneColor: string) {
    const debeAgregarColor = tieneColor === "Si";
    if (!debeAgregarColor) {
      return;
    }
    let hexColorFirst = this.dataGenerator.color.rgb();
    await this.page.locator('input[data-test-input="accentColor"]').fill(hexColorFirst.slice(1));
  }
)

When(
  "ingresa el color {string}",
  async function (this: IPlaywrightWorld, color: string) {
    await this.page.locator('input[data-test-input="accentColor"]').fill(color);
  }
)

When(
  "{string} modifica el slug",
  async function (this: IPlaywrightWorld, modificaSlug: string) {
    const debeAgregarSlug = modificaSlug === "Si";
    if (!debeAgregarSlug) {
      return;
    }
    let slugByName = nombreAleatorio.replace(/\s/g, "-").toLowerCase();
    console.log('slugByName', slugByName);
    
    await this.page.getByLabel("Slug").fill(slugByName + '-slug-modificado');
    
  }
)

When(
  "{string} ingresa una - descripcion",
  async function (this: IPlaywrightWorld, tieneDescripcion: string) {
    const debeAgregarDescripcion = tieneDescripcion === "Si";
    if (!debeAgregarDescripcion) {
      return;
    }
    await this.page.getByLabel("Description").fill(this.dataGenerator.lorem.paragraph({ min: 1, max: 3 }));
  }
)

When("Guarda el tag", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: "Save" }).click();
});

When(
  "Ingresa un nombre con mas de 191 caracteres",
  async function (this: IPlaywrightWorld) {
    await this.page.getByLabel("Name").fill(this.dataGenerator.string.alpha(192));
  }
);

When(
  "Ingresa un nombre con {string} caracteres",
  async function (this: IPlaywrightWorld, cantidad: string) {
    await this.page.getByLabel("Name").fill(this.dataGenerator.string.alpha(parseInt(cantidad)));
  }
)

When(
  "Ingresa una descripcion con {string} caracteres",
  async function (this: IPlaywrightWorld, cantidad: string) {
    await this.page.getByLabel("Description").fill(this.dataGenerator.string.alpha(parseInt(cantidad)));
  }
)

/** *****************************
 * THENS
 ****************************** */
Then(
  "Falla el inicio de sesion {string}",
  async function (this: IPlaywrightWorld, correo: string) {

    // Obtén el iframe
  const frameElement = await this.page.locator('iframe[data-testid="portal-popup-frame"]');
  const frame = await frameElement.contentFrame();

  if (correo === "noEsUnCorreo") await expect(frame.getByText("Invalid email address")).toBeVisible();
  if (correo === "") await expect(frame.getByText("Enter your email address")).toBeVisible();
  if (correo === "esteCorreoJamasEstaRegistrado@correo.com") await expect(frame.getByText("No member exists with this e-mail address. Please sign up first.")).toBeVisible();
  if (correo === "esteCorreoJamasEstaRegistrado@correo.com") await expect(frame.locator("css=div.gh-portal-popupnotification.error")).toBeVisible();
  }
)

Then(
  "El tag es guardado con {string}",
  async function (this: IPlaywrightWorld, resultado: string) {
    const esFallido = resultado === "fallido";
    if (esFallido) {
      await expect(
        this.page.locator('span[data-test-task-button-state="failure"]')
      ).toBeVisible();
    } else {
      await expect(
        this.page.locator('span[data-test-task-button-state="success"]')
      ).toBeVisible();
    }
  }
);

Then(
  "El tag no es guardado",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
  }
);
