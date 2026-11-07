/* ==========================================================================
   FESTORA – Main UI Interactions & Shell Scripts
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Sticky Navigation Scroll Handler ---
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load
  }

  // --- 2. Mobile Navigation Drawer ---
  function initMobileNav() {
    const toggleBtn = document.querySelector('.btn-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // --- 3. Dark / Light Theme Toggle ---
  function initThemeToggle() {
    const toggleBtns = document.querySelectorAll('.btn-theme-toggle');
    const currentTheme = localStorage.getItem('festora_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('festora_theme', newTheme);
        updateThemeIcons(newTheme);
      });
    });

    function updateThemeIcons(theme) {
      toggleBtns.forEach(btn => {
        if (theme === 'light') {
          btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        } else {
          btn.innerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        }
      });
    }
  }

  // --- 4. Scroll-Triggered Section Reveals ---
  function initScrollReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  // --- 4b. Hero Video Modal ---
  function initHeroVideoModal() {
    const videoBtn = document.getElementById('btn-hero-video');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.getElementById('btn-close-video');

    if (!videoBtn || !modal) return;

    function openModal() {
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }

    videoBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  // --- 4c. Homepage Upcoming Events Dynamic Renderer ---
  function initHomepageEvents() {
    const grid = document.getElementById('homepage-events-grid');
    if (!grid || typeof FestoraData === 'undefined') return;

    const featured = FestoraData.getFeaturedEvents();
    grid.innerHTML = featured.map(event => FestoraData.renderEventCard(event)).join('');
    
    // Re-observe scroll reveals on newly injected cards
    if (window.FestoraUI && window.FestoraUI.initScrollReveals) {
      window.FestoraUI.initScrollReveals();
    }
  }

  // --- 4d. Homepage Festival Countdown & Newsletter ---
  function initHomepageExtras() {
    // 1. Countdown Timer
    const countdownEl = document.getElementById('homepage-countdown');
    if (countdownEl && window.FestoraUI && window.FestoraUI.initCountdown && window.FestoraData) {
      const featuredEvent = window.FestoraData.getEventById('echoes-tomorrow');
      if (featuredEvent) {
        countdownEl.dataset.target = featuredEvent.countdownTarget;
        window.FestoraUI.initCountdown(featuredEvent.countdownTarget, countdownEl);
        const meta = document.getElementById('homepage-featured-meta');
        if (meta) meta.textContent = `${featuredEvent.date} • ${featuredEvent.venue}, ${featuredEvent.city} • 3 Stages • 48 Hours of Sonic Euphoria`;
      }
    }

    // 2. Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput ? emailInput.value.trim() : '';

        // Simple RFC regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          if (window.FestoraUI && window.FestoraUI.showToast) {
            window.FestoraUI.showToast('Please enter a valid email address.', 'error');
          }
          if (emailInput) emailInput.focus();
          return;
        }

        // Save the subscription in Supabase (never pretend a local-only submission was saved).
        const client = window.FestoraSupabase;
        if (!client) {
          if (window.FestoraUI && window.FestoraUI.showToast) {
            window.FestoraUI.showToast('Newsletter signup is temporarily unavailable. Please try again later.', 'error');
          }
          return;
        }

        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;
        try {
          const { error } = await client
            .from('newsletter_subscribers')
            .insert({ email: email.toLowerCase() });

          if (error && error.code === '23505') {
            if (window.FestoraUI && window.FestoraUI.showToast) {
              window.FestoraUI.showToast('This email is already subscribed.');
            }
          } else if (error) {
            throw error;
          } else if (window.FestoraUI && window.FestoraUI.showToast) {
            window.FestoraUI.showToast('You are on the list! Secret drops & lineups will arrive in your inbox.');
          }
          if (emailInput) emailInput.value = '';
        } catch (error) {
          console.error('Newsletter subscription failed:', error);
          if (window.FestoraUI && window.FestoraUI.showToast) {
            window.FestoraUI.showToast('We could not save your subscription. Please try again.', 'error');
          }
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });
    }
  }

  // --- 4e. Explore Events Dynamic Filter & Search Suite (Ref 7, 8, 13) ---
  function initExploreEventsPage() {
    const grid = document.getElementById('events-catalog-grid');
    if (!grid || typeof FestoraData === 'undefined') return;

    const searchInput = document.getElementById('filter-search-input');
    const chips = document.querySelectorAll('.filter-chip');
    const citySelect = document.getElementById('filter-city-select');
    const sortSelect = document.getElementById('filter-sort-select');
    const resetBtn = document.getElementById('btn-reset-filters');
    const emptyResetBtn = document.getElementById('btn-empty-reset');
    const emptyState = document.getElementById('events-empty-state');
    const countEl = document.getElementById('results-count');
    const activeFilterTag = document.getElementById('active-filter-indicator');

    // Filter state
    const state = {
      query: '',
      category: 'All',
      city: 'All Cities',
      sortBy: 'date-asc'
    };

    // Parse URL params (e.g. ?genre=EDM or ?focus=search)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('genre')) {
      const g = urlParams.get('genre');
      const validCategories = FestoraData.getCategories();
      const match = validCategories.find(c => c.toLowerCase() === g.toLowerCase());
      if (match) state.category = match;
    }
    if (urlParams.has('q')) {
      state.query = urlParams.get('q');
      if (searchInput) searchInput.value = state.query;
    }
    if (urlParams.has('city')) {
      state.city = urlParams.get('city');
      if (citySelect) citySelect.value = state.city;
    }
    if (urlParams.get('focus') === 'search' && searchInput) {
      setTimeout(() => searchInput.focus(), 200);
    }

    // Sync chip UI with state
    function updateChipUI() {
      chips.forEach(chip => {
        const chipGenre = chip.getAttribute('data-genre');
        if (chipGenre.toLowerCase() === state.category.toLowerCase()) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    }

    // Apply filters and re-render
    function applyFilters() {
      const results = FestoraData.filterEvents(state);

      if (countEl) countEl.textContent = results.length;

      // Update active filter indicator text
      if (activeFilterTag) {
        const tags = [];
        if (state.category !== 'All') tags.push(`Genre: ${state.category}`);
        if (state.city !== 'All Cities') tags.push(`City: ${state.city}`);
        if (state.query) tags.push(`Keyword: "${state.query}"`);
        activeFilterTag.textContent = tags.length ? `(Active: ${tags.join(', ')})` : '';
      }

      if (results.length === 0) {
        grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
      } else {
        grid.style.display = 'grid';
        if (emptyState) emptyState.style.display = 'none';
        grid.innerHTML = results.map(event => FestoraData.renderEventCard(event)).join('');

        if (window.FestoraUI && window.FestoraUI.initScrollReveals) {
          window.FestoraUI.initScrollReveals();
        }
      }
    }

    // Reset all filters
    function resetAll() {
      state.query = '';
      state.category = 'All';
      state.city = 'All Cities';
      state.sortBy = 'date-asc';

      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'All Cities';
      if (sortSelect) sortSelect.value = 'date-asc';
      updateChipUI();
      applyFilters();

      // Clean URL without refresh
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }

    // Event listeners
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.query = e.target.value.trim();
          applyFilters();
        }, 180);
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.category = chip.getAttribute('data-genre') || 'All';
        updateChipUI();
        applyFilters();
      });
    });

    if (citySelect) {
      citySelect.addEventListener('change', (e) => {
        state.city = e.target.value;
        applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyFilters();
      });
    }

    if (resetBtn) resetBtn.addEventListener('click', resetAll);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAll);

    // Initial render
    updateChipUI();
    applyFilters();
  }

  // --- 4f. Back to Top Floating Button ---
  function initBackToTop() {
    let btn = document.getElementById('btn-back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'btn-back-to-top';
      btn.className = 'btn-back-to-top';
      btn.setAttribute('aria-label', 'Scroll back to top');
      btn.setAttribute('title', 'Scroll back to top');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
      document.body.appendChild(btn);
    }

    const handleScroll = () => {
      if (window.scrollY > 350) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Explain social profiles that have not been connected yet instead of using dead links.
  function initSocialPlaceholders() {
    document.querySelectorAll('[data-social-placeholder]').forEach(button => {
      button.addEventListener('click', () => {
        const platform = button.getAttribute('data-social-placeholder');
        showToast(`FESTORA's ${platform} profile has not been connected yet.`, 'error');
      });
    });
  }

  // --- 5. Global Toast Notification System ---
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' 
      ? '<svg style="width:16px;height:16px;stroke:#2EC4B6;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      : '<svg style="width:16px;height:16px;stroke:#FF542E;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

    toast.style.cssText = `
      background: #1A1A1A;
      color: #F5F5F5;
      border: 1px solid ${type === 'success' ? '#2EC4B6' : '#FF542E'};
      border-radius: 8px;
      padding: 12px 18px;
      font-size: 0.9rem;
      font-family: var(--font-heading, sans-serif);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
    `;

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(10px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // --- 6. Live Festival Countdown Timer Engine ---
  function initCountdown(targetDateStr, containerEl) {
    if (!containerEl) return;
    const targetDate = new Date(targetDateStr).getTime();

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        containerEl.innerHTML = '<span class="countdown-expired font-display">EVENT LIVE NOW</span>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = containerEl.querySelector('[data-unit="days"]');
      const hoursEl = containerEl.querySelector('[data-unit="hours"]');
      const minsEl = containerEl.querySelector('[data-unit="minutes"]');
      const secsEl = containerEl.querySelector('[data-unit="seconds"]');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // Expose global helper namespace
  window.FestoraUI = {
    showToast,
    initCountdown,
    initScrollReveals
  };

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initThemeToggle();
    initHomepageEvents();
    initHomepageExtras();
    initExploreEventsPage();
    initBackToTop();
    initScrollReveals();
    initHeroVideoModal();
    initSocialPlaceholders();
  });
})();
