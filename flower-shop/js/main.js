/* -------------------------------------------------
   main.js – Handles navigation toggle & simple cart
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    /*--- NAVIGATION TOGGLE (Mobile) ---*/
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu   = document.querySelector('.main-nav ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    /*--- SIMPLE CART (demo only) ---*/
    const cart = [];

    function addToCart(id) {
        cart.push(id);
        alert(`Added item #${id} to cart. (Demo – no backend)`);
        console.log('Cart contents:', cart);
    }

    // Attach click listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            addToCart(id);
        });
    });

    /*--- Footer Year (auto‑update) ---*/
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});