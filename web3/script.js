/* ==========================================================================
   Pixel Bloom Flower Shop - Interactive JavaScript Engine
   ========================================================================== */

// 1. Product Database
const PRODUCTS = [
  {
    id: "sakura-bouquet",
    name: "Sakura Bouquet",
    price: 24.99,
    category: "Bouquets",
    color: "pink",
    rating: 5.0,
    reviewsCount: 128,
    img: "assets/sakura_bouquet.jpg",
    description: "A beautiful hand-tied bouquet inspired by the delicate beauty of sakura blossoms. Handpicked fresh daily.",
    isFeatured: true
  },
  {
    id: "pink-tulips",
    name: "Pink Tulips",
    price: 19.99,
    category: "Bouquets",
    color: "pink",
    rating: 4.8,
    reviewsCount: 94,
    img: "assets/pink_tulips.jpg",
    description: "Vibrant pink spring tulips planted in a charming clay terracotta pot. Brings sunshine into any room.",
    isFeatured: true
  },
  {
    id: "lavender-pot",
    name: "Lavender Pot",
    price: 18.99,
    category: "Potted Plants",
    color: "purple",
    rating: 4.9,
    reviewsCount: 112,
    img: "assets/lavender_pot.jpg",
    description: "Calming French lavender potted with care. Emits a soothing natural fragrance for peace and rest.",
    isFeatured: true
  },
  {
    id: "sunflower-basket",
    name: "Sunflower Basket",
    price: 22.99,
    category: "Gifts",
    color: "yellow",
    rating: 4.7,
    reviewsCount: 86,
    img: "assets/sunflower_basket.jpg",
    description: "Radiant golden sunflowers arranged in a handcrafted wicker basket. Pure joy in a bundle!",
    isFeatured: true
  },
  {
    id: "red-roses",
    name: "Red Roses",
    price: 21.99,
    category: "Bouquets",
    color: "red",
    rating: 4.9,
    reviewsCount: 140,
    img: "assets/sakura_bouquet.jpg",
    description: "Classic velvet red roses expressing romance, deep devotion, and timeless elegance.",
    isFeatured: false
  },
  {
    id: "white-lilies",
    name: "White Lilies",
    price: 18.99,
    category: "Occasions",
    color: "white",
    rating: 4.6,
    reviewsCount: 52,
    img: "assets/pink_tulips.jpg",
    description: "Pristine white royal lilies symbolizing purity and rebirth. Perfect for special celebrations.",
    isFeatured: false
  },
  {
    id: "peonies",
    name: "Peonies",
    price: 23.99,
    category: "Bouquets",
    color: "pink",
    rating: 5.0,
    reviewsCount: 79,
    img: "assets/sakura_bouquet.jpg",
    description: "Lush, fragrant pink peonies in full bloom. Soft, romantic, and dreamy.",
    isFeatured: false
  },
  {
    id: "blue-hydrangea",
    name: "Blue Hydrangea",
    price: 20.99,
    category: "Potted Plants",
    color: "blue",
    rating: 4.8,
    reviewsCount: 63,
    img: "assets/lavender_pot.jpg",
    description: "Rich ocean-blue hydrangea cluster with deep green foliage. A rare aesthetic delight.",
    isFeatured: false
  },
  {
    id: "orchid",
    name: "Orchid",
    price: 25.99,
    category: "Potted Plants",
    color: "pink",
    rating: 4.9,
    reviewsCount: 105,
    img: "assets/sakura_bouquet.jpg",
    description: "Exotic moth orchid potted in ceramic. Long-lasting blooms for sophisticated decor.",
    isFeatured: false
  },
  {
    id: "daisy-basket",
    name: "Daisy Basket",
    price: 16.99,
    category: "Gifts",
    color: "yellow",
    rating: 4.5,
    reviewsCount: 41,
    img: "assets/sunflower_basket.jpg",
    description: "Cheerful wild white and yellow daisies packed tightly in a cute wooden basket.",
    isFeatured: false
  }
];

// 2. Global Application State
let cartState = [
  { productId: "sakura-bouquet", qty: 1 },
  { productId: "pink-tulips", qty: 1 },
  { productId: "lavender-pot", qty: 1 }
];

