/**
 * DAGUPAN TOURIST ATTRACTION WEBSITE - FRONTEND APPLICATION CORE
 */

class DagupanApp {
  constructor() {
    this.attractions = [];
    this.currentCategory = 'All';
    this.currentBudget = 'All';
    this.currentSort = 'popularity';
    this.searchQuery = '';
    this.bookmarks = JSON.parse(localStorage.getItem('dagupan_bookmarks') || '[]');
    this.adminToken = localStorage.getItem('dagupan_admin_token') || null;
    this.currentTheme = localStorage.getItem('dagupan_theme') || 'dark';

    this.itinerary = JSON.parse(localStorage.getItem('dagupan_itinerary') || JSON.stringify([
      { dayNumber: 1, title: "Day 1: Coastline & Seafood", items: [] },
      { dayNumber: 2, title: "Day 2: Eco-Adventure & Culture", items: [] }
    ]));

    this.init();
  }

  async init() {
    this.applyTheme(this.currentTheme);
    this.updateBookmarkBadge();
    await this.fetchAttractions();

    // Attach Event Listeners
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  }

  // --- THEME MANAGEMENT ---
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dagupan_theme', theme);
    const label = document.getElementById('theme-toggle-label');
    if (label) {
      label.textContent = theme === 'dark' ? 'Light Theme' : 'Dark Theme';
    }
  }

  // --- NAVIGATION & VIEWS ---
  switchView(viewId) {
    const views = ['home', 'planner', 'admin'];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.style.display = v === viewId ? 'block' : 'none';
    });

    // Highlight active nav item
    document.querySelectorAll('.nav-item button').forEach(btn => {
      if (btn.getAttribute('data-view') === viewId) {
        btn.classList.add('active');
      } else if (btn.getAttribute('data-view')) {
        btn.classList.remove('active');
      }
    });

    if (viewId === 'planner') {
      this.renderPlannerView();
    } else if (viewId === 'admin') {
      this.renderAdminView();
    }
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  }

  // --- API DATA FETCHING ---
  async fetchAttractions() {
    try {
      const url = `/api/attractions?cat=${encodeURIComponent(this.currentCategory)}&budget=${encodeURIComponent(this.currentBudget)}&sort=${this.currentSort}&q=${encodeURIComponent(this.searchQuery)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        this.attractions = data.data;
        this.renderAttractionsGrid();
      }
    } catch (err) {
      console.error('Error fetching attractions:', err);
    }
  }

  // --- FILTERING & SEARCH ---
  filterByCategory(cat) {
    this.currentCategory = cat;
    this.switchView('home');

    // Update active nav button
    document.querySelectorAll('.nav-item button').forEach(btn => {
      if (btn.getAttribute('data-cat') === cat) {
        btn.classList.add('active');
      } else if (btn.getAttribute('data-cat')) {
        btn.classList.remove('active');
      }
    });

    // Update filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      if (pill.getAttribute('data-pill') === cat) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    this.fetchAttractions();
  }

  filterPill(cat) {
    this.filterByCategory(cat);
  }

  handleFilterChange() {
    const budgetSelect = document.getElementById('budget-filter-select');
    const sortSelect = document.getElementById('sort-select');
    if (budgetSelect) this.currentBudget = budgetSelect.value;
    if (sortSelect) this.currentSort = sortSelect.value;
    this.fetchAttractions();
  }

  handleSearchInput(e) {
    this.searchQuery = e.target.value.trim();
    this.fetchAttractions();
  }

  handleHeroSearch(e) {
    if (e.key === 'Enter') {
      this.executeHeroSearch();
    }
  }

  executeHeroSearch() {
    const heroInput = document.getElementById('hero-search-input');
    if (heroInput) {
      this.searchQuery = heroInput.value.trim();
      const topSearch = document.getElementById('topbar-search-input');
      if (topSearch) topSearch.value = this.searchQuery;
      this.fetchAttractions();
      window.scrollTo({ top: 520, behavior: 'smooth' });
    }
  }

  // --- RENDER ATTRACTION CARDS ---
  renderAttractionsGrid() {
    const grid = document.getElementById('attractions-grid');
    if (!grid) return;

    if (this.attractions.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;" class="glass-card">
          <i class="fa-solid fa-fish" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3>No Attractions Found</h3>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your search terms or filter selection.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.attractions.map(item => {
      const isBookmarked = this.bookmarks.includes(item.id);
      return `
        <article class="glass-card attraction-card">
          <div class="card-image-wrap">
            <img src="${item.image}" alt="${item.name}" class="card-image" loading="lazy">
            <span class="card-category-badge">${item.category}</span>
            <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="app.toggleBookmark('${item.id}', event)" title="Bookmark item">
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
          <div class="card-body">
            <h4 class="card-title">${item.name}</h4>
            <div class="card-location">
              <i class="fa-solid fa-location-dot" style="color: var(--primary-light);"></i> ${item.location}
            </div>
            <p class="card-desc">${item.description}</p>
            <div class="card-footer">
              <div class="rating-box">
                <i class="fa-solid fa-star"></i> ${item.rating} <span style="color: var(--text-muted); font-weight: normal; font-size: 0.8rem;">(${item.reviewsCount})</span>
              </div>
              <span class="budget-chip">${item.priceRange}</span>
              <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;" onclick="app.openDetailModal('${item.id}')">
                Details <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- BOOKMARKS & PLANNER MANAGEMENT ---
  toggleBookmark(id, event) {
    if (event) event.stopPropagation();
    const index = this.bookmarks.indexOf(id);
    if (index === -1) {
      this.bookmarks.push(id);
    } else {
      this.bookmarks.splice(index, 1);
    }
    localStorage.setItem('dagupan_bookmarks', JSON.stringify(this.bookmarks));
    this.updateBookmarkBadge();
    this.renderAttractionsGrid();
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('bookmark-badge');
    if (badge) badge.textContent = this.bookmarks.length;
  }

  // --- ATTRACTION DETAIL MODAL ---
  async openDetailModal(id) {
    try {
      const res = await fetch(`/api/attractions/${id}`);
      const data = await res.json();
      if (!data.success) return;

      const item = data.data;
      const isBookmarked = this.bookmarks.includes(item.id);

      const content = document.getElementById('detail-modal-content');
      content.innerHTML = `
        <img src="${item.image}" class="modal-banner" alt="${item.name}">
        <div class="modal-body-padding">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <span class="card-category-badge" style="position: static;">${item.category}</span>
              <h2 style="font-size: 1.8rem; margin-top: 0.5rem;">${item.name}</h2>
              <div class="card-location" style="font-size: 0.95rem; margin-top: 0.2rem;">
                <i class="fa-solid fa-location-dot" style="color: var(--primary-light);"></i> ${item.location}
              </div>
            </div>
            <button class="btn-primary" onclick="app.addToItinerary('${item.id}')">
              <i class="fa-solid fa-calendar-plus"></i> Add to My Plan
            </button>
          </div>

          <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">${item.description}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="glass-card" style="padding: 1rem;">
              <div style="color: var(--text-muted); font-size: 0.8rem;"><i class="fa-solid fa-clock" style="color: var(--primary-light);"></i> Operating Hours</div>
              <div style="font-weight: 600; margin-top: 0.2rem;">${item.hours}</div>
            </div>
            <div class="glass-card" style="padding: 1rem;">
              <div style="color: var(--text-muted); font-size: 0.8rem;"><i class="fa-solid fa-ticket" style="color: var(--secondary);"></i> Entrance / Rates</div>
              <div style="font-weight: 600; margin-top: 0.2rem;">${item.entranceFee}</div>
            </div>
          </div>

          <!-- Interactive Pin Map Simulator -->
          <h4 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-map-location-dot"></i> Interactive Location Map</h4>
          <div class="map-simulator">
            <div class="map-grid-bg"></div>
            <div class="map-pin">
              <i class="fa-solid fa-location-dot" style="font-size: 2.2rem;"></i>
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 4px; color: #fff; margin-top: 4px;">${item.name}</span>
            </div>
          </div>

          <!-- Reviews Section -->
          <h4 style="margin: 1.5rem 0 1rem;"><i class="fa-solid fa-comments"></i> Visitor Reviews & Ratings</h4>
          <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
            ${item.reviews && item.reviews.length > 0 ? item.reviews.map(r => `
              <div class="glass-card" style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                  <strong>${r.author}</strong>
                  <span style="color: var(--secondary);"><i class="fa-solid fa-star"></i> ${r.rating}</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${r.comment}</p>
                <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.4rem;">${r.date}</div>
              </div>
            `).join('') : '<p style="color: var(--text-muted);">No reviews yet. Be the first to leave one!</p>'}
          </div>

          <!-- Submit Review Form -->
          <div class="glass-card" style="padding: 1.25rem;">
            <h5 style="margin-bottom: 0.75rem;">Leave a Visitor Review</h5>
            <form onsubmit="app.submitReview(event, '${item.id}')">
              <div style="display: grid; grid-template-columns: 1fr 120px; gap: 0.75rem; margin-bottom: 0.75rem;">
                <input type="text" id="review-author" placeholder="Your Name" style="padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: #fff; border-radius: var(--radius-sm);" required>
                <select id="review-rating" style="padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: #fff; border-radius: var(--radius-sm);">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
              </div>
              <textarea id="review-comment" rows="2" placeholder="Write your review experience..." style="width: 100%; padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); color: #fff; border-radius: var(--radius-sm); margin-bottom: 0.75rem;" required></textarea>
              <button type="submit" class="btn-primary" style="font-size: 0.85rem;">Submit Review</button>
            </form>
          </div>
        </div>
      `;

      document.getElementById('detail-modal').classList.add('active');
    } catch (err) {
      console.error(err);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  async submitReview(e, attractionId) {
    e.preventDefault();
    const author = document.getElementById('review-author').value;
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attractionId, author, rating, comment })
      });
      const data = await res.json();
      if (data.success) {
        this.openDetailModal(attractionId);
        this.fetchAttractions();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // --- PLANNER VIEW LOGIC ---
  addToItinerary(attractionId) {
    const item = this.attractions.find(a => a.id === attractionId);
    if (!item) return;

    this.itinerary[0].items.push(item);
    localStorage.setItem('dagupan_itinerary', JSON.stringify(this.itinerary));
    this.closeModal('detail-modal');
    this.switchView('planner');
  }

  removeFromItinerary(dayIndex, itemIndex) {
    this.itinerary[dayIndex].items.splice(itemIndex, 1);
    localStorage.setItem('dagupan_itinerary', JSON.stringify(this.itinerary));
    this.renderPlannerView();
  }

  renderPlannerView() {
    const daysContainer = document.getElementById('itinerary-days-container');
    const bookmarksList = document.getElementById('saved-bookmarks-list');
    const savedCountChip = document.getElementById('saved-count-chip');

    if (savedCountChip) savedCountChip.textContent = `${this.bookmarks.length} Saved`;

    if (daysContainer) {
      daysContainer.innerHTML = this.itinerary.map((day, dIdx) => `
        <div class="itinerary-day-card">
          <h3 style="color: var(--primary-light); font-size: 1.15rem; margin-bottom: 0.75rem;">${day.title}</h3>
          ${day.items.length === 0 ? `
            <p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">No spots added to this day yet. Click "Add to My Plan" on any attraction card.</p>
          ` : day.items.map((item, iIdx) => `
            <div class="itinerary-item">
              <div>
                <strong>${item.name}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${item.category} &bull; ${item.location}</div>
              </div>
              <button class="btn-icon" style="width: 32px; height: 32px;" onclick="app.removeFromItinerary(${dIdx}, ${iIdx})" title="Remove">
                <i class="fa-solid fa-trash" style="color: #ef4444; font-size: 0.85rem;"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `).join('');
    }

    if (bookmarksList) {
      const bookmarkedItems = this.attractions.filter(a => this.bookmarks.includes(a.id));
      if (bookmarkedItems.length === 0) {
        bookmarksList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">No saved bookmarks yet. Click heart on attractions.</p>`;
      } else {
        bookmarksList.innerHTML = bookmarkedItems.map(item => `
          <div class="glass-card" style="padding: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${item.category}</div>
            </div>
            <button class="btn-primary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="app.addToItinerary('${item.id}')">Add</button>
          </div>
        `).join('');
      }
    }
  }

  printItinerary() {
    window.print();
  }

  // --- AI ADVISOR MODAL ---
  openAiAdvisorModal() {
    document.getElementById('ai-modal').classList.add('active');
  }

  async generateAiRecommendation() {
    const duration = document.getElementById('ai-duration').value;
    const travelGroup = document.getElementById('ai-group').value;
    const checkedChips = Array.from(document.querySelectorAll('#ai-interest-chips input:checked')).map(c => c.value);

    const responseContainer = document.getElementById('ai-response-container');
    responseContainer.style.display = 'block';
    responseContainer.innerHTML = `<p style="color: var(--primary-light);"><i class="fa-solid fa-spinner fa-spin"></i> Generating personalized Dagupan travel itinerary...</p>`;

    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: checkedChips, duration, travelGroup })
      });
      const data = await res.json();
      if (data.success) {
        responseContainer.innerHTML = `
          <h4 style="color: var(--secondary); margin-bottom: 0.5rem;"><i class="fa-solid fa-sparkles"></i> Tailored Trip Proposal</h4>
          <p style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 1rem; color: var(--text-main);">${data.summary}</p>
          <h5 style="margin-bottom: 0.5rem;">Suggested Schedule:</h5>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${data.suggestedItinerary.map(item => `
              <div class="glass-card" style="padding: 0.6rem 0.9rem; font-size: 0.85rem;">
                <span style="color: var(--primary-light); font-weight: 700;">${item.time}</span> &bull; <strong>${item.title}</strong> (${item.spot})
              </div>
            `).join('')}
          </div>
        `;
      }
    } catch (err) {
      responseContainer.innerHTML = `<p style="color: #ef4444;">Failed to generate recommendation. Please try again.</p>`;
    }
  }

  // --- ADMIN PORTAL LOGIC ---
  openAdminModal() {
    if (this.adminToken) {
      this.switchView('admin');
    } else {
      document.getElementById('admin-login-modal').classList.add('active');
    }
  }

  openAdminView() {
    if (!this.adminToken) {
      this.openAdminModal();
    } else {
      this.switchView('admin');
    }
  }

  async handleAdminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user-input').value;
    const pass = document.getElementById('admin-pass-input').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await res.json();
      if (data.success) {
        this.adminToken = data.token;
        localStorage.setItem('dagupan_admin_token', data.token);
        this.closeModal('admin-login-modal');
        this.updateAdminUI();
        this.switchView('admin');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  }

  updateAdminUI() {
    const statusDiv = document.getElementById('admin-status-badge');
    if (statusDiv && this.adminToken) {
      statusDiv.innerHTML = `
        <button class="btn-secondary" onclick="app.adminLogout()" style="font-size: 0.85rem; border-color: rgba(239,68,68,0.4); color: #f87171;">
          <i class="fa-solid fa-right-from-bracket"></i> Logout Admin
        </button>
      `;
    }
  }

  adminLogout() {
    this.adminToken = null;
    localStorage.removeItem('dagupan_admin_token');
    location.reload();
  }

  renderAdminView() {
    const tableBody = document.getElementById('admin-table-body');
    const listingsCount = document.getElementById('admin-listings-count');
    if (listingsCount) listingsCount.textContent = this.attractions.length;

    if (tableBody) {
      tableBody.innerHTML = this.attractions.map(item => `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td><span class="card-category-badge" style="position: static;">${item.category}</span></td>
          <td>${item.budgetCategory}</td>
          <td><i class="fa-solid fa-star" style="color: var(--secondary);"></i> ${item.rating}</td>
          <td>${item.reviewsCount}</td>
          <td>
            <button class="btn-icon" style="width: 32px; height: 32px; display: inline-flex;" onclick="app.deleteAttraction('${item.id}')" title="Delete listing">
              <i class="fa-solid fa-trash" style="color: #ef4444; font-size: 0.85rem;"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  openAddAttractionModal() {
    document.getElementById('add-attraction-modal').classList.add('active');
  }

  async handleSaveAttraction(e) {
    e.preventDefault();
    const name = document.getElementById('attr-form-name').value;
    const category = document.getElementById('attr-form-category').value;
    const budgetCategory = document.getElementById('attr-form-budget').value;
    const priceRange = document.getElementById('attr-form-price').value || 'Free';
    const location = document.getElementById('attr-form-location').value;
    const description = document.getElementById('attr-form-desc').value;

    try {
      const res = await fetch('/api/attractions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, budgetCategory, priceRange, location, description })
      });
      const data = await res.json();
      if (data.success) {
        this.closeModal('add-attraction-modal');
        await this.fetchAttractions();
        this.renderAdminView();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async deleteAttraction(id) {
    if (!confirm('Are you sure you want to delete this attraction?')) return;
    try {
      const res = await fetch(`/api/attractions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        await this.fetchAttractions();
        this.renderAdminView();
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Global App Instance
const app = new DagupanApp();
