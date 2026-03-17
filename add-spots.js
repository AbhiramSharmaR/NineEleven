const fs = require('fs');

// ==== HTML ====
let html = fs.readFileSync('index.html', 'utf8');

const touristSpots = `
    <!-- 10 Tourist Places Highlights -->
    <g id="tourist-spots">
        <g class="tourist-spot hover-target" data-name="Statue of Liberty" data-desc="Iconic symbol of freedom in New York harbor.">
            <circle cx="230" cy="365" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="230" cy="365" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Machu Picchu" data-desc="Ancient Incan citadel set high in the Andes Mountains.">
            <circle cx="215" cy="520" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="215" cy="520" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Christ the Redeemer" data-desc="Colossal Art Deco statue overlooking Rio de Janeiro.">
            <circle cx="290" cy="590" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="290" cy="590" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Eiffel Tower" data-desc="The iconic wrought-iron lattice tower in Paris.">
            <circle cx="410" cy="385" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="410" cy="385" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Colosseum" data-desc="The largest ancient amphitheatre built in Rome.">
            <circle cx="433" cy="410" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="433" cy="410" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Pyramids of Giza" data-desc="Ancient pyramid complex located in Greater Cairo.">
            <circle cx="470" cy="445" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="470" cy="445" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Taj Mahal" data-desc="An ivory-white marble mausoleum on the river Yamuna.">
            <circle cx="580" cy="465" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="580" cy="465" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Great Wall of China" data-desc="A series of historic fortifications across northern China.">
            <circle cx="655" cy="390" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="655" cy="390" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Mount Fuji" data-desc="Japan's highest mountain and famous cultural icon.">
            <circle cx="718" cy="415" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="718" cy="415" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
        <g class="tourist-spot hover-target" data-name="Sydney Opera House" data-desc="A multi-venue performing arts centre in Sydney harbor.">
            <circle cx="720" cy="645" r="5" fill="#ff4e00" class="dot-core"/>
            <circle cx="720" cy="645" r="5" fill="#ff4e00" class="dot-pulse">
                <animate attributeName="r" values="5;18" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
        </g>
    </g>
`;

if (!html.includes('id="tourist-spots"')) {
    html = html.replace('</g>\n</svg>', '</g>\n' + touristSpots + '\n</svg>');
}

const tooltipHtml = `
    <!-- Tourist Spots Tooltip -->
    <div id="tourist-tooltip" class="tourist-tooltip">
        <h4 id="tt-name">Name</h4>
        <p id="tt-desc">Description</p>
    </div>
`;
if (!html.includes('id="tourist-tooltip"')) {
    html = html.replace('</body>', tooltipHtml + '\n</body>');
}
fs.writeFileSync('index.html', html);

// ==== CSS ====
let css = fs.readFileSync('styles.css', 'utf8');
const touristCss = `
/* --------------------------------------------------------------------------
   10. Tourist Spots specific styles
----------------------------------------------------------------------------- */
.tourist-spot {
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}
.tourist-spot .dot-core {
    transition: fill 0.3s ease, filter 0.3s ease, stroke 0.4s ease;
    stroke: rgba(255, 255, 255, 0.5);
    stroke-width: 1px;
}
.tourist-spot:hover .dot-core {
    fill: #ffffff;
    filter: drop-shadow(0 0 10px rgba(255,255,255,1));
    stroke: #ff4e00;
    stroke-width: 2px;
}
.tourist-tooltip {
    position: fixed;
    top: 0; left: 0;
    background: rgba(8, 8, 8, 0.95);
    border: 1px solid rgba(255, 78, 0, 0.4);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 18px 22px;
    border-radius: 12px;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -100%) translateY(-20px) scale(0.95);
    transition: opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 10000;
    min-width: 220px;
    max-width: 320px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 25px rgba(255, 78, 0, 0.15);
    text-align: center;
}
.tourist-tooltip::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px; height: 12px;
    background: rgba(8, 8, 8, 0.95);
    border-right: 1px solid rgba(255, 78, 0, 0.4);
    border-bottom: 1px solid rgba(255, 78, 0, 0.4);
}
.tourist-tooltip.active {
    opacity: 1;
    transform: translate(-50%, -100%) translateY(-15px) scale(1);
}
.tourist-tooltip h4 {
    color: var(--accent);
    font-size: 1.1rem;
    margin-bottom: 8px;
    font-family: var(--font-heading);
    letter-spacing: 0.5px;
    margin-top: 0;
}
.tourist-tooltip p {
    color: #e5e5e5;
    font-size: 0.85rem;
    line-height: 1.5;
    font-family: var(--font-body);
    margin: 0;
}
`;
if (!css.includes('.tourist-spot {')) {
    fs.appendFileSync('styles.css', '\n' + touristCss);
}

// ==== JS ====
let js = fs.readFileSync('script.js', 'utf8');
const touristJs = `
    // 10. Tourist Spots Hover Logic
    const touristTooltip = document.getElementById('tourist-tooltip');
    const ttName = document.getElementById('tt-name');
    const ttDesc = document.getElementById('tt-desc');
    const touristSpots = document.querySelectorAll('.tourist-spot');

    if(touristTooltip && touristSpots.length > 0) {
        touristSpots.forEach(spot => {
            spot.addEventListener('mouseenter', (e) => {
                const name = spot.getAttribute('data-name');
                const desc = spot.getAttribute('data-desc');
                
                if (ttName) ttName.textContent = name;
                if (ttDesc) ttDesc.textContent = desc;
                
                touristTooltip.classList.add('active');
                
                if (typeof cursor !== 'undefined' && cursor) cursor.classList.add('active');
                if (typeof follower !== 'undefined' && follower) follower.classList.add('active');
            });
            
            spot.addEventListener('mousemove', (e) => {
                touristTooltip.style.left = e.clientX + 'px';
                touristTooltip.style.top = e.clientY + 'px';
            });
            
            spot.addEventListener('mouseleave', () => {
                touristTooltip.classList.remove('active');
                if (typeof cursor !== 'undefined' && cursor) cursor.classList.remove('active');
                if (typeof follower !== 'undefined' && follower) follower.classList.remove('active');
            });
        });
    }
`;

if (!js.includes('10. Tourist Spots Hover Logic')) {
    js = js.replace(/}\);\s*$/, touristJs + '\n});\n');
    fs.writeFileSync('script.js', js);
}

console.log('Successfully injected Tourist Spots!');
