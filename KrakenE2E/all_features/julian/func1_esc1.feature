@user1 @web
  Scenario Outline: Iniciar sesión, crear post, crear etiqueta, asignar etiqueta a post, validar post con etiqueta en admin
      Given I navigate to page "<URL>"
      And I wait for 2 seconds
      When Inicia sesion
      When Entra a post
      Then Crea post
      And I wait for 2 seconds
      Then Agrega descripcion
      And I wait for 2 seconds
      Then Guardar post
      Then Publicar post
      Then Confirmar post

