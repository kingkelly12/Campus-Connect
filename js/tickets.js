// ==========================================================
// tickets.js - lists the tickets saved on this device.
// ==========================================================

const ticketList = document.getElementById("ticket-list");
const noTickets = document.getElementById("empty-state");

// Builds one ticket card (as page elements) and gives it back.
// textContent is used so the typed name can never run as code.
function createTicketCard(ticket) {
  const card = makeElement("article", "card ticket");

  card.appendChild(makeElement("h3", "card-title", ticket.eventTitle));
  card.appendChild(makeElement("p", "ticket-code", ticket.code));
  card.appendChild(makeElement("p", "card-meta", formatDate(ticket.date) + " · " + ticket.venue));
  card.appendChild(makeElement("p", "card-text", ticket.quantity + " x " + ticket.ticketType + " ticket for " + ticket.buyerName));
  card.appendChild(makeElement("p", "card-price", "Total: " + formatMoney(ticket.total)));
  card.appendChild(makeElement("span", "badge badge-pending", "Demo ticket (not real)"));

  return card;
}

// Shows every saved ticket, or the empty message if there are none.
function showTickets() {
  const tickets = getSavedList("tickets");

  for (let i = 0; i < tickets.length; i++) {
    ticketList.appendChild(createTicketCard(tickets[i]));
  }

  noTickets.hidden = tickets.length > 0;
}

showTickets();
