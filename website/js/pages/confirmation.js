window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Confirmation = {
    render: async (params) => {
        const booking = Hotel.Store.getBookingById(params.id);
        if (!booking) return `<div class="container py-8 text-center"><h1>Booking Not Found</h1><p class="text-muted mt-4">We could not locate this booking.</p><a href="#/" class="btn btn-primary mt-4">Return Home</a></div>`;

        const roomType = Hotel.Store.getRoomTypeById(booking.roomTypeId);
        const payment = Hotel.Store.getPaymentByBookingId(booking.id);
        const roomTypeName = roomType ? roomType.name : 'Room';

        const paymentMethodLabel = payment
            ? (payment.method === 'credit_card' ? 'Credit Card' : 'PayPal')
            : 'Pending';

        const paymentStatusClass = payment && payment.status === 'completed' ? 'success' : 'warning';
        const paymentStatusLabel = payment && payment.status === 'completed' ? 'Paid' : 'Pending';

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
                        <div class="booking-step completed">
                            <div class="booking-step-circle">✓</div>
                            <span class="booking-step-label">Payment</span>
                        </div>
                        <div class="booking-step-line completed"></div>
                        <div class="booking-step active">
                            <div class="booking-step-circle">3</div>
                            <span class="booking-step-label">Confirmation</span>
                        </div>
                    </div>
                </div>

                <div class="container py-8">
                    <div class="confirmation-container">
                        <!-- Success Animation -->
                        <div class="confirmation-success-section animate-fadeInUp">
                            <div class="confirmation-checkmark-circle">
                                <svg class="confirmation-checkmark-svg" viewBox="0 0 52 52">
                                    <circle class="confirmation-checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                                    <path class="confirmation-checkmark-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                            </div>
                            <h1 class="confirmation-title">Booking Confirmed!</h1>
                            <p class="confirmation-subtitle">Thank you for choosing Grand Azure Hotel & Resort. We look forward to welcoming you.</p>
                        </div>

                        <!-- Booking Details Card -->
                        <div class="confirmation-details-card animate-fadeInUp" style="animation-delay: 0.2s;">
                            <div class="confirmation-details-header">
                                <div>
                                    <p class="confirmation-label">Confirmation Number</p>
                                    <h2 class="confirmation-number">${booking.id.toUpperCase()}</h2>
                                </div>
                                <span class="status-badge status-${paymentStatusClass}">${paymentStatusLabel}</span>
                            </div>

                            <div class="confirmation-details-grid">
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">🏨</span>
                                    <div>
                                        <p class="confirmation-detail-label">Room Type</p>
                                        <p class="confirmation-detail-value">${roomTypeName}</p>
                                    </div>
                                </div>
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">📅</span>
                                    <div>
                                        <p class="confirmation-detail-label">Check-in</p>
                                        <p class="confirmation-detail-value">${Hotel.Utils.formatDate(booking.checkIn)}</p>
                                    </div>
                                </div>
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">📅</span>
                                    <div>
                                        <p class="confirmation-detail-label">Check-out</p>
                                        <p class="confirmation-detail-value">${Hotel.Utils.formatDate(booking.checkOut)}</p>
                                    </div>
                                </div>
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">👥</span>
                                    <div>
                                        <p class="confirmation-detail-label">Guests</p>
                                        <p class="confirmation-detail-value">${booking.guests} Guest${booking.guests > 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">🌙</span>
                                    <div>
                                        <p class="confirmation-detail-label">Duration</p>
                                        <p class="confirmation-detail-value">${booking.nights || 1} Night${(booking.nights || 1) > 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <div class="confirmation-detail-block">
                                    <span class="confirmation-detail-icon">💳</span>
                                    <div>
                                        <p class="confirmation-detail-label">Payment Method</p>
                                        <p class="confirmation-detail-value">${paymentMethodLabel}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="confirmation-total-bar">
                                <span>Total Paid</span>
                                <span class="confirmation-total-amount">${Hotel.Utils.formatCurrency(booking.totalPrice)}</span>
                            </div>
                        </div>

                        <!-- Hotel Info -->
                        <div class="confirmation-hotel-info animate-fadeInUp" style="animation-delay: 0.4s;">
                            <h3>What to Expect</h3>
                            <div class="confirmation-info-grid">
                                <div class="confirmation-info-item">
                                    <span class="confirmation-info-icon">📧</span>
                                    <p>A confirmation email has been sent to <strong>${booking.guestEmail || 'your email'}</strong></p>
                                </div>
                                <div class="confirmation-info-item">
                                    <span class="confirmation-info-icon">⏰</span>
                                    <p>Check-in begins at <strong>3:00 PM</strong> and check-out is by <strong>11:00 AM</strong></p>
                                </div>
                                <div class="confirmation-info-item">
                                    <span class="confirmation-info-icon">📞</span>
                                    <p>Need help? Contact us at <strong>+1 (555) 123-4567</strong></p>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Buttons -->
                        <div class="confirmation-actions animate-fadeInUp" style="animation-delay: 0.6s;">
                            <a href="#/" class="btn btn-outline confirmation-btn">
                                Return Home
                            </a>
                            <a href="#/rooms" class="btn btn-primary confirmation-btn">
                                Browse More Rooms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    mount: (params) => {
        // Trigger checkmark animation after a brief delay
        setTimeout(() => {
            const checkmark = document.querySelector('.confirmation-checkmark-circle');
            if (checkmark) {
                checkmark.classList.add('animate');
            }
        }, 300);
    }
};
