@user1 @web
  Scenario Outline: Inicio Sesion - Modifico el acceso a los post- visualizar que la configuracion quedó aplicada
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega a settings
      And Ingresa en 'Access'
      And Selecciona en 'Default post access' que tipo de acceso tendrá el publico al sitio
      And Guarda los cambios
      Then Verifica que la modificacion quedó efectuada
      And I wait for 2 seconds

      Examples:
          | nuevo-contenido | menu |
      
