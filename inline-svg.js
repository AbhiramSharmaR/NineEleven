const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let svg = fs.readFileSync('world-map.svg', 'utf8');
svg = svg.replace(/<\?xml.*?\?>/i, '').replace(/<!DOCTYPE.*?>/gi, '').trim();
svg = svg.replace('<svg ', '<svg class="world-map-image" ');
html = html.replace('<img src="./world-map.svg" alt="Highly Accurate World Map" class="world-map-image">', svg);
fs.writeFileSync('index.html', html);
console.log("Inlined successfully.");
