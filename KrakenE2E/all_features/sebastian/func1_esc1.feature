  @user1 @web
  Scenario Outline: Iniciar sesión, visualiza el dashboard,navegar a metadadata, crear metadata google, validar que la etiqueta esté bien creada
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      And Ir a settings
      And I wait for 2 seconds
      And Ir a metadata
      And I wait for 2 seconds
      Then Ingresar texto en Meta title
      And I wait for 2 seconds
      Then Guardar informacion
