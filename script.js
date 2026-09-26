// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Booking form — placeholder handling only.
// This does NOT send anything anywhere yet. Wire it up to a real
// booking backend (Calendly, Square Appointments, Fresha, a form
// endpoint, etc.) before relying on it to take real bookings.
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');

if (bookingForm && formStatus) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const name = document.getElementById('name').value.trim();
    const greeting = name ? `Ευχαριστούμε, ${name}` : 'Ευχαριστούμε';
    formStatus.textContent = `${greeting} — αυτή είναι μια ενδεικτική επιβεβαίωση. Σύνδεσε αυτή τη φόρμα με ένα πραγματικό σύστημα κρατήσεων για να δέχεσαι πραγματικά αιτήματα.`;
    bookingForm.reset();
  });
}
