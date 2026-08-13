// ============================================================================
// 🪐 METATRON CORE ENGINE - METABOLIC PATHWAY & PURE HEART CORE
// ============================================================================

// 🔑 Pure universal spectrum data model with absolute Salvator Mundi spatial vectors
window.COLOR_SPECTRUM_MODEL = [
    // 🌸💛 Z-AXIS DEPTH ALIGNMENT (Pink in front, Yellow directly behind on Z)
    { id: 3, name: "PINK_RESONANCE_CHAMBER", mv: -10, color: "Pink",   fqn: 1.618, opposition: "Yellow", x:  0.0,  y:  0.0,  z:  0.3 }, // Front view anchor
    { id: 4, name: "YELLOW_PROPEL_CHAMBER", mv:  20, color: "Yellow", fqn: 2.618, opposition: "Pink",   x:  0.0,  y:  0.0,  z: -0.3 }, // Directly behind Pink

    // 🧡💙 VERTICAL AXIS (Top - Bottom Polarity)
    { id: 2, name: "ORANGE_ABSORB_CHAMBER", mv: -70, color: "Orange", fqn: 1.618, opposition: "Blue",   x:  0.0,  y:  0.5,  z:  0.0 }, // Top
    { id: 7, name: "BLUE_SHIELD_CHAMBER",   mv: -60, color: "Blue",   fqn: 1.0,   opposition: "Orange", x:  0.0,  y: -0.5,  z:  0.0 }, // Bottom

    // 💚❤️ HORIZONTAL AXIS (East - West Mirroring Alignment)
    { id: 8, name: "GREEN_ENERGY_CHAMBER",  mv:   0, color: "Green",  fqn: 1.618, opposition: "Red",    x:  0.5,  y:  0.0,  z:  0.0 }, // East (Right side)
    { id: 1, name: "RED_ENERGY_CHAMBER",    mv: -90, color: "Red",    fqn: 1.0,   opposition: "Green",  x: -0.5,  y:  0.0,  z:  0.0 }, // West (Left side)
    
    // 🤍🖤 THE SACRED HANDS MATRIX (Jesus' Hand Gestures & Orb Placement)
    { id: 9, name: "WHITE_LIGHT_CHAMBER",   mv: 100, color: "White",  fqn: 3.141, opposition: "Black",  x: -0.35, y:  0.35, z:  0.1 }, // Left hand: blessing the air
    { id: 10,name: "BLACK_VOID_CHAMBER",    mv: -100,color: "Black",  fqn: 0.0,   opposition: "White",  x:  0.35, y: -0.35, z:  0.1 }  // Right hand: holding the earthly orb
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
