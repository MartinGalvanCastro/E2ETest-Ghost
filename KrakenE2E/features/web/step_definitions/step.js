const { Given, When, Then } = require('@cucumber/cucumber');
const data = require('../../../properties.json');

const adminPrefix = '/ghost/#';

When('Inicia sesion', async function () {
    await this.driver.$('#identification').setValue(data.USER);
    await this.driver.$('#password').setValue(data.PASSWORD);
    return await this.driver.$('[data-test-button=sign-in]').click();
});

Then('Visualiza el dashboard de administrador', async function () {
    let element = await this.driver.$('.gh-dashboard-zero-message');
    return await element;
});

When('Cambia el tema', async function () {
    const darkStyles = await this.driver.$('.nightshift-toggle.on');
    const isLightTheme = darkStyles !== null;

    if (isLightTheme) {
        const toggle = await this.driver.$('.nightshift-toggle');
        await toggle.click();
        await this.driver.pause(2000);
    }
});

Then('Visualiza que el tema cambio', async function () {
    const darkStyles = await this.driver.$('.nightshift-toggle.on');
    return await darkStyles;

});


When('Navega al menu de {string}', async function (menu) {
    switch (menu) {
        case 'post':
            await this.driver.$('[data-test-nav=posts]').click();
            break;
        case 'page':
            await this.driver.$('[data-test-nav=pages]').click();
            break;
        case 'etiqueta':
            await this.driver.$('[data-test-nav=tags]').click();
            break;
        default:
            throw new Error(`No se reconoce el contenido ${contenido}`);
    }
});

When('Crea {string}', async function (contenido) {
    switch (contenido) {
        case 'un articulo':
            await this.driver.$('[data-test-new-post-button]').click();
            break;
        case 'una pagina':
            await this.driver.$('[data-test-new-page-button]').click();
            break;
        case 'una etiqueta':
            await this.driver.$('.ember-view.gh-btn.gh-btn-primary').click();
            break;
        default:
            throw new Error(`No se reconoce el contenido ${contenido}`);
    }
});

When('Con titulo Prueba-{string}', async function (titulo) {
    await this.driver.$('[data-test-editor-title-input]').setValue(`Prueba-${titulo}`);
    let clickP = this.driver.$('[data-koenig-dnd-droppable=true]');
    await clickP.click();
    let element = await this.driver.$('[data-koenig-dnd-droppable=true]');
    await this.driver.pause(1000);
    return await element.setValue(`Prueba-${titulo}`);
});

When('Publica el contenido', async function () {
    await this.driver.$('[data-test-button=publish-flow').click();
    await this.driver.$('[data-test-button=continue').click();
    return await this.driver.$('[data-test-button=confirm-publish').click();
    // return await this.driver.$('[data-test-button=close-publish-flow]').click();
});

Then('Verifica que el contenido se visualiza de manera correcta', async function () {
    let postCreated = await this.driver.$('.gh-post-bookmark');
    return postCreated.click();
});


// When('I enter login email {kraken-string}', async function (value) {
//     let element = await this.driver.$('.gh-input.email');
//     return await element.setValue(value);
// });

// When('I enter login password {kraken-string}', async function (value) {
//     let element = await this.driver.$('.gh-input.password');
//     return await element.setValue(value);
// });

// Then('I submit login', async function () {
//     let element = await this.driver.$('[data-test-button=sign-in]');
//     return await element.click();
// });

// Then('I select post nav', function () {
//     let element = this.driver.$('[data-test-nav=posts]');
//     return element.click();
// });

// Then('I create new Post', function () {
//     let element = this.driver.$('[data-test-new-post-button]');
//     return element.click();
// });

// When('I write new title post {kraken-string}', async function (value) {
//     let element = await this.driver.$('[data-test-editor-title-input]');
//     return await element.setValue(value);
// });

// Then('I click on paragraph content', function () {
//     let element = this.driver.$('[data-koenig-dnd-droppable=true]');
//     return element.click();
// });

// When('I write new content post {kraken-string}', async function (value) {
//     let clickP = this.driver.$('[data-koenig-dnd-droppable=true]');
//     await clickP.click();
//     let element = await this.driver.$('[data-koenig-dnd-droppable=true]');
//     return await element.setValue(value);
// });

// Then('I publish post', function () {
//     let element = this.driver.$('[data-test-button=publish-flow');
//     return element.click();
// });

// Then('I continuo publish post', function () {
//     let element = this.driver.$('[data-test-button=continue');
//     return element.click();
// });

// Then('I confirm publish post', function () {
//     let element = this.driver.$('[data-test-button=confirm-publish');
//     return element.click();
// });

// Then('I go back to the post', function () {
//     let element = this.driver.$('[data-test-button=close-publish-flow]');
//     return element.click();
// });

// Then('I go back to the panel', function () {
//     let element = this.driver.$('[data-test-link=posts]');
//     return element.click();
// });

// Then('I select Tags nav', function () {
//     let element = this.driver.$('[data-test-nav=tags]');
//     return element.click();
// });

// Then('I button create new Tag', function () {
//     let element = this.driver.$('.ember-view.gh-btn.gh-btn-primary');
//     return element.click();
// });

// When('I enter name tag {kraken-string}', async function (value) {
//     let element = await this.driver.$('[data-test-input=tag-name]');
//     return await element.setValue(value);
// });

// Then('I click save button Tag', function () {
//     let element = this.driver.$('[data-test-button=save]');
//     return element.click();
// });

// Then('I click on one post to edit', function () {
//     let element = this.driver.$('section > section > div:nth-child(1)');
//     return element.click();
// });

// Then('I click settings post', function () {
//     let element = this.driver.$('[data-test-psm-trigger]');
//     return element.click();
// });

// Then('I click list tags', function () {
//     let element = this.driver.$('#tag-input');
//     return element.click();
// });

// Then('I select a tag', function () {
//     let element = this.driver.$('li:nth-child(1)');
//     return element.click();
// });


//ember-basic-dropdown
//ddata-test-link="posts"
// Then('I validate the Registration successful', async function () {
//     return await this.driver.$('body > app > div.jumbotron > div > div > div > alert > div');
// });
