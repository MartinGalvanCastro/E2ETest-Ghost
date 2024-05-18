
const adminPrefixUrl = "/ghost/#";
import { Given, Then,When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { IPlaywrightWorld } from '../../e2e/world';

// Definición de la URL de inicio de sesión
const adminSignInUrl = `${adminPrefixUrl}/signin`;

// Paso para iniciar sesión y navegar a la página de configuración (settings)
Given('el usuario inicia sesión y navega a la página de configuración', async function (this: IPlaywrightWorld) {
  // Navegar a la página de inicio de sesión
  await this.page.goto(adminSignInUrl);
  // Esperar a que se cargue la página de inicio de sesión
  await this.page.waitForURL(adminSignInUrl);
  // Ingresar credenciales de usuario (ajustar según tu aplicación)
  await this.page.getByLabel("Email address").fill('md.galvan@uniandes.edu.co');
  await this.page.getByLabel("Password").fill('Grupo16!@123123');
  // Hacer clic en el botón de inicio de sesión
  await this.page.click('button[type="submit"]');
  // Esperar a que se redireccione al dashboard (ajustar según tu aplicación)
  await this.page.waitForNavigation();
  // Hacer clic en el enlace de settings
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
  
// Paso para ingresar texto en el campo "Site title"
When('el usuario ingresa {string} en el campo "Site title"', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="Site title"]', title);
  });

  When('el usuario ingresa {string} en el campo "Site description"', async function (this: IPlaywrightWorld, value: string) {
    await this.page.fill('input[placeholder="Site description"]', value);
  });







// Paso para hacer clic en el botón "Edit" de Metadata
When('el usuario hace clic en el botón "Edit" de Metadata', async function (this: IPlaywrightWorld) {
    // Esperar a que el botón "Edit" de Metadata esté disponible
    await this.page.waitForSelector('[data-testid="metadata"] button.text-green');
    // Hacer clic en el botón "Edit" de Metadata
    await this.page.click('[data-testid="metadata"] button.text-green');
});


// Paso para hacer clic en el botón "Edit" de Metadata
When('el usuario hace clic en el botón "Edit" de Social Accounts', async function (this: IPlaywrightWorld) {
    // Esperar a que el botón "Edit" de Metadata esté disponible
    await this.page.waitForSelector('[data-testid="social-accounts"] button.text-green');
    // Hacer clic en el botón "Edit" de Metadata
    await this.page.click('[data-testid="social-accounts"] button.text-green');
});


  // Paso para presionar el botón "Save" de Metadata
  When('el usuario presiona el botón "Save" de Social Accounts', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
  });

  When('el usuario ingresa {string} en el campo facebook', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="https://www.facebook.com/ghost"]', title);
  });



  When('el usuario ingresa {string} en el campo twitter', async function (this: IPlaywrightWorld, title: string) {
    await this.page.fill('input[placeholder="https://twitter.com/ghost"]', title);
  });




  // Paso para verificar que el formulario de Metadata está cargado
  Then('el formulario de Metadata está cargado', async function (this: IPlaywrightWorld) {
    await this.page.waitForSelector('[data-testid="metadata"]');
  });
  
// Paso para dejar el campo Meta title vacío
Given('el usuario deja Meta title vacío', async function (this: IPlaywrightWorld) {
    await this.page.fill('.peer', ''); // Rellenar el campo Meta title con una cadena vacía
});


  
  // Paso para presionar el botón "Save" de Metadata
  When('el usuario presiona el botón "Save" de Metadata', async function (this: IPlaywrightWorld) {
    await this.page.click('button:has-text("Save")');
  });