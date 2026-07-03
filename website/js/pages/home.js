window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Home = {
    render: async () => {
        const hotel = Hotel.Store.getData().hotel;
        const roomTypes = Hotel.Store.getRoomTypes().slice(0, 3); // Featured rooms
        const reviews = Hotel.Store.getData().reviews.slice(0, 3);

        const roomCards = roomTypes.map(rt => `
            <div class="card room-card animate-fadeInUp">
                <div class="room-img-placeholder"></div>
                <div class="card-body">
                    <h3>${rt.name}</h3>
                    <p class="price">${Hotel.Utils.formatCurrency(rt.basePrice)} / night</p>
                    <p>${Hotel.Utils.truncateText ? Hotel.Utils.truncateText(rt.description, 80) : rt.description}</p>
                    <div class="mt-4 flex flex-between">
                        <a href="#/rooms/${rt.id}" class="btn btn-outline">View Details</a>
                        <a href="#/booking/${rt.id}" class="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
        `).join('');

        const amenitiesHtml = hotel.amenities.map(am => `
            <div class="amenity-card card flex-center flex-col animate-fadeInUp">
                <div class="amenity-icon">★</div>
                <h4>${am}</h4>
            </div>
        `).join('');

        return `
            <div class="hero animate-fadeIn">
                <div class="hero-content text-center">
                    <h1 class="hero-title">${hotel.name}</h1>
                    <p class="hero-subtitle">Where Luxury Meets Tranquility</p>
                    <div class="search-bar card flex flex-between align-center">
                        <input type="date" id="search-checkin" title="Check-in Date">
                        <input type="date" id="search-checkout" title="Check-out Date">
                        <select id="search-guests">
                            <option value="1">1 Guest</option>
                            <option value="2" selected>2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                        <button class="btn btn-primary" id="btn-search">Search Availability</button>
                    </div>
                </div>
            </div>

            <section class="py-8 bg-secondary">
                <div class="container">
                    <h2 class="text-center mb-8">Our Finest Accommodations</h2>
                    <div class="grid grid-3">
                        ${roomCards}
                    </div>
                </div>
            </section>

            <section class="py-8">
                <div class="container">
                    <h2 class="text-center mb-8">World-Class Amenities</h2>
                    <div class="grid grid-4 gap-4">
                        ${amenitiesHtml}
                    </div>
                </div>
            </section>
        `;
    },
    mount: () => {
        const searchBtn = document.getElementById('btn-search');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const checkin = document.getElementById('search-checkin').value;
                const checkout = document.getElementById('search-checkout').value;
                const guests = document.getElementById('search-guests').value;
                window.location.hash = `#/search?checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
            });
        }
    }
};
