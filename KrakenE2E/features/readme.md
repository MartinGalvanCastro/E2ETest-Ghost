# Proyecto Base de Automatización

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
