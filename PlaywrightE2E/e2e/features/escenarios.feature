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
