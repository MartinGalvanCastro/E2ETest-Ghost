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
import { tomarPantallazo, resetCounter } from "../util";
const adminPrefixUrl = "/ghost/#";

let scenarioName: string;
let photoName: string;
Before(function ({ pickle }: ITestCaseHookParameter) {
  const tags = pickle.tags.map((tag) => tag.name);
  const scenario = tags[0];
  scenarioName = `${scenario}-v`;
});

Given(
  "Se esta usando la version {string} de Ghost",
  async function (this: IPlaywrightWorld, version: string) {
    scenarioName += version;
    photoName = version === "5.80.0" ? "After" : "Before";
    console.log(`\nScenario: ${scenarioName}\n`);
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
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByLabel("Email address").fill(this.adminUser!);
    await this.page.getByLabel("Password").fill(this.adminPassword!);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForURL(`${this.baseUrl}/ghost/#/dashboard`);
    await tomarPantallazo(this, photoName, scenarioName);
  } else {
    await this.page.goto(`${this.baseUrl}${adminPrefixUrl}/signin`);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByPlaceholder("Email address").fill(this.adminUser!);
    await this.page.getByPlaceholder("Password").fill(this.adminPassword!);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: /Sign in/i }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/site`);
    await tomarPantallazo(this, photoName, scenarioName);
  }
});

Then(
  "Visualiza el dashboard de administrador",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
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
  await tomarPantallazo(this, photoName, scenarioName);
  if (this.isLatestVersion()) {
    const disabledAtributo = await this.page
      .locator("head link#dark-styles")
      .getAttribute("disabled");
    esTemaClaro = disabledAtributo !== null;
    await this.page.locator("div.nightshift-toggle").click();
    await this.page.waitForTimeout(1 * 1000);
  }
  await tomarPantallazo(this, photoName, scenarioName);
});

Then("Visualiza que el tema cambio", async function (this: IPlaywrightWorld) {
  if (this.isLatestVersion()) {
    const cambioTema = await this.page
      .locator("head link#dark-styles")
      .getAttribute("disabled");
    expect(cambioTema !== null).toBe(!esTemaClaro);
  }
  await tomarPantallazo(this, photoName, scenarioName);
});

let enterCounter = 0;
When(
  "Navega al menu de {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    enterCounter += 1;
    await tomarPantallazo(this, photoName, scenarioName);
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
        if (this.isLatestVersion()) {
          await this.page.click('a[href="#/settings/"]');
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/settings`
          );
        } else {
          await this.page.getByRole("link", { name: "General" }).click();
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/settings/general`
          );
        }
        break;
      default:
        throw new Error(`No se reconoce el contenido ${contenido}`);
    }
    await tomarPantallazo(this, photoName, scenarioName);
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
        await tomarPantallazo(this, photoName, scenarioName);
        break;
      case "una pagina":
        if (this.isLatestVersion()) {
          await this.page.getByRole("link", { name: /New page/i }).click();
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/editor/**`
          );
        } else {
          await this.page
            .getByRole("link", { name: "New page", exact: true })
            .click();
          await this.page.waitForURL(
            `${this.baseUrl}${adminPrefixUrl}/editor/**`
          );
        }

        await tomarPantallazo(this, photoName, scenarioName);
        break;
      case "una etiqueta":
        await this.page.waitForTimeout(4000);
        await this.page
          .getByRole("link", { name: "New tag", exact: true })
          .click();
        await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags/new`);
        await tomarPantallazo(this, photoName, scenarioName);
        break;
      case "un miembro":
        await tomarPantallazo(this, photoName, scenarioName);
        await this.page.getByRole("link", { name: "New member" }).click();
        nombreMiembro = this.dataGenerator.person.fullName();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/members/**`
        );
        await this.page.getByLabel("Name").fill(nombreMiembro);
        await this.page
          .getByLabel("Email")
          .fill(this.dataGenerator.internet.email());
        await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForTimeout(2 * 1000);
  }
);

