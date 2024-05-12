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
    await this.driver.$('#ember34').click();
    await this.driver.pause(1000);
});
Then('Ir a metadata', async function () {
    await this.driver.$('div[data-testid="metadata"] button[type="button"] span').click();
});
Then('Ingresar texto en Meta title', async function () {
    const inputs = await this.driver.$$('.peer');
    if (inputs.length > 0) {
        for (const input of inputs) {
            await input.setValue('Texto de prueba');
        }
    } else {
        throw new Error('No se encontraron elementos con la clase "peer"');
    }
});

Then('Guardar informacion', async function () {
    const buttons = await this.driver.$$('div[data-testid="metadata"] button[type="button"]');
    let saveButton;
    for (const button of buttons) {
        const buttonText = await button.$('span').getText();
        if (buttonText.trim() === 'Save') {
            saveButton = button;
            break;
        }
    }
    if (saveButton) {
        await saveButton.click();
    } else {
        throw new Error('No se encontró el botón "Save" dentro del div con el atributo data-testid="metadata"');
    }
});
Then('Ingresa en make site private', async function(){
    const buttons = await this.driver.$$('div[data-testid="locksite"] button[type="button"]');
    let editButton;
    for (const button of buttons) {
        const buttonText = await button.$('span').getText();
        if (buttonText.trim() === 'Edit') {
            editButton = button;
            break;
        }
    }
    if (editButton) {
        await editButton.click();
    } else {
        throw new Error('No se encontró el botón "Edit" dentro del div con el atributo data-testid="locksite"');
    }
})
Then('Presionar botón de activar sitio privado', async function () {
    const targetDiv = await this.driver.$('.group.flex.items-start.gap-2.dark\\:text-white.justify-between.undefined');

    await targetDiv.click();
});
Then('Ingreso una contraseña', async function(){
    const passwordInput = await this.driver.$('.peer');

    if (passwordInput) {
        await passwordInput.setValue('1234');
    } else {
        throw new Error('No se encontró el elemento de entrada para la contraseña');
    }
});
Then('Guardo la informacion para sitio privado', async function () {
    const buttons = await this.driver.$$('div[data-testid="locksite"] button[type="button"]');
    let saveButton;
    for (const button of buttons) {
        const buttonText = await button.$('span').getText();
        if (buttonText.trim() === 'Save') {
            saveButton = button;
            break;
        }
    }
    if (saveButton) {
        await saveButton.click();
    } else {
        throw new Error('No se encontró el botón "Save" dentro del div con el atributo data-testid="metadata"');
    }
});
Then('Presionar botón de desactivar sitio privado', async function () {
    const targetDiv = await this.driver.$('.group.flex.items-start.gap-2.dark\\:text-white.justify-between.undefined');

    await targetDiv.click();
});
Then('Ingresa en social accounts', async function(){
    const editButton = await this.driver.$('div[data-testid="social-accounts"] button[type="button"]');

    if (editButton) {
        await editButton.click();
    } else {
        throw new Error('No se encontró el botón "Edit" en la sección de cuentas sociales');
    }
});
Then('Ingreso link facebook', async function(){
    const facebookInput = await this.driver.$('input[placeholder="https://www.facebook.com/ghost"]');
    if (facebookInput ) {
        await facebookInput.setValue('https://www.facebook.com/yourpage');

    } else {
        throw new Error('No se encontró el campo de entrada de texto para el enlace de Facebook');
    }
});

Then('Ingreso link twitter', async function(){
    // Buscar el campo de entrada de texto del enlace de Twitter dentro del div con el atributo data-testid="social-accounts"
    const twitterInput = await this.driver.$('input[placeholder="https://twitter.com/ghost"]');

    // Verificar si se encontró el campo de entrada de texto del enlace de Twitter
    if (twitterInput) {
        // Establecer el valor del texto en el campo de entrada de texto del enlace de Twitter
        await twitterInput.setValue('yourpage');
    } else {
        // Lanzar un error si no se encontró el campo de entrada de texto del enlace de Twitter
        throw new Error('No se encontró el campo de entrada de texto para el enlace de Twitter');
    }
});

