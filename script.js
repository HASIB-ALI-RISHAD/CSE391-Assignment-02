/* ==========================================================================
   CSE 391: Programming for the Internet — Assignment 02 (JavaScript)
   Student: Md. Hasib Ali Rishad | Student ID: 23101389 | BRAC University

   Sections:
   1. Dark/Light Theme Persistence & Navigation Menu
   2. Question 1: Fortune Generator (Array, Math.random, Dynamic Styling)
   3. Question 2: Step-by-3 Stopwatch (setInterval, clearInterval, Controls)
   4. Question 3: Persistent To-Do List (DOM Creation, Events, localStorage)

   References:
   - CSE 391 Lecture Slides & Code Examples (BRAC University)
   - MDN Web Docs: setInterval(), clearInterval(), Web Storage API (localStorage)
   ========================================================================== */


/* ==========================================================================
   1. Dark/Light Theme Persistence & Navigation Menu
   ========================================================================== */
const themeToggle = document.getElementById("theme-toggle");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll(".site-nav .nav-link");

// Restore saved theme and save new choice in localStorage when toggled
if (themeToggle) {
    const savedTheme = localStorage.getItem("site-theme");
    if (savedTheme === "dark") {
        themeToggle.checked = true;
    } else if (savedTheme === "light") {
        themeToggle.checked = false;
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            localStorage.setItem("site-theme", "dark");
        } else {
            localStorage.setItem("site-theme", "light");
        }
    });
}

// Highlight clicked navigation link and close mobile menu if open
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        if (navToggle && navToggle.checked) {
            navToggle.checked = false;
        }
        for (let j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.remove("active");
        }
        this.classList.add("active");
    });
}


/* ==========================================================================
   2. Question 1: Fortune Generator
   - Stores 10 fortune messages in an array.
   - Displays a random fortune and random theme each time the page loads.
   - Four buttons beside the box change font color, background color,
     border color, font size, and font family dynamically.
   ========================================================================== */
const fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "First, solve the problem. Then, write the code with clarity and purpose.",
    "Simplicity is the soul of reliable software and thoughtful engineering.",
    "Small daily improvements compound into extraordinary long-term mastery.",
    "Curiosity turns every unfamiliar bug into a lasting lesson in architecture.",
    "Clean code reads like well-crafted prose written for the next developer.",
    "Discipline bridges the distance between ambitious goals and shipped reality.",
    "Patience in debugging saves hours of guesswork in production.",
    "The best engineers build systems that empower everyone around them.",
    "Measure twice, design with empathy, and let simplicity guide every interface."
];

const fortuneThemes = {
    emerald: {
        fontColor: "#14532d",
        bgColor: "#dcfce7",
        borderColor: "#16a34a",
        fontSize: "1.05rem",
        fontFamily: "'Inter', sans-serif"
    },
    amber: {
        fontColor: "#78350f",
        bgColor: "#fef08a",
        borderColor: "#d97706",
        fontSize: "1.14rem",
        fontFamily: "'Lora', Georgia, serif"
    },
    cobalt: {
        fontColor: "#1e3a8a",
        bgColor: "#dbeafe",
        borderColor: "#2563eb",
        fontSize: "0.96rem",
        fontFamily: "'Martian Mono', monospace"
    },
    coral: {
        fontColor: "#7c2d12",
        bgColor: "#ffedd5",
        borderColor: "#ea580c",
        fontSize: "1.10rem",
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif"
    }
};

const themeNames = ["emerald", "amber", "cobalt", "coral"];
const fortuneBox = document.getElementById("fortune-box");
const fortuneText = document.getElementById("fortune-text");
const swatchButtons = document.querySelectorAll(".fortune-controls .fortune-swatch");

// Function to update the fortune box colors, border, font size, and font family
function applyFortuneStyle(themeName) {
    const selected = fortuneThemes[themeName];
    if (!selected) {
        return;
    }

    // 1. Change font color of the fortune text
    fortuneText.style.color = selected.fontColor;
    fortuneBox.style.color = selected.fontColor;

    // 2. Change background color of the fortune box
    fortuneBox.style.backgroundColor = selected.bgColor;

    // 3. Change border color of the fortune box
    fortuneBox.style.borderColor = selected.borderColor;

    // 4. Change font size and font family slightly
    fortuneText.style.fontSize = selected.fontSize;
    fortuneText.style.fontFamily = selected.fontFamily;

    // Highlight the active theme button
    for (let i = 0; i < swatchButtons.length; i++) {
        if (swatchButtons[i].getAttribute("data-preset") === themeName) {
            swatchButtons[i].classList.add("active");
            swatchButtons[i].setAttribute("aria-pressed", "true");
        } else {
            swatchButtons[i].classList.remove("active");
            swatchButtons[i].setAttribute("aria-pressed", "false");
        }
    }
}

