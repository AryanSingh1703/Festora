# 🎪 FESTORA — Live Entertainment Discovery Platform

> A premium, cinematic concert, music festival, and live entertainment discovery & registration platform. Built with semantic HTML5, modern CSS3, and vanilla JavaScript. Zero frameworks. Zero external image CDNs. All assets are local.

---

## 🗂 Project Structure

```
festora/
├── index.html              # Homepage — hero, events grid, categories, artists, countdown, footer
├── events.html             # Explore Events — real-time search, genre filters, city/sort dropdowns
├── event-details.html      # Event Details — lineup, stage schedule, venue map, FAQ, ticket panel
├── registration.html       # Registration Flow — form validation, price calculator, pass confirmation
├── bookings.html           # My Bookings — LocalStorage dashboard, cancel reservation modal
├── artists.html            # Artists Directory — spotlight, search, genre filters
├── about.html              # About FESTORA — brand story, values, contact form, legal anchors
│
├── css/
│   ├── style.css           # Design tokens, reset, typography, components, layout
│   ├── animations.css      # Keyframes: fadeInUp, pulseGlow, subtleFloat, soundWave
│   └── responsive.css      # Breakpoints: 1440px, 1023px, 767px, 639px, 379px
│
├── js/
│   ├── main.js             # Core: scroll, drawer, theme, hero modal, events grid, countdown, toast
│   ├── events.js           # FestoraData engine: 8 event objects, filterEvents(), renderEventCard()
│   ├── event-details.js    # Dynamic detail renderer: hero, lineup, timetable, map, FAQ, booking panel
│   ├── registration.js     # Form validation, price calculator, LocalStorage persistence, QR SVG
│   ├── bookings.js         # Booking dashboard renderer, cancel modal, LocalStorage CRUD
│   └── storage.js          # FestoraStorage: LocalStorage helpers for booking persistence
│
├── assets/
│   ├── images/
│   │   ├── hero/           # Full-bleed concert stage photos
│   │   ├── events/         # Event card thumbnails
│   │   ├── categories/     # Genre tile backgrounds
│   │   ├── artists/        # Artist portrait shots
│   │   └── backgrounds/    # Section backdrop images
│   └── icons/              # SVG icon set (location, calendar, ticket, etc.)
│
└── .gitignore
```

---

## 🚀 How to Open Locally

No build step required. Just open `index.html` in any modern browser:

```
# Option 1 — File Explorer
Double-click index.html

# Option 2 — VS Code Live Server
Right-click index.html → "Open with Live Server"

# Option 3 — Python quick server (from project root)
python -m http.server 8080
# then visit http://localhost:8080
```

---

## 📄 Pages Overview

| Page | URL | Key Features |
|---|---|---|
| **Homepage** | `index.html` | Hero video modal, featured events grid, genre tiles, artist cards, countdown timer, newsletter |
| **Explore Events** | `events.html` | Real-time search, genre chip filters, city dropdown, sort (date/price/name), URL param sync |
| **Event Details** | `event-details.html?id=...` | Dynamic via `?id=` param, artist lineup, stage timetable, SVG venue map, FAQ accordion, sticky ticket panel |
| **Registration** | `registration.html?event=...&tier=...&qty=...` | Live form validation, tier dropdown, price calculator, confirmation card with QR code + pass ID |
| **My Bookings** | `bookings.html` | Lists all LocalStorage passes, cancel with modal confirmation, empty state |
| **Artists** | `artists.html` | Artist of Month spotlight, live search, genre filters |
| **About** | `about.html` | Brand story, values, contact form, `#terms` / `#privacy` / `#security` anchors |

---

## 🎟 Event IDs (for `event-details.html?id=...`)

| ID | Event Name |
|---|---|
| `sunburn-arena` | Sunburn Arena — Mumbai |
| `lollapalooza-delhi` | Lollapalooza India — Delhi |
| `nh7-weekender` | NH7 Weekender — Pune |
| `magnetic-fields` | Magnetic Fields Festival — Rajasthan |
| `echoes-underground` | Echoes Underground — Bengaluru |
| `vh1-supersonic` | VH1 Supersonic — Pune |
| `ziro-festival` | Ziro Festival of Music — Arunachal Pradesh |
| `bacardi-nh7` | Bacardi NH7 Weekender — Meghalaya |

---

## ✨ Features

### Dynamic & Interactive
- **Real-time search** — filters event cards as you type with 300ms debounce
- **Genre chip filters** — multi-select genre filtering with active state
- **City dropdown** — filter events by venue city
- **Sort** — by date (ascending), price (low/high), or event name
- **URL param sync** — filter state persists in URL (`?genre=EDM&city=Mumbai`)
- **Countdown timer** — live festival countdown (`DAYS : HOURS : MINUTES : SECONDS`)
- **Video modal** — aftermovie teaser overlay on homepage hero
- **FAQ accordion** — click to expand/collapse answers on event details page
- **Sticky ticket panel** — scrolls with you on event details, updates price live

### Registration & Persistence
- **LocalStorage persistence** — bookings survive page refresh and browser close
- **Form validation** — name (≥3 chars), email regex, phone (10 digits required)
- **Dynamic price calculator** — updates live as tier or quantity changes
- **Unique pass IDs** — `FST-XXXXXX` format, generated on registration
- **Simulated QR code** — SVG QR pattern on confirmation card
- **Cancel flow** — modal confirmation before deletion from LocalStorage

