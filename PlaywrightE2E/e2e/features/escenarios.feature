Feature: Escearios
    
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
    
    @only
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


    