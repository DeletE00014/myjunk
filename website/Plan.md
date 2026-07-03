# PLAN.md — Grand Azure Hotel & Resort

> Modern hotel reservation platform · Vanilla HTML/CSS/JS · SPA Architecture

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ | Done |
| 🔄 | In Progress |
| ⬜ | Not Started |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Structure | HTML5 semantic |
| Styling | Vanilla CSS (modular files, CSS custom properties) |
| Logic | Vanilla JavaScript (SPA with hash router) |
| Fonts | Inter (Google Fonts) |
| Backend | Client-side mock data (`store.js`) — swap for real API later |

---

## User Roles

| Role | Capabilities |
|------|-------------|
| **Guest** | Browse rooms, search availability, book, manage reservations, profile |
| **Receptionist** | Check-in/out, view & manage today's bookings |
| **Admin** | Dashboard analytics, manage rooms/types/bookings/customers, reports, settings |

---

## How to Proceed — Developer Guide

### Architecture Overview

```
index.html                  ← Single page, loads all CSS/JS
├── css/
│   ├── variables.css       ← Design tokens (colors, spacing, shadows, dark mode)
│   ├── base.css            ← Reset, typography, global styles
│   ├── components.css      ← Reusable UI (cards, buttons, forms, badges)
│   ├── layout.css          ← Grid, flex, container, spacing utilities
│   ├── header.css          ← Site header
│   ├── footer.css          ← Site footer
│   ├── animations.css      ← Keyframes and animation classes
│   └── pages/              ← Page-specific styles (home.css, rooms.css, etc.)
├── js/
│   ├── app.js              ← Entry point: registers routes, starts router
│   ├── router.js           ← Hash-based SPA router with route guards
│   ├── data/
│   │   ├── store.js        ← Mock database (localStorage) + data API
│   │   └── auth.js         ← Auth logic (login, register, session)
│   ├── utils/
│   │   ├── ui.js           ← Header/footer rendering, shared UI helpers
│   │   └── helpers.js      ← Format currency, truncate text, etc.
│   └── pages/              ← One file per page (home.js, rooms.js, etc.)
```

### Global Namespace

Everything lives under `window.Hotel`. Never pollute the global scope.

```
Hotel.Store        → data/store.js     (data access)
Hotel.Auth         → data/auth.js      (authentication)
Hotel.Utils        → utils/helpers.js   (formatting, text utils)
Hotel.UI           → utils/ui.js        (header, footer, shared UI)
Hotel.Router       → router.js          (routing)
Hotel.Pages.Home   → pages/home.js      (home page)
Hotel.Pages.Rooms  → pages/rooms.js     (rooms listing)
...
```

### How to Add a New Page

Follow this exact pattern. Every page has been built this way.

**Step 1 — Create the JS file** (`js/pages/yourPage.js`)

```js
window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.YourPage = {
    render: async (params) => {
        // params.id is available for dynamic routes like /thing/:id
        // Fetch data from Hotel.Store
        // Return HTML string
        return `
            <section class="py-8">
                <div class="container">
                    <h1>Page Title</h1>
                </div>
            </section>
        `;
    },
    mount: (params) => {
        // Called AFTER render. Attach event listeners here.
        // document.getElementById('my-btn').addEventListener(...)
    }
};
```

**Step 2 — Register the route** (`js/app.js`)

```js
Hotel.Router.addRoute('/your-page', Hotel.Pages.YourPage.render, {
    pageNamespace: 'YourPage',
    title: 'Your Page'
});
```

Route options:
- `pageNamespace` — must match the key in `Hotel.Pages` (enables `mount()`)
- `title` — sets `document.title`
- `requiresAuth: true` — redirects to login if not authenticated
- `requiredRole: 'admin'` — restricts to a specific role

**Step 3 — Add the `<script>` tag** (`index.html`)

```html
<script src="js/pages/yourPage.js"></script>
```

Place it in the `<!-- JS Pages -->` section, **before** `router.js`.

**Step 4 — Add page-specific CSS** (if needed)

Create `css/pages/yourPage.css` and link it in `index.html`:
```html
<link rel="stylesheet" href="css/pages/yourPage.css">
```

Use existing design tokens from `variables.css` and utility classes from `layout.css` / `components.css`. Only write page-specific CSS if you need custom layouts.

### How to Add Data / Store Methods

All data lives in `js/data/store.js` using localStorage.

**Read data:**
```js
const data = Hotel.Store.getData();       // returns entire data object
const types = Hotel.Store.getRoomTypes(); // shortcut methods
```

**Write data:**
```js
const data = Hotel.Store.getData();
data.bookings.push(newBooking);
Hotel.Store.saveData(data);
```

**Add a new API method** — add it to the `return` block of the IIFE:
```js
return {
    ...existingMethods,
    getBookingById: (id) => getData().bookings.find(b => b.id === id),
};
```

### CSS Conventions

