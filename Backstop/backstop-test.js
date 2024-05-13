const path = require("path");
const fs = require("fs");
const _ = require("lodash");

//Config Backstop
backstopConfig = {
  id: "backstop_default",
  viewports: [
    {
      label: "default",
      width: 800,
      height: 600,
    },
  ],
  onBeforeScript: "puppet/onBefore.js",
  onReadyScript: "puppet/onReady.js",
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  scenarios: [],
};

//Carpeta actual
const currentFilePath = __dirname;

// Raiz del projecto
const root_dir = path.dirname(currentFilePath);

// Carpeta screenshots
const carpeta_screenshots = path.join(root_dir, "screenshots");

// Agrupar escenarios
const escenarios = [];

// Carpetas escenarios -> Agrupar carpetas escenarios
fs.readdirSync(carpeta_screenshots)
  .filter((file) => file !== ".gitkeep")
  //La version antigua
  .filter((file) => file.includes("v3.42.0"))
  .forEach((file) => {
    escenarios.push(path.join(carpeta_screenshots, file));
  });
const regex = /[^\\]+$/;

escenarios.forEach((carpeta_escenario) => {
  const label = carpeta_escenario.match(regex)[0].split("-")[0];
  const fotos = fs.readdirSync(carpeta_escenario);
  fotos.forEach((carpeta_fotos, idx) => {
    const rutaFotoBefore = path.join(carpeta_escenario, carpeta_fotos);
    backstopConfig.scenarios.push({
      label: `${label}-step-${idx}`,
      url: rutaFotoBefore,
      hideSelectors: [],
      removeSelectors: [],
      selectors: ["document"],
      readyEvent: null,
      delay: 500,
      misMatchThreshold: 0.1,
    });
  });
});

//Exportar
module.exports = backstopConfig;
