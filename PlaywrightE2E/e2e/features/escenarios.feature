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