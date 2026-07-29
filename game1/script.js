/* ==========================================================================
   Last Outpost: 3D Pixel Art Idle Survival - Full Mockup Engine
   ========================================================================== */

// 1. Core Game State
const GAME = {
  resources: {
    survivors: 28,
    maxSurvivors: 35,
    morale: 87,
    food: 1200,
    water: 850,
    wood: 2100,
    metal: 1700,
    fuel: 680,
    cash: 920
  },
  rates: {
    food: 12,
    water: 8,
    wood: 15,
    metal: 10
  },
  time: {
    day: 56,
    hour: 19,
    minute: 30,
    speed: 1
  },
  horde: {
    threatPercent: 68,
    secondsToNext: 342,
    isAttacking: false
  },
  selectedExpedition: "City Ruins",
  soundEnabled: true
};

// 2. Synthesized Sound Engine
class SoundEngine {
  constructor() { this.ctx = null; }
  init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
  playClick() {
    if (!GAME.soundEnabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(550, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.05);
  }
  playShot() {
    if (!GAME.soundEnabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.1);
  }
  playAlarm() {
    if (!GAME.soundEnabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(350, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.3);
  }
}
const audio = new SoundEngine();

// 3. Three.js 3D Voxel Pixel Renderer Engine
class ThreePixelEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#060709");

    const aspect = this.canvas.parentElement.clientWidth / this.canvas.parentElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 1000);
    this.camera.position.set(32, 26, 32);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false });
    this.renderer.setSize(this.canvas.parentElement.clientWidth, this.canvas.parentElement.clientHeight);
    this.renderer.setPixelRatio(0.65); // Pixelated 3D voxel scaling!

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraAngle = Math.PI / 4;
    this.cameraDistance = 44;

    this.setupLighting();
    this.build3DOutpost();
    this.setupMouseEvents();

    window.addEventListener("resize", () => this.onResize());

    this.survivors3D = [];
    this.zombies3D = [];
    this.bullets3D = [];

    this.spawnSurvivors3D();
  }

  setupLighting() {
    const ambient = new THREE.AmbientLight(0x353849, 1.2);
    this.scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xF4A261, 1.4);
    sun.position.set(25, 45, 25);
    this.scene.add(sun);

    this.fireLight = new THREE.PointLight(0xF4A261, 2.2, 18);
    this.fireLight.position.set(0, 1.5, 0);
    this.scene.add(this.fireLight);
  }

  build3DOutpost() {
    // Ground Voxel Grid
    const groundGeo = new THREE.BoxGeometry(42, 1, 42);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x12141D, flatShading: true });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.5;
    this.scene.add(ground);

    // Perimeter Wooden Palisade Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x4A3728, flatShading: true });
    const wallPositions = [
      { x: 0, z: -20, w: 40, h: 2.2, d: 1 },
      { x: 0, z: 20, w: 40, h: 2.2, d: 1 },
      { x: -20, z: 0, w: 1, h: 2.2, d: 40 },
      { x: 20, z: 0, w: 1, h: 2.2, d: 40 }
    ];
    wallPositions.forEach(p => {
      const wallGeo = new THREE.BoxGeometry(p.w, p.h, p.d);
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(p.x, p.h / 2, p.z);
      this.scene.add(wall);
    });

    // Central Campfire
    const fireGeo = new THREE.BoxGeometry(1.2, 0.8, 1.2);
    const fireMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, flatShading: true });
    const fire = new THREE.Mesh(fireGeo, fireMat);
    fire.position.set(0, 0.4, 0);
    this.scene.add(fire);

    const flameGeo = new THREE.BoxGeometry(0.6, 0.8, 0.6);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xFF6B6B });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, 1.1, 0);
    this.scene.add(flame);

    // Voxel Buildings
    const bData = [
      { x: 0, z: -9, w: 7, h: 5.5, d: 7, color: 0x3A405A }, // HQ
      { x: 8, z: -9, w: 2.5, h: 9, d: 2.5, color: 0x2A9D8F }, // Radio Tower
      { x: -17, z: -17, w: 3, h: 8, d: 3, color: 0x8B0000 }, // Watchtower NW
      { x: 17, z: -17, w: 3, h: 8, d: 3, color: 0x8B0000 }, // Watchtower NE
      { x: -17, z: 17, w: 3, h: 8, d: 3, color: 0x8B0000 }, // Watchtower SW
      { x: 17, z: 17, w: 3, h: 8, d: 3, color: 0x8B0000 }, // Watchtower SE
      { x: -10, z: -3, w: 5, h: 3, d: 5, color: 0x2A9D8F }, // Hydro Farm
      { x: 10, z: -3, w: 5, h: 3, d: 5, color: 0xF4A261 }, // Workshop
      { x: -10, z: 8, w: 5, h: 4, d: 5, color: 0xE76F51 }, // Hospital
      { x: 10, z: 8, w: 4, h: 4, d: 4, color: 0xE9C46A }, // Generator
      { x: -3, z: 10, w: 5, h: 3.5, d: 5, color: 0x264653 }, // Warehouse
      { x: -11, z: 14, w: 4, h: 3, d: 4, color: 0x457B9D } // Water Purifier
    ];

    bData.forEach(b => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({ color: b.color, flatShading: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.h / 2, b.z);
      this.scene.add(mesh);

      if (b.h >= 3.5) {
        const winGeo = new THREE.BoxGeometry(b.w * 0.6, 0.8, b.d + 0.1);
        const winMat = new THREE.MeshBasicMaterial({ color: 0xFFE066 });
        const winMesh = new THREE.Mesh(winGeo, winMat);
        winMesh.position.set(b.x, b.h * 0.6, b.z);
        this.scene.add(winMesh);
      }
    });
  }

  spawnSurvivors3D() {
    for (let i = 0; i < 5; i++) {
      const bodyGeo = new THREE.BoxGeometry(0.8, 1.4, 0.8);
      const mat = new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xE9C46A : 0x2EC4B6, flatShading: true });
      const mesh = new THREE.Mesh(bodyGeo, mat);

      const headGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xF9C74F });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.0;
      mesh.add(head);

      mesh.position.set(-12 + Math.random() * 24, 0.7, -12 + Math.random() * 24);
      this.scene.add(mesh);

      this.survivors3D.push({
        mesh,
        targetX: -12 + Math.random() * 24,
        targetZ: -12 + Math.random() * 24,
        speed: 0.05 + Math.random() * 0.03
      });
    }
  }

  setupMouseEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      this.cameraAngle -= deltaX * 0.008;

      this.camera.position.x = Math.sin(this.cameraAngle) * this.cameraDistance;
      this.camera.position.z = Math.cos(this.cameraAngle) * this.cameraDistance;
      this.camera.lookAt(0, 0, 0);

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => { this.isDragging = false; });

    this.canvas.addEventListener("wheel", (e) => {
      this.cameraDistance = Math.max(22, Math.min(70, this.cameraDistance + e.deltaY * 0.03));
      this.camera.position.x = Math.sin(this.cameraAngle) * this.cameraDistance;
      this.camera.position.z = Math.cos(this.cameraAngle) * this.cameraDistance;
      this.camera.lookAt(0, 0, 0);
    });
  }

  onResize() {
    const w = this.canvas.parentElement.clientWidth;
    const h = this.canvas.parentElement.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  render() {
    this.fireLight.intensity = 2.0 + Math.sin(Date.now() / 120) * 0.4;

    this.survivors3D.forEach(s => {
      const dx = s.targetX - s.mesh.position.x;
      const dz = s.targetZ - s.mesh.position.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 0.5) {
        s.targetX = -12 + Math.random() * 24;
        s.targetZ = -12 + Math.random() * 24;
      } else {
        s.mesh.position.x += (dx / dist) * s.speed;
        s.mesh.position.z += (dz / dist) * s.speed;
        s.mesh.rotation.y = Math.atan2(dx, dz);
      }
    });

    if (GAME.horde.isAttacking) {
      if (Math.random() < 0.06 && this.zombies3D.length < 25) {
        const zGeo = new THREE.BoxGeometry(0.8, 1.4, 0.8);
        const zMat = new THREE.MeshStandardMaterial({ color: 0x2A9D8F, flatShading: true });
        const zMesh = new THREE.Mesh(zGeo, zMat);

        const angle = Math.random() * Math.PI * 2;
        zMesh.position.set(Math.cos(angle) * 26, 0.7, Math.sin(angle) * 26);
        this.scene.add(zMesh);
        this.zombies3D.push({ mesh: zMesh, speed: 0.05 + Math.random() * 0.02 });
      }

      if (this.zombies3D.length > 0 && Math.random() < 0.12) {
        const z = this.zombies3D[Math.floor(Math.random() * this.zombies3D.length)];
        const bGeo = new THREE.BoxGeometry(0.2, 0.2, 1);
        const bMat = new THREE.MeshBasicMaterial({ color: 0xFFE066 });
        const bMesh = new THREE.Mesh(bGeo, bMat);
        bMesh.position.set(17, 8, 17);
        bMesh.lookAt(z.mesh.position);
        this.scene.add(bMesh);

        this.bullets3D.push({ mesh: bMesh, target: z.mesh.position, life: 1 });
        audio.playShot();
      }
    }

    for (let i = this.bullets3D.length - 1; i >= 0; i--) {
      const b = this.bullets3D[i];
      b.mesh.position.lerp(b.target, 0.35);
      b.life -= 0.12;
      if (b.life <= 0) {
        this.scene.remove(b.mesh);
        this.bullets3D.splice(i, 1);
      }
    }

    for (let i = this.zombies3D.length - 1; i >= 0; i--) {
      const z = this.zombies3D[i];
      const dx = 0 - z.mesh.position.x;
      const dz = 0 - z.mesh.position.z;
      const dist = Math.hypot(dx, dz);

      z.mesh.position.x += (dx / dist) * z.speed;
      z.mesh.position.z += (dz / dist) * z.speed;
      z.mesh.rotation.y = Math.atan2(dx, dz);

      if (dist < 4) {
        this.scene.remove(z.mesh);
        this.zombies3D.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global 3D Engine Instance
let engine3D = null;

// 4. Game Initialization & Main Loop
document.addEventListener("DOMContentLoaded", () => {
  engine3D = new ThreePixelEngine("outpost-canvas-3d");
  setupEventListeners();

  setInterval(gameTick, 1000);

  function loop() {
    engine3D.render();
    requestAnimationFrame(loop);
  }
  loop();
});

// 5. Game Idle Engine Ticking Logic
function gameTick() {
  GAME.resources.food += GAME.rates.food * GAME.time.speed;
  GAME.resources.water += GAME.rates.water * GAME.time.speed;
  GAME.resources.wood += GAME.rates.wood * GAME.time.speed;
  GAME.resources.metal += GAME.rates.metal * GAME.time.speed;

  GAME.time.minute += 10;
  if (GAME.time.minute >= 60) {
    GAME.time.minute = 0;
    GAME.time.hour++;
    if (GAME.time.hour >= 24) {
      GAME.time.hour = 0;
      GAME.time.day++;
    }
  }

  if (GAME.horde.secondsToNext > 0 && !GAME.horde.isAttacking) {
    GAME.horde.secondsToNext--;
  } else if (GAME.horde.secondsToNext <= 0 && !GAME.horde.isAttacking) {
    triggerHordeAttack();
  }

  updateDOMUI();
}

// 6. UI DOM Updater
function updateDOMUI() {
  document.getElementById("res-survivors").textContent = GAME.resources.survivors;
  document.getElementById("res-morale").textContent = `${GAME.resources.morale}%`;
  document.getElementById("res-food").textContent = Math.floor(GAME.resources.food);
  document.getElementById("res-water").textContent = Math.floor(GAME.resources.water);
  document.getElementById("res-wood").textContent = Math.floor(GAME.resources.wood);
  document.getElementById("res-metal").textContent = Math.floor(GAME.resources.metal);
  document.getElementById("res-fuel").textContent = Math.floor(GAME.resources.fuel);
  document.getElementById("res-cash").textContent = Math.floor(GAME.resources.cash);

  document.getElementById("time-day").textContent = `DAY ${GAME.time.day}`;
  const hr = GAME.time.hour.toString().padStart(2, '0');
  const mn = GAME.time.minute.toString().padStart(2, '0');
  document.getElementById("time-clock").textContent = `🕒 ${hr}:${mn} ${GAME.time.hour >= 12 ? 'PM' : 'AM'}`;

  const mins = Math.floor(GAME.horde.secondsToNext / 60).toString().padStart(2, '0');
  const secs = (GAME.horde.secondsToNext % 60).toString().padStart(2, '0');
  const hordeEl = document.getElementById("next-horde-timer");
  if (hordeEl) hordeEl.textContent = `${mins}:${secs}`;
}

// 7. Interactive Build Logic
function buildStructure(structureName) {
  audio.playClick();
  GAME.resources.wood += 50;
  GAME.resources.metal += 50;
  showToast(`Constructed ${structureName}! 🔨`);
  updateDOMUI();
}

// 8. Expedition Node Selection
function selectExpedition(locationName) {
  GAME.selectedExpedition = locationName;
  showToast(`Selected target: ${locationName} 🗺️`);
}

// 9. Horde Attack Trigger
function triggerHordeAttack() {
  GAME.horde.isAttacking = true;
  audio.playAlarm();
  showToast("🚨 WARNING: 3D Zombie Horde is attacking the outpost!");

  setTimeout(() => {
    GAME.horde.isAttacking = false;
    GAME.horde.secondsToNext = 300;
    GAME.resources.cash += 300;
    GAME.resources.food += 400;
    showToast("🎉 Horde repelled! Base secure!");
  }, 10000);
}

// 10. Event Listeners Setup
function setupEventListeners() {
  document.getElementById("rotate-cam-btn")?.addEventListener("click", () => {
    if (engine3D) {
      engine3D.cameraAngle += Math.PI / 4;
      engine3D.camera.position.x = Math.sin(engine3D.cameraAngle) * engine3D.cameraDistance;
      engine3D.camera.position.z = Math.cos(engine3D.cameraAngle) * engine3D.cameraDistance;
      engine3D.camera.lookAt(0, 0, 0);
      showToast("Rotated 3D view 🎥");
    }
  });

  document.getElementById("reset-cam-btn")?.addEventListener("click", () => {
    if (engine3D) {
      engine3D.cameraAngle = Math.PI / 4;
      engine3D.cameraDistance = 44;
      engine3D.camera.position.set(32, 26, 32);
      engine3D.camera.lookAt(0, 0, 0);
      showToast("Reset 3D camera 🔍");
    }
  });

  document.getElementById("send-team-btn")?.addEventListener("click", () => {
    audio.playClick();
    showToast(`Team dispatched to ${GAME.selectedExpedition}! 🚁`);
  });

  document.getElementById("collect-all-btn")?.addEventListener("click", () => {
    GAME.resources.food += 150;
    GAME.resources.water += 100;
    GAME.resources.wood += 200;
    audio.playClick();
    showToast("Collected all idle base supplies! ✨");
    updateDOMUI();
  });

  document.getElementById("claim-offline-btn")?.addEventListener("click", () => {
    GAME.resources.food += 2350;
    GAME.resources.water += 1980;
    GAME.resources.wood += 1200;
    GAME.resources.metal += 980;
    audio.playClick();
    showToast("Claimed offline idle rewards! 🎁");
    updateDOMUI();
  });

  document.getElementById("defend-btn")?.addEventListener("click", () => {
    triggerHordeAttack();
  });

  document.getElementById("speed-up-btn")?.addEventListener("click", () => {
    GAME.time.speed = GAME.time.speed === 1 ? 2 : 1;
    showToast(`Game Speed: ${GAME.time.speed}X ⚡`);
  });

  document.getElementById("sound-toggle-btn")?.addEventListener("click", () => {
    GAME.soundEnabled = !GAME.soundEnabled;
    showToast(GAME.soundEnabled ? "Sound ON 🔊" : "Sound OFF 🔇");
  });
}

// 11. Toast Helper
function showToast(msg) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "pixel-toast";
  toast.innerHTML = `<span>📻</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => { toast.remove(); }, 3000);
}
