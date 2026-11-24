// ==========================================================
// main.js - small helpers shared by every page.
// It loads AFTER data.js and BEFORE each page's own script.
// ==========================================================

// ---------- Mobile menu ----------

// Opens and closes the menu on phones when the hamburger button is clicked.
// It also updates aria-expanded so screen readers know if the menu is open.
function setupMobileMenu() {
  const button = document.getElementById("menu-button");
  const nav = document.getElementById("main-nav");
  if (button === null || nav === null) {
    return;
  }

  button.addEventListener("click", function () {
    // classList.toggle adds the class if missing, removes it if present,
    // and tells us whether the class is now on.
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      button.setAttribute("aria-label", "Close menu");
      button.textContent = "✕";
    } else {
      button.setAttribute("aria-label", "Open menu");
      button.textContent = "☰";
    }
  });
}

// ---------- Reading the URL ----------

// Gets one value from the address bar. Example: in "business.html?id=3",
// getQueryParam("id") gives "3". If it is missing we give back "".
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(name);
  if (value === null) {
    return "";
  }
  return value;
}

// ---------- localStorage ----------

// Reads a saved list from localStorage. localStorage only stores text,
// so we turn it back into an array with JSON.parse.
// try/catch: if the saved text is damaged, JSON.parse would crash the page,
// so we quietly return an empty list instead.
function getSavedList(key) {
  try {
    const text = localStorage.getItem(key);
    if (text === null) {
      return [];
    }
    const list = JSON.parse(text);
    if (Array.isArray(list)) {
      return list;
    }
    return [];
  } catch (error) {
    return [];
  }
}

// Adds one item to the end of a saved list and stores the list again.
function saveToList(key, item) {
  const list = getSavedList(key);
  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
}

// ---------- Sample data + saved sellers ----------

// Gives every business: the sample ones from data.js, then the sellers
// who joined on this device (saved by join.js). Saved sellers have
// ids like "seller-1700000000000", so ids are compared as text.
function getAllBusinesses() {
  return businesses.concat(getSavedList("sellers"));
}

// ---------- Small display helpers ----------

// Gives the emoji used as the "picture" for a category.
function getCategoryIcon(category) {
  const icons = {
    Food: "🍔",
    Fashion: "👗",
    Beauty: "💇",
    Printing: "🖨️",
    Tutoring: "📚",
    Tech: "💻",
    Thrift: "🛍️",
    Party: "🎉",
    Academic: "🎓",
    Sports: "⚽",
    Club: "🎟️"
  };
  if (icons[category] === undefined) {
    return "🎟️";
  }
  return icons[category];
}

// Turns "2026-12-05" into "5 Dec 2026". We split the text ourselves
// instead of using Date objects, which can shift dates by a day.
function formatDate(dateText) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parts = dateText.split("-");
  const year = parts[0];
  const month = monthNames[Number(parts[1]) - 1];
  const day = Number(parts[2]);
  return day + " " + month + " " + year;
}

// Turns a number like 300 into "KES 300".
function formatMoney(amount) {
  return "KES " + amount;
}

// Turns a Kenyan number like 0712345678 into 254712345678,
// which is the format WhatsApp links need.
function toInternationalPhone(localNumber) {
  return "254" + localNumber.slice(1);
}

// Makes one HTML element with a class and some text.
// textContent is used (never innerHTML), so text typed by a user can never
// run as code on the page.
function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// ---------- Cards (used by the home, directory and events pages) ----------

// Builds the "Verified" or "Pending" badge for a business.
// The words and the symbol are there so colour is not the only clue.
function createStatusBadge(isVerified) {
  if (isVerified) {
    return makeElement("span", "badge badge-verified", "✔ Verified student");
  }
  return makeElement("span", "badge badge-pending", "⏳ Pending verification");
}

