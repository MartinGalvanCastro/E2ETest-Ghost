Feature: Escearios Version 3.42.0


    Background:
        Given Se esta usando la version '3.42.0' de Ghost

    @342
    Scenario: Inicio Sesion - Cambiar Tema - Crear post - Visualizar Contenido
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Cambia el tema
        Then Visualiza que el tema cambio
        When Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

    @342
    Scenario: Inicio Sesion - Crear Etiqueta - Crear Post - Visualizar Contenido
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'etiqueta'
        And Crea 'una etiqueta'
        And Tiene nombre aleatorio
        Then Verifica que la etiqueta se cree correctamente
        When Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

    @342
    Scenario: Iniciar sesion - programar un post - validar que se programe correctamente
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Programa el contenido
        And Vuelve al dashboard
        And Navega al menu de 'post'
        Then Visualiza que el contenido se ha programado correctamente

    @342
    Scenario Outline: Iniciar sesión, crear post, crear etiqueta, asignar etiqueta a post, validar post con etiqueta en admin
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'post'
        When Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Publica el contenido
        And Vuelve al dashboard
        When Navega al menu de 'etiqueta'
        And Crea 'una etiqueta'
        And Tiene nombre de etiqueta New Tag
        And Vuelve al dashboard
        When Navega al menu de 'publish'
        And Asigna la etiqueta '<nombre-etiqueta>' al post 'Prueba-Post'
        And Vuelve al dashboard
        When Navega al menu de 'publish'
        Then Verifica que el post '<titulo-post>' tiene la etiqueta '<nombre-etiqueta>'
        Then Verifica que el post 'Prueba-Post' tiene la etiqueta '<nombre-etiqueta>' y esten publicados en la pagina principal
        When Cierra la pestana actual
        And Vuelve al dashboard
        When Navega al menu de 'publish'
        When Modifica el el titulo de post a 'New-ModPrueba-Post'
        And Vuelve al dashboard
        When Navega al menu de 'publish'
        Then Verifica que el post 'New-ModPrueba-Post' tiene la etiqueta 'New tag'
        Then Verifica que el post 'New-ModPrueba-Post' tiene la etiqueta 'New tag' y esten publicados en la pagina principal
        When Cierra la pestana actual
        And Vuelve al dashboard
        When Navega al menu de 'publish'
        When Elimina el post 'New-ModPrueba-Post'
        Examples:
            | titulo-post   | nombre-etiqueta |
            | post-etiqueta | New tag         |

    @342
    Scenario: Iniciar sesión, crear metadata para google, validar que la etiqueta esté bien creada
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        When Esperar '5000'
        Then tomar una captura de pantalla con nombre 'menu-setttings' y guardarla en 'escenario-metadata'
        When Esperar '1000'
        When Edita metadata de la pagina
        Then Valida que se haya modificado la metadata de la página

    @342
    Scenario Outline: Iniciar sesión, crea un miembro, crea un post, cambia el acceso del contenido a solo miembros, valida que el contenido es solo para miembros
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Crea 'un miembro'
        And Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'-Members
        And Con acceso privado
        And Publica el contenido
        When Vuelve al dashboard
        And Navega al menu de 'post'
        Then Visualizar contenido de miembros

    @342
    Scenario: Iniciar sesión, crear un miembro, editar miembro, validar cambio en miembro
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Crea 'un miembro'
        And Navega a la seccion principal
        When Navega al menu de 'members'
        And Buscar el miembro
        Then Editar miembro
        And Navega a la seccion principal
        When Navega al menu de 'members'
        And Buscar el miembro
        Then Visualiza que el miembro se edito correctamente

    @342
    Scenario: Inicar sesion, crear miembro, cambiar valor del newsletter, validar que se actualizo correctamente
        Given Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Crea un miembro con newsletters desactivado
        And Navega a la seccion principal
        When Navega al menu de 'members'
        And Buscar el miembro
        Then Visualiza que el miembro se creo correctamente
