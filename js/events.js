/* ==========================================================================
   FESTORA – Event Catalog Data & Query Utilities
   ========================================================================== */

/* Demo dates are generated from today so this prototype never shows stale dates.
   Replace these sample dates with verified event data before public ticket sales. */
function getDemoSchedule(daysFromNow, durationDays = 0) {
  const start = new Date();
  start.setDate(start.getDate() + daysFromNow);
  start.setHours(18, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + durationDays);
  const fmt = (date, options) => new Intl.DateTimeFormat('en-IN', options).format(date);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const date = durationDays ? (sameMonth ? `${fmt(start,{month:'short'})} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}` : `${fmt(start,{month:'short',day:'numeric'})} – ${fmt(end,{month:'short',day:'numeric',year:'numeric'})}`) : fmt(start,{month:'short',day:'numeric',year:'numeric'});
  const dateBadge = fmt(start,{month:'short',day:'2-digit'}).toUpperCase();
  const localTarget = `${start.getFullYear()}-${String(start.getMonth()+1).padStart(2,'0')}-${String(start.getDate()).padStart(2,'0')}T18:00:00`;
  return { date, dateBadge, countdownTarget: localTarget };
}

const FESTORA_EVENTS = [
  {
    id: "sunburn-arena",
    name: "Sunburn Arena 2026",
    tagline: "Asia's Premier Electronic Music Experience with Laser Spectacle",
    category: "EDM",
    ...getDemoSchedule(14, 0),
    time: "16:00 - 01:00 IST",
    venue: "D.Y. Patil Stadium",
    city: "Mumbai",
    startingPrice: 999,
    formattedPrice: "₹999",
    image: "assets/images/events/sunburn-arena.jpg",
    featured: true,
    popular: true,
    description: "Sunburn Arena returns to Mumbai for an unforgettable night of arena-scale electronic dance music. Featuring 360-degree laser mapping, state-of-the-art pyro, and an international lineup of world-class headliners delivering high-octane basslines under the stars.",
    lineup: [
      { name: "Charlotte de Witte", role: "Headliner", genre: "Acid Techno", stage: "Solar Stage", time: "22:30 - 00:30", image: "assets/images/artists/artist-01.jpg" },
      { name: "Amélie Lens", role: "Co-Headliner", genre: "Peak-Time Techno", stage: "Solar Stage", time: "20:30 - 22:15", image: "assets/images/artists/artist-02.jpg" },
      { name: "Alec Troniq", role: "Live Act", genre: "Deep Electronic", stage: "Aurora Stage", time: "18:45 - 20:15", image: "assets/images/artists/artist-05.jpg" }
    ],
    schedule: [
      { time: "16:00", artist: "Gates Open & Sunset Warmup", stage: "All Stages", duration: "90 min" },
      { time: "17:30", artist: "Underground Collective", stage: "Aurora Stage", duration: "60 min" },
      { time: "18:45", artist: "Alec Troniq (Live)", stage: "Aurora Stage", duration: "90 min" },
      { time: "20:30", artist: "Amélie Lens", stage: "Solar Stage", duration: "105 min" },
      { time: "22:30", artist: "Charlotte de Witte (Closing Set)", stage: "Solar Stage", duration: "120 min" }
    ],
    ticketTiers: [
      {
        id: "ga",
        name: "General Access",
        price: 999,
        formattedPrice: "₹999",
        features: ["Standard festival arena admission", "Access to food village & brand popups", "Standard bar queues", "Free festival wristband"]
      },
      {
        id: "vip",
        name: "VIP Access",
        price: 2499,
        formattedPrice: "₹2,499",
        features: ["Fast-track priority entry lanes", "Elevated VIP viewing deck overlooking main stage", "Exclusive air-conditioned restrooms", "2 complimentary premium beverage tokens"],
        popular: true
      },
      {
        id: "premium",
        name: "Premium Experience",
        price: 4999,
        formattedPrice: "₹4,999",
        features: ["All VIP privileges included", "Access to Artist Backstage Lounge", "Complimentary gourmet dinner buffet", "Reserved VIP parking slot", "Commemorative laminate & merch pack"]
      }
    ],
    faqs: [
      { q: "What is the age restriction?", a: "This event is strictly 18+. Government-issued photo ID (Aadhaar, Passport, Driver's License) is required at entry." },
      { q: "Can I transfer or cancel my ticket?", a: "This prototype stores demo reservations in your browser only. No paid ticket, admission, or real cancellation service is provided." },
      { q: "Is re-entry allowed?", a: "No re-entry is permitted once wristband has been scanned for security protocols." }
    ]
  },
  {
    id: "echoes-tomorrow",
    name: "Echoes of Tomorrow",
    tagline: "Three Days. Unstoppable Energy. Infinite Memories.",
    category: "EDM",
    ...getDemoSchedule(28, 2),
    time: "15:00 - 02:00 IST",
    venue: "Vagator Hilltop",
    city: "Goa",
    startingPrice: 1499,
    formattedPrice: "₹1,499",
    image: "assets/images/events/echoes-tomorrow.jpg",
    featured: true,
    popular: true,
    description: "Nestled along the cliffs of Vagator, Echoes of Tomorrow brings three nights of electronic euphoria. Designed for sound purists, featuring acoustic spatial architecture, immersive visual projections, and a multi-stage coastal oasis.",
    lineup: [
      { name: "Joris Voorn", role: "Headliner", genre: "Melodic House & Techno", stage: "Solar Stage", time: "23:00 - 01:30", image: "assets/images/artists/artist-04.jpg" },
      { name: "Popof", role: "Special Guest", genre: "Tech House", stage: "Solar Stage", time: "21:00 - 22:45", image: "assets/images/artists/artist-03.jpg" },
      { name: "Alien Chicks", role: "Live Experimental", genre: "Synthwave", stage: "Lunar Stage", time: "19:30 - 20:45", image: "assets/images/artists/artist-06.jpg" }
    ],
    schedule: [
      { time: "15:00", artist: "Beachfront Ambient Session", stage: "Lunar Stage", duration: "120 min" },
      { time: "17:30", artist: "Sunset Grooves Live", stage: "Aurora Stage", duration: "90 min" },
      { time: "19:30", artist: "Alien Chicks", stage: "Lunar Stage", duration: "75 min" },
      { time: "21:00", artist: "Popof", stage: "Solar Stage", duration: "105 min" },
      { time: "23:00", artist: "Joris Voorn", stage: "Solar Stage", duration: "150 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 1499, formattedPrice: "₹1,499", features: ["Access to all 3 coastal stages", "Access to food & chillout zones", "Festival wristband"] },
      { id: "vip", name: "VIP Access", price: 3299, formattedPrice: "₹3,299", features: ["VIP cliffside view deck", "Express entry", "Exclusive bars", "3 drinks included"], popular: true },
      { id: "premium", name: "Premium Experience", price: 6999, formattedPrice: "₹6,999", features: ["Full 3-day unlimited pass", "VIP lounge & artist village entry", "Gourmet coastal dining", "Dedicated concierge"] }
    ],
    faqs: [
      { q: "Is camping available at the venue?", a: "Yes, eco-camping passes can be reserved during registration checkout." }
    ]
  },
  {
    id: "midnight-tour",
    name: "The Midnight Tour: Live at West",
    tagline: "Atmospheric Synthwave and Heavy Beats Under City Lights",
    category: "Rock",
    ...getDemoSchedule(42, 0),
    time: "19:00 - 23:30 IST",
    venue: "Jio World Garden",
    city: "Mumbai",
    startingPrice: 1299,
    formattedPrice: "₹1,299",
    image: "assets/images/events/midnight-tour.jpg",
    featured: true,
    popular: true,
    description: "An electric stadium rock and synthwave experience capturing nostalgic neon cityscapes, driving analog synthesizers, and soaring guitar riffs that will reverberate through the night.",
    lineup: [
      { name: "Drayen", role: "Headliner", genre: "Alternative Rock", stage: "Main Stage", time: "21:00 - 23:00", image: "assets/images/artists/artist-03.jpg" },
      { name: "Étienne de Crécy", role: "Opening Act", genre: "French Touch Electro", stage: "Main Stage", time: "19:30 - 20:45", image: "assets/images/artists/artist-01.jpg" }
    ],
    schedule: [
      { time: "19:00", artist: "Doors Open", stage: "Main Stage", duration: "30 min" },
      { time: "19:30", artist: "Étienne de Crécy", stage: "Main Stage", duration: "75 min" },
      { time: "21:00", artist: "Drayen (Headline Performance)", stage: "Main Stage", duration: "120 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 1299, formattedPrice: "₹1,299", features: ["Floor standing admission", "Merch tent access"] },
      { id: "vip", name: "VIP Access", price: 2799, formattedPrice: "₹2,799", features: ["Front-of-stage VIP pit", "Express bar line", "Signed concert poster"], popular: true },
      { id: "premium", name: "Premium Experience", price: 5499, formattedPrice: "₹5,499", features: ["Soundcheck viewing access", "Exclusive meet & greet queue", "Premium lounge seating"] }
    ]
  },
  {
    id: "indie-waves",
    name: "Indie Waves Festival",
    tagline: "Celebrating Independent Voices, Dream Pop & Soulful Acoustics",
    category: "Indie",
    ...getDemoSchedule(56, 0),
    time: "15:00 - 22:30 IST",
    venue: "Jayamahal Palace Grounds",
    city: "Bengaluru",
    startingPrice: 799,
    formattedPrice: "₹799",
    image: "assets/images/events/indie-waves.jpg",
    featured: true,
    popular: false,
    description: "Immerse yourself in lush reverb, dream-pop melodies, and honest songwriting. Indie Waves gathers the subcontinent's most innovative independent songwriters in a relaxed, open-air garden venue.",
    lineup: [
      { name: "Sonora Collective", role: "Headliner", genre: "Dream Pop", stage: "Garden Stage", time: "20:30 - 22:00", image: "assets/images/artists/artist-02.jpg" },
      { name: "Dominick Eulberg", role: "Special Guest", genre: "Organic Ambient", stage: "Acoustic Grove", time: "18:30 - 20:00", image: "assets/images/artists/artist-04.jpg" }
    ],
    schedule: [
      { time: "15:00", artist: "Acoustic Open Sessions", stage: "Acoustic Grove", duration: "90 min" },
      { time: "17:00", artist: "Indie Rising Showcase", stage: "Garden Stage", duration: "75 min" },
      { time: "18:30", artist: "Dominick Eulberg", stage: "Acoustic Grove", duration: "90 min" },
      { time: "20:30", artist: "Sonora Collective", stage: "Garden Stage", duration: "90 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 799, formattedPrice: "₹799", features: ["Open lawn access", "Artisan flea market access"] },
      { id: "vip", name: "VIP Access", price: 1899, formattedPrice: "₹1,899", features: ["Reserved deck seating", "2 craft beverage vouchers", "Fast track entry"], popular: true },
      { id: "premium", name: "Premium Experience", price: 3499, formattedPrice: "₹3,499", features: ["Backstage garden access", "Picnic basket with artisanal bites", "Artist signing booth"] }
    ]
  },
  {
    id: "neon-nights",
    name: "Neon Nights Underground",
    tagline: "Industrial Warehouse Techno, Hypnotic Visuals & Deep Bass",
    category: "EDM",
    ...getDemoSchedule(70, 0),
    time: "21:00 - 05:00 IST",
    venue: "The Great Eastern Mills",
    city: "Mumbai",
    startingPrice: 1199,
    formattedPrice: "₹1,199",
    image: "assets/images/events/neon-nights.jpg",
    featured: true,
    popular: true,
    description: "A dark industrial warehouse experience focused strictly on uncompromising techno, brutalist lighting bars, and void acoustics. An intimate night where music and darkness fuse.",
    lineup: [
      { name: "Amélie Lens", role: "Headliner", genre: "Industrial Techno", stage: "Turbine Hall", time: "01:30 - 04:30", image: "assets/images/artists/artist-02.jpg" },
      { name: "Alec Troniq", role: "Live", genre: "Deep Minimal", stage: "Turbine Hall", time: "23:00 - 01:15", image: "assets/images/artists/artist-05.jpg" }
    ],
    schedule: [
      { time: "21:00", artist: "Dark Ambient Warmup", stage: "Turbine Hall", duration: "120 min" },
      { time: "23:00", artist: "Alec Troniq (Live)", stage: "Turbine Hall", duration: "135 min" },
      { time: "01:30", artist: "Amélie Lens (Extended Set)", stage: "Turbine Hall", duration: "180 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 1199, formattedPrice: "₹1,199", features: ["Warehouse access", "Cloakroom entry"] },
      { id: "vip", name: "VIP Access", price: 2499, formattedPrice: "₹2,499", features: ["Mezzanine viewing gantry", "Dedicated bar", "No-wait queue entry"], popular: true },
      { id: "premium", name: "Premium Experience", price: 4299, formattedPrice: "₹4,299", features: ["Behind-the-booth access", "Premium spirits bar pass", "Limited edition industrial t-shirt"] }
    ]
  },
  {
    id: "primal-scream",
    name: "Primal Scream + The Jesus and Mary Chain",
    tagline: "Legends of Alternative Rock and Psychedelic Noise Pop",
    category: "Rock",
    ...getDemoSchedule(84, 0),
    time: "18:30 - 23:00 IST",
    venue: "Indira Gandhi Indoor Arena",
    city: "Delhi",
    startingPrice: 1599,
    formattedPrice: "₹1,599",
    image: "assets/images/events/primal-scream.jpg",
    featured: true,
    popular: true,
    description: "An iconic co-headlining rock spectacular bringing together two of the most influential UK alternative rock institutions. Expect electrifying anthems, feedback-drenched guitars, and timeless swagger.",
    lineup: [
      { name: "Primal Scream", role: "Co-Headliner", genre: "Alternative Rock", stage: "Arena Stage", time: "21:00 - 22:45", image: "assets/images/artists/artist-01.jpg" },
      { name: "The Jesus and Mary Chain", role: "Co-Headliner", genre: "Noise Pop / Post-Punk", stage: "Arena Stage", time: "19:15 - 20:30", image: "assets/images/artists/artist-04.jpg" }
    ],
    schedule: [
      { time: "18:30", artist: "Arena Doors Open", stage: "Arena Stage", duration: "45 min" },
      { time: "19:15", artist: "The Jesus and Mary Chain", stage: "Arena Stage", duration: "75 min" },
      { time: "21:00", artist: "Primal Scream", stage: "Arena Stage", duration: "105 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 1599, formattedPrice: "₹1,599", features: ["Upper tier seated arena admission", "Access to concourse food & beverage"] },
      { id: "vip", name: "VIP Access", price: 3499, formattedPrice: "₹3,499", features: ["Floor standing golden circle", "Dedicated VIP merchandise booth", "Early arena access"], popular: true },
      { id: "premium", name: "Premium Experience", price: 6499, formattedPrice: "₹6,499", features: ["Center-front VIP lounge seats", "Hospitality suite food & beverage", "Commemorative VIP badge"] }
    ]
  },
  {
    id: "sound-of-freedom",
    name: "Sound of Freedom World Tour",
    tagline: "Stadium Anthem Hip-Hop and Global Chart-Topping Spectacle",
    category: "Hip-Hop",
    ...getDemoSchedule(98, 0),
    time: "18:00 - 23:30 IST",
    venue: "Jawaharlal Nehru Stadium",
    city: "Delhi",
    startingPrice: 1799,
    formattedPrice: "₹1,799",
    image: "assets/images/events/stage-seating-map.png",
    featured: false,
    popular: true,
    description: "The global hip-hop tour touching down in Delhi for a massive stadium performance with multi-tier runway stages, 50-foot pyro cannons, and explosive live collaborations.",
    lineup: [
      { name: "Drayen", role: "Special Guest", genre: "Rap & Beats", stage: "Stadium Center", time: "20:00 - 21:00", image: "assets/images/artists/artist-03.jpg" },
      { name: "Alien Chicks", role: "Opening Act", genre: "Urban Bass", stage: "Stadium Center", time: "18:45 - 19:45", image: "assets/images/artists/artist-06.jpg" }
    ],
    schedule: [
      { time: "18:00", artist: "Gates Open & DJ Warmup", stage: "Stadium Center", duration: "45 min" },
      { time: "18:45", artist: "Alien Chicks", stage: "Stadium Center", duration: "60 min" },
      { time: "20:00", artist: "Drayen", stage: "Stadium Center", duration: "60 min" },
      { time: "21:15", artist: "Sound of Freedom Main Showcase", stage: "Stadium Center", duration: "120 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 1799, formattedPrice: "₹1,799", features: ["Stadium bowl seating (Tier 2)", "Concourse concessions access"] },
      { id: "vip", name: "VIP Access", price: 3999, formattedPrice: "₹3,999", features: ["Tier 1 premium viewing bowl", "Express entry gate", "Complimentary tour lanyard"], popular: true },
      { id: "premium", name: "Premium Experience", price: 7999, formattedPrice: "₹7,999", features: ["On-field runway pit access", "Exclusive hospitality marquee", "After-party access badge"] }
    ]
  },
  {
    id: "acoustic-sessions",
    name: "Acoustic Sessions: Intimate Night",
    tagline: "Unplugged Strings, Warm Vocals & Candlelit Ambience",
    category: "Jazz",
    ...getDemoSchedule(112, 0),
    time: "19:00 - 22:00 IST",
    venue: "Royal Opera House",
    city: "Mumbai",
    startingPrice: 899,
    formattedPrice: "₹899",
    image: "assets/images/events/acoustic-sessions.jpg",
    featured: false,
    popular: false,
    description: "An intimate, candlelit celebration of acoustic musicianship inside the historic Royal Opera House. Stripped-back arrangements, rich vocal harmonies, and stories behind the songs.",
    lineup: [
      { name: "Sonora", role: "Vocalist", genre: "Indie Pop & Soul", stage: "Grand Auditorium", time: "20:15 - 21:45", image: "assets/images/artists/artist-02.jpg" },
      { name: "Dominick Eulberg", role: "Pianist", genre: "Classical Modernist", stage: "Grand Auditorium", time: "19:15 - 20:00", image: "assets/images/artists/artist-04.jpg" }
    ],
    schedule: [
      { time: "19:00", artist: "Foyer Reception & String Quartet", stage: "Foyer", duration: "15 min" },
      { time: "19:15", artist: "Dominick Eulberg Piano Suite", stage: "Grand Auditorium", duration: "45 min" },
      { time: "20:15", artist: "Sonora Acoustic Set", stage: "Grand Auditorium", duration: "90 min" }
    ],
    ticketTiers: [
      { id: "ga", name: "General Access", price: 899, formattedPrice: "₹899", features: ["Balcony seating", "Acoustic brochure"] },
      { id: "vip", name: "VIP Access", price: 1999, formattedPrice: "₹1,999", features: ["Royal stalls prime seating", "Glass of sparkling beverage", "Fast track entry"], popular: true },
      { id: "premium", name: "Premium Experience", price: 3999, formattedPrice: "₹3,999", features: ["Private Box seating (4 seats)", "Artisanal high tea service", "Artist meet-and-greet in heritage salon"] }
    ]
  }
];

// Helper Functions
const FestoraData = {
  getAllEvents() {
    return FESTORA_EVENTS;
  },

  getFeaturedEvents() {
    return FESTORA_EVENTS.filter(e => e.featured);
  },

  getPopularEvents() {
    return FESTORA_EVENTS.filter(e => e.popular);
  },

  getEventById(id) {
    if (!id) return null;
    return FESTORA_EVENTS.find(e => e.id.toLowerCase() === id.toLowerCase()) || null;
  },

  getCategories() {
    return ["All", "EDM", "Rock", "Hip-Hop", "Indie", "Pop", "Jazz"];
  },

  getCities() {
    return ["All Cities", "Mumbai", "Delhi", "Bengaluru", "Goa"];
  },

  filterEvents({ query = "", category = "All", city = "All Cities", sortBy = "date-asc" } = {}) {
    let results = FESTORA_EVENTS.filter(event => {
      // Keyword match across name, venue, city, description, artist lineup
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || 
        event.name.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.city.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.lineup.some(artist => artist.name.toLowerCase().includes(q));

      // Category match
      const matchesCategory = !category || category === "All" || 
        event.category.toLowerCase() === category.toLowerCase();

      // City match
      const matchesCity = !city || city === "All Cities" || 
        event.city.toLowerCase() === city.toLowerCase();

      return matchesQuery && matchesCategory && matchesCity;
    });

    // Sorting
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === "popularity") {
      results.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else {
      results.sort((a, b) => new Date(a.countdownTarget) - new Date(b.countdownTarget));
    }

    return results;
  },

  renderEventCard(event) {
    if (!event) return '';
    return `
      <article class="event-card reveal-on-scroll">
        <div class="event-card-poster-wrap">
          <img class="event-card-poster" src="${event.image}" alt="${event.name} event poster" loading="lazy">
          <div class="event-card-poster-overlay"></div>
          <div class="event-card-badges">
            <span class="badge badge-yellow">${event.dateBadge}</span>
            <span class="badge badge-dark">${event.category}</span>
          </div>
        </div>
        <div class="event-card-body">
          <h3 class="event-card-title">${event.name}</h3>
          <p class="event-card-desc">${event.tagline || event.description}</p>
          <div class="event-card-meta">
            <div class="event-meta-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${event.time}</span>
            </div>
            <div class="event-meta-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${event.venue}, ${event.city}</span>
            </div>
          </div>
          <div class="event-card-footer">
            <div class="event-price-wrap">
              <span class="event-price-label">Tickets from</span>
              <span class="event-price-val">${event.formattedPrice}</span>
            </div>
            <a href="event-details.html?id=${event.id}" class="event-card-btn" aria-label="Explore ${event.name}">
              <span>EXPLORE</span>
              <svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }
};

// Make available globally in browser window
if (typeof window !== "undefined") {
  window.FestoraData = FestoraData;
  window.FESTORA_EVENTS = FESTORA_EVENTS;
}
