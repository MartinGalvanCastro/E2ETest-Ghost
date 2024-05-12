@user1 @web
  Scenario Outline: Inicio Sesion, visualizo el dashboard, navego a settings, ingreso en access, modifico el acceso a los post, visualizar que la configuracion quedó aplicada
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      And Ir a settings
      And Ingresa en Access
      And I wait for 5 seconds
