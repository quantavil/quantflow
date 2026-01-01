# QuantFlow Core Blueprint

QuantFlow is a high-performance math proficiency terminal designed to build "mental calculation muscle memory" through adaptive learning and high-frequency feedback. This document outlines the fundamental logic, architectural patterns, and the inner workings of its core engine.

---

## 1. High-Level Architecture

QuantFlow follows a **Hybrid Model-View-Controller (MVC)** pattern implemented using modern vanilla JavaScript and Alpine.js.

-   **Model (`assets/js/engine.js`)**: The logic layer. It contains the mathematical definitions, question generators, complexity calculators, and the **Arcade Scoring System** (Streak-based difficulty & XP).
-   **Controller/State Layer (`assets/js/app.js`)**: The Alpine.js application. It manages UI state, session orchestration, user authentication, and coordinates between the Engine and the View.
-   **View (`index.html` + Tailwind CSS)**: The presentation layer. A terminal-inspired interface that provides high-speed visual and auditory feedback.

---

## 2. Fundamental Logic & "Main Function"

The "Main Function" of QuantFlow is a **Closed-Loop Feedback System**:

1.  **Session Start**: User selects a category and tier manually. The system loads Speed Factors from `localStorage`.
2.  **Adaptive Generation**: The Engine generates a question with difficulty scaled by the current **streak** within the selected tier.
3.  **Real-time Performance Measurement**: A high-resolution timer (`performance.now()`) measures latency to the millisecond.
4.  **Submission & Evaluation**: Upon answer, the Engine evaluates accuracy and speed against a dynamically calculated "Par Time".
5.  **Arcade Scoring**: Points are awarded based on complexity, speed, and streak multiplier. The streak affects the difficulty of the next question.

---

## 3. Deep Dive: `engine.js` (The Core Engine)

`engine.js` is the brain of QuantFlow. It is composed of several specialized classes and objects working in concert.

### A. Mathematical Definitions (`OPERATIONS`)
This object defines every math category (e.g., `addition`, `fractions`, `roots`). Each category includes:
-   **Tiers**: Discrete complexity levels (e.g., "1+1" vs "3+3"). User manually selects their desired tier.
-   **Variants**: Modifiers that change the nature of the math (e.g., "with negatives", "decimals").

### B. The Complexity Calculator (`ComplexityCalculator`)
Uses a **Point System** to evaluate a question's mental load:
-   **Digit Complexity**: Points based on the number of digits (multiplicative for multiplication).
-   **Operation Weight**: Base weights (e.g., Addition = 0, Roots = 3.5).
-   **Cognitive Load**: Penalties for "Carries" in addition or "Borrows" in subtraction.
-   **Variant Modifiers**: Extra points for decimals, negative numbers, or complex fractions.

### C. The Arcade System (`ArcadeSystem`)
A session-based scoring system that replaces traditional rating systems:

#### Streak-Based Difficulty Scaling
Difficulty scales **within the selected tier** based on the current streak:

| Streak | Difficulty | Effect |
|--------|------------|--------|
| 0-4    | 0.0 → 0.4  | Easier questions, pure random generation |
| 5-9    | 0.5 → 0.9  | Balanced, some forced carries/borrows |
| 10+    | 1.0        | Max complexity: forces carries, borrows, edge cases |
| Error  | −0.3       | Difficulty drops back down |

```
updateDifficulty():
  if streak >= 10: difficulty = 1.0
  else if streak >= 5: difficulty = 0.5 + (streak - 5) * 0.1
  else: difficulty = streak * 0.1
```

#### Score Formula
Points are calculated on every correct answer:

```
Points = BasePoints × Complexity × SpeedBonus × Multiplier

Where:
  - BasePoints = 10 (constant)
  - Complexity = from ComplexityCalculator (e.g., 3.5 for a hard question)
  - SpeedBonus = 2.0 (very fast) | 1.5 (under par) | 1.0 (slow)
  - Multiplier = 1.0 + min(streak × 0.1, 2.0)  → caps at 3.0× at streak 20
```

#### Multiplier Progression
| Streak | Multiplier |
|--------|------------|
| 0      | ×1.0       |
| 5      | ×1.5       |
| 10     | ×2.0       |
| 15     | ×2.5       |
| 20+    | ×3.0 (max) |

#### Error Handling
On incorrect answer:
- Streak resets to 0
- Difficulty drops by 0.3 (minimum 0.0)
- Multiplier resets to ×1.0

### D. Difficulty Controller (`DifficultyController`)
Applies intra-tier difficulty scaling to question generation:

```javascript
getModifiers(difficulty):
  return {
    forceCarry: difficulty >= 0.7,
    forceBorrow: difficulty >= 0.7,
    preferLargeNumbers: difficulty >= 0.5,
    preferEdgeCases: difficulty >= 0.8  // Numbers near 10, 100, etc.
  }
```

At high difficulty (streak 7+), questions are regenerated to ensure they include carries/borrows, making the math genuinely harder without changing the tier.

### E. Speed Calibration & Par Time
The most unique part of QuantFlow's logic:

-   **`SpeedFactorUpdater`**: Uses an **Exponential Moving Average (EMA)** to track how many "Complexity Points" a user can process per second. Maintains both global and category-specific speeds.
-   **`ParTimeCalculator`**: Calculates the "Target Time" for a question:
    ```
    Par Time = (Complexity Points × User Speed Factor) + Base Reaction Time
    ```
-   **Flow State Buffer**: Targets 85% of user's max capability to keep them in the "Flow" zone.

### F. Question Generator (`QuestionGenerator`)
A factory that produces questions. Handles complex logic like:
- Perfect squares/cubes for roots
- Modular arithmetic for division
- LCD/Simplified fractions for the fractions module

---

## 4. Integration & Feedback (`app.js`)

While `engine.js` handles the "math," `app.js` handles the "flow":

-   **Sound & Particles**: Triggers auditory cues and visual rewards based on performance markers (Fast vs Slow vs Error).
-   **Queue Management**: Missed questions are pushed into an `errorQueue` to be retried shortly, ensuring reinforcement learning.
-   **Visual Feedback**: "Brutal Feedback Mode" displays errors prominently to discourage guessing.
-   **Session Stats Display**:
    - **Score**: Current session points
    - **Multiplier**: Current streak multiplier (×1.0 to ×3.0)
    - **Total XP**: All-time accumulated points (persisted in localStorage)
-   **Persistence**: Automates syncing between `localStorage` and Cloudflare D1/KV via background API.

---

## 5. User Control Philosophy

**Tier selection is manual, not automatic.** The user chooses which complexity tier they want to practice (e.g., 1+1, 2+2, 3+3). The system responds by:

1. Adjusting difficulty **within that tier** based on performance
2. Never auto-switching to a different tier
3. Allowing users to enable hard variants (decimals, negatives) that reset/affect difficulty naturally

This gives users full control over their training focus while the arcade mechanics handle the micro-adjustments for optimal challenge.

---

## 6. Technical Stack Summary

-   **Frontend**: Alpine.js (Reactive UI), Tailwind CSS (Aesthetics).
-   **Logic**: Vanilla JS (ES6+).
-   **Calculations**: `fraction.js` for precise fractional arithmetic.
-   **Performance**: `requestAnimationFrame` for the live timer to ensure zero UI lag.
-   **Storage**: `localStorage` for session persistence, Cloudflare D1/KV for cloud sync.
