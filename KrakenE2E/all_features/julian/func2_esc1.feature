@user1 @web
  Scenario Outline:  Iniciar sesión, modificar etiqueta,  validar post con etiqueta modificada en admin
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Entra a tags
      And Selecciona un tag
      Then Modificar tag
