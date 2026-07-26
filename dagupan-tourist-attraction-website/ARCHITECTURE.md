# ARCHITECTURE.md - System Architecture Documentation

## System Architecture Overview

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  |  Hero & Search    |  | Attraction Grid   |  | Travel Itinerary Planner      |  |
|  |  Component        |  | & Glass Cards     |  | & AI Recommender Component    |  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
|  | Interactive Map   |  | Admin Dashboard   |  | State Manager & LocalStorage  |  |
|  | Overlay Component |  | & Analytics       |  | Data Synchronization          |  |
|  +-------------------+  +-------------------+  +-------------------------------+  |
+------------------------------------------+----------------------------------------+
                                           | HTTP / REST API
                                           v
+-----------------------------------------------------------------------------------+
|                                  SERVER LAYER                                     |
|                                                                                   |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  | Static File      |  | REST API Router   |  | Authentication & Token         |  |
|  | HTTP Web Server  |  | Endpoint Handler  |  | Management (Admin JWT Sim)     |  |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  +------------------+  +-------------------+  +--------------------------------+  |
|  | In-Memory DB &   |  | Recommendation    |  | Visitor Analytics &            |  |
|  | JSON Store       |  | Engine Algorithm  |  | Announcement Service           |  |
|  +------------------+  +-------------------+  +--------------------------------+  |
+-----------------------------------------------------------------------------------+
```

## Component Breakdown

1. **Frontend App (`public/app.js`)**:
   - Single Page Architecture built with vanilla ES6+ module pattern for zero build step dependencies and blazing speed.
   - Dynamic DOM Renderer with virtual state diffing.
   - Glassmorphism Design System CSS custom properties.
   - Interactive Canvas/SVG Location Map viewer.

2. **Backend API Server (`server.js`)**:
   - Native Node.js HTTP Server operating on port 3000 (configurable via `PORT` environment variable).
   - Serves static assets from `public/` folder.
   - Rest API Endpoints:
     - `GET /api/attractions` - Query attractions with filters (category, query, budget, sorting).
     - `GET /api/attractions/:id` - Fetch detailed record.
     - `POST /api/attractions` - Create attraction (Admin).
     - `PUT /api/attractions/:id` - Update attraction (Admin).
     - `DELETE /api/attractions/:id` - Remove attraction (Admin).
     - `POST /api/reviews` - Add review.
     - `POST /api/ai-recommend` - Generate AI recommendations.
     - `POST /api/auth/login` - Admin authentication token generation.
     - `GET /api/admin/analytics` - System analytics & visitor statistics.

3. **Data Schemas**:
   - `Attraction`: `{ id, name, category, location, rating, priceRange, budgetCategory, image, description, hours, entranceFee, coordinates, tags, reviews, nearby }`
   - `Itinerary`: `{ id, title, days: [{ dayNumber, attractionIds, notes }] }`
   - `Review`: `{ id, attractionId, author, rating, date, comment }`