### Responsive Design
- **Breakpoints:** 1440px (large desktop), 1024px (desktop), 768px (tablet), 640px (mobile), 380px (small mobile)
- **Mobile drawer** — hamburger navigation with full-screen overlay
- **Touch-friendly** — all interactive elements ≥44px tap targets

### Visual & UX
- **Dark festival aesthetic** — `#090909` background, `#FF542E` coral accent, `#9D4EDD` purple
- **Frosted-glass navbar** — `backdrop-filter: blur(20px)` with scroll opacity
- **Ken Burns hero** — slow zoom animation on full-bleed hero image
- **Scroll reveal** — `IntersectionObserver` fade-in-up for content sections
- **Back to top** — floating button appears after 400px scroll
- **Toast notifications** — slide-in feedback for newsletter, contact form
- **Theme toggle** — dark/light mode with `localStorage` persistence
- **Neon genre tiles** — glow-on-hover genre category cards
- **Live status badges** — "ON TOUR", "HEADLINING" artist status indicators

---

## 🎨 Design System

### Color Tokens
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#090909` | Page background |
| `--bg-secondary` | `#111111` | Card backgrounds |
| `--bg-elevated` | `#1A1A1A` | Navbar, modals |
| `--accent-red` | `#FF542E` | CTAs, accents |
| `--accent-purple` | `#9D4EDD` | Secondary accents |
| `--text-primary` | `#FFFFFF` | Headings |
| `--text-secondary` | `#A3A3A3` | Body copy |

### Typography
| Font | Use |
|---|---|
| **Space Grotesk** | Section headings, nav links |
| **Inter** | Body text, metadata, labels |
| **Bebas Neue** | Display numbers (countdown, stats, prices) |

---

## 💾 LocalStorage Schema

Bookings are stored under the key `festora_bookings` as a JSON array:

```json
[
  {
    "id": "FST-482910",
    "eventId": "sunburn-arena",
    "eventName": "Sunburn Arena",
    "eventDate": "15 Mar 2025",
    "venue": "MMRDA Grounds, Mumbai",
    "tier": "VIP",
    "qty": 2,
    "totalPrice": 7998,
    "attendeeName": "Riya Sharma",
    "attendeeEmail": "riya@email.com",
    "attendeePhone": "9876543210",
    "bookedAt": "2025-01-15T10:23:00.000Z"
  }
]
```

---

## 📸 Visual References

All images were extracted locally from `FESTORA_Visual_References.pdf` (15 reference screenshots). No external image URLs are used anywhere in the codebase.

| Reference | Usage |
|---|---|
| Ref 1–3 | Navbar and hero section design |
| Ref 4–5 | Event card grid layout |
| Ref 6–8 | Genre tiles and artist cards |
| Ref 9 | Venue seating map (SVG) |
| Ref 10 | Stage timetable schedule |
| Ref 11 | Sticky ticket tier panel |
| Ref 12–13 | Artist lineup mini-cards |
| Ref 14–15 | Footer and countdown section |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 + Custom Properties |
| Scripting | Vanilla ES6+ JavaScript |
| Fonts | Google Fonts (Space Grotesk, Inter, Bebas Neue) |
| Icons | Hand-crafted SVG icon set |
| Storage | Browser LocalStorage API |
| Animation | CSS keyframes + IntersectionObserver |

> **No frameworks. No build tools. No external image CDNs. Open `index.html` and go.**

---

## 📦 Git History

| Milestone | Commit | Description |
|---|---|---|
| 1 | `d61b29b` | Project setup, image extraction, directory structure |
| 2 | `717a6c2` | Design system, CSS tokens, event data engine |
| 3 | `d1520dd` | Navigation bar with mobile drawer |
| 4 | `9eab856` | Homepage hero with Ken Burns + video modal |
| 5 | `d4f100d` | Homepage featured events grid |
| 6 | `500bd39` | Genre categories and artist cards |
| 7 | `8499bc6` | Countdown banner and footer |
| 8 | `7f29d72` | Explore Events page with filters |
| 9 | `f14bca1` | Event Details page |
| 10 | `2de76ef` | Registration flow |
| 11 | `ea73dac` | My Bookings dashboard |
| 12 | `8cca332` | Artists directory |
| 13 | `8974b9d` | About page |
| 14 | `a78c520` | UI polish: back-to-top, toast system |
| 15 | `85b23f8` | Responsive CSS across all 7 pages |
| 16 | `1462858` | Cross-browser testing and functional verification |
| 17 | *(this commit)* | Final documentation |

---

*Built for FESTORA © 2025. All rights reserved.*


## Newsletter subscriptions & private admin dashboard

The newsletter form now saves email addresses to Supabase. The private dashboard is available at `/admin.html` and supports admin sign-in, subscriber search, CSV export, refresh, and removal.

### One-time Supabase setup

1. Create a Supabase project at https://supabase.com/.
2. In **Project Settings → API**, copy the Project URL and anon/public key into `js/supabase-config.js`. Never use the `service_role` key in frontend code.
3. Open **SQL Editor** in Supabase and run the contents of `supabase/schema.sql`.
4. In **Authentication → Users**, create an admin user with your email and a strong password. Disable public sign-ups in Authentication settings if you do not need them.
5. In SQL Editor, run the admin grant query at the bottom of `supabase/schema.sql`, replacing `YOUR_ADMIN_EMAIL@example.com` with the exact admin email.
6. Open `/admin.html` on your deployed website and sign in.

Row Level Security allows visitors to insert a subscription but only user IDs listed in `admin_users` can read or remove subscribers. The browser only uses the anon/public key; the service-role key must remain private.
