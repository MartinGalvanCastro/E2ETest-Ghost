# E2E Test Ghost

Repositorio con pruebas E2E sobre un despliegue de Ghost en Render
URL del despligue: https://ghost-al42.onrender.com

## Miembros del grupo:
- Martin Galvan - md.galvan@uniandes.edu.co
-
-
-


## Funcionalidades y Escenarios desarolladas:
https://github.com/MartinGalvanCastro/E2ETest-Ghost/wiki


## Instrucciones de instalacion:
- Playwright:

  - Requierimientos:
    - Node 20.12.2
    - yarn 1.22.19 o npm 10.5.0 (Se recomienda yarn)
  
  - Como correr?
    Los comandos se deben correr desde la carpeta PlaywrightE2E

    1. Instalar Dependencias
    ```bash
    cd PlaywrightE2E # En caso de no estar en la carpeta
    yarn # O npm install
    ```

    2. Crear archivo .env con la siguiente info:
    ```
    ADMIN_USER='md.galvan@uniandes.edu.co'
    ADMIN_PASS='Grupo16!@123123'
    ```

    3. Correr (En caso de usar npm, remplazar yarn por npm run)
    ```bash
    yarn cucumber # Correr sin abrir navegador
    yarn cucumber:headed # Correr abriendo un navegador
    ```
  
- Kraken:
  - Requerimientos:
  - Como correr?

## Release:
