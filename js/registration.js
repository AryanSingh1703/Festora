/* ==========================================================================
   FESTORA – Registration Form Validation & Booking Handler (Ref 5, 6, 9)
   ========================================================================== */

(function () {
  'use strict';

  function initRegistrationPage() {
    const form = document.getElementById('registration-form');
    const formWrap = document.getElementById('registration-form-wrap');
    const confirmWrap = document.getElementById('registration-confirmation-wrap');

    if (!form || !formWrap || !confirmWrap || typeof FestoraData === 'undefined' || typeof FestoraStorage === 'undefined') return;

    // Form elements
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const phoneInput = document.getElementById('reg-phone');
    const eventSelect = document.getElementById('reg-event');
    const tierSelect = document.getElementById('reg-tier');
    const qtyInput = document.getElementById('reg-qty');

    // Summary elements
    const summaryEvent = document.getElementById('summary-event-name');
    const summaryTier = document.getElementById('summary-tier-name');
    const summaryUnitPrice = document.getElementById('summary-unit-price');
    const summaryQty = document.getElementById('summary-qty');
    const summaryTotal = document.getElementById('summary-total-price');

    // Confirmation elements
    const confirmPassId = document.getElementById('confirm-pass-id');
    const confirmEventName = document.getElementById('confirm-event-name');
    const confirmDateVenue = document.getElementById('confirm-event-date-venue');
    const confirmAttendee = document.getElementById('confirm-attendee-name');
    const confirmTier = document.getElementById('confirm-tier-name');
    const confirmQty = document.getElementById('confirm-qty');
    const confirmTotal = document.getElementById('confirm-total');

    const allEvents = FestoraData.getAllEvents();

    // 1. Populate Events Dropdown
    eventSelect.innerHTML = allEvents.map(e => `
      <option value="${e.id}">${e.name} (${e.city})</option>
    `).join('');

    // 2. Read query params (?event=...&tier=...&qty=...)
    const urlParams = new URLSearchParams(window.location.search);
    const initialEventId = urlParams.get('event') || allEvents[0].id;
    const initialTierId = urlParams.get('tier');
    const initialQty = parseInt(urlParams.get('qty'), 10) || 1;

    // Select initial event
    if (eventSelect.querySelector(`option[value="${initialEventId}"]`)) {
      eventSelect.value = initialEventId;
    }

    // Populate Tiers based on currently selected event
    function populateTiers(selectedTierId) {
      const currentEvent = FestoraData.getEventById(eventSelect.value) || allEvents[0];
      tierSelect.innerHTML = currentEvent.ticketTiers.map(t => `
        <option value="${t.id}" data-price="${t.price}">
          ${t.name} – ${t.formattedPrice}
        </option>
      `).join('');

      if (selectedTierId && tierSelect.querySelector(`option[value="${selectedTierId}"]`)) {
        tierSelect.value = selectedTierId;
      }
    }

    // Recalculate Order Summary Box
    function updateOrderSummary() {
      const currentEvent = FestoraData.getEventById(eventSelect.value) || allEvents[0];
      const selectedOption = tierSelect.options[tierSelect.selectedIndex];
      const tierId = tierSelect.value;
      const currentTier = currentEvent.ticketTiers.find(t => t.id === tierId) || currentEvent.ticketTiers[0];
      const qty = Math.max(1, Math.min(10, parseInt(qtyInput.value, 10) || 1));

      const total = currentTier.price * qty;
      const formattedTotal = '₹' + total.toLocaleString('en-IN');

      if (summaryEvent) summaryEvent.textContent = `Event: ${currentEvent.name}`;
      if (summaryTier) summaryTier.textContent = currentTier.name;
      if (summaryUnitPrice) summaryUnitPrice.textContent = `${currentTier.formattedPrice} / pass`;
      if (summaryQty) summaryQty.textContent = `${qty} ${qty === 1 ? 'pass' : 'passes'}`;
      if (summaryTotal) summaryTotal.textContent = formattedTotal;
    }

    // Initial tier & summary setup
    populateTiers(initialTierId);
    if (qtyInput) qtyInput.value = initialQty;
    updateOrderSummary();

    // Event listeners for dynamic changes
    eventSelect.addEventListener('change', () => {
      populateTiers();
      updateOrderSummary();
      validateField('event');
    });

    tierSelect.addEventListener('change', () => {
      updateOrderSummary();
      validateField('tier');
    });

    qtyInput.addEventListener('input', () => {
      let val = parseInt(qtyInput.value, 10);
      if (val > 10) qtyInput.value = 10;
      if (val < 1 && qtyInput.value !== '') qtyInput.value = 1;
      updateOrderSummary();
      validateField('qty');
    });

    // 3. Client-Side Field Validation Functions
    function validateField(fieldName) {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneDigits = phoneInput.value.replace(/\D/g, '');

      switch (fieldName) {
        case 'name':
          isValid = nameInput.value.trim().length >= 3;
          toggleError('group-name', !isValid);
          break;
        case 'email':
          isValid = emailRegex.test(emailInput.value.trim());
          toggleError('group-email', !isValid);
          break;
        case 'phone':
          isValid = phoneDigits.length === 10;
          toggleError('group-phone', !isValid);
          break;
        case 'event':
          isValid = !!eventSelect.value;
          toggleError('group-event', !isValid);
          break;
        case 'tier':
          isValid = !!tierSelect.value;
          toggleError('group-tier', !isValid);
          break;
        case 'qty':
          const q = parseInt(qtyInput.value, 10);
          isValid = q >= 1 && q <= 10;
          toggleError('group-qty', !isValid);
          break;
      }
      return isValid;
    }

    function toggleError(groupId, hasError) {
      const group = document.getElementById(groupId);
      if (group) {
        if (hasError) {
          group.classList.add('has-error');
        } else {
          group.classList.remove('has-error');
        }
      }
    }

    // Real-time blur/input validation
    nameInput.addEventListener('blur', () => validateField('name'));
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 3) toggleError('group-name', false);
    });

    emailInput.addEventListener('blur', () => validateField('email'));
    emailInput.addEventListener('input', () => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) toggleError('group-email', false);
    });

    phoneInput.addEventListener('blur', () => validateField('phone'));
    phoneInput.addEventListener('input', () => {
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length === 10) toggleError('group-phone', false);
    });

    // 4. Form Submit Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateField('name');
      const isEmailValid = validateField('email');
      const isPhoneValid = validateField('phone');
      const isEventValid = validateField('event');
      const isTierValid = validateField('tier');
      const isQtyValid = validateField('qty');

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isEventValid || !isTierValid || !isQtyValid) {
        if (window.FestoraUI && window.FestoraUI.showToast) {
          window.FestoraUI.showToast('Please correct the highlighted fields before submitting.', 'error');
        }
        // Focus first invalid field
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isPhoneValid) phoneInput.focus();
        return;
      }

      // Gather booking details
      const selectedEvent = FestoraData.getEventById(eventSelect.value) || allEvents[0];
      const selectedTier = selectedEvent.ticketTiers.find(t => t.id === tierSelect.value) || selectedEvent.ticketTiers[0];
      const quantity = parseInt(qtyInput.value, 10);
      const totalAmount = selectedTier.price * quantity;
      const formattedTotal = '₹' + totalAmount.toLocaleString('en-IN');

      const bookingData = {
        attendeeName: nameInput.value.trim(),
        attendeeEmail: emailInput.value.trim(),
        attendeePhone: phoneInput.value.trim(),
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        eventDate: selectedEvent.date,
        eventVenue: selectedEvent.venue,
        eventCity: selectedEvent.city,
        eventImage: selectedEvent.image,
        tierId: selectedTier.id,
        tierName: selectedTier.name,
        unitPrice: selectedTier.price,
        formattedUnitPrice: selectedTier.formattedPrice,
        quantity: quantity,
        totalAmount: totalAmount,
        formattedTotal: formattedTotal
      };

      // 5. Save to LocalStorage
      const saved = FestoraStorage.saveBooking(bookingData);

      if (saved) {
        // Populate Confirmation Card
        if (confirmPassId) confirmPassId.textContent = saved.id;
        if (confirmEventName) confirmEventName.textContent = saved.eventName;
        if (confirmDateVenue) confirmDateVenue.textContent = `${saved.eventDate} • ${saved.eventVenue}, ${saved.eventCity}`;
        if (confirmAttendee) confirmAttendee.textContent = saved.attendeeName;
        if (confirmTier) confirmTier.textContent = saved.tierName;
        if (confirmQty) confirmQty.textContent = `${saved.quantity} ${saved.quantity === 1 ? 'Pass' : 'Passes'}`;
        if (confirmTotal) confirmTotal.textContent = saved.formattedTotal;

        // Transition views
        formWrap.style.display = 'none';
        confirmWrap.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (window.FestoraUI && window.FestoraUI.showToast) {
          window.FestoraUI.showToast('Demo reservation saved in this browser. No ticket or payment was issued.', 'error');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initRegistrationPage);
})();
