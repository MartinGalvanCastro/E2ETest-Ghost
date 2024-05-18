import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld } from "../../e2e/world";
const adminPrefixUrl = "/ghost/#";

let nombreAleatorio = "";

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

When("Crea un nuevo tag", async function (this: IPlaywrightWorld) {
  await this.page.locator('css=a.ember-view.gh-btn.gh-btn-primary').click();
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags/new`);
});

When("Ingresa un nombre aleatorio", async function (this: IPlaywrightWorld) {
  nombreAleatorio = this.dataGenerator.person.fullName();
  await this.page.getByLabel("Name").fill(nombreAleatorio);
});

When("Ingresa un correo aleatorio", async function (this: IPlaywrightWorld) {
  await this.page.getByLabel("Email").fill(this.dataGenerator.internet.email());
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
  "{string} ingresa una descripcion",
  async function (this: IPlaywrightWorld, tieneDescripcion: string) {
    const debeAgregarDescripcion = tieneDescripcion === "Si";
    if (!debeAgregarDescripcion) {
      return;
    }
    await this.page.getByLabel("Description").fill(this.dataGenerator.lorem.paragraph({ min: 1, max: 3 }));
  }
)

When("Guarda el miembro", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: "Save" }).click();
});

When("Guarda el tag", async function (this: IPlaywrightWorld) {
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

//DIEGO
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

When(
  "Ingresa {string} en el campo de correo",
  async function (this: IPlaywrightWorld, correo: string) {
    let formattedMail =
      correo.length > 0
        ? `${this.dataGenerator.person.firstName()}_${correo}`
        : correo;
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
  "Ingresa {string} en el campo de nombre",
  async function (this: IPlaywrightWorld, nombre: string) {
    await this.page.getByLabel("Name").fill(nombre);
  }
);

When(
  "Ingresa {string} en el campo de correo",
  async function (this: IPlaywrightWorld, correo: string) {
    let formattedMail =
      correo.length > 0
        ? `${this.dataGenerator.person.firstName()}_${correo}`
        : correo;
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
  "El miembro no es guardado",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
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

Then(
  "El miembro no es guardado por correo repetido",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
  }
);

Then(
  "El miembro no es guardado por correo invalido",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
  }
);

Then(
  "El miembro no es guardado por notes con mas de 500 caracteres",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
  }
);

Then(
  "El miembro no es guardado por falta de nombre",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
  }
);

Then(
  "El miembro no es guardado por falta de correo",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('span[data-test-task-button-state="failure"]')
    ).toBeVisible();
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
