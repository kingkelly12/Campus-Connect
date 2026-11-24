// ==========================================================
// join.js - the "Become a seller" form.
// Nothing is really verified: the listing is saved on this
// device only and shown as "Pending".
// ==========================================================

const joinForm = document.getElementById("join-form");
const studentNameInput = document.getElementById("student-name");
const studentEmailInput = document.getElementById("student-email");
const studentIdInput = document.getElementById("student-id");
const campusInput = document.getElementById("campus");
const businessNameInput = document.getElementById("business-name");
const aliasInput = document.getElementById("alias");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const phoneInput = document.getElementById("phone");
const charCounter = document.getElementById("char-counter");
const joinSuccess = document.getElementById("join-success");

// The least number of characters a description must have.
const MIN_DESCRIPTION_LENGTH = 20;

// Checks the student email: it must end with .ac.ke (a university address).
function checkEmailField(input) {
  if (!checkRequiredField(input)) {
    return false;
  }
  const email = input.value.trim().toLowerCase();
  if (!email.includes("@") || !email.endsWith(".ac.ke")) {
    showFieldError(input, "Use your university email (ends with .ac.ke).");
    return false;
  }
  return true;
}

// Checks the student ID has at least 5 characters.
function checkStudentIdField(input) {
  if (!checkRequiredField(input)) {
    return false;
  }
  if (input.value.trim().length < 5) {
    showFieldError(input, "Student ID must be at least 5 characters. Check your student card.");
    return false;
  }
  return true;
}

// Checks the description has at least 20 characters.
function checkDescriptionField(input) {
  if (!checkRequiredField(input)) {
    return false;
  }
  if (input.value.trim().length < MIN_DESCRIPTION_LENGTH) {
    showFieldError(input, "Write at least " + MIN_DESCRIPTION_LENGTH + " characters so students know what you offer.");
    return false;
  }
  return true;
}

// Updates the live "12 / 20 characters" counter under the description.
function updateCharCounter() {
  const count = descriptionInput.value.length;
  charCounter.textContent = count + " characters (minimum " + MIN_DESCRIPTION_LENGTH + ")";
}

// Runs every check on the form. All checks run, so every problem shows
// at once. The alias is optional, so it has no check.
// Gives back true only if all fields are fine.
function checkJoinForm() {
  checkRequiredField(studentNameInput);
  checkEmailField(studentEmailInput);
  checkStudentIdField(studentIdInput);
  checkRequiredField(campusInput);
  checkRequiredField(businessNameInput);
  checkRequiredField(categoryInput);
  checkDescriptionField(descriptionInput);
  checkPhoneField(phoneInput);
  return !focusFirstError(joinForm);
}

// Builds the seller object that we save. "verified: false" is what makes
// the card say "Pending". The "seller-" id starts with text so it can
// never clash with the numbers used by the sample businesses.
function createSeller() {
  return {
    id: "seller-" + Date.now(),
    name: businessNameInput.value.trim(),
    alias: aliasInput.value.trim(),
    category: categoryInput.value,
    campus: campusInput.value,
    description: descriptionInput.value.trim(),
    priceRange: "Ask the seller",
    phone: toInternationalPhone(phoneInput.value.trim()),
    verified: false,
    studentName: studentNameInput.value.trim(),
    studentEmail: studentEmailInput.value.trim(),
    studentId: studentIdInput.value.trim()
  };
}

// Hides the form and shows the "pending verification" message.
function showJoinSuccess(seller) {
  document.getElementById("success-business").textContent = seller.name;
  document.getElementById("see-listing").href = "business.html?id=" + encodeURIComponent(seller.id);
  joinForm.hidden = true;
  joinSuccess.hidden = false;
  joinSuccess.focus();
}

// Runs when the user presses the "Submit" button.
function handleJoinSubmit(submitEvent) {
  // Stop the browser from reloading the page
  submitEvent.preventDefault();

  if (!checkJoinForm()) {
    return;
  }

  const seller = createSeller();
  saveToList("sellers", seller);
  showJoinSuccess(seller);
}

clearErrorsWhileEditing(joinForm);
descriptionInput.addEventListener("input", updateCharCounter);
joinForm.addEventListener("submit", handleJoinSubmit);
updateCharCounter();
