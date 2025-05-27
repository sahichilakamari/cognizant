// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = () => {
  alert("Page fully loaded");
  displayValidEvents();
};

// 2. Syntax, Data Types, and Operators
const eventName = "Music Night";
const eventDate = "2025-06-15";
let availableSeats = 10;

console.log(`Event: ${eventName} on ${eventDate} - Seats: ${availableSeats}`);
availableSeats--;
console.log(`After registration, seats left: ${availableSeats}`);

// 3. Conditionals, Loops, and Error Handling
const events = [
  { name: "Music Night", date: "2025-06-15", seats: 10, category: "Music" },
  { name: "Tech Talk", date: "2024-04-01", seats: 5, category: "Tech" },
  { name: "Art Show", date: "2025-08-10", seats: 0, category: "Art" },
  { name: "Cultural Night", date: "2025-07-20", seats: 15, category: "Culture" }
];

function isUpcoming(dateStr) {
  const today = new Date();
  const eventDate = new Date(dateStr);
  return eventDate >= today;
}

function displayValidEvents() {
  const validList = document.getElementById("validEvents");
  if (!validList) return;
  validList.innerHTML = "";
  events.forEach(event => {
    if (isUpcoming(event.date) && event.seats > 0) {
      const li = document.createElement("li");
      li.textContent = `${event.name} on ${event.date} - Seats left: ${event.seats}`;
      validList.appendChild(li);
    }
  });
}

function tryRegister(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found.");
    if (!isUpcoming(event.date)) throw new Error("Event already occurred.");
    if (event.seats <= 0) throw new Error("Event is full.");
    event.seats--;
    alert(`Successfully registered for ${event.name}. Remaining seats: ${event.seats}`);
    displayValidEvents();
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
}

// 4. Functions, Scope, Closures, Higher-Order Functions
function addEvent(name, date, seats, category) {
  events.push({ name, date, seats, category });
}

function registerUser(eventName, userName) {
  tryRegister(eventName);
  return `${userName} registered for ${eventName}`;
}

function filterEventsByCategory(category) {
  return events.filter(event => event.category === category);
}

function createRegistrationTracker(category) {
  let total = 0;
  return function () {
    total++;
    console.log(`${total} total registrations in ${category}`);
  };
}

function searchEvents(callback) {
  return events.filter(callback);
}

// 5. Objects and Prototypes
function Event(name, date, seats, category) {
  this.name = name;
  this.date = date;
  this.seats = seats;
  this.category = category;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

const sampleEvent = new Event("Demo Day", "2025-09-01", 20, "Tech");
console.log(Object.entries(sampleEvent));

// 6. Arrays and Methods
events.push({ name: "Baking Workshop", date: "2025-09-12", seats: 20, category: "Workshop" });
const musicEvents = events.filter(e => e.category === "Music");
const displayCards = events.map(e => `${e.category} Event: ${e.name}`);

// 7. DOM Manipulation
document.querySelectorAll(".event-card").forEach(card => {
  const btn = document.createElement("button");
  btn.textContent = "Register";
  btn.onclick = () => tryRegister(card.dataset.name);
  card.appendChild(btn);
});

// 8. Event Handling
document.querySelectorAll(".register-button").forEach(btn => {
  btn.onclick = () => tryRegister(btn.dataset.event);
});

document.getElementById("categoryFilter")?.addEventListener("change", e => {
  const filtered = filterEventsByCategory(e.target.value);
  console.log(filtered);
});

document.addEventListener("keydown", e => {
  console.log("Key pressed: ", e.key);
});

// 9. Async JS, Promises, Async/Await
fetch("/mock-events.json")
  .then(res => res.json())
  .then(data => console.log("Fetched events:", data))
  .catch(err => console.error("Error fetching:", err));

async function fetchEvents() {
  try {
    document.getElementById("spinner").style.display = "block";
    const res = await fetch("/mock-events.json");
    const data = await res.json();
    console.log("Async fetched:", data);
  } catch (err) {
    console.error("Async error:", err);
  } finally {
    document.getElementById("spinner").style.display = "none";
  }
}

// 10. Modern JavaScript Features
const events = [
  { id: 1, name: "Music Night", category: "music", date: "2025-06-15", seats: 30 },
  { id: 2, name: "Tech Talk", category: "tech", date: "2025-05-10", seats: 0 },
  { id: 3, name: "Art Show", category: "art", date: "2025-07-20", seats: 10 },
];

function filterEventsByCategory(eventList, category = "all") {
  const clonedList = [...eventList];
  let filteredEvents;
  if (category === "all") {
    filteredEvents = clonedList; 
  } else {
    filteredEvents = clonedList.filter(({ category: cat }) => cat === category);
  }
  return filteredEvents;
}
const selectedCategory = "music"; 
let musicEvents = filterEventsByCategory(events, selectedCategory);
musicEvents.forEach(({ name, date, seats }) => {
  console.log(`Event: ${name} | Date: ${date} | Seats Available: ${seats}`);
});


// 11. Working with Forms
document.getElementById("registerForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const { name, email, eventSelect } = e.target.elements;
  if (!name.value || !email.value) {
    alert("Please fill all fields");
    return;
  }
  tryRegister(eventSelect.value);
});

// 12. AJAX & Fetch API
function submitUserData(userData) {
  fetch("https://mockapi.io/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  })
    .catch(err => {
      alert("Submission failed: " + err.message);
    });

  setTimeout(() => console.log("Simulated response delay"), 2000);
}

// 13. Debugging and Testing
function debugRegistration(form) {
  console.log("Submitting form...", form);
  const payload = {
    name: form.name.value,
    email: form.email.value,
    event: form.eventSelect.value
  };
  console.log("Payload:", payload);
  submitUserData(payload);
}

// 14. jQuery and JS Frameworks
$("#registerBtn").click(() => {
  alert("Registered with jQuery click");
});

$(".event-card").fadeIn();

