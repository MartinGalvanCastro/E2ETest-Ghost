const adminPrefixUrl = "/ghost/#";
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { IPlaywrightWorld } from '../../e2e/world';

const adminSignInUrl = `${adminPrefixUrl}/signin`;
function generateLongString(length: number): string {
    return 'a'.repeat(length);
}

Given('el usuario inicia sesión y navega a la página de configuración', async function (this: IPlaywrightWorld) {
    await this.page.goto(adminSignInUrl);
    await this.page.waitForURL(adminSignInUrl);
    await this.page.getByLabel("Email address").fill('md.galvan@uniandes.edu.co');
    await this.page.getByLabel("Password").fill('Grupo16!@123123');
    await this.page.click('button[type="submit"]');
    await this.page.waitForNavigation();
    await this.page.click('a[data-test-nav="settings"]');
});

Then('el formulario está cargado', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="title-and-description"]');
});

When('el usuario presiona el botón {string}', async function (this: IPlaywrightWorld, button: string) {
    await this.page.click(`button:has-text("${button}")`);
});

When('el usuario hace clic en el botón {string}', async function (this: IPlaywrightWorld, buttonName: string) {
    await this.page.click(`button:has-text("${buttonName}")`);
});

When('el usuario vacía el campo {string}', async function (this: IPlaywrightWorld, field: string) {
    await this.page.fill(`[placeholder="${field}"]`, '');
});

When('el usuario guarda los cambios', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
});

When('el usuario ingresa {string} en el campo "Site title"', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="Site title"]', title);
});

When('el usuario ingresa {string} en el campo "Site description"', async function (this: IPlaywrightWorld, value: string) {
    await this.page.fill('input[placeholder="Site description"]', value);
});

When('el usuario hace clic en el botón "Edit" de Metadata', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="metadata"] button.text-green');
    await this.page.click('[data-testid="metadata"] button.text-green');
});

When('el usuario hace clic en el botón "Edit" de Social Accounts', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="social-accounts"] button.text-green');
    await this.page.click('[data-testid="social-accounts"] button.text-green');
});

When('el usuario presiona el botón "Save" de Social Accounts', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
});

When('el usuario ingresa {string} en el campo facebook', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="https://www.facebook.com/ghost"]', title);
});

When('el usuario ingresa {string} en el campo twitter', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="https://twitter.com/ghost"]', title);
});

Then('el formulario de Metadata está cargado', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="metadata"]');
});

Given('el usuario deja Meta title vacío', async function (this: IPlaywrightWorld) {
    await this.page.fill('.peer', ''); 
});

Given('el usuario deja Meta description vacío', async function (this: IPlaywrightWorld) {
    const metaDescriptionInput = await this.page.$('div:has(> label:has-text("Meta description")) input');
    if (metaDescriptionInput) {
        await metaDescriptionInput.fill('');
    } else {
        console.error('No se encontró el campo de entrada para Meta description');
        throw new Error('No se encontró el campo de entrada para Meta description');
    }
});


Given('el usuario hace clic en el label Meta title', async function (this: IPlaywrightWorld) {
    const metaTitleLabel = await this.page.$('text=Meta title');
    if (metaTitleLabel) {
        await metaTitleLabel.click();
    } else {
        throw new Error('No se encontró el label para Meta title');
    }
});

Given('el usuario pone 500 caracteres Meta description', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(300);

    const metaTitleInput = await this.page.$('div:has(> label:has-text("Meta title")) input');
    if (metaTitleInput) {
        await metaTitleInput.fill(longString);
    } else {
        console.error('No se encontró el campo de entrada para Meta title');
        throw new Error('No se encontró el campo de entrada para Meta title');
    }
});

Given('el usuario pone 501 caracteres Meta description', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(501);

    const metaTitleInput = await this.page.$('div:has(> label:has-text("Meta title")) input');
    if (metaTitleInput) {
        await metaTitleInput.fill(longString);
    } else {
        console.error('No se encontró el campo de entrada para Meta title');
        throw new Error('No se encontró el campo de entrada para Meta title');
    }
});

Given('el usuario pone 10 caracteres Meta description', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(10);

    const metaTitleInput = await this.page.$('div:has(> label:has-text("Meta title")) input');
    if (metaTitleInput) {
        await metaTitleInput.fill(longString);
    } else {
        console.error('No se encontró el campo de entrada para Meta title');
        throw new Error('No se encontró el campo de entrada para Meta title');
    }
});

Given('el usuario pone 300 caracteres Meta title', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(300);

    const metaTitleInput = await this.page.$('.peer');
    if (metaTitleInput) {
        await metaTitleInput.fill(longString);
    } else {
        console.error('No se encontró el campo de entrada para Meta title');
        throw new Error('No se encontró el campo de entrada para Meta title');
    }
});

Given('el usuario pone 301 caracteres Meta title', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(301);

    const metaTitleInput = await this.page.$('.peer');
    if (metaTitleInput) {
        await metaTitleInput.fill(longString);
    } else {
        console.error('No se encontró el campo de entrada para Meta title');
        throw new Error('No se encontró el campo de entrada para Meta title');
    }
});

Given('el usuario pone 10 caracteres Meta title', async function (this: IPlaywrightWorld) {
    await this.page.fill('.peer', 'qwertyuioa'); // Rellenar el campo Meta title con una cadena vacía
});
When('el usuario presiona el botón "Save" de Metadata', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
});

Then('el formulario de language está cargado', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="publication-language"]');
});

When('el usuario hace clic en el botón "Edit" de Language', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="publication-language"] button.text-green');
    await this.page.click('[data-testid="publication-language"] button.text-green');
});
When('el usuario ingresa {string} en el campo de language', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="Site language"]', title);
});
When('el usuario presiona el botón "Save" de Language', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
});

When('el usuario ingresa 65535 caracteres en el campo de language', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(65535);

    await this.page.fill('input[placeholder="Site language"]', longString);
});

When('el usuario ingresa 65536 caracteres en el campo de language', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(65536);

    await this.page.fill('input[placeholder="Site language"]', longString);
});

Then('el formulario de locksite está cargado', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="locksite"]');
});

When('el usuario hace clic en el botón "Edit" de locksite', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="locksite"] button.text-green');
    await this.page.click('[data-testid="locksite"] button.text-green');
});

Given('el usuario hace click en habilitar contraseña', async function (this: IPlaywrightWorld) {
    const checkboxInput = await this.page.$('div:has(> label:has-text("Enable password protection")) input[type="checkbox"]');
    if (checkboxInput) {
        await checkboxInput.click(); 
    } else {
        console.error('No se encontró el checkbox');
        throw new Error('No se encontró el checkbox');
    }
});

When('el usuario ingresa una contraseña de 5 caracteres', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(5);

    await this.page.fill('input[placeholder="Enter password"]', longString);
});

When('el usuario presiona el botón "Save" de locksite', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
});
When('el usuario ingresa una contraseña de 65535 caracteres', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(65535);

    await this.page.fill('input[placeholder="Enter password"]', longString);
});
When('el usuario ingresa una contraseña de 0 caracteres', async function (this: IPlaywrightWorld) {
    const longString = generateLongString(0);

    await this.page.fill('input[placeholder="Enter password"]', longString);
});