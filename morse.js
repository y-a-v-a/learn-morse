/*
 * Shared Morse code library for the learn-morse apps.
 * Exposes two globals:
 *   MORSE_MAP   – character → dot/dash pattern lookup
 *   MorseAudio  – Web Audio player with Farnsworth timing (600Hz)
 * Plain script (no modules) so the apps keep working over file://.
 */

const MORSE_MAP = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----","1": ".----","2": "..---","3": "...--","4": "....-",
  "5": ".....","6": "-....","7": "--...","8": "---..","9": "----.",
  "/": "-..-.","?": "..--..","=": "-...-",".": ".-.-.-",",": "--..--"
};

const MorseAudio = (() => {
  // AudioContext is created lazily on first user interaction for iOS compatibility
  let audioContext = null;
  let enabled = false;

  function init() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    // iOS Safari creates AudioContext in 'suspended' state by default
    if (audioContext.state !== "running") {
      return audioContext.resume();
    }
    return Promise.resolve();
  }

  // Play a very short, almost silent test tone to unlock audio on iOS
  function enable() {
    return init().then(() => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.value = 0.01;
      osc.frequency.value = 600;
      osc.start();
      osc.stop(audioContext.currentTime + 0.05);
      enabled = true;
    });
  }

  function isEnabled() {
    return enabled;
  }

  function timings(characterWPM, overallWPM) {
    const dot = 1.2 / characterWPM;
    // Farnsworth: characters at full speed, extra spacing between them
    const farnsworth = (60 / (overallWPM * 5)) - (60 / (characterWPM * 5));
    const charGap = overallWPM < characterWPM ? Math.max(0, farnsworth) : 3 * dot;
    // Standard word gap is 7 dots; stretch it by the same ratio as the char gap
    const wordGap = charGap * (7 / 3);
    return { dot, charGap, wordGap };
  }

  function scheduleText(text, characterWPM, overallWPM, frequency) {
    const { dot, charGap, wordGap } = timings(characterWPM, overallWPM);
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    osc.frequency.value = frequency;
    osc.start();

    let t = 0;
    for (const ch of text.toUpperCase()) {
      if (ch === " ") {
        // The char gap was already added after the previous character
        t += wordGap - charGap;
        continue;
      }
      const code = MORSE_MAP[ch];
      if (!code) continue;
      for (let i = 0; i < code.length; i++) {
        gain.gain.setValueAtTime(1, audioContext.currentTime + t);
        t += code[i] === "." ? dot : 3 * dot;
        gain.gain.setValueAtTime(0, audioContext.currentTime + t);
        if (i < code.length - 1) t += dot;
      }
      t += charGap;
    }

    osc.stop(audioContext.currentTime + t);
    return t;
  }

  // Play a character, word, or phrase. Resolves to the duration in seconds.
  function playText(text, { characterWPM = 20, overallWPM = characterWPM, frequency = 600 } = {}) {
    if (!enabled) {
      return init().then(() => scheduleText(text, characterWPM, overallWPM, frequency));
    }
    return Promise.resolve(scheduleText(text, characterWPM, overallWPM, frequency));
  }

  return { init, enable, isEnabled, playText };
})();
