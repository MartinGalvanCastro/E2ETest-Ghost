@user3 @web
  Scenario Outline: Iniciar sesion - programar un contenido - validar que se programe correctamente
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega al menu de '<menu>'
      And Crea '<nuevo-contenido>'
      And Con titulo Prueba-'<menu>'
      And Programa el contenido
      Given I navigate to page "<DASHBOARD>"
      And Navega al menu de '<menu>'
      Then Visualiza que el contenido se ha programado correctamente
      And I wait for 3 seconds

      Examples:
            | nuevo-contenido | menu |
            | una pagina      | page |
