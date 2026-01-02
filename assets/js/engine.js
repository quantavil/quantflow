
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
            { id: 'simplify', label: 'Simplify', default: false },
            { id: 'mixed', label: 'Mixed Numbers', default: false }
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
            fractions: 2.5
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

        return points;
    }

    static calculateVariantComplexity(question) {
        let points = 0;
        const variants = question.variants || [];

        const variantCosts = {
            'with_negatives': 1.0,
            'decimals': 1.5,
            'mixed': 2.5,
            'remainder': 1.0,
            'decimal_2dp': 1.5,
            'sqrt_estimate': 1.0,
            'what_percent': 1.0,
            'increase_decrease': 1.5,
            'reverse': 2.0,
            'tables_2-12': 0.5,
            'squares_1-25': 0.5,
            'add': 0.5, 'subtract': 0.8, 'multiply': 1.0, 'divide': 1.2, 'simplify': 0.5
        };

        for (const variant of variants) {
            points += variantCosts[variant] || 0;
        }

        return points;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FRACTION HELPER
// ═══════════════════════════════════════════════════════════════════════════════

class Fraction {
    constructor(n, d = 1) {
        if (d === 0) throw new Error("Denominator cannot be zero");
        this.n = n;
        this.d = d;
        this.simplify();
    }

    simplify() {
        const common = this.gcd(Math.abs(this.n), Math.abs(this.d));
        this.n /= common;
        this.d /= common;
        if (this.d < 0) {
            this.n = -this.n;
            this.d = -this.d;
        }
        return this;
    }

    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }

    add(other) {
        return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d);
    }

    sub(other) {
        return new Fraction(this.n * other.d - other.n * this.d, this.d * other.d);
    }

    mul(other) {
        return new Fraction(this.n * other.n, this.d * other.d);
    }

    div(other) {
        return new Fraction(this.n * other.d, this.d * other.n);
    }

    compare(other) {
        return (this.n * other.d) - (other.n * this.d);
    }

    toFraction() {
        if (this.d === 1) return this.n.toString();
        return `${this.n}/${this.d}`;
    }
}

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
        const answer = op(a, b);

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
            answer: parseFloat(answer.toFixed(2)),
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
            if (divisor <= 1) divisor = Utils.randomInt(2, 9);
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
            dividend = Utils.generateNumberWithDigits(tierData.digits[0]);
            answer = parseFloat((dividend / divisor).toFixed(2));
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
        const pools = {
            1: [10, 20, 25, 50, 75, 100],
            2: [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90, 100],
            3: [5, 10, 12, 15, 17, 20, 23, 25, 30, 35, 40, 45, 50, 60, 65, 75, 80, 85, 90, 100]
        };
        const pool = pools[d] || pools[1];
        const percent = pool[Utils.randomInt(0, pool.length - 1)];

        let display, answer;
        const base = Utils.randomInt(10, 200) * d;

        if (variants.includes('what_percent')) {
            const part = (percent / 100) * base;
            display = `${part} is ?% of ${base}`;
            answer = percent;
        } else if (variants.includes('increase_decrease')) {
            const isIncrease = Math.random() < 0.5;
            const change = (percent / 100) * base;
            display = `${base} ${isIncrease ? '+' : '−'} ${percent}%`;
            answer = parseFloat((isIncrease ? base + change : base - change).toFixed(2));
        } else if (variants.includes('reverse')) {
            const original = Utils.randomInt(50, 200);
            display = `X + ${percent}% = ${parseFloat((original * (1 + percent / 100)).toFixed(2))}`;
            answer = original;
        } else {
            display = `${percent}% of ${base}`;
            answer = parseFloat(((percent / 100) * base).toFixed(2));
        }

        return {
            display, operator: '%', answer, category: 'percentages', tier, variants,
            operand1: base, operand2: percent
        };
    },

    fractions(tier, variants) {
        const tierData = this._getTierData('fractions', tier);
        if (!tierData) return null;

        const maxDenom = tierData.maxDenom;
        const genFrac = () => {
            const den = Utils.randomInt(2, maxDenom);
            return new Fraction(Utils.randomInt(1, den - 1), den);
        };

        let display, answer, fResult;
        const f1 = genFrac(), f2 = genFrac();

        const operations = {
            add: (a, b) => { fResult = a.add(b); return `${a.toFraction()} + ${b.toFraction()}`; },
            subtract: (a, b) => { const [x, y] = a.compare(b) < 0 ? [b, a] : [a, b]; fResult = x.sub(y); return `${x.toFraction()} − ${y.toFraction()}`; },
            multiply: (a, b) => { fResult = a.mul(b); return `${a.toFraction()} × ${b.toFraction()}`; },
            divide: (a, b) => { fResult = a.div(b); return `${a.toFraction()} ÷ ${b.toFraction()}`; },
            simplify: () => {
                const f = Utils.randomInt(2, 5), d = Utils.randomInt(2, Math.floor(maxDenom / f)), n = Utils.randomInt(1, d - 1);
                fResult = new Fraction(n, d); return `Simplify: ${n * f}/${d * f}`;
            },
            mixed: (a, b) => {
                const w1 = Utils.randomInt(1, 5), w2 = Utils.randomInt(1, 3);
                fResult = (new Fraction(w1).add(a)).add(new Fraction(w2).add(b));
                return `${w1} ${a.toFraction()} + ${w2} ${b.toFraction()}`;
            }
        };

        const opModes = ['simplify', 'subtract', 'multiply', 'divide', 'mixed', 'add'].filter(v => variants.includes(v));
        const op = opModes.length > 0 ? opModes[Math.floor(Math.random() * opModes.length)] : 'add';
        display = operations[op](f1, f2);

        return {
            display, operator: '/', answer: fResult.toFraction(), answerNum: fResult.n, answerDen: fResult.d,
            category: 'fractions', tier, variants,
            operand1: f1.toFraction(), operand2: f2.toFraction()
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
        q.targetTime = Math.max(1.0, baseTime + (complexity * 0.3));

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
