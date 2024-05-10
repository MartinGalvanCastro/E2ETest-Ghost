Feature: Escearios Version 5.80.0

  Background:
    Given Se esta usando la version 5.80.0 de Ghost

  Scenario Outline: Inicio Sesion - Cambiar Tema - Crear Contenido - Visualizar Contenido
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Cambia el tema
    Then Visualiza que el tema cambio
    When Navega al menu de '<menu>'
    And Crea '<nuevo-contenido>'
    And Con titulo Prueba-'<menu>'
    And Publica el contenido
    Then Verifica que el contenido se visualiza de manera correcta

    Examples:
      | nuevo-contenido | menu |
      | una pagina      | page |
      | un articulo     | post |

  Scenario Outline: Inicio Sesion - Crear Etiqueta - Crear Contenido - Visualizar Contenido
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'etiqueta'
    And Crea 'una etiqueta'
    And Tiene nombre aleatorio
    Then Verifica que la etiqueta se cree correctamente
    When Navega al menu de '<menu>'
    And Crea '<nuevo-contenido>'
    And Con titulo Prueba-'<menu>'
    And Publica el contenido
    Then Verifica que el contenido se visualiza de manera correcta

    Examples:
      | nuevo-contenido | menu |
      | una pagina      | page |
      | un articulo     | post |

  Scenario Outline: Iniciar sesion - programar un contenido - validar que se programe correctamente
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de '<menu>'
    And Crea '<nuevo-contenido>'
    And Con titulo Prueba-'<menu>'
    And Programa el contenido
    And Vuelve al dashboard
    And Navega al menu de '<menu>'
    Then Visualiza que el contenido se ha programado correctamente

    Examples:
      | nuevo-contenido | menu |
      | una pagina      | page |
      | un articulo     | post |

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

  Scenario Outline: Iniciar sesión, crea un miembro, crea un contenido, cambia el acceso del contenido a solo miembros, valida que el contenido es solo para miembros
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea 'un miembro'
    And Navega al menu de '<menu>'
    And Crea '<nuevo-contenido>'
    And Con titulo Prueba-'<menu>'-Members
    And Con acceso privado
    And Publica el contenido
    When Vuelve al dashboard
    And Navega al menu de '<menu>'
    Then Visualizar contenido de miembros

    Examples:
      | nuevo-contenido | menu |
      | un articulo     | post |
      | una pagina      | page |

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

  Scenario: Inicar sesion, crear miembro, cambiar valor del newsletter, validar que se actualizo correctamente
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'members'
    And Crea un miembro con newsletters desactivado
    When Navega al menu de 'members'
    And Buscar el miembro
    Then Visualiza que el miembro se creo correctamente

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

  Scenario: Inicio sesion, hacer un sitio privado, visualizar sitio privado
    Given Un usuario administrador
    When Inicia sesion
    Then Visualiza el dashboard de administrador
    When Navega al menu de 'page'
    When seleccionar la primera página del listado de páginas
    When seleccionar el boton settings
    When seleccionar el desplegable de acceso a la pagina
    When Esperar '5000'

