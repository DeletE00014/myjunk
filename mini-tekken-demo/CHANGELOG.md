# CHANGELOG.md

## [1.0.0] - 2026-07-23

### Added
- Created complete single-file 3D 1-v-1 fighting game demo (`index.html`).
- Integrated Three.js r165 via UNPKG CDN import modules.
- Built stylized procedural humanoid fighter 3D models with animated body parts (head, torso, limbs, stance, punch extension).
- Implemented dual player control system:
  - **Player 1**: `KeyA` (Left), `KeyD` (Right), `KeyW` (Jump), `KeyS` (Punch)
  - **Player 2**: `ArrowLeft` (Left), `ArrowRight` (Right), `ArrowDown` (Jump), `ArrowUp` (Punch)
- Implemented real-time distance and facing-direction hit detection.
- Added procedural Web Audio API synthesizer SFX for punch, hit, jump, and KO events.
- Added visual particle spark burst on hit, emissive red flash on hit, dynamic camera midpoint tracking with screen shake on heavy impact.
- Added responsive HTML arcade HUD with animated HP bars, hit combo popups, and KO Rematch screen overlay.
- Added project deliverables: `RESEARCH.md`, `PLAN.md`, `TASK.md`, `ARCHITECTURE.md`, and `CHANGELOG.md`.
