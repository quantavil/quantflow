
// ═══════════════════════════════════════════════════════════════════════════════
// ALPINE.JS APPLICATION
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('alpine:init', () => {
    Alpine.data('quantflow', () => ({
        // Core dependencies
        engine: new window.Engine(),
        operations: window.OPERATIONS,

        // Auth Store Helper
        get auth() {
            return Alpine.store('auth');
        },
        loginWithGitHub() {
            Alpine.store('auth').loginWithGitHub();
        },
        logout() {
            Alpine.store('auth').logout();
        },
        // Session state
        session: {
            isActive: false,
            isPaused: false,
            startTime: null,
            seconds: 0
        },

        // Practice state
        practice: {
            category: 'addition',
            tier: '1+1',
            variants: ['positive']
        },

        // Round state (finite game mode)
        round: {
            targetCount: 20,
            currentCount: 0,
            isComplete: false,
            stats: {
                correct: 0,
                fast: 0,
                slow: 0,
                errors: 0,
                totalTime: 0,
                latencies: []
            }
        },

        // Current question
        currentQuestion: null,
        questionStartTime: null,
        userAnswer: '',
        liveTimer: 0,
        timerFrame: null,

        // Stats
        get streak() { return this.engine?.arcade?.streak || 0; },
        bestStreak: 0,
        todayCount: 0,
        totalCorrect: 0,
        totalAnswered: 0,
        fastCount: 0,
        slowCount: 0,
        errorCount: 0,
        latencies: [],
        recentResponses: [],

        // Session timer interval
        sessionInterval: null,
        nextQuestionTimeout: null,

        // Error handling
        consecutiveErrors: 0,
        questionQueue: [], // Replaced errorQueue with questionQueue for circular stack
        downgraded: false,
        originalTier: null,
        successAfterDowngrade: 0,

        // UI state
        currentTime: '--:--:--',
        settingsOpen: false,
        analyticsOpen: false,
        sidebarOpen: false,
        storageOk: true,
        flashClass: '',
        consoleLogs: [],
        heatmapExpanded: false,
        virtualKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],

        processingSubmission: false,

        // Modal State
        exportModalOpen: false,
        importModalOpen: false,
        confirmModalOpen: false,
        exportDataStr: '',
        importDataStr: '',

        // Feedback
        feedback: {
            visible: false,
            icon: '✓',
            text: '',
            detail: '',
            type: 'success'
        },

        // Category stats cache
        categoryStats: {},

        // Settings configurations
        displaySettings: [
            { key: 'showTimer', label: 'Show Live Timer' },
            { key: 'enableSound', label: 'Enable Sound Effects' },
            { key: 'brutalFeedback', label: 'Brutal Feedback Mode' }
        ],



        // ═══════════════════════════════════════════════════════════════════════
        // COMPUTED PROPERTIES
        // ═══════════════════════════════════════════════════════════════════════

        get currentOperation() {
            return this.operations[this.practice.category] || this.operations.addition;
        },

        get isSessionRunning() {
            return this.session.isActive && !this.session.isPaused;
        },

        getThresholdClass(value, thresholds, classes) {
            for (let i = 0; i < thresholds.length; i++) {
                if (value < thresholds[i]) return classes[i];
            }
            return classes[classes.length - 1];
        },

        get currentTierLabel() {
            const tier = this.currentOperation.tiers.find(t => t.id === this.practice.tier);
            return tier?.label || this.practice.tier;
        },

        get headerMetrics() {
            const stats = this.getCurrentStats();
            const acc = stats.totalAnswered ? (stats.totalCorrect / stats.totalAnswered) * 100 : 0;
            const avgLat = stats.latencies.length ? this.formatTime(stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length) : '--ms';

            return [
                { label: 'STREAK', value: stats.streak, colorClass: 'text-terminal-green font-bold' },
                { label: 'TODAY', value: this.todayCount, colorClass: 'text-text-primary' },
                { label: 'ACC', value: stats.totalAnswered ? `${acc.toFixed(1)}%` : '--', colorClass: this.getAccuracyClass(acc) },
                { label: 'AVG LAT', value: avgLat, colorClass: 'text-text-primary' }
            ];
        },

        get categoryStatsDisplay() {
            const catStats = this.getCurrentStats();
            const avgTime = catStats.latencies.length ?
                this.formatTime(catStats.latencies.reduce((a, b) => a + b, 0) / catStats.latencies.length) : '--';

            const acc = catStats.totalAnswered ? (catStats.totalCorrect / catStats.totalAnswered * 100).toFixed(1) + '%' : '--';

            return [
                { label: 'Accuracy', value: acc, colorClass: this.getAccuracyClass(parseFloat(acc)) },
                { label: 'Best Streak', value: catStats.bestStreak, colorClass: 'text-terminal-green' },
                { label: 'Avg Time', value: avgTime, colorClass: 'text-text-primary' },
                { label: 'Total', value: catStats.totalAnswered.toLocaleString(), colorClass: 'text-text-muted' }
            ];
        },

        get parTimeDisplay() {
            return this.currentQuestion ? `${this.currentQuestion.targetTime.toFixed(1)}s` : '--s';
        },

        get questionDisplayHtml() {
            if (!this.currentQuestion) return '<span class="text-text-muted">Ready</span>';

            const q = this.currentQuestion;
            if (['fractions', 'percentages', 'approximation', 'miscellaneous'].includes(q.category)) {
                return `<span class="text-text-primary">${q.display}</span>`;
            }
            if (q.category === 'powers') {
                return `<span class="text-text-primary">${q.display}</span>`;
            }
            if (q.category === 'roots') {
                return `<span class="text-terminal-green">${q.operator}</span><span class="text-text-primary">${q.operand1}</span>`;
            }

            const op1 = q.operand1 < 0 ? `(${q.operand1})` : q.operand1;
            const op2 = q.operand2 < 0 ? `(${q.operand2})` : q.operand2;
            return `<span class="text-text-primary">${op1}</span>
                    <span class="text-terminal-green mx-4">${q.operator}</span>
                    <span class="text-text-primary">${op2}</span>`;
        },

        get liveTimerDisplay() {
            if (!this.session.isActive && this.liveTimer === 0) return 'READY';
            return (this.liveTimer / 1000).toFixed(2);
        },

        get timerColorClass() {
            if (!this.currentQuestion) return 'text-text-muted';
            const target = this.currentQuestion.targetTime * 1000;
            return this.getThresholdClass(this.liveTimer, [target * 0.8, target * 1.2], ['text-terminal-green', 'text-signal-orange', 'text-signal-red']);
        },

        get feedbackColorClass() {
            const colors = { success: 'text-terminal-green', warning: 'text-signal-orange', error: 'text-signal-red' };
            return colors[this.feedback.type] || 'text-text-primary';
        },

        get feedbackBorderClass() {
            const borders = {
                success: 'border border-terminal-green/30',
                warning: 'border border-signal-orange/30',
                error: 'border border-signal-red/30'
            };
            return borders[this.feedback.type] || 'border border-charcoal-border';
        },

        get sparklineLimits() {
            const stats = this.getCurrentStats();
            const data = stats.latencies.slice(-20);
            if (data.length < 2) return { min: 0, max: 0, hasData: false };
            return {
                min: Math.min(...data),
                max: Math.max(...data),
                hasData: true
            };
        },

        get sparklinePath() {
            const stats = this.getCurrentStats();
            const data = stats.latencies.slice(-20);
            if (data.length < 2) return '';

            const width = 280, height = 64, padding = 4;
            const limits = this.sparklineLimits;
            const range = limits.max - limits.min || 1;

            return 'M' + data.map((val, i) => {
                const x = padding + (i / (data.length - 1)) * (width - padding * 2);
                const y = height - padding - ((val - limits.min) / range) * (height - padding * 2);
                return `${x},${y}`;
            }).join(' L');
        },

        get sparklineAvg() {
            const stats = this.getCurrentStats();
            if (!stats.latencies.length) return '--ms';
            return this.formatTime(stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length);
        },

        get performanceBreakdown() {
            const stats = this.getCurrentStats();
            const total = stats.fastCount + stats.slowCount + stats.errorCount || 1;
            return [
                {
                    label: 'Fast (< Par)', percent: Math.round(stats.fastCount / total * 100),
                    barClass: 'bg-terminal-green', textClass: 'text-terminal-green'
                },
                {
                    label: 'Slow (> Par)', percent: Math.round(stats.slowCount / total * 100),
                    barClass: 'bg-signal-orange', textClass: 'text-signal-orange'
                },
                {
                    label: 'Errors', percent: Math.round(stats.errorCount / total * 100),
                    barClass: 'bg-signal-red', textClass: 'text-signal-red'
                }
            ];
        },



        get heatmapCells() {
            const cells = [];
            const today = new Date();
            const daysToShow = this.heatmapExpanded ? 28 : 7;

            for (let i = daysToShow - 1; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                const count = this.getDayCount(dateStr);

                let colorClass = 'bg-charcoal-lighter';
                if (count >= 30) colorClass = 'bg-terminal-green';
                else if (count >= 10) colorClass = 'bg-terminal-green-dim';
                else if (count > 0) colorClass = 'bg-terminal-green-dark';

                cells.push({ date: dateStr, count, colorClass });
            }
            return cells;
        },

        get heatmapTotal() {
            return this.heatmapCells.reduce((sum, c) => sum + c.count, 0);
        },

        get roundAccuracy() {
            const total = this.round.stats.correct + this.round.stats.errors;
            return total > 0 ? Math.round((this.round.stats.correct / total) * 100) : 0;
        },

        get roundAvgTime() {
            const lats = this.round.stats.latencies;
            if (lats.length === 0) return '--';
            const avg = lats.reduce((a, b) => a + b, 0) / lats.length;
            return this.formatTime(avg);
        },

        get roundProgress() {
            return `${this.round.currentCount}/${this.round.targetCount}`;
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INITIALIZATION
        // ═══════════════════════════════════════════════════════════════════════

        init() {
            this.loadSettings();
            this.loadStats();
            Alpine.store('auth').init(); // Ensure auth is initialized explicitly
            this.updateClock();

            this.log('[SYS] QuantFlow initialized. Engine: Arcade Mode');

            // Clock interval
            this.clockInterval = setInterval(() => this.updateClock(), 1000);

            // Session timer
            if (this.sessionInterval) clearInterval(this.sessionInterval);
            this.sessionInterval = setInterval(() => {
                if (this.session.isActive && !this.session.isPaused) {
                    this.session.seconds++;
                }
            }, 1000);

            // Load saved practice state, then set defaults for missing variants
            this.loadPracticeState();
        },

        safeGetStorage(key, defaultValue) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },

        generateUniqueBatch(count) {
            this.questionQueue = [];
            const MAX_RETRIES = 5;
            const seen = new Set();

            for (let i = 0; i < count; i++) {
                let q = null;
                let attempts = 0;

                // Try to generate a unique question
                while (attempts < MAX_RETRIES) {
                    q = this.engine.generateQuestion(
                        this.practice.category,
                        this.practice.tier,
                        this.practice.variants
                    );

                    if (q && !seen.has(q.display)) {
                        seen.add(q.display);
                        break;
                    }
                    attempts++;
                }

                // If we failed to get a unique one after retries, just take the last generated one
                if (q) this.questionQueue.push(q);
            }

            this.log(`[SYS] Generated ${this.questionQueue.length} questions.`);
        },

        safeSetStorage(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error(`[STORAGE] Set failed for ${key}:`, e);
            }
        },

        // ═══════════════════════════════════════════════════════════════════════
        // UTILITIES
        // ═══════════════════════════════════════════════════════════════════════

        formatTime(ms) {
            return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`;
        },

        formatSessionTime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        },

        getCategoryIndex(key) {
            return String(Object.keys(this.operations).indexOf(key) + 1).padStart(2, '0');
        },

        getAccuracyClass(acc) {
            if (acc === 0 || isNaN(acc)) return 'text-text-muted';
            return this.getThresholdClass(acc, [70, 90], ['text-signal-red', 'text-signal-orange', 'text-terminal-green']);
        },

        getResponseClass(response) {
            if (!response.correct) return 'bg-signal-red';
            return response.fast ? 'bg-terminal-green' : 'bg-signal-orange';
        },

        updateClock() {
            this.currentTime = new Date().toLocaleTimeString('en-GB');
        },

        getDayCount(dateStr) {
            try {
                const data = JSON.parse(localStorage.getItem('quantflow_daily') || '{}');
                return data[dateStr] || 0;
            } catch { return 0; }
        },

        log(message) {
            const timestamp = new Date().toLocaleTimeString('en-GB');
            let colorClass = 'text-text-dim';

            if (message.includes('[FAST]')) colorClass = 'text-terminal-green';
            else if (message.includes('[SLOW]') || message.includes('[QUEUE]')) colorClass = 'text-signal-orange';
            else if (message.includes('[FAIL]') || message.includes('[ERR]')) colorClass = 'text-signal-red';
            else if (message.includes('[SYS]')) colorClass = 'text-text-secondary';

            this.consoleLogs.push({ text: `[${timestamp}] ${message}`, colorClass });
            if (this.consoleLogs.length > 100) this.consoleLogs.shift();

            this.$nextTick(() => {
                const console = this.$refs.console;
                if (console) console.scrollTop = console.scrollHeight;
            });
        },

        getCurrentStats() {
            const cat = this.practice.category;
            if (!this.categoryStats[cat]) {
                this.categoryStats[cat] = {
                    streak: 0,
                    bestStreak: 0,
                    totalCorrect: 0,
                    totalAnswered: 0,
                    fastCount: 0,
                    slowCount: 0,
                    errorCount: 0,
                    latencies: [],
                    recentResponses: []
                };
            }
            return this.categoryStats[cat];
        },

        updatePracticeConfig(type, value) {
            if (type === 'category') {
                this.practice.category = value;
                this.practice.tier = this.operations[value].tiers[0].id;
                this.updateVariantsFromDefaults();
                this.downgraded = false;
                this.originalTier = null;
                this.successAfterDowngrade = 0;
            } else if (type === 'tier') {
                this.practice.tier = value;
            } else if (type === 'variant') {
                const idx = this.practice.variants.indexOf(value);
                if (idx >= 0) {
                    this.practice.variants.splice(idx, 1);
                } else {
                    this.practice.variants.push(value);
                }
                if (this.practice.variants.length === 0) {
                    const first = this.currentOperation.variants[0];
                    if (first) this.practice.variants.push(first.id);
                }
            }

            if (this.session.isActive || type === 'category') {
                this.resetSession();
            }

            // Persist practice state
            this.savePracticeState();
        },

        selectCategory(category) {
            this.updatePracticeConfig('category', category);
        },

        selectTier(tierId) {
            this.updatePracticeConfig('tier', tierId);
        },

        toggleVariant(variantId) {
            this.updatePracticeConfig('variant', variantId);
        },

        updateVariantsFromDefaults() {
            this.practice.variants = this.currentOperation.variants
                .filter(v => v.default)
                .map(v => v.id);

            if (this.practice.variants.length === 0 && this.currentOperation.variants.length > 0) {
                this.practice.variants = [this.currentOperation.variants[0].id];
            }
        },

        savePracticeState() {
            this.safeSetStorage('quantflow_practice', {
                category: this.practice.category,
                tier: this.practice.tier,
                variants: this.practice.variants,
                roundSize: this.round.targetCount
            });
        },

        loadPracticeState() {
            const saved = this.safeGetStorage('quantflow_practice', null);
            if (saved) {
                // Restore category if valid
                if (saved.category && this.operations[saved.category]) {
                    this.practice.category = saved.category;

                    // Restore tier if valid for this category
                    const validTier = this.currentOperation.tiers.find(t => t.id === saved.tier);
                    if (validTier) {
                        this.practice.tier = saved.tier;
                    } else {
                        this.practice.tier = this.currentOperation.tiers[0].id;
                    }

                    // Restore variants if valid
                    if (saved.variants && saved.variants.length > 0) {
                        const validVariants = saved.variants.filter(v =>
                            this.currentOperation.variants.some(ov => ov.id === v)
                        );
                        this.practice.variants = validVariants.length > 0 ? validVariants : [];
                    }
                }

                // Restore round size
                if (saved.roundSize && [10, 20, 30, 50, 100].includes(saved.roundSize)) {
                    this.round.targetCount = saved.roundSize;
                }
            }

            // Ensure we have at least one variant
            if (this.practice.variants.length === 0) {
                this.updateVariantsFromDefaults();
            }
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SESSION CONTROL
        // ═══════════════════════════════════════════════════════════════════════

        startSession() {
            this.session.isActive = true;
            this.session.isPaused = false;
            this.session.startTime = Date.now();
            this.session.seconds = 0;

            // Reset round state
            this.latencies = [];
            this.recentResponses = [];
            this.consecutiveErrors = 0;
            this.resetRoundStats();

            this.log(`[SYS] Round started: ${this.round.targetCount} questions | ${this.practice.category.toUpperCase()}`);

            // Pre-generate unique batch
            this.generateUniqueBatch(this.round.targetCount);

            this.generateQuestion();
            this.$nextTick(() => this.$refs.answerInput?.focus());
        },

        togglePause() {
            if (!this.session.isActive) return;

            this.session.isPaused = !this.session.isPaused;

            if (this.session.isPaused) {
                this.stopTimer();
                this.log('[SYS] Session paused.');
            } else {
                this.questionStartTime = performance.now();
                this.startTimer();
                this.$refs.answerInput?.focus();
                this.log('[SYS] Session resumed.');
            }
        },

        resetSession() {
            if (this.nextQuestionTimeout) clearTimeout(this.nextQuestionTimeout);
            this.session.isActive = false;
            this.session.isPaused = false;
            this.consecutiveErrors = 0;
            this.questionQueue = [];
            this.downgraded = false;
            this.successAfterDowngrade = 0;
            this.latencies = [];
            this.recentResponses = [];
            this.currentQuestion = null;
            this.userAnswer = '';

            // Reset round state
            this.resetRoundStats();

            // Reset arcade state (session score, streak, difficulty)
            this.engine.resetSession();

            this.stopTimer();
            this.liveTimer = 0;
            this.processingSubmission = false;

            this.log('[SYS] Session reset.');
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ROUND CONTROL
        // ═══════════════════════════════════════════════════════════════════════

        selectRoundSize(count) {
            this.round.targetCount = count;
            this.savePracticeState();
            this.log(`[SYS] Round size set to ${count} questions.`);
        },

        resetRoundStats() {
            this.round.currentCount = 0;
            this.round.isComplete = false;
            this.round.stats = {
                correct: 0,
                fast: 0,
                slow: 0,
                errors: 0,
                totalTime: 0,
                latencies: []
            };
        },

        completeRound() {
            this.round.isComplete = true;
            this.session.isActive = false;
            this.stopTimer();

            const acc = this.roundAccuracy;
            const avg = this.roundAvgTime;
            this.log(`[SYS] Round complete! Accuracy: ${acc}% | Avg: ${avg}`);
            this.log('[SYS] ----------------------------------------');
        },

        startNewRound() {
            this.round.isComplete = false;
            this.startSession();
        },

        closeRoundSummary() {
            this.round.isComplete = false;
        },


        // ═══════════════════════════════════════════════════════════════════════
        // QUESTION GENERATION & DISPLAY
        // ═══════════════════════════════════════════════════════════════════════

        generateQuestion() {
            if (this.questionQueue.length === 0) {
                // Queue empty means round technically finished, though completeRound calls usually handle this
                return;
            }

            // Pull next question from the FRONT of the queue
            this.currentQuestion = this.questionQueue.shift();

            // Log if it's a retry (optional distinction)
            // this.log(`[Q] ${this.currentQuestion.display}`);

            if (!this.currentQuestion) {
                this.log('[ERR] Failed to generate question.');
                return;
            }

            this.processingSubmission = false;

            this.questionStartTime = performance.now();
            this.userAnswer = '';
            this.startTimer();

            this.$nextTick(() => this.$refs.answerInput?.focus());
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TIMER
        // ═══════════════════════════════════════════════════════════════════════

        startTimer() {
            this.stopTimer();

            const update = () => {
                if (!this.session.isActive || this.session.isPaused) return;
                this.liveTimer = performance.now() - this.questionStartTime;
                this.timerFrame = requestAnimationFrame(update);
            };

            this.timerFrame = requestAnimationFrame(update);
        },

        stopTimer() {
            if (this.timerFrame) {
                cancelAnimationFrame(this.timerFrame);
                this.timerFrame = null;
            }
        },



        // ═══════════════════════════════════════════════════════════════════════
        // ANSWER HANDLING
        // ═══════════════════════════════════════════════════════════════════════

        handleInput() {
            if (!this.session.isActive || this.session.isPaused || !this.currentQuestion) return;

            const userVal = this.userAnswer.toString().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');
            const expectedVal = this.currentQuestion.answer.toString().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');

            if (userVal === '-' || userVal === '−') return;

            // Simple length check for now
            if (userVal.length >= expectedVal.length) {
                this.submitAnswer();
            }
        },

        submitAnswer() {
            if (!this.isSessionRunning || !this.currentQuestion) return;
            if (this.processingSubmission) return;

            this.processingSubmission = true;
            this.stopTimer();

            const responseTime = (performance.now() - this.questionStartTime) / 1000; // in seconds
            const isCorrect = this.checkAnswer(this.userAnswer, this.currentQuestion.answer);
            const isFast = responseTime <= this.currentQuestion.targetTime;

            // Submit to Engine
            const engineResult = this.engine.submitAnswer(this.currentQuestion, responseTime, isCorrect);
            this.recordResponse(isCorrect, isFast, responseTime * 1000);
        },

        recordResponse(isCorrect, isFast, responseTimeMs) {
            const catStats = this.getCurrentStats();
            const q = this.currentQuestion;

            this.totalAnswered++;
            this.todayCount++;
            catStats.totalAnswered++;

            const updateLatencies = (target) => {
                target.latencies.push(responseTimeMs);
                if (target.latencies.length > 50) target.latencies.shift();
            };
            updateLatencies(this);
            updateLatencies(catStats);

            const resp = { correct: isCorrect, fast: isFast, time: responseTimeMs };
            const updateRecent = (target) => {
                target.recentResponses.unshift(resp);
                if (target.recentResponses.length > 20) target.recentResponses.pop();
            };
            updateRecent(this);
            updateRecent(catStats);

            if (isCorrect) {
                this.totalCorrect++;
                catStats.totalCorrect++;

                catStats.streak++;
                if (this.engine.arcade.streak > this.bestStreak) this.bestStreak = this.engine.arcade.streak;
                if (catStats.streak > catStats.bestStreak) catStats.bestStreak = catStats.streak;

                this.consecutiveErrors = 0;

                if (isFast) {
                    this.fastCount++;
                    catStats.fastCount++;
                    this.showFeedback('success', '✓', 'FAST', this.formatTime(responseTimeMs));
                    this.flash('success');
                    if (Alpine.store('settings').display.enableSound) SoundManager.playPreset('fast');

                    const timeDiff = (responseTimeMs / 1000 - q.targetTime).toFixed(1);
                    const diffStr = timeDiff > 0 ? `+${timeDiff}s` : `${timeDiff}s`;
                    this.log(`[FAST] ${q.display} = ${q.answer} | ${this.formatTime(responseTimeMs)} / ${q.targetTime.toFixed(2)}s (${diffStr})`);

                    if (catStats.streak > 0 && catStats.streak % 10 === 0) ParticleSystem.trigger();
                } else {
                    this.slowCount++;
                    catStats.slowCount++;
                    const timeDiff = (responseTimeMs / 1000 - q.targetTime).toFixed(1);
                    const diffStr = `+${timeDiff}s`;
                    this.showFeedback('warning', '⚡', 'TOO SLOW', `${this.formatTime(responseTimeMs)} (Par: ${q.targetTime.toFixed(1)}s)`);
                    this.flash('warning');
                    if (Alpine.store('settings').display.enableSound) SoundManager.playPreset('correct');
                    this.log(`[SLOW] ${q.display} = ${q.answer} | ${this.formatTime(responseTimeMs)} / ${q.targetTime.toFixed(2)}s (${diffStr})`);
                }

                if (this.downgraded) {
                    this.successAfterDowngrade++;
                    if (this.successAfterDowngrade >= 3 && this.originalTier) {
                        this.practice.tier = this.originalTier;
                        this.log(`[SYS] Tier restored to ${this.originalTier}.`);
                        this.downgraded = false;
                        this.originalTier = null;
                        this.successAfterDowngrade = 0;
                    }
                }
            } else {
                this.errorCount++;
                catStats.errorCount++;
                catStats.streak = 0;
                this.consecutiveErrors++;

                this.showFeedback('error', '✗', 'INCORRECT', `Correct: ${q.answer}`);
                this.flash('error');
                if (Alpine.store('settings').display.enableSound) SoundManager.playPreset('error');

                // BRUTAL MODE: Screen shake & aggressive logs
                if (Alpine.store('settings').display.brutalFeedback) {
                    this.flashClass = 'animate-shake bg-signal-red/10';
                    setTimeout(() => this.flashClass = '', 400);

                    const rudeMessages = [
                        '[ERR] SEGFAULT: USER_COMPETENCE_NOT_FOUND',
                        '[ERR] NULL POINTER EXCEPTION IN BRAIN.EXE',
                        '[ERR] RETURN VALUE == TRASH',
                        '[ERR] BUFFER UNDERFLOW: TRY THINKING HARDER',
                        '[ERR] SYSTEM.EXIT(0) RECOMMENDED',
                        '[ERR] 404: ANSWER NOT FOUND',
                        '[ERR] SKILL_ISSUE_DETECTED',
                        '[ERR] PEBKAC ERROR'
                    ];
                    this.log(rudeMessages[Math.floor(Math.random() * rudeMessages.length)]);
                }
                this.log(`[FAIL] ${q.display} = ${q.answer} | Got: ${this.userAnswer} | ${this.formatTime(responseTimeMs)}`);

                if (this.consecutiveErrors >= 3 && !this.downgraded) {
                    const tiers = this.currentOperation.tiers;
                    const idx = tiers.findIndex(t => t.id === this.practice.tier);
                    if (idx > 0) {
                        this.originalTier = this.practice.tier;
                        this.practice.tier = tiers[idx - 1].id;
                        this.downgraded = true;
                        this.successAfterDowngrade = 0;
                        this.log(`[SYS] High error rate. Downgrading to ${this.practice.tier}.`);
                    }
                }

                // CIRCULAR STACK: Push incorrect question to the BACK of the queue
                // Create a clone to ensure it's treated as a fresh instance if needed, 
                // but references are fine. 
                // IMPORTANT: We do NOT advance round.currentCount later if incorrect.

                this.questionQueue.push({ ...q });
                this.log(`[QUEUE] Pushed back -> Queue size: ${this.questionQueue.length}`);
            }

            // Update round stats
            // Only increment currentCount if CORRECT

            this.round.stats.latencies.push(responseTimeMs);
            this.round.stats.totalTime += responseTimeMs;

            if (isCorrect) {
                this.round.currentCount++;
                this.round.stats.correct++;
                if (isFast) {
                    this.round.stats.fast++;
                } else {
                    this.round.stats.slow++;
                }
            } else {
                this.round.stats.errors++;
            }

            // Check for round completion
            // Completed if we have hit the target correct count
            if (this.round.currentCount >= this.round.targetCount) {
                if (this.nextQuestionTimeout) clearTimeout(this.nextQuestionTimeout);
                setTimeout(() => {
                    this.feedback.visible = false;
                    this.completeRound();
                }, isCorrect ? 400 : 1400);
            } else {
                // Round continues - generate next question after delay
                this.nextQuestionTimeout = setTimeout(() => {
                    this.feedback.visible = false;
                    this.generateQuestion();
                }, isCorrect ? 400 : 1400);
            }

            this.saveStats();
        },

        checkAnswer(userAnswer, correctAnswer) {
            const user = userAnswer.toString().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');
            const correct = correctAnswer.toString().toLowerCase().replace(/\s+/g, '').replace(/,/g, '');

            if (user === correct) return true;

            try {
                // Use fraction.js for robust comparison
                const userFrac = new window.Fraction(user);
                const correctFrac = new window.Fraction(correct);
                return userFrac.equals(correctFrac);
            } catch (e) {
                // Fallback to basic numeric parsing if fraction.js fails (e.g. invalid chars)
                const userNum = parseFloat(user);
                const correctNum = parseFloat(correct);
                if (!isNaN(userNum) && !isNaN(correctNum)) {
                    return Math.abs(userNum - correctNum) < 0.001;
                }
            }

            return false;
        },

        focusInput() {
            if (this.session.isActive && !this.session.isPaused && !this.settingsOpen) {
                this.$refs.answerInput?.focus();
            }
        },

        showFeedback(type, icon, text, detail) {
            this.feedback = { visible: true, type, icon, text, detail };
        },

        flash(type) {
            this.flashClass = `flash-${type}`;
            setTimeout(() => { this.flashClass = ''; }, 400);
        },

        inputKey(key) {
            if (!this.session.isActive || this.session.isPaused) return;

            if (key === 'backspace') {
                this.userAnswer = this.userAnswer.toString().slice(0, -1);
            } else {
                if (key === '.' && this.userAnswer.includes('.')) return;
                this.userAnswer += key;
            }
            this.handleInput();
            this.$nextTick(() => this.focusInput());
        },

        handleKeydown(e) {
            if (e.key === 'Escape') {
                if (this.settingsOpen) this.settingsOpen = false;
                else if (this.session.isActive) this.togglePause();
                return;
            }

            if (this.settingsOpen) return;

            const isTypingKey = /^[0-9./−\-+rR]$/.test(e.key);
            if (isTypingKey && document.activeElement !== this.$refs.answerInput) {
                this.focusInput();
            }

            if (e.key === 'Tab' && !e.shiftKey && this.session.isActive) {
                e.preventDefault();
                const cats = Object.keys(this.operations);
                const idx = cats.indexOf(this.practice.category);
                this.selectCategory(cats[(idx + 1) % cats.length]);
            }

            if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                const tiers = this.currentOperation.tiers;
                const idx = tiers.findIndex(t => t.id === this.practice.tier);
                const newIdx = e.key === 'ArrowUp' ? Math.max(0, idx - 1) : Math.min(tiers.length - 1, idx + 1);
                this.selectTier(tiers[newIdx].id);
            }
        },

        saveSettings() {
            Alpine.store('settings').save();
            this.log('[SYS] Settings saved.');
        },

        loadStats() {
            try {
                const saved = localStorage.getItem('quantflow_stats');
                if (saved) {
                    const stats = JSON.parse(saved);
                    const today = new Date().toISOString().split('T')[0];
                    if (stats.date === today) this.todayCount = stats.todayCount || 0;
                    if (stats.bestStreak) this.bestStreak = stats.bestStreak;
                    if (stats.categoryStats) this.categoryStats = stats.categoryStats;
                }
            } catch (e) { }
        },

        saveStats() {
            try {
                const today = new Date().toISOString().split('T')[0];
                localStorage.setItem('quantflow_stats', JSON.stringify({
                    date: today,
                    todayCount: this.todayCount,
                    bestStreak: this.bestStreak,
                    categoryStats: this.categoryStats
                }));

                let daily = {};
                try {
                    daily = JSON.parse(localStorage.getItem('quantflow_daily') || '{}');
                } catch (e) { }
                daily[today] = this.todayCount;
                localStorage.setItem('quantflow_daily', JSON.stringify(daily));

                // Sync logic moved to Alpine.store('auth')
                if (Alpine.store('auth').isLoggedIn) {
                    const payload = {
                        stats: {
                            todayCount: this.todayCount,
                            bestStreak: this.bestStreak,
                            categoryStats: this.categoryStats
                        },
                        lastSync: new Date().toISOString()
                    };
                    Alpine.store('auth').syncToCloud(payload);
                }
            } catch (e) { }
        },

        openExportModal() {
            const data = {
                stats: localStorage.getItem('quantflow_stats'),
                daily: localStorage.getItem('quantflow_daily'),
                settings: localStorage.getItem('quantflow_settings'),
                exportDate: new Date().toISOString()
            };
            this.exportDataStr = JSON.stringify(data, null, 2);
            this.exportModalOpen = true;
            this.log('[SYS] Export data generated.');
        },

        openImportModal() {
            this.importDataStr = '';
            this.importModalOpen = true;
        },

        processImport() {
            try {
                const data = JSON.parse(this.importDataStr);
                if (data.stats) localStorage.setItem('quantflow_stats', data.stats);
                if (data.daily) localStorage.setItem('quantflow_daily', data.daily);
                if (data.settings) localStorage.setItem('quantflow_settings', data.settings);
                this.loadSettings();
                this.loadStats();
                this.log('[SYS] Data imported successfully.');
                this.importModalOpen = false;
            } catch (e) {
                this.log('[ERR] Invalid JSON format.');
            }
        },

        openConfirmClear() {
            this.confirmModalOpen = true;
        },

        performClear() {
            localStorage.removeItem('quantflow_stats');
            localStorage.removeItem('quantflow_daily');
            localStorage.removeItem('quantflow_settings');
            this.todayCount = 0;
            this.bestStreak = 0;
            this.categoryStats = {};
            this.totalAnswered = 0;
            this.totalCorrect = 0;
            this.fastCount = 0;
            this.slowCount = 0;
            this.errorCount = 0;
            this.latencies = [];
            this.recentResponses = [];
            Alpine.store('settings').reset();
            this.log('[SYS] All data cleared.');
            this.confirmModalOpen = false;
        },

        loadSettings() {
            Alpine.store('settings').init();
        },

        destroy() {
            if (this.clockInterval) clearInterval(this.clockInterval);
            if (this.sessionInterval) clearInterval(this.sessionInterval);
        }

    }));
});