// Function to pick and display a random fortune and random theme on page load
function loadRandomFortune() {
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomThemeIndex = Math.floor(Math.random() * themeNames.length);

    // Avoid showing the exact same fortune or theme twice in a row on reload
    const lastFortune = sessionStorage.getItem("lastFortuneIndex");
    if (lastFortune !== null && Number(lastFortune) === randomIndex) {
        randomIndex = (randomIndex + 1) % fortunes.length;
    }
    sessionStorage.setItem("lastFortuneIndex", String(randomIndex));

    const lastTheme = sessionStorage.getItem("lastThemeIndex");
    if (lastTheme !== null && Number(lastTheme) === randomThemeIndex) {
        randomThemeIndex = (randomThemeIndex + 1) % themeNames.length;
    }
    sessionStorage.setItem("lastThemeIndex", String(randomThemeIndex));

    fortuneText.textContent = fortunes[randomIndex];
    applyFortuneStyle(themeNames[randomThemeIndex]);
}

// Add click event listeners to the 4 color buttons beside the fortune box
for (let i = 0; i < swatchButtons.length; i++) {
    swatchButtons[i].addEventListener("click", function () {
        const chosenPreset = this.getAttribute("data-preset");
        applyFortuneStyle(chosenPreset);
    });
}

// Run automatically when the page loads
loadRandomFortune();


/* ==========================================================================
   3. Question 2: Step-by-3 Stopwatch
   - Counts strictly in multiples of 3 seconds (3, 6, 9 ... 30).
   - Automatically stops at 30 seconds unless reset.
   - Prevents overlapping timers if Start is clicked multiple times.
   - Resumes from the last recorded time after Stop.
   ========================================================================== */
const stopwatchPanel = document.getElementById("stopwatch-panel");
const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchHelper = document.getElementById("stopwatch-helper");
const statusBadge = document.getElementById("stopwatch-status-badge");
const statusText = document.getElementById("stopwatch-status-text");
const startBtn = document.getElementById("stopwatch-start-btn");
const stopBtn = document.getElementById("stopwatch-stop-btn");
const resetBtn = document.getElementById("stopwatch-reset-btn");
const stepNodes = document.querySelectorAll(".stopwatch-steps .step-node");

let elapsedSeconds = 0;
let timerId = null;

// Update stopwatch number, progress steps, and status text on screen
function updateStopwatchUI(state) {
    stopwatchDisplay.textContent = elapsedSeconds;

    // Highlight step checkpoints (3s to 30s) reached so far
    for (let i = 0; i < stepNodes.length; i++) {
        const stepValue = Number(stepNodes[i].getAttribute("data-step"));
        if (elapsedSeconds >= stepValue) {
            stepNodes[i].classList.add("reached");
        } else {
            stepNodes[i].classList.remove("reached");
        }
    }

    stopwatchPanel.classList.remove("is-running", "is-completed");
    statusBadge.classList.remove("state-idle", "state-running", "state-paused", "state-completed");

    if (state === "running") {
        stopwatchPanel.classList.add("is-running");
        statusBadge.classList.add("state-running");
        statusText.textContent = "Running • " + elapsedSeconds + "s / 30s";
        stopwatchHelper.textContent = "Timer active: advancing by +3 seconds every 3 seconds.";
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } else if (state === "paused") {
        statusBadge.classList.add("state-paused");
        statusText.textContent = "Paused at " + elapsedSeconds + "s";
        stopwatchHelper.textContent = "Paused at " + elapsedSeconds + " seconds. Press Start to resume.";
        startBtn.disabled = false;
        stopBtn.disabled = true;
    } else if (state === "completed") {
        stopwatchPanel.classList.add("is-completed");
        statusBadge.classList.add("state-completed");
        statusText.textContent = "Completed • Max 30s";
        stopwatchHelper.textContent = "Reached 30 seconds and stopped automatically. Press Reset to start over.";
        startBtn.disabled = true;
        stopBtn.disabled = true;
    } else {
        statusBadge.classList.add("state-idle");
        statusText.textContent = "Ready • 0s";
        stopwatchHelper.textContent = "Press Start to begin counting in 3 second intervals.";
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Called every 3000 ms (3 seconds) while the stopwatch is running
function tickStopwatch() {
    elapsedSeconds = elapsedSeconds + 3;

    // Automatically stop once the timer reaches 30 seconds
    if (elapsedSeconds >= 30) {
        elapsedSeconds = 30;
        clearInterval(timerId);
        timerId = null;
        updateStopwatchUI("completed");
        return;
    }

    updateStopwatchUI("running");
}

// Start button handler
function startStopwatch() {
    // Guard 1: Do nothing if timer is already running (prevents overlapping intervals)
    if (timerId !== null) {
        return;
    }

    // Guard 2: Do not count past 30 seconds unless Reset is clicked first
    if (elapsedSeconds >= 30) {
        return;
    }

    updateStopwatchUI("running");
    timerId = setInterval(tickStopwatch, 3000);
}

// Stop button handler (pauses timer and keeps current elapsedSeconds)
function stopStopwatch() {
    if (timerId === null) {
        return;
    }
    clearInterval(timerId);
    timerId = null;
    updateStopwatchUI("paused");
}

// Reset button handler (clears timer and resets back to 0)
function resetStopwatch() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    elapsedSeconds = 0;
    updateStopwatchUI("idle");
}

startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
updateStopwatchUI("idle");


/* ==========================================================================
   4. Question 3: Persistent To-Do List
   - Adds new tasks via button click or Enter key.
   - Displays each task with a completion checkbox and a Delete button.
   - Saves tasks in localStorage so data persists after refreshing/reopening.
   - Uses textContent when rendering user text to prevent XSS injection.
   ========================================================================== */
const TODO_STORAGE_KEY = "cse391_todo_tasks";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoError = document.getElementById("todo-error");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");
const todoEmptyTitle = todoEmpty.querySelector(".todo-empty-title");
const filterButtons = document.querySelectorAll(".todo-filters .filter-chip");

const countTotal = document.getElementById("todo-count-total");
const countPending = document.getElementById("todo-count-pending");
const countDone = document.getElementById("todo-count-done");

let currentFilter = "all";
let tasks = loadTasksFromStorage();

// Load saved tasks array from localStorage
function loadTasksFromStorage() {
    const savedData = localStorage.getItem(TODO_STORAGE_KEY);
    if (!savedData) {
        return [];
    }

    try {
        const parsedTasks = JSON.parse(savedData);
        if (Array.isArray(parsedTasks)) {
            return parsedTasks;
        }
    } catch (error) {
        console.log("Could not read saved tasks:", error);
    }

    return [];
}

// Save current tasks array to localStorage as a JSON string
function saveTasksToStorage() {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasks));
}

