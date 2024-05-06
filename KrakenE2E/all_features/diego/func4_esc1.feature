@user1 @web
  Scenario Outline: Iniciar sesión, crear miembro, buscar miembro, apagar newslatters, guardar cambios.
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega al menu de '<menu>'
      And Crea 'un miembro'
      And Con titulo Prueba-'<menu>'
      And Apagar Newslatter
      And I wait for 4 seconds

      Examples:
          | nuevo-contenido | menu |
