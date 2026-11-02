# AI Prompt Log & Iterative Development Record

**Student:** Md. Hasib Ali Rishad  
**Student ID:** 23101389  
**Course:** CSE 391 — *Programming for the Internet* (Section 01, Fall 2026)  
**Instructor:** Muhammad Abdur Rahman (ADR)  
**AI Tool Used:** Google Gemini (Antigravity Pair-Programming Assistant)  

---

## Overview

This document records the chronological prompts, UI/UX refinements, bug fixes, and code quality audits used while developing **Assignment 02: JavaScript Programming**. Every task was iteratively reviewed, simplified into foundational JavaScript concepts covered in CSE 391 lectures, and verified against official W3C HTML5 and CSS3 validation standards.

---

## Phase 1: Initial Architecture, ZenCrypto Aesthetic & Core JavaScript Tasks

### Prompt 1.1 — Responsive Single-Page Suite & Three Required JavaScript Applications
> *"Build Assignment 02 for 'CSE 391: Programming for the Internet' (Student: Md. Hasib Ali Rishad, Student ID: 23101389, BRAC University) focusing on core JavaScript (DOM manipulation, event listeners, timing functions, arrays, and `localStorage`). Implement all 3 required questions on a single responsive web application (`index.html`, `style.css`, and `script.js`) adhering strictly to the ZenCrypto minimalist design aesthetic from Assignment 01 (`Martian Mono` and `Inter` fonts, `#e8ede4` sage light background, `#ffffff` cards with `2px solid #191314` borders, `#ecf95a` lime-yellow accents, and pure-CSS `#theme-toggle` dark mode persisted via `localStorage`). Include: (1) Fortune Generator with a wisdom array, random selection on load, and 4 customization buttons changing font color, background color, border color, font size, and font family; (2) Step-by-3 Stopwatch counting `3, 6, 9 ... 30` with auto-stop at 30 seconds, overlap protection on Start, Pause/Resume, and Reset; and (3) Persistent To-Do List with custom checkboxes, delete buttons, `localStorage` JSON persistence, and XSS-safe `textContent` rendering."*

**Outcome:** Generated the initial semantic [`index.html`](../index.html), vanilla CSS3 [`style.css`](../style.css), and modular vanilla JavaScript [`script.js`](../script.js) implementing all three interactive applications without external frameworks or libraries.

---

## Phase 2: Serial Section Ordering & Fortune Generator Refinements

### Prompt 2.1 — Serial Task Order (`Q1 → Q2 → Q3`) & Reload-Based 10-Quote Selection
> *"Follow the serial order from the assignment sheet: first show Fortune Generator on the website, then Stopwatch, and then To-Do List (ignoring 'just above the page footer'). Also check alignment with the overall assignment objective, remove the 'New Fortune' button so new quotes appear strictly on each page reload, keep exactly 10 fortunes in the array, and remove the 'Wisdom Fortune #X of Y' counter pill."*

**Outcome:** Reordered both the top navigation links and `<main>` sections into strict `Fortune Generator → Stopwatch → To-Do List` sequence, trimmed the `fortunes` array to 10 curated quotes, removed manual quote-cycling UI elements, and added `sessionStorage` repeat-avoidance so consecutive page reloads reliably display a fresh fortune.

---

### Prompt 2.2 — Solar Amber Border Fix & Random Non-White Theme on Reload
> *"In the Solar Amber theme button, the fortune box border is green — fix that so it matches the amber theme. Also, when reloading the page, instead of starting with a plain white fortune box, randomly apply one of the four styled color themes on each reload."*

**Outcome:** Updated `fortuneThemes.amber.borderColor` to warm amber-gold (`#d97706`) and updated `loadRandomFortune()` to pick and apply one of the 4 high-contrast themes (`emerald`, `amber`, `cobalt`, `coral`) automatically on every page reload.

---

## Phase 3: Interface Decluttering & Layout Streamlining

### Prompt 3.1 — Removing Extra Controls, Marks Badges & Footer Clutter
> *"Streamline the UI with three cleanups: (1) remove the 'Clear Completed' button from the To-Do List, (2) remove all 'Q1 • 25 Marks' style pills across sections and keep only the top 'Assignment 02 • JavaScript Programming' pill, and (3) remove the GitHub repo/Assignment-01 buttons, live page URL/last modified metadata bar, and reference list from the footer."*

**Outcome:** Simplified the To-Do toolbar, section headers, and footer into a focused, distraction-free interface while retaining formal reference citations inside the top documentation header of [`script.js`](../script.js).

---

## Phase 4: Final Rubric Audit, Viva-Friendly Refactoring & Repository Packaging

### Prompt 4.1 — Full Rubric Audit, Bug Check & Foundational JavaScript Refactor for Viva
> *"Perform a complete audit to verify full-marks compliance and check for any hidden bugs. Ensure no overly advanced JavaScript constructs are used since this is my first JavaScript assignment and I need clean, foundational code I can confidently explain during viva evaluation. Also remove 'ID: 23101389 • BRAC University' from the top intro container."*

**Outcome:**
1. Refactored [`script.js`](../script.js) to use clear, foundational JavaScript constructs taught in CSE 391 lectures: standard global variables, named `function` declarations, classic `for` loops, `Math.floor(Math.random() * array.length)`, `setInterval()` / `clearInterval()`, `JSON.stringify()` / `JSON.parse()`, `document.createElement()`, `appendChild()`, `splice()`, and `textContent` — removing IIFEs, `dataset` destructuring, `Date.now()` random IDs, and higher-order array chains.
2. Fixed an empty-state filter message check in `renderTasks()` after the secondary empty-state subtitle element was removed, and verified all edge cases via automated runtime simulation.
3. Validated [`index.html`](../index.html) and [`style.css`](../style.css) against official W3C Nu HTML5 and CSS3 validators with **0 errors and 0 warnings**.

---

### Prompt 4.2 — GitHub Repository Setup & `/docs` Documentation Suite
> *"Provide a step-by-step guide to publish the Assignment 02 repository to GitHub from VS Code, and then add a dedicated `README.md` for Assignment 02 along with `docs/AI_Declaration.txt` and `docs/AI_Prompts.md` matching the structure used in Assignment 01."*

**Outcome:** Organized [`CSE 391- Assignment 2 V3.pdf`](./CSE%20391-%20Assignment%202%20V3.pdf), [`AI_Declaration.txt`](./AI_Declaration.txt), and [`AI_Prompts.md`](./AI_Prompts.md) inside `/docs`, added `.gitignore`, and created the root [`README.md`](../README.md) with the live GitHub Pages deployment link (`https://hasib-ali-rishad.github.io/CSE391-Assignment-02/`).
