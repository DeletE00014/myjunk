# PLAN.md

## Execution Strategy
Build a feature-rich, high-performance, single-file 3D 1-v-1 fighting game demo (`index.html`) using Three.js.

### Phase 1: Setup & Documentation
- Write standard deliverable documents: `RESEARCH.md`, `PLAN.md`, `TASK.md`, `ARCHITECTURE.md`.

### Phase 2: HTML & UI Overlay Architecture
- Build arcade style HUD overlay with responsive health bars, player names (P1 vs P2), hit combo counters, and KO overlay modal with restart button.
- Clean CSS styling with glassmorphism, neon glow accents, and responsive layout.

### Phase 3: 3D Scene & Character Models
- Set up Three.js scene, perspective camera, ambient & directional lighting, soft shadows.
- Build procedural 3D fighter character models (humanoid rigged with torso, head, shoulders, arms, legs) so punches and jump/hit stances look animated.
- Create procedural arena stage with neon ring, ground grid texture, background dust particles.

### Phase 4: Physics, Movement & Combat Engine
- Implement keyboard listener system supporting simultaneous key holds for smooth 60fps controls.
- Player 1: A/D (move left/right), W (jump), S (punch), shift (block/heavy attack).
- Player 2: Arrow Left/Right (move), Arrow Up (jump), Arrow Down (punch).
- Hitbox detection, facing orientation check, knockback velocity impulse, hit flash emissive material response, and visual spark particles.
- Win condition check (HP <= 0), freeze game controls, display KO overlay with instant restart button.

### Phase 5: Verification & Testing
- Test local execution using python HTTP server or direct file opening.
- Verify controls, graphics rendering, camera smooth tracking, and game restart functionality.
- Write `CHANGELOG.md`.
