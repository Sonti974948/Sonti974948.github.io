# Sonti974948.github.io

Personal academic website of **Siddharth Sonti** — PhD candidate, Chemical Engineering, UC Davis.
Live at <https://sonti974948.github.io/>.

Plain HTML/CSS/JS — no build step. GitHub Pages serves `index.html` directly.

## Structure
```
index.html              # all content (About, Research, Publications, News, Teaching, Education)
assets/css/style.css    # styles + light/dark theme tokens
assets/js/main.js       # theme toggle, mobile menu, news expander, YouTube lite-embeds
assets/img/profile.jpg  # ← add your headshot here (square works best); falls back to "SS" monogram
assets/CV_Siddharth_Sonti.pdf  # ← add your CV here (linked from the "Curriculum Vitae" button)
```

## Updating
- **News:** add a new `<li>` at the top of `#newsList` in `index.html`. The latest 6 show by default.
- **Publications:** copy a `<li class="pub">` block in `#publications`.
- **Videos:** add `<div class="video reveal" data-yt="VIDEO_ID" data-title="Title"></div>`.
