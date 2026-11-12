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