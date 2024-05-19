@julian
Feature: Funcionalidades de Ghost para Crear Post, Crear Page y Editar Perfil

 Background: Inicio de sesion
    Given Un administrador inicia sesion

# 9 Escenarios para Crear Post
  Scenario Outline: Crear Post con diferentes títulos y cuerpos
    When Navega al menu de 'Post'
    And Crea un nuevo post
    And Ingresa '<titulo>' en el campo de título
    And Ingresa '<cuerpo>' en el campo del cuerpo
    And Guarda el post
    Then El post es guardado con '<resultado>'

    Examples:
      | titulo                             | cuerpo                | resultado |
      | Post con título normal           | Contenido del post  | exito     |
      |                                    | Contenido del post  | exito   |
      | Título con caracteres especiales!@#$%^&*()_+<>?\|`~ | Contenido del post  | exito     |
      | Post con título normal           |                     | exito   |
      | Post con título normal           | Contenido con caracteres especiales @$%^&* | exito     |
      | Título con emoji 😊               | Contenido del post  | exito     |
      | Post con número 123              | Contenido del post  | exito     |
      | Post con título duplicado        | Contenido del post  | exito     |
      | Título único                     | Contenido diferente | exito     |


 

 # 1 Escenarios para Crear Post
  Scenario Outline: Crear Post con titulo largo
    When Navega al menu de 'Post'
    And Crea un nuevo post
    And Ingresa 'Post con título normal' en el campo de título
    And Ingresa '<cuerpo>' en el campo del cuerpo
    And Ingresa '<titulo>' en el campo de título
    And Guarda el post
    Then El post es guardado con '<resultado>'

    Examples:
      | titulo                             | cuerpo                | resultado |
      | Título muy largo que excede el límite permitidoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo | Contenido del post | fallido   |



