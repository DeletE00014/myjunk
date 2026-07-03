window.Hotel = window.Hotel || {};

Hotel.Auth = (function() {
    const CURRENT_USER_KEY = 'grand_azure_current_user';

    function login(email, password) {
        const users = Hotel.Store.getData().users;
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Don't store password in session
            const userSession = { ...user };
            delete userSession.password;
            sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
            return { success: true, user: userSession };
        }
        return { success: false, message: 'Invalid email or password' };
    }

    function logout() {
        sessionStorage.removeItem(CURRENT_USER_KEY);
    }

    function getCurrentUser() {
        const userJson = sessionStorage.getItem(CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    }

    function isAuthenticated() {
        return !!getCurrentUser();
    }

    function hasRole(role) {
        const user = getCurrentUser();
        return user && user.role === role;
    }

    function register(userData) {
        const data = Hotel.Store.getData();
        if (data.users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already exists' };
        }
        
        const newUser = {
            id: Hotel.Store.generateId('u'),
            ...userData,
            role: 'guest'
        };
        
        data.users.push(newUser);
        Hotel.Store.saveData(data);
        return { success: true };
    }

    return {
        login,
        logout,
        getCurrentUser,
        isAuthenticated,
        hasRole,
        register
    };
})();
