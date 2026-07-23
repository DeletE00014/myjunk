# RESEARCH.md

## Problem Statement
The user requested a single-file HTML + JavaScript 3D 1-v-1 fighting game demo (similar to Tekken) using Three.js loaded via CDN. The demo needs to be functional, interactive, visually appealing, and include full features such as movement, jumping, punching, health tracking, win/loss conditions, restart capability, and polished feedback.

## Requirements & Features
1. **Core Gameplay**:
   - 2 Players: Player 1 (A/D move, W jump, S punch) and Player 2 (Arrow keys ←/→ move, ↓ jump, ↑ punch).
   - Collision/Punch detection based on distance and facing direction.
   - HP bars updated dynamically with damage animations.
   - Knockback physics and hit flashes/particles.
   - Game over state (KO screen) with restart button / keypress.
2. **Visuals & Aesthetics**:
   - WebGL 3D rendering with Three.js.
   - Styled arena/floor with grid textures, lighting, shadows, and background atmosphere.
   - Articulated / stylized 3D fighter mesh or detailed models (head, torso, limbs, stance animations for idle, punch, jump, hit reaction).
   - Dynamic camera tracking the midpoint between both fighters.
   - Modern UI overlay (retro arcade style health bars, player titles, win message).

## Tech Stack & CDN Dependencies
- HTML5 / CSS3 / JavaScript (ES Modules)
- `three.module.js` (Three.js r165 via unpkg/cdnjs)

## Tradeoffs & Considerations
- **Single-file requirement**: All HTML, CSS, JavaScript, textures (canvas-generated), and 3D mesh building are self-contained within `index.html`.
- **Pure Code 3D Models**: Using procedural Three.js hierarchy (body parts) so no external 3D asset downloads are required, guaranteeing offline/instant CDN reliability.
