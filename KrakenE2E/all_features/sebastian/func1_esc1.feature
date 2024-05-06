@user1 @web
  Scenario Outline: Iniciar sesión - crear metadata para google - validar que la etiqueta esté bien creada
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega a settings
      And Ingresa en el item 'metadata'
      Then Ingresa la información a la etiqueta metadata
      And guardo los cambios
      And I wait for 4 seconds
      Then Visualiza que la etiqueta quedó bien guardada
      And I wait for 4 seconds

      Examples:
          | nuevo-contenido | menu |
   