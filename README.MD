# E2E Test Ghost

Repositorio con pruebas E2E sobre un despliegue de Ghost en Render
URL del despligue: https://ghost-al42.onrender.com

Video Entega Semana 6:

## Miembros del grupo:

- Martin Galvan - md.galvan@uniandes.edu.co
- Julian Roa - ja.roav1@uniandes.edu.co
- Diego Fonseca - da.fonseca@uniandes.edu.co
- Juan Sebastián Cervantes Restrepo - js.cervantes@uniandes.edu.co

## Detalles Por Entrega

- Entrega 5: https://github.com/MartinGalvanCastro/E2ETest-Ghost/wiki
- Entrega 6:

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

  - Como Correr:
  1. Instalar dependencias (Desde la carpeta KrakenE2E)
    ```bash
    npm install
    ```
  2. Ejecutar las pruebas:
    ```bash
    npx kraken-node run
    ```
## Pruebas de Regresion:
- Obtener Imagenes

Nota: En caso de usar npm, remplazar `yarn` por `npm run`
1. Seguir los mismos del 1 al 2 de Playwright
2. Desde la carpeta PlaywrightE2E ejecutar el comando:
   ```bash
   yarn regresion
   ```
3. Si se desea eliminar capturas pasadas, esta el comando:
   ```bash
    yarn clean:regresion
   ```
4. Para generar los reportes, primero instalar las dependencias. (Se tiene que correr desde la carperta Resemble)
  ```bash
  npm install
  ```
5. Ejecutar el reporte:
   ```bash
   npm run start
   ```

 - Reporte en Backstop:
 1. Ir a la carpeta de backstop
 2. Instalar dependencias 
 ```bash
 yarn install # O npm install
 ```
 3. Setear las referencias
 ```bash
 yarn set_ref # O npm run set_ref
 ```
 4. Generar comparaciones:
 ```bash
 yarn run_reg # O npm run run_reg
 ```

  - Reporte en Resemble:
  1. Ir a la carpeta de resemble
  2. Instalar dependencias 
    ```bash
    yarn install # O npm install
    ```
  4. Correr la comparacion:
    ```
    yarn start # O npm run start
    ```

## Release:
```
