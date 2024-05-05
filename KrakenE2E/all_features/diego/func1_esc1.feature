@user1 @web
  Scenario Outline: Iniciar sesión,  editar miembro, validar cambio en miembro, validar contenido solo a miembros.
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega al menu de 'Members'
      And Crea 'un miembro'
      And Con titulo Prueba-'Members'
      And Navega al menu de '<menu>'
      And Crea 'un articulo'
      And Con titulo Prueba-'<menu>'
      And Publica el contenido
      Given I navigate to page "<POSTS>"
      And Cambia acceso
      Given I navigate to page "<POSTS>"
      Then Visualizar contenido de miembros
      And I wait for 4 seconds

      Examples:
          | nuevo-contenido | menu |
          | un articulo     | post |