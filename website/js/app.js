// App Initialization and Routing setup
window.addEventListener('DOMContentLoaded', () => {
    // Init UI (header/footer)
    Hotel.UI.init();

    // Define routes
    Hotel.Router.addRoute('/', Hotel.Pages.Home.render, { pageNamespace: 'Home', title: 'Home' });
    Hotel.Router.addRoute('/rooms', Hotel.Pages.Rooms.render, { pageNamespace: 'Rooms', title: 'Rooms' });
    Hotel.Router.addRoute('/rooms/:id', Hotel.Pages.RoomDetail.render, { pageNamespace: 'RoomDetail', title: 'Room Detail' });
    Hotel.Router.addRoute('/booking/:id', Hotel.Pages.Booking.render, { pageNamespace: 'Booking', title: 'Booking', requiresAuth: true });
    Hotel.Router.addRoute('/login', Hotel.Pages.Login.render, { pageNamespace: 'Login', title: 'Login' });
    Hotel.Router.addRoute('/register', Hotel.Pages.Register.render, { pageNamespace: 'Register', title: 'Register' });
    Hotel.Router.addRoute('/about', Hotel.Pages.About.render, { pageNamespace: 'About', title: 'About Us' });

    // Start router
    Hotel.Router.init();
});
