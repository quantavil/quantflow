# Engine.js Deep Dive: Architecture & Random Generation

## Overview

`engine.js` is the mathematical heart of QuantFlow. It generates questions, calculates their complexity, and manages the arcade scoring system. Most importantly, it creates the **illusion of perfect randomness** while secretly applying intelligent constraints that keep users in the optimal challenge zone.

---

## 1. The Randomness Philosophy

### A. True Randomness vs Perceived Randomness

The engine uses **`Math.random()`** as its foundation, which is JavaScript's pseudo-random number generator. Every number generation starts here:

```javascript
Utils.randomInt(min, max) => Math.floor(Math.random() * (max - min + 1)) + min
```

**Critical Insight:** Users don't actually want pure randomness—they want *variety without repetition* and *gradual difficulty*. The engine achieves this through layered constraints.

### B. How It Feels Random to Users

1. **Digit Shuffling** (Subtraction): Numbers with different digit counts are randomly assigned to operand positions
   ```javascript
   const dOrder = Math.random() < 0.5 ? [0, 1] : [1, 0];
   a = generateNumberWithDigits(digits[dOrder[0]]);
   ```
   Result: `73 − 8` or `8 − 73` appear with equal probability, creating variety.

2. **Variant Randomization**: When multiple variants are active (e.g., "exact division" + "modulo"), one is picked randomly per question
   ```javascript
   const mode = activeModes[Math.floor(Math.random() * activeModes.length)];
   ```

3. **Pool-Based Percentages**: Instead of truly random percentages, questions pick from curated pools
   ```javascript
   pools[1] = [10, 20, 25, 50, 75, 100]  // Simple
   pools[3] = [5,10,12,15,17,20,23,25...] // Complex
   ```
   This ensures "nice" percentages appear while still feeling unpredictable.

4. **Edge Case Sprinkles**: 30% chance of negatives, boundary-aware number generation
   ```javascript
   if (variants.includes('with_negatives') && Math.random() < 0.3) {
       // Flip one operand negative
   }
   ```

---

## 2. Question Generation Deep Dive

### A. The Two-Phase System

Every question goes through:

1. **Raw Generation** (`QuestionGenerator.generate`)
   - Respects tier constraints (e.g., "2+2" means both operands are 2-digit)
   - Applies variant modifiers (decimals, negatives, special modes)
   - Guards against invalid outputs (NaN, division by zero)

2. **Complexity Enrichment** (`Engine.generateQuestion`)
   - Calculates cognitive load using `ComplexityCalculator`
   - Assigns dynamic target time based on tier + complexity
   - Attaches metadata for the arcade system

### B. Category-Specific Quirks

#### **Addition/Subtraction**
- **Carry Detection**: Simulates the column-by-column algorithm
  ```javascript
  hasCarryAddition(47, 68):
    7 + 8 = 15 >= 10 → TRUE (carry detected)
  ```
- **Borrow Detection**: Checks if any column requires borrowing
  ```javascript
  hasBorrowSubtraction(82, 47):
    2 < 7 → TRUE (borrow needed)
  ```

#### **Multiplication**
- **Tables Mode**: Overrides digit logic, forces specific ranges:
  - **Tables 2-12**: Core foundation
  - **Tables 13-20**: Banking exam baseline
  - **Tables 21-30 + 37**: Advanced competitive level including targeted prime factor practice
- **Squares Mode**: Sets `a = b` for perfect squares

#### **Division**
- **Three Modes**:
  1. **Exact**: `dividend = divisor × quotient` (always clean)
  2. **Modulo**: `answer = dividend % divisor` (remainder only)
  3. **Decimal**: `answer = (dividend / divisor).toFixed(2)`
- **Smart Divisor Generation**: Never allows 0 or 1
  ```javascript
  if (divisor <= 1) divisor = randomInt(2, 9);
  ```
