window.Hotel = window.Hotel || {};

Hotel.Utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    formatDate: (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        }).format(date);
    },

    generateStarRating: (rating) => {
        let stars = '';
        for(let i=1; i<=5; i++) {
            if (i <= rating) {
                stars += `<span style="color:var(--accent)">★</span>`;
            } else {
                stars += `<span style="color:var(--text-muted)">☆</span>`;
            }
        }
        return stars;
    },

    showNotification: (message, type = 'info') => {
        const container = document.getElementById('notification-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerText = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};
