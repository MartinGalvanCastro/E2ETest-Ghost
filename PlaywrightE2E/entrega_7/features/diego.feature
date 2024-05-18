Feature: Escenarios Diego

    # 8 Escenarios
    Scenario Outline: Creacion de un tag con y sin campos opcionales
        Given Un administrador inicia sesion
        When Navega al menu de 'Tags'
        And Crea un nuevo tag
        And Ingresa un nombre aleatorio
        And '<ingresaColor>' ingresa un color
        And '<modificaSlug>' modifica el slug
        And '<ingresaDescripcion>' ingresa una descripcion
        And Guarda el tag 
        Then El tag es guardado con 'exito'

        Examples:
            | ingresaColor | modificaSlug| ingresaDescripcion |
            | Si           | Si          | Si                 |
            | Si           | Si          | No                 |
            | Si           | No          | No                 |
            | No           | No          | No                 |
            | No           | No          | Si                 |
            | No           | Si          | Si                 |
            | No           | Si          | No                 |
            | Si           | No          | Si                 |


    # 2 Escenarios
    Scenario Outline: Creacion de un tag con datos a-priori
        Given Un administrador inicia sesion
        When Navega al menu de 'Tags'
        And Crea un nuevo tag
        And Ingresa '<nombre>' en el campo de nombre
        And Guarda el tag 
        Then El tag es guardado con '<resultado>'

        Examples:
            | nombre                          | resultado |
            | Un nombre de tag                | exito     |
            |                                 | fallido   |

    # 5 Scenario
    Scenario: Creacion de un tag con datos a-priori en el campo color
        Given Un administrador inicia sesion
        When Navega al menu de 'Tags'
        And Crea un nuevo tag
        And Ingresa un nombre aleatorio
        And ingresa el color '<color>'
        And Guarda el tag
        Then El tag es guardado con '<resultado>'

        Examples:
            | color                          | resultado |
            | 5d63b1                         | exito     |
            |                                | exito     |
            | noEsUnColor                    | fallido   |
            | #2f5gd                         | fallido   |
            | 255                            | fallido   |

    # 7 Scenario
    Scenario: Creacion de un tag con casos positivos y negativos en la cantidad de caracteres en nombre y descripcion
        Given Un administrador inicia sesion
        When Navega al menu de 'Tags'
        And Crea un nuevo tag
        And Ingresa un nombre con '<carateresNombre>' caracteres
        And Ingresa una descripcion con '<caracteresDescripcion>' caracteres
        And Guarda el tag
        Then El tag es guardado con '<resultado>'

        Examples:
            | carateresNombre      | caracteresDescripcion |  resultado  |
            | 192                  | 0                     |  fallido    |
            | 192                  | 501                   |  fallido    |
            | 0                    | 501                   |  fallido    |
            | 191                  | 501                   |  fallido    |
            | 0                    | 500                   |  fallido    |
            | 191                  | 500                   |  exitoso    |
            | 191                  | 0                     |  exitoso    |


    # 5 Escenarios
    Scenario Outline: Casos negativos subscribirse a un sitio web
        Given Un usuario lector
        When Intenta subscribirse a un sitio web
        And Con nombre '<nombre>'
        And Con correo '<correo>'
        Then Falla el registro debido a '<razon>'

        Examples:
            | nombre  | correo            | razon                     |
            |         |                   | nombre y correo no valido |
            | ##@@!!! |                   | correo no valido          |
            | nombre  |                   | correo no valido          |
            |         | noEsUnCorreo      | nombre y correo no valido |
            |         | correo@correo.com | nombre no valido          |

# 3 Escenarios
    Scenario Outline: Casos negativos inicio de sesion usuario lector
        Given Un usuario lector
        When Intenta iniciar sesion con el correo '<correo>'
        Then Falla el inicio de sesion '<correo>'

        Examples:
            | correo                                   |
            |                                          |
            | noEsUnCorreo                             |
            | esteCorreoJamasEstaRegistrado@correo.com |