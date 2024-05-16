Feature: Escenarios Martin

    # 7 Escenarios
    Scenario Outline: Inicio de Sesion con datos a-priori
        Given Un usuario que desea iniciar sesion
        When Ingresa '<correo>' en el campo correo
        And Ingresa '<contrasenia>' en el campo contrasenia
        Then El inicio de sesion es '<resultado>'

        Examples:
            | correo                       | contrasenia       | resultado |
            | md.galvan@uniandes.edu.co    | Grupo16!@123123   | exitoso   |
            | md.galvan@uniandes.edu.co    | noEslaContrasenia | fallido   |
            | md.galvan@uniandes.edu.co    |                   | fallido   |
            | noEsUnCorreo                 | Grupo16!@123123   | fallido   |
            | noEsUnCorreo@uniandes.edu.co | Grupo16!@123123   | fallido   |
            | noEsUnCorreo@uniandes.edu.co | noEslaContrasenia | fallido   |
            |                              |                   | fallido   |

    # 1 Escenario
    Scenario: Inicio de Sesion con datos aleatorios
        Given Un usuario que desea iniciar sesion
        When Ingresa un correo y contrasenia aleatorios
        Then El inicio de sesion es 'fallido'

    # 8 Escenarios
    Scenario Outline: Creacion de un miembro con y sin campos opcionales
        Given Un administrador inicia sesion
        When Navega al menu de 'Members'
        And Crea un nuevo miembro
        And Ingresa un nombre aleatorio
        And Ingresa un correo aleatorio
        And '<ingresaLabel>' ingresa un label
        And '<ingresaNote>' ingresa una note
        And '<estaHabilidado>' habilia los newsletter
        And Guarda el miembro
        Then El miembro es guardado con 'exito'

        Examples:
            | ingresaLabel | ingresaNote | estaHabilidado |
            | No           | No          | No             |
            | No           | No          | Si             |
            | No           | Si          | No             |
            | No           | Si          | Si             |
            | Si           | No          | No             |
            | Si           | No          | Si             |
            | Si           | Si          | No             |
            | Si           | Si          | Si             |

    # 5 Escenarios
    Scenario Outline: Creacion de un miembro con datos a-priori
        Given Un administrador inicia sesion
        When Navega al menu de 'Members'
        And Crea un nuevo miembro
        And Ingresa '<nombre>' en el campo de nombre
        And Ingresa '<correo>' en el campo de correo
        And Guarda el miembro
        Then El miembro es guardado con '<resultado>'

        Examples:
            | nombre                          | correo            | resultado |
            | Un Nombre                       | correo@correo.com | exito     |
            |                                 | correo@correo.com | exito     |
            | Un Nombre                       |                   | fallido   |
            | Un Nombre                       | noEsUnCorreo      | fallido   |
            |                                 |                   | fallido   |
            | NómbréCönC@rãcërêsEsp3ciâles!$* | correo@correo.com | extio     |

    # 1 Escenario
    Scenario: Creacion de un miembro con correo ya registrado
        Given Un administrador inicia sesion
        When Navega al menu de 'Members'
        And Crea un nuevo miembro con un correo que ya esta registrado
        And Guarda el miembro
        Then El miembro es guardado con 'fallido'

    # 1 Scenario
    Scenario: Creacion de un miembro con notes mayor a 500 caracteres
        Given Un administrador inicia sesion
        When Navega al menu de 'Members'
        And Crea un nuevo miembro
        And Ingresa un nombre aleatorio
        And Ingresa un correo aleatorio
        And Notes con mas de 500 caracteres
        And Guarda el miembro
        Then El miembro es guardado con 'fallido'


    # 9 Escenarios
    Scenario Outline: Se debe poder navegar correctamente hacia '<menu>'
        Given Un administrador inicia sesion
        When Navega al menu de '<menu>'
        Then Debe poder ver la pagina de '<menu>' correctamentente

        Examples:
            | menu      |
            | View site |
            | Explore   |
            | Post      |
            | Pages     |
            | Tags      |
            | Members   |
            | Settings  |
            | Profile   |
            | Dashboard |