-   **Three Modes**:
    1.  **Exact**: `dividend = divisor × quotient` (always clean)
    2.  **Modulo**: `answer = dividend % divisor` (remainder only)
    3.  **Decimal**: `answer = (dividend / divisor).toFixed(2)`
-   **Smart Divisor Generation**: Never allows 0 or 1
    ```javascript
    if (divisor <= 1) divisor = randomInt(2, 9);
    ```

#### **Powers/Roots**
-   **Perfect Generation**: Works backward from root to radicand
    ```javascript
    // For √n, generate root first, then square it
    const root = randomInt(minRoot, maxRoot);
    radicand = root ** 2;
    ```
-   **Guarantee**: Every root question has an integer answer (unless "estimate" variant active)

#### **Percentages**
-   **Competitive Banking Exam Pools**: Exhaustive list of fractional conversions (1/2 through 1/20).
-   **Above 100% Support**: Includes values like 112.5%, 133.33%, 166.67%, and up to 500%.
-   **Normalization Logic**: Percentages > 100% are normalized (e.g., 250% → 50%) to correctly identify the base fractional denominator.
-   **Divisibility Detection**: Uses a robust check for integer results (`(percent/100 * base)` is an integer) to identify "Clean Divisions".
-   **Four Variants**: Forward (X% of Y), reverse (X is ?% of Y), change (±%), unknown original.

#### **Fractions**
-   **Fraction.js Integration**: Uses external library for precise arithmetic
-   **Generator**: Creates proper fractions `randomInt(1, denom-1) / randomInt(2, maxDenom)`
-   **Operation Chaining**: `f1.add(f2)` → automatic simplification

---

## 3. Complexity Calculator: The Mental Load Algorithm

### Layer 1: Digit Complexity
Base cost = sum of digit counts, with operation-specific multipliers:
-   **Addition**: `d1 + d2`
-   **Multiplication**: `d1 × d2 × 0.8` (interaction is multiplicative)
-   **Division**: `d1 × 1.2 + d2 × 0.8` (dividend harder than divisor)

### Layer 2: Operation Weight
Inherent difficulty of the operation itself:
```javascript
addition: 0       // Baseline
subtraction: 0.5  // Mental gymnastics
multiplication: 2.5
division: 3.0
roots: 3.5        // Highest base cost
percentages: 2.0
fractions: 2.5
```

### Layer 3: Cognitive Load Bonuses
- **Boundary Numbers**: +0.5 (numbers near 100, 1000 etc. have special rules)
- **Percentage Clean Division**: 
  - **Non-clean**: +2.0 (e.g., 12.5% of 55 = 6.875)
  - **High Denominator**: +0.5 (e.g., 1/17 even if clean)

### Layer 4: Variant Modifiers
Each active variant adds complexity:
```javascript
'decimals': +1.5
'allow_negative': +1.0
'mixed' (fractions): +2.5
'cubes': +1.5
'reverse' (%): +2.0
```

**Example Calculation:**
```
Question: 847 + 576
- Digit Complexity: 3 + 3 = 6
- Operation: 0 (addition)
- Cognitive: +1.5 (has carry: 7+6=13)
- Variants: 0
Total: 7.5 complexity points
```

---

## 4. The Arcade System: Streak-Based Progression

### Score Formula
```
Points = 10 × Complexity × SpeedBonus × Multiplier

Where:
  SpeedBonus = 2.0 (≥1.5× par) | 1.5 (≥1.0× par) | 1.0 (slower)
  Multiplier = 1.0 + min(streak × 0.1, 2.0)  → caps at 3.0×
```

### Multiplier Progression
| Streak | Multiplier | Effect |
|--------|------------|--------|
| 0-4    | 1.0-1.4×   | Building momentum |
| 5-9    | 1.5-1.9×   | Flow state |
| 10-14  | 2.0-2.4×   | Expert zone |
| 15-19  | 2.5-2.9×   | Mastery |
| 20+    | 3.0×       | **Peak performance** |

### Error Handling
- Streak → 0
- Multiplier → 1.0×
- Session score persists (no punishment)

