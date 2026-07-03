window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Booking = {
    render: async (params) => {
        const roomType = Hotel.Store.getRoomTypeById(params.id);
        if (!roomType) return `<div class="container py-8 text-center"><h1>Room Not Found</h1><p class="text-muted mt-4">The requested room type does not exist.</p><a href="#/rooms" class="btn btn-primary mt-4">Browse Rooms</a></div>`;

        const user = Hotel.Auth.getCurrentUser();
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

        const amenityIcons = {
            'WiFi': '📶', 'TV': '📺', 'Air Conditioning': '❄️', 'Balcony': '🌅',
            'Mini Bar': '🍷', 'Lounge Access': '🏢'
        };

        const amenitiesList = roomType.amenities.map(a =>
            `<span class="booking-amenity-tag"><span class="booking-amenity-icon">${amenityIcons[a] || '✓'}</span> ${a}</span>`
        ).join('');

        return `
            <div class="booking-page animate-fadeIn">
                <!-- Step Indicator -->
                <div class="booking-steps">
                    <div class="booking-steps-track">
                        <div class="booking-step active">
                            <div class="booking-step-circle">1</div>
                            <span class="booking-step-label">Reservation Details</span>
                        </div>
                        <div class="booking-step-line"></div>
                        <div class="booking-step">
                            <div class="booking-step-circle">2</div>
                            <span class="booking-step-label">Payment</span>
                        </div>
                        <div class="booking-step-line"></div>
                        <div class="booking-step">
                            <div class="booking-step-circle">3</div>
                            <span class="booking-step-label">Confirmation</span>
                        </div>
                    </div>
                </div>

                <div class="container py-8">
                    <div class="booking-layout">
                        <!-- Main Form -->
                        <div class="booking-form-section animate-fadeInUp">
                            <h1 class="booking-page-title">Complete Your Booking</h1>
                            <p class="text-secondary mb-8">Fill in the details below to reserve your room.</p>

                            <div class="booking-form-card">
                                <div class="booking-form-section-header">
                                    <span class="booking-form-section-number">1</span>
                                    <h3>Stay Dates</h3>
                                </div>
                                <div class="booking-form-grid">
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-checkin">Check-in Date</label>
                                        <input type="date" class="form-input" id="book-checkin" min="${today}" value="${today}" required>
                                    </div>
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-checkout">Check-out Date</label>
                                        <input type="date" class="form-input" id="book-checkout" min="${tomorrow}" value="${tomorrow}" required>
                                    </div>
                                </div>
                                <div id="booking-date-error" class="booking-field-error" style="display:none;"></div>

                                <div class="booking-form-section-header mt-8">
                                    <span class="booking-form-section-number">2</span>
                                    <h3>Guest Information</h3>
                                </div>
                                <div class="booking-form-grid">
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-guests">Number of Guests</label>
                                        <select class="form-input" id="book-guests">
                                            ${Array.from({length: roomType.maxGuests}, (_, i) => i + 1).map(n =>
                                                `<option value="${n}">${n} Guest${n > 1 ? 's' : ''}</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-name">Full Name</label>
                                        <input type="text" class="form-input" id="book-name" value="${user ? user.name : ''}" placeholder="Enter your full name" required>
                                    </div>
                                </div>
                                <div class="booking-form-grid">
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-email">Email Address</label>
                                        <input type="email" class="form-input" id="book-email" value="${user ? user.email : ''}" placeholder="your@email.com" required>
                                    </div>
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="book-phone">Phone Number</label>
                                        <input type="tel" class="form-input" id="book-phone" value="${user ? (user.phone || '') : ''}" placeholder="+1 (555) 000-0000">
                                    </div>
                                </div>

                                <div class="booking-form-section-header mt-8">
                                    <span class="booking-form-section-number">3</span>
                                    <h3>Special Requests</h3>
                                </div>
                                <div class="booking-form-group">
                                    <label class="booking-form-label" for="book-requests">Any special requirements or preferences?</label>
                                    <textarea class="form-input booking-textarea" id="book-requests" rows="4" placeholder="Early check-in, extra pillows, dietary requirements..."></textarea>
                                </div>

                                <button id="btn-confirm-booking" class="btn btn-primary booking-submit-btn">
                                    <span class="booking-submit-icon">🔒</span>
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>

                        <!-- Summary Sidebar -->
                        <div class="booking-summary-section">
                            <div class="booking-summary-card">
                                <div class="booking-summary-header">
                                    <h3>Booking Summary</h3>
                                </div>
                                <div class="booking-summary-body">
                                    <div class="booking-summary-room">
                                        <div class="booking-summary-room-badge">${roomType.bedType}</div>
                                        <h4 class="booking-summary-room-name">${roomType.name}</h4>
                                        <p class="text-muted booking-summary-room-desc">${roomType.description}</p>
                                    </div>

                                    <div class="booking-summary-details">
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">📐 Room Size</span>
                                            <span>${roomType.size} sq ft</span>
                                        </div>
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">👥 Max Guests</span>
                                            <span>${roomType.maxGuests}</span>
                                        </div>
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">🛏️ Bed Type</span>
                                            <span>${roomType.bedType}</span>
                                        </div>
                                    </div>

                                    <div class="booking-summary-amenities">
                                        <p class="booking-summary-amenities-label">Amenities</p>
                                        <div class="booking-amenity-tags">${amenitiesList}</div>
                                    </div>

                                    <div class="booking-summary-pricing">
                                        <div class="booking-summary-price-row">
                                            <span>${Hotel.Utils.formatCurrency(roomType.basePrice)} × <span id="summary-nights">1</span> night(s)</span>
                                            <span id="summary-subtotal">${Hotel.Utils.formatCurrency(roomType.basePrice)}</span>
                                        </div>
                                        <div class="booking-summary-price-row">
                                            <span>Taxes &amp; Fees (12%)</span>
                                            <span id="summary-tax">${Hotel.Utils.formatCurrency(roomType.basePrice * 0.12)}</span>
                                        </div>
                                        <div class="booking-summary-divider"></div>
                                        <div class="booking-summary-total-row">
                                            <span>Total</span>
                                            <span id="summary-total" class="booking-summary-total-amount">${Hotel.Utils.formatCurrency(roomType.basePrice * 1.12)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="booking-guarantee-card">
                                <div class="booking-guarantee-item">
                                    <span>✓</span> Free cancellation up to 48 hours before check-in
                                </div>
                                <div class="booking-guarantee-item">
                                    <span>✓</span> Best price guarantee
                                </div>
                                <div class="booking-guarantee-item">
                                    <span>✓</span> Secure SSL encrypted booking
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    mount: (params) => {
        const roomType = Hotel.Store.getRoomTypeById(params.id);
        if (!roomType) return;

        const checkinInput = document.getElementById('book-checkin');
        const checkoutInput = document.getElementById('book-checkout');
        const guestsSelect = document.getElementById('book-guests');
        const dateError = document.getElementById('booking-date-error');
        const nightsEl = document.getElementById('summary-nights');
        const subtotalEl = document.getElementById('summary-subtotal');
        const taxEl = document.getElementById('summary-tax');
        const totalEl = document.getElementById('summary-total');

        function calculateNights(checkIn, checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diff = (end - start) / (1000 * 60 * 60 * 24);
            return Math.max(0, Math.round(diff));
        }

        function updatePricing() {
            const checkIn = checkinInput.value;
            const checkOut = checkoutInput.value;
            const nights = calculateNights(checkIn, checkOut);

            if (nights <= 0) {
                dateError.textContent = 'Check-out must be after check-in date.';
                dateError.style.display = 'block';
                nightsEl.textContent = '0';
                subtotalEl.textContent = Hotel.Utils.formatCurrency(0);
                taxEl.textContent = Hotel.Utils.formatCurrency(0);
                totalEl.textContent = Hotel.Utils.formatCurrency(0);
                return;
            }

            dateError.style.display = 'none';
            const subtotal = nights * roomType.basePrice;
            const tax = subtotal * 0.12;
            const total = subtotal + tax;

            nightsEl.textContent = nights;
            subtotalEl.textContent = Hotel.Utils.formatCurrency(subtotal);
            taxEl.textContent = Hotel.Utils.formatCurrency(tax);
            totalEl.textContent = Hotel.Utils.formatCurrency(total);
        }

        // Keep checkout min in sync
        checkinInput.addEventListener('change', function() {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.min = nextDay.toISOString().split('T')[0];
            if (checkoutInput.value <= this.value) {
                checkoutInput.value = nextDay.toISOString().split('T')[0];
            }
            updatePricing();
        });
        checkoutInput.addEventListener('change', updatePricing);

        // Initial pricing calculation
        updatePricing();

        // Submit handler
        const btn = document.getElementById('btn-confirm-booking');
        if (btn) {
            btn.addEventListener('click', () => {
                const checkIn = checkinInput.value;
                const checkOut = checkoutInput.value;
                const guests = parseInt(guestsSelect.value);
                const name = document.getElementById('book-name').value.trim();
                const email = document.getElementById('book-email').value.trim();
                const phone = document.getElementById('book-phone').value.trim();
                const specialRequests = document.getElementById('book-requests').value.trim();

                // Validation
                if (!checkIn || !checkOut) {
                    Hotel.Utils.showNotification('Please select check-in and check-out dates.', 'error');
                    return;
                }

                const nights = calculateNights(checkIn, checkOut);
                if (nights <= 0) {
                    Hotel.Utils.showNotification('Check-out date must be after check-in date.', 'error');
                    return;
                }

                const today = new Date().toISOString().split('T')[0];
                if (checkIn < today) {
                    Hotel.Utils.showNotification('Check-in date cannot be in the past.', 'error');
                    return;
                }

                if (!name) {
                    Hotel.Utils.showNotification('Please enter your full name.', 'error');
                    return;
                }
                if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    Hotel.Utils.showNotification('Please enter a valid email address.', 'error');
                    return;
                }

                // Check availability
                const isAvailable = Hotel.Store.isRoomAvailable(roomType.id, checkIn, checkOut);
                if (!isAvailable) {
                    Hotel.Utils.showNotification('Sorry, no rooms of this type are available for the selected dates. Please try different dates.', 'error');
                    return;
                }

                // Get specific room
                const room = Hotel.Store.getAvailableRoomForType(roomType.id, checkIn, checkOut);
                if (!room) {
                    Hotel.Utils.showNotification('Unable to assign a room. Please try again.', 'error');
                    return;
                }

                const user = Hotel.Auth.getCurrentUser();
                const subtotal = nights * roomType.basePrice;
                const tax = subtotal * 0.12;
                const totalPrice = subtotal + tax;

                // Create booking
                const booking = Hotel.Store.createBooking({
                    userId: user.id,
                    roomId: room.id,
                    roomTypeId: roomType.id,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    guests: guests,
                    guestName: name,
                    guestEmail: email,
                    guestPhone: phone,
                    specialRequests: specialRequests,
                    totalPrice: totalPrice,
                    subtotal: subtotal,
                    tax: tax,
                    nights: nights,
                    status: 'confirmed',
                    createdAt: new Date().toISOString()
                });

                // Set room status to occupied
                const data = Hotel.Store.getData();
                const roomToUpdate = data.rooms.find(r => r.id === room.id);
                if (roomToUpdate) {
                    roomToUpdate.status = 'occupied';
                    Hotel.Store.saveData(data);
                }

                Hotel.Utils.showNotification('Reservation confirmed! Proceeding to payment...', 'success');
                setTimeout(() => {
                    window.location.hash = '#/payment/' + booking.id;
                }, 1200);
            });
        }
    }
};
