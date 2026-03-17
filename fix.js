const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');
let idx = css.indexOf('.world-map-image {');
if (idx !== -1) {
   let endIdx = css.indexOf('}', idx);
   let block = css.substring(idx, endIdx);
   let newBlock = block.replace('pointer-events: none;', 'pointer-events: auto;');
   css = css.substring(0, idx) + newBlock + css.substring(endIdx);
   fs.writeFileSync('styles.css', css);
   console.log('Fixed CSS world-map-image pointer-events!');
}
