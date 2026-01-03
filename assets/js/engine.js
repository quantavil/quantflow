
// ═══════════════════════════════════════════════════════════════════════════════
// OPERATIONS DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const OPERATIONS = {
    addition: {
        symbol: '+',
        tiers: [
            { id: '1+1', label: '1+1', digits: [1, 1], rating: 800, baseTime: 1.0 },
            { id: '1+2', label: '1+2', digits: [1, 2], rating: 900, baseTime: 1.5 },
            { id: '2+2', label: '2+2', digits: [2, 2], rating: 1000, baseTime: 2.0 },
            { id: '2+3', label: '2+3', digits: [2, 3], rating: 1100, baseTime: 2.5 },
            { id: '3+3', label: '3+3', digits: [3, 3], rating: 1250, baseTime: 3.5 }
        ],
        variants: [
            { id: 'positive', label: 'Positive Only', default: true },
            { id: 'with_negatives', label: 'With Negatives', default: false },
            { id: 'decimals', label: 'Decimals', default: false }
        ]
    },
    subtraction: {
        symbol: '−',
        tiers: [
            { id: '1-1', label: '1−1', digits: [1, 1], rating: 800, baseTime: 1.0 },
            { id: '1-2', label: '1−2', digits: [1, 2], rating: 900, baseTime: 1.5 },
            { id: '2-2', label: '2−2', digits: [2, 2], rating: 1000, baseTime: 2.5 },
            { id: '2-3', label: '2−3', digits: [2, 3], rating: 1100, baseTime: 3.0 },
            { id: '3-3', label: '3−3', digits: [3, 3], rating: 1250, baseTime: 4.0 }
        ],
        variants: [
            { id: 'standard', label: 'Standard', default: true },
            { id: 'allow_negative', label: 'Allow Negative', default: false },
            { id: 'decimals', label: 'Decimals', default: false }
        ]
    },
    multiplication: {
        symbol: '×',
        tiers: [
            { id: '1x1', label: '1×1', digits: [1, 1], rating: 800, baseTime: 1.5 },
            { id: '1x2', label: '1×2', digits: [1, 2], rating: 1000, baseTime: 2.5 },
            { id: '2x2', label: '2×2', digits: [2, 2], rating: 1200, baseTime: 4.0 },
            { id: '2x3', label: '2×3', digits: [2, 3], rating: 1400, baseTime: 6.0 }
        ],
        variants: [
            { id: 'standard', label: 'Standard', default: true },
            { id: 'tables_2-12', label: 'Tables 2-12', default: false },
            { id: 'tables_13-20', label: 'Tables 13-20', default: false },
            { id: 'tables_21-30_37', label: 'Tables 21-30 + 37', default: false },
            { id: 'squares_1-25', label: 'Squares 1-25', default: false }
        ]
    },
    division: {
        symbol: '÷',
        tiers: [
            { id: '2d1', label: '2÷1', digits: [2, 1], rating: 1000, baseTime: 2.0 },
            { id: '3d1', label: '3÷1', digits: [3, 1], rating: 1200, baseTime: 3.0 },
            { id: '3d2', label: '3÷2', digits: [3, 2], rating: 1400, baseTime: 5.0 },
            { id: '4d2', label: '4÷2', digits: [4, 2], rating: 1600, baseTime: 8.0 }
        ],
        variants: [
            { id: 'exact', label: 'Exact Division', default: true },
            { id: 'remainder', label: 'Modulo', default: false },
            { id: 'decimal_2dp', label: 'Decimal (2dp)', default: false }
        ]
    },
    powers: {
        symbol: '^',
        tiers: [
            { id: 'sq_1-10', label: 'Squares 1-10', range: [1, 10], power: 2, rating: 1000, baseTime: 1.0 },
            { id: 'sq_1-20', label: 'Squares 1-20', range: [1, 20], power: 2, rating: 1200, baseTime: 2.0 },
            { id: 'sq_1-30', label: 'Squares 1-30', range: [1, 30], power: 2, rating: 1300, baseTime: 3.0 },
            { id: 'cb_1-10', label: 'Cubes 1-10', range: [1, 10], power: 3, rating: 1400, baseTime: 2.5 },
            { id: 'cb_1-15', label: 'Cubes 1-15', range: [1, 15], power: 3, rating: 1550, baseTime: 4.0 }
        ],
        variants: [
            { id: 'squares', label: 'Squares (n²)', default: true },
            { id: 'cubes', label: 'Cubes (n³)', default: false },
            { id: 'custom', label: 'Custom (n^x)', default: false }
        ]
    },
    roots: {
        symbol: '√',
        tiers: [
            { id: 'sqrt_1-100', label: '√1-100', range: [1, 100], type: 'sqrt', rating: 1000, baseTime: 1.5 },
            { id: 'sqrt_1-400', label: '√1-400', range: [1, 400], type: 'sqrt', rating: 1200, baseTime: 2.5 },
            { id: 'sqrt_1-900', label: '√1-900', range: [1, 900], type: 'sqrt', rating: 1350, baseTime: 3.5 },
            { id: 'cbrt_1-1000', label: '∛1-1000', range: [1, 1000], type: 'cbrt', rating: 1500, baseTime: 3.0 },
            { id: 'cbrt_1-3375', label: '∛1-3375', range: [1, 3375], type: 'cbrt', rating: 1650, baseTime: 4.5 }
        ],
        variants: [
            { id: 'sqrt_perfect', label: 'Perfect Squares', default: true },
            { id: 'sqrt_estimate', label: 'Estimate (nearest)', default: false },
            { id: 'cbrt_perfect', label: 'Perfect Cubes', default: false }
        ]
    },
    percentages: {
        symbol: '%',
        tiers: [
            { id: 'simple', label: 'Simple %', difficulty: 1, rating: 1000, baseTime: 2.0 },
            { id: 'medium', label: 'Medium %', difficulty: 2, rating: 1300, baseTime: 3.0 },
            { id: 'complex', label: 'Complex %', difficulty: 3, rating: 1600, baseTime: 5.0 }
        ],
        variants: [
            { id: 'x_of_y', label: 'X% of Y', default: true },
            { id: 'what_percent', label: 'X is ?% of Y', default: false },
            { id: 'increase_decrease', label: '% Change', default: false },
            { id: 'reverse', label: 'Reverse %', default: false }
        ]
    },
    fractions: {
        symbol: '/',
        tiers: [
            { id: 'simple', label: 'Simple', maxDenom: 10, rating: 1000, baseTime: 3.0 },
            { id: 'medium', label: 'Medium', maxDenom: 20, rating: 1300, baseTime: 5.0 },
            { id: 'complex', label: 'Complex', maxDenom: 50, rating: 1600, baseTime: 8.0 }
        ],
        variants: [
            { id: 'add', label: 'Addition', default: true },
            { id: 'subtract', label: 'Subtraction', default: false },
            { id: 'multiply', label: 'Multiplication', default: false },
            { id: 'divide', label: 'Division', default: false },
            { id: 'mixed', label: 'Mixed Numbers', default: false }
        ]
    },
    approximation: {
        symbol: '≈',
        tiers: [
            { id: 'tier_1', label: 'Tier 1', difficulty: 1, rating: 1000, baseTime: 4.0 },
            { id: 'tier_2', label: 'Tier 2', difficulty: 2, rating: 1300, baseTime: 7.0 },
            { id: 'tier_3', label: 'Tier 3', difficulty: 3, rating: 1600, baseTime: 12.0 }
        ],
        variants: [
            { id: 'bodmas_rules', label: 'BODMAS', default: true },
            { id: 'nearest_integer', label: 'Nearest Int', default: false },
            { id: 'root_approx', label: 'Root Approx', default: false }
        ]
    },
    miscellaneous: {
        symbol: 'M',
        tiers: [
            { id: 'tier_1', label: 'Tier 1', count: 2, range: [10, 50], rating: 1000, baseTime: 5.0 },
            { id: 'tier_2', label: 'Tier 2', count: 3, range: [10, 100], rating: 1200, baseTime: 8.0 },
            { id: 'tier_3', label: 'Tier 3', count: 4, range: [20, 200], rating: 1400, baseTime: 12.0 },
            { id: 'tier_4', label: 'Tier 4', count: 5, range: [20, 500], rating: 1600, baseTime: 15.0 }
        ],
        variants: [
            { id: 'average', label: 'Average', default: true }
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════════════════════

const Utils = {
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

    randomFloat: (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals)),

    countDigits: (n) => {
        if (n === null || n === undefined) return 0;
        return n.toString().replace(/[^0-9]/g, '').length;
    },

    generateNumberWithDigits(digits) {
        if (digits === 1) return Utils.randomInt(1, 9);
        return Utils.randomInt(Math.pow(10, digits - 1), Math.pow(10, digits) - 1);
    },

    hasCarryAddition(a, b) {
        if (a.toString().includes('.') || b.toString().includes('.')) return false;
        const strA = Math.abs(a).toString().split('').reverse();
        const strB = Math.abs(b).toString().split('').reverse();
        let carry = 0;
        for (let i = 0; i < Math.max(strA.length, strB.length); i++) {
            const sum = parseInt(strA[i] || 0) + parseInt(strB[i] || 0) + carry;
            if (sum >= 10) return true;
            carry = Math.floor(sum / 10);
        }
        return false;
    },

    hasBorrowSubtraction(a, b) {
        if (a.toString().includes('.') || b.toString().includes('.')) return false;
        // Strictly for checking if borrowing is needed in the column algorithm
        // We assume |a| > |b| for the check usually, but for general sub it's tricky.
        // Simplified: check if any digit in top < digit in bottom
        const n1 = Math.abs(a);
        const n2 = Math.abs(b);
        const [top, bot] = n1 >= n2 ? [n1, n2] : [n2, n1];

        const strTop = top.toString().split('').reverse();
        const strBot = bot.toString().split('').reverse();

        for (let i = 0; i < strBot.length; i++) {
            if (parseInt(strTop[i] || 0) < parseInt(strBot[i] || 0)) return true;
        }
        return false;
    },

    fuzzValue(value, type = 'number') {
        if (value === 0) return 0;

        // Helper to get random sign
        const sign = Math.random() < 0.5 ? 1 : -1;

        if (type === 'percent') {
            // E.g. 20% -> 19.99% or 20.05%
            const diff = Utils.randomFloat(0.01, 0.15, 2) * sign;
            return parseFloat((value + diff).toFixed(2));
        } else if (type === 'root') {
            // E.g. sqrt(144)=12 -> sqrt(140) to sqrt(150)
            // We fuzz the SQUARED value so the root is approximate
            // If clean is 144, display 142-146
            const diff = Utils.randomInt(1, Math.max(3, Math.floor(value * 0.05))) * sign;
            return value + diff;
        } else {
            // Standard Number: 100 -> 99.8, 100.3, 99.99
            // Small numbers get smaller fuzz
            const magic = Math.random();
            let fuzzed;
            if (magic < 0.33) {
                // .99 type
                fuzzed = value - (Utils.randomInt(1, 10) / Math.pow(10, Utils.randomInt(1, 2)));
            } else if (magic < 0.66) {
                // .01 type
                fuzzed = value + (Utils.randomInt(1, 10) / Math.pow(10, Utils.randomInt(1, 2)));
            } else {
                // Random float nearby
                const range = Math.max(0.1, value * 0.02);
                fuzzed = value + (Math.random() * range * sign);
            }
            return parseFloat(fuzzed.toFixed(2));
        }
    }

};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLEXITY CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════════

class ComplexityCalculator {
    static calculate(question) {
        let points = 0;

        // Layer 1: Digit Complexity
        points += this.calculateDigitComplexity(question);

        // Layer 2: Operation Complexity
        points += this.calculateOperationComplexity(question);

        // Layer 3: Cognitive Load Modifiers
        points += this.calculateCognitiveLoad(question);

        // Layer 4: Variant Modifiers
        points += this.calculateVariantComplexity(question);

        return points;
    }

    static calculateDigitComplexity(question) {
        const d1 = Utils.countDigits(question.operand1);
        const d2 = Utils.countDigits(question.operand2);

        // Base: 1 point per digit
        let points = d1 + d2;

        // Multiplication: digit interaction is multiplicative
        if (question.category === 'multiplication') {
            points = d1 * d2 * 0.8;
        }

        // Division: dividend digits matter more
        if (question.category === 'division') {
            points = d1 * 1.2 + d2 * 0.8;
        }

        return points;
    }

    static calculateOperationComplexity(question) {
        const weights = {
            addition: 0,
            subtraction: 0.5,
            multiplication: 2.5,
            division: 3.0,
            powers: 2.0,
            roots: 3.5,
            percentages: 2.0,
            fractions: 2.5,
            approximation: 2.0,
            miscellaneous: 2.0
        };
        return weights[question.category] || 1.0;
    }

    static calculateCognitiveLoad(question) {
        let points = 0;

        if (question.hasCarry) points += 1.5;
        if (question.hasBorrow) points += 1.8;

        // Multiplication/Division Cognitive Load
        if (question.category === 'multiplication' || question.category === 'division') {
            const d1 = Utils.countDigits(question.operand1);
            const d2 = Utils.countDigits(question.operand2);
            if (d1 > 1 && d2 > 1) points += 1.5;
        }

        const nearBoundary = (n) => {
            if (typeof n !== 'number' || !Number.isInteger(n)) return false;
            const mod = Math.abs(n) % 100;
            return mod <= 5 || mod >= 95;
        };

        if (nearBoundary(question.operand1) || nearBoundary(question.operand2)) {
            points += 0.5;
        }

        // Percentage Specific: Divisional Complexity
        if (question.category === 'percentages') {
            if (question.isCleanDivision === false) {
                // Messy decimal result (e.g. 1/8 of 50) is much harder
                points += 2.0;
            } else if (question.denominator && question.denominator > 10) {
                // High denominator (e.g. 1/17) is hard even if clean
                points += 0.5;
            }
        }

        return points;
    }

    static calculateVariantComplexity(question) {
        let points = 0;
        const variants = question.variants || [];

        const variantCosts = {
            'allow_negative': 1.0,
            'decimals': 1.5,
            'mixed': 2.5,
            'remainder': 1.0,
            'decimal_2dp': 1.5,
            'sqrt_estimate': 1.0,
            'cubes': 1.5,
            'custom': 2.0,
            'cbrt_perfect': 1.5,
            'what_percent': 1.0,
            'increase_decrease': 1.5,
            'reverse': 2.0,
            'tables_2-12': 0.5,
            'tables_13-20': 1.0,
            'tables_21-30_37': 1.8,
            'squares_1-25': 0.5,
            'add': 0.5, 'subtract': 0.8, 'multiply': 1.0, 'divide': 1.2,
            'average': 1.5
        };

        for (const variant of variants) {
            points += variantCosts[variant] || 0;
        }

        return points;
    }
}

// Custom Fraction class replaced by fraction.js library

// ═══════════════════════════════════════════════════════════════════════════════
// ARCADE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

class ArcadeSystem {
    constructor() {
        this.sessionScore = 0;
        this.streak = 0;
        this.currentCategory = null;

        // Persistent stats
        this.totalXP = 0;
        this.categoryXP = {};
        this.bestStreak = 0;
        this.highScore = 0;
        this.sessionHistory = [];

        this.load();
    }

    getMultiplier() {
        // 1.0 at streak 0, up to 3.0 at streak 20+
        return 1.0 + Math.min(this.streak * 0.1, 2.0);
    }

    setCategory(category) {
        this.currentCategory = category;
    }

    onCorrect(basePoints, complexity, speedRatio, category) {
        this.streak++;

        // Update best streak
        if (this.streak > this.bestStreak) {
            this.bestStreak = this.streak;
        }

        // Speed bonus: 2.0 if very fast, 1.5 if under par, 1.0 otherwise
        const speedBonus = speedRatio >= 1.5 ? 2.0 : speedRatio >= 1.0 ? 1.5 : 1.0;
        const multiplier = this.getMultiplier();
        const points = Math.round(basePoints * complexity * speedBonus * multiplier);

        this.sessionScore += points;
        this.totalXP += points;

        // Track category XP
        const cat = category || this.currentCategory || 'unknown';
        this.categoryXP[cat] = (this.categoryXP[cat] || 0) + points;

        // Update high score if needed
        if (this.sessionScore > this.highScore) {
            this.highScore = this.sessionScore;
        }

        this.save();

        return {
            points,
            multiplier,
            streak: this.streak,
            speedBonus,
            sessionScore: this.sessionScore,
            totalXP: this.totalXP,
            categoryXP: this.categoryXP[cat],
            bestStreak: this.bestStreak
        };
    }

    onError() {
        this.streak = 0;

        return {
            streak: 0,
            multiplier: 1.0,
            sessionScore: this.sessionScore,
            totalXP: this.totalXP
        };
    }

    endSession() {
        // Save session to history
        if (this.sessionScore > 0) {
            this.sessionHistory.unshift({
                score: this.sessionScore,
                date: new Date().toISOString(),
                category: this.currentCategory
            });
            // Keep last 20 sessions
            if (this.sessionHistory.length > 20) {
                this.sessionHistory.pop();
            }
            this.save();
        }
    }

    reset() {
        // End current session before resetting
        this.endSession();

        this.sessionScore = 0;
        this.streak = 0;
    }

    load() {
        try {
            const data = localStorage.getItem('quantflow_arcade');
            if (data) {
                const parsed = JSON.parse(data);
                this.totalXP = parsed.totalXP || 0;
                this.categoryXP = parsed.categoryXP || {};
                this.bestStreak = parsed.bestStreak || 0;
                this.highScore = parsed.highScore || 0;
                this.sessionHistory = parsed.sessionHistory || [];
            }
        } catch (e) {
            console.error('[ARCADE] Load failed:', e);
        }
    }

    save() {
        try {
            localStorage.setItem('quantflow_arcade', JSON.stringify({
                totalXP: this.totalXP,
                categoryXP: this.categoryXP,
                bestStreak: this.bestStreak,
                highScore: this.highScore,
                sessionHistory: this.sessionHistory
            }));
        } catch (e) {
            console.error('[ARCADE] Save failed:', e);
        }
    }

    // Getters for UI
    getCategoryXP(category) {
        return this.categoryXP[category] || 0;
    }

    getRecentSessions(count = 5) {
        return this.sessionHistory.slice(0, count);
    }
}


// ═══════════════════════════════════════════════════════════════════════════════
// QUESTION GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

const QuestionGenerator = {
    generate(category, tier, variants) {
        const gen = this[category];
        return gen ? gen.call(this, tier, variants) : null;
    },

    _getTierData(category, tierId) {
        return OPERATIONS[category]?.tiers.find(t => t.id === tierId) || null;
    },

    _base(category, tierData, a, b, op, symbol, extras = {}) {
        // Use Fraction.js for precise arithmetic
        const fracA = new window.Fraction(a);
        const fracB = new window.Fraction(b);
        let answerFrac;

        // Apply operation using Fraction.js
        switch (symbol) {
            case '+': answerFrac = fracA.add(fracB); break;
            case '−': answerFrac = fracA.sub(fracB); break;
            case '×': answerFrac = fracA.mul(fracB); break;
            default: answerFrac = new window.Fraction(op(a, b));
        }

        const answer = answerFrac.valueOf();

        // Guard against NaN/Null values
        if (
            isNaN(a) || a === null ||
            isNaN(b) || b === null ||
            isNaN(answer) || answer === null
        ) {
            console.error('[GEN] Generated invalid question (NaN/Null detected):', { a, b, symbol, answer });
            return null;
        }

        return {
            display: `${a < 0 ? `(${a})` : a} ${symbol} ${b < 0 ? `(${b})` : b}`,
            operand1: a, operand2: b, operator: symbol,
            answer: Number.isInteger(answer) ? answer : Math.round(answer * 100) / 100,
            category, tier: tierData.id, ...extras
        };
    },

    addition(tier, variants) {
        const tierData = this._getTierData('addition', tier);
        if (!tierData) return null;

        let a = Utils.generateNumberWithDigits(tierData.digits[0]);
        let b = Utils.generateNumberWithDigits(tierData.digits[1]);

        if (variants.includes('with_negatives') && Math.random() < 0.3) {
            const flip = Math.random();
            if (flip < 0.5) { a = -a; } else { b = -b; }
        }
        if (variants.includes('decimals')) {
            a = Utils.randomFloat(a * 0.1, a * 1.1, 1);
            b = Utils.randomFloat(b * 0.1, b * 1.1, 1);
        }

        const baseQ = this._base('addition', tierData, a, b, (x, y) => x + y, '+');
        if (!baseQ) return null;

        return {
            ...baseQ,
            hasCarry: Utils.hasCarryAddition(Math.abs(a), Math.abs(b)), variants
        };
    },

    subtraction(tier, variants) {
        const tierData = this._getTierData('subtraction', tier);
        if (!tierData) return null;

        // Fundamental Shuffle: Randomly assign digit counts
        const dOrder = Math.random() < 0.5 ? [0, 1] : [1, 0];
        let a = Utils.generateNumberWithDigits(tierData.digits[dOrder[0]]);
        let b = Utils.generateNumberWithDigits(tierData.digits[dOrder[1]]);

        if (variants.includes('decimals')) {
            a = Utils.randomFloat(a * 0.1, a * 1.2, 1);
            b = Utils.randomFloat(b * 0.1, b * 1.2, 1);
        }

        // Only enforce positive if negatives are explicitly forbidden
        if (!variants.includes('allow_negative') && a < b) [a, b] = [b, a];

        const base = this._base('subtraction', tierData, a, b, (x, y) => x - y, '−');
        if (!base) return null;

        return {
            ...base,
            hasBorrow: Utils.hasBorrowSubtraction(a, b), variants
        };
    },

    multiplication(tier, variants) {
        const tierData = this._getTierData('multiplication', tier);
        if (!tierData) return null;

        let a, b;
        if (variants.includes('tables_2-12') && ['1x1', '1x2'].includes(tier)) {
            a = Utils.randomInt(2, 12);
            b = Utils.randomInt(2, 12);
        } else if (variants.includes('tables_13-20')) {
            a = Utils.randomInt(13, 20);
            b = Utils.randomInt(2, 12);
        } else if (variants.includes('tables_21-30_37')) {
            const tablePool = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 37];
            a = tablePool[Utils.randomInt(0, tablePool.length - 1)];
            b = Utils.randomInt(2, 12);
        } else if (variants.includes('squares_1-25')) {
            a = b = Utils.randomInt(1, 25);
        } else {
            a = Utils.generateNumberWithDigits(tierData.digits[0]);
            b = Utils.generateNumberWithDigits(tierData.digits[1]);
        }

        const base = this._base('multiplication', tierData, a, b, (x, y) => x * y, '×');
        if (!base) return null;

        return { ...base, variants };
    },

    division(tier, variants) {
        const tierData = this._getTierData('division', tier);
        if (!tierData) return null;

        let divisor = Utils.generateNumberWithDigits(tierData.digits[1]);
        // Universal check: Avoid division by 0 or 1 for non-triviality
        if (divisor <= 1) divisor = Utils.randomInt(2, 9);
        const maxDiv = Math.pow(10, tierData.digits[0]) - 1;
        const minDiv = Math.pow(10, tierData.digits[0] - 1);

        let dividend, answer, remainder = 0;
        const possibleModes = ['exact', 'remainder', 'decimal_2dp'];
        const activeModes = variants.filter(v => possibleModes.includes(v));
        const mode = activeModes.length > 0 ? activeModes[Math.floor(Math.random() * activeModes.length)] : 'exact';

        if (mode === 'exact') {
            const maxQ = Math.floor(maxDiv / divisor);
            const minQ = Math.ceil(minDiv / divisor);
            const quotient = maxQ >= minQ ? Utils.randomInt(minQ, maxQ) : Utils.randomInt(2, 9);
            dividend = divisor * quotient;
            answer = quotient;
        } else if (mode === 'remainder') {
            const quotient = Utils.randomInt(2, 20);
            const maxRem = divisor - 1;
            remainder = maxRem > 0 ? Utils.randomInt(1, maxRem) : 0;
            dividend = divisor * quotient + remainder;
            answer = remainder; // Modulo only
            return {
                display: `${dividend} mod ${divisor}`,
                operand1: dividend, operand2: divisor, operator: 'mod',
                answer, remainder, category: 'division', tier, variants, selectedMode: mode
            };
        } else {
            // decimal_2dp mode: Use Fraction.js for exact division
            dividend = Utils.generateNumberWithDigits(tierData.digits[0]);
            const divFrac = new window.Fraction(dividend, divisor);
            answer = Math.round(divFrac.valueOf() * 100) / 100;
        }

        return {
            display: `${dividend} ÷ ${divisor}`,
            operand1: dividend, operand2: divisor, operator: '÷',
            answer, remainder, category: 'division', tier, variants, selectedMode: mode
        };
    },

    powers(tier, variants) {
        const tierData = this._getTierData('powers', tier);
        if (!tierData) return null;

        const base = Utils.randomInt(tierData.range[0], tierData.range[1]);
        const power = variants.includes('custom') ? Utils.randomInt(2, 4) :
            variants.includes('cubes') ? 3 :
                variants.includes('squares') ? 2 : tierData.power;
        const superscript = power === 2 ? '²' : power === 3 ? '³' : `^${power}`;

        return {
            display: `${base}${superscript}`,
            operand1: base, operand2: power, operator: '^',
            answer: Math.pow(base, power), category: 'powers', tier, variants
        };
    },

    roots(tier, variants) {
        const tierData = this._getTierData('roots', tier);
        if (!tierData) return null;

        const isCbrt = tierData.type === 'cbrt' || variants.includes('cbrt_perfect');
        const isEstimate = variants.includes('sqrt_estimate');

        let radicand, answer;
        if (isCbrt) {
            const minRoot = Math.max(2, Math.ceil(Math.cbrt(tierData.range[0])));
            const maxRoot = Math.floor(Math.cbrt(tierData.range[1]));
            const root = Utils.randomInt(minRoot, maxRoot);
            radicand = root ** 3;
            answer = root;
        } else if (isEstimate) {
            radicand = Utils.randomInt(Math.max(2, tierData.range[0]), tierData.range[1]);
            answer = Math.round(Math.sqrt(radicand));
        } else {
            const minRoot = Math.max(2, Math.ceil(Math.sqrt(tierData.range[0])));
            const maxRoot = Math.floor(Math.sqrt(tierData.range[1]));
            const root = Utils.randomInt(minRoot, maxRoot);
            radicand = root ** 2;
            answer = root;
        }

        return {
            display: `${isCbrt ? '∛' : '√'}${radicand}`,
            operand1: radicand, operand2: isCbrt ? 3 : 2, operator: isCbrt ? '∛' : '√',
            answer, isEstimate, category: 'roots', tier, variants
        };
    },

    percentages(tier, variants) {
        const tierData = this._getTierData('percentages', tier);
        if (!tierData) return null;

        const d = tierData.difficulty;
        // Exam Level Pools
        const pools = {
            1: [10, 12.5, 20, 25, 33.33, 50, 66.67, 75, 100, 125, 150, 200],
            2: [5, 6.25, 6.67, 8.33, 10, 12.5, 15, 16.67, 20, 25, 30, 33.33, 37.5, 40, 45, 50, 60, 62.5, 66.67, 75, 80, 112.5, 125, 133.33, 150, 175, 200, 250],
            3: [4, 5, 5.26, 5.55, 5.88, 6.25, 6.67, 7.14, 7.69, 8.33, 9.09, 10, 11.11, 12.5, 14.28, 15, 16.67, 18.75, 20, 22.22, 25, 27.5, 30, 33.33, 37.5, 40, 42.85, 44.44, 45, 50, 55, 55.55, 60, 62.5, 66.67, 70, 75, 77.77, 80, 83.33, 87.5, 88.88, 90, 95, 100, 112.5, 125, 133.33, 137.5, 150, 162.5, 166.67, 175, 187.5, 200, 225, 250, 300, 400, 500]
        };
        const pool = pools[d] || pools[1];
        const percent = pool[Utils.randomInt(0, pool.length - 1)];

        // Explicit Fraction Mapping for clean exam math
        // Maps % value -> [numerator, denominator]
        const explicitFractions = {
            12.5: [1, 8], 33.33: [1, 3], 66.67: [2, 3], 16.67: [1, 6], 83.33: [5, 6],
            6.25: [1, 16], 37.5: [3, 8], 62.5: [5, 8], 87.5: [7, 8],
            8.33: [1, 12], 11.11: [1, 9], 22.22: [2, 9], 44.44: [4, 9], 55.55: [5, 9], 77.77: [7, 9], 88.88: [8, 9],
            14.28: [1, 7], 28.57: [2, 7], 42.85: [3, 7], 57.14: [4, 7], 71.42: [5, 7],
            9.09: [1, 11], 18.18: [2, 11], 27.27: [3, 11], 45.45: [5, 11],
            5.88: [1, 17], 5.26: [1, 19], 5.55: [1, 18], 5: [1, 20], 10: [1, 10], 20: [1, 5], 25: [1, 4], 40: [2, 5], 50: [1, 2], 60: [3, 5], 75: [3, 4], 80: [4, 5],
            6.67: [1, 15], 15: [3, 20], 30: [3, 10], 45: [9, 20]
        };

        // Construct Fraction Object
        // Handle > 100% by splitting integer part
        const basePercent = percent > 100 ? (percent % 100 === 0 ? 100 : parseFloat((percent % 100).toFixed(2))) : percent;
        let frac;

        if (basePercent === 100 || basePercent === 0) {
            frac = new window.Fraction(1);
        } else if (explicitFractions[basePercent]) {
            frac = new window.Fraction(...explicitFractions[basePercent]);
        } else {
            // Fallback for unmapped percentages - use single argument for float safety
            frac = new window.Fraction(basePercent / 100);
        }

        // Add back the hundreds component (e.g. 133.33% -> 1 + 1/3)
        if (percent > 100) {
            const hundreds = Math.floor(percent / 100);
            frac = frac.add(hundreds);
        }

        // Safe conversion of denominator to Number for math with regular integers
        const denominator = Number(frac.d);

        // Smart Base Generation: Ensure base is a multiple of the denominator
        const minVal = 10 * d;
        const maxVal = 200 * d;
        const minK = Math.ceil(minVal / denominator);
        const maxK = Math.floor(maxVal / denominator);
        const k = Utils.randomInt(minK, Math.max(minK, maxK));
        const base = k * denominator;

        let display, answer;

        if (variants.includes('what_percent')) {
            // Part = Fraction * Base
            const partFrac = frac.mul(new window.Fraction(base));
            // valueOf() converts to Number (handles potential BigInt internals)
            const partVal = partFrac.valueOf();

            display = `${partVal} is ?% of ${base}`;
            answer = percent;
        } else if (variants.includes('increase_decrease')) {
            const isIncrease = Math.random() < 0.5;
            const changeFrac = frac.mul(new window.Fraction(base));
            const changeVal = changeFrac.valueOf();

            display = `${base} ${isIncrease ? '+' : '−'} ${percent}%`;
            answer = isIncrease ? (base + changeVal) : (base - changeVal);
        } else if (variants.includes('reverse')) {
            // X * (1 ± p) = Result. Find X.
            const original = base;
            const isIncrease = percent >= 100 ? true : Math.random() < 0.5;

            let multiplier;
            if (isIncrease) {
                multiplier = new window.Fraction(1).add(frac);
            } else {
                multiplier = new window.Fraction(1).sub(frac);
            }

            const resultFrac = multiplier.mul(new window.Fraction(original));

            display = `? ${isIncrease ? '+' : '−'} ${percent}% = ${resultFrac.valueOf()}`;
            answer = original;
        } else {
            // Standard
            display = `${percent}% of ${base}`;
            const ansFrac = frac.mul(new window.Fraction(base));
            answer = ansFrac.valueOf();
        }

        // Clean division check for complexity scaling
        const isCleanDivision = Number.isInteger(parseFloat(answer));

        return {
            display, operator: '%', answer, category: 'percentages', tier, variants,
            operand1: base, operand2: percent,
            isCleanDivision, denominator
        };
    },

    miscellaneous(tier, variants) {
        const tierData = this._getTierData('miscellaneous', tier);
        if (!tierData) return null;

        if (variants.includes('average')) {
            const count = tierData.count;
            const min = tierData.range[0];
            const max = tierData.range[1];

            // Generate 'count' random numbers
            let nums = [];
            let sum = 0;

            // To ensure integer average, the sum must be divisible by 'count'.
            // Strategy: Generate count-1 numbers, calculated required last number.

            for (let i = 0; i < count - 1; i++) {
                const n = Utils.randomInt(min, max);
                nums.push(n);
                sum += n;
            }

            // Calculate remainder to see what we need for the last number
            const remainder = sum % count;
            const needed = (count - remainder) % count;

            // Generate a last number that satisfies (n % count === needed)
            // n = k * count + needed
            let lastNum = Utils.randomInt(min, max);
            // Adjust lastNum to match remainder requirement
            let adjustment = lastNum % count - needed;
            lastNum -= adjustment;

            // Ensure lastNum is within reasonable bounds (it might drift slightly out of min/max, but that's fine for variety)
            if (lastNum < min) lastNum += count;

            nums.push(lastNum);

            // Recalculate sum and average using Fraction.js for safety, though integer logic guarantees it
            let fSum = new window.Fraction(0);
            nums.forEach(n => fSum = fSum.add(n));

            const fCount = new window.Fraction(count);
            const fAvg = fSum.div(fCount);

            const answer = fAvg.valueOf();

            return {
                display: `Avg(${nums.join(', ')})`,
                operand1: null, operand2: null, operator: 'Avg',
                answer: answer,
                category: 'miscellaneous', tier, variants,
                nums: nums
            };
        }

        return null;
    },

    fractions(tier, variants) {
        const tierData = this._getTierData('fractions', tier);
        if (!tierData) return null;

        const maxDenom = tierData.maxDenom;
        const genFrac = () => {
            const den = Utils.randomInt(2, maxDenom);
            return new window.Fraction(Utils.randomInt(1, den - 1), den);
        };

        let display, fResult;
        const f1 = genFrac(), f2 = genFrac();

        const operations = {
            add: (a, b) => { fResult = a.add(b); return `${a.toFraction()} + ${b.toFraction()}`; },
            subtract: (a, b) => {
                const [x, y] = a.compare(b) < 0 ? [b, a] : [a, b];
                fResult = x.sub(y);
                return `${x.toFraction()} − ${y.toFraction()}`;
            },
            multiply: (a, b) => { fResult = a.mul(b); return `${a.toFraction()} × ${b.toFraction()}`; },
            divide: (a, b) => { fResult = a.div(b); return `${a.toFraction()} ÷ ${b.toFraction()}`; },
            mixed: (a, b) => {
                const w1 = Utils.randomInt(1, 5), w2 = Utils.randomInt(1, 3);
                const mf1 = new window.Fraction(w1).add(a);
                const mf2 = new window.Fraction(w2).add(b);
                fResult = mf1.add(mf2);
                return `${w1} ${a.toFraction()} + ${w2} ${b.toFraction()}`;
            }
        };

        const opModes = ['subtract', 'multiply', 'divide', 'mixed', 'add'].filter(v => variants.includes(v));
        const op = opModes.length > 0 ? opModes[Math.floor(Math.random() * opModes.length)] : 'add';
        display = operations[op](f1, f2);

        return {
            display,
            operator: '/',
            answer: fResult.toFraction(),
            answerNum: fResult.n,
            answerDen: fResult.d,
            category: 'fractions',
            tier,
            variants,
            operand1: f1.toFraction(),
            operand2: f2.toFraction()
        };
    },

    approximation(tier, variants) {
        const tierData = this._getTierData('approximation', tier);
        if (!tierData) return null;

        // Helper generators for "Clean" components
        const genCleanNumber = (min = 10, max = 500) => Utils.randomInt(min, max);

        const genCleanPercent = () => {
            const pools = [10, 20, 25, 50, 75, 12.5, 33.33, 66.67];
            return pools[Utils.randomInt(0, pools.length - 1)];
        };

        const genCleanSquare = () => {
            const r = Utils.randomInt(5, 30);
            return { root: r, square: r * r };
        };

        const genCleanCube = () => {
            const r = Utils.randomInt(3, 15);
            return { root: r, cube: r * r * r };
        };

        // Component Builders: Return { value: Number(clean answer), display: String(fuzzed expression) }
        const buildComponent = (type) => {
            if (type === 'percent') {
                const p = genCleanPercent();
                // Calculate Base such that P% of Base is integer
                // P can be 33.33 -> 1/3. 
                let frac;
                if (p === 33.33) frac = new window.Fraction(1, 3);
                else if (p === 66.67) frac = new window.Fraction(2, 3);
                else if (p === 12.5) frac = new window.Fraction(1, 8);
                else frac = new window.Fraction(p, 100);

                const denom = Number(frac.d);
                const mult = Utils.randomInt(1, 20);
                const base = denom * mult * Utils.randomInt(1, 5); // Ensure decent size
                const val = frac.mul(base).valueOf(); // Clean result

                // Fuzz
                const fuzzedP = Utils.fuzzValue(p, 'percent');
                const fuzzedBase = Utils.fuzzValue(base);

                return { value: Number(val), display: `${fuzzedP}% of ${fuzzedBase}` };

            } else if (type === 'root_sq') {
                const { root, square } = genCleanSquare();
                // Fuzz the square
                const fuzzedSq = Utils.fuzzValue(square, 'root');
                return { value: root, display: `√${fuzzedSq}` };

            } else if (type === 'root_cb') {
                const { root, cube } = genCleanCube();
                const fuzzedCb = Utils.fuzzValue(cube, 'root');
                return { value: root, display: `∛${fuzzedCb}` };

            } else if (type === 'pow') {
                const base = Utils.randomInt(2, 15);
                const exp = 2; // Keep simple for approx usually
                const val = Math.pow(base, exp);
                // Fuzz base OR don't fuzz small powers much?
                // Usually approx questions are like 14.9^2
                const fuzzedBase = Utils.fuzzValue(base);
                return { value: val, display: `${fuzzedBase}²` };

            } else if (type === 'number') {
                const val = genCleanNumber();
                const fuzzed = Utils.fuzzValue(val);
                return { value: val, display: `${fuzzed}` };
            }
        };

        // Structure definitions based on Tier
        // Tier 1: A op B
        // Tier 2: A op B op C (or A op B where components are complex)
        // Tier 3: (A op B) / C or similar complex structures

        let structure;
        const d = tierData.difficulty;

        // Force variants if selected
        let useRoots = variants.includes('root_approx') || (Math.random() < 0.3 && d > 1);

        // Define structures
        // [ComponentType, Operator, ComponentType, ...]

        const forceNumber = variants.includes('nearest_integer');

        const ops = ['+', '−', '×', '÷'];
        let types = ['number'];

        if (!forceNumber) {
            types.push('percent', 'pow');
        }

        // Roots logic
        const allowRoots = variants.includes('root_approx') || (!forceNumber && Math.random() < 0.3);
        if (allowRoots) {
            types.push('root_sq');
            if (d > 1) types.push('root_cb');
        }

        // If roots explicitly requested, prioritize them in simple tiers
        const prioritizeRoots = variants.includes('root_approx');

        let cleanAnswer;
        let displayStr;

        try {
            if (d === 1) {
                // Simple: Num op Num, or Simple Root, or Simple Percent
                if (allowRoots) {
                    const c = buildComponent('root_sq');
                    cleanAnswer = c.value;
                    displayStr = c.display;
                } else if (Math.random() < 0.4) {
                    const c = buildComponent('percent');
                    cleanAnswer = c.value;
                    displayStr = c.display;
                } else {
                    // Multiplication or Division of decimals
                    const op = Math.random() < 0.5 ? '×' : (Math.random() < 0.5 ? '+' : '−');
                    const c1 = buildComponent('number');
                    const c2 = buildComponent('number');

                    // Keep clean arithmetic simple
                    let v1 = c1.value, v2 = c2.value;

                    if (op === '×') {
                        v1 = Utils.randomInt(5, 25);
                        v2 = Utils.randomInt(5, 20); // Keep reasonable
                        cleanAnswer = v1 * v2;
                        displayStr = `${Utils.fuzzValue(v1)} × ${Utils.fuzzValue(v2)}`;
                    } else if (op === '+') {
                        cleanAnswer = v1 + v2;
                        displayStr = `${c1.display} + ${c2.display}`;
                    } else {
                        if (v1 < v2) [v1, v2] = [v2, v1];
                        cleanAnswer = v1 - v2;
                        displayStr = `${Utils.fuzzValue(v1)} − ${Utils.fuzzValue(v2)}`;
                    }
                }
            } else if (d === 2) {
                // Form: C1 op C2
                // One component should be complex (Percent/Root/Pow)
                const op = ops[Utils.randomInt(0, 1)]; // + or - mostly for approximations between terms

                const type1 = types.length > 1 ? types[Utils.randomInt(1, types.length - 1)] : types[0];
                const type2 = 'number';

                const c1 = buildComponent(type1);
                const c2 = buildComponent(type2);

                if (op === '+') {
                    cleanAnswer = c1.value + c2.value;
                    displayStr = `${c1.display} + ${c2.display}`;
                } else {
                    // Subtraction
                    // Ensure positive result ideally?
                    let v1 = c1.value, v2 = c2.value;
                    let d1 = c1.display, d2 = c2.display;
                    if (v1 < v2) { [v1, v2] = [v2, v1];[d1, d2] = [d2, d1]; }
                    cleanAnswer = v1 - v2;
                    displayStr = `${d1} − ${d2}`;
                }
            } else {
                // Tier 3: Complex BODMAS
                // Form: (C1 + C2) / C3 or C1 + C2 - C3
                const structureType = Math.random() < 0.5 ? 'linear' : 'divisive';

                if (structureType === 'linear') {
                    const type1 = types.length > 1 ? types[Utils.randomInt(1, types.length - 1)] : types[0];
                    const c1 = buildComponent(type1);
                    const c2 = buildComponent('number');
                    const c3ValType = types[Utils.randomInt(0, types.length - 1)];
                    const c3 = buildComponent(c3ValType);

                    // C1 + C2 - C3
                    cleanAnswer = c1.value + c2.value - c3.value;
                    displayStr = `${c1.display} + ${c2.display} − ${c3.display}`;
                } else {
                    // (C1 + C2) / C3
                    // Make sure (C1+C2) is divisible by C3
                    const c3 = Utils.randomInt(2, 10);
                    const targetNum = c3 * Utils.randomInt(5, 50);

                    // Split targetNum into C1 + C2
                    const v1 = Math.floor(targetNum * 0.6);
                    const v2 = targetNum - v1;

                    const c1_disp = Utils.fuzzValue(v1);
                    const c2_disp = Utils.fuzzValue(v2);
                    const c3_disp = Utils.fuzzValue(c3);

                    cleanAnswer = targetNum / c3;
                    displayStr = `(${c1_disp} + ${c2_disp}) ÷ ${c3_disp}`;
                }
            }
        } catch (e) {
            console.error('Approximation Gen Error', e);
            return null;
        }

        // Round final answer to nearest integer as that's the goal of approximation
        cleanAnswer = Math.round(cleanAnswer);

        return {
            display: `${displayStr} = ?`,
            operand1: displayStr, operand2: null, operator: '≈',
            answer: cleanAnswer,
            category: 'approximation', tier, variants
        };
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

class Engine {
    constructor() {
        this.arcade = new ArcadeSystem();
    }

    generateQuestion(category, tier, variants) {
        // Set current category for XP tracking
        this.arcade.setCategory(category);

        const q = QuestionGenerator.generate(category, tier, variants);
        if (!q) return null;

        // Calculate complexity
        const complexity = ComplexityCalculator.calculate(q);
        q.complexity = complexity;

        // Hybrid target time: tier baseTime + complexity modifier
        const tierData = OPERATIONS[category]?.tiers.find(t => t.id === tier);
        const baseTime = tierData?.baseTime || 3.0;

        // Multipliers fixed to defaults
        let baseMult = 1.0;
        let compMult = 0.6;

        q.targetTime = Math.max(1.0, (baseTime * baseMult) + (complexity * compMult));

        return q;
    }

    submitAnswer(question, timeTaken, isCorrect) {
        const basePoints = 10;
        const complexity = question.complexity || 1;

        let result;
        if (isCorrect) {
            // Speed ratio: >1 means faster than par
            const speedRatio = question.targetTime / Math.max(0.1, timeTaken);
            result = this.arcade.onCorrect(basePoints, complexity, speedRatio, question.category);
        } else {
            result = this.arcade.onError();
        }

        return result;
    }

    resetSession() {
        this.arcade.reset();
    }
}

// Global Exports
window.Engine = Engine;
window.OPERATIONS = OPERATIONS;
