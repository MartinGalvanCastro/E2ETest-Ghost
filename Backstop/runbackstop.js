const path = require('path');
const fs = require('fs');
const directoryPath = './../screenshots';
const dir = './results';

let escenarios = fs.readdirSync(directoryPath);

const backstopConfig = {
  id: "backstop_default",
  viewports: [{ label: "desktop", width: 1280, height: 720 }],
  scenarios: [],
  paths: {
    bitmaps_reference: '',
    bitmaps_test: '',
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: { args: ["--no-sandbox", "--allow-file-access-from-files"] },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};


for(let escenario of escenarios) {
  console.log(escenario);


}