# Playwrigth E2E

## Requierimientos:
- Node 20.12.2
- yarn 1.22.19 o npm 10.5.0 (Se recomienda yarn)
  
## Como correr?
1. Instalar Dependencias
```bash
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