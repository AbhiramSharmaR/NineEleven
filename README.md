# Wanderlust: The Virtual Symphony 🌍✨

A meticulously crafted frontend experience built entirely from scratch with **Vanilla HTML, CSS, and JavaScript**. Designed to push the boundaries of modern aesthetics and interactivity using the concept of vibe coding with the target set to be built and deployed in 90 minutes. With our theme given to be "travel and world discovery", Wanderlust serves as an immersive digital portal for curated, world-class travel discovery.

## 🚀 The Challenge

This project was built under strict constraints:
- **No Frameworks:** No React, Vue, Angular, or any JavaScript library.
- **No External Libraries:** No GSAP, Three.js, Bootstrap, or TailwindCSS.
- **Pure Code:** 100% bespoke Vanilla CSS & JavaScript.

Everything from the high-fidelity animations, 3D CSS physics, to the fluid drag interactions were mathematically plotted and written manually.

## 🎨 Immersive Features & Interactions

1. **Parallax Hero with 3D Typography**
   The hero banner features a depth-accurate parallax engine. Titles are constructed using CSS `transform-style: preserve-3d` and cast shifting shadows that react in real-time to the user's cursor position.

2. **Magnetic Cursor Architecture**
   Bypasses the default system cursor in favor of a dual-element custom cursor with magnetic pull. Buttons physically "attract" and snap to the cursor when hovered, creating a fluid, premium tactile feel.

3. **"Deep Insights" Tilt Cards**
   Information cards that employ full 3D spacial tilting (`perspective`). Each card reacts to the exact X/Y coordinate of the cursor traversing over it, complete with a dynamic, glossy light-reflection overlay (`gloss-overlay`). Hovering reveals a reverse face via smooth CSS `rotateY` transforms, showcasing staggered micro-animations.

4. **Interactive SVG World Map**
   A seamless vector world map featuring animated pulse markers pointing to key global destinations (USA, Brazil, France, India, Japan). Clicking an interactive node produces a smooth CSS-driven translation (`translateY` & `scale`), highlighting the destination while gracefully unfurling a floating glassmorphic information card with the country's flag. The map ensures mutually exclusive selections powered by native JS DOM manipulation.

5. **Scroll-Driven Reveal Engine**
   Employs the native `IntersectionObserver API` to orchestrate performant, staggered entrance animations (`reveal-up`) as elements scroll into the viewport, ensuring zero drop in framerate and a highly cinematic scroll experience.

6. **Glassmorphism & Thematic Dark Mode**
   An unwavering commitment to modern dark-mode aesthetics. Heavy utilization of CSS `backdrop-filter: blur`, subtle translucent borders, and vivid accent lighting (`#ff4e00`) over deep, rich blacks.

## 🛠️ Tech Stack
- **HTML5:** Semantic architecture.
- **CSS3:** Advanced flexbox/grid layouts, keyframe animations, 3D transforms (`preserve-3d`, `perspective`), and CSS custom properties (variables).
- **Vanilla JavaScript:** ES6+ syntax, custom rendering loops (`requestAnimationFrame`), math-heavy event listener logic (cursor tracking, dragging), and DOM manipulation.

## 💻 How to Run

[nineeleven.onrender](https://nineeleven.onrender.com/)

## 📸 Glimpse of the Journey

Prepare to embark on a journey that feels less like browsing a website and more like navigating a virtual symphony.

---

*Designed and engineered with utmost precision and creativity.*
