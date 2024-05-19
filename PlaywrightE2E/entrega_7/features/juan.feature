Feature: Escenarios Juan Sebastian

  @ignore
  Scenario: Ingresar en el campo de locksite una contraseña de 5 caracteres, despues de habilitar la contraseña
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de locksite está cargado
    And el usuario hace clic en el botón "Edit" de locksite
    Then el usuario hace click en habilitar contraseña
    And el usuario ingresa una contraseña de 5 caracteres
    Then el usuario presiona el botón "Save" de locksite

  @ignore
  Scenario: Ingresar en el campo de locksite una contraseña de 65535 caracteres, despues de habilitar la contraseña
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de locksite está cargado
    And el usuario hace clic en el botón "Edit" de locksite
    Then el usuario hace click en habilitar contraseña
    And el usuario ingresa una contraseña de 65535 caracteres
    Then el usuario presiona el botón "Save" de locksite

  @ignore
  Scenario: Ingresar en el campo de locksite una contraseña de 0 caracteres, despues de habilitar la contraseña
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de locksite está cargado
    And el usuario hace clic en el botón "Edit" de locksite
    Then el usuario hace click en habilitar contraseña
    And el usuario ingresa una contraseña de 0 caracteres
    Then el usuario presiona el botón "Save" de locksite


  Scenario: Veficicar que los campos de Social Accounts, facebook y twitter no contengan caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    And el usuario hace clic en el botón "Edit" de Social Accounts
    And el usuario vacía el campo "https://www.facebook.com/ghost"
    And el usuario vacía el campo "https://twitter.com/ghost"
    Then el usuario presiona el botón "Save" de Social Accounts

  Scenario: Veficicar que los campos de Social Accounts, facebook contenga 10 caracteres y twitter no contenga caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    And el usuario hace clic en el botón "Edit" de Social Accounts
    Then el usuario ingresa "qwertyuiop" en el campo facebook
    And el usuario vacía el campo "https://twitter.com/ghost"
    Then el usuario presiona el botón "Save" de Social Accounts

  Scenario: Veficicar que los campos de Social Accounts, facebook no contenga caracteres y twitter contenga 10 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    And el usuario hace clic en el botón "Edit" de Social Accounts
    And el usuario vacía el campo "https://www.facebook.com/ghost"
    Then el usuario ingresa "qwertyuiop" en el campo twitter
    Then el usuario presiona el botón "Save" de Social Accounts

  Scenario: Veficicar que los campos de Social Accounts, facebook contenga 10 caracteres y twitter contenga 10 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    And el usuario hace clic en el botón "Edit" de Social Accounts
    Then el usuario ingresa "qwertyuiop" en el campo facebook
    Then el usuario ingresa "qwertyuiop" en el campo twitter
    Then el usuario presiona el botón "Save" de Social Accounts

  Scenario: Verificar que Site title y Site description no contengan caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario está cargado
    When el usuario hace clic en el botón "Edit"
    And el usuario vacía el campo "Site title"
    And el usuario vacía el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Verificar la longitud mínima del título del sitio
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario está cargado
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "abcdefghij" en el campo "Site title"
    And el usuario vacía el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Ingresar 150 caracteres en Site title y ninguno en Site description
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw" en el campo "Site title"
    And el usuario vacía el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Ingresar mas de 150 caracteres en Site title y ninguno en Site description
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdws" en el campo "Site title"
    And el usuario vacía el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Dejar Site Title vacío y Site Description con 10 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "" en el campo "Site title"
    And el usuario ingresa "1234567890" en el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Dejar Site Title vacío y Site Description con 200 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "" en el campo "Site title"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw adipiscing elit. jdwddwdwdwdwdwLorem ipsum dolori" en el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Dejar Site Title vacío y Site Description con mas de 200 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "" en el campo "Site title"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw adipiscing elit. jdwddwdwdwdwdwLorem ipsum doloris" en el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Dejar Site Title con mas de 150 caracteres y Site Description con mas de 200 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdws" en el campo "Site title"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw adipiscing elit. jdwddwdwdwdwdwLorem ipsum doloris" en el campo "Site description"
    And el usuario guarda los cambios

  Scenario: Dejar Site Title con 150 caracteres y Site Description con 200 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    When el usuario hace clic en el botón "Edit"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw" en el campo "Site title"
    And el usuario ingresa "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at tortor velitdLorem ipsum dolor sit amet, consectetur adipiscing elit. jdwddwdwdwdwdw adipiscing elit. jdwddwdwdwdwdwLorem ipsum dolori" en el campo "Site description"
    And el usuario guarda los cambios


  Scenario: Ingresar en el campo de Language ningun caracter
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de language está cargado
    When el usuario hace clic en el botón "Edit" de Language
    Then el usuario ingresa "" en el campo de language
    And el usuario presiona el botón "Save" de Language

  Scenario: Ingresar en el campo de Language las letras "en" para poner el idioma en ingles
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de language está cargado
    When el usuario hace clic en el botón "Edit" de Language
    Then el usuario ingresa "en" en el campo de language
    And el usuario presiona el botón "Save" de Language

  Scenario: Ingresar en el campo de Language 65535 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de language está cargado
    When el usuario hace clic en el botón "Edit" de Language
    Then el usuario ingresa 65535 caracteres en el campo de language
    And el usuario presiona el botón "Save" de Language

  Scenario: Ingresar en el campo de Language 65536 caracteres
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de language está cargado
    When el usuario hace clic en el botón "Edit" de Language
    Then el usuario ingresa 65536 caracteres en el campo de language
    And el usuario presiona el botón "Save" de Language

  Scenario: Ingresar en el campo de Metadata ningun caracter en meta title y ningun caracter en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario deja Meta title vacío
    Then el usuario deja Meta description vacío
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 10 caracteres en meta title y ningun caracter en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 10 caracteres Meta title
    Then el usuario deja Meta description vacío
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 10 caracteres en meta title y 10 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 10 caracteres Meta title
    Then el usuario pone 10 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata ningun caracter en meta title y 10 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario deja Meta title vacío
    Then el usuario pone 10 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 300 caracteres en meta title y 10 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 300 caracteres Meta title
    Then el usuario pone 10 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 10 caracteres en meta title y 500 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 10 caracteres Meta title
    Then el usuario pone 500 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 300 caracteres en meta title y 500 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 300 caracteres Meta title
    Then el usuario pone 500 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 301 caracteres en meta title y 500 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 301 caracteres Meta title
    Then el usuario pone 500 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 301 caracteres en meta title y 501 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 301 caracteres Meta title
    Then el usuario pone 501 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

  Scenario: Ingresar en el campo de Metadata 300 caracteres en meta title y 501 caracteres en meta description
    Given el usuario inicia sesión y navega a la página de configuración
    Then el formulario de Metadata está cargado
    Then el usuario hace clic en el botón "Edit" de Metadata
    And el usuario pone 300 caracteres Meta title
    Then el usuario pone 501 caracteres Meta description
    And el usuario presiona el botón "Save" de Metadata

