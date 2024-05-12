Feature: Escearios Regresion

    @ES01
    Scenario Outline: Inicio Sesion - Cambiar Tema - Crear un articulo - Visualizar articulo
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Cambia el tema
        Then Visualiza que el tema cambio
        When Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES03
    Scenario Outline: Inicio Sesion - Crear Etiqueta - Crear un articulo - Visualizar articulo
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
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

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES05
    Scenario Outline: Iniciar sesion - programar un articulo - validar que se programe correctamente
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'post'
        And Crea 'un articulo'
        And Con titulo Prueba-'post'
        And Programa el contenido
        And Vuelve al dashboard
        And Navega al menu de 'post'
        Then Visualiza que el contenido se ha programado correctamente

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES09
    Scenario Outline: Iniciar sesion - borrar un post - validar que el post fue eliminado
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'post'
        And Selecciona un post para editar
        And Abre la configuracion del Post
        And Borra el post
        And Vuelve al dashboard
        And Navega al menu de 'post'
        Then Verifica que el post fue eliminado

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES012
    Scenario Outline: Iniciar sesión, crear metadata para google, validar que la etiqueta esté bien creada
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        When Edita metadata de la pagina
        Then Valida que se haya modificado la metadata de la página

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES016
    Scenario Outline: Iniciar sesión, crea un miembro, crea un post, cambia el acceso del contenido a solo miembros, valida que el contenido es solo para miembros
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
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

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES017
    Scenario Outline: Iniciar sesión, crea un miembro, crea una pagina , cambia el acceso de la pagina a solo miembros, valida que la pagina es solo para miembros
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
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

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES018
    Scenario Outline: Iniciar sesión, crear un miembro, editar miembro, validar cambio en miembro
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
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

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES019
    Scenario Outline: Iniciar sesión, crear un miembro, eliminar miembro, validar que el miembro fue eliminado
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Crea 'un miembro'
        And Vuelve al dashboard
        When Navega al menu de 'members'
        And Buscar el miembro
        Then Eliminar miembro
        And Vuelve al dashboard
        When Navega al menu de 'members'
        Then Visualiza que el miembro se elimino

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |

    @ES020
    Scenario Outline: Inicar sesion, crear miembro, cambiar valor del newsletter, validar que se actualizo correctamente
        Given Se esta usando la version '<version>' de Ghost
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Crea un miembro con newsletters desactivado
        And Navega a la seccion principal
        When Navega al menu de 'members'
        And Buscar el miembro
        Then Visualiza que el miembro se creo correctamente

        Examples:
            | version |
            | 3.42.0  |
            | 5.80.0  |
