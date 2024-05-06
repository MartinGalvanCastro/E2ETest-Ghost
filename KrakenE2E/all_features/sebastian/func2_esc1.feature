@user1 @web
  Scenario Outline: Inicio Sesion - hacer un sitio privado - visualizar sitio con contraseña
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega a settings
      And Ingresa en 'make site private'
      Then Crea una contraseña para el sitio
      When Navega al dashboard de administrador
      And Ingresa en 'sites'
      Then Ingresa la contraseña creada para visualizar el contenido
      And Visualiza el contenido
      Then Verifica que el contenido se visualiza de manera correcta
      And I wait for 2 seconds

      Examples:
          | nuevo-contenido | menu |
      
