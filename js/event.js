// ==========================================================
// event.js - shows ONE event (from ?id=) and handles the
// ticket form. The payment is a pretend one: no money moves.
// ==========================================================

const eventDetails = document.getElementById("event-details");
const eventNotFound = document.getElementById("not-found");
const ticketForm = document.getElementById("ticket-form");
const ticketTypeSelect = document.getElementById("ticket-type");
const quantityInput = document.getElementById("quantity");
const buyerNameInput = document.getElementById("buyer-name");
const buyerPhoneInput = document.getElementById("buyer-phone");
const confirmation = document.getElementById("confirmation");

// The event on this page. It is filled in by startPage() below.
let currentEvent = null;

// Looks for the event whose id matches the one in the URL.
function findEventFromUrl() {
  const idFromUrl = getQueryParam("id");
  // find gives back the first match, or undefined if there is none
  return events.find(function (eventItem) {
    return String(eventItem.id) === idFromUrl;
  });
}

// Fills the ticket-type dropdown with this event's ticket types.
function fillTicketTypes(eventItem) {
  for (let i = 0; i < eventItem.ticketTypes.length; i++) {
    const ticketType = eventItem.ticketTypes[i];
    const option = document.createElement("option");
    option.value = ticketType.name;
    option.textContent = ticketType.name + " - " + formatMoney(ticketType.price);
    ticketTypeSelect.appendChild(option);
  }
}

// Fills the page with the event information.
function showEvent(eventItem) {
  document.title = eventItem.title + " | Campus Connect";

  document.getElementById("event-icon").textContent = getCategoryIcon(eventItem.category);
  document.getElementById("event-title").textContent = eventItem.title;
  document.getElementById("event-date").textContent = formatDate(eventItem.date);
  document.getElementById("event-venue").textContent = eventItem.venue;
  document.getElementById("event-campus").textContent = eventItem.campus;
  document.getElementById("event-category").textContent = eventItem.category;
  document.getElementById("event-organiser").textContent = eventItem.organiser;
  document.getElementById("event-description").textContent = eventItem.description;

  fillTicketTypes(eventItem);
  eventDetails.hidden = false;
}

// Makes a ticket code like CC-K7M2QX: "CC-" plus 6 random characters.
// We leave out confusing characters such as 0, O, 1 and I.
function generateTicketCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CC-";
  for (let i = 0; i < 6; i++) {
    const randomPosition = Math.floor(Math.random() * letters.length);
    code = code + letters.charAt(randomPosition);
  }
  return code;
}

// Checks that the quantity is a whole number from 1 to 5.
function checkQuantityField(input) {
  const quantity = Number(input.value);
  if (input.value.trim() === "" || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
    showFieldError(input, "Enter a whole number from 1 to 5.");
    return false;
  }
  return true;
}

// Checks that a ticket type was chosen from the dropdown.
function checkTicketTypeField(input) {
  if (input.value === "") {
    showFieldError(input, "Please choose a ticket type.");
    return false;
  }
  return true;
}

// Runs every check. We run ALL of them (no stopping early) so that
// every problem shows at once. Gives back true only if all fields are fine.
function checkTicketForm() {
  checkRequiredField(buyerNameInput);
  checkPhoneField(buyerPhoneInput);
  checkTicketTypeField(ticketTypeSelect);
  checkQuantityField(quantityInput);
  return !focusFirstError(ticketForm);
}

// Finds the price of the ticket type the user chose.
function getPriceOfTicketType(typeName) {
  const chosen = currentEvent.ticketTypes.find(function (ticketType) {
    return ticketType.name === typeName;
  });
  return chosen.price;
}

// Builds the ticket object we save and show.
function createTicket() {
  const quantity = Number(quantityInput.value);
  const price = getPriceOfTicketType(ticketTypeSelect.value);
  return {
    code: generateTicketCode(),
    eventId: currentEvent.id,
    eventTitle: currentEvent.title,
    date: currentEvent.date,
    venue: currentEvent.venue,
    ticketType: ticketTypeSelect.value,
    quantity: quantity,
    total: price * quantity,
    buyerName: buyerNameInput.value.trim(),
    phone: buyerPhoneInput.value.trim()
  };
}

// Hides the form and shows the "payment received" message with the code.
function showConfirmation(ticket) {
  document.getElementById("ticket-code").textContent = ticket.code;
  document.getElementById("confirmation-summary").textContent =
    ticket.quantity + " x " + ticket.ticketType + " for " + ticket.eventTitle +
    ". Total: " + formatMoney(ticket.total) + " (pretend payment).";
  ticketForm.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
}

// Runs when the user presses "Pay with M-Pesa".
function handleTicketSubmit(submitEvent) {
  // Stop the browser from reloading the page
  submitEvent.preventDefault();

  if (!checkTicketForm()) {
    return;
  }

  const ticket = createTicket();
  saveToList("tickets", ticket);
  showConfirmation(ticket);
}

// Decides what to show: the event, or a friendly "not found" message.
function startPage() {
  currentEvent = findEventFromUrl();
  if (currentEvent === undefined) {
    eventNotFound.hidden = false;
    return;
  }
  showEvent(currentEvent);
  clearErrorsWhileEditing(ticketForm);
  ticketForm.addEventListener("submit", handleTicketSubmit);
}

startPage();
