/* ==========================================================================
   FESTORA – LocalStorage Persistence Helpers
   ========================================================================== */

const FestoraStorage = {
  STORAGE_KEY: 'festora_bookings',

  /**
   * Retrieve all saved bookings
   * @returns {Array} List of booking objects
   */
  getBookings() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading bookings from localStorage:', e);
      return [];
    }
  },

  /**
   * Save a new booking
   * @param {Object} booking 
   * @returns {Object} Saved booking with ID and timestamp
   */
  saveBooking(booking) {
    try {
      const bookings = this.getBookings();
      const newBooking = {
        id: booking.id || 'FST-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
        ...booking
      };
      bookings.unshift(newBooking); // newest first
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
      return newBooking;
    } catch (e) {
      console.error('Error saving booking to localStorage:', e);
      return null;
    }
  },

  /**
   * Find a booking by its registration ID
   * @param {string} id 
   */
  getBookingById(id) {
    const bookings = this.getBookings();
    return bookings.find(b => b.id === id) || null;
  },

  /**
   * Cancel / delete a booking
   * @param {string} id 
   * @returns {boolean} True if deleted
   */
  cancelBooking(id) {
    try {
      let bookings = this.getBookings();
      const initialLength = bookings.length;
      bookings = bookings.filter(b => b.id !== id);
      if (bookings.length !== initialLength) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error cancelling booking:', e);
      return false;
    }
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.FestoraStorage = FestoraStorage;
}
