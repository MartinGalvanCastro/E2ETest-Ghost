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
      | Post con título normal           | Contenido con caracteres especiales @$%^&*!@#$%^&*()_+<>?\|`~ | exito     |
      | Título con emoji 😊               | Contenido del post  | exito     |
      | Post con número 123              | Contenido del post  | exito     |
      | Post con título duplicado        | Contenido del post  | exito     |
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


  # 9 Escenarios para Crear Page
  Scenario Outline: Crear Page con diferentes títulos y cuerpos
    When Navega al menu de 'Pages'
    And Crea una nueva page
    And Ingresa '<titulo>' en el campo de título de pagina
    And Ingresa '<cuerpo>' en el campo del cuerpo
    And Guarda la page
    Then La page es guardada con '<resultado>'

    Examples:
      | titulo                             | cuerpo                | resultado |
      | Page con título normal           | Contenido de la page| exito     |
      |                                  | Contenido de la page| exito   |
      | Título con caracteres especiales !@#$%^&*()_+<>?\|`~ | Contenido de la page| exito     |
      | Page con título normal           |                     | exito   |
      | Page con título normal           | Contenido con caracteres especiales @$%^&*!@#$%^&*()_+<>?\|`~ | exito     |
      | Título con emoji 😊               | Contenido de la page| exito     |
      | Page con número 123              | Contenido de la page| exito     |
      | Page con título duplicado        | Contenido de la page| exito     |
      | Page con título duplicado        | Contenido de la page| exito     |
      | Título único                     | Contenido diferente | exito     |

 # 1 Escenario para Crear Page con titulo largo
  Scenario Outline: Crear Page con diferentes títulos y cuerpos
    When Navega al menu de 'Pages'
    And Crea una nueva page
    And Ingresa 'titulo normal' en el campo de título de pagina
    And Ingresa '<cuerpo>' en el campo del cuerpo
    And Ingresa '<titulo>' en el campo de título de pagina
    And Guarda la page
    Then La page es guardada con '<resultado>'

    Examples:
      | titulo                             | cuerpo                | resultado |
      | Título muy largo que excede el límite permitidoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo | Contenido de la page | fallido   |



  # 10 Escenarios para Editar Perfil
@julian
Scenario Outline: Editar perfil con diferentes datos
  When Navega al menu de 'Profile'
  And Ingresa '<nombre_usuario>' en el campo de nombre de usuario
  And Ingresa '<email>' en el campo de email
  And Guarda los cambios en el perfil
  Then El perfil es actualizado con '<resultado>'

  Examples:
    | nombre_usuario                        | email                               | resultado                   |
    | NuevoUsuario                          | nuevo@correo.com                    | Use real name so people can recognize you |
    |                                       | nuevo@correo.com                    | Name is required            |
    | NombreMuyLargooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooQueExcedeElLimitePermitido | nuevo@correo.com                    | Name is too long            |
    | UsuarioCon@Especial                   | nuevo@correo.com                    | Use real name so people can recognize you |
    | Usuario123                            | nuevo@correo.com                    | Use real name so people can recognize you |
    | Usuario😊                             | nuevo@correo.com                    | Use real name so people can recognize you |
    | NuevoUsuario                          |                                      | Please enter a valid email address |
    | NuevoUsuario                          | correo invalido                     | Please enter a valid email address |
    | NuevoUsuario                          | correo_muy_largoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo_que_excede_el_limite@correo.com | Please enter a valid email address |
    | NuevoUsuario                          | valido@correo.com#$%                | Please enter a valid email address |
