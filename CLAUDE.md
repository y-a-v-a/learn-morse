# Morse Code Learning Apps

Two dependency-free HTML apps for learning Morse code, sharing a small library.

## Files
- `index.html` — character practice using the Koch method (progressive lessons)
- `dictation.html` — word dictation practice: hear a common English word, pick it from four choices; accuracy-gated levels (2-letter words, then 3-letter words)
- `morse.js` — shared library: `MORSE_MAP` lookup table and `MorseAudio` Web Audio player (600Hz, Farnsworth timing, iOS audio unlock)
- `morse-theme.css` — shared theme: light/dark CSS variables, base typography, button and answer-feedback styles, footer

## Key Features
- **Progressive lessons** following Koch method (40+ lessons) in `index.html`
- **Word dictation levels** in `dictation.html` — curated common-word pools, ≥90% accuracy over at least 20 words unlocks the next level
- **Farnsworth timing** with adjustable speed (5-20 WPM), shared `overallWPM` setting across both apps
- **Progress tracking** with localStorage persistence (dictation uses `dictation*`-prefixed keys)
- **Character mastery analysis** with color-coded feedback
- **Mobile-first design** with slide-out progress drawer (character app)

## Technical Notes
- Pure vanilla JavaScript, no dependencies, classic scripts (no ES modules) so everything works over `file://`
- All data stored in browser localStorage
- Web Audio API for real-time Morse generation at 600Hz via `MorseAudio.playText(text, { characterWPM, overallWPM })`
- Responsive design optimized for mobile learning

## Usage
Open `index.html` or `dictation.html` in any modern browser. Progress is automatically saved locally.