// Render the task list and task counters onto the page
function renderTasks() {
    let doneCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            doneCount++;
        }
    }

    const totalCount = tasks.length;
    const pendingCount = totalCount - doneCount;

    countTotal.textContent = totalCount;
    countPending.textContent = pendingCount;
    countDone.textContent = doneCount;

    // Clear current list items before rebuilding
    todoList.innerHTML = "";
    let visibleCount = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        // Skip tasks that do not match the selected filter tab
        if (currentFilter === "pending" && task.completed) {
            continue;
        }
        if (currentFilter === "completed" && !task.completed) {
            continue;
        }

        visibleCount++;

        // Create <li> container for this task
        const li = document.createElement("li");
        if (task.completed) {
            li.className = "todo-item is-completed";
        } else {
            li.className = "todo-item";
        }

        // Create <label> containing checkbox and task text
        const label = document.createElement("label");
        label.className = "todo-label";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox-input";
        checkbox.checked = task.completed;

        // Toggle completed status when checkbox is clicked
        checkbox.addEventListener("change", function () {
            tasks[i].completed = !tasks[i].completed;
            saveTasksToStorage();
            renderTasks();
        });

        const customCheck = document.createElement("span");
        customCheck.className = "todo-checkbox-custom";
        customCheck.textContent = "✓";

        // Use textContent so HTML tags typed by the user are displayed safely as plain text
        const textSpan = document.createElement("span");
        textSpan.className = "todo-text";
        textSpan.textContent = task.text;

        label.appendChild(checkbox);
        label.appendChild(customCheck);
        label.appendChild(textSpan);

        // Create Delete button to remove this task
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn-delete-task";
        deleteBtn.textContent = "✕ Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(i, 1);
            saveTasksToStorage();
            renderTasks();
        });

        li.appendChild(label);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Show or hide the empty list message
    if (visibleCount === 0) {
        todoEmpty.hidden = false;
        if (todoEmptyTitle) {
            if (totalCount === 0) {
                todoEmptyTitle.textContent = "List is currently empty.";
            } else if (currentFilter === "pending") {
                todoEmptyTitle.textContent = "No pending tasks.";
            } else {
                todoEmptyTitle.textContent = "No completed tasks yet.";
            }
        }
    } else {
        todoEmpty.hidden = true;
    }
}

// Handle adding a new task when the form is submitted
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const trimmedText = todoInput.value.trim();

    // Prevent adding empty or whitespace-only tasks
    if (trimmedText === "") {
        todoError.textContent = "Please enter a task before clicking Add Task.";
        todoError.hidden = false;
        todoInput.classList.add("input-invalid");
        todoInput.focus();
        return;
    }

    // Clear any previous error message
    todoError.textContent = "";
    todoError.hidden = true;
    todoInput.classList.remove("input-invalid");

    // Add new task object to array, save to localStorage, and update display
    tasks.push({
        text: trimmedText,
        completed: false
    });
    saveTasksToStorage();

    // Switch back to 'all' if user added a task while viewing 'completed'
    if (currentFilter === "completed") {
        currentFilter = "all";
        for (let i = 0; i < filterButtons.length; i++) {
            if (filterButtons[i].getAttribute("data-filter") === "all") {
                filterButtons[i].classList.add("active");
            } else {
                filterButtons[i].classList.remove("active");
            }
        }
    }

    todoInput.value = "";
    todoInput.focus();
    renderTasks();
});

// Hide validation error as soon as the user starts typing
todoInput.addEventListener("input", function () {
    if (!todoError.hidden) {
        todoError.textContent = "";
        todoError.hidden = true;
        todoInput.classList.remove("input-invalid");
    }
});

// Handle filter buttons (All, Pending, Completed)
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter");
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        renderTasks();
    });
}

// Render any saved tasks immediately on page load
renderTasks();
