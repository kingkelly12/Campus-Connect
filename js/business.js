// ==========================================================
// business.js - shows ONE business, chosen by ?id= in the URL.
// ==========================================================

const detailsSection = document.getElementById("business-details");
const notFoundSection = document.getElementById("not-found");
const reportButton = document.getElementById("report-button");
const reportMessage = document.getElementById("report-message");

// Looks for the business whose id matches the one in the URL.
// Gives back undefined when there is no match.
function findBusinessFromUrl() {
  const idFromUrl = getQueryParam("id");
  // find gives back the first item for which our function says true
  return getAllBusinesses().find(function (business) {
    return String(business.id) === idFromUrl;
  });
}

// Builds the WhatsApp link: wa.me/<number>?text=<message>.
// encodeURIComponent makes the message safe to place inside a link.
function buildWhatsAppLink(business) {
  const message = "Hi, I found " + business.name + " on Campus Connect and I would like to know more.";
  return "https://wa.me/" + business.phone + "?text=" + encodeURIComponent(message);
}

// Checks if this device already reported this business.
function hasAlreadyReported(business) {
  const reports = getSavedList("reports");
  for (let i = 0; i < reports.length; i++) {
    if (reports[i].businessId === String(business.id)) {
      return true;
    }
  }
  return false;
}

// Changes the report button and message to the "done" state.
function showReportedState() {
  reportButton.disabled = true;
  reportButton.textContent = "✔ Reported";
  reportMessage.textContent = "Reported, thank you. We will take a look.";
  reportMessage.hidden = false;
}

// Saves the report and shows the thank-you message.
function reportBusiness(business) {
  saveToList("reports", {
    businessId: String(business.id),
    businessName: business.name
  });
  showReportedState();
}

// Fills the page with the business details.
function showBusiness(business) {
  document.title = business.name + " | Campus Connect";

  document.getElementById("business-icon").textContent = getCategoryIcon(business.category);
  document.getElementById("business-name").textContent = business.name;
  document.getElementById("business-category").textContent = business.category;
  document.getElementById("business-campus").textContent = business.campus;
  document.getElementById("business-price").textContent = business.priceRange;
  document.getElementById("business-description").textContent = business.description;

  // The status badge replaces the placeholder
  document.getElementById("business-status").appendChild(createStatusBadge(business.verified));

  // Only sellers who chose an alias have one. Show it only then.
  if (business.alias) {
    document.getElementById("business-alias").textContent = "Selling as: " + business.alias;
    document.getElementById("business-alias").hidden = false;
  }

  document.getElementById("whatsapp-button").href = buildWhatsAppLink(business);
  document.getElementById("call-button").href = "tel:+" + business.phone;

  if (hasAlreadyReported(business)) {
    showReportedState();
  }

  reportButton.addEventListener("click", function () {
    reportBusiness(business);
  });

  detailsSection.hidden = false;
}

// Decides what to show: the business, or a friendly "not found" message.
function startPage() {
  const business = findBusinessFromUrl();
  if (business === undefined) {
    notFoundSection.hidden = false;
  } else {
    showBusiness(business);
  }
}

startPage();
