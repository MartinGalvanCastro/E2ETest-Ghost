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
  "Se esta usando la version {string} de Ghost",
  async function (this: IPlaywrightWorld, version: string) {
    await this.init(version);
  }
);

Given("Un usuario administrador", async function (this: IPlaywrightWorld) {
  this.adminUser = process.env.ADMIN_USER!;
  this.adminPassword = process.env.ADMIN_PASS!;
});

When("Inicia sesion", async function (this: IPlaywrightWorld) {
  if (this.isLatestVersion()) {
    await this.page.goto("/ghost");
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/signin`);
    await this.page.getByLabel("Email address").fill(this.adminUser!);
    await this.page.getByLabel("Password").fill(this.adminPassword!);
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await this.page.waitForURL(`${this.baseUrl}/ghost/#/dashboard`);
  } else {
    await this.page.goto(`${this.baseUrl}${adminPrefixUrl}/signin`);
    await this.page.getByPlaceholder("Email address").fill(this.adminUser!);
    await this.page.getByPlaceholder("Password").fill(this.adminPassword!);
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/site`);
  }
});

Then(
  "Visualiza el dashboard de administrador",
  async function (this: IPlaywrightWorld) {
    if (this.isLatestVersion()) {
      await expect(this.page).toHaveURL(
        `${this.baseUrl}${adminPrefixUrl}/dashboard`
      );
      await expect(
        this.page.getByRole("heading", { name: /Dashboard/i })
      ).toBeVisible();
    } else {
      await expect(this.page).toHaveURL(
        `${this.baseUrl}${adminPrefixUrl}/site`
      );
      await expect(this.page.locator("h1.site-title")).toBeDefined();
    }
  }
);

let esTemaClaro: boolean | undefined;
When("Cambia el tema", async function (this: IPlaywrightWorld) {
  if (this.isLatestVersion()) {
    const disabledAtributo = await this.page
      .locator("head link#dark-styles")
      .getAttribute("disabled");
    esTemaClaro = disabledAtributo !== null;
    await this.page.locator("div.nightshift-toggle").click();
    await this.page.waitForTimeout(1 * 1000);
  }
});

Then("Visualiza que el tema cambio", async function (this: IPlaywrightWorld) {
  if (this.isLatestVersion()) {
    const cambioTema = await this.page
      .locator("head link#dark-styles")
      .getAttribute("disabled");
    expect(cambioTema !== null).toBe(!esTemaClaro);
  }
});

When(
  "Navega al menu de {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    switch (contenido) {
      case "post":
        await this.page
          .getByRole("link", { name: "Posts", exact: true })
          .click();
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/posts`);
        break;
      case "page":
        await this.page.getByRole("link", { name: /Pages/i }).click();
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/pages`);
        break;
      case "etiqueta":
        await this.page
          .getByRole("link", { name: "Tags", exact: true })
          .click();
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
        break;
      case "publish":
        await this.page
          .getByRole("link", { name: "Published", exact: true })
          .click();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/posts?type=published`
        );
        break;
      case "members":
        if (this.isLatestVersion()) {
          await this.page.locator('a[data-test-nav="members"]').click();
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/members`
          );
        } else {
          await this.page.getByRole("link", { name: "Members" }).click();
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/members`
          );
        }
        break;
      case "settings":
        await this.page.click('a[href="#/settings/"]');
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/settings`);
        break;
      default:
        throw new Error(`No se reconoce el contenido ${contenido}`);
    }
  }
);

let nombreMiembro: string | undefined;
When(
  "Crea {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    switch (contenido) {
      case "un articulo":
        await this.page.getByTitle("New post").click();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/editor/**`
        );
        break;
      case "una pagina":
        await this.page.getByRole("link", { name: /New page/i }).click();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/editor/**`
        );
        break;
      case "una etiqueta":
        await this.page.waitForTimeout(4000);
        await this.page.getByRole("link", { name: "New tag" }).click();
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags/new`);
        break;
      case "un miembro":
        await this.page.getByRole("link", { name: "New member" }).click();
        nombreMiembro = this.dataGenerator.person.fullName();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/members/**`
        );
        await this.page.getByLabel("Name").fill(nombreMiembro);
        await this.page
          .getByLabel("Email")
          .fill(this.dataGenerator.internet.email());
        await this.page.getByRole("button", { name: "Save" }).click();
        await expect(this.page.getByText(/Created/i)).toBeVisible();
        break;
      default:
        throw new Error(`No se reconoce el contenido ${contenido}`);
    }
  }
);

let tituloContenido: string | undefined;
When(
  "Con titulo Prueba-{string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    const titlePlaceholder =
      contenido.charAt(0).toUpperCase() + contenido.slice(1);
    tituloContenido = `Prueba-${titlePlaceholder}`;
    await this.page
      .getByPlaceholder(`${titlePlaceholder} title`)
      .fill(tituloContenido);
    if (this.isLatestVersion()) {
      await this.page.getByText("New").click();
    } else {
      await this.page.getByText("New", { exact: true }).click();
    }

    await this.page.waitForTimeout(2 * 1000);
  }
);

When(
  "Con titulo Prueba-{string}-Members",
  async function (this: IPlaywrightWorld, contenido: string) {
    const titlePlaceholder =
      contenido.charAt(0).toUpperCase() + contenido.slice(1);
    tituloContenido = `Prueba-${titlePlaceholder}-Members`;
    await this.page
      .getByPlaceholder(`${titlePlaceholder} title`)
      .fill(tituloContenido);
    if (this.isLatestVersion()) {
      await this.page.getByText("New").click();
    } else {
      await this.page.getByText("New", { exact: true }).click();
    }
    await this.page.waitForTimeout(2 * 1000);
  }
);

When("Publica el contenido", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: /Publish/i }).click();
  if (this.isLatestVersion()) {
    await this.page
      .getByRole("button", { name: /Continue, final review/i })
      .click();
    await this.page
      .locator('button[data-test-button="confirm-publish"]')
      .click({ force: true });
  } else {
    await this.page
      .locator(
        "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
      )
      .click();
  }
});

Then(
  "Verifica que el contenido se visualiza de manera correcta",
  async function (this: IPlaywrightWorld) {
    if (this.isLatestVersion()) {
      await this.page.locator("a.gh-post-bookmark-wrapper").click();
      await expect(this.page.getByTitle(tituloContenido!)).toBeDefined();
    } else {
      await this.page.getByRole("link", { name: "View Post" }).click();
    }
  }
);

let randomTagName: string | undefined;
When("Tiene nombre aleatorio", async function (this: IPlaywrightWorld) {
  randomTagName = this.dataGenerator.lorem.words(3);
  await this.page.getByLabel("Name").fill(randomTagName);
});

When(
  "Tiene nombre de etiqueta New Tag",
  async function (this: IPlaywrightWorld) {
    let TagName = "New Tag";
    await this.page.getByLabel("Name").fill(TagName);
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("link", { name: "Tags" }).first().click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await expect(this.page.getByText("New Tag")).toBeDefined();
  }
);

Then(
  "Verifica que la etiqueta se cree correctamente",
  async function (this: IPlaywrightWorld) {
    expect(randomTagName).toBeDefined();
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("link", { name: "Tags" }).first().click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await expect(this.page.getByText(randomTagName!)).toBeDefined();
  }
);

When("Programa el contenido", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: /Publish/i }).click();
  if (this.isLatestVersion()) {
    await this.page.getByRole("button", { name: "Right now" }).click();
    await this.page.getByText("Schedule for later").click({ force: true });
  } else {
    await this.page.getByText("Schedule it for later").click({ force: true });
  }

  if (this.isLatestVersion()) {
    const timeValue = await this.page
      .locator("input[data-test-date-time-picker-time-input]")
      .inputValue();
    const [hour, minute] = timeValue.split(":").map(parseInt);
    const newTime = `${hour < 10 ? `0${hour}` : hour}:${minute}`;
    await this.page
      .locator("input[data-test-date-time-picker-time-input]")
      .fill(newTime);
    await this.page
      .getByRole("button", { name: /Continue, final review/i })
      .click();
    await this.page
      .locator('button[data-test-button="confirm-publish"]')
      .click({ force: true });
    await expect(this.page.locator("a.gh-post-bookmark-wrapper")).toBeVisible();
  } else {
    await this.page
      .getByRole("button", { name: "Schedule", exact: true })
      .click();
  }
});

When("Vuelve al dashboard", async function (this: IPlaywrightWorld) {
  await this.page.goto("/ghost");
  await this.page.waitForTimeout(2500);
});

When("seleccionar la primera página del listado de páginas", async function () {
  // Seleccionar la primera pagina del listado de paginas
  const divElement = await this.page.$(".posts-list");
  if (divElement) {
    const firstChild = await divElement.$(":first-child");
    if (firstChild) {
      await firstChild.click();
    } else {
      throw new Error("El div con clase 'posts-list' no tiene hijos");
    }
  } else {
    throw new Error("No se encontró el div con clase 'posts-list'");
  }
});

When("seleccionar el boton settings", async function () {
  // Dar clic en el botón "Settings"
  await this.page.getByRole("button", { name: "Settings" }).click();
});

When("seleccionar el desplegable de acceso a la pagina", async function () {
  // Dar clic en el select "Page access"
  // Selecciona el elemento <div> que contiene el <select> utilizando su clase
  const divElement = await this.page.waitForSelector("div.ember-view");

  // Dentro del <div>, encuentra el elemento <select> utilizando su atributo data-test-select
  const selectElement = await divElement.$(
    'select[data-test-select="post-visibility"]'
  );

  if (selectElement) {
    // Ahora puedes interactuar con el elemento <select> como desees, por ejemplo, seleccionar una opción
    await selectElement.selectOption({ value: "public" }); // Selecciona la opción con valor "public"
  } else {
    console.error("El elemento select no se encontró.");
  }
  // Ahora puedes interactuar con el elemento <select> como desees, por ejemplo, seleccionar una opción
  await selectElement.selectOption({ value: "Members only" }); // Selecciona la opción con valor "public"
});

When(
  "Asigna la etiqueta {string} al post {string}",
  async function (
    this: IPlaywrightWorld,
    etiqueta: string,
    tituloPost: string
  ) {
    // Seleccionar el ultimo post creado
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }

    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();

    // Dar clic en el select "Tags"
    const inputElement = await this.page.$(
      ".ember-power-select-trigger-multiple-input"
    );
    if (inputElement) {
      await inputElement.fill(etiqueta);
    } else {
      throw new Error(
        "No se encontró el elemento input con la clase especificada"
      );
    }

    // Dar clic en el elemento "New Tag" si existe
    // await this.page.getByRole("option", { name: etiqueta }).click();
    const newTagElements = await this.page.$$(
      'li.ember-power-select-option[role="option"]'
    );
    if (newTagElements.length > 0) {
      await newTagElements[0].click();
    } else {
      console.error('No se pudo encontrar el elemento "New Tag"');
    }

    // Oprimir la tecla "Enter" para confirmar la selección
    await this.page.keyboard.press("Enter");

    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();

    //Dar click en el boton Update
    await this.page.getByRole("button", { name: "Update" }).click();

    await this.page.waitForTimeout(6000);
  }
);

Then(
  "Visualiza que el contenido se ha programado correctamente",
  async function (this: IPlaywrightWorld) {
    let locators = await this.page.getByText(tituloContenido!).all();
    locators = locators.filter(async (locator) => {
      return await locator.getByText("Scheduled");
    });
    expect(locators.length).toBeGreaterThan(0);
  }
);

Then(
  "Verifica que el post {string} tiene la etiqueta {string}",
  async function (
    this: IPlaywrightWorld,
    tituloPost: string,
    etiqueta: string
  ) {
    // Seleccionar el ultimo post creado
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }

    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();

    // Verificar que la etiqueta se haya asignado
    const tagElement = await this.page.getByText(etiqueta);
    expect(tagElement).toBeDefined();
    await this.page.waitForTimeout(4000);
  }
);

// Validar que el post se haya publicado con la etiqueta
Then(
  "Verifica que el post {string} tiene la etiqueta {string} y esten publicados en la pagina principal",
  async function (
    this: IPlaywrightWorld,
    tituloPost: string,
    etiqueta: string
  ) {
    const postViewLink = await this.page.$(".post-view-link");
    if (postViewLink) {
      await postViewLink.click();
    } else {
      throw new Error(
        "No se encontró el elemento con la clase 'post-view-link'"
      );
    }
    await this.page.waitForTimeout(5000);

    // await this.page.goto("https://ghost-al42.onrender.com");
    // await this.page.waitForURL("https://ghost-al42.onrender.com/");
    // await expect(this.page.getByText(tituloPost)).toBeVisible();
    // await expect(this.page.getByText(etiqueta)).toBeVisible();
  }
);

When(
  "Navega a la pagina de etiquetas",
  async function (this: IPlaywrightWorld) {
    await this.page.getByRole("link", { name: "Tags" }).click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
  }
);

Then(
  "Verifica que la etiqueta {string} se haya creado",
  async function (this: IPlaywrightWorld, etiqueta: string) {
    await expect(this.page.getByText(etiqueta)).toBeDefined();
  }
);

When(
  "Edita la etiqueta {string}",
  async function (this: IPlaywrightWorld, etiqueta: string) {
    await this.page.getByText(etiqueta).click();
    await this.page.waitForURL(
      `${this.baseUrl}${adminPrefixUrl}/tags/${etiqueta}`
    );
  }
);

When(
  "Cambia el nombre de la etiqueta a {string}",
  async function (this: IPlaywrightWorld, nuevoNombre: string) {
    await this.page.getByLabel("Name").fill(nuevoNombre);
    await this.page.getByRole("button", { name: "Save" }).click();
  }
);

Then(
  "Verifica que la etiqueta {string} se haya actualizado a {string}",
  async function (
    this: IPlaywrightWorld,
    etiqueta: string,
    nuevoNombre: string
  ) {
    await expect(this.page.getByText(nuevoNombre)).toBeDefined();
  }
);

// Cerrar pestana actual abierta
When("Cierra la pestana actual", async function (this: IPlaywrightWorld) {
  const context = await this.page.context();
  const pages = await context.pages();

  if (pages.length > 1) {
    // Verificar si hay más de una página abierta
    // Cambiar el foco a la primera pestaña
    const firstPage = pages[0];
    await firstPage.bringToFront();
    await this.page.waitForTimeout(5000);
    // Cerrar la pestaña actual
    // await this.page.close();
  } else {
    //console.log(
    //  "No se puede cerrar la pestaña actual porque solo hay una página abierta."
    //);
  }
});

When(
  "Modifica el el titulo de post a {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }
    await this.page.waitForTimeout(2000);
    const titlePlaceholder =
      contenido.charAt(0).toUpperCase() + contenido.slice(1);
    tituloContenido = `${titlePlaceholder}`;
    await this.page.getByPlaceholder(`Post title`).fill(tituloContenido);
    //Dar click en el boton Update
    await this.page.getByRole("button", { name: "Update" }).click();
    await this.page.waitForTimeout(2000);
  }
);

When(
  "Elimina el post {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }
    await this.page.waitForTimeout(2000);

    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();

    await this.page.getByRole("button", { name: "Delete post" }).click();

    await this.page.click("button.gh-btn.gh-btn-red.gh-btn-icon");
    await this.page.waitForTimeout(3000);

    await this.page.reload();

    try {
      await this.page.waitForSelector("h1");
      const h1Content = await this.page.$eval("h1", (el) => el.textContent);

      if (h1Content.trim() === "404") {
        //console.log('Se encontró el encabezado h1 con el valor "404".');
      } else {
        //console.log('El encabezado h1 no tiene el valor "404".');
      }
    } catch (error) {
      //console.log("No se encontró el encabezado h1 en la página.");
    }
  }
);

When("Con acceso privado", async function (this: IPlaywrightWorld) {
  if (this.isLatestVersion()) {
    await this.page.locator("button[data-test-psm-trigger]").click();
    const dropdown = this.page.locator(
      "select[data-test-select=post-visibility]"
    );
    await dropdown.selectOption({ value: "members" });
  } else {
    await this.page.locator("button.post-settings").click();
    const dropdown = this.page.locator('select[optiontargetpath="name"]');
    await dropdown.selectOption({ value: "members" });
    await this.page.locator('button[aria-label="Close"]').click();
  }
});

Then(
  "Visualizar contenido de miembros",
  async function (this: IPlaywrightWorld) {
    await this.page.getByText("All access").click();
    await this.page.getByRole("option", { name: "Members-only", exact: true });
    if (this.isLatestVersion()) {
      await expect(
        await this.page.locator("div.posts-list.gh-list").count()
      ).toBeGreaterThanOrEqual(1);
    } else {
      await expect(
        await this.page.locator("ol.posts-list.gh-list").count()
      ).toBeGreaterThanOrEqual(1);
    }
  }
);

When("Buscar el miembro", async function (this: IPlaywrightWorld) {
  expect(nombreMiembro).toBeDefined();
  await this.page.getByText(nombreMiembro!).click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/**`);
});

Then("Editar miembro", async function (this: IPlaywrightWorld) {
  nombreMiembro = this.dataGenerator.person.fullName();
  await this.page.getByLabel("Name").fill(nombreMiembro);
  await this.page.getByRole("button", { name: "Save" }).click();
  await this.page.waitForTimeout(1 * 1000);
  await this.page.getByTitle(nombreMiembro);
});

Then(
  "Visualiza que el miembro se edito correctamente",
  async function (this: IPlaywrightWorld) {
    expect(nombreMiembro).toBeDefined();
    await expect(this.page.getByTitle(nombreMiembro!)).toBeDefined();
  }
);

Then("Eliminar miembro", async function (this: IPlaywrightWorld) {
  await this.page.locator('button[data-test-button="member-actions"]').click();
  await this.page.locator('button[data-test-button="delete-member"]').click();
  await this.page.locator('button[data-test-button="confirm"]').click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members`);
});

Then(
  "Visualiza que el miembro se elimino",
  async function (this: IPlaywrightWorld) {
    expect(nombreMiembro).toBeDefined();
    await expect(this.page.getByText(nombreMiembro!)).not.toBeVisible();
  }
);

let newsLetterDesactivado: boolean | undefined;
When(
  "Crea un miembro con newsletters desactivado",
  async function (this: IPlaywrightWorld) {
    await this.page.getByRole("link", { name: "New member" }).click();
    nombreMiembro = this.dataGenerator.person.fullName();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/**`);
    await this.page.getByLabel("Name").fill(nombreMiembro);
    await this.page
      .getByLabel("Email")
      .fill(this.dataGenerator.internet.email());
    await this.page.locator("div.for-switch").click({ force: true });
    await this.page.getByRole("button", { name: "Save" }).click();
    newsLetterDesactivado = true;
    await expect(this.page.getByText(/Created/i)).toBeVisible();
  }
);

Then(
  "Visualiza que el miembro se creo correctamente",
  async function (this: IPlaywrightWorld) {
    expect(nombreMiembro).toBeDefined();
    if (this.isLatestVersion()) {
      await expect(this.page.locator("h2[data-test-screen-title]")).toHaveText(
        nombreMiembro!
      );
      if (newsLetterDesactivado) {
        await expect(
          this.page.locator('input[data-test-checkbox="member-subscribed"]')
        ).not.toBeChecked();
      }
    } else {
      await expect(
        this.page.getByRole("heading", { name: nombreMiembro! }).first()
      ).toBeVisible();
    }
  }
);

When("Edita metadata de la pagina", async function (this: IPlaywrightWorld) {
  await this.page.click(
    "div.flex.items-start.justify-between.gap-4 button.cursor-pointer"
  );
  await this.page.waitForTimeout(1000);
  // Selecciona todo el texto existente en el campo de entrada y presiona la tecla "Backspace" para borrarlo
  await this.page.keyboard.press("Control+A");
  await this.page.keyboard.press("Backspace");
  await this.page.waitForTimeout(1000);
  await this.page.keyboard.type("NewMetaData");
  await this.page.waitForTimeout(1000);
  console.log("Metadata de la página modificada");

  await this.page.getByRole("button", { name: "save" }).click();
  //await this.page.click('button:has(span:has-text("Save"))');
  // await this.page.waitForTimeout(6000);
});

Then(
  "Valida que se haya modificado la metadata de la página",
  async function (this: IPlaywrightWorld) {
    await this.page.click(
      "div.flex.items-start.justify-between.gap-4 button.cursor-pointer"
    );
    // Verifica si el texto "NewMetaData" está presente en la página actual
    const isMetadataModified = await this.page.waitForSelector(
      "text=NewMetaData"
    );

    // Verifica si el texto "NewMetaData" está presente
    expect(isMetadataModified).not.toBeNull();
  }
);

Then(
  "tomar una captura de pantalla con nombre {string} y guardarla en {string}",
  async function (this: IPlaywrightWorld, imageName: string, folder: string) {
    const screenshotPath = `./screenshots/${folder}/screenshot-${Date.now()}-${imageName}.png`;
    if (!fs.existsSync(`./screenshots/${folder}`)) {
      fs.mkdirSync(`./screenshots/${folder}`, { recursive: true });
    }
    await this.page.screenshot({ path: screenshotPath });
  }
);

When("Esperar {string}", async (tiempo: string) => {
  const tiempoEnMilisegundos = parseInt(tiempo);
  await new Promise((resolve) => setTimeout(resolve, tiempoEnMilisegundos));
});

When("Navega a la seccion principal", async function (this: IPlaywrightWorld) {
  this.page.goto(`${adminPrefixUrl}`);
});

After(() => {
  esTemaClaro = undefined;
  tituloContenido = undefined;
  randomTagName = undefined;
  nombreMiembro = undefined;
  newsLetterDesactivado = undefined;
});
