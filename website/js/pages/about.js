window.Hotel = window.Hotel || {};
window.Hotel.Pages = window.Hotel.Pages || {};

Hotel.Pages.About = {
    render: async () => {
        const hotel = Hotel.Store.getData().hotel;
        const amenitiesHtml = hotel.amenities.map(am => {
            const icons = {
                'Free WiFi': '📶',
                'Infinity Pool': '🏊',
                'Luxury Spa': '🧖',
                'Gourmet Restaurant': '🍽️',
                'Private Beach': '🏖️'
            };
            const icon = icons[am] || '✨';
            return `
            <div class="amenity-feature-card animate-fadeInUp">
                <div class="amenity-feature-icon">${icon}</div>
                <h4>${am}</h4>
                <p>Experience the finest ${am.toLowerCase()} curated for your ultimate relaxation.</p>
            </div>
            `;
        }).join('');

        return `
            <div class="page-hero animate-fadeIn">
                <div class="page-hero-content">
                    <h1 class="page-hero-title">About ${hotel.name}</h1>
                    <div class="page-hero-divider"></div>
                    <p class="page-hero-subtitle">${hotel.description}</p>
                </div>
            </div>

            <section class="page-section container">
                <div class="story-section">
                    <div class="story-image animate-fadeIn"></div>
                    <div class="story-text animate-fadeInUp">
                        <h3>Our Legacy of Luxury</h3>
                        <div class="section-accent-line" style="margin: 1rem 0;"></div>
                        <p>Founded on the pristine shores of the Azure Coast, Grand Azure Hotel & Resort was born from a singular vision: to create a sanctuary where modern luxury seamlessly blends with the untamed beauty of the Mediterranean.</p>
                        <p>For over two decades, we have defined the standard of premium hospitality. Every corner of our property has been meticulously designed to inspire awe and offer absolute comfort, ensuring that every stay is nothing short of extraordinary.</p>
                        <p>Our commitment extends beyond our walls. We pride ourselves on personalized, intuitive service that anticipates your needs, allowing you to truly disconnect and immerse yourself in the moment.</p>
                    </div>
                </div>
            </section>

            <section class="page-section alt-bg">
                <div class="container">
                    <div class="section-header animate-fadeInUp">
                        <h2>World-Class Amenities</h2>
                        <div class="section-accent-line"></div>
                        <p>Indulge in our carefully curated selection of amenities designed to elevate your stay to new heights of luxury and convenience.</p>
                    </div>
                    <div class="grid grid-3 gap-8">
                        ${amenitiesHtml}
                    </div>
                </div>
            </section>

            <section class="page-section container">
                <div class="section-header animate-fadeInUp">
                    <h2>Meet Our Leadership</h2>
                    <div class="section-accent-line"></div>
                    <p>The visionaries and experts dedicated to making your experience unforgettable.</p>
                </div>
                <div class="grid grid-4 gap-4">
                    <div class="team-card animate-fadeInUp" style="animation-delay: 0.1s">
                        <div class="team-card-avatar">👨‍💼</div>
                        <div class="team-card-body">
                            <div class="team-card-title">General Manager</div>
                            <h4>Alex Sterling</h4>
                            <p class="team-card-bio">With 20 years in luxury hospitality across three continents.</p>
                        </div>
                    </div>
                    <div class="team-card animate-fadeInUp" style="animation-delay: 0.2s">
                        <div class="team-card-avatar">👨‍🍳</div>
                        <div class="team-card-body">
                            <div class="team-card-title">Head Chef</div>
                            <h4>Marcus Chen</h4>
                            <p class="team-card-bio">Michelin-starred culinary artist bringing global flavors to our coast.</p>
                        </div>
                    </div>
                    <div class="team-card animate-fadeInUp" style="animation-delay: 0.3s">
                        <div class="team-card-avatar">👩‍⚕️</div>
                        <div class="team-card-body">
                            <div class="team-card-title">Spa Director</div>
                            <h4>Elena Rossi</h4>
                            <p class="team-card-bio">Holistic wellness expert pioneering our signature treatments.</p>
                        </div>
                    </div>
                    <div class="team-card animate-fadeInUp" style="animation-delay: 0.4s">
                        <div class="team-card-avatar">🎩</div>
                        <div class="team-card-body">
                            <div class="team-card-title">Chief Concierge</div>
                            <h4>David Wright</h4>
                            <p class="team-card-bio">Your personal key to the hidden gems of the Azure Coast.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="page-section alt-bg">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card animate-fadeInUp">
                            <div class="stat-number">2005</div>
                            <div class="stat-label">Year Founded</div>
                        </div>
                        <div class="stat-card animate-fadeInUp" style="animation-delay: 0.1s">
                            <div class="stat-number">142</div>
                            <div class="stat-label">Luxury Rooms</div>
                        </div>
                        <div class="stat-card animate-fadeInUp" style="animation-delay: 0.2s">
                            <div class="stat-number">350+</div>
                            <div class="stat-label">Dedicated Staff</div>
                        </div>
                        <div class="stat-card animate-fadeInUp" style="animation-delay: 0.3s">
                            <div class="stat-number">99.8%</div>
                            <div class="stat-label">Guest Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    mount: () => {}
};
