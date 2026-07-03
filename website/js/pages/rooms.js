window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Rooms = {
    render: async () => {
        const roomTypes = Hotel.Store.getRoomTypes();
        
        const roomCards = roomTypes.map(rt => `
            <div class="card room-card mb-4 flex flex-col md:flex-row">
                <div class="room-img-placeholder flex-1"></div>
                <div class="card-body flex-2">
                    <div class="flex flex-between align-center mb-2">
                        <h3>${rt.name}</h3>
                        <span class="price">${Hotel.Utils.formatCurrency(rt.basePrice)}/night</span>
                    </div>
                    <p class="text-muted mb-4">${rt.description}</p>
                    <div class="room-meta flex gap-4 text-sm text-secondary mb-4">
                        <span>👥 Up to ${rt.maxGuests} guests</span>
                        <span>🛏️ ${rt.bedType}</span>
                        <span>📐 ${rt.size} sqft</span>
                    </div>
                    <div class="flex gap-2">
                        <a href="#/rooms/${rt.id}" class="btn btn-outline">View Details</a>
                        <a href="#/booking/${rt.id}" class="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="container py-8">
                <h1 class="text-center mb-8">Our Rooms & Suites</h1>
                <div class="grid" style="grid-template-columns: 1fr 3fr;">
                    <aside class="filters card p-4">
                        <h3>Filters</h3>
                        <div class="mt-4">
                            <label class="form-label">Price Range</label>
                            <input type="range" class="w-full">
                        </div>
                    </aside>
                    <main class="room-list">
                        ${roomCards}
                    </main>
                </div>
            </div>
        `;
    }
};
