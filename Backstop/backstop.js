const path = require("path");
const fs = require("fs");
const _ = require("lodash");

//Config Backstop
backstopConfig = {};

//Carpeta actual
const currentFilePath = __dirname;

// Raiz del projecto
const root_dir = path.dirname(currentFilePath);

// Carpeta screenshots
const carpeta_screenshots = path.join(root_dir, "screenshots");

// Agrupar escenarios
const escenarios = {};

// Carpetas escenarios -> Agrupar carpetas escenarios
fs.readdirSync(carpeta_screenshots)
  .filter((file) => file !== ".gitkeep")
  .forEach((file) => {
    const escenario = file.split("-")[0];
    if (escenarios[escenario]) {
      escenarios[escenario].push(file);
    } else {
      escenarios[escenario] = [file];
    }
  });

for (const escenario in escenarios) {
  console.log(escenario);
  const [ruta_fotos_before, ruta_fotos_after] = escenarios[escenario].map(
    (ruta) => path.join(carpeta_screenshots, ruta)
  );
  const [fotos_before, fotos_after] = [ruta_fotos_before, ruta_fotos_after].map(
    (folder) => fs.readdirSync(folder)
  );
  _.zip(fotos_before, fotos_after).forEach(([foto_before, foto_after]) => {
    console.log(path.join(ruta_fotos_before, foto_before));
    console.log(path.join(ruta_fotos_after, foto_after));
    console.log(
      "----------------------------------------------------------------"
    );
  });
  console.log("==================================================");
}

//Exportar
module.exports = backstopConfig;
