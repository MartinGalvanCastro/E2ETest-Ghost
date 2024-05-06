@user1 @web
  Scenario Outline: Inicio Sesion - Invitar nuevo personal- visualizar personal administrador
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega a settings
      And Ingresa en 'staff'
      Then Realiza invitacion a los colaboradores deseados
      And Asigna un rol al colaborador
      And Envia la invitacion
      Then Verifica que la invitacion se envia correctamente
      And I wait for 2 seconds

      Examples:
          | nuevo-contenido | menu |
      
