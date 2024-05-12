Feature: Escearios Version 5.80.0

  Background:
    Given Se esta usando la version '5.80.0' de Ghost

  @580 @ES01 @REG
  Scenario: Inicio Sesion - Cambiar Tema - Crear una pagina - Visualizar pagina
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Cambia el tema
    Then Visualiza que el tema cambio
    When Navega al menu de 'page'
    And Crea 'una pagina'
    And Con titulo Prueba-'page'
    And Publica el contenido
    Then Verifica que el contenido se visualiza de manera correcta

  @580 @ES02
  Scenario: Inicio Sesion - Cambiar Tema - Crear un articulo - Visualizar articulo
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

  @580 @ES03 @REG
  Scenario: Inicio Sesion - Crear Etiqueta - Crear una pagina - Visualizar la pagina
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'etiqueta'
    And Crea 'una etiqueta'
    And Tiene nombre aleatorio
    Then Verifica que la etiqueta se cree correctamente
    When Navega al menu de 'page'
    And Crea 'una pagina'
    And Con titulo Prueba-'page'
    And Publica el contenido
    Then Verifica que el contenido se visualiza de manera correcta

  @580 @ES04
  Scenario: Inicio Sesion - Crear Etiqueta - Crear un articulo - Visualizar articulo
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

  @580 @ES05 @REG
  Scenario: Iniciar sesion - programar una pagina - validar que se programe correctamente
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'page'
    And Crea 'una pagina'
    And Con titulo Prueba-'page'
    And Programa el contenido
    And Vuelve al dashboard
    And Navega al menu de 'page'
    Then Visualiza que el contenido se ha programado correctamente

  @580 @ES06
  Scenario: Iniciar sesion - programar un articulo - validar que se programe correctamente
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

  @580 @ES09 @REG
  Scenario: Iniciar sesion - borrar un post - validar que el post fue eliminado
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'post'
    And Selecciona un post para editar
    And Abre la configuracion del Post
    And Borra el post
    And Vuelve al dashboard
    And Navega al menu de 'post'
    Then Verifica que el post fue eliminado

  @580 @ES07 @ES08 @ES010 @ES011
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

  @580 @ES012 @REG
  Scenario: Iniciar sesión, crear metadata para google, validar que la etiqueta esté bien creada
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'settings'
    When Edita metadata de la pagina
    Then Valida que se haya modificado la metadata de la página

  @580 @ES013
  Scenario: Inicio sesion, hacer un sitio privado, visualizar sitio privado
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'page'
    When seleccionar la primera página del listado de páginas
    When seleccionar el boton settings
    When seleccionar el desplegable de acceso a la pagina
    When Esperar '5000'

    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'post'
    And Selecciona un post para editar
    And Abre la configuracion del Post
    And Borra el post
    And Vuelve al dashboard
    And Navega al menu de 'post'
    Then Verifica que el post fue eliminado

  @580 @ES014
  Scenario: Inicio sesión, ingreso la información de redes sociales, visualizar que las redes sociales esten bien configuradas
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'settings'
    When Esperar '3000'
    Then Verificar que las redes sociales esten bien configuradas

  @580 @ES016 @REG
  Scenario: Inicio sesión, Modifico el acceso a los post, visualizar que la configuracion quedó aplicada
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'publish'
    When seleccionar la primera página del listado de páginas
    When seleccionar el boton settings
    When seleccionar el desplegable de acceso a la pagina
    When seleccionar el boton settings
    When Dar clic en el boton de actualizar
    And Vuelve al dashboard
    When Navega al menu de 'publish'
    When seleccionar la primera página del listado de páginas
    When seleccionar el boton settings
    Then Verifica que el acceso a la pagina sea para solo miembros
    When Esperar '5000'

  @580 @ES017 @REG
  Scenario: Iniciar sesión, crea un miembro, crea una pagina , cambia el acceso de la pagina a solo miembros, valida que la pagina es solo para miembros
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea 'un miembro'
    And Navega al menu de 'page'
    And Crea 'una pagina'
    And Con titulo Prueba-'page'-Members
    And Con acceso privado
    And Publica el contenido
    When Vuelve al dashboard
    And Navega al menu de 'page'
    Then Visualizar contenido de miembros

  @580 @ES018 @REG
  Scenario: Iniciar sesión, crear un miembro, editar miembro, validar cambio en miembro
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea 'un miembro'
    When Navega al menu de 'members'
    And Buscar el miembro
    Then Editar miembro
    When Navega al menu de 'members'
    And Buscar el miembro
    Then Visualiza que el miembro se edito correctamente

  @580 @ES019 @REG
  Scenario: Iniciar sesión, crear un miembro, eliminar miembro, validar que el miembro fue eliminado
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea 'un miembro'
    When Navega al menu de 'members'
    And Buscar el miembro
    Then Eliminar miembro
    When Navega al menu de 'members'
    Then Visualiza que el miembro se elimino

  @580 @ES020 @REG
  Scenario: Inicar sesion, crear miembro, cambiar valor del newsletter, validar que se actualizo correctamente
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea un miembro con newsletters desactivado
    When Navega al menu de 'members'
    And Buscar el miembro
    Then Visualiza que el miembro se creo correctamente

