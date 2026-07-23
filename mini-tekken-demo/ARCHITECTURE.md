# ARCHITECTURE.md

## System Component Diagram

```
+-------------------------------------------------------------------+
|                           index.html                              |
|                                                                   |
|   +-----------------------------------------------------------+   |
|   |                       DOM / CSS HUD                       |   |
|   | - P1 / P2 Health Bars & Names                             |   |
|   | - Controls Overlay & Instructions                         |   |
|   | - KO Win Overlay & Restart Trigger                        |   |
|   +-----------------------------------------------------------+   |
|                                 |                                 |
|   +-----------------------------------------------------------+   |
|   |                   Three.js WebGL Engine                   |   |
|   | - Scene & Dynamic Camera (Midpoint tracking)              |   |
|   | - Hemisphere + Directional Lighting & Shadows              |   |
|   | - Arena Platform, Grid Floor, Outer Ring, Spark Particles  |   |
|   +-----------------------------------------------------------+   |
|                                 |                                 |
|   +-----------------------------------------------------------+   |
|   |                    Game Loop & Physics                    |   |
|   | - KeyInput Map (State tracking)                           |   |
|   | - Humanoid Kinematics & Punch Animation Lerping           |   |
|   | - Collision & Facing Direction Check                      |   |
|   | - Knockback Impulse & Health Calculation                  |   |
|   +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
```

## Data Structure & State
```javascript
const state = {
  p1: {
    mesh, torso, head, rightArm, leftArm, rightLeg, leftLeg,
    pos: Vector3, vel: Vector3, hp: 100, dir: 1, 
    isPunching: false, punchTimer: 0, isHit: false, hitTimer: 0
  },
  p2: { ... },
  keys: {},
  gameOver: false,
  winner: null
};
```
