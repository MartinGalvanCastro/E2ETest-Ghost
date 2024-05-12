  @user1 @web
  Scenario Outline: Inicio Sesion, visualizo el dashboard, navego a settings, ingreso los links de redes, guardo la informacion
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      And Ir a settings
      And Ingresa en social accounts
      Then Ingreso link facebook
      Then Ingreso link twitter
      Then Guardar la informacion de links

    