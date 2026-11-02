# CSE 391: Programming for the Internet — Assignment 02

### Interactive JavaScript Web Applications
**Student:** Md. Hasib Ali Rishad  
**Student ID:** 23101389  
**Institution:** BRAC University — Department of Computer Science & Engineering  
**Course:** CSE 391 (Programming for the Internet) — Section 01, Fall 2026  
**Instructor:** Muhammad Abdur Rahman (ADR)  

---

## 🌐 Live Website (GitHub Pages)
👉 **[View Live Site](https://hasib-ali-rishad.github.io/CSE391-Assignment-02/)**

---

## 📁 Repository Structure
```text
├── index.html                        # Main interactive web application layout (Sections 1–12)
├── style.css                         # Vanilla CSS3 ZenCrypto stylesheet, dark mode & responsive rules (Sections 1–13)
├── script.js                         # Core JavaScript logic: Fortune Generator, Stopwatch & To-Do List (Sections 1–4)
├── docs/
│   ├── AI_Declaration.txt            # Completed & signed official AI usage declaration
│   ├── AI_Prompts.md                 # Detailed chronological AI prompts & iteration log
│   └── CSE 391- Assignment 2 V3.pdf  # Official Assignment 02 specification document
└── images/
    ├── favicon.svg                   # Custom vector HR brand favicon
    ├── favicon.png                   # 64x64 antialiased PNG favicon fallback
    └── favicon-256.png               # 256x256 Apple touch icon
```

## ✨ Key Features
- **Fortune Generator (Question 1):** Stores 10 wisdom fortunes in a JavaScript array, randomly selects both a fortune and a high-contrast preset theme on every page load, and features 4 adjacent color buttons that dynamically modify font color, background color, border color, font size, and font family.
- **Step-by-3 Stopwatch (Question 2):** Uses `setInterval()` and `clearInterval()` to count strictly in increments of 3 seconds (`3, 6, 9 ... 30`), automatically stopping at 30 seconds while preventing overlapping intervals on repeated Start clicks and preserving elapsed time across Stop/Resume.
- **Persistent To-Do List (Question 3):** Allows adding tasks via button click or `Enter`, marking tasks complete with custom checkboxes, filtering (`All`, `Pending`, `Completed`), deleting tasks, rendering user text safely with `textContent` (XSS prevention), and persisting state in `localStorage`.
- **Pure CSS Dark / Light Mode:** ZenCrypto minimalist palette (`Martian Mono` & `Inter`) with `#theme-toggle` pure-CSS state switching and `localStorage` persistence.
- **W3C Validated & Viva-Ready:** Passes official W3C HTML5 and CSS3 validation with **0 errors and 0 warnings**, written in clean, well-commented foundational HTML5, CSS3, and vanilla JavaScript with zero external frameworks.
