# Learn Morse

Project to create a simple web app to learn Morse code using Koch method

Vincent Bruijn

## Overview

Two small web apps that share a common Morse library (`morse.js`) and theme (`morse-theme.css`):

- **`index.html`** implements the Koch method for learning individual characters. The Koch method is a proven approach that starts with just two characters and gradually adds more as the student achieves proficiency.
- **`dictation.html`** takes it a step further: it plays short dictations of real English words in Morse code and asks you to pick what you heard from four choices, training whole-word pattern recognition instead of letter-by-letter decoding.

## Features

- **Progressive Learning**: 40+ lessons following the Koch method sequence, starting with K and M
- **Farnsworth Timing**: Characters played at 20 WPM with adjustable overall speed (5-20 WPM) for proper learning
- **Individual Character Tracking**: Color-coded keyboard shows accuracy for each character (green=good, yellow=medium, red=needs practice)
- **Progress Tracking**: Visual progress bar and statistics showing accuracy and estimated attempts needed
- **Progress Insights Drawer**: Mobile-first slide-out drawer with detailed learning analytics, character mastery grid, 7-day practice history, and lesson roadmap
- **Session History**: Automatic saving of practice sessions to localStorage
- **Audio Generation**: Real-time Morse code audio using Web Audio API at 600Hz
- **Character Mixing**: Mixes 70% current lesson characters with 30% review characters from previous lessons
- **Progress Reset**: Option to completely reset all progress and start fresh

## How It Works

1. **Lesson Structure**: Each lesson introduces new characters while maintaining previous ones
2. **Practice Flow**: Click "Play Character" to hear a random character, then guess using the keyboard
3. **Advancement**: Achieve 90% accuracy to unlock the next lesson
4. **Persistence**: All progress, settings, and statistics are saved locally in the browser

The apps use no external dependencies and work entirely offline once loaded.

## Word Dictation (`dictation.html`)

- **Single-word rounds**: Hear a word played in Morse (Farnsworth timing, same WPM setting as the character app), then pick it from four multiple-choice options
- **Curated word pools**: Common English words only — no obscure dictionary-only entries
- **Accuracy-gated levels**: Start with 2-letter words; reach ≥90% accuracy over at least 20 words to unlock 3-letter words
- **Smart distractors**: Wrong options are biased toward words sharing letters with the target, so you train real pattern discrimination
- **Replay**: Replay the current word as often as you need before answering
- **Persistence**: Level and per-level statistics are stored in localStorage, independent of the character-practice progress

## iOS Safari Audio Setup

When using the app on iOS devices (iPhone/iPad) with Safari:

1. **First-time setup**: Tap the "Enable Sound" button that appears on first load
2. **Check ringer switch**: Ensure the physical ringer switch on the side of your device is ON (not in silent mode)
3. **Check volume**: Make sure your device volume is turned up using the volume buttons

iOS Safari requires explicit user interaction to enable Web Audio, and the device must not be in silent mode for sounds to play.

## Screenshots

![Main practice interface](learn-morse-1.png)

![Progress insights drawer](learn-morse-2.png)