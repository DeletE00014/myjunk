window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.RoomDetail = {
    render: async (params) => {
        const roomType = Hotel.Store.getRoomTypeById(params.id);
        if (!roomType) return `<h1>Room not found</h1>`;

        return `
            <div class="container py-8">
                <a href="#/rooms" class="btn btn-outline mb-4">&larr; Back to Rooms</a>
                <div class="grid grid-2">
                    <div>
                        <div class="room-img-placeholder mb-4" style="height:400px; border-radius:8px"></div>
                        <h1>${roomType.name}</h1>
                        <p class="text-muted mt-2">${roomType.description}</p>
                        <h3 class="mt-8 mb-4">Amenities</h3>
                        <ul class="grid grid-2">
                            ${roomType.amenities.map(a => `<li>✓ ${a}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <div class="card p-4 sticky" style="top: 100px;">
                            <h3>Book this Room</h3>
                            <div class="price mt-4 mb-4 text-center">
                                ${Hotel.Utils.formatCurrency(roomType.basePrice)} <small class="text-muted">/ night</small>
                            </div>
                            <a href="#/booking/${roomType.id}" class="btn btn-primary w-full" style="width: 100%; display:block;">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