| Need | Use |
|------|-----|
| Colors | `var(--primary)`, `var(--accent)`, `var(--success)`, etc. |
| Spacing | `var(--space-4)`, `var(--space-8)`, etc. |
| Shadows | `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)` |
| Glass effect | `background: var(--glass-bg); backdrop-filter: var(--glass-blur)` |
| Layout | `.container`, `.grid`, `.grid-3`, `.flex`, `.flex-between` |
| Components | `.card`, `.btn`, `.btn-primary`, `.btn-outline` |
| Spacing classes | `.py-8`, `.mb-8`, `.mt-4`, `.gap-4` |
| Text | `.text-center`, `.text-secondary` |
| Animation | `.animate-fadeIn`, `.animate-fadeInUp` |

Never use hardcoded colors or magic numbers. Always use design tokens.

### Workflow for Each Task

```
1. Read the task from the phase table below
2. Identify which files to create or edit (listed in the "Files" column)
3. Write the JS page/logic following the patterns above
4. Write the CSS using existing tokens (new file only if needed)
5. Register the route in app.js
6. Add script/link tags in index.html
7. Test in browser: navigation, data, responsiveness
8. Mark the task ✅ in this plan
```

### What to Build Next (Priority Order)

Complete Phase 2 first, then move to Phase 3. Within each phase, follow this order:

**Phase 2 — Remaining tasks:**

1. **About page** → Create `js/pages/about.js`. Render hotel info from `Hotel.Store.getData().hotel`. Include name, description, amenities, a map placeholder, and team section. Style with existing `.card`, `.grid` classes. Register route `/about`.

2. **Contact page** → Create `js/pages/contact.js`. Build a contact form (name, email, message) with a submit handler in `mount()`. Display hotel phone/email/address from store. Register route `/contact`.

3. **FAQ page** → Create `js/pages/faq.js`. Hardcode FAQ data as an array in the file. Render as accordion (click to expand). Use a `mount()` handler to toggle `.active` class. Register route `/faq`.

4. **Search & filter UX** → Edit `js/pages/rooms.js`. Add filter controls (price range, capacity, bed type). Filter against `Hotel.Store.getRoomTypes()`. Re-render the grid on filter change.

**Phase 3 — Booking & Payment:**

5. **Availability check** → Add `isRoomAvailable(roomTypeId, checkIn, checkOut)` to `store.js`. Check against existing bookings for date overlap.

6. **Booking form** → Edit `js/pages/booking.js`. Show date pickers, guest count, room summary. Validate dates. Call availability check. On submit, call `Hotel.Store.createBooking()`.

7. **Booking confirmation** → After successful booking, render a confirmation view with booking ID, dates, total price, and a "View My Bookings" link.

8. **Payment mock** → Create `js/pages/payment.js`. Show booking summary + fake card form. On submit, create a payment record in store and redirect to confirmation.

9. **Cancellation** → Add `cancelBooking(id)` to store. In guest dashboard, add a cancel button that updates booking status to `'cancelled'`.

**Phase 4 — Dashboards:**

10. **Route guards** → Edit `router.js` and `auth.js`. Add `hasRole(role)` check. Protect dashboard routes with `requiredRole`.

11. **Guest dashboard** → Create `js/pages/dashboard-guest.js`. Show `Hotel.Store.getUserBookings(userId)` in a table. Add profile editing form.

12. **Receptionist dashboard** → Create `js/pages/dashboard-reception.js`. Filter bookings by today's date for arrivals/departures. Add check-in/check-out buttons that update booking status.

13. **Admin dashboard** → Create `js/pages/dashboard-admin.js`. Show analytics (total bookings, revenue, occupancy %). Add CRUD tables for rooms and customers. Use `Hotel.Store` for all operations.

**Phase 5 — Enhancements:**

14. Build one feature at a time: dark mode toggle → toast notifications → gallery → reviews → calendar → favorites → transitions.

**Phase 6 — Optimization:**

15. Final pass: lazy-load images, SEO meta per route, ARIA audit, responsive QA, code cleanup.

---

## Phase 1 — Foundation & Design System ✅

> Core architecture, routing, design tokens, shared components.

| Task | Status | Files |
|------|--------|-------|
| Project structure | ✅ | `index.html` |
| CSS design system (variables, base, components, layout, animations) | ✅ | `css/variables.css`, `css/base.css`, `css/components.css`, `css/layout.css`, `css/animations.css` |
| Header & footer | ✅ | `css/header.css`, `css/footer.css`, `js/utils/ui.js` |
| Hash router (SPA navigation) | ✅ | `js/router.js` |
| App entry point | ✅ | `js/app.js` |
| Mock data store | ✅ | `js/data/store.js` |
| Utility helpers | ✅ | `js/utils/helpers.js` |

**Deliverable:** App shell renders, routes work, design tokens applied.

---

## Phase 2 — Guest Pages & Auth 🔄

