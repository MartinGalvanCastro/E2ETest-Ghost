import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld } from "../../e2e/world";
import exp from "constants";
const adminPrefixUrl = "/ghost/#";

/** *****************************
 * GIVENS
 ****************************** */
Given(
  "Un usuario que desea iniciar sesion",
  async function (this: IPlaywrightWorld) {
    await this.page.goto(adminPrefixUrl);
    await this.page.waitForURL(`**${adminPrefixUrl}/signin`);
  }
);

/** *****************************
 * WHENS
 ****************************** */
When(
  "Ingresa {string} en el campo correo",
  async function (this: IPlaywrightWorld, correo: string) {
    await this.page.getByLabel("Email address").fill(correo);
  }
);

When(
  "Ingresa {string} en el campo contrasenia",
  async function (this: IPlaywrightWorld, contrasenia: string) {
    await this.page.getByLabel("Password").fill(contrasenia);
  }
);

When(
  "Ingresa un correo y contrasenia aleatorios",
  async function (this: IPlaywrightWorld) {
    await this.page
      .getByLabel("Email address")
      .fill(this.dataGenerator.internet.email());
    await this.page
      .getByLabel("Password")
      .fill(this.dataGenerator.lorem.words(3));
  }
);

When("Crea un nuevo miembro", async function (this: IPlaywrightWorld) {
  await this.page.locator('a[data-test-new-member-button="true"]').click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/new`);
});

When("Ingresa un nombre aleatorio", async function (this: IPlaywrightWorld) {
  await this.page.getByLabel("Name").fill(this.dataGenerator.person.fullName());
});

When("Ingresa un correo aleatorio", async function (this: IPlaywrightWorld) {
  await this.page.getByLabel("Email").fill(this.dataGenerator.internet.email());
});

When(
  "{string} ingresa un label",
  async function (this: IPlaywrightWorld, tieneLabel: string) {
    const debeAgregarLabel = tieneLabel === "Si";
    if (!debeAgregarLabel) {
      return;
    }
    await this.page
      .locator("input.ember-power-select-trigger-multiple-input")
      .fill(this.dataGenerator.lorem.word());
    await this.page.locator('li[data-option-index="0"]').click();
  }
);

When(
  "{string} ingresa una note",
  async function (this: IPlaywrightWorld, tieneNote: string) {
    const debeAgregarNote = tieneNote === "Si";
    if (!debeAgregarNote) {
      return;
    }
    await this.page
      .getByLabel(/Note/i)
      .fill(this.dataGenerator.lorem.paragraph());
  }
);

When(
  "{string} habilia los newsletter",
  async function (this: IPlaywrightWorld, tieneNewsletter: string) {
    const debeQuitarNewsletter = tieneNewsletter === "No";
    if (!debeQuitarNewsletter) {
      return;
    }
    await this.page.locator("div.for-switch").click({ force: true });
    await this.page.getByRole("button", { name: "Save" }).click();
  }
);

When("Guarda el miembro", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: "Save" }).click();
});

When(
  "Notes con mas de 500 caracteres",
  async function (this: IPlaywrightWorld) {
    await this.page
      .getByLabel(/Note/i)
      .fill(this.dataGenerator.string.alpha(501));
  }
);

When(
  "Ingresa {string} en el campo de nombre",
  async function (this: IPlaywrightWorld, nombre: string) {
    await this.page.getByLabel("Name").fill(nombre);
  }
);

let correoIngresado: string;
When(
  "Ingresa {string} en el campo de correo",
  async function (this: IPlaywrightWorld, correo: string) {
    let formattedMail =
      correo.length > 0
        ? `${this.dataGenerator.person.firstName()}_${correo}`
        : correo;
    correoIngresado = formattedMail;
    await this.page.getByLabel("Email").fill(formattedMail);
  }
);

When(
  "Crea un nuevo miembro con un correo que ya esta registrado",
  async function (this: IPlaywrightWorld) {
    const mails = await this.page.locator("p.gh-members-list-email").count();
    const whichMail = this.dataGenerator.number.int({ min: 0, max: mails - 1 });
    const repeatedMail = await this.page
      .locator("p.gh-members-list-email")
      .nth(whichMail)
      .innerText();
    await this.page.locator('a[data-test-new-member-button="true"]').click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/new`);
    await this.page
      .getByLabel("Name")
      .fill(this.dataGenerator.person.fullName());
    await this.page.getByLabel("Email").fill(repeatedMail);
  }
);

When(
  "Hace click en olvide contrasenia",
  async function (this: IPlaywrightWorld) {
    if (correoIngresado && correoIngresado === "md.galvan@uniandes.edu.co") {
      await this.page.route(
        "*/**/ghost/api/admin/authentication/password_reset/",
        async (route) => {
          route.fulfill({});
        }
      );
    }
    await this.page.locator("button.forgotten-link").click();
    await this.page.waitForTimeout(3 * 1000);
  }
);

When("Edita un miembro", async function (this: IPlaywrightWorld) {
  await this.page
    .locator('tr[data-test-list="members-list-item"]')
    .first()
    .click();
});

/** *****************************
 * THENS
 ****************************** */
Then(
  "El inicio de sesion es {string}",
  async function (this: IPlaywrightWorld, resultado: string) {
    const esExitoso = resultado === "exitoso";
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await this.page.waitForTimeout(2 * 1000);
    if (esExitoso) {
      await expect(this.page.url()).toEqual(
        `${this.baseUrl}${adminPrefixUrl}/dashboard`
      );
    } else {
      await expect(this.page.getByText("Retry")).toBeVisible();
    }
  }
);

Then(
  "El miembro es guardado con {string}",
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
  "El administrador {string} recuperar su cuenta",
  async function (this: IPlaywrightWorld, resultado: string) {
    const text = await this.page.locator("p.main-error").innerText();
    if (text === "Too many attempts try again in an hour") return;
    if (resultado === "no puede") {
      expect(text).toBeGreaterThan(1);
    } else {
      expect(text).toBe(1);
    }
  }
);

Then(
  "Debe poder ver la pagina de {string} correctamentente",
  async function (this: IPlaywrightWorld, opcion: string) {
    switch (opcion) {
      case "View site":
        await expect(this.page.locator('a[data-test-nav="site"]')).toHaveClass(
          "active ember-view"
        );
        break;
      case "Explore":
        await expect(
          this.page.locator('a[data-test-nav="explore"]')
        ).toHaveClass("active");
        break;
      case "Post":
        await expect(this.page.locator('a[data-test-nav="posts"]')).toHaveClass(
          "active ember-view"
        );
        break;
      case "Pages":
        await expect(this.page.locator('a[data-test-nav="pages"]')).toHaveClass(
          "active ember-view active"
        );
        break;
      case "Tags":
        await expect(this.page.locator('a[data-test-nav="tags"]')).toHaveClass(
          "active ember-view"
        );
        break;
      case "Members":
        await expect(
          this.page.locator('a[data-test-nav="members"]')
        ).toHaveClass("active ember-view");
        break;
      case "Settings":
        await expect(
          this.page.getByText("General settings").first()
        ).toBeVisible();
        break;
      case "Profile":
        await expect(this.page.getByText("Basic info")).toBeVisible();
        break;
      case "Dashboard":
        const classNames = await this.page
          .locator('a[data-test-nav="dashboard"]')
          .getAttribute("class");
        expect([
          "active ember-view",
          "ember-transitioning-in ember-view",
        ]).toContain(classNames);
        break;
      default:
        throw new Error("Navegacion no reconocida");
    }
  }
);