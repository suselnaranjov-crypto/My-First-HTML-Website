console.log("TAG-Me JavaScript is connected!");
// Find the theme button.
const toggleBtn = document.querySelector("#theme-toggle");

// Toggle the dark class whenever the button is clicked.
toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// Store five facts in an array.
const facts = [
  "I was born in Güines, Cuba.",
  "I speak both English and Spanish.",
  "I studied Architectural Design at the University of Toronto.",
  "I enjoy photography, cooking, and writing poetry.",
  "I play volleyball and chess."
];

// Find the paragraph and button.
const factText = document.querySelector("#fact");
const factBtn = document.querySelector("#fact-btn");

// Select and display a random fact when clicked.
factBtn.addEventListener("click", function () {
  const index = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[index];
});

// Find the form, input, and greeting paragraph.
const greetingForm = document.querySelector("#greeting-form");
const nameInput = document.getElementById("visitor-name");
const greetingText = document.querySelector("#greeting");

// Respond when the visitor submits the form.
greetingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const visitorName = nameInput.value.trim();

  if (visitorName === "") {
    greetingText.textContent = "Please enter your name first.";
  } else {
    greetingText.textContent =
      "Hello, " + visitorName + "! Welcome to Susel's desktop.";
  }
});

const asteroidToggle = document.querySelector("#asteroid-open");
const asteroidWindow = document.querySelector("#asteroid-window");
const asteroidBar = asteroidWindow.querySelector(".window-titlebar");

asteroidWindow.querySelector(".window-close").addEventListener("click", () => {
  asteroidToggle.checked = false;
  asteroidToggle.focus();
});

const desktopArea = document.querySelector(".desktop");

if (desktopArea) {
  function bringToFront(panel) {
    if (!panel) return;
    desktopArea.querySelector(".is-front")?.classList.remove("is-front");
    panel.classList.add("is-front");
  }

  function makeDraggable(handle, item) {
    let drag = null;
    let suppressClick = false;
    let offsetX = 0;
    let offsetY = 0;

    handle.addEventListener("dragstart", (event) => event.preventDefault());

    handle.addEventListener("pointerdown", (event) => {
      suppressClick = false;
      if (event.button !== 0 || event.target.closest(".window-close")) return;

      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        offsetX,
        offsetY,
        bounds: item.getBoundingClientRect(),
        handleHeight: handle.offsetHeight,
        moved: false
      };
    });

    window.addEventListener("pointermove", (event) => {
      if (drag?.id !== event.pointerId) return;

      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;

      // Leave small movements alone so an ordinary click still opens the app.
      if (!drag.moved && Math.hypot(dx, dy) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        suppressClick = true;
        handle.setPointerCapture(event.pointerId);
      }

      const area = desktopArea.getBoundingClientRect();
      const bottom = Math.min(area.bottom, window.innerHeight - 48);
      const minX = area.left - drag.bounds.left;
      const maxX = Math.max(minX, area.right - drag.bounds.right);
      const minY = Math.max(0, area.top) - drag.bounds.top;
      const maxY = Math.max(minY, bottom - drag.bounds.top - drag.handleHeight);

      offsetX = drag.offsetX + Math.max(minX, Math.min(dx, maxX));
      offsetY = drag.offsetY + Math.max(minY, Math.min(dy, maxY));
      item.style.translate = offsetX + "px " + offsetY + "px";
    });

    function finishDrag(event) {
      if (drag?.id === event.pointerId) drag = null;
    }

    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);

    handle.addEventListener("click", (event) => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  }

  desktopArea.querySelectorAll(".desktop-window").forEach((panel) => {
    panel.addEventListener("pointerdown", () => bringToFront(panel));
    makeDraggable(panel.querySelector(".window-titlebar"), panel);
  });

  desktopArea.querySelectorAll(".window-toggle").forEach((toggle) => {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        bringToFront(toggle.parentElement.querySelector(".desktop-window"));
      }
    });
  });

  desktopArea.querySelectorAll(".desktop-icon").forEach((icon) => {
    makeDraggable(icon, icon);
  });
}

const desktopClock = document.querySelector("#desktop-clock");

if (desktopClock) {
  const clockFormat = new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  function updateDesktopClock() {
    const now = new Date();
    desktopClock.dateTime = now.toISOString();
    desktopClock.textContent = clockFormat.format(now);
  }

  updateDesktopClock();
  setInterval(updateDesktopClock, 1000);
}