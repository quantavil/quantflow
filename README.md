# QuantFlow - Vedic Math Proficiency Terminal

**Live Demo: [https://quantflow.pages.dev](https://quantflow.pages.dev)**

QuantFlow is a high-performance, web application designed to help users master mental math through mental math principles. It features a "Bloomberg Terminal" aesthetic, rapid-fire question engine, and dynamic Elo-based difficulty adjustment.

## Features

*   **Bloomberg Terminal Aesthetic**: High-contrast, data-dense, dark mode UI.
*   **Hybrid Elo Engine**: Dynamic difficulty adjustment and Skill-based "Par Time" selection.
*   **Comprehensive Operations**: Addition, Subtraction, Multiplication, Division, Powers, Roots, Percentages, and Fractions.
*   **Cloud Sync**: (Optional) GitHub OAuth + Cloudflare KV integration via Pages Functions.
*   **Analytics**: Heatmaps, Sparklines for latency trends, and detailed performance breakdown.

## Tech Stack

*   **Frontend**: Vanilla HTML5, Tailwind CSS (CDN), Alpine.js, Fraction.js.
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

## Deployment

This project is optimized for **Cloudflare Pages**.
1. Connect your repository to Cloudflare Pages.
2. Set Environment Variables for GitHub OAuth (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`).
3. Bind the KV namespace `QUANTFLOW_DATA` in the Functions settings.

**Note**: No build command is required. Leave the Build Command and Build Output Directory empty.