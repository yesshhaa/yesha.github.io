# Yesha Patel - Portfolio

Portfolio website showcasing cybersecurity projects, detection engineering tools, threat intelligence, and certifications.

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
│   ├── components.css       ← Cards, buttons, tags, certs, terminal
│   ├── sections.css         ← Per-section layout (hero, about, certs, work…)
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
    ├── terminal.js          ← Interactive CLI terminal emulator
    └── nav.js               ← Mobile menu toggle + active link highlighting
```

---

## 🛠 Improve 2.0 — Security Fix Navigator (`/improve`)

A browser-only tool for small businesses and IT generalists. Import findings from the
security tools you already run and get a ranked fix plan where **every finding ends in a
verifiable action**, not just a severity score.

- **Import:** SARIF (Semgrep, CodeQL, Snyk…), Trivy JSON, OWASP ZAP JSON, Nessus CSV, OpenVAS CSV, generic CSV/JSON
- **Explain:** plain-language "what it means", "how it could be exploited" and impact for each issue
- **Prioritise:** transparent 0–100 score (severity, exploitability, CISA KEV, exposure, asset importance, effort) grouped into *Fix today / This week / This month / Backlog*
- **Verify:** copy-paste check commands with the expected result; "Verified" unlocks only when every check passes, and re-importing a scan confirms or reopens fixes automatically
- **Report:** Markdown action plan, CSV tracker export, JSON backup

Nothing is uploaded — parsing and storage happen in the browser (`localStorage`).
Sample reports live in `improve/samples/`.

```
improve/
├── index.html
├── css/improve.css
├── js/playbooks.js   ← remediation knowledge base (explain / exploit / fix / verify)
├── js/parsers.js     ← tool format detection + normalisation
├── js/engine.js      ← playbook matching, scoring, fix-action grouping
├── js/app.js         ← UI, state, re-scan comparison, reports
└── samples/          ← demo Nessus, ZAP and Trivy exports
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
```
Then open: `http://localhost:8080`

---

## 🎨 Customization

### Change colors
Edit `css/variables.css` — all design tokens live there.

```css
--accent: #d4a373;   /* Warm amber / planet glow */
--bg:     #050505;
--fg:     #fefae0;
```

### Add a project
In `index.html`, copy any `.project-card` block inside `#work` and update:
- `data-hue="xxx"` on the canvas (0–360 for cyber wave color)
- Project name, description, tags, and links

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
| Terminal   | Custom Interactive JS Terminal      |

**No build tools. No frameworks. No npm.** Open and go.

---

*© 2026 Yesha Patel · CompTIA Security+ Certified — Always learning · Always defending*
