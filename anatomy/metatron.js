// ============================================================================
// 🪐 METATRON CORE ENGINE - METABOLIC PATHWAY & PURE HEART CORE
// ============================================================================


const colorspectrum =[1,2,4,8,7,5];

const RYB = [1, 4, 7, 8, 5, 2]; 
const BYR = [7, 4, 1, 5, 8, 2]; 


// 🔑 Pure universal spectrum data model with correct numerical IDs and Solfeggio frequencies
window.COLOR_SPECTRUM_MODEL = [
    // 🔥 RISING AXIS (Expansion / Systole / Core Warmth)
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    fqn: 1.0,   hz: 174, opposition: "Green" }, // Base Anchor (Phi^0)
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", fqn: 1.618, hz: 285, opposition: "Blue" },  // Acceleration Start (Phi^1)
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", fqn: 2.618, hz: 396, opposition: "Violet" },// PEAK THERMAL / PROPULSION NODE (Phi^2)

    // 🤍🖤 THE SACRED HANDS MATRIX (Jesus' Hand Gestures & Orb Placement)
    { id: 3, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  fqn: 3.141, opposition: "Black",  x: -0.35, y:  0.35, z:  0.1 }, // Left hand: blessing the air
    { id: 6, name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  fqn: 0.0,   opposition: "White",  x:  0.35, y: -0.35, z:  0.1 }, // Right hand: holding the earthly orb

    // 💧 DECAYING AXIS (Contraction / Diastole / Absolute Calm)
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  fqn: 1.618, hz: 528, opposition: "Red" },    // Equilibrium / Heart Grounding (2.618 / 1.618)
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   fqn: 1.0,   hz: 741, opposition: "Orange" }, // Cooling Corridor (1.618 / 1.618)
    { id: 5, name: "VIOLET_SHELL_CHAMBER",  mv: -90, color: "Violet", fqn: 0.618, hz: 852, opposition: "Yellow" }  // Deep State / Stillness (1.0 / 1.618)
];

// 🔑 Pure universal spectrum data model with absolute Salvator Mundi spatial vectors
window.HORIZON = [
    // 💚❤️ HORIZONTAL AXIS (East - West Mirroring Alignment)
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  fqn: 1.618, opposition: "WEST", x:  0.5,  y:  0.0,  z:  0.0 }, // East (Right side)
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    fqn: 1.0,   opposition: "EAST", x: -0.5,  y:  0.0,  z:  0.0 }  // West (Left side)
];

window.chambers = {}; // Global dictionary mapping chamber IDs to meshes

// 🧬 PURE LOGICAL TELEMETRY CARRIER (0% CPU OVERHEAD)
window.QuantumPacket = class QuantumPacket {
    constructor(sourceId, targetId, frequencyValue, directionMultiplier) {
        this.sourceId = sourceId;
        this.targetId = targetId;
        this.frequency = frequencyValue;
        this.dirMultiplier = directionMultiplier;
        this.progress = 0;
        this.isActive = true;
    }

    update(fixedDelta) {
        if (!this.isActive) return;
        // Pure mathematical scale entirely independent from PC clock/refresh cycles
        const baseSpeed = this.frequency * 0.01;
        this.progress += baseSpeed * this.dirMultiplier * fixedDelta;
        if (this.progress >= 1.0) {
            this.progress = 1.0;
            this.isActive = false;
        }
    }
};

// 🫀 INJECTING CHAMBERS ONTO SKELETON'S QUANTUM CAGE
function injectMetatronMetabolism() {
    // 📯 Önce skeleton.js içindeki büyük amiral gemisi sahneyi ve iskeleti kurar
    window.initMetatronEngine(); //

    const colorHexMap = {
        "Red": 0xff0000, "Orange": 0xff7f00, "Yellow": 0xffff00,
        "Green": 0x00ff00, "Blue": 0x0000ff, "Pink": 0xffc0cb, 
        "White": 0xffffff, "Black": 0x111111, "Violet": 0x8b00ff
    };

    // 🔮 Solid translucent chambers reading spatial metrics directly from model
    window.COLOR_SPECTRUM_MODEL.forEach((chamber) => {
        const geometry = new THREE.SphereGeometry(0.22, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: colorHexMap[chamber.color],
            transparent: true,
            opacity: 0.35,
            wireframe: false // Solid translucent lock
        });
        
        const chamberMesh = new THREE.Mesh(geometry, material);
        
        // 📐 Direct coordinate injection from global matrix data
        chamberMesh.position.set(chamber.x, chamber.y, chamber.z);

        // Kilit Adres: skeleton.js'in yarattığı window.KuantumKafesi'ne kenetlenme
        if (window.KuantumKafesi) {
            window.KuantumKafesi.add(chamberMesh);
        }
        
        window.chambers[chamber.id] = chamberMesh;
    });

    // Ana animasyon döngüsünü tetikle
    runMetatronPipeline();
}

function runMetatronPipeline() {
    requestAnimationFrame(runMetatronPipeline);
    
    // Direct routing to your mathematical counter-current calculations
    window.MetatronEngine();

    if (window.renderer && window.scene && window.camera) {
        window.renderer.render(window.scene, window.camera);
    }
}

// ============================================================================
// 🌊 RESERVED METABOLIC CORE (YOUR LIVE VECTOR FLOWS GO HERE)
// ============================================================================
window.MetatronEngine = function() {
    // Structural cage and skeleton data are isolated safely inside skeleton.js.
    // Chambers are perfectly injected onto the matrix vectors from model metadata.
    
    // Ready for your exact 20-line pure polarity loop:
    // 1. Red ↔ Blue meeting at Yellow with Phi multiplier acceleration.
    // 2. Red ↔ Green meeting at Yellow to instantiate electromagnetic pole.
};

// Start the core engine
injectMetatronMetabolism();
