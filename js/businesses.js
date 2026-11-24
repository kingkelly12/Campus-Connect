// ==========================================================
// businesses.js - the directory page: search + filters that
// update the list live.
// ==========================================================

const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const campusSelect = document.getElementById("campus-select");
const clearButton = document.getElementById("clear-filters");
const filterForm = document.getElementById("filter-form");
const resultsCount = document.getElementById("results-count");
const resultsGrid = document.getElementById("results-grid");
const emptyState = document.getElementById("empty-state");

// All businesses (sample + saved sellers), read once when the page opens.
const allBusinesses = getAllBusinesses();

// Says whether ONE business matches what the user typed and chose.
// An empty category or campus means "any".
function businessMatches(business, keyword, category, campus) {
  const searchableText = (business.name + " " + business.category + " " + business.description).toLowerCase();

  if (keyword !== "" && !searchableText.includes(keyword)) {
    return false;
  }
  if (category !== "" && business.category !== category) {
    return false;
  }
  if (campus !== "" && business.campus !== campus) {
    return false;
  }
  return true;
}

// Gives back only the businesses that match the current filters.
function filterBusinesses() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const campus = campusSelect.value;

  // filter keeps only the items for which our function says true
  return allBusinesses.filter(function (business) {
    return businessMatches(business, keyword, category, campus);
  });
}

// Redraws the results: the count, the cards, or the empty message.
function showResults() {
  const matches = filterBusinesses();

  if (matches.length === 1) {
    resultsCount.textContent = "1 business found";
  } else {
    resultsCount.textContent = matches.length + " businesses found";
  }

  // Remove the old cards first, then add the new ones
  resultsGrid.textContent = "";
  for (let i = 0; i < matches.length; i++) {
    resultsGrid.appendChild(createBusinessCard(matches[i]));
  }

  emptyState.hidden = matches.length > 0;
}

// Resets all filters and shows everything again.
function clearFilters() {
  searchInput.value = "";
  categorySelect.value = "";
  campusSelect.value = "";
  showResults();
  searchInput.focus();
}

// Copies ?q= and ?category= from the address bar into the filter boxes.
// This is how the home page search box and category chips work.
function readFiltersFromUrl() {
  searchInput.value = getQueryParam("q");
  categorySelect.value = getQueryParam("category");
}

// Update the list live while typing or choosing
searchInput.addEventListener("input", showResults);
categorySelect.addEventListener("change", showResults);
campusSelect.addEventListener("change", showResults);
clearButton.addEventListener("click", clearFilters);

// Pressing Enter in the search box should not reload the page
filterForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

readFiltersFromUrl();
showResults();
