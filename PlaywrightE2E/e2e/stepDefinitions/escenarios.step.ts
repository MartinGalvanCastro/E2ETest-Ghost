import { Given, When, Then, After, Before } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { IPlaywrightWorld } from "../world";

const adminPrefixUrl = '/ghost/#';

Given('Un usuario administrador', async function (this: IPlaywrightWorld) {
    this.adminUser = process.env.ADMIN_USER!;
    this.adminPassword = process.env.ADMIN_PASS!;
    const titulo = 'prueba-page';    
});

When('Inicia sesion', async function (this: IPlaywrightWorld) {
    await this.page.goto('/ghost');
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/signin`)
    await this.page.getByLabel('Email address').fill(this.adminUser!);
    await this.page.getByLabel('Password').fill(this.adminPassword!);
    await this.page.getByRole('button', { name: /Sign in/i }).click();
    await this.page.waitForURL(`${this.baseUrl}/ghost/#/dashboard`)
});

Then('Visualiza el dashboard de administrador', async function (this: IPlaywrightWorld) {
    await expect(this.page).toHaveURL(`${this.baseUrl}${adminPrefixUrl}/dashboard`)
    await expect(this.page.getByRole('heading', { name: /Dashboard/i })).toBeVisible()
});

let esTemaClaro:boolean|undefined;
When('Cambia el tema', async function (this: IPlaywrightWorld) {
   const disabledAtributo = await this.page.locator('head link#dark-styles').getAttribute('disabled');
   esTemaClaro = disabledAtributo !==null;
   await this.page.locator('div.nightshift-toggle').click();
   await this.page.waitForTimeout(1*1000);
});

Then('Visualiza que el tema cambio', async function (this: IPlaywrightWorld) {
    const cambioTema = await this.page.locator('head link#dark-styles').getAttribute('disabled');
    expect(cambioTema !==null ).toBe(!esTemaClaro);
  });

When('Navega al menu de {string}', async function (this: IPlaywrightWorld, contenido :string) {
    switch(contenido){
        case 'post':
            await this.page.getByRole('link', { name: 'Posts', exact: true }).click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/posts`)
            break;
        case 'page':
            await this.page.getByRole('link', { name: /Pages/i }).click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/pages`)
            break;
        case 'etiqueta':
            await this.page.getByRole('link', { name: 'Tags', exact: true }).click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`)
            break;
        default:
            throw new Error(`No se reconoce el contenido ${contenido}`);
    }
});

When('Crea {string}', async function (this: IPlaywrightWorld, contenido :string) {
    switch(contenido){
        case 'un articulo':
            await this.page.getByTitle('New post').click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/editor/**`);
            break;
        case 'una pagina':
            await this.page.getByRole('link', { name: /New page/i }).click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/editor/**`);
            break;
        case 'una etiqueta':
            await this.page.getByRole('link',{name:'New tag'}).click();
            await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags/new`);
            break;
        default:
            throw new Error(`No se reconoce el contenido ${contenido}`);
    }
    
});

let tituloContenido:string|undefined;
When('Con titulo Prueba-{string}', async function (this: IPlaywrightWorld, contenido :string) {
    const titlePlaceholder = contenido.charAt(0).toUpperCase() + contenido.slice(1);
    tituloContenido = `Prueba-${titlePlaceholder}`;
    await this.page.getByPlaceholder(`${titlePlaceholder} title`).fill(tituloContenido);
    await this.page.getByText('New').click();
    await this.page.waitForTimeout(2*1000);
});

When('Publica el contenido', async function (this: IPlaywrightWorld) {
    await this.page.getByRole('button', { name: /Publish/i }).click();
    await this.page.getByRole('button',{name: /Continue, final review/i}).click();
    await this.page.locator('button[data-test-button="confirm-publish"]').click({force:true});
});

Then('Verifica que el contenido se visualiza de manera correcta', async function (this: IPlaywrightWorld){
    await this.page.locator('a.gh-post-bookmark-wrapper').click();
    await expect(this.page.getByTitle(tituloContenido!)).toBeDefined();
});

let randomTagName:string|undefined;
When('Tiene nombre aleatorio', async function (this: IPlaywrightWorld){
    randomTagName = this.dataGenerator.lorem.words(3)
    await this.page.getByLabel('Name').fill(randomTagName);
});

Then('Verifica que la etiqueta se cree correctamente',async function (this: IPlaywrightWorld){
    expect(randomTagName).toBeDefined();
    await this.page.getByRole('button',{name:'Save'}).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Tags'}).first().click();
    await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/tags`);
    await expect(this.page.getByText(randomTagName!)).toBeDefined();

})

After(()=>{
    esTemaClaro = undefined;
    tituloContenido = undefined;
})