/**
 * Kid-friendly interactive sound generator using Web Audio API
 * Instant audio feedback with no network latency, 100% offline & responsive!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public speechEnabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Crisp, playful button click / tap feedback
   * Used for tabs, options, toggles, navigation
   */
  playButtonClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Cheerful marimba / wooden tap blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio silent fallback
    }
  }

  /** Soft pop sound */
  playPop() {
    this.playButtonClick();
  }

  /**
   * Joyful encouraging cheer sound for correct answers
   * Arpeggiated happy bell chords (C5 -> E5 -> G5 -> C6 -> E6)
   */
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + i * 0.07;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch {
      // silent
    }
  }

  /**
   * Gentle comforting "try again" sound (تنبيه لطيف غير محبط)
   * Soft melodic gentle wobble (D4 -> B3) with warm timbre
   */
  playTryAgain() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Gentle warm wobble
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(293.66, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(261.63, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // silent
    }
  }

  /**
   * Ascending musical pitch based on counted number (1 to 20)
   */
  playCountPitch(num: number) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const baseFreq = 261.63; // Middle C
      const semitone = Math.min(24, Math.max(0, num * 1.5));
      const freq = baseFreq * Math.pow(2, semitone / 12);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // silent
    }
  }

  /** Star sparkle chime for earning stars */
  playStarSparkle() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const freqs = [880, 1174.66, 1318.51, 1760, 2093];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.05;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch {
      // silent
    }
  }

  /** Fanfare celebration for winning or completing milestone */
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const chordNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      chordNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + (idx === 4 ? 0.28 : idx * 0.07);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === 4 ? 0.75 : 0.3));

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + (idx === 4 ? 0.75 : 0.3));
      });
    } catch {
      // silent
    }
  }

  /**
   * Double star celebration chime with sparkling dual-wave arpeggio
   * Specially crafted for the Daily Challenge!
   */
  playDoubleStar() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // First wave (Star 1 sparkle)
      const freqs1 = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      freqs1.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.05;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.24, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      });
      // Second wave (Star 2 - higher sparkle burst)
      const freqs2 = [659.25, 830.61, 1046.5, 1318.51, 1760.0, 2093.0];
      freqs2.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + 0.22 + idx * 0.05;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch {
      // silent
    }
  }

  /** Realistic playful balloon pop */
  playBalloonBurst() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // silent
    }
  }

  /** Magical equipment chime when equipping hats/decorations */
  playEquipSound() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [659.25, 880, 1174.66]; // E5, A5, D6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + i * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch {
      // silent
    }
  }

  /** Card flip sound */
  playCardFlip() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // silent
    }
  }

  /** Speak text in Arabic, English, or French */
  speak(text: string, lang: 'ar' | 'en' | 'fr' = 'ar') {
    if (!this.speechEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === 'en') {
          utterance.lang = 'en-US';
        } else if (lang === 'fr') {
          utterance.lang = 'fr-FR';
        } else {
          utterance.lang = 'ar-SA';
        }
        utterance.rate = 0.88;
        utterance.pitch = 1.15;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // speech fallback
    }
  }

  /** Speak Arabic word or encouragement (backward-compatible alias) */
  speakArabic(text: string) {
    this.speak(text, 'ar');
  }
}

export const soundEffects = new SoundEngine();