### Persistence
- **Session Data**: `sessionScore`, `streak` (volatile)
- **Lifetime Data**: `totalXP`, `categoryXP`, `bestStreak` (localStorage)
- **Session History**: Last 20 sessions saved with score/date/category

---

## 5. Par Time System: The Flow Calibration

### Dynamic Target Time
```javascript
targetTime = (baseTime × 1.0) + (complexity × 0.6)
```

Where:
- **baseTime**: Tier-specific constant (1.0s for easy, 8.0s for hard division)
- **Complexity**: Question-specific load from calculator
- **Minimum**: Always ≥1.0s (prevents impossible expectations)

**Example:**
```
Addition 2+2 tier, question "47 + 83":
  baseTime = 2.0s
  complexity = 6.5
  targetTime = 2.0 + (6.5 × 0.6) = 5.9s
```

**Design Goal:** Par time represents the **80th percentile** of performance—achievable but requires focus.

---

## 6. Null Safety & Edge Cases

### Guards Against Invalid Questions
```javascript
if (isNaN(a) || a === null || isNaN(answer)) {
    console.error('Generated invalid question');
    return null;
}
```

### Division by Zero Protection
```javascript
if (divisor <= 1) divisor = randomInt(2, 9);
```

### Fraction Validity
```javascript
const genFrac = () => {
    const den = randomInt(2, maxDenom);
    return new Fraction(randomInt(1, den - 1), den); // Numerator always < denominator
};
```

---

## 7. How Randomness Creates Engagement

### A. Controlled Chaos
Users perceive randomness because:
1. **No Visible Patterns**: Within a tier, questions use the full digit range
2. **Variant Mixing**: Multiple active variants create combinatorial variety
3. **Micro-Variations**: Carry/borrow presence varies even at same digit count

### B. Hidden Structure
The engine secretly:
1. **Prevents Repetition**: Random pools (percentages) use arrays, not ranges
2. **Guarantees Solvability**: Roots/division work backward from answers
3. **Manages Difficulty**: Complexity stays within tier bounds

### C. The Goldilocks Zone
By combining:
- **Tier selection** (user controls macro-difficulty)
- **Variant toggles** (user adds spice)
- **Random generation** (engine creates infinite variety within constraints)

...users get questions that are:
- **Never boring** (RNG ensures novelty)
- **Never impossible** (complexity math ensures solvability)
- **Always improving** (arcade streak rewards mastery)

---

## 8. Technical Implementation Notes

### Class Architecture
```
Engine (main controller)
  ├── ArcadeSystem (scoring & progression)
  ├── QuestionGenerator (category-specific factories)
  │     └── Uses Utils (RNG primitives)
  └── ComplexityCalculator (mental load evaluator)
```

### Data Flow
```
User selects tier + variants
  ↓
Engine.generateQuestion()
  ↓
QuestionGenerator.{category}() → Raw question object
  ↓
ComplexityCalculator.calculate() → Adds complexity score
  ↓
targetTime calculation → Adds par time
  ↓
Return enriched question to app
```

### Answer Submission
```
User submits answer
  ↓
Engine.submitAnswer(question, time, isCorrect)
  ↓
isCorrect? → ArcadeSystem.onCorrect() : onError()
  ↓
Returns: { points, multiplier, streak, ... }
```

---

## 9. Why It Feels "Just Right"

The engine achieves the **Flow State** by:

1. **Respecting User Intent**: Tier selection is manual, not automatic
2. **Micro-Adjustments**: Complexity varies within tier based on RNG
3. **Positive Reinforcement**: Streak multiplier → more points → dopamine
4. **No Punishment**: Errors reset streak but don't subtract points
5. **Invisible Rails**: Par time guides toward "fast enough" without feeling constrained

**Result:** Users experience questions as "randomly challenging" when in reality, every number is constrained by tier → digits → variants → complexity bounds. The randomness is *curated*.
