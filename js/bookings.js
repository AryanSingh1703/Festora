/* ==========================================================================
   FESTORA – My Bookings Dashboard Logic (Ref 1 & 7)
   ========================================================================== */

(function () {
  'use strict';

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function initBookingsDashboard() {
    const listMount = document.getElementById('bookings-mount');
    const emptyState = document.getElementById('bookings-empty-state');
    const modal = document.getElementById('cancel-modal');
    const modalEventName = document.getElementById('cancel-event-name');
    const btnAbort = document.getElementById('btn-abort-cancel');
    const btnExecute = document.getElementById('btn-execute-cancel');

    if (!listMount || !emptyState || typeof FestoraStorage === 'undefined') return;

    let targetBookingId = null;

    // Render bookings from LocalStorage
    function renderBookings() {
      const bookings = FestoraStorage.getBookings();

      if (!bookings || bookings.length === 0) {
        listMount.style.display = 'none';
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';
      listMount.style.display = 'flex';

      listMount.innerHTML = bookings.map(b => `
        <article class="booking-card-item reveal-on-scroll is-revealed" data-booking-id="${escapeHTML(b.id)}">
          <div class="booking-card-poster-wrap">
            <img class="booking-card-poster" src="${b.eventImage || 'assets/images/events/sunburn-arena.jpg'}" alt="${escapeHTML(b.eventName)} poster" loading="lazy">
          </div>
          <div class="booking-card-body">
            
            <div>
              <div class="booking-card-header">
                <div>
                  <div class="booking-ref-badge">PASS ID: ${escapeHTML(b.id)}</div>
                  <h2 class="booking-event-name">${escapeHTML(b.eventName)}</h2>
                </div>
                <span class="badge badge-live">DEMO RESERVATION</span>
              </div>

              <div class="booking-meta-row">
                <div class="booking-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  <span>${escapeHTML(b.eventDate)}</span>
                </div>
                <div class="booking-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${escapeHTML(b.eventVenue)}, ${escapeHTML(b.eventCity)}</span>
                </div>
              </div>
            </div>

            <!-- Details Matrix -->
            <div class="booking-card-details-grid">
              <div class="booking-detail-col">
                <span class="booking-detail-label">Primary Attendee</span>
                <span class="booking-detail-val">${escapeHTML(b.attendeeName)}</span>
              </div>
              <div class="booking-detail-col">
                <span class="booking-detail-label">Tier Category</span>
                <span class="booking-detail-val">${escapeHTML(b.tierName)}</span>
              </div>
              <div class="booking-detail-col">
                <span class="booking-detail-label">Total Amount</span>
                <span class="booking-detail-val" style="color:var(--accent-primary);">${b.formattedTotal || ('₹' + b.totalAmount)} (${b.quantity} ${b.quantity === 1 ? 'pass' : 'passes'})</span>
              </div>
            </div>

            <!-- Action Controls -->
            <div class="booking-card-footer">
              <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                <a href="event-details.html?id=${b.eventId}" class="btn btn-secondary btn-sm btn-pill">
                  <span>VIEW EVENT DETAILS ↗</span>
                </a>
                <button type="button" class="btn btn-ghost btn-sm btn-pill" onclick="window.print()">
                  <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
                  <span>PRINT SUMMARY</span>
                </button>
              </div>

              <button type="button" class="btn-cancel-booking" data-id="${escapeHTML(b.id)}" data-name="${escapeHTML(b.eventName)}">
                <svg style="width:13px;height:13px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span>CANCEL PASS</span>
              </button>
            </div>

          </div>
        </article>
      `).join('');

      // Wire cancel buttons
      const cancelBtns = listMount.querySelectorAll('.btn-cancel-booking');
      cancelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          targetBookingId = btn.getAttribute('data-id');
          const name = btn.getAttribute('data-name');
          if (modalEventName) modalEventName.textContent = name;
          openCancelModal();
        });
      });
    }

    // Modal helpers
    function openCancelModal() {
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeCancelModal() {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      targetBookingId = null;
    }

    if (btnAbort) btnAbort.addEventListener('click', closeCancelModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCancelModal();
      });
    }

    if (btnExecute) {
      btnExecute.addEventListener('click', () => {
        if (!targetBookingId) return;
        const deleted = FestoraStorage.cancelBooking(targetBookingId);
        closeCancelModal();

        if (deleted) {
          renderBookings();
          if (window.FestoraUI && window.FestoraUI.showToast) {
            window.FestoraUI.showToast('Your demo reservation has been removed from this browser.');
          }
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeCancelModal();
      }
    });

    renderBookings();
  }

  document.addEventListener('DOMContentLoaded', initBookingsDashboard);
})();