let wishlistState = ["sakura-bouquet", "pink-tulips"];
let selectedDetailProduct = PRODUCTS[0];
let detailQtyCounter = 1;

// Filter States
let currentCategory = "all";
let currentPriceRange = "all";
let currentColor = "all";
let currentSort = "popular";

// DOM Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initSakuraCanvas();
  renderCatalog();
  renderProductDetail(selectedDetailProduct);
  renderCart();
  setupEventListeners();
  updateHeaderCounters();
});

// 3. Falling Sakura Canvas Animation
function initSakuraCanvas() {
  const canvas = document.getElementById("sakura-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y / 30) * 0.5 + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      
      // Draw pixel-style petal
      ctx.fillStyle = "#FFC0CB";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size / 1.8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFB6C1";
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size / 1.5, p.size / 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// 4. Catalog Rendering & Filtering
function renderCatalog() {
  const container = document.getElementById("catalog-container");
  const countDisplay = document.getElementById("product-count-display");
  if (!container) return;

  let filtered = PRODUCTS.filter(p => {
    // Category Filter
    if (currentCategory !== "all" && p.category !== currentCategory) return false;
    
    // Color Filter
    if (currentColor !== "all" && p.color !== currentColor) return false;

    // Price Filter
    if (currentPriceRange === "0-20" && p.price > 20) return false;
    if (currentPriceRange === "20-40" && (p.price <= 20 || p.price > 40)) return false;
    if (currentPriceRange === "40-60" && (p.price <= 40 || p.price > 60)) return false;
    if (currentPriceRange === "60+" && p.price <= 60) return false;

    return true;
  });

  // Sorting
  if (currentSort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (currentSort === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (currentSort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  countDisplay.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: span 3; text-align: center; padding: 30px; font-family: var(--font-pixel-sub); color: var(--text-muted);">🌸 No flowers found matching filters.</div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="catalog-card" data-id="${p.id}">
      <div class="catalog-img-wrapper">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div>
        <h4 class="catalog-title">${p.name}</h4>
        <div style="font-size: 11px; color: var(--gold-star);">★ ${p.rating.toFixed(1)} (${p.reviewsCount})</div>
      </div>
      <div class="catalog-footer">
        <span class="catalog-price">$${p.price.toFixed(2)}</span>
        <button class="pixel-btn pink-btn sm catalog-add-btn" data-id="${p.id}">+ Cart 🛒</button>
      </div>
    </div>
  `).join('');
}

// 5. Product Detail View Handler
function renderProductDetail(product) {
  const container = document.getElementById("detail-dynamic-wrapper");
  if (!container) return;

  const isWishlisted = wishlistState.includes(product.id);

  container.innerHTML = `
    <div class="detail-main-img-box">
      <img src="${product.img}" alt="${product.name}" id="detail-main-img">
    </div>
    
    <div class="detail-thumbs-row">
      <button class="detail-thumb-btn active"><img src="${product.img}" alt="thumb1"></button>
      <button class="detail-thumb-btn"><img src="${product.img}" alt="thumb2"></button>
      <button class="detail-thumb-btn"><img src="${product.img}" alt="thumb3"></button>
    </div>

    <h3 class="detail-title">${product.name}</h3>
    
    <div class="rating-row">
      <span>★★★★★</span>
      <strong>(${product.reviewsCount})</strong>
    </div>

    <div class="detail-price">$${product.price.toFixed(2)}</div>
    
    <p class="detail-desc">${product.description}</p>

    <div class="qty-picker-row">
      <span>Quantity</span>
      <button class="qty-btn" id="detail-qty-minus">-</button>
      <span class="qty-value" id="detail-qty-val">${detailQtyCounter}</span>
      <button class="qty-btn" id="detail-qty-plus">+</button>
    </div>

    <button class="pixel-btn pink-btn lg full-width" id="detail-add-cart-btn">
      Add to Cart 🛒
    </button>

    <button class="pixel-btn outline-btn sm full-width" id="detail-wishlist-toggle-btn">
      ${isWishlisted ? '💖 In Wishlist' : '🤍 Add to Wishlist'}
    </button>
  `;

  // Bind Detail Events
  document.getElementById("detail-qty-minus").addEventListener("click", () => {
    if (detailQtyCounter > 1) {
      detailQtyCounter--;
      document.getElementById("detail-qty-val").textContent = detailQtyCounter;
    }
  });

  document.getElementById("detail-qty-plus").addEventListener("click", () => {
    detailQtyCounter++;
    document.getElementById("detail-qty-val").textContent = detailQtyCounter;
  });

  document.getElementById("detail-add-cart-btn").addEventListener("click", () => {
    addToCart(product.id, detailQtyCounter);
    showToast(`Added ${detailQtyCounter}x ${product.name} to cart! 🌸`);
  });

  document.getElementById("detail-wishlist-toggle-btn").addEventListener("click", () => {
    toggleWishlist(product.id);
    renderProductDetail(product);
  });
}

// 6. Cart Manager
function renderCart() {
  const container = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const grandTotalEl = document.getElementById("cart-grand-total");
  const checkoutModalTotal = document.getElementById("checkout-modal-total");

  if (!container) return;

  if (cartState.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 20px; font-family: var(--font-pixel-sub); color: var(--text-muted);">Your cart is empty! 🌸</div>`;
    subtotalEl.textContent = "$0.00";
    shippingEl.textContent = "$0.00";
    grandTotalEl.textContent = "$0.00";
    if (checkoutModalTotal) checkoutModalTotal.textContent = "$0.00";
    return;
  }

  let subtotal = 0;

  container.innerHTML = cartState.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return '';

    const itemTotal = p.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row">
        <div class="item-info">
          <img src="${p.img}" alt="${p.name}">
          <span class="item-name">${p.name}</span>
        </div>
        <span>$${p.price.toFixed(2)}</span>
        <div style="display:flex; align-items:center; gap: 4px;">
          <button class="qty-btn" style="width:20px;height:20px;" onclick="updateCartQty('${p.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" style="width:20px;height:20px;" onclick="updateCartQty('${p.id}', 1)">+</button>
        </div>
        <strong>$${itemTotal.toFixed(2)}</strong>
        <button class="item-remove-btn" onclick="removeFromCart('${p.id}')">✕</button>
      </div>
    `;
  }).join('');

  const shipping = subtotal > 50 || subtotal === 0 ? 0.00 : 5.00;
  const grandTotal = subtotal + shipping;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = `$${shipping.toFixed(2)}`;
  grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
  if (checkoutModalTotal) checkoutModalTotal.textContent = `$${grandTotal.toFixed(2)}`;

  updateHeaderCounters();
}

function addToCart(productId, qty = 1) {
  const existing = cartState.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cartState.push({ productId, qty });
  }
  renderCart();
}

function updateCartQty(productId, delta) {
  const item = cartState.find(i => i.productId === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      renderCart();
    }
  }
}

function removeFromCart(productId) {
  cartState = cartState.filter(i => i.productId !== productId);
  renderCart();
  showToast("Item removed from cart 🌸");
}

function updateHeaderCounters() {
  const totalCount = cartState.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("top-cart-count").textContent = totalCount;
  document.getElementById("wishlist-count").textContent = wishlistState.length;
}

function toggleWishlist(productId) {
  const idx = wishlistState.indexOf(productId);
  if (idx > -1) {
    wishlistState.splice(idx, 1);
    showToast("Removed from wishlist 💔");
  } else {
    wishlistState.push(productId);
    showToast("Added to wishlist! 💖");
  }
  updateHeaderCounters();
}

// 7. Event Listeners Setup
function setupEventListeners() {
  // Category Pill Buttons
  document.querySelectorAll(".category-pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });

  // Filter Sidebar Radio Handlers
  document.querySelectorAll("input[name='cat-filter']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      renderCatalog();
    });
  });

  document.querySelectorAll("input[name='price-filter']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentPriceRange = e.target.value;
      renderCatalog();
    });
  });

  // Color Swatch Handler
  document.querySelectorAll(".color-swatch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentColor = btn.dataset.color;
      renderCatalog();
    });
  });

  // Sort Selector
  document.getElementById("sort-select")?.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderCatalog();
  });

  // Catalog Item Click Delegate (select item or add to cart)
  document.getElementById("catalog-container")?.addEventListener("click", (e) => {
    const card = e.target.closest(".catalog-card");
    const addBtn = e.target.closest(".catalog-add-btn");

    if (addBtn) {
      e.stopPropagation();
      const pId = addBtn.dataset.id;
      addToCart(pId);
      showToast("Added to cart! 🛒");
      return;
    }

    if (card) {
      const pId = card.dataset.id;
      const product = PRODUCTS.find(p => p.id === pId);
      if (product) {
        selectedDetailProduct = product;
        detailQtyCounter = 1;
        renderProductDetail(product);
        document.getElementById("product-detail-section")?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Featured Mini Products Click Delegate
  document.querySelectorAll(".mini-product-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".add-cart-mini-btn")) {
        const pId = e.target.closest(".add-cart-mini-btn").dataset.id;
        addToCart(pId);
        showToast("Added to cart! 🛒");
        return;
      }

      const pId = card.dataset.id;
      const product = PRODUCTS.find(p => p.id === pId);
      if (product) {
        selectedDetailProduct = product;
        detailQtyCounter = 1;
        renderProductDetail(product);
        document.getElementById("product-detail-section")?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search Modal Handler
  const searchModal = document.getElementById("search-modal");
  const searchTrigger = document.getElementById("search-trigger");
  const modalSearchInput = document.getElementById("modal-search-input");
  const searchResultsList = document.getElementById("search-results-list");

  searchTrigger?.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    modalSearchInput.focus();
  });

  modalSearchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResultsList.innerHTML = "";
      return;
    }

    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    searchResultsList.innerHTML = matches.map(p => `
      <div class="cart-item-row" style="cursor:pointer;" onclick="selectSearchResult('${p.id}')">
        <div class="item-info">
          <img src="${p.img}" alt="${p.name}">
          <div>
            <strong style="font-family:var(--font-pixel-sub);">${p.name}</strong>
            <div style="font-size:11px;color:var(--text-muted);">${p.category}</div>
          </div>
        </div>
        <strong>$${p.price.toFixed(2)}</strong>
      </div>
    `).join('');
  });

  // Checkout Modal Trigger & Form Submit
  const checkoutModal = document.getElementById("checkout-modal");
  const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");
  const cartModalTrigger = document.getElementById("cart-modal-trigger");

  proceedCheckoutBtn?.addEventListener("click", () => {
    if (cartState.length === 0) {
      showToast("Your cart is empty! 🌸");
      return;
    }
    checkoutModal.classList.remove("hidden");
  });

  cartModalTrigger?.addEventListener("click", () => {
    document.getElementById("cart-section")?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutModal.classList.add("hidden");
    cartState = [];
    renderCart();
    showToast("🎉 Order placed successfully! Thank you for blooming with us!");
  });

  // Close Modals logic
  document.querySelectorAll(".close-modal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      searchModal.classList.add("hidden");
      checkoutModal.classList.add("hidden");
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === searchModal) searchModal.classList.add("hidden");
    if (e.target === checkoutModal) checkoutModal.classList.add("hidden");
  });

  // Contact Form
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Message sent! We'll reply shortly. 🌸");
  });

  // Newsletter Form
  document.getElementById("newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Thank you for subscribing to Pixel Bloom! 💖");
  });

  document.getElementById("continue-shopping-btn")?.addEventListener("click", () => {
    document.getElementById("shop-section")?.scrollIntoView({ behavior: 'smooth' });
  });
}

function selectSearchResult(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (p) {
    selectedDetailProduct = p;
    renderProductDetail(p);
    document.getElementById("search-modal")?.classList.add("hidden");
    document.getElementById("product-detail-section")?.scrollIntoView({ behavior: 'smooth' });
  }
}

// 8. Toast Helper
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "pixel-toast";
  toast.innerHTML = `<span>🌸</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
