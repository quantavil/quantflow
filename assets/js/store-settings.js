document.addEventListener('alpine:init', () => {
    Alpine.store('settings', {
        display: {
            showTimer: true,
            enableSound: false,
            brutalFeedback: true
        },
        init() {
            const saved = JSON.parse(localStorage.getItem('quantflow_settings') || '{}');
            if (saved.display) Object.assign(this.display, saved.display);
        },
        save() {
            localStorage.setItem('quantflow_settings', JSON.stringify({ display: this.display }));
        },
        reset() {
            this.display = { showTimer: true, enableSound: false, brutalFeedback: true };
            this.save();
        }
    });
});