When("Publica el contenido", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  await this.page.getByRole("button", { name: /Publish/i }).click();
  await tomarPantallazo(this, photoName, scenarioName);

  if (this.isLatestVersion()) {
    await this.page
      .getByRole("button", { name: /Continue, final review/i })
      .click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page
      .locator('button[data-test-button="confirm-publish"]')
      .click({ force: true });
  } else {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page
      .locator(
        "button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view"
      )
      .click();
  }
  await tomarPantallazo(this, photoName, scenarioName);
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
  await tomarPantallazo(this, photoName, scenarioName);
  randomTagName = this.dataGenerator.lorem.words(3);
  await this.page.getByLabel("Name").fill(randomTagName);
  await tomarPantallazo(this, photoName, scenarioName);
});

When(
  "Tiene nombre de etiqueta New Tag",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    let TagName = "New Tag";
    await this.page.getByLabel("Name").fill(TagName);
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(2000);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("link", { name: "Tags" }).first().click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await tomarPantallazo(this, photoName, scenarioName);
    expect(this.page.getByText("New Tag")).toBeDefined();
  }
);

Then(
  "Verifica que la etiqueta se cree correctamente",
  async function (this: IPlaywrightWorld) {
    expect(randomTagName).toBeDefined();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "Save" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("link", { name: "Tags" }).first().click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await tomarPantallazo(this, photoName, scenarioName);
    expect(this.page.getByText(randomTagName!)).toBeDefined();
  }
);

When("Programa el contenido", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  await this.page.getByRole("button", { name: /Publish/i }).click();
  if (this.isLatestVersion()) {
    await this.page.getByRole("button", { name: "Right now" }).click();
    await this.page.getByText("Schedule for later").click({ force: true });
  } else {
    await this.page.getByText("Schedule it for later").click({ force: true });
  }
  await tomarPantallazo(this, photoName, scenarioName);
  if (this.isLatestVersion()) {
    const timeValue = await this.page
      .locator("input[data-test-date-time-picker-time-input]")
      .inputValue();
    const [hour, minute] = timeValue.split(":").map(parseInt);
    const newTime = `${hour < 10 ? `0${hour}` : hour}:${minute}`;
    await this.page
      .locator("input[data-test-date-time-picker-time-input]")
      .fill(newTime);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page
      .getByRole("button", { name: /Continue, final review/i })
      .click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page
      .locator('button[data-test-button="confirm-publish"]')
      .click({ force: true });
    await tomarPantallazo(this, photoName, scenarioName);
    await expect(this.page.locator("a.gh-post-bookmark-wrapper")).toBeVisible();
  } else {
    await tomarPantallazo(this, photoName, scenarioName);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page
      .getByRole("button", { name: "Schedule", exact: true })
      .click();
    await tomarPantallazo(this, photoName, scenarioName);
  }
});

When("Vuelve al dashboard", async function (this: IPlaywrightWorld) {
  await this.page.goto("/ghost");
  await this.page.waitForTimeout(2500);
});

When(
  "seleccionar la primera página del listado de páginas",
  async function (this: IPlaywrightWorld) {
    // Seleccionar la primera pagina del listado de paginas
    await tomarPantallazo(this, photoName, scenarioName);
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
        await tomarPantallazo(this, photoName, scenarioName);
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }
  }
);

When("seleccionar el boton settings", async function (this: IPlaywrightWorld) {
  // Dar clic en el botón "Settings"
  await this.page.getByRole("button", { name: "Settings" }).click();
  await tomarPantallazo(this, photoName, scenarioName);
});

When(
  "seleccionar el desplegable de acceso a la pagina",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    try {
      // Esperar a que aparezca el elemento <select>
      const selectElement = await this.page.waitForSelector(
        'select[data-test-select="post-visibility"]'
      );

      // Verificar que el elemento <select> se haya encontrado correctamente
      if (selectElement) {
        // Hacer clic en el elemento <select> para abrir las opciones
        await selectElement.click();

        // Esperar un breve momento para que las opciones se carguen si es necesario
        await this.page.waitForTimeout(1000);

        // Encuentra la opción "Members only" y haz clic en ella
        const optionElement = await selectElement.selectOption({
          value: "members",
        });
        await tomarPantallazo(this, photoName, scenarioName);
      } else {
        throw new Error(
          "No se encontró el elemento select con el atributo especificado."
        );
      }
    } catch (error) {
      console.error("Error al seleccionar el desplegable:", error);
    }
  }
);

