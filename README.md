# Campus Connect (C Connect)

**Sell. Find. Attend. No followers needed.**

Campus Connect is a marketplace and events website for Kenyan university students. Student sellers list their businesses and events. Other students search, then contact the seller on WhatsApp or by phone. Event tickets are "bought" with M-Pesa.

This is a **university class project**. It is built with plain HTML, CSS and JavaScript only: no frameworks, no libraries, no build step and no backend. Everything is a **demo**: no real money moves, nobody is really verified, and all businesses and phone numbers are made up.

## How to run it

1. Open the `Campus-Connect` folder.
2. **Double-click `index.html`.** It opens in your browser. No server and no internet are needed.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home: search box, category chips, upcoming events, new businesses |
| `businesses.html` | Directory with live search, category and campus filters |
| `business.html?id=1` | One business, with WhatsApp, Call and Report buttons |
| `events.html` | Events list with category and campus filters |
| `event.html?id=1` | One event and the (pretend) ticket form |
| `join.html` | "Become a seller" form |
| `tickets.html` | Tickets saved on this device |

## Folders

- `css/style.css`: the only stylesheet
- `js/data.js`: sample businesses and events
- `js/main.js`: helpers shared by all pages
- `js/*.js`: one small script per page

Read **[HOW_IT_WORKS.md](HOW_IT_WORKS.md)** for a plain-English explanation of every file, what is simulated, and likely questions from a lecturer.
