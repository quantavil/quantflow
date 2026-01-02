const SoundManager = {
    ctx: null,

    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    play(freq, type, duration, volume = 0.1) {
        this.init();
        if (this.ctx.state === 'suspended' || this.ctx.state === 'interrupted') {
            this.ctx.resume().catch(() => { });
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain).connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    presets: {
        correct: [880, 'sine', 0.1],
        fast: [1046.5, 'sine', 0.15],
        error: [220, 'square', 0.3, 0.05]
    },

    playPreset(name) {
        const p = this.presets[name];
        if (p) {
            this.play(...p);
            if (name === 'fast') setTimeout(() => this.play(1318.5, 'sine', 0.1, 0.08), 50);
        }
    },

    correct() { this.playPreset('correct'); },
    fast() { this.playPreset('fast'); },
    error() { this.playPreset('error'); }
};