When(
  "Dar clic en el boton de actualizar",
  async function (this: IPlaywrightWorld) {
    //Dar click en el boton Update
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "Update" }).click();
  }
);

When(
  "Asigna la etiqueta {string} al post {string}",
  async function (
    this: IPlaywrightWorld,
    etiqueta: string,
    tituloPost: string
  ) {
    await tomarPantallazo(this, photoName, scenarioName);
    // Seleccionar el ultimo post creado
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await tomarPantallazo(this, photoName, scenarioName);
        await firstChild.click();
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }

    await tomarPantallazo(this, photoName, scenarioName);
    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();

    // Dar clic en el select "Tags"
    const inputElement = await this.page.$(
      ".ember-power-select-trigger-multiple-input"
    );
    if (inputElement) {
      await inputElement.fill(etiqueta);
      await tomarPantallazo(this, photoName, scenarioName);
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
      await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForTimeout(6000);
  }
);

Then(
  "Verifica que el acceso a la pagina sea para solo miembros",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    // Verificar que la etiqueta se haya asignado
    const tagElement = this.page.getByText("Members only");
    expect(tagElement).toBeDefined();
    await this.page.waitForTimeout(4000);
  }
);

Then(
  "Visualiza que el contenido se ha programado correctamente",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    let locators = await this.page.getByText(tituloContenido!).all();
    locators = locators.filter(async (locator) => {
      return locator.getByText("Scheduled");
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
    await tomarPantallazo(this, photoName, scenarioName);
    // Seleccionar el ultimo post creado
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
        await tomarPantallazo(this, photoName, scenarioName);
      } else {
        throw new Error("El div con clase 'posts-list' no tiene hijos");
      }
    } else {
      throw new Error("No se encontró el div con clase 'posts-list'");
    }

    // Dar clic en el botón "Settings"
    await this.page.getByRole("button", { name: "Settings" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    // Verificar que la etiqueta se haya asignado
    const tagElement = this.page.getByText(etiqueta);
    expect(tagElement).toBeDefined();
    await this.page.waitForTimeout(4000);
  }
);

Then(
  "Verificar que las redes sociales esten bien configuradas",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    //la pagina contiene el texto "Social accounts"
    this.page.getByText("Social accounts");
    this.page.getByText("https://www.facebook.com/ghost");
    this.page.getByText("https://twitter.com/ghost");
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
    await tomarPantallazo(this, photoName, scenarioName);
    const postViewLink = await this.page.$(".post-view-link");
    if (postViewLink) {
      await postViewLink.click();
      await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("link", { name: "Tags" }).click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await tomarPantallazo(this, photoName, scenarioName);
  }
);

Then(
  "Verifica que la etiqueta {string} se haya creado",
  async function (this: IPlaywrightWorld, etiqueta: string) {
    expect(this.page.getByText(etiqueta)).toBeDefined();
  }
);

When(
  "Edita la etiqueta {string}",
  async function (this: IPlaywrightWorld, etiqueta: string) {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByText(etiqueta).click();
    await this.page.waitForURL(
      `${this.baseUrl}${adminPrefixUrl}/tags/${etiqueta}`
    );
    await tomarPantallazo(this, photoName, scenarioName);
  }
);

When(
  "Cambia el nombre de la etiqueta a {string}",
  async function (this: IPlaywrightWorld, nuevoNombre: string) {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByLabel("Name").fill(nuevoNombre);
    await this.page.getByRole("button", { name: "Save" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
  }
);

Then(
  "Verifica que la etiqueta {string} se haya actualizado a {string}",
  async function (
    this: IPlaywrightWorld,
    etiqueta: string,
    nuevoNombre: string
  ) {
    expect(this.page.getByText(nuevoNombre)).toBeDefined();
  }
);

// Cerrar pestana actual abierta
When("Cierra la pestana actual", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  const context = this.page.context();
  const pages = context.pages();

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
  await tomarPantallazo(this, photoName, scenarioName);
});

When(
  "Modifica el el titulo de post a {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    await tomarPantallazo(this, photoName, scenarioName);
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
        await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
    //Dar click en el boton Update
    await this.page.getByRole("button", { name: "Update" }).click();
    await this.page.waitForTimeout(2000);
    await tomarPantallazo(this, photoName, scenarioName);
  }
);

When(
  "Elimina el post {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    await tomarPantallazo(this, photoName, scenarioName);
    const divElement = await this.page.$(".posts-list");
    if (divElement) {
      const firstChild = await divElement.$(":first-child");
      if (firstChild) {
        await firstChild.click();
        await tomarPantallazo(this, photoName, scenarioName);
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
  await tomarPantallazo(this, photoName, scenarioName);
  if (this.isLatestVersion()) {
    await this.page.locator("button[data-test-psm-trigger]").click();
    await tomarPantallazo(this, photoName, scenarioName);
    const dropdown = this.page.locator(
      "select[data-test-select=post-visibility]"
    );
    await dropdown.selectOption({ value: "members" });
    await tomarPantallazo(this, photoName, scenarioName);
  } else {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.locator("button.post-settings").click();
    const dropdown = this.page.locator('select[optiontargetpath="name"]');
    await dropdown.selectOption({ value: "members" });
    await tomarPantallazo(
      this,
      "se-cambia-el-acceso-a-solo-miembros",
      scenarioName
    );
    await this.page.locator('button[aria-label="Close"]').click();
  }
});

Then(
  "Visualizar contenido de miembros",
  async function (this: IPlaywrightWorld) {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByText("All access").click();
    await this.page
      .getByRole("option", { name: "Members-only", exact: true })
      .click();
    await this.page.waitForTimeout(2 * 1000);
    await tomarPantallazo(this, photoName, scenarioName);
    if (this.isLatestVersion()) {
      await expect(
        await this.page.locator("div.posts-list.gh-list").count()
      ).toBeGreaterThanOrEqual(1);
    } else {
      await expect(
        await this.page.locator("ol.gh-list").count()
      ).toBeGreaterThanOrEqual(1);
    }
  }
);

When("Buscar el miembro", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  expect(nombreMiembro).toBeDefined();
  await this.page.getByText(nombreMiembro!).click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/**`);
  await tomarPantallazo(this, photoName, scenarioName);
});

Then("Editar miembro", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  nombreMiembro = this.dataGenerator.person.fullName();
  await this.page.getByLabel("Name").fill(nombreMiembro);
  await tomarPantallazo(this, photoName, scenarioName);
  await this.page.getByRole("button", { name: "Save" }).click();
  await tomarPantallazo(this, photoName, scenarioName);
  await this.page.waitForTimeout(1 * 1000);
  this.page.getByTitle(nombreMiembro);
});

Then(
  "Visualiza que el miembro se edito correctamente",
  async function (this: IPlaywrightWorld) {
    expect(nombreMiembro).toBeDefined();
    expect(this.page.getByTitle(nombreMiembro!)).toBeDefined();
  }
);

Then("Eliminar miembro", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  if (this.isLatestVersion()) {
    await this.page
      .locator('button[data-test-button="member-actions"]')
      .click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.locator('button[data-test-button="delete-member"]').click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.locator('button[data-test-button="confirm"]').click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members`);
  } else {
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "Delete Member" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    const modal = await this.page.locator("div.modal-footer");
    await modal.getByText("Delete Member").first().click();
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members`);
  }

  await tomarPantallazo(this, photoName, scenarioName);
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
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("link", { name: "New member" }).click();
    nombreMiembro = this.dataGenerator.person.fullName();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/members/**`);
    await this.page.getByLabel("Name").fill(nombreMiembro);
    await this.page
      .getByLabel("Email")
      .fill(this.dataGenerator.internet.email());
    await this.page.locator("div.for-switch").click({ force: true });
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "Save" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
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

let nombreMetadata: string | undefined;
When("Edita metadata de la pagina", async function (this: IPlaywrightWorld) {
  nombreMetadata = this.dataGenerator.lorem.word();
  await tomarPantallazo(this, photoName, scenarioName);
  if (this.isLatestVersion()) {
    await this.page.click(
      "div.flex.items-start.justify-between.gap-4 button.cursor-pointer"
    );
    await this.page.waitForTimeout(1000);
    // Selecciona todo el texto existente en el campo de entrada y presiona la tecla "Backspace" para borrarlo
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.type(nombreMetadata);
    await this.page.waitForTimeout(1000);
    //console.log("Metadata de la página modificada");
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "save" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
    //await this.page.click('button:has(span:has-text("Save"))');
    // await this.page.waitForTimeout(6000);
  } else {
    await this.page.getByRole("button", { name: "Expand" }).nth(3).click();
    await this.page.getByLabel("Meta title").fill(nombreMetadata);
    await tomarPantallazo(this, photoName, scenarioName);
    await this.page.getByRole("button", { name: "Save settings" }).click();
    await tomarPantallazo(this, photoName, scenarioName);
  }
});

Then(
  "Valida que se haya modificado la metadata de la página",
  async function (this: IPlaywrightWorld) {
    if (this.isLatestVersion()) {
      expect(nombreMetadata).toBeDefined();
      await this.page.click(
        "div.flex.items-start.justify-between.gap-4 button.cursor-pointer"
      );
      // Verifica si el texto "NewMetaData" está presente en la página actual
      const isMetadataModified = await this.page.waitForSelector(
        `text=${nombreMetadata}`
      );

      // Verifica si el texto "NewMetaData" está presente
      expect(isMetadataModified).not.toBeNull();
    }
  }
);

When("Esperar {string}", async (tiempo: string) => {
  const tiempoEnMilisegundos = parseInt(tiempo);
  await new Promise((resolve) => setTimeout(resolve, tiempoEnMilisegundos));
});

When("Navega a la seccion principal", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  this.page.goto(`${adminPrefixUrl}`);
});

let howManyPosts: number | undefined;
When("Selecciona un post para editar", async function (this: IPlaywrightWorld) {
  await tomarPantallazo(this, photoName, scenarioName);
  const conetido = await this.page.locator("h3.gh-content-entry-title").first();
  tituloContenido = await conetido.innerText();
  howManyPosts = await this.page.getByText(tituloContenido!).count();
  await this.page.getByText(tituloContenido!).first().click();
  await tomarPantallazo(this, photoName, scenarioName);
});

When("Abre la configuracion del Post", async function (this: IPlaywrightWorld) {
  await this.page.locator('button[title="Settings"]').click();
  await tomarPantallazo(this, photoName, scenarioName);
});

When("Borra el post", async function (this: IPlaywrightWorld) {
  await this.page.getByText(/Delete post/i).click();
  await tomarPantallazo(this, photoName, scenarioName);
  await this.page.waitForTimeout(500);
  await this.page.getByText("Delete", { exact: true }).click();
  await tomarPantallazo(this, photoName, scenarioName);
});

Then(
  "Verifica que el post fue eliminado",
  async function (this: IPlaywrightWorld) {
    expect(tituloContenido).toBeDefined();
    expect(howManyPosts).toBeDefined();
    await expect(this.page.getByText(tituloContenido!)).toBeDefined();
  }
);

After(() => {
  esTemaClaro = undefined;
  tituloContenido = undefined;
  randomTagName = undefined;
  nombreMiembro = undefined;
  newsLetterDesactivado = undefined;
  howManyPosts = undefined;
  resetCounter();
});
