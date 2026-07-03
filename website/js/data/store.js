window.Hotel = window.Hotel || {};

Hotel.Store = (function() {
    const STORE_KEY = 'grand_azure_data';

    // Initial Data Seed
    const seedData = {
        hotel: {
            name: "Grand Azure Hotel & Resort",
            address: "123 Azure Coast, Riviera 4500",
            phone: "+1 (555) 123-4567",
            email: "info@grandazure.com",
            description: "Experience unparalleled luxury where the sky meets the sea.",
            rating: 5,
            amenities: ["Free WiFi", "Infinity Pool", "Luxury Spa", "Gourmet Restaurant", "Private Beach"]
        },
        users: [
            { id: "u1", email: "admin@hotel.com", password: "123", role: "admin", name: "Admin User", phone: "555-0001" },
            { id: "u2", email: "reception@hotel.com", password: "123", role: "receptionist", name: "Jane Desk", phone: "555-0002" },
            { id: "u3", email: "guest@hotel.com", password: "123", role: "guest", name: "John Doe", phone: "555-0003" }
        ],
        roomTypes: [
            { id: "rt1", name: "Standard Room", description: "Comfortable room with essential amenities.", basePrice: 150, maxGuests: 2, size: 300, bedType: "Queen", amenities: ["WiFi", "TV", "Air Conditioning"], images: [] },
            { id: "rt2", name: "Deluxe Ocean View", description: "Spacious room with a beautiful view of the ocean.", basePrice: 250, maxGuests: 2, size: 450, bedType: "King", amenities: ["WiFi", "TV", "Air Conditioning", "Balcony", "Mini Bar"], images: [] },
            { id: "rt3", name: "Executive Suite", description: "Luxury suite featuring a separate living area.", basePrice: 450, maxGuests: 4, size: 700, bedType: "King + Sofa Bed", amenities: ["WiFi", "TV", "Air Conditioning", "Balcony", "Mini Bar", "Lounge Access"], images: [] }
        ],
        rooms: [
            { id: "r101", roomTypeId: "rt1", number: "101", floor: 1, status: "available" },
            { id: "r102", roomTypeId: "rt1", number: "102", floor: 1, status: "available" },
            { id: "r201", roomTypeId: "rt2", number: "201", floor: 2, status: "available" },
            { id: "r202", roomTypeId: "rt2", number: "202", floor: 2, status: "occupied" },
            { id: "r301", roomTypeId: "rt3", number: "301", floor: 3, status: "available" }
        ],
        bookings: [
            { id: "b1", userId: "u3", roomId: "r202", roomTypeId: "rt2", checkIn: "2026-07-01", checkOut: "2026-07-05", status: "checked-in", guests: 2, totalPrice: 1000 }
        ],
        reviews: [
            { id: "rev1", userId: "u3", userName: "John Doe", rating: 5, text: "Amazing stay! The ocean view was breathtaking.", date: "2026-06-15" }
        ],
        payments: []
    };

    function init() {
        if (!localStorage.getItem(STORE_KEY)) {
            localStorage.setItem(STORE_KEY, JSON.stringify(seedData));
        } else {
            // Ensure payments array exists in existing data
            const data = getData();
            if (!data.payments) {
                data.payments = [];
                saveData(data);
            }
        }
    }

    function getData() {
        return JSON.parse(localStorage.getItem(STORE_KEY)) || seedData;
    }

    function saveData(data) {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
    }

    function generateId(prefix = 'id') {
        return prefix + '_' + Math.random().toString(36).substr(2, 9);
    }

    // API
    return {
        init,
        getData,
        saveData,
        generateId,
        
        getRoomTypes: () => getData().roomTypes,
        getRoomTypeById: (id) => getData().roomTypes.find(rt => rt.id === id),
        
        getRooms: () => getData().rooms,
        getAvailableRooms: (checkIn, checkOut, guests) => {
            // Simplified availability check for now
            const data = getData();
            return data.roomTypes.filter(rt => rt.maxGuests >= guests).map(rt => {
                const availableCount = data.rooms.filter(r => r.roomTypeId === rt.id && r.status === 'available').length;
                return { ...rt, availableCount };
            }).filter(rt => rt.availableCount > 0);
        },

        isRoomAvailable: (roomTypeId, checkIn, checkOut) => {
            const data = getData();
            const roomsOfType = data.rooms.filter(r => r.roomTypeId === roomTypeId);
            // Check if at least one room of this type has no overlapping confirmed/checked-in booking
            return roomsOfType.some(room => {
                const hasOverlap = data.bookings.some(b =>
                    b.roomId === room.id &&
                    (b.status === 'confirmed' || b.status === 'checked-in') &&
                    b.checkIn < checkOut &&
                    b.checkOut > checkIn
                );
                return !hasOverlap;
            });
        },

        getAvailableRoomForType: (roomTypeId, checkIn, checkOut) => {
            const data = getData();
            const roomsOfType = data.rooms.filter(r => r.roomTypeId === roomTypeId);
            return roomsOfType.find(room => {
                const hasOverlap = data.bookings.some(b =>
                    b.roomId === room.id &&
                    (b.status === 'confirmed' || b.status === 'checked-in') &&
                    b.checkIn < checkOut &&
                    b.checkOut > checkIn
                );
                return !hasOverlap;
            }) || null;
        },

        createBooking: (booking) => {
            const data = getData();
            booking.id = generateId('b');
            data.bookings.push(booking);
            saveData(data);
            return booking;
        },
        
        getUserBookings: (userId) => {
            return getData().bookings.filter(b => b.userId === userId);
        },

        getBookingById: (id) => {
            return getData().bookings.find(b => b.id === id) || null;
        },

        cancelBooking: (bookingId) => {
            const data = getData();
            const booking = data.bookings.find(b => b.id === bookingId);
            if (!booking) return null;
            booking.status = 'cancelled';
            // Set the room status back to available
            const room = data.rooms.find(r => r.id === booking.roomId);
            if (room) {
                room.status = 'available';
            }
            saveData(data);
            return booking;
        },

        createPayment: (payment) => {
            const data = getData();
            if (!data.payments) data.payments = [];
            payment.id = generateId('pay');
            data.payments.push(payment);
            saveData(data);
            return payment;
        },

        getPaymentByBookingId: (bookingId) => {
            const data = getData();
            if (!data.payments) return null;
            return data.payments.find(p => p.bookingId === bookingId) || null;
        }
    };
})();

// Initialize store on load
Hotel.Store.init();
