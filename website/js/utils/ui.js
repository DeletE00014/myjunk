window.Hotel = window.Hotel || {};

Hotel.UI = {
    renderHeader: () => {
        const user = Hotel.Auth.getCurrentUser();
        let authLinks = '';
        if (user) {
            authLinks = `<a href="#/profile">Profile</a> <a href="#" id="logout-btn">Logout</a>`;
        } else {
            authLinks = `<a href="#/login">Login</a> <a href="#/register" class="btn btn-primary btn-sm">Register</a>`;
        }

        return `
            <header class="site-header">
                <div class="container flex flex-between align-center">
                    <a href="#/" class="logo">Grand Azure</a>
                    <nav class="main-nav">
                        <a href="#/">Home</a>
                        <a href="#/rooms">Rooms</a>
                        <a href="#/about">About</a>
                        ${authLinks}
                    </nav>
                </div>
            </header>
        `;
    },

    renderFooter: () => {
        return `
            <footer class="site-footer">
                <div class="container">
                    <p>&copy; 2026 Grand Azure Hotel & Resort. All rights reserved.</p>
                </div>
            </footer>
        `;
    },

    init: () => {
        const headerContainer = document.getElementById('app-header');
        const footerContainer = document.getElementById('app-footer');
        
        if (headerContainer) headerContainer.innerHTML = Hotel.UI.renderHeader();
        if (footerContainer) footerContainer.innerHTML = Hotel.UI.renderFooter();

        // Event delegation for logout
        document.body.addEventListener('click', (e) => {
            if (e.target.id === 'logout-btn') {
                e.preventDefault();
                Hotel.Auth.logout();
                window.location.hash = '#/';
                window.location.reload(); // naive reload to refresh header
            }
        });
    }
};
