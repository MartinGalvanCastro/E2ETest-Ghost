Feature: Escenario
  
  @user1 @web
  Scenario Outline: Iniciar sesión,  editar miembro, validar cambio en miembro, validar contenido solo a miembros.
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
          | un miembro      | Members |


