const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Initial Dagupan Attractions Dataset
let attractions = [
  {
    id: "attr-1",
    name: "Tondaligan People's Park & Boardwalk",
    category: "Beaches",
    location: "Bonuan Tondaligan, Dagupan City",
    rating: 4.9,
    reviewsCount: 342,
    budgetCategory: "Free",
    priceRange: "Free Entrance",
    image: "/assets/tondaligan_park.jpg",
    description: "Dagupan's premier oceanfront park featuring a 1.5km scenic boardwalk, lush coconut palms, bicycle lanes, street food hubs, and breathtaking sunsets over the Lingayen Gulf.",
    hours: "Open 24/7 (Best visited 4:00 PM - 8:00 PM)",
    entranceFee: "Free",
    coordinates: { lat: 16.0825, lng: 120.3458 },
    tags: ["Beach", "Boardwalk", "Sunset", "Family", "Bicycle Path", "Seafood Stalls"],
    highlights: ["Sunset Bay View", "Bicycle Rental Hub", "Modern Promenade", "Night Food Bazaar"],
    nearby: ["Bonuan Blue Beach", "Dawel River Cruise", "Matutina's Seafood"],
    reviews: [
      { id: "r1", author: "Maria Santos", rating: 5, date: "2026-06-15", comment: "The boardwalk sunset is majestic! Crisp ocean breeze and delicious local grilled bangus nearby." },
      { id: "r2", author: "James Wilson", rating: 5, date: "2026-05-20", comment: "Super clean park with great paths for jogging and cycling. A must-visit in Pangasinan." }
    ]
  },
  {
    id: "attr-2",
    name: "Dawel River Eco-Cruise",
    category: "Eco-Tourism",
    location: "Dawel River, Dagupan City",
    rating: 4.8,
    reviewsCount: 189,
    budgetCategory: "Budget",
    priceRange: "₱150 - ₱300 per head",
    image: "/assets/dawel_river.jpg",
    description: "An eco-friendly boat cruise sailing down the serene Dawel River. Experience dense mangrove sanctuaries, observe traditional milkfish (bangus) floating cages, and spot migratory birds.",
    hours: "8:00 AM - 5:00 PM Daily",
    entranceFee: "₱150 Boat Fee",
    coordinates: { lat: 16.0542, lng: 120.3521 },
    tags: ["Eco-Tour", "River Cruise", "Mangroves", "Bangus Pens", "Nature"],
    highlights: ["Mangrove Sanctuary Passage", "Live Milkfish Harvesting Demo", "Bird Watching", "Floating Gazebos"],
    nearby: ["Tondaligan Boardwalk", "Silverio's Seafood Grill"],
    reviews: [
      { id: "r3", author: "Carlito Cruz", rating: 5, date: "2026-04-10", comment: "Calm and peaceful river ride! Learning how Dagupan bangus are cultivated was so eye-opening." }
    ]
  },
  {
    id: "attr-3",
    name: "Dagupan Bangus Festival",
    category: "Festivals",
    location: "AB Fernandez Ave & Citywide",
    rating: 5.0,
    reviewsCount: 520,
    budgetCategory: "Free",
    priceRange: "Free Admission",
    image: "/assets/bangus_festival.jpg",
    description: "The world-famous annual summer festival celebrating Dagupan as the Bangus Capital of the World! Highlights include the Gilon! Gilon! street dance, Kalutan ed Dalan (longest grill line), and seafood feasts.",
    hours: "Annual event (April 16 to April 30)",
    entranceFee: "Free",
    coordinates: { lat: 16.0433, lng: 120.3381 },
    tags: ["Festival", "Street Dance", "Seafood Festival", "Culture", "Live Concerts"],
    highlights: ["Guinness World Record Grill Line", "Street Dancing Competition", "100+ Bangus Cooking Showcase", "Fireworks Night"],
    nearby: ["Metropolitan Cathedral", "Plaza Nidal"],
    reviews: [
      { id: "r4", author: "Elena Reyes", rating: 5, date: "2026-04-28", comment: "Unbelievable energy! Seeing miles of bangus grilling in the streets is a core memory!" }
    ]
  },
  {
    id: "attr-4",
    name: "Dagupan Metropolitan Cathedral",
    category: "Landmarks",
    location: "AB Fernandez Ave, Dagupan City",
    rating: 4.7,
    reviewsCount: 145,
    budgetCategory: "Free",
    priceRange: "Free",
    image: "/assets/hero_banner.jpg",
    description: "The Parish of St. John the Evangelist is the seat of the Roman Catholic Archdiocese of Lingayen-Dagupan. A historic sanctuary with beautiful stained glass and serene architecture.",
    hours: "5:00 AM - 7:00 PM Daily",
    entranceFee: "Free",
    coordinates: { lat: 16.0428, lng: 120.3370 },
    tags: ["Historical", "Church", "Architecture", "Spiritual", "Heritage"],
    highlights: ["Stained Glass Altars", "Historic Bell Tower", "Peaceful Courtyard"],
    nearby: ["Plaza Nidal", "City Hall Park"],
    reviews: [
      { id: "r5", author: "Francis Ramos", rating: 4, date: "2026-03-12", comment: "So peaceful and historical right in the center of the city." }
    ]
  },
  {
    id: "attr-5",
    name: "Matutina's Seafood Restaurant",
    category: "Restaurants",
    location: "De Venecia Expressway, Dagupan City",
    rating: 4.9,
    reviewsCount: 410,
    budgetCategory: "Moderate",
    priceRange: "₱350 - ₱800",
    image: "/assets/tondaligan_park.jpg",
    description: "Dagupan's premier culinary institution famous for authentic Boneless Grilled Bangus, Buttered Garlic Shrimp, Seafood Sinigang, and Pigar-Pigar.",
    hours: "10:00 AM - 10:00 PM Daily",
    entranceFee: "Menu priced",
    coordinates: { lat: 16.0390, lng: 120.3290 },
    tags: ["Seafood", "Dining", "Dagupan Bangus", "Pigar-Pigar", "Family Restaurant"],
    highlights: ["Award-winning Grilled Bangus", "Fresh Catch Display", "Spacious Air-conditioned Dining"],
    nearby: ["Dawel River Cruise", "Tondaligan Park"],
    reviews: [
      { id: "r6", author: "Chef Antonio", rating: 5, date: "2026-05-01", comment: "Best milkfish I have ever tasted! Sweet, oily belly with perfect smokiness." }
    ]
  },
  {
    id: "attr-6",
    name: "Bonuan Blue Beach (MacArthur Landing)",
    category: "Beaches",
    location: "Bonuan Gueset, Dagupan City",
    rating: 4.6,
    reviewsCount: 168,
    budgetCategory: "Free",
    priceRange: "Free",
    image: "/assets/tondaligan_park.jpg",
    description: "A historic beach landing site where General Douglas MacArthur's Allied forces landed in January 1945 during WWII. Features open beach huts and ocean views.",
    hours: "Open 24/7",
    entranceFee: "Free",
    coordinates: { lat: 16.0860, lng: 120.3550 },
    tags: ["Beach", "WWII History", "MacArthur", "Open Shore"],
    highlights: ["Historical WWII Shrine", "Sandy Shoreline", "Seafood Nipa Huts"],
    nearby: ["Tondaligan Boardwalk"],
    reviews: [
      { id: "r7", author: "HistoryBuff_PH", rating: 5, date: "2026-02-18", comment: "Great blend of World War II historical significance and relaxing seaside breeze." }
    ]
  },
  {
    id: "attr-7",
    name: "Ciudad Elmina Fishing Resort",
    category: "Hotels",
    location: "Bacayao Sur, Dagupan City",
    rating: 4.7,
    reviewsCount: 112,
    budgetCategory: "Luxury",
    priceRange: "₱900 - ₱3,200",
    image: "/assets/dawel_river.jpg",
    description: "A tranquil resort sanctuary with private fishponds, floating bamboo cottages, swimming pools, and overnight accommodations in lush tropical gardens.",
    hours: "Check-in 2:00 PM / Day Tour 8:00 AM - 6:00 PM",
    entranceFee: "₱200 Day Pass / Rooms ₱2,500+",
    coordinates: { lat: 16.0250, lng: 120.3320 },
    tags: ["Resort", "Fishing", "Pools", "Overnight", "Floating Cottage"],
    highlights: ["Catch & Cook Fishing", "Floating Gazebos", "Lagoon Swimming Pool"],
    nearby: ["Matutina's Seafood"],
    reviews: [
      { id: "r8", author: "Patricia Fernandez", rating: 4, date: "2026-05-14", comment: "My kids loved catching tilapia and bangus straight from the pond and having it cooked right away!" }
    ]
  },
  {
    id: "attr-8",
    name: "Silverio's Seafood Grill",
    category: "Restaurants",
    location: "Arellano Street, Dagupan City",
    rating: 4.8,
    reviewsCount: 230,
    budgetCategory: "Moderate",
    priceRange: "₱250 - ₱650",
    image: "/assets/bangus_festival.jpg",
    description: "Renowned for traditional Pangasinan comfort food: Crispy Fried Bangus belly, Kaleskes (beef entrails stew), Sizzling Gambas, and Grilled Calamari.",
    hours: "10:30 AM - 9:30 PM Daily",
    entranceFee: "Menu priced",
    coordinates: { lat: 16.0460, lng: 120.3410 },
    tags: ["Seafood", "Local Food", "Kaleskes", "Sizzling Dishes"],
    highlights: ["Sizzling Bangus Sisig", "Traditional Kaleskes Bowl", "Cold Craft Beer"],
    nearby: ["Metropolitan Cathedral"],
    reviews: [
      { id: "r9", author: "Mark Aquino", rating: 5, date: "2026-06-02", comment: "The Sizzling Bangus Sisig is out of this world!" }
    ]
  },
  {
    id: "attr-9",
    name: "Pugaro Island Beach & Mangrove Reserve",
    category: "Beaches",
    location: "Barangay Pugaro, Dagupan City",
    rating: 4.8,
    reviewsCount: 94,
    budgetCategory: "Budget",
    priceRange: "₱100 - ₱400",
    image: "/assets/tondaligan_park.jpg",
    description: "An untouched island beach destination accessible via short motorboat ride across the river mouth. Fine grey-white sand, quiet fishing village vibe, and pristine mangroves.",
    hours: "6:00 AM - 5:00 PM Daily",
    entranceFee: "₱50 Boat fare + ₱30 Environmental Fee",
    coordinates: { lat: 16.0910, lng: 120.3210 },
    tags: ["Island", "Hidden Gem", "Beach", "Boat Ride", "Mangroves"],
    highlights: ["Secluded Shoreline", "Authentic Fishing Village", "Kayaking"],
    nearby: ["Tondaligan Park"],
    reviews: [
      { id: "r10", author: "Lia D.", rating: 5, date: "2026-06-18", comment: "A hidden gem! Perfect if you want to escape crowds and enjoy untouched coastal nature." }
    ]
  },
  {
    id: "attr-10",
    name: "Plaza Nidal & Andres Bonifacio Park",
    category: "Landmarks",
    location: "Perez Blvd, Dagupan City",
    rating: 4.5,
    reviewsCount: 88,
    budgetCategory: "Free",
    priceRange: "Free",
    image: "/assets/hero_banner.jpg",
    description: "Central civic plaza surrounded by heritage trees, public seating, historical monuments, and nearby street food hawkers.",
    hours: "Open 24/7",
    entranceFee: "Free",
    coordinates: { lat: 16.0440, lng: 120.3365 },
    tags: ["Civic Plaza", "Landmark", "Park", "Historical Monument"],
    highlights: ["Heritage Monuments", "Shaded Trees", "Central City Walk"],
    nearby: ["Metropolitan Cathedral", "Silverio's Seafood Grill"],
    reviews: [
      { id: "r11", author: "Ben G.", rating: 4, date: "2026-01-20", comment: "Nice spot to rest after exploring downtown Dagupan." }
    ]
  }
];

