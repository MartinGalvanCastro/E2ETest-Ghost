Feature: Editar Metadata

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