Then('Guardar la informacion de links', async function(){
    // Buscar el botón "Save" dentro del div con el atributo data-testid="social-accounts"
    const saveButton = await this.driver.$('div[data-testid="social-accounts"] button[type="button"][class*="text-green"]');

    // Verificar si se encontró el botón "Save"
    if (saveButton) {
        // Hacer clic en el botón "Save"
        await saveButton.click();
    } else {
        // Lanzar un error si no se encontró el botón "Save"
        throw new Error('No se encontró el botón "Save" en la sección de cuentas sociales');
    }
});
Then('Ingresa en Access', async function(){
    // Buscar el botón "Edit" dentro del div con el atributo data-testid="access"
    const editButtonAccess = await this.driver.$('div[data-testid="access"] button[type="button"] > span');

    // Verificar si se encontró el botón "Edit"
    if (editButtonAccess) {
        // Hacer clic en el botón "Edit"
        await editButtonAccess.click();
    } else {
        // Lanzar un error si no se encontró el botón "Edit"
        throw new Error('No se encontró el botón "Edit" en la sección de Access');
    }
});

Then('Seleccionar en subscription access el item nobody', async function(){
    // Buscar el elemento que contiene el span con el texto "Nobody" utilizando el atributo data-value
    const nobodyElement = await this.driver.$('div[data-testid="select-option"] div[data-value="none"]');

    // Verificar si se encontró el elemento
    if (nobodyElement) {
        // Hacer clic en el elemento
        await nobodyElement.click();
    } else {
        // Lanzar un error si no se encontró el elemento
        throw new Error('No se encontró el elemento con el texto "Nobody"');
    }
});
When('Entra a post', async function(){
    // Seleccionar el enlace con el título "New post"
    const newPostLink = await this.driver.$('a[title="New post"]');

    // Verificar si se encontró el enlace
    if (newPostLink) {
        // Hacer clic en el enlace
        await newPostLink.click();
    } else {
        // Lanzar un error si no se encontró el enlace
        throw new Error('No se encontró el enlace con el título "New post"');
    }
});
Then('Crea post', async function(){
    // Seleccionar el textarea dentro del contenedor de título del editor
    const textarea = await this.driver.$('.gh-editor-title-container textarea');

    // Verificar si se encontró el textarea
    if (textarea) {
        // Limpiar el contenido actual del textarea
        await textarea.clearValue();

        // Escribir el nuevo título en el textarea
        await textarea.setValue("¡Mi nuevo título!");
    } else {
        // Lanzar un error si no se encontró el textarea
        throw new Error('No se encontró el textarea en el contenedor de título del editor');
    }
});

Then('Agrega descripcion', async function(){
    // Encuentra el elemento de la descripción
    const descripcionElement = await this.driver.$('.koenig-react-editor');

    // Inserta el texto en el elemento
    await descripcionElement.setValue('Esta es la descripción');
});
Then('Guardar post', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const publishButton = await this.driver.$('[data-test-button="publish-flow"]');

    // Haz clic en el botón "Publish"
    await publishButton.click();

});
Then('Publicar post', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const publishButton = await this.driver.$('.gh-publish-cta');

    // Haz clic en el botón "Publish"
    await publishButton.click();

});
Then('Confirmar post', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const publishButton = await this.driver.$('[data-test-button="confirm-publish"]');

    // Haz clic en el botón "Publish"
    await publishButton.click();

});

Then('Entra a tags', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const entry = await this.driver.$('[data-test-nav="tags"]');

    // Haz clic en el botón "Publish"
    await entry.click();

});
Then('Selecciona un tag', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const select = await this.driver.$('.tags-list');

    // Haz clic en el botón "Publish"
    await select.click();

});
Then('Elimina el tag', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const elimacion = await this.driver.$('[data-test-button="delete-tag"]');

    // Haz clic en el botón "Publish"
    await elimacion.click();

});

Then('Confirma eliminacion', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const confirmation = await this.driver.$('[data-test-task-button-state="idle"]');

    // Haz clic en el botón "Publish"
    await confirmation.click();

});


Then('Modificar tag', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const modify = await this.driver.$('[data-test-input="tag-name"]');


    await modify.setValue('Esta es la modificacion');

});

Then('Guardar modificacion tag', async function(){
    // Encuentra el botón "Publish" por su atributo data-test-button
    const modify = await this.driver.$('[data-test-task-button-state="idle"]');


    await modify.click();

});