let announcements = [
  { id: "ann-1", title: "Bangus Festival 2026 Grand Opening!", date: "2026-04-15", content: "Join us for the 2026 Dagupan Bangus Festival starting April 16th with over 100 grilling booths along AB Fernandez Avenue!", category: "Festival" },
  { id: "ann-2", title: "New Sunset Bicycle Rental Hub at Tondaligan Boardwalk", date: "2026-05-10", content: "Visitors can now rent eco-bicycles at Tondaligan Beach Park from 5:00 AM to 8:00 PM daily.", category: "Feature" }
];

let analyticsData = {
  totalVisitors: 48920,
  monthlyActiveTourists: 12450,
  popularAttraction: "Tondaligan People's Park & Boardwalk",
  categoryBreakdown: {
    "Beaches": 42,
    "Restaurants": 28,
    "Eco-Tourism": 15,
    "Landmarks": 10,
    "Festivals": 5
  }
};

let userItineraries = [];

// Helper functions
function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function serveStaticFile(req, res, filePath) {
  let ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2'
  };

  let contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 Server Error: ${err.code}</h1>`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // --- API ROUTES ---

  // GET /api/attractions
  if (pathname === '/api/attractions' && method === 'GET') {
    let result = [...attractions];
    const cat = parsedUrl.query.cat;
    const q = parsedUrl.query.q;
    const budget = parsedUrl.query.budget;
    const sort = parsedUrl.query.sort;

    if (cat && cat !== 'All') {
      result = result.filter(a => a.category.toLowerCase() === cat.toLowerCase());
    }
    if (budget && budget !== 'All') {
      result = result.filter(a => a.budgetCategory.toLowerCase() === budget.toLowerCase());
    }
    if (q) {
      const term = q.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term) ||
        a.tags.some(t => t.toLowerCase().includes(term)) ||
        a.location.toLowerCase().includes(term)
      );
    }
    if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popularity') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sendJSON(res, { success: true, count: result.length, data: result });
  }

  // GET /api/attractions/:id
  if (pathname.startsWith('/api/attractions/') && method === 'GET') {
    const id = pathname.split('/')[3];
    const item = attractions.find(a => a.id === id);
    if (item) {
      return sendJSON(res, { success: true, data: item });
    } else {
      return sendJSON(res, { success: false, error: 'Attraction not found' }, 404);
    }
  }

  // POST /api/attractions (Admin CRUD)
  if (pathname === '/api/attractions' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      const newAttr = {
        id: 'attr-' + (attractions.length + 1) + '-' + Date.now(),
        name: body.name || 'New Attraction',
        category: body.category || 'Beaches',
        location: body.location || 'Dagupan City',
        rating: 5.0,
        reviewsCount: 1,
        budgetCategory: body.budgetCategory || 'Free',
        priceRange: body.priceRange || 'Free',
        image: body.image || '/assets/tondaligan_park.jpg',
        description: body.description || 'Wonderful attraction in Dagupan City.',
        hours: body.hours || '8:00 AM - 5:00 PM',
        entranceFee: body.entranceFee || 'Free',
        coordinates: body.coordinates || { lat: 16.0433, lng: 120.3381 },
        tags: body.tags || ["New", "Dagupan"],
        highlights: body.highlights || ["Great spot"],
        nearby: body.nearby || ["Tondaligan Park"],
        reviews: []
      };
      attractions.unshift(newAttr);
      return sendJSON(res, { success: true, message: 'Attraction created', data: newAttr }, 201);
    } catch (e) {
      return sendJSON(res, { success: false, error: 'Invalid JSON' }, 400);
    }
  }

  // PUT /api/attractions/:id
  if (pathname.startsWith('/api/attractions/') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const index = attractions.findIndex(a => a.id === id);
    if (index !== -1) {
      try {
        const body = await parseJSONBody(req);
        attractions[index] = { ...attractions[index], ...body };
        return sendJSON(res, { success: true, message: 'Attraction updated', data: attractions[index] });
      } catch (e) {
        return sendJSON(res, { success: false, error: 'Invalid payload' }, 400);
      }
    } else {
      return sendJSON(res, { success: false, error: 'Attraction not found' }, 404);
    }
  }

  // DELETE /api/attractions/:id
  if (pathname.startsWith('/api/attractions/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const index = attractions.findIndex(a => a.id === id);
    if (index !== -1) {
      const removed = attractions.splice(index, 1);
      return sendJSON(res, { success: true, message: 'Attraction deleted', data: removed[0] });
    } else {
      return sendJSON(res, { success: false, error: 'Attraction not found' }, 404);
    }
  }

  // POST /api/reviews
  if (pathname === '/api/reviews' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      const { attractionId, author, rating, comment } = body;
      const target = attractions.find(a => a.id === attractionId);
      if (target) {
        const newReview = {
          id: 'r-' + Date.now(),
          author: author || 'Anonymous Tourist',
          rating: Number(rating) || 5,
          date: new Date().toISOString().split('T')[0],
          comment: comment || 'Great experience!'
        };
        target.reviews.unshift(newReview);
        // Recalculate average rating
        const totalRating = target.reviews.reduce((acc, r) => acc + r.rating, 0);
        target.rating = Number((totalRating / target.reviews.length).toFixed(1));
        target.reviewsCount = target.reviews.length;
        return sendJSON(res, { success: true, message: 'Review added', review: newReview, updatedAttraction: target });
      } else {
        return sendJSON(res, { success: false, error: 'Attraction not found' }, 404);
      }
    } catch (e) {
      return sendJSON(res, { success: false, error: 'Invalid payload' }, 400);
    }
  }

  // POST /api/ai-recommend
  if (pathname === '/api/ai-recommend' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      const { interests = [], budget = 'Any', duration = '1 Day', travelGroup = 'Solo' } = body;

      // Smart matching logic
      let matched = [...attractions];
      if (interests.length > 0) {
        matched = matched.filter(a =>
          interests.some(i => a.category.toLowerCase().includes(i.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(i.toLowerCase())))
        );
      }
      if (matched.length < 3) {
        matched = attractions; // Fallback to all attractions if filter is too narrow
      }

      // Sort by rating & popularity
      matched.sort((a, b) => b.rating - a.rating);
      const topPicks = matched.slice(0, 4);

      let summaryText = `Based on your request for a ${duration} ${travelGroup.toLowerCase()} trip centered on ${interests.join(', ') || 'general sightseeing'}, we strongly recommend beginning at ${topPicks[0]?.name || 'Tondaligan Park'}. `;
      if (interests.includes('Restaurants') || interests.includes('Food')) {
        summaryText += `Don't miss sampling world-famous Dagupan Bangus at Matutina's or Silverio's!`;
      } else {
        summaryText += `Complement your experience with a Dawel River Eco-Cruise and sunset walk along Tondaligan Promenade.`;
      }

      return sendJSON(res, {
        success: true,
        summary: summaryText,
        recommended: topPicks,
        suggestedItinerary: [
          { time: "08:30 AM", title: "Breakfast & Morning Walk", spot: topPicks[0]?.name || "Metropolitan Cathedral" },
          { time: "11:30 AM", title: "Seafood Feast", spot: "Matutina's Seafood Restaurant" },
          { time: "02:30 PM", title: "Eco Adventure", spot: topPicks[1]?.name || "Dawel River Cruise" },
          { time: "05:30 PM", title: "Golden Sunset & Night Stroll", spot: "Tondaligan People's Park & Boardwalk" }
        ]
      });
    } catch (e) {
      return sendJSON(res, { success: false, error: 'Recommendation failed' }, 500);
    }
  }

  // GET /api/announcements
  if (pathname === '/api/announcements' && method === 'GET') {
    return sendJSON(res, { success: true, data: announcements });
  }

  // POST /api/announcements (Admin)
  if (pathname === '/api/announcements' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      const newAnn = {
        id: 'ann-' + Date.now(),
        title: body.title || 'Notice',
        date: new Date().toISOString().split('T')[0],
        content: body.content || '',
        category: body.category || 'General'
      };
      announcements.unshift(newAnn);
      return sendJSON(res, { success: true, data: newAnn });
    } catch (e) {
      return sendJSON(res, { success: false, error: 'Invalid payload' }, 400);
    }
  }

  // GET /api/admin/analytics
  if (pathname === '/api/admin/analytics' && method === 'GET') {
    return sendJSON(res, { success: true, data: analyticsData });
  }

  // POST /api/auth/login
  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      if (body.username === 'admin' && body.password === 'dagupan2026') {
        return sendJSON(res, {
          success: true,
          token: 'jwt-token-dagupan-admin-sec-' + Date.now(),
          user: { name: 'Dagupan Tourism Admin', role: 'administrator' }
        });
      } else {
        return sendJSON(res, { success: false, error: 'Invalid admin credentials' }, 401);
      }
    } catch (e) {
      return sendJSON(res, { success: false, error: 'Invalid payload' }, 400);
    }
  }

  // --- STATIC FILE SERVING ---
  let requestedPath = pathname === '/' ? '/index.html' : pathname;
  let fullPath = path.join(PUBLIC_DIR, requestedPath);

  // Security check: ensure path is within PUBLIC_DIR
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    return res.end('<h1>403 Forbidden</h1>');
  }

  serveStaticFile(req, res, fullPath);
});

server.listen(PORT, () => {
  console.log(` Dagupan Tourist Attraction Web Server running at http://localhost:${PORT}`);
});
