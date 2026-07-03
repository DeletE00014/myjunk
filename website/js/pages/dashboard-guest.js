window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.DashboardGuest = {
    render: async () => {
        const user = Hotel.Auth.getCurrentUser();
        if (!user) return '<p>Please log in.</p>';

        const bookings = Hotel.Store.getUserBookings(user.id);
        const totalBookings = bookings.length;
        const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
        const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

        const statusBadge = (status) => {
            const label = status.replace('-', ' ');
            const cls = `badge-${status}`;
            return `<span class="badge ${cls}">${label}</span>`;
        };

        const bookingRows = bookings.length > 0 ? bookings.map(b => {
            const rt = Hotel.Store.getRoomTypeById(b.roomTypeId);
            const rtName = rt ? rt.name : 'N/A';
            let actions = '';
            if (b.status === 'confirmed') {
                actions = `<button class="btn btn-danger btn-sm cancel-booking-btn" data-id="${b.id}">Cancel</button>`;
            } else if (b.status === 'checked-out') {
                actions = `<button class="btn btn-ghost btn-sm" disabled>Review</button>`;
            } else {
                actions = `<span class="cell-sub">—</span>`;
            }
            return `
                <tr>
                    <td><span class="guest-name">${b.id}</span></td>
                    <td>${rtName}</td>
                    <td>${Hotel.Utils.formatDate(b.checkIn)}</td>
                    <td>${Hotel.Utils.formatDate(b.checkOut)}</td>
                    <td>${statusBadge(b.status)}</td>
                    <td>${Hotel.Utils.formatCurrency(b.totalPrice)}</td>
                    <td class="table-actions">${actions}</td>
                </tr>`;
        }).join('') : '';

        return `
        <div class="dashboard animate-fadeIn">
            <aside class="dashboard-sidebar" id="guest-sidebar">
                <div class="sidebar-profile">
                    <div class="sidebar-avatar">${initial}</div>
                    <div>
                        <div class="sidebar-name">${user.name}</div>
                        <div class="sidebar-role">Guest</div>
                    </div>
                </div>
                <button class="sidebar-toggle" id="sidebar-toggle-btn">
                    <span>Menu</span><span>☰</span>
                </button>
                <ul class="sidebar-nav" id="sidebar-nav-list">
                    <li><a href="#" class="active dash-nav-link" data-tab="bookings"><span class="nav-icon">📋</span> My Bookings</a></li>
                    <li><a href="#" class="dash-nav-link" data-tab="profile"><span class="nav-icon">👤</span> Profile</a></li>
                    <div class="sidebar-section-label">Quick Links</div>
                    <li><a href="#/rooms"><span class="nav-icon">🏨</span> Browse Rooms</a></li>
                    <li><a href="#/" ><span class="nav-icon">🏠</span> Home</a></li>
                </ul>
            </aside>

            <main class="dashboard-main">
                <div class="dashboard-header">
                    <h1>Welcome back, ${user.name.split(' ')[0]}</h1>
                    <p>Manage your reservations and account details</p>
                </div>

                <!-- Stat Cards -->
                <div class="stat-cards">
                    <div class="stat-card stat-card--primary">
                        <div class="stat-card-icon">📋</div>
                        <div class="stat-card-value">${totalBookings}</div>
                        <div class="stat-card-label">Total Bookings</div>
                    </div>
                    <div class="stat-card stat-card--success">
                        <div class="stat-card-icon">✅</div>
                        <div class="stat-card-value">${activeBookings}</div>
                        <div class="stat-card-label">Active Bookings</div>
                    </div>
                    <div class="stat-card stat-card--accent">
                        <div class="stat-card-icon">💰</div>
                        <div class="stat-card-value">${Hotel.Utils.formatCurrency(totalSpent)}</div>
                        <div class="stat-card-label">Total Spent</div>
                    </div>
                </div>

                <!-- Tab Content Areas -->
                <div id="tab-bookings" class="dash-tab-content active">
                    <div class="dash-section">
                        <div class="dash-section-header">
                            <div class="dash-section-title">📋 My Bookings</div>
                        </div>
                        <div class="dash-section-body">
                            ${bookings.length > 0 ? `
                            <div class="dash-table-wrapper">
                                <table class="dash-table" id="guest-bookings-table">
                                    <thead>
                                        <tr>
                                            <th>Booking ID</th>
                                            <th>Room Type</th>
                                            <th>Check-in</th>
                                            <th>Check-out</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${bookingRows}
                                    </tbody>
                                </table>
                            </div>` : `
                            <div class="empty-state">
                                <div class="empty-state-icon">🛏️</div>
                                <h3>No bookings yet</h3>
                                <p>Browse our rooms and book your perfect stay!</p>
                                <a href="#/rooms" class="btn btn-primary">Browse Rooms</a>
                            </div>`}
                        </div>
                    </div>
                </div>

                <div id="tab-profile" class="dash-tab-content">
                    <div class="dash-section profile-card">
                        <div class="profile-header">
                            <div class="profile-avatar-lg">${initial}</div>
                            <div class="profile-info">
                                <h2>${user.name}</h2>
                                <span class="profile-role-badge">Guest Account</span>
                            </div>
                        </div>
                        <form class="profile-form" id="profile-form">
                            <div class="form-group">
                                <label for="profile-name">Full Name</label>
                                <input type="text" id="profile-name" value="${user.name}" required>
                            </div>
                            <div class="form-group">
                                <label for="profile-email">Email Address</label>
                                <input type="email" id="profile-email" value="${user.email}" readonly>
                            </div>
                            <div class="form-group">
                                <label for="profile-phone">Phone Number</label>
                                <input type="tel" id="profile-phone" value="${user.phone || ''}" placeholder="Enter phone number">
                            </div>
                            <button type="submit" class="btn btn-primary" id="save-profile-btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>`;
    },

    mount: () => {
        // Sidebar toggle (mobile)
        const toggleBtn = document.getElementById('sidebar-toggle-btn');
        const navList = document.getElementById('sidebar-nav-list');
        if (toggleBtn && navList) {
            toggleBtn.addEventListener('click', () => {
                navList.classList.toggle('show');
            });
        }

        // Tab navigation
        document.querySelectorAll('.dash-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.currentTarget.dataset.tab;
                if (!tab) return;

                document.querySelectorAll('.dash-nav-link').forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');

                document.querySelectorAll('.dash-tab-content').forEach(tc => tc.classList.remove('active'));
                const target = document.getElementById('tab-' + tab);
                if (target) target.classList.add('active');
            });
        });

        // Cancel booking
        document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookingId = btn.dataset.id;
                if (!confirm('Are you sure you want to cancel this booking?')) return;

                const data = Hotel.Store.getData();
                const booking = data.bookings.find(b => b.id === bookingId);
                if (booking) {
                    booking.status = 'cancelled';
                    // Release the room back to available
                    const room = data.rooms.find(r => r.id === booking.roomId);
                    if (room && room.status === 'occupied') {
                        room.status = 'available';
                    }
                    Hotel.Store.saveData(data);
                    Hotel.Utils.showNotification('Booking cancelled successfully', 'success');
                    // Re-render page
                    if (Hotel.Router && Hotel.Router.navigate) {
                        Hotel.Router.navigate('/dashboard');
                    } else {
                        window.location.hash = '#/dashboard';
                    }
                }
            });
        });

        // Profile form save
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const user = Hotel.Auth.getCurrentUser();
                if (!user) return;

                const newName = document.getElementById('profile-name').value.trim();
                const newPhone = document.getElementById('profile-phone').value.trim();

                if (!newName) {
                    Hotel.Utils.showNotification('Name is required', 'error');
                    return;
                }

                const data = Hotel.Store.getData();
                const userRecord = data.users.find(u => u.id === user.id);
                if (userRecord) {
                    userRecord.name = newName;
                    userRecord.phone = newPhone;
                    Hotel.Store.saveData(data);

                    // Update session
                    const updatedSession = { ...user, name: newName, phone: newPhone };
                    sessionStorage.setItem('grand_azure_current_user', JSON.stringify(updatedSession));

                    Hotel.Utils.showNotification('Profile updated successfully', 'success');
                    // Re-render to reflect name change in sidebar
                    if (Hotel.Router && Hotel.Router.navigate) {
                        Hotel.Router.navigate('/dashboard');
                    } else {
                        window.location.hash = '#/dashboard';
                    }
                }
            });
        }
    }
};
