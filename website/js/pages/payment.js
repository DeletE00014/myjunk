window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Payment = {
    render: async (params) => {
        const booking = Hotel.Store.getBookingById(params.id);
        if (!booking) return `<div class="container py-8 text-center"><h1>Booking Not Found</h1><p class="text-muted mt-4">We could not find the requested booking.</p><a href="#/" class="btn btn-primary mt-4">Return Home</a></div>`;

        const roomType = Hotel.Store.getRoomTypeById(booking.roomTypeId);
        const roomTypeName = roomType ? roomType.name : 'Room';

        return `
            <div class="booking-page animate-fadeIn">
                <!-- Step Indicator -->
                <div class="booking-steps">
                    <div class="booking-steps-track">
                        <div class="booking-step completed">
                            <div class="booking-step-circle">✓</div>
                            <span class="booking-step-label">Details</span>
                        </div>
                        <div class="booking-step-line completed"></div>
                        <div class="booking-step active">
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
                        <!-- Payment Form -->
                        <div class="booking-form-section animate-fadeInUp">
                            <h1 class="booking-page-title">Secure Payment</h1>
                            <p class="text-secondary mb-8">Your payment information is encrypted and secure.</p>

                            <!-- Payment Method Tabs -->
                            <div class="payment-method-tabs">
                                <button class="payment-tab active" id="tab-credit-card" data-method="credit_card">
                                    <span class="payment-tab-icon">💳</span>
                                    Credit Card
                                </button>
                                <button class="payment-tab" id="tab-paypal" data-method="paypal">
                                    <span class="payment-tab-icon">🅿️</span>
                                    PayPal
                                </button>
                            </div>

                            <!-- Credit Card Form -->
                            <div class="payment-form-card" id="payment-credit-card">
                                <!-- Card Preview -->
                                <div class="credit-card-preview">
                                    <div class="credit-card-front">
                                        <div class="credit-card-chip"></div>
                                        <div class="credit-card-brand" id="card-brand-display">VISA</div>
                                        <div class="credit-card-number" id="card-number-display">•••• •••• •••• ••••</div>
                                        <div class="credit-card-bottom">
                                            <div class="credit-card-holder">
                                                <span class="credit-card-label">Card Holder</span>
                                                <span id="card-name-display">YOUR NAME</span>
                                            </div>
                                            <div class="credit-card-expiry-display">
                                                <span class="credit-card-label">Expires</span>
                                                <span id="card-expiry-display">MM/YY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="booking-form-group">
                                    <label class="booking-form-label" for="card-holder">Cardholder Name</label>
                                    <input type="text" class="form-input" id="card-holder" placeholder="Name as shown on card" autocomplete="cc-name">
                                </div>
                                <div class="booking-form-group">
                                    <label class="booking-form-label" for="card-number">Card Number</label>
                                    <div class="payment-input-wrapper">
                                        <input type="text" class="form-input" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric" autocomplete="cc-number">
                                        <span class="payment-input-icon" id="card-type-icon">💳</span>
                                    </div>
                                </div>
                                <div class="booking-form-grid">
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="card-expiry">Expiry Date</label>
                                        <input type="text" class="form-input" id="card-expiry" placeholder="MM/YY" maxlength="5" inputmode="numeric" autocomplete="cc-exp">
                                    </div>
                                    <div class="booking-form-group">
                                        <label class="booking-form-label" for="card-cvv">CVV</label>
                                        <div class="payment-input-wrapper">
                                            <input type="password" class="form-input" id="card-cvv" placeholder="•••" maxlength="3" inputmode="numeric" autocomplete="cc-csc">
                                            <span class="payment-input-icon">🔒</span>
                                        </div>
                                    </div>
                                </div>

                                <button id="btn-pay-card" class="btn btn-primary booking-submit-btn payment-submit-btn">
                                    <span class="booking-submit-icon">🔒</span>
                                    Pay ${Hotel.Utils.formatCurrency(booking.totalPrice)}
                                </button>
                            </div>

                            <!-- PayPal Form -->
                            <div class="payment-form-card" id="payment-paypal" style="display:none;">
                                <div class="paypal-section">
                                    <div class="paypal-logo">
                                        <span class="paypal-logo-text">Pay<strong>Pal</strong></span>
                                    </div>
                                    <p class="text-secondary text-center mt-4">Click the button below to securely complete your payment through PayPal.</p>
                                    <div class="booking-form-group mt-4">
                                        <label class="booking-form-label" for="paypal-email">PayPal Email</label>
                                        <input type="email" class="form-input" id="paypal-email" placeholder="your@paypal.com">
                                    </div>
                                    <button id="btn-pay-paypal" class="btn btn-primary booking-submit-btn payment-submit-btn paypal-btn">
                                        <span class="booking-submit-icon">🅿️</span>
                                        Pay with PayPal — ${Hotel.Utils.formatCurrency(booking.totalPrice)}
                                    </button>
                                </div>
                            </div>

                            <!-- Security Badge -->
                            <div class="payment-security-badge">
                                <span class="payment-security-icon">🛡️</span>
                                <div class="payment-security-text">
                                    <strong>256-bit SSL Encrypted</strong>
                                    <span>Your payment details are protected with bank-level security.</span>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary Sidebar -->
                        <div class="booking-summary-section">
                            <div class="booking-summary-card">
                                <div class="booking-summary-header">
                                    <h3>Order Summary</h3>
                                </div>
                                <div class="booking-summary-body">
                                    <div class="booking-summary-room">
                                        <h4 class="booking-summary-room-name">${roomTypeName}</h4>
                                        <span class="payment-booking-id">Booking #${booking.id}</span>
                                    </div>

                                    <div class="booking-summary-details">
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">📅 Check-in</span>
                                            <span>${Hotel.Utils.formatDate(booking.checkIn)}</span>
                                        </div>
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">📅 Check-out</span>
                                            <span>${Hotel.Utils.formatDate(booking.checkOut)}</span>
                                        </div>
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">🌙 Nights</span>
                                            <span>${booking.nights || 1}</span>
                                        </div>
                                        <div class="booking-summary-detail-row">
                                            <span class="text-secondary">👥 Guests</span>
                                            <span>${booking.guests}</span>
                                        </div>
                                    </div>

                                    <div class="booking-summary-pricing">
                                        <div class="booking-summary-price-row">
                                            <span>Subtotal</span>
                                            <span>${Hotel.Utils.formatCurrency(booking.subtotal || booking.totalPrice)}</span>
                                        </div>
                                        <div class="booking-summary-price-row">
                                            <span>Taxes &amp; Fees</span>
                                            <span>${Hotel.Utils.formatCurrency(booking.tax || 0)}</span>
                                        </div>
                                        <div class="booking-summary-divider"></div>
                                        <div class="booking-summary-total-row">
                                            <span>Total</span>
                                            <span class="booking-summary-total-amount">${Hotel.Utils.formatCurrency(booking.totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    mount: (params) => {
        const booking = Hotel.Store.getBookingById(params.id);
        if (!booking) return;

        // Tab switching
        const tabs = document.querySelectorAll('.payment-tab');
        const creditCardForm = document.getElementById('payment-credit-card');
        const paypalForm = document.getElementById('payment-paypal');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const method = tab.getAttribute('data-method');
                creditCardForm.style.display = method === 'credit_card' ? 'block' : 'none';
                paypalForm.style.display = method === 'paypal' ? 'block' : 'none';
            });
        });

        // Card number formatting (add space every 4 digits)
        const cardNumberInput = document.getElementById('card-number');
        const cardNumberDisplay = document.getElementById('card-number-display');
        const cardBrandDisplay = document.getElementById('card-brand-display');

        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.substring(0, 16);
            let formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.value = formatted;

            // Update card preview
            if (value.length > 0) {
                let display = formatted;
                while (display.replace(/\s/g, '').length < 16) {
                    display += '•';
                }
                // Format with spaces
                display = display.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                cardNumberDisplay.textContent = display;
            } else {
                cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            }

            // Detect card brand
            if (value.startsWith('4')) {
                cardBrandDisplay.textContent = 'VISA';
            } else if (value.startsWith('5') || value.startsWith('2')) {
                cardBrandDisplay.textContent = 'MASTERCARD';
            } else if (value.startsWith('3')) {
                cardBrandDisplay.textContent = 'AMEX';
            } else {
                cardBrandDisplay.textContent = 'VISA';
            }
        });

        // Expiry formatting
        const cardExpiryInput = document.getElementById('card-expiry');
        const cardExpiryDisplay = document.getElementById('card-expiry-display');

        cardExpiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
            cardExpiryDisplay.textContent = value || 'MM/YY';
        });

        // Cardholder name
        const cardHolderInput = document.getElementById('card-holder');
        const cardNameDisplay = document.getElementById('card-name-display');

        cardHolderInput.addEventListener('input', function() {
            cardNameDisplay.textContent = this.value.toUpperCase() || 'YOUR NAME';
        });

        // Validation helpers
        function validateCard() {
            const cardNumber = cardNumberInput.value.replace(/\s/g, '');
            const expiry = cardExpiryInput.value;
            const cvv = document.getElementById('card-cvv').value;
            const holder = cardHolderInput.value.trim();

            if (!holder) {
                Hotel.Utils.showNotification('Please enter the cardholder name.', 'error');
                return false;
            }
            if (cardNumber.length !== 16 || !/^\d{16}$/.test(cardNumber)) {
                Hotel.Utils.showNotification('Please enter a valid 16-digit card number.', 'error');
                return false;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                Hotel.Utils.showNotification('Please enter a valid expiry date (MM/YY).', 'error');
                return false;
            }
            // Validate expiry isn't in the past
            const [mm, yy] = expiry.split('/').map(Number);
            if (mm < 1 || mm > 12) {
                Hotel.Utils.showNotification('Invalid expiry month.', 'error');
                return false;
            }
            const now = new Date();
            const expiryDate = new Date(2000 + yy, mm);
            if (expiryDate <= now) {
                Hotel.Utils.showNotification('Card has expired. Please use a valid card.', 'error');
                return false;
            }
            if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
                Hotel.Utils.showNotification('Please enter a valid 3-digit CVV.', 'error');
                return false;
            }
            return true;
        }

        function processPayment(method) {
            // Disable button
            const btnId = method === 'credit_card' ? 'btn-pay-card' : 'btn-pay-paypal';
            const btn = document.getElementById(btnId);
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="payment-spinner"></span> Processing...';

            // Simulate payment processing
            setTimeout(() => {
                const payment = Hotel.Store.createPayment({
                    bookingId: booking.id,
                    method: method,
                    amount: booking.totalPrice,
                    status: 'completed',
                    date: new Date().toISOString()
                });

                Hotel.Utils.showNotification('Payment successful! Redirecting...', 'success');

                setTimeout(() => {
                    window.location.hash = '#/confirmation/' + booking.id;
                }, 1500);
            }, 2000);
        }

        // Credit card submit
        const btnPayCard = document.getElementById('btn-pay-card');
        if (btnPayCard) {
            btnPayCard.addEventListener('click', () => {
                if (validateCard()) {
                    processPayment('credit_card');
                }
            });
        }

        // PayPal submit
        const btnPayPaypal = document.getElementById('btn-pay-paypal');
        if (btnPayPaypal) {
            btnPayPaypal.addEventListener('click', () => {
                const paypalEmail = document.getElementById('paypal-email').value.trim();
                if (!paypalEmail || !/\S+@\S+\.\S+/.test(paypalEmail)) {
                    Hotel.Utils.showNotification('Please enter a valid PayPal email.', 'error');
                    return;
                }
                processPayment('paypal');
            });
        }
    }
};
