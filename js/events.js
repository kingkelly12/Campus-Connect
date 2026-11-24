// ==========================================================
// events.js - the events list with category and campus filters.
// ==========================================================

const eventCategorySelect = document.getElementById("category-select");
const eventCampusSelect = document.getElementById("campus-select");
const eventFilterForm = document.getElementById("filter-form");
const eventResultsCount = document.getElementById("results-count");
const eventResultsGrid = document.getElementById("results-grid");
const eventEmptyState = document.getElementById("empty-state");

// Gives back only the events that match the chosen category and campus.
// An empty choice means "any". data.js already lists events by date,
// and filter keeps that order, so the cards stay sorted by date.
function filterEvents() {
  const category = eventCategorySelect.value;
  const campus = eventCampusSelect.value;

  return events.filter(function (eventItem) {
    const categoryOk = category === "" || eventItem.category === category;
    const campusOk = campus === "" || eventItem.campus === campus;
    return categoryOk && campusOk;
  });
}

// Redraws the count, the cards, or the empty message.
function showEventResults() {
  const matches = filterEvents();

  if (matches.length === 1) {
    eventResultsCount.textContent = "1 event found";
  } else {
    eventResultsCount.textContent = matches.length + " events found";
  }

  eventResultsGrid.textContent = "";
  for (let i = 0; i < matches.length; i++) {
    eventResultsGrid.appendChild(createEventCard(matches[i]));
  }

  eventEmptyState.hidden = matches.length > 0;
}

// Resets the filters so all events show again.
function clearEventFilters() {
  eventCategorySelect.value = "";
  eventCampusSelect.value = "";
  showEventResults();
}

eventCategorySelect.addEventListener("change", showEventResults);
eventCampusSelect.addEventListener("change", showEventResults);
document.getElementById("clear-filters").addEventListener("click", clearEventFilters);
eventFilterForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

showEventResults();
