# RESEARCH.md - Dagupan Tourist Attraction Website

## Executive Summary
Dagupan City, known as the "Bangus Capital of the Philippines", is a key economic and cultural hub in Pangasinan. This research outlines the domain, user needs, architectural choices, and risk mitigations for the Dagupan Tourist Attraction Web Application.

## Key Attraction Categories & Data Inventory
1. **Beaches & Parks**: Tondaligan People's Park, Bonuan Blue Beach, Pugaro Island.
2. **Cultural & Historical Landmarks**: Dagupan Metropolitan Cathedral, MacArthur Landing Marker, Plaza Nidal.
3. **Eco-Tourism & Adventures**: Dawel River Cruise, Ciudad Elmina Fishing Resort.
4. **Culinary & Seafood Spots**: Matutina's Seafood, Silverio's Restaurant, Dagupeña Heritage Dining.
5. **Festivals & Events**: Annual Bangus Festival (April), Kalutan ed Dalan, Gilon! Gilon! Cultural Parade.

## User Personas & Core Needs
- **First-time Tourists**: Need instant visual preview, curated top 10 lists, map routes, budget estimates, and operating hours.
- **Foodies & Culinary Seekers**: Look for authentic local dining (Boneless Bangus, Pigar-Pigar, Kaleskes), price ranges, and reviews.
- **Family & Itinerary Planners**: Require a day-by-day travel builder, printable/exportable itineraries, and family-friendly filters.
- **City Administrators**: Require secure admin access to manage attractions, publish announcements, view visitor analytics, and schedule cultural events.

## Technical Architecture & Design Principles
- **Design Aesthetic**: Glassmorphism aesthetic, ultra-sleek dark/light theme, modern typography (Outfit & Inter), micro-animations, dynamic cards, responsive layout.
- **Backend Architecture**: Node.js REST API with full endpoints for Attractions CRUD, User Bookmarks, Travel Itinerary planning, Interactive Reviews, AI Travel Assistant simulation, and Admin Analytics.
- **Frontend Stack**: SPA architecture with modular component rendering, reactive state management, interactive map canvas/SVG renderer, smart search/filtering engine, PDF/Share export module.

## Risks & Mitigations
- *Risk*: Dependency overhead or missing npm packages in restrictive environments.
- *Mitigation*: Standalone zero-external-dependency Node.js server using standard libraries, paired with high-performance browser modules and client-side reactive rendering.
