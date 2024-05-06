@user1 @web
  Scenario Outline: Inicio Sesion - Cambiar Tema - Crear Contenido - Visualizar Contenido
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Cambia el tema
      Then Visualiza que el tema cambio
      When Navega al menu de '<menu>'
      And Crea '<nuevo-contenido>'
      And Con titulo Prueba-'<menu>'
      And Publica el contenido
      Then Verifica que el contenido se visualiza de manera correcta
      And I wait for 2 seconds

      Examples:
          | nuevo-contenido | menu |
          | un articulo     | post |
