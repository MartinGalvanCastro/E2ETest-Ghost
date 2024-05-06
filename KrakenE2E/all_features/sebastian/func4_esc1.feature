@user1 @web
  Scenario Outline: Inicio Sesion - ingreso la informacion de redes sociales- visualizar que las redes sociales esten bien configuradas
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega a settings
      And Ingresa en 'social accounts'
      Then Ingresa la informacion de links de facebook y X
      And guardo la informacion
      Then Verifica que los links se guardaron correctamente
      And I wait for 2 seconds

      Examples:
          | nuevo-contenido | menu |
      
