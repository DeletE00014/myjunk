window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.Login = {
    render: async () => {
        return `
            <div class="container py-8" style="max-width: 400px;">
                <div class="card p-8">
                    <h2 class="text-center mb-4">Login</h2>
                    <form id="login-form">
                        <div class="mb-4">
                            <label>Email</label>
                            <input type="email" id="login-email" class="w-full form-input" style="width:100%; padding:8px" required>
                        </div>
                        <div class="mb-4">
                            <label>Password</label>
                            <input type="password" id="login-password" class="w-full form-input" style="width:100%; padding:8px" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-full" style="width:100%;">Login</button>
                    </form>
                    <p class="text-center mt-4">Don't have an account? <a href="#/register">Register</a></p>
                </div>
            </div>
        `;
    },
    mount: () => {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const pass = document.getElementById('login-password').value;
                const result = Hotel.Auth.login(email, pass);
                if (result.success) {
                    Hotel.Utils.showNotification('Logged in successfully', 'success');
                    window.location.hash = '#/';
                    window.location.reload();
                } else {
                    Hotel.Utils.showNotification(result.message, 'error');
                }
            });
        }
    }
};

Hotel.Pages.Register = {
    render: async () => {
        return `
            <div class="container py-8" style="max-width: 400px;">
                <div class="card p-8">
                    <h2 class="text-center mb-4">Register</h2>
                    <form id="register-form">
                        <div class="mb-4">
                            <label>Name</label>
                            <input type="text" id="reg-name" class="w-full form-input" style="width:100%; padding:8px" required>
                        </div>
                        <div class="mb-4">
                            <label>Email</label>
                            <input type="email" id="reg-email" class="w-full form-input" style="width:100%; padding:8px" required>
                        </div>
                        <div class="mb-4">
                            <label>Password</label>
                            <input type="password" id="reg-password" class="w-full form-input" style="width:100%; padding:8px" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-full" style="width:100%;">Register</button>
                    </form>
                    <p class="text-center mt-4">Already have an account? <a href="#/login">Login</a></p>
                </div>
            </div>
        `;
    },
    mount: () => {
        const form = document.getElementById('register-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reg-name').value;
                const email = document.getElementById('reg-email').value;
                const password = document.getElementById('reg-password').value;
                const result = Hotel.Auth.register({ name, email, password });
                if (result.success) {
                    Hotel.Utils.showNotification('Registration successful! Please log in.', 'success');
                    window.location.hash = '#/login';
                } else {
                    Hotel.Utils.showNotification(result.message, 'error');
                }
            });
        }
    }
};
