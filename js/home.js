// ==========================================================
// home.js - fills the "Upcoming events" and "New businesses"
// sections on the home page.
// ==========================================================

// Puts a list of ready-made cards inside a grid on the page.
function showCards(gridId, cards) {
  const grid = document.getElementById(gridId);
  for (let i = 0; i < cards.length; i++) {
    grid.appendChild(cards[i]);
  }
}

// Shows the first 3 events. data.js keeps events in date order,
// so the first 3 are the soonest ones.
function showUpcomingEvents() {
  const firstThree = events.slice(0, 3); // slice copies part of a list
  const cards = firstThree.map(createEventCard); // map turns each item into a card
  showCards("upcoming-events", cards);
}

// Shows the first 3 businesses.
function showNewBusinesses() {
  const firstThree = getAllBusinesses().slice(0, 3);
  const cards = firstThree.map(createBusinessCard);
  showCards("new-businesses", cards);
}

showUpcomingEvents();
showNewBusinesses();
