const { Given, When, Then } = require('@cucumber/cucumber');
const data = require('../../../properties.json');
const { faker } = require("@faker-js/faker")
const { getByText } = require("@testing-library/dom");

const adminPrefix = '/ghost/#';



When('Inicia sesion', async function () {
    await this.driver.$('#identification').setValue(data.USER);
    await this.driver.$('#password').setValue(data.PASSWORD);
    return await this.driver.$('[data-test-button=sign-in]').click();
});

Then('Visualiza el dashboard de administrador', async function () {
    let element = await this.driver.$('.gh-dashboard-zero-message');
    await this.driver.pause(500);
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
        case 'Members':
            await this.driver.$('[data-test-nav=members]').click();
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
        case 'un miembro':
            await this.driver.$('[data-test-new-member-button]').click();
            break;
        default:
            throw new Error(`No se reconoce el contenido ${contenido}`);
    }
});

let tituloContenido = '';
let randomMemberName = '';
When('Con titulo Prueba-{string}', async function (titulo) {
    tituloContenido = `Prueba-${titulo}`;
    switch (titulo) {
        case 'Members':
            await this.driver.pause(1000);
            randomMemberName = faker.person.fullName();
            await this.driver.$('[data-test-input=member-name]').setValue(randomMemberName);
            await this.driver.$('[data-test-input=member-email]').setValue(faker.internet.email());
            await this.driver.$('[data-test-button=save').click();
            await this.driver.pause(3000);
            await this.driver.$('[data-test-nav=members]').click();
            await this.driver.pause(2000);
            await this.driver.$('[data-test-nav=members]').click();
            await this.driver.pause(1000);
            break;

        default:
            await this.driver.$('[data-test-editor-title-input]').setValue(tituloContenido);
            let clickP = this.driver.$('[data-koenig-dnd-droppable=true]');
            await clickP.click();
            let element = await this.driver.$('[data-koenig-dnd-droppable=true]');
            await this.driver.pause(1000);
            await element.setValue(tituloContenido);
            break;
    }
});

When('Publica el contenido', async function () {
    await this.driver.$('[data-test-button=publish-flow]').click();
    await this.driver.pause(500);
    await this.driver.$('[data-test-button=continue]').click();
    return await this.driver.$('[data-test-button=confirm-publish').click();
});

Then('Verifica que el contenido se visualiza de manera correcta', async function () {
    let postCreated = await this.driver.$('.gh-post-bookmark');

    return postCreated.click();
});

let randomTagName = '';
When('Tiene nombre aleatorio', async function () {
    let element = await this.driver.$('[data-test-input=tag-name]');
    randomTagName = faker.lorem.word(3);
    await this.driver.pause(200);
    return await element.setValue(randomTagName);
});

When('Verifica que la etiqueta se cree correctamente', async function () {
    let element = await this.driver.$('[data-test-button=save]');
    await element.click();
    await this.driver.pause(500);
    await this.driver.$('[data-test-nav=tags]').click();
    let tagCreated = await this.driver.$$('h3').find((element) => element.textContent === randomTagName);

    if (tagCreated) {
        await this.driver.pause(500);
        return expect(tagCreated).toBeTrue;
    }
}
);

When('Programa el contenido', async function () {
    await this.driver.$('[data-test-psm-trigger]').click();
    let timeValue = await this.driver.$('[data-test-date-time-picker-time-input]').getValue();
    const [hour, minute] = timeValue.split(":").map(str => parseInt(str));
    const newTime = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
    await this.driver.$('[data-test-date-time-picker-time-input]').setValue(newTime);
    await this.driver.$('[data-test-button=publish-flow]').click();
    await this.driver.pause(500);
    await this.driver.$('[data-test-button=continue').click();
    return await this.driver.$('[data-test-button=confirm-publish').click();
});

When('Vuelve al dashboard', async function () {
    await this.driver.$('[data-test-link=dashboard]').click();
    await this.driver.pause(500);
});

Then('Visualiza que el contenido se ha programado correctamente', async function () {
    await this.driver.$('[data-test-nav=posts]').click();
    await this.driver.pause(500);
    let postCreated = await this.driver.$$('h3').find((element) => element.textContent === tituloContenido);
    if (postCreated) {
        await this.driver.pause(500);
        return expect(postCreated).toBeTrue;
    }
});

When('Cambia acceso', async function () {
    await this.driver.$('[data-test-nav=posts]').click();
    await this.driver.pause(500);
    let posts = await this.driver.$$('h3');
    let postCreated;
    for (let post of posts) {
        let text = await post.getText();
        if (text === tituloContenido) {
            postCreated = post;
            break;
        }
    }
    await postCreated.click();
    await this.driver.pause(500);
    await this.driver.$('[data-test-psm-trigger]').click();
    await this.driver.$('.gh-select').click();
    await this.driver.pause(2000);
    let options = await this.driver.$$('option');
    let optionSelected;
    for (let option of options) {
        let text = await option.getValue();
        if (text === 'members') {
            optionSelected = option;
            break;
        }
    }
    await optionSelected.click();
    await this.driver.pause(500);
    await this.driver.$('[data-test-button=publish-save]').click();
});

Then('Visualizar contenido de miembros en posts', async function () {
    await this.driver.url('https://ghost-al42.onrender.com/ghost/#/posts?visibility=members');
});

Then('Editar miembro', async function () {
    // await this.driver.$('[data-test-nav=members]').click();
    await this.driver.$('[data-test-list]').click();
    await this.driver.pause(1000);
    await this.driver.$('[data-test-input=member-name]').setValue(randomMemberName);
    await this.driver.$('[data-test-input=member-email]').setValue(faker.internet.email());
    await this.driver.$('[data-test-button=save]').click();
    await this.driver.pause(3000);
    await this.driver.$('[data-test-nav=members]').click();
});

Then('Apagar Newslatter', async function () {
    await this.driver.$('[data-test-nav=members]').click();
    await this.driver.$('[data-test-list]').click();
    await this.driver.pause(1000);
    await this.driver.$('.switch').click();
    await this.driver.$('[data-test-button=save]').click();
    await this.driver.pause(3000);
    await this.driver.$('[data-test-nav=members]').click();
});


Then('Elimiar miembro', async function () {
    await this.driver.$('[data-test-nav=members]').click();
    await this.driver.$('[data-test-list]').click();
    await this.driver.pause(1000);
    await this.driver.$('[data-test-button=member-actions]').click();
    await this.driver.pause(1000);
    await this.driver.$('[data-test-button=delete-member]').click();
    await this.driver.pause(1000);
    await this.driver.$('[data-test-button=confirm]').click();
    await this.driver.pause(1000);
    await this.driver.$('[data-test-nav=members]').click();
});

Then('Buscar miembro', async function () {
    await this.driver.$('[data-test-input=members-search]').click();
    await this.driver.$('[data-test-input=members-search]').setValue(randomMemberName);
    await this.driver.pause(1000);
});

Then('Ir a perfil', async function () {
    await this.driver.$('.pe-all').click();
    await this.driver.$('[data-test-nav=user-profile]').click();
    await this.driver.pause(1000);
});

Then('Ir a settings', async function () {
    await this.driver.$('[data-test-nav=user-settings]').click();
    await this.driver.pause(1000);
});
