# QuantFlow - Vedic Math Proficiency Terminal

**Live Demo: [https://quantflow.pages.dev](https://quantflow.pages.dev)**

QuantFlow is a high-performance, web application designed to help users master mental math through mental math principles. It features a "Bloomberg Terminal" aesthetic, rapid-fire question engine.

## Features

*   **Bloomberg Terminal Aesthetic**: High-contrast, data-dense, dark mode UI.
*   **Hybrid Elo Engine**: Dynamic difficulty adjustment and Skill-based "Par Time" selection.
*   **Comprehensive Operations**: Addition, Subtraction, Multiplication, Division, Powers, Roots, Percentages, and Fractions.
*   **Cloud Sync**: (Optional) GitHub OAuth + Cloudflare KV integration via Pages Functions.
*   **Analytics**: Heatmaps, Sparklines for latency trends, and detailed performance breakdown.

## Tech Stack

*   **Frontend**: Vanilla HTML5, Tailwind CSS (CDN), Alpine.js.
*   **Infrastructure**: Cloudflare Pages (Frontend Hosting + API Functions).
*   **Persistence**: `localStorage` (default), Cloudflare KV (optional cloud sync).

## Local Development

No build tools are required.

1.  Clone the repository.
2.  Open `index.html` in your browser.

## Project Structure

*   `index.html`: Main entry point and UI layout.
*   `app.js`: UI and State management.
*   `engine.js`: Core math engine, Elo system, and complexity calculations.
*   `styles.css`: Custom aesthetic overrides and animations.
*   `functions/`: Cloudflare Pages Functions (API).
*   **Advanced Math Concepts**:
    *   Perfect squares/cubes for roots
    *   Modular arithmetic for division
    *   Fractional arithmetic and simplification via internal `Fraction` class.

## Deployment

This project is optimized for **Cloudflare Pages** using the Git integration flow.

### Build Settings
1. **Framework Preset**: `None`
2. **Build Command**: *Leave Empty*
3. **Build Output Directory**: `/`
4. **Root Directory**: `/`

### Environment Variables & Bindings
1. **Environment Variables**: Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in the dashboard under Settings > Variables.
2. **KV Bindings**: Bind a KV namespace to the variable name `QUANTFLOW_DATA` under Settings > Functions.

### Automatic CI/CD
Once connected, every push to the `main` branch on GitHub will automatically trigger a deployment to your Cloudflare Pages domain.