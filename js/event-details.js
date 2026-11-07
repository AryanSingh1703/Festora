/* ==========================================================================
   FESTORA – Individual Event Details Page Renderer (Ref 2, 7, 9, 10, 12, 13)
   ========================================================================== */

(function () {
  'use strict';

  function initEventDetails() {
    const heroMount = document.getElementById('event-hero-mount');
    const mainMount = document.getElementById('event-main-mount');
    const bookingMount = document.getElementById('sticky-booking-mount');

    if (!heroMount || !mainMount || !bookingMount || typeof FestoraData === 'undefined') return;

    // 1. Get Event from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id') || 'sunburn-arena';
    const event = FestoraData.getEventById(eventId) || FestoraData.getAllEvents()[0];

    // Update document title
    document.title = `${event.name} – Lineup, Schedule & Passes | FESTORA`;

    // 2. Render Hero Banner (Ref 2 & 7)
    heroMount.innerHTML = `
      <section class="event-hero" aria-label="${event.name} Overview">
        <img class="event-hero-bg" src="${event.image}" alt="${event.name} panoramic concert stage">
        <div class="event-hero-overlay"></div>
        <div class="container event-hero-content">
          <div class="event-hero-meta-strip">
            <span class="badge badge-yellow">${event.dateBadge}</span>
            <span class="badge badge-orange">${event.category}</span>
            <span class="badge badge-dark">DEMO EVENT LISTING</span>
          </div>
          <h1 class="event-hero-title">${event.name}</h1>
          <p class="event-hero-tagline">${event.tagline}</p>
          <div class="event-hero-details-row">
            <div class="event-hero-detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${event.time}</span>
            </div>
            <div class="event-hero-detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${event.venue}, ${event.city}</span>
            </div>
            <div class="event-hero-detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${event.date}</span>
            </div>
            <div class="event-hero-detail-item">
              <span class="badge badge-dark">18+ ADMISSION</span>
            </div>
          </div>
        </div>
      </section>
    `;

    // 3. Render Main Content (About, Lineup, Schedule, Venue Map, FAQ)
    mainMount.innerHTML = `
      <!-- About the Event -->
      <section aria-labelledby="about-event-title">
        <h2 id="about-event-title" class="detail-block-title">ABOUT THE EXPERIENCE</h2>
        <p class="detail-text">${event.description}</p>
      </section>

      <!-- Artist Lineup (Ref 12 & 13) -->
      <section id="lineup" aria-labelledby="lineup-title">
        <h2 id="lineup-title" class="detail-block-title">ARTIST LINEUP & HEADLINERS</h2>
        <div class="lineup-cards-grid">
          ${event.lineup.map(artist => `
            <article class="lineup-mini-card">
              <img class="lineup-mini-img" src="${artist.image}" alt="${artist.name}" loading="lazy">
              <div class="lineup-mini-body">
                <span class="lineup-mini-role">${artist.role}</span>
                <h3 class="lineup-mini-name">${artist.name}</h3>
                <p style="font-size:0.8rem;color:var(--text-secondary);margin:0;">${artist.stage} • ${artist.time}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- Stage Schedule Timetable (Ref 10) -->
      <section id="schedule" aria-labelledby="schedule-title">
        <h2 id="schedule-title" class="detail-block-title">STAGE TIMETABLE & SCHEDULE</h2>
        <div class="schedule-table-wrap">
          ${event.schedule.map(item => `
            <div class="schedule-row">
              <span class="schedule-time">${item.time}</span>
              <div>
                <div class="schedule-artist">${item.artist}</div>
                <div style="font-size:0.78rem;color:var(--text-muted);">${item.duration} duration</div>
              </div>
              <span class="schedule-stage">${item.stage}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Venue & Stage Map (Ref 9) -->
      <section id="venue-map" aria-labelledby="map-title">
        <h2 id="map-title" class="detail-block-title">VENUE & STAGE LAYOUT</h2>
        <div class="venue-map-card">
          <div class="venue-map-diagram">
            <svg viewBox="0 0 400 280" width="100%" height="auto" style="display:block;margin:0 auto;" aria-label="Interactive venue seating and stage map">
              <!-- Stage Area -->
              <rect x="130" y="20" width="140" height="40" rx="6" fill="#FF542E" />
              <text x="200" y="45" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" text-anchor="middle">STAGE</text>
              
              <!-- Golden Circle / VIP Pit -->
              <path d="M 80 80 Q 200 130 320 80 L 300 120 Q 200 165 100 120 Z" fill="rgba(157, 78, 221, 0.45)" stroke="#9D4EDD" stroke-width="1.5" />
              <text x="200" y="112" fill="#D6A4F9" font-family="'Inter', sans-serif" font-weight="600" font-size="11" text-anchor="middle">VIP GOLDEN CIRCLE</text>

              <!-- General Admission Standing Lawn -->
              <path d="M 40 135 Q 200 200 360 135 L 340 210 Q 200 270 60 210 Z" fill="rgba(255, 183, 3, 0.25)" stroke="#FFB703" stroke-width="1.5" />
              <text x="200" y="185" fill="#FFD166" font-family="'Inter', sans-serif" font-weight="600" font-size="12" text-anchor="middle">GENERAL ADMISSION ARENA</text>

              <!-- Sound / FOH Booth -->
              <rect x="175" y="225" width="50" height="25" rx="3" fill="#292929" stroke="#666" stroke-width="1" />
              <text x="200" y="242" fill="#AAA" font-family="'Inter', sans-serif" font-size="9" text-anchor="middle">FOH</text>
            </svg>
          </div>
          <div class="venue-map-legend">
            <div class="legend-item">
              <span class="legend-color-dot" style="background-color:#FF542E;"></span>
              <span>Main Festival Stage</span>
            </div>
            <div class="legend-item">
              <span class="legend-color-dot" style="background-color:#9D4EDD;"></span>
              <span>VIP Deck & Pit</span>
            </div>
            <div class="legend-item">
              <span class="legend-color-dot" style="background-color:#FFB703;"></span>
              <span>General Admission Arena</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Event FAQ Accordion (Ref 9) -->
      <section id="faqs" aria-labelledby="faq-title">
        <h2 id="faq-title" class="detail-block-title">FREQUENTLY ASKED QUESTIONS</h2>
        <div class="faq-accordion">
          ${event.faqs ? event.faqs.map((faq, idx) => `
            <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
              <button type="button" class="faq-question">
                <span>${faq.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-answer">
                <p>${faq.a}</p>
              </div>
            </div>
          `).join('') : ''}
        </div>
      </section>
    `;

    // 4. Render Sticky Booking Panel (Ref 6 & 7)
    let selectedTier = event.ticketTiers[0];
    let selectedQty = 1;

    function renderBookingPanel() {
      const subtotal = selectedTier.price * selectedQty;
      const formattedSubtotal = '₹' + subtotal.toLocaleString('en-IN');

      bookingMount.innerHTML = `
        <div class="booking-panel-header">
          <div class="badge badge-yellow" style="margin-bottom:0.4rem;">OFFICIAL PASSES</div>
          <h3 class="booking-panel-title">SELECT PASS TIER</h3>
          <p class="booking-panel-sub">Demo reservation preview — no payment or ticket is issued</p>
        </div>

        <!-- Ticket Tiers Radio Group -->
        <div class="ticket-tiers-group" role="radiogroup" aria-label="Select Ticket Tier">
          ${event.ticketTiers.map(tier => {
            const isSelected = tier.id === selectedTier.id;
            return `
              <div class="ticket-tier-card ${isSelected ? 'is-selected' : ''}" 
                   data-tier-id="${tier.id}" 
                   role="radio" 
                   aria-checked="${isSelected}">
                <div class="tier-card-top">
                  <div>
                    <span class="tier-name">${tier.name}</span>
                    ${tier.popular ? '<span class="badge badge-orange" style="margin-left:6px;font-size:0.65rem;">POPULAR</span>' : ''}
                  </div>
                  <span class="tier-price">${tier.formattedPrice}</span>
                </div>
                <ul class="tier-features-list">
                  ${tier.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Quantity Counter -->
        <div class="qty-control-row">
          <div>
            <div style="font-family:var(--font-heading);font-weight:700;font-size:0.9rem;text-transform:uppercase;">QUANTITY</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Max 10 passes per registration</div>
          </div>
          <div class="qty-counter">
            <button type="button" class="qty-btn" id="btn-qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-display" id="qty-val">${selectedQty}</span>
            <button type="button" class="qty-btn" id="btn-qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <!-- Subtotal -->
        <div class="booking-total-row">
          <span class="booking-total-label">TOTAL PASSES</span>
          <span class="booking-total-val" id="total-val">${formattedSubtotal}</span>
        </div>

        <!-- Proceed to Registration Action -->
        <a href="registration.html?event=${event.id}&tier=${selectedTier.id}&qty=${selectedQty}" 
           id="btn-proceed-registration" 
           class="btn btn-primary btn-pill btn-block btn-lg glow-orange">
          <span>PROCEED TO REGISTRATION ↗</span>
        </a>

        <p style="font-size:0.78rem;color:var(--text-muted);text-align:center;margin:0;">
          Local demo reservation only • No ticket or admission is issued
        </p>
      `;

      // Wire tier selection click handlers
      const tierCards = bookingMount.querySelectorAll('.ticket-tier-card');
      tierCards.forEach(card => {
        card.addEventListener('click', () => {
          const tierId = card.getAttribute('data-tier-id');
          selectedTier = event.ticketTiers.find(t => t.id === tierId) || event.ticketTiers[0];
          renderBookingPanel();
        });
      });

      // Wire quantity buttons
      const btnMinus = bookingMount.querySelector('#btn-qty-minus');
      const btnPlus = bookingMount.querySelector('#btn-qty-plus');
      
      if (btnMinus) {
        btnMinus.addEventListener('click', (e) => {
          e.stopPropagation();
          if (selectedQty > 1) {
            selectedQty--;
            renderBookingPanel();
          }
        });
      }

      if (btnPlus) {
        btnPlus.addEventListener('click', (e) => {
          e.stopPropagation();
          if (selectedQty < 10) {
            selectedQty++;
            renderBookingPanel();
          }
        });
      }
    }

    renderBookingPanel();

    // Wire FAQ accordion click toggles
    const faqItems = mainMount.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const qBtn = item.querySelector('.faq-question');
      if (qBtn) {
        qBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          faqItems.forEach(i => i.classList.remove('is-open'));
          if (!isOpen) item.classList.add('is-open');
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initEventDetails);
})();
