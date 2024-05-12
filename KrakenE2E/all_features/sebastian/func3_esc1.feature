  @user1 @web
  Scenario Outline: Inicio Sesion, visualizo el dashboard, navego a settings, ingreso en make site private, presiono el boton de desactivar sitio privado, guardo la informacion y verifico que este bien guardada
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      And Ir a settings
      And Ingresa en make site private
      And I wait for 2 seconds
      Then Presionar botón de desactivar sitio privado
      Then Guardo la informacion para sitio privado
      And I wait for 5 seconds
