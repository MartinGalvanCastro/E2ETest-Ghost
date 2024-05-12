const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const path = require('path');

const { viewportHeight, viewportWidth, browsers, options } = config;
const dir = './results/ES01';
const files = fs.readdirSync(dir);
const images = files
  .filter(file => path.extname(file).toLowerCase() === '.png')
  .slice(0, Math.floor(files.length / 2));;
console.log('images', images);

async function executeTest() {
  if (browsers.length === 0) {
    return;
  }
  let resultInfo = {}
  let datetime = new Date().toISOString().replace(/:/g, ".");

  for (b of browsers) {
    if (!b in ['chromium', 'webkit', 'firefox']) {
      return;
    }
    if (!fs.existsSync(`./results/ES01`)) {
      fs.mkdirSync(`./results/ES01`, { recursive: true });
    }

    for (let img = 0; img < images.length; img++) {

      const data = await compareImages(
        fs.readFileSync(`./results/ES01/before-${img}.png`),
        fs.readFileSync(`./results/ES01/after-${img}.png`),
        options
      );
      resultInfo[b] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./results/ES01/compare-${img}.png`, data.getBuffer());
    }
  }

  fs.writeFileSync(`./results/ES01/report.html`, createReport(datetime, resultInfo));
  fs.copyFileSync('./index.css', `./results/ES01/index.css`);
  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return resultInfo;
}
(async () => console.log(await executeTest()))();
function browser(b, info, index) {
  return `<div class=" browser" id="test0">
  <div class=" btitle">
      <h2>Browser: ${b}</h2>
      <p>Data: ${JSON.stringify(info)}</p>
  </div>
  ${images.map((img, index) =>

    `<div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="before-${index}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="after-${index}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare-${index}.png" id="diffImage" label="Diff">
    </div>
  </div>`
  )
    }
</div>`
}

function createReport(datetime, resInfo) {
  return `
  <html>
      <head>
          <title> VRT Report </title>
          <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1>Report for 
               <a href="${config.url}"> ${config.url}</a>
          </h1>
          <p>Executed: ${datetime}</p>
          <div id="visualizer">
              ${config.browsers.map((b, index) => browser(b, resInfo[b], index))}
          </div>
      </body>
  </html>`
}