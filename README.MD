# E2E Test Ghost

Repositorio con pruebas E2E sobre un despliegue de Ghost en Render
URL del despligue: https://ghost-al42.onrender.com

## Miembros del grupo:

- Martin Galvan - md.galvan@uniandes.edu.co
- Julian Roa - ja.roav1@uniandes.edu.co
- Diego Fonseca - da.fonseca@uniandes.edu.co
- Juan Sebastián Cervantes Restrepo - js.cervantes@uniandes.edu.co

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
# Proyecto Base de Automatización Kraken

Este es un proyecto base para automatización de pruebas utilizando Kraken-Node.

## Pasos para crear el proyecto base:

1. Desinstala las versiones globales de las herramientas que puedan estar instaladas:

   ```bash
   npm uninstall -g android-platform-tools
   npm uninstall -g @cucumber/cucumber
   npm uninstall -g kraken-node
   npm uninstall -g appium
   ```

2. Inicializa un nuevo proyecto npm:

   ```bash
   npm init -y
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install kraken-node
   npm install android-platform-tools
   npm install appium
   ```

4. Genera el esqueleto del proyecto con Kraken-Node:
   ```bash
   npx kraken-node gen
   ```

## Para ejecutar:

Ejecuta las pruebas con el siguiente comando:
```bash
npx kraken-node run
1. Instalar dependencias (Desde la carpeta KrakenE2E)
```bash
npm install
```
2. Ejecutar comando
```bash
npx kraken-node run
```


## Release:
```
