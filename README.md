# Yesha Patel — Cybersecurity Portfolio

---

## 📁 File Structure

```
yesha-portfolio/
├── index.html               ← Main HTML (open this in browser)
├── README.md                ← This file
│
├── css/
│   ├── reset.css            ← Modern CSS reset
│   ├── variables.css        ← Design tokens (colors, fonts, spacing)
│   ├── base.css             ← Body, typography, section primitives
│   ├── components.css       ← Nav, loader, cursor, cards, buttons
│   ├── sections.css         ← Per-section layout (hero, about, lab…)
│   ├── animations.css       ← @keyframes + .reveal utility classes
│   └── responsive.css       ← Tablet (900px) + Mobile (600px) breakpoints
│
└── js/
    ├── cursor.js            ← Custom magnetic cursor (mouse follow)
    ├── loader.js            ← Loading screen counter animation
    ├── webgl.js             ← Three.js hero background (particles + wireframe)
    ├── lab-canvas.js        ← Canvas 2D animated network topology
    ├── project-previews.js  ← Generative canvas previews on card hover
    ├── scroll.js            ← Scroll %, parallax text, count-up numbers
    ├── animations.js        ← IntersectionObserver reveals + magnetic buttons
    └── nav.js               ← Mobile menu toggle + active link highlighting
```

---

## 🚀 How to Run

**Option 1 — Just open in browser:**
```
Double-click index.html
```
> Works for most features. Three.js WebGL may need a local server due to CORS.

**Option 2 — Local server (recommended):**
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# VS Code / Antigravity IDE
Use the built-in Live Server / Preview
```
Then open: `http://localhost:8080`

---

## 🎨 Customization

### Change colors
Edit `css/variables.css` — all design tokens live there.

```css
--accent: #d4ff4f;   /* ← Change this to rebrand the whole site */
--bg:     #080808;
--fg:     #f0ede8;
```

### Add a project
In `index.html`, copy any `.project-card` block inside `#work` and update:
- `data-hue="xxx"` on the canvas (0–360 for color)
- Project name, description, tags

### Update contact links
Search for `href="#"` in `index.html` and replace with your real URLs.

### Swap your email
Replace `yesha.patel@email.com` in the contact section with your actual email.

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | Semantic HTML5                      |
| Styling    | CSS3 (custom properties, grid, flex)|
| 3D Hero    | Three.js r128 (CDN)                 |
| Animation  | Vanilla JS + IntersectionObserver   |
| Fonts      | Google Fonts (Syne + DM Mono)       |
| Canvas     | HTML5 Canvas 2D API                 |

**No build tools. No frameworks. No npm.** Open and go.

---

## ✅ Features

- Custom magnetic cursor with lag ring
- WebGL particle + wireframe hero (Three.js)
- Loading screen with animated counter
- Scroll-triggered reveal animations
- Parallax text strips
- Animated Canvas 2D network topology
- Generative project card previews (per-card color)
- Count-up statistics on scroll
- Service items expand/collapse on click
- Page progress bar
- Mobile-responsive with hamburger menu
- Active nav link highlighting
- Accessibility: aria labels, focus styles, reduced-motion support

---

*© 2025 Yesha Patel — Always learning · Always defending*