// Builds one business card (as page elements) and gives it back.
function createBusinessCard(business) {
  const card = makeElement("article", "card");

  const icon = makeElement("div", "card-icon", getCategoryIcon(business.category));
  icon.setAttribute("aria-hidden", "true");
  card.appendChild(icon);

  const title = makeElement("h3", "card-title");
  const link = makeElement("a", "", business.name);
  link.href = "business.html?id=" + encodeURIComponent(business.id);
  title.appendChild(link);
  card.appendChild(title);

  card.appendChild(makeElement("p", "card-meta", business.category + " · " + business.campus));
  card.appendChild(makeElement("p", "card-text", business.description));
  card.appendChild(makeElement("p", "card-price", business.priceRange));
  card.appendChild(createStatusBadge(business.verified));

  return card;
}

// Builds one event card (as page elements) and gives it back.
function createEventCard(eventItem) {
  const card = makeElement("article", "card");

  const icon = makeElement("div", "card-icon", getCategoryIcon(eventItem.category));
  icon.setAttribute("aria-hidden", "true");
  card.appendChild(icon);

  const title = makeElement("h3", "card-title");
  const link = makeElement("a", "", eventItem.title);
  link.href = "event.html?id=" + encodeURIComponent(eventItem.id);
  title.appendChild(link);
  card.appendChild(title);

  card.appendChild(makeElement("p", "card-meta", formatDate(eventItem.date) + " · " + eventItem.campus));
  card.appendChild(makeElement("p", "card-text", eventItem.venue + ". " + eventItem.description));
  // The first ticket type is always the cheapest one in our sample data.
  card.appendChild(makeElement("p", "card-price", "From " + formatMoney(eventItem.ticketTypes[0].price)));
  card.appendChild(makeElement("span", "badge badge-verified", eventItem.category));

  return card;
}

// ---------- Form errors ----------

// Shows an error under a field and outlines the field in red.
// If the field already has an error message, we reuse it.
function showFieldError(input, message) {
  const errorId = input.id + "-error";
  let errorText = document.getElementById(errorId);

  if (errorText === null) {
    errorText = makeElement("p", "error");
    errorText.id = errorId;
    input.parentNode.appendChild(errorText);
  }

  errorText.textContent = message;
  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", errorId);
}

// Removes the error message and the red outline from a field.
function clearFieldError(input) {
  const errorText = document.getElementById(input.id + "-error");
  if (errorText !== null) {
    errorText.remove();
  }
  input.classList.remove("input-error");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
}

// Makes every field in a form clear its own error as soon as the user
// edits it ("input" fires when typing, "change" when choosing from a list).
function clearErrorsWhileEditing(form) {
  const fields = form.querySelectorAll("input, select, textarea");
  for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("input", function (event) {
      clearFieldError(event.target);
    });
    fields[i].addEventListener("change", function (event) {
      clearFieldError(event.target);
    });
  }
}

// After checking all fields, moves the cursor to the first one with an
// error. Gives back true if there was a problem, false if all is fine.
function focusFirstError(form) {
  const firstBadField = form.querySelector(".input-error");
  if (firstBadField === null) {
    return false;
  }
  firstBadField.focus();
  return true;
}

// ---------- Validation checks used by more than one form ----------
// Each check gives back true (fine) or false (and shows an error).

// Checks that a field is not empty (spaces only count as empty).
function checkRequiredField(input) {
  if (input.value.trim() === "") {
    showFieldError(input, "Please fill in this field.");
    return false;
  }
  return true;
}

// Checks a Kenyan phone number: 10 digits starting with 07 or 01.
function checkPhoneField(input) {
  if (!checkRequiredField(input)) {
    return false;
  }
  const phone = input.value.trim();
  // This pattern means "exactly 10 characters, all digits 0 to 9".
  const isTenDigits = /^[0-9]{10}$/.test(phone);
  const startsCorrectly = phone.startsWith("07") || phone.startsWith("01");

  if (!isTenDigits || !startsCorrectly) {
    showFieldError(input, "Enter a phone number like 0712345678.");
    return false;
  }
  return true;
}

// Runs once the page has loaded: the menu is on every page.
setupMobileMenu();
