const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const SVG_SRC = path.resolve(__dirname, '../../../orbissystems_brand_guide_all/orbis-app-icon-512.svg');
const ASSETS  = path.resolve(__dirname, '../assets');

function convertSvgToPng(svgPath, outPath, size) {
  const svg = fs.readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outPath, Buffer.from(png));
  console.log(`✓  ${path.basename(outPath)}  (${size}x${size})`);
}

// Expo icon  — 1024x1024
convertSvgToPng(SVG_SRC, path.join(ASSETS, 'icon.png'), 1024);

// Android adaptive icon foreground — 1024x1024
convertSvgToPng(SVG_SRC, path.join(ASSETS, 'adaptive-icon.png'), 1024);

console.log('\nDone — assets/icon.png and assets/adaptive-icon.png created.');
