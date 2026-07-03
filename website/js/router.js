window.Hotel = window.Hotel || {};

Hotel.Router = (function() {
    const routes = {};
    let currentRoute = null;

    function addRoute(path, componentLoader, options = {}) {
        routes[path] = { componentLoader, ...options };
    }

    async function navigate(path) {
        let routePath = path.split('?')[0]; // simple path extraction
        let params = {};
        
        // Very basic dynamic route matching for /rooms/:id etc.
        let matchedRoute = routes[routePath];
        if (!matchedRoute) {
             for (let key in routes) {
                 if (key.includes(':')) {
                     const routeParts = key.split('/');
                     const pathParts = routePath.split('/');
                     if (routeParts.length === pathParts.length && routeParts[1] === pathParts[1]) {
                         params.id = pathParts[2];
                         matchedRoute = routes[key];
                         break;
                     }
                 }
             }
        }

        const route = matchedRoute || routes['/404'] || routes['/'];
        
        if (route.requiresAuth && !Hotel.Auth.isAuthenticated()) {
            window.location.hash = '#/login';
            return;
        }

        if (route.requiredRole && !Hotel.Auth.hasRole(route.requiredRole)) {
            window.location.hash = '#/';
            return;
        }

        currentRoute = route;
        if (route.title) {
            document.title = `${route.title} - Grand Azure`;
        }

        const contentElement = document.getElementById('app-content');
        contentElement.innerHTML = await route.componentLoader(params);
        
        // Trigger mount event if the component supports it
        const pageNamespace = route.pageNamespace;
        if (pageNamespace && Hotel.Pages[pageNamespace] && Hotel.Pages[pageNamespace].mount) {
            setTimeout(() => Hotel.Pages[pageNamespace].mount(params), 0);
        }
    }

    function init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '/';
            navigate(path);
        });

        // initial load
        const path = window.location.hash.slice(1) || '/';
        navigate(path);
    }

    return {
        addRoute,
        init,
        navigate
    };
})();
