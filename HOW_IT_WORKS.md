# How Campus Connect works (for the student presenting it)

This file explains the project in plain English so you can explain every line. Read it with the code open next to it.

## 1. The big picture

- The site has **7 HTML pages**, **1 stylesheet** and **9 JavaScript files**. Nothing else.
- There is **no server and no database**. Sample data lives in `js/data.js`. Anything a user types is saved in the browser's **localStorage**, on that one device only.
- HTML is the structure, CSS is the looks, JavaScript is the behaviour. There are no `style=` or `onclick=` attributes. JavaScript attaches events with `addEventListener`.

### How data flows

```
data.js (sample arrays) ─┐
                         ├─> page script (e.g. businesses.js) ─> builds cards ─> the page (DOM)
localStorage (saved) ────┘                                         ^
                                                                   |
user types in a form ─> join.js / event.js validates ─> saveToList() ─> localStorage
```

The order of the `<script>` tags matters: `data.js` first (the arrays), then `main.js` (helpers), then the page's own script, which uses both.

## 2. Decisions I made (the brief was silent)

- **Header and footer are copied into every page.** This is not "DRY", but a beginner can read it directly in each file without JavaScript injecting it. The cost is that a menu change must be made in 7 files.
- **Events are written in date order in `data.js`**, so the pages show them sorted without any sorting code. If you add an event, put it in the right place.
- **Category and campus lists are typed into the HTML dropdowns** (not generated from the data). It is simpler to read. The cost is that a new category must be added in the data and in the dropdowns.
- **"New businesses" on the home page means the first 3 in the list**, as the brief says. Sellers who join appear at the end of the directory.
- **A saved seller's phone is converted** from `0712345678` to `254712345678`, which is the format WhatsApp links need.
- **The student name, email and ID are saved but never shown** on the listing. Only the business name, optional alias and description are shown.
- **Ticket quantity is capped at 5** per purchase.
- **Cards are built with `createElement` and `textContent`**, not `innerHTML`, for both the sample data and user data. That way one function handles both safely.

## 3. File by file

### `css/style.css`
All the styling, in 6 labelled parts: variables, base, layout, components, page parts, bigger screens.
- **`:root` variables** hold every colour, spacing step (8px scale), the radius and shadow. Change one value, and the whole site changes.
- **Mobile first:** the plain rules are for phones. Two `@media (min-width: ...)` blocks (700px and 1000px) add the desktop menu and 2 then 3 card columns.
- **`.card-title a::after`** is a trick that stretches the title link over the whole card, so the entire card is clickable.

### `js/data.js`
Two arrays: `businesses` (12) and `events` (6). All fictional. Nothing in the project changes them.

### `js/main.js` (shared helpers)
- `setupMobileMenu()`: toggles the `open` class on the menu and updates `aria-expanded`.
- `getQueryParam(name)`: reads a value from the address bar (`?id=3` gives `"3"`).
- `getSavedList(key)` / `saveToList(key, item)`: read and write lists in localStorage. `getSavedList` uses **try/catch** so damaged saved text cannot crash the page.
- `getAllBusinesses()`: sample businesses plus saved sellers.
- `showFieldError(input, message)` / `clearFieldError(input)`: add or remove the red outline and the error text under a field. `clearErrorsWhileEditing(form)` removes an error as soon as the user edits that field.
- `checkRequiredField` and `checkPhoneField`: validation shared by both forms.
- `createBusinessCard` / `createEventCard`: build a card from one data item.

### `index.html` + `js/home.js`
The hero search is a normal HTML form with `method="get"`, so pressing Search opens `businesses.html?q=...` with no JavaScript. The category chips are plain links like `businesses.html?category=Food`. `home.js` takes the first 3 events and businesses and shows them as cards.

### `businesses.html` + `js/businesses.js`
- `filterBusinesses()`: uses `filter` to keep only businesses that match the keyword, category and campus.
- `showResults()`: updates the count, redraws the cards and shows or hides the empty message. It runs on every keystroke (`input` event) and every dropdown change.
- `readFiltersFromUrl()`: fills the search box and category from `?q=` and `?category=` when the page opens.

### `business.html` + `js/business.js`
- `findBusinessFromUrl()`: uses `find` to look up the business matching `?id=`. If nothing is found, the page shows a friendly "not found" message.
- `buildWhatsAppLink()`: makes `https://wa.me/<number>?text=<message>`. `encodeURIComponent` makes the message safe to put in a link.
- `reportBusiness()`: stores the report in localStorage and changes the button to "Reported".

### `events.html` + `js/events.js`
Same idea as the directory, with two filters. `filter` keeps the original (date) order.

### `event.html` + `js/event.js`
- `checkTicketForm()`: runs every check (name, phone, ticket type, quantity), then `focusFirstError` moves the cursor to the first bad field.
- `generateTicketCode()`: `CC-` plus 6 random characters taken from a list of letters and digits using a `for` loop.
- `handleTicketSubmit()`: stops the page reload, validates, saves the ticket and shows the confirmation.

### `join.html` + `js/join.js`
- `checkJoinForm()`: checks all fields. Email must end with `.ac.ke`, ID needs 5+ characters, description 20+, phone is 07/01 plus 10 digits. The alias is optional.
- `createSeller()`: builds the saved object with `verified: false`, which is why the card says **Pending**.
- `updateCharCounter()`: the live character count.

