# Aim & Reaction Trainer - Project Documentation

## 1. RESEARCH
### Problem Statement
Build an improved 3D Aim & Reaction Trainer with:
- Dark emerald theme (`#040e08`, `#00ff66`)
- Glowing neon yellow targets (`#ffea00`)
- 3 Training Modes: Flick Shot (Gridshot), Reaction Time (measuring latency in ms), and 3D Target Tracking
- Target Height Alignment: Standing Head Level (`1.65m`) and Crouching Head Level (`1.0m`)
- Crosshair Customization Suite: Color, Style, Line Length, Thickness, Gap, Center Dot, and Live Settings Preview
- Configurable Mouse Sensitivity, FOV, Target Size, Tracking Speed, Duration, and Web Audio Sound FX

---

## 2. PLAN & ARCHITECTURE
### Architecture Diagram
```
+-----------------------------------------------------------------------------------+
|                                 HTML5 Document                                    |
|  +-----------------------------------------------------------------------------+  |
|  |                             UI Layer (CSS/DOM)                              |  |
|  |  - Glassmorphic Main Card Overlay (Dark Green Theme)                         |  |
|  |  - Interactive Settings: Gameplay & Crosshair Customization Suite           |  |
|  |  - HUD: Score, Accuracy %, Reaction ms, Tracking Time %, Timer Bar          |  |
|  |  - Live Crosshair Preview & In-Game Crosshair Renderer                        |  |
|  +-----------------------------------------------------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
|  |                           Three.js 3D Engine                                |  |
|  |  - Camera & PointerLock Controls (Configurable Sensitivity & FOV)           |  |
|  |  - Scene: Dark Emerald Cyber Grid Arena with Height Reference Lines         |  |
|  |  - Targets: Head Level (1.65m) & Crouch Level (1.0m) Glowing Yellow Spheres  |  |
|  |  - Particle System: Spark explosions on hit                                 |  |
|  +-----------------------------------------------------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
|  |                            Game Logic Modules                               |  |
|  |  - Flick Mode: Multi-target gridshot, accuracy & KPS calculation             |  |
|  |  - Reaction Mode: Millisecond precision latency timer & round counter       |  |
|  |  - Tracking Mode: 3D vector Lissajous trajectory with raycast overlap check |  |
|  |  - Audio Synth: Web Audio API Oscillator for hit/beep sound feedback        |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 3. TASKS
- [x] Consolidate project documentation into a single `PROJECT.md` file
- [x] Dark emerald theme & glassmorphic UI implementation
- [x] Glowing neon yellow targets & particle hit effects
- [x] Target placement strictly aligned to Standing Head Level (`1.65m`) and Crouching Head Level (`1.0m`)
- [x] Target Height Level selector (Mixed, Head Level Only, Crouch Level Only)
- [x] Crosshair Customization Suite (Color, Style, Length, Thickness, Gap, Dot Size, Live Preview)
- [x] Reaction Time training mode with millisecond latency measurement
- [x] 3D Target Tracking mode with time-on-target % and smoothness rating
- [x] Flick shot (Gridshot) training mode
- [x] Web Audio API sound synthesizer
- [x] PointerLock mouse controls with scaled sensitivity & FOV adjustments

---

## 4. CHANGELOG
### [v2.2.0] - Single MD Rule & Consolidation
- Consolidated all documentation into a single `PROJECT.md` file per user directive.

### [v2.1.0] - Target Height Alignment & Custom Crosshairs
- Added Standing Head Level (`1.65m`) and Crouching Head Level (`1.0m`) target positioning.
- Added Target Height Level selector (Mixed, Head Level, Crouch Level).
- Added full Crosshair Customization Suite with Live Settings Preview.

### [v2.0.0] - Dark Emerald Theme & Yellow Targets Overhaul
- Redesigned UI and scene to Dark Emerald Green aesthetic.
- Upgraded targets to high-emissive glowing yellow spheres with hit spark particles.
- Added Flicking, Reaction Time, and 3D Tracking game modes.
- Added Web Audio API sound synthesizer.
