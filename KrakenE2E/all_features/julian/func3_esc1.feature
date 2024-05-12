@user1 @web
  Scenario Outline: Iniciar sesión, borrar etiqueta, validar post sin etiqueta en admin
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Entra a tags
      And Selecciona un tag
      Then Elimina el tag
      And I wait for 2 seconds
      And Confirma eliminacion