> Public-facing pages + authentication flow.

| Task | Status | Files |
|------|--------|-------|
| Home page (hero, featured rooms, CTA) | ✅ | `js/pages/home.js`, `css/pages/home.css` |
| Rooms listing (grid, filters) | ✅ | `js/pages/rooms.js`, `css/pages/rooms.css` |
| Room detail page | ✅ | `js/pages/roomDetail.js` |
| Login / Register / Forgot Password | ✅ | `js/pages/auth-pages.js`, `css/pages/auth.css` |
| Auth logic (mock) | ✅ | `js/data/auth.js` |
| About page | ⬜ | `js/pages/about.js`, `css/pages/misc.css` |
| Contact page | ⬜ | `js/pages/contact.js` |
| FAQ page | ⬜ | `js/pages/faq.js` |
| Search & filter UX polish | ⬜ | `js/pages/rooms.js` |

**Deliverable:** Guest can browse all public pages, register, and log in.

---

## Phase 3 — Booking & Payment

> End-to-end reservation flow.

| Task | Status | Files |
|------|--------|-------|
| Booking form (dates, guests, room selection) | 🔄 | `js/pages/booking.js`, `css/pages/booking.css` |
| Availability check logic | ⬜ | `js/data/store.js` |
| Booking summary & confirmation | ⬜ | `js/pages/booking.js` |
| Payment mock (card form, invoice) | ⬜ | `js/pages/payment.js` |
| Email confirmation (mock/UI) | ⬜ | `js/utils/notifications.js` |
| Cancellation flow | ⬜ | `js/pages/booking.js` |

**Deliverable:** Guest can complete a full book → pay → confirm cycle.

---

## Phase 4 — Dashboards

> Role-specific panels.

| Task | Status | Files |
|------|--------|-------|
| **Guest dashboard** — my bookings, profile, notifications | ⬜ | `js/pages/dashboard-guest.js`, `css/pages/dashboard.css` |
| **Receptionist dashboard** — arrivals, departures, active bookings | ⬜ | `js/pages/dashboard-reception.js` |
| **Admin dashboard** — analytics, revenue, occupancy, room/customer CRUD | ⬜ | `js/pages/dashboard-admin.js` |
| Role-based route guards | ⬜ | `js/router.js`, `js/data/auth.js` |

**Deliverable:** Each role sees its own dashboard after login.

---

## Phase 5 — Enhancements

> Features that elevate UX from functional to premium.

| Task | Status | Files |
|------|--------|-------|
| Room image gallery / lightbox | ⬜ | `js/utils/ui.js` |
| Reviews & ratings | ⬜ | `js/pages/roomDetail.js`, `js/data/store.js` |
| Favorites / wishlist | ⬜ | `js/data/store.js` |
| Calendar date-picker | ⬜ | `js/utils/datepicker.js` |
| Toast notifications | ⬜ | `js/utils/notifications.js` |
| Dark mode toggle | ⬜ | `css/variables.css`, `js/app.js` |
| Smooth page transitions | ⬜ | `css/animations.css` |

**Deliverable:** Polished, interactive UX with gallery, reviews, dark mode.

---

## Phase 6 — Optimization & Launch

> Performance, accessibility, final QA.

| Task | Status | Files |
|------|--------|-------|
| Lazy-load images | ⬜ | `js/utils/helpers.js` |
| SEO meta tags per page | ⬜ | `js/router.js` |
| Accessibility audit (ARIA, focus, contrast) | ⬜ | All |
| Responsive QA (mobile, tablet, desktop) | ⬜ | All CSS |
| Code review — no duplication, no TODOs, no placeholders | ⬜ | All |
| Performance pass (minimize reflows, cache DOM) | ⬜ | All JS |

**Deliverable:** Production-ready, fast, accessible, SEO-optimized site.

---

## Database Models (Client-Side Mock)

All data lives in `store.js` until a backend is introduced.

| Model | Key Fields |
|-------|-----------|
| Users | id, name, email, password, role, avatar |
| Rooms | id, typeId, number, floor, status, price, images |
| RoomTypes | id, name, description, capacity, amenities |
| Bookings | id, userId, roomId, checkIn, checkOut, guests, status, total |
| Payments | id, bookingId, method, amount, status, date |
| Reviews | id, userId, roomId, rating, comment, date |
| Notifications | id, userId, type, message, read, date |

---

## Rules

- Follow existing architecture — no new frameworks.
- Edit only the files needed for the current task.
- Reuse components; never duplicate.
- Keep modules small and focused.
- No TODOs, no placeholder text, no lorem ipsum.
- Every phase must produce something usable.

---

## Definition of Done

✓ All pages render correctly across devices  
✓ Booking flow works end-to-end  
✓ Role-based access enforced  
✓ No broken routes or dead links  
✓ Clean, documented, modular code  
✓ Responsive, accessible, SEO-ready  
✓ Ready for backend integration  