### `tickets.html` + `js/tickets.js`
Reads the `tickets` list from localStorage and shows a card for each one, or the empty message with a link to events.

## 4. Where localStorage is used

| Key | Written by | Read by | Contains |
|---|---|---|---|
| `sellers` | `join.js` | `main.js` (`getAllBusinesses`) | Businesses added through the join form |
| `tickets` | `event.js` | `tickets.js` | Tickets with their codes |
| `reports` | `business.js` | `business.js` | Which listings were reported |

Data stays on that browser. It survives a refresh, but another device or browser will not see it. Clearing browser data erases it.

## 5. What is simulated (be honest about this)

| Feature | What really happens | What a real version needs |
|---|---|---|
| Seller verification | Form is saved in localStorage and shown as "Pending". Nobody checks anything. | A backend, an email link sent to the `.ac.ke` address, and a check against the student records |
| M-Pesa payment | The page shows a success message and makes a random code. No money moves and no PIN is asked. | A backend calling the Safaricom **Daraja API** (STK Push) and waiting for its confirmation callback |
| Ticket codes | Random, and not checked against anything. | Codes stored on a server so they can be checked at the gate, and used only once |
| Reports | Saved on your device only. No one reads them. | A backend and a moderator screen |
| Sellers shared with others | Visible only on the device that created them. | A shared database |
| Ticket "purchase history" | Only on this browser | User accounts |
| Businesses, people, numbers | Fictional (`2547000000xx`) | Real, consented data |

The WhatsApp and Call buttons are real links, but the numbers are fake.

## 6. Assignment requirements: where each is shown

| Requirement | Where |
|---|---|
| Only plain HTML, CSS, JS | No library or CDN anywhere. Check the `<head>` and `<script>` tags |
| Responsive (360px to desktop) | `style.css` part 6: two `min-width` media queries; card grid 1, 2, 3 columns |
| Visually appealing, well structured | Variables in `:root`, reusable `.card`, `.btn`, `.badge` classes |
| Forms | `join.html`, `event.html` (ticket form), filter bars, hero search |
| Navigation menu | The `<nav>` in every page, hamburger below 700px (`setupMobileMenu` in `main.js`) |
| Buttons | `.btn` styles: primary, secondary, accent, danger |
| JavaScript form validation | `join.js` (`checkJoinForm`), `event.js` (`checkTicketForm`), `main.js` (`showFieldError`) |
| Interactive behaviour | Live filtering in `businesses.js` and `events.js`, Report button, character counter |
| localStorage | Section 4 above |
| Original work | Written from scratch |
| Accessibility | `lang`, labels on all inputs, `aria-expanded`, `aria-live`, focus outlines, skip link, 44px touch targets |
| Graceful failure | "Not found" messages in `business.js` and `event.js`; `try/catch` in `getSavedList` |
| Safe text display | `textContent` and `createElement` used for everything shown |

## 7. Ten questions a lecturer might ask

1. **Why no framework?**
   The assignment requires plain HTML, CSS and JavaScript. It also shows that I understand what frameworks do for you: building elements and updating them.

2. **How does the search update while you type?**
   `businesses.js` listens for the `input` event on the search box. Every keystroke runs `showResults()`, which filters the list and redraws the cards.

3. **How does `businesses.html` know what you searched on the home page?**
   The home search form uses `method="get"`, so the browser opens `businesses.html?q=word`. `getQueryParam("q")` reads it and `readFiltersFromUrl()` puts it in the search box.

4. **How is the form validated?**
   On submit, each field is checked with plain `if` statements and string methods such as `endsWith` and `length`. A bad field gets a red border and an error message. The first bad field gets the focus. The error disappears when the user edits that field.

5. **Why use `textContent` instead of `innerHTML`?**
   `innerHTML` would run any HTML or script a user types, for example a business name like `<img onerror=...>`. `textContent` treats it as plain text, so it is safe.

6. **Where is the data stored and what happens on refresh?**
   Sample data is in `data.js`. Sellers, tickets and reports are in localStorage as JSON text. They survive a refresh, but only on the same browser.

7. **Is the M-Pesa payment real?**
   No. The page only shows a pretend success message and a random ticket code. A real version needs a backend that calls the Daraja API. We never ask for a PIN.

8. **Are the sellers really verified?**
   No. We only check that the email ends with `.ac.ke`, which anyone can type. Real verification needs the backend to send a confirmation link to that email. That is why new sellers show as "Pending".

9. **How does the WhatsApp button work?**
   It is a link to `https://wa.me/<number>?text=<message>`. WhatsApp opens a chat with that number and the message already typed. `encodeURIComponent` turns spaces and punctuation into a form that is safe in a link.

10. **What would you add with more time?**
    A backend and a database so sellers are shared between users, real email verification, M-Pesa through Daraja, and a moderator page for reports. I left these out on purpose because the assignment is frontend-only.

## 8. Things to know if you edit the code

- Add a new business or event by copying an item in `data.js` and giving it a new `id`. Keep events in date order.
- Change a colour once in `:root` in `style.css`.
- The nav, header and footer are copied in each HTML file. Change all 7 if you change one.
