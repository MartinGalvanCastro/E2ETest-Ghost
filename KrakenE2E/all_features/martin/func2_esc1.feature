@user2 @web
  Scenario Outline: Inicio Sesion - Crear Etiqueta - Crear Contenido - Visualizar Contenido
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      Then Visualiza el dashboard de administrador
      When Navega al menu de 'etiqueta'
      And Crea 'una etiqueta'
      And Tiene nombre aleatorio
      Then Verifica que la etiqueta se cree correctamente
      When Navega al menu de '<menu>'
      And Crea '<nuevo-contenido>'
      And Con titulo Prueba-'<menu>'
      And Publica el contenido
      Then Verifica que el contenido se visualiza de manera correcta

      Examples:
            | nuevo-contenido | menu |
            | una pagina      | page |
