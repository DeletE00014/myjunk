# Mini-Tekken 3D 1v1 Fighting Demo

A self-contained HTML + JavaScript single-file 3D fighting game demo built with Three.js (loaded via CDN).

---

## 1. Research & Overview
- **Objective**: Create a responsive 3D 1-v-1 fighting demo inspired by Tekken without requiring any build step or local dependencies.
- **Tech Stack**: HTML5, Vanilla CSS3, WebGL / Three.js r165 (ES Modules via UNPKG), Web Audio API for synthesized SFX.
- **Key Features**:
  - Dual player support with customizable keyboard input configuration.
  - Procedural 3D humanoid character models with animated limbs (punches, jumps, walks).
  - Combat physics: real-time hit detection, facing direction evaluation, knockback, emissive hit reactions, camera impact shake, spark particle bursts.
  - Interactive Control Configuration modal allowing in-game key remapping.

---

## 2. Architecture & Design

### Component Layout
```
+-------------------------------------------------------------------+
|                            index.html                             |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                       DOM / CSS HUD                       |   |
|   | - Health Bars, Player Names & VS Badge                    |   |
|   | - Control Legend & "Config Controls" Settings Button      |   |
|   | - Interactive Key Remapping Settings Modal                |   |
|   | - KO Overlay Screen & Rematch Button                      |   |
|   +-----------------------------------------------------------+   |
|                                 |                                 |
|   +-----------------------------------------------------------+   |
|   |                   Three.js WebGL Engine                   |   |
|   | - Dynamic Camera Midpoint Tracking & Screen Shake         |   |
|   | - Cyber Arena Stage, Lighting, Ground Grid, Particle FX  |   |
|   +-----------------------------------------------------------+   |
|                                 |                                 |
|   +-----------------------------------------------------------+   |
|   |                 Game Engine & Config Control              |   |
|   | - CONFIG Object (Keybindings & Physics Parameters)        |   |
|   | - Dynamic Key Listener & In-Game Remap Event Handlers     |   |
|   | - Sound Synthesizer (Web Audio API)                       |   |
|   +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

---

## 3. Configurable Controls

### Default Control Mapping
| Action | Player 1 (Cyber Blue) | Player 2 (Neon Red) |
| :--- | :--- | :--- |
| **Move Left** | `A` (`KeyA`) | `←` (`ArrowLeft`) |
| **Move Right** | `D` (`KeyD`) | `→` (`ArrowRight`) |
| **Jump** | `W` (`KeyW`) | `↓` (`ArrowDown`) |
| **Punch** | `S` (`KeyS`) | `↑` (`ArrowUp`) |

*Controls can be remapped directly in the game UI by clicking the **⚙️ Config Controls** button.*

---

## 4. Development Tasks & Status
- [x] Consolidate project documentation into single `README.md`.
- [x] Implement WebGL 3D arena, lighting, camera tracking, and procedural character models.
- [x] Implement combat engine (hitboxes, directional checks, knockback, sound & particle FX).
- [x] Implement Config Control system (dynamic remapping modal & customizable key configuration).
- [x] Add Rematch KO overlay and responsive HUD.

---

## 5. Changelog
### [1.1.0] - 2026-07-23
- Consolidated all documentation into a single `README.md` file.
- Added in-game **Config Control System**:
  - Centralized `CONFIG` JavaScript object for keybindings & physics parameters.
  - Interactive GUI modal for binding custom keys for both Player 1 and Player 2.
  - Real-time HUD key label updates